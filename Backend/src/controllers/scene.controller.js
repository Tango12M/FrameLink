import Project from "../models/project.model.js";
import Scene from "../models/scene.model.js";
import imagekit from "../services/imagekit.service.js";

export const createScene = async (req, res) => {
  try {
    const { title, projectId } = req.body;
    const file = req.file;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "projectId required",
      });
    }
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Video file required",
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const isAdmin = project.members.some(
      (m) => m.user.toString() === req.user.id && m.role === "admin",
    );
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Admin only action",
      });
    }

    let uploadedFile;
    try {
      uploadedFile = await imagekit.upload({
        file: file.buffer, // buffer from multer
        fileName: `${Date.now()}-${file.originalname}`,
        folder: "/FrameLink/videos",
      });
    } catch (uploadError) {
      return res.status(500).json({
        success: false,
        message: "Video upload failed",
      });
    }

    const scene = await Scene.create({
      title,
      projectId,
      videoUrl: uploadedFile.url,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Scene created successfully",
      scene,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getScenesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (m) => m.user.toString() === req.user.id,
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const isAdmin = project.members.some(
      (m) => m.user.toString() === req.user.id && m.role === "admin",
    );

    let scenes = await Scene.find({ projectId })
      .populate("assignedTo", "username email")
      .sort({ createdAt: 1 });

    if (!isAdmin) {
      scenes = scenes.filter(
        (scene) =>
          !scene.assignedTo ||
          scene.assignedTo.toString() === req.user.id,
      );
    }

    res.json({
      success: true,
      message: "Scenes retrieved successfully",
      scenes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getSceneById = async (req, res) => {
  try {
    const { sceneId } = req.params;
    const scene = await Scene.findById(sceneId)
      .populate("assignedTo", "username email")
      .populate("uploadedBy", "username email");

    if (!scene) {
      return res.status(404).json({
        success: false,
        message: "Scene not found",
      });
    }

    const project = await Project.findById(scene.projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (m) => m.user.toString() === req.user.id,
    );
    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const isAdmin = project.members.some(
      (m) => m.user.toString() === req.user.id && m.role === "admin",
    );

    if (!isAdmin && scene.assignedTo && scene.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this scene",
      });
    }

    res.json({
      success: true,
      message: "Scene retrieved successfully",
      scene,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const assignScene = async (req, res) => {
  try {
    const { sceneId, userId } = req.body;

    const scene = await Scene.findById(sceneId);
    if (!scene) {
      return res.status(404).json({
        success: false,
        message: "Scene not found",
      });
    }

    const project = await Project.findById(scene.projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const isAdmin = project.members.some(
      (m) => m.user.toString() === req.user.id && m.role === "admin",
    );
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admin can assign scenes",
      });
    }

    let targetMember = null;
    if (userId) {
      targetMember = project.members.find(
        (m) => m.user.toString() === userId,
      );
      if (!targetMember) {
        return res.status(404).json({
          success: false,
          message: "User not found in project",
        });
      }
    }

    scene.assignedTo = userId || null;
    await scene.save();

    const updatedScene = await Scene.findById(sceneId).populate(
      "assignedTo",
      "username email",
    );

    res.json({
      success: true,
      message: "Scene assigned successfully",
      scene: updatedScene,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateSceneVideo = async (req, res) => {
  try {
    const { sceneId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Video file required",
      });
    }

    const scene = await Scene.findById(sceneId);
    if (!scene) {
      return res.status(404).json({
        success: false,
        message: "Scene not found",
      });
    }

    const project = await Project.findById(scene.projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (m) => m.user.toString() === req.user.id,
    );
    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const isAdmin = project.members.some(
      (m) => m.user.toString() === req.user.id && m.role === "admin",
    );
    if (!isAdmin && scene.assignedTo && scene.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to update this video",
      });
    }

    let uploadedFile;
    try {
      uploadedFile = await imagekit.upload({
        file: file.buffer,
        fileName: `${Date.now()}-${file.originalname}`,
        folder: "/FrameLink/videos",
      });
    } catch (uploadError) {
      return res.status(500).json({
        success: false,
        message: "Video upload failed",
      });
    }

    scene.videoUrl = uploadedFile.url;
    await scene.save();

    res.json({
      success: true,
      message: "Video updated successfully",
      scene,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

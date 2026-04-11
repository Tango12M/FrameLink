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

    const isMember = project.members.some(
      (m) => m.user.toString() === req.user.id,
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const scenes = await Scene.find({ projectId }).sort({ createdAt: 1 });
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

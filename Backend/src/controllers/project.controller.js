import Project from "../models/project.model.js";

export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    const project = await Project.create({
      title,
      description,
      createdBy: userId,
      members: [{ user: userId, role: "admin" }],
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const projects = await Project.find({
      "members.user": userId,
    }).populate("members.user", "username email");

    res.json({
      success: true,
      message: "Projects retrieved successfully",
      projects,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const addMember = async (req, res) => {
  try {
    const { projectId, userId, role } = req.body;

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

    const alreadyMember = project.members.some(
      (m) => m.user.toString() === userId,
    );
    if (alreadyMember) {
      return res.status(400).json({
        success: false,
        message: "User already a member",
      });
    }

    project.members.push({ user: userId, role });
    await project.save();

    res.json({
      success: true,
      message: "Member added successfully",
      project,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateMemberRole = async (req, res) => {
  try {
    const { projectId, userId, role } = req.body;
    const currentUserId = req.user.id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check if current user is admin
    const isAdmin = project.members.some(
      (m) => m.user.toString() === currentUserId && m.role === "admin",
    );
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Admin only action",
      });
    }

    // Prevent admin from changing their own role
    if (userId === currentUserId) {
      return res.status(400).json({
        success: false,
        message: "Cannot change your own role. Contact another admin.",
      });
    }

    const member = project.members.find((m) => m.user.toString() === userId);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    member.role = role;
    await project.save();

    // Re-populate members data before returning
    await project.populate("members.user", "username email");

    res.json({
      success: true,
      message: "Member role updated successfully",
      project,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

import config from "../config/config.js";
import Invite from "../models/invite.model.js";
import Project from "../models/project.model.js";
import crypto from "crypto";

export const createInviteLink = async (req, res) => {
  try {
    const { projectId } = req.body;
    const userId = req.user.id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const isAdmin = project.members.some(
      (m) =>
        m.user.toString() === userId &&
        m.role === "admin"
    );
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admin can invite",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const invite = await Invite.create({
      projectId,
      invitedBy: userId,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    const link = `${config.FRONTEND_URL}/invite/${token}`;

    res.json({
      success: true,
      message: "Invite link created successfully",
      link,
      expiresIn: "24 hours",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const acceptInvite = async (req, res) => {
  try {
    const { token } = req.body;
    const userId = req.user.id;

    const invite = await Invite.findOne({ token });

    if (!invite) {
      return res.status(404).json({
        success: false,
        message: "Invalid invite",
      });
    }

    if (invite.status === "accepted") {
      return res.status(400).json({
        success: false,
        message: "Already used",
      });
    }

    if (invite.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invite expired",
      });
    }

    const project = await Project.findById(invite.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const alreadyMember = project.members.some(
      (m) => m.user.toString() === userId
    );

    if (alreadyMember) {
      return res.json({
        success: true,
        message: "Already a member",
      });
    }

    project.members.push({
      user: userId,
      role: "none",
    });

    await project.save();

    invite.status = "accepted";
    await invite.save();

    res.json({
      success: true,
      message: "Joined project successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getInviteDetails = async (req, res) => {
  try {
    const { token } = req.params;

    const invite = await Invite.findOne({ token }).populate("projectId");

    if (!invite) {
      return res.status(404).json({
        success: false,
        message: "Invalid invite link",
        expired: false,
      });
    }

    // Check if already accepted
    if (invite.status === "accepted") {
      return res.status(400).json({
        success: false,
        message: "This invite link has already been used",
        expired: false,
      });
    }

    // Check if expired
    if (invite.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invite link has expired",
        expired: true,
      });
    }

    if (!invite.projectId) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
        expired: false,
      });
    }

    res.json({
      success: true,
      message: "Invite details retrieved successfully",
      projectId: invite.projectId._id,
      projectName: invite.projectId.title,
      projectDescription: invite.projectId.description,
      status: invite.status,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      expired: false,
    });
  }
};
};
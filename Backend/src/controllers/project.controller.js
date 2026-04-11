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

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const projects = await Project.find({
      "members.user": userId,
    });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const { projectId, userId, role } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const isAdmin = project.members.some(
      (m) => m.user.toString() === req.user.id && m.role === "admin",
    );
    if (!isAdmin) {
      return res.status(403).json({ error: "Admin only action" });
    }

    const alreadyMember = project.members.some(
      (m) => m.user.toString() === userId,
    );
    if (alreadyMember) {
      return res.status(400).json({ error: "User already a member" });
    }

    project.members.push({ user: userId, role });
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMemberRole = async (req, res) => {
  try {
    const { projectId, userId, role } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const isAdmin = project.members.some(
      (m) => m.user.toString() === req.user.id && m.role === "admin",
    );
    if (!isAdmin) {
      return res.status(403).json({ error: "Admin only action" });
    }

    const member = project.members.find((m) => m.user.toString() === userId);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    member.role = role;
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

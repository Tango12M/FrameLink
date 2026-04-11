import Project from "../models/project.model.js";
import Scene from "../models/scene.model.js";

export const createScene = async (req, res) => {
  try {
    const { title, projectId, videoUrl } = req.body;

    if (!projectId) {
      return res.status(400).json({ error: "projectId required" });
    }

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

    const scene = await Scene.create({
      title,
      projectId,
      videoUrl,
    });

    res.status(201).json(scene);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getScenesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const scenes = await Scene.find({ projectId });
    res.json(scenes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

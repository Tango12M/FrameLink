import Task from "../models/task.model.js";
import Comment from "../models/comment.model.js";

export const createTaskFromComment = async (req, res) => {
  try {
    const { commentId } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const task = await Task.create({
      sceneId: comment.sceneId,
      sourceCommentId: comment._id,
      title: `Fix: ${comment.text}`,
      description: `At ${comment.timestamp}s: ${comment.text}`,
      timestamp: comment.timestamp,
      isAIGenerated: true,
    });

    comment.linkedTaskId = task._id;
    await comment.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true },
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTasksByScene = async (req, res) => {
  try {
    const { sceneId } = req.params;

    const tasks = await Task.find({ sceneId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

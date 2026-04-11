import Comment from "../models/comment.model.js";

export const addComment = async (req, res) => {
  try {
    const { sceneId, text, timestamp } = req.body;
    const userId = req.user.id;

    const comment = await Comment.create({
      sceneId,
      userId,
      text,
      timestamp,
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { sceneId } = req.params;

    const comments = await Comment.find({ sceneId }).sort({ timestamp: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
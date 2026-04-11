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

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { sceneId } = req.params;

    const comments = await Comment.find({ sceneId }).sort({ timestamp: 1 });
    res.json({
      success: true,
      message: "Comments retrieved successfully",
      comments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
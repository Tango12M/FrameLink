export const validateTask = (req, res, next) => {
  const { commentId } = req.body;

  if (!commentId) {
    return res.status(400).json({
      success: false,
      message: "commentId required",
    });
  }

  next();
};
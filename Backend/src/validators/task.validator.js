export const validateTask = (req, res, next) => {
  const { commentId } = req.body;

  if (!commentId) {
    return res.status(400).json({ error: "commentId required" });
  }

  next();
};
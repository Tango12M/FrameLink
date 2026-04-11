export const validateComment = (req, res, next) => {
  const { sceneId, text } = req.body;

  if (!sceneId || !text) {
    return res.status(400).json({
      success: false,
      message: "Missing fields",
    });
  }

  next();
};
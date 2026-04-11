export const validateScene = (req, res, next) => {
  const { title, projectId } = req.body;

  if (!title || !projectId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  next();
};
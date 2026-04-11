export const validateInviteCreate = (req, res, next) => {
  const { projectId } = req.body;

  if (!projectId) {
    return res.status(400).json({
      success: false,
      message: "projectId required",
    });
  }

  next();
};

export const validateInviteAccept = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "token required",
    });
  }

  next();
};
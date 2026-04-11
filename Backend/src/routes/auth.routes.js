import { Router } from "express";
import {
  deleteUser,
  getMe,
  login,
  logout,
  register,
  resendVerificationEmail,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  loginValidator,
  registerValidator,
  resendVerificationValidator,
  verifyEmailValidator,
} from "../validators/auth.validator.js";

const authRouter = Router();

// Public Routes
authRouter.post("/register", registerValidator, register);
authRouter.post("/login", loginValidator, login);
authRouter.post("/verify-email", verifyEmailValidator, verifyEmail);
authRouter.get("/verify-email", verifyEmail);
authRouter.post("/logout", logout);
authRouter.post(
  "/resend-verification",
  resendVerificationValidator,
  resendVerificationEmail,
);

// Protected Routes
authRouter.get("/get-me", authUser, getMe);
authRouter.delete(
  "/delete-account",
  authUser, 
  deleteUser,
);

export default authRouter;

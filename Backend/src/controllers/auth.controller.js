import config from "../config/config.js";
import jwt from "jsonwebtoken";

// Models
import userModel from "../models/user.model.js";

// Utils
import { emailHTML, generateVerificationCode } from "../utils/util.js";
import {
  cookieOptions,
  createVerificationExpirationTime,
} from "../utils/constants.js";

// Services
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      success: false,
      message: "Username or email already exists",
    });
  }

  const verificationCode = generateVerificationCode(4);
  const user = await userModel.create({
    username,
    email,
    password,
    verificationCode,
    verificationExpiresAt: createVerificationExpirationTime(),
  });

  try {
    await sendEmail({
      to: email,
      subject: "Welcome to FrameLink!",
      html: emailHTML(username, verificationCode),
    });
  } catch (err) {
    // User created but email failed, delete the user so they can try again
    await userModel.findByIdAndDelete(user._id);
    return res.status(500).json({
      success: false,
      message: "Failed to send verification email. Please try again.",
    });
  }

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  if (user.verified === false) {
    return res.status(400).json({
      success: false,
      message: "Please verify your email before logging in",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function logout(req, res) {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
}

export async function deleteUser(req, res) {
  try {
    const userId = req.user.id;

    await userModel.findByIdAndDelete(userId);

    res.clearCookie("token", cookieOptions);
    res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user account",
    });
  }
}

export async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function verifyEmail(req, res) {
  const { token } = req.query;
  const { email, code } = req.body;

  try {
    if (token) {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const user = await userModel.findOne({ email: decoded.email });
      if (!user) {
        return res.status(400).json({
          message: "Invalid token",
          success: false,
          err: "User not found",
        });
      }

      if (
        !user.verificationExpiresAt ||
        user.verificationExpiresAt < new Date()
      ) {
        return res.status(400).send(`
      <h1>Link Expired</h1>
      <p>Your verification link expired. Please register again.</p>
    `);
      }

      user.verified = true;
      user.verificationCode = null;
      user.verificationExpiresAt = null;
      await user.save();

      const authToken = jwt.sign(
        { id: user._id, username: user.username },
        config.JWT_SECRET,
        { expiresIn: "7d" },
      );

      res.cookie("token", authToken, cookieOptions);
      return res.redirect(process.env.FRONTEND_URL || "/");
    }

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "Email and verification code are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification details",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    if (
      !user.verificationExpiresAt ||
      user.verificationExpiresAt < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Verification code expired. Please request a new one.",
      });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    user.verified = true;
    user.verificationCode = null;
    user.verificationExpiresAt = null;
    await user.save();

    const authToken = jwt.sign(
      { id: user._id, username: user.username },
      config.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", authToken, cookieOptions);
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(400).json({
      message: "Invalid or expired verification",
      success: false,
      err: err.message,
    });
  }
}

export async function resendVerificationEmail(req, res) {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    const verificationCode = generateVerificationCode(4);
    user.verificationCode = verificationCode;
    user.verificationExpiresAt = createVerificationExpirationTime();
    await user.save();

    try {
      await sendEmail({
        to: user.email,
        subject: "Memora - Email Verification",
        html: emailHTML(user.username, verificationCode),
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to resend verification email",
      });
    }

    res.status(200).json({
      success: true,
      message: "Verification code resent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to resend verification email",
    });
  }
}

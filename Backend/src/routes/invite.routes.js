import express from "express";
import {
  createInviteLink,
  acceptInvite,
  getInviteDetails,
} from "../controllers/invite.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createInviteLink);
router.post("/accept", authMiddleware, acceptInvite);
router.get("/:token", getInviteDetails);

export default router;

import express from "express";
import {
  createInviteLink,
  acceptInvite,
  getInviteDetails,
} from "../controllers/invite.controller.js";


const router = express.Router();

router.post("/create", createInviteLink);
router.post("/accept", acceptInvite);
router.get("/:token", getInviteDetails);

export default router;

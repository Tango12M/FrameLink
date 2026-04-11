import express from "express";
import {
  createProject,
  getUserProjects,
  addMember,
} from "../controllers/project.controller.js";
import { updateMemberRole } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create", createProject);
router.get("/my", getUserProjects);
router.post("/add-member", addMember);
router.patch("/update-role", updateMemberRole);

export default router;
import express from "express";
import {
  createTaskFromComment,
  updateTaskStatus,
  getTasksByScene,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/from-comment", createTaskFromComment);
router.patch("/status", updateTaskStatus);
router.get("/:sceneId", getTasksByScene);

export default router;
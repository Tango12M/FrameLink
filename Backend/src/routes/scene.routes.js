import express from "express";
import {
  createScene,
  getScenesByProject,
} from "../controllers/scene.controller.js";

const router = express.Router();

router.post("/create", createScene);
router.get("/:projectId", getScenesByProject);

export default router;

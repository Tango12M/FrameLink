import express from "express";
import {
  createScene,
  getScenesByProject,
} from "../controllers/scene.controller.js";
import { uploadVideo } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/create", uploadVideo, createScene);
router.get("/:projectId", getScenesByProject);

export default router;

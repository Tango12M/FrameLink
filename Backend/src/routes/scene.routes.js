import express from "express";
import {
  createScene,
  getScenesByProject,
  getSceneById,
  assignScene,
  updateSceneVideo,
} from "../controllers/scene.controller.js";
import { uploadVideo } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/create", uploadVideo, createScene);
router.get("/:projectId", getScenesByProject);
router.get("/detail/:sceneId", getSceneById);
router.patch("/assign", assignScene);
router.patch("/:sceneId/video", uploadVideo, updateSceneVideo);

export default router;

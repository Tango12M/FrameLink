import multer from "multer";
import { uploadSize } from "../utils/constants.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: uploadSize },
});

export const uploadVideo = (req, res, next) => {
  upload.single("video")(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: `File too large (max ${uploadSize}MB)`,
        });
      }

      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    next();
  });
};

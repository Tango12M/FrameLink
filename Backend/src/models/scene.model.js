import mongoose from "mongoose";

const sceneSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
    status: {
      type: String,
      enum: ["raw", "editing", "review", "approved"],
      default: "raw",
    },
    videoUrl: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    editorVideos: [
      {
        editor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        videoUrl: String,
        uploadedAt: Date,
      },
    ],
    duration: Number,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("scene", sceneSchema);
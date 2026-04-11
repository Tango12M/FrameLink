import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    sceneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "scene",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    text: String,
    timestamp: Number,
    status: {
      type: String,
      enum: ["open", "resolved"],
      default: "open",
    },
    linkedTaskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  },
  { timestamps: true }
);

export default mongoose.model("comment", commentSchema);
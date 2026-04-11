import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    sceneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "scene",
    },
    sourceCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
    title: String,
    description: String,
    timestamp: Number, 
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    isAIGenerated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("task", taskSchema);
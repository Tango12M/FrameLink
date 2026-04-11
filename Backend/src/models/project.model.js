import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        role: {
          type: String,
          enum: ["admin", "editor", "reviewer", "none"],
          default: "none",
        },
      },
    ],
    status: {
      type: String,
      enum: ["raw", "editing", "review", "published"],
      default: "raw",
    }, 
    finalOutput: {
      summary: String,
      captions: String,
      hashtags: [String],
      title: String,
      thumbnail: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("project", projectSchema);
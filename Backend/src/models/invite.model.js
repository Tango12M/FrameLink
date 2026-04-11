import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
    expiresAt: {
      type: Date,
      index: { expires: 0 },
    },
  },
  { timestamps: true },
);

export default mongoose.model("invite", inviteSchema);

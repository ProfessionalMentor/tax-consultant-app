import mongoose from "mongoose";

const CaseSchema = new mongoose.Schema(
  {
    caseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedLawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "HEARING", "WON", "LOST", "CLOSED"],
      default: "PENDING",
    },
    type: {
      type: String,
      enum: ["CIVIL", "CRIMINAL", "TAXATION", "CORPORATE", "IT_DISPUTE"],
      required: true,
    },
    courtName: {
      type: String,
    },
    nextHearingDate: {
      type: Date,
    },
    documents: [
      {
        name: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    auditLogs: [
      {
        action: String,
        performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Case || mongoose.model("Case", CaseSchema);

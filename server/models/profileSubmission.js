import mongoose from "mongoose";

const profileSubmission = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  version: {
    type: Number,
    required: true
  },

  photos: [String],

  bio: String,

  prompts: [
    {
      question: String,
      answer: String
    }
  ],

  status: {
    type: String,
    enum: ["pending", "in_review", "completed"],
    default: "pending"
  }
},
{ timestamps: true }
);

export default mongoose.model("ProfileSubmission", profileSubmission);

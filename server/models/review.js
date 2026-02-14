import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProfileSubmission",
    required: true
  },

  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  firstImpression: String,

  ratings: {
    photoQuality: { type: Number, min: 1, max: 10 },
    bioClarity: { type: Number, min: 1, max: 10 },
    authenticity: { type: Number, min: 1, max: 10 },
    attractiveness: { type: Number, min: 1, max: 10 },
    overallImpression: { type: Number, min: 1, max: 10 }
  },

  perceivedTraits: [String],

  nicheAppeal: {
    strongFor: [String],
    weakFor: [String]
  },

  strengths: String,
  weaknesses: String,
  suggestions: String,

  photoOrderSuggestion: [Number],
  removePhotoIndex: Number

}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);

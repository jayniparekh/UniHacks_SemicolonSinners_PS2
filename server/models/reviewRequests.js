import mongoose from 'mongoose';

const reviewRequestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ["pending", "accepted", "rejected", "completed"], 
    default: "pending" 
  },
  reviewContent: String, 
  ratingByRequester: { type: Number, min: 1, max: 5 } // The rating User A gives User B
}, { timestamps: true });

export default mongoose.model('ReviewRequest', reviewRequestSchema);
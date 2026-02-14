import express from "express";
import {
  createReview,
  getReviewsByProfile,
  getReviewById
} from "../controllers/reviewController.js";
import { 
    sendInvitation, 
    respondToInvitation, 
    submitReview, 
    rateReviewer 
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/", createReview);
router.get("/profile/:profileId", getReviewsByProfile);
router.get("/:reviewId", getReviewById);

// Import your auth middleware to ensure only logged-in users can do these actions
// import { protect } from '../middleware/authMiddleware.js'; 

// 1. Send Invite: POST /api/reviews/invite
router.post('/invite', protect,sendInvitation);

// 2. Accept/Reject: PATCH /api/reviews/respond
router.patch('/respond', respondToInvitation);

// 3. Submit Content: POST /api/reviews/submit
router.post('/submit', submitReview);

// 4. Rate Reviewer: POST /api/reviews/rate
router.post('/rate', rateReviewer);

export default router;

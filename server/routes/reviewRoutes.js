import express from "express";
import {
  createReview,
  getReviewsByProfile,
  getReviewById
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);
router.get("/profile/:profileId", getReviewsByProfile);
router.get("/:reviewId", getReviewById);

export default router;

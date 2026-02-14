import express from "express";
import { createReview, getReviewsByProfile } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);
router.get("/profile/:profileId", getReviewsByProfile);

export default router;

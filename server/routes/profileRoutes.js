import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  createProfileSubmission
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/me", getMyProfile);
router.put("/me", updateMyProfile);
router.post("/", createProfileSubmission);

export default router;

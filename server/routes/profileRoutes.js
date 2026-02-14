import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  createProfileSubmission
} from "../controllers/profileController.js";
import upload from '../middleware/multer.js';
import { updateProfileImage } from '../controllers/userController.js';

const router = express.Router();

router.get("/me", getMyProfile);
router.put("/me", updateMyProfile);
router.post("/", createProfileSubmission);
router.post('/upload-photo', upload.single('image'), updateProfileImage);

export default router;

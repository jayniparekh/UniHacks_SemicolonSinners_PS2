import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  createProfileSubmission
} from "../controllers/profileController.js";
import upload from '../middleware/multer.js';
import { updateProfileImage } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/me",protect,getMyProfile);
router.put("/me", protect, updateMyProfile);
router.post("/", protect,createProfileSubmission);
router.post('/upload-photo', upload.single('image'), updateProfileImage);

export default router;

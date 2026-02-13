import express from "express";
import { createProfileSubmission } from "../controllers/profileController.js";

const router = express.Router();

router.post("/", createProfileSubmission);

export default router;

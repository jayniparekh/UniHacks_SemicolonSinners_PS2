import express from "express";
import { updateUser } from "../controllers/userController.js";

const router = express.Router();

router.put("/intake/:userId", updateUser);

export default router;

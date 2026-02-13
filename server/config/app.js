import express from "express";
import dotenv from "dotenv";
import db from "./db.js";
import userRoutes from "../routes/userRoutes.js";

dotenv.config({ path: "../.env" });

const app = express();

app.use(express.json());

db(); 

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

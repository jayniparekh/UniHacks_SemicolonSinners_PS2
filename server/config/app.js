import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import express from 'express';
import cors from 'cors';

import connectDB from './db.js';
import authRoutes from '../routes/authRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import profileRoutes from '../routes/profileRoutes.js';


const app = express();

// Connect database
connectDB;

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server running' });
});


app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use("/api/profile", profileRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

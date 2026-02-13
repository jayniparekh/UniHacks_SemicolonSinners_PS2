import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import connectDB from './db.js';
import authRoutes from '../routes/authRoutes.js';

const app = express();

// Connect database
connectDB;

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server running' });
});

// Auth routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 10000;

// This tells Express what to show when someone opens your URL
app.get('/', (req, res) => {
  res.send('<h1>🚀 ProfilePro Backend is Live!</h1><p>The server and MongoDB are connected successfully.</p>');
});

app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from "path";
import { fileURLToPath } from "url";
import traineeFormRoutes from './routes/traineeFormRoutes.js';
import traineeProfileRoutes from './routes/traineeProfileRoutes.js';
import trainingFormRoutes from "./routes/trainingFormRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use("/api/traineeProfile", traineeProfileRoutes);
app.use("/api/traineeForm", traineeFormRoutes);
app.use("/api/training", trainingFormRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB Connected Successfully');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('Mongo error:', err));
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import TraineeForm from '../models/traineeFormModel.js';

const router = express.Router();

const uploadDir = "uploads/sign";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post('/', upload.single('signature'), async (req, res) => {
  try {
    const { qualifications, references, documents, submitted } = req.body;

    const form = new TraineeForm({
      qualifications: JSON.parse(qualifications),
      references: JSON.parse(references),
      documents: JSON.parse(documents),
      submitted,
      signature: req.file?.filename || null,
    });

    await form.save();
    res.status(201).json({ message: 'Trainee form submitted successfully!' });
  } catch (err) {
    console.error('Error saving form:', err);
    res.status(500).json({ error: 'Failed to submit trainee form' });
  }
});

export default router;
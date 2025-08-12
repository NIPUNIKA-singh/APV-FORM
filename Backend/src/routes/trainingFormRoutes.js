import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import TrainingForm from "../models/trainingFormModel.js";

const router = express.Router();

const uploadDir = "uploads/signatures";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `signature_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("signature"), async (req, res) => {
  try {
    const {
      checkedBy,
      verifiedBy,
      approvedBy,
      startDate,
      endDate,
      projectDesc,
      teamLeader,
      projectManager,
      certificateNo,
      issueDate
    } = req.body;

    const signaturePath = req.file ? req.file.path : null;

    const newEntry = new TrainingForm({
      checkedBy,
      verifiedBy,
      approvedBy,
      startDate,
      endDate,
      projectDesc,
      teamLeader,
      projectManager,
      certificateNo,
      issueDate,
      signature: signaturePath
    });

    await newEntry.save();
    res.status(201).json({ message: "Training form submitted successfully!" });
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).json({ error: "Failed to submit training form." });
  }
});

export default router;
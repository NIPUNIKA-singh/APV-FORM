import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import TraineeProfile from "../models/traineeProfileModel.js";

const router = express.Router();

const uploadDir = "uploads/profiles";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const {
      fullName, dateOfBirth, fatherName,
      residentialAddress, mobileNumber,
      permanentAddress, alternateMobileNumber,
      aadhaarNumber, colleges,
    } = req.body;

    const traineeProfile = new TraineeProfile({
      fullName,
      dateOfBirth,
      fatherName,
      residentialAddress,
      mobileNumber,
      permanentAddress,
      alternateMobileNumber,
      aadhaarNumber,
      colleges: JSON.parse(colleges),
      photo: req.file?.filename || null,
    });

    const saved = await traineeProfile.save();
    res.status(201).json({ message: "Form info saved", data: saved });
  } catch (err) {
    console.error("Form Save Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
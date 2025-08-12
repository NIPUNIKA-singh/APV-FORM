import mongoose from "mongoose";

const trainingFormSchema = new mongoose.Schema({
  checkedBy: String,
  verifiedBy: String,
  approvedBy: String,
  startDate: String,
  endDate: String,
  projectDesc: String,
  teamLeader: String,
  projectManager: String,
  certificateNo: String,
  issueDate: String,
  signature: String,
});

export default mongoose.model("TrainingForm", trainingFormSchema);
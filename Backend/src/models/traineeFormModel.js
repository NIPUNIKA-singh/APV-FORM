import mongoose from 'mongoose';

const traineeFormSchema = new mongoose.Schema({
  qualifications: [
    {
      year: String,
      examination: String,
      board: String,
      subject: String,
      percentage: String,
    },
  ],
  references: [
    {
      name: String,
      address: String,
      mobile: String,
    },
  ],
  documents: {
    requestLetter: Boolean,
    idProof: Boolean,
    photo: Boolean,
  },
  submitted: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No',
  },
  signature: String,
}, {
  timestamps: true,
});

const TraineeForm = mongoose.model('TraineeForm', traineeFormSchema);
export default TraineeForm;
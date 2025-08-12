import mongoose from 'mongoose';

const traineeProfileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  fatherName: {
    type: String,
    required: true,
    trim: true
  },
  residentialAddress: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
    trim: true
  },
  alternateMobileNumber: {
    type: Number,
    required: true,
  },
  aadhaarNumber: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    default: null,
    required: true,
  },
  colleges: [
    {
      institutionName: {
        type: String,
        required: true,
        trim: true
      },
      course: {
        type: String,
        required: true,
        trim: true
      },
      semester: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      }
    }
  ]
}, {
  timestamps: true
});

const TraineeProfile = mongoose.model('TraineeProfile', traineeProfileSchema);
export default TraineeProfile;
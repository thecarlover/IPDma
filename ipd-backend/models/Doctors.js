import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  contact: {
    type: String,
    required: true,
  },

  experience: {
    type: Number, // Years of experience
    default: 0,
  },

  languages: {
    type: [String],
    default: ["Hindi", "English"], // Default spoken languages
  },

  specialization: {
    type: String,
    required: true,
  },

  availableDays: {
    type: [String], // E.g. ["Monday", "Wednesday"]
    default: [],
  },

  photoUrl: {
    type: String, // Doctor's profile image URL
  },

  isActive: {
    type: Boolean,
    default: true,
  },

}, {
  timestamps: true,
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;

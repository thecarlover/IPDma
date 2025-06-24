import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  admittedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Admitted' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Patient', patientSchema);

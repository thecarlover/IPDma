import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: {
    type: String,
    required: true,
    
  },
  admittedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Admitted' },
  address: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  visitCount: {
      type: Number,
      default: 1, // Jab pehli baar create ho
    },
});

export default mongoose.model('Patient', patientSchema);

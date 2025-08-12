import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { clerkMiddleware } from '@clerk/express';
import patientRoutes from './routes/patientRoutes.js';
import userRoutes from './routes/userRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';

const app = express();

app.use(clerkMiddleware());

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/patients', patientRoutes);
app.use('/api/users', userRoutes);

app.use('/api/doctors', doctorRoutes);


app.get('/',(req,res){
  res.send(
    {
      activeStatus:true,
      message:"Server is running"
      
    }
  )
})

// Connect to MongoDB once per cold start (not per request)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log('✅ MongoDB connected');
}

export default async function handler(req, res) {
  try {
    await connectDB();
    app(req, res); // Let Express handle the request
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { clerkMiddleware } from '@clerk/express';
import patientRoutes from './routes/patientRoutes.js';
import userRoutes from './routes/userRoutes.js';
import doctorRoutes from "./routes/doctorRoutes.js";


const app = express();

app.use(clerkMiddleware()); // attaches req.auth :contentReference[oaicite:4]{index=4}

app.use(cors({ origin:'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/patients', patientRoutes);
app.use('/api/users', userRoutes);
app.use("/api/doctors", doctorRoutes);





mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log('🚀 Server running')))
  .catch(console.error);

import express from "express";
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

import { requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/create",requireRole('admin'), createDoctor);
router.get("/",requireRole('admin','receptionist'), getAllDoctors);
router.get("/:id",requireRole('admin','receptionist'), getDoctorById);
router.put("/:id",requireRole('admin'), updateDoctor);
router.delete("/:id",requireRole('admin'), deleteDoctor);

export default router;

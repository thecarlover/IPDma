import express from 'express';
import { requireRole } from '../middleware/authMiddleware.js';
import { createReceptionist } from '../controllers/userController.js';
import { getAllReceptionists } from "../controllers/userController.js";

const router = express.Router();
router.get("/receptionists", requireRole("admin"), getAllReceptionists);
router.post('/receptionists', requireRole('admin'), createReceptionist);

export default router;

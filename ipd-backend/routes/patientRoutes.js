import express from 'express';
import {
  createPatient,
  getAllPatients,
  updatePatient,
  deletePatient,
  getTodaysPatients
} from '../controllers/patientController.js';
import { requireRole } from '../middleware/authMiddleware.js';


const router = express.Router();


// Both admin & receptionist can list/create
router.get('/', requireRole('admin'), getAllPatients);

router.post('/', requireRole('admin','receptionist'), createPatient);


router.put('/:id', requireRole('admin','receptionist'), updatePatient);
router.delete('/:id', requireRole('admin','receptionist'), deletePatient);

router.get('/today', requireRole('admin','receptionist'), getTodaysPatients);




export default router;

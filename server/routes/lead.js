import express from 'express';
import {
  createLead,
  getAllLeads,
  getLead,
  updateLead,
  addLeadNote,
  deleteLead,
  getLeadStats
} from '../controllers/leadController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/', createLead);

// Admin routes
router.get('/', protect, authorize('admin'), getAllLeads);
router.get('/stats', protect, authorize('admin'), getLeadStats);
router.get('/:id', protect, authorize('admin'), getLead);
router.put('/:id', protect, authorize('admin'), updateLead);
router.post('/:id/notes', protect, authorize('admin'), addLeadNote);
router.delete('/:id', protect, authorize('admin'), deleteLead);

export default router;

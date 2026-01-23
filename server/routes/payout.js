import express from 'express';
import {
  createPayoutRequest,
  getAllPayouts,
  getVendorPayouts,
  getPayout,
  updatePayoutStatus,
  getPayoutStats
} from '../controllers/payoutController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Vendor routes
router.post('/', protect, authorize('vendor'), createPayoutRequest);
router.get('/vendor', protect, authorize('vendor'), getVendorPayouts);

// Admin routes
router.get('/', protect, authorize('admin'), getAllPayouts);
router.get('/stats', protect, authorize('admin'), getPayoutStats);
router.get('/:id', protect, authorize('admin', 'vendor'), getPayout);
router.put('/:id/status', protect, authorize('admin'), updatePayoutStatus);

export default router;

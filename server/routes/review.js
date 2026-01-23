import express from 'express';
import {
  createReview,
  getAllReviews,
  getServiceReviews,
  getVendorReviews,
  updateReviewStatus,
  addVendorResponse,
  markHelpful,
  deleteReview,
  getReviewStats
} from '../controllers/reviewController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.post('/', protect, authorize('guest'), createReview);
router.post('/:id/helpful', markHelpful);

// Public routes
router.get('/service/:serviceType/:serviceId', getServiceReviews);
router.get('/vendor/:vendorId', getVendorReviews);

// Vendor routes
router.post('/:id/response', protect, authorize('vendor'), addVendorResponse);

// Admin routes
router.get('/', protect, authorize('admin'), getAllReviews);
router.get('/stats', protect, authorize('admin'), getReviewStats);
router.put('/:id/status', protect, authorize('admin'), updateReviewStatus);
router.delete('/:id', protect, authorize('admin'), deleteReview);

export default router;

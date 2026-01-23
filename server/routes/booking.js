import express from 'express';
import {
  createBooking,
  getGuestBookings,
  getVendorBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking,
  getVendorBookingStats
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Guest routes
router.post('/', authorize('guest'), createBooking);
router.get('/guest', authorize('guest'), getGuestBookings);
router.patch('/:id/cancel', authorize('guest'), cancelBooking);

// Vendor routes
router.get('/vendor', authorize('vendor'), getVendorBookings);
router.get('/vendor/stats', authorize('vendor'), getVendorBookingStats);
router.patch('/:id/status', authorize('vendor'), updateBookingStatus);

// Shared routes (guest and vendor)
router.get('/:id', getBooking);

export default router;

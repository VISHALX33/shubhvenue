import express from 'express';
import {
  getFlatBookings,
  getFlatBookingById,
  createFlatBooking,
  updateFlatBooking,
  deleteFlatBooking,
  addReview
} from '../controllers/flatBookingController.js';

const router = express.Router();

router.get('/', getFlatBookings);
router.get('/:id', getFlatBookingById);
router.post('/', createFlatBooking);
router.put('/:id', updateFlatBooking);
router.delete('/:id', deleteFlatBooking);
router.post('/:id/reviews', addReview);

export default router;

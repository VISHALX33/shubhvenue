import express from 'express';
import {
  getPGHostels,
  getPGHostelById,
  createPGHostel,
  updatePGHostel,
  deletePGHostel,
  addReview
} from '../controllers/pgHostelBookingController.js';

const router = express.Router();

// Get all PG/Hostels or create new
router.route('/').get(getPGHostels).post(createPGHostel);

// Get, update, or delete specific PG/Hostel
router.route('/:id').get(getPGHostelById).put(updatePGHostel).delete(deletePGHostel);

// Add review
router.post('/:id/reviews', addReview);

export default router;

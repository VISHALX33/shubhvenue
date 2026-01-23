import express from 'express';
import {
  getCarRentals,
  getCarRentalById,
  createCarRental,
  updateCarRental,
  deleteCarRental,
  addReview
} from '../controllers/carRentalWeddingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCarRentals)
  .post(protect, createCarRental);

router.route('/:id')
  .get(getCarRentalById)
  .put(updateCarRental)
  .delete(deleteCarRental);

router.route('/:id/reviews')
  .post(addReview);

export default router;

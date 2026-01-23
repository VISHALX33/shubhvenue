import express from 'express';
import { getHotels, getHotel, createHotel, updateHotel, addReview } from '../controllers/hotelController.js';

const router = express.Router();

router.route('/')
  .get(getHotels)
  .post(createHotel);

router.route('/:id')
  .get(getHotel)
  .put(updateHotel);

router.route('/:id/reviews')
  .post(addReview);

export default router;

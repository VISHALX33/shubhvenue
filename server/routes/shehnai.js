import express from 'express';
import { getShehnais, getShehnai, createShehnai, addReview } from '../controllers/shehnaiController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getShehnais)
  .post(protect, createShehnai);

router.route('/:id')
  .get(getShehnai);

router.route('/:id/reviews')
  .post(addReview);

export default router;

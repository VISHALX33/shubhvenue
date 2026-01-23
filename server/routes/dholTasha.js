import express from 'express';
import { getDholTashas, getDholTasha, createDholTasha, addReview } from '../controllers/dholTashaController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getDholTashas)
  .post(protect, createDholTasha);

router.route('/:id')
  .get(getDholTasha);

router.route('/:id/reviews')
  .post(addReview);

export default router;

import express from 'express';
import { getTents, getTent, createTent, addReview } from '../controllers/tentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getTents)
  .post(protect, createTent);

router.route('/:id')
  .get(getTent);

router.route('/:id/reviews')
  .post(addReview);

export default router;

import express from 'express';
import { getDJs, getDJ, createDJ, addReview } from '../controllers/djController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getDJs)
  .post(protect, createDJ);

router.route('/:id')
  .get(getDJ);

router.route('/:id/reviews')
  .post(addReview);

export default router;

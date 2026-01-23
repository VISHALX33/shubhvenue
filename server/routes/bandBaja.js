import express from 'express';
import { getBandBajas, getBandBaja, createBandBaja, addReview } from '../controllers/bandBajaController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getBandBajas)
  .post(protect, createBandBaja);

router.route('/:id')
  .get(getBandBaja);

router.route('/:id/reviews')
  .post(addReview);

export default router;

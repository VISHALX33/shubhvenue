import express from 'express';
import { getCaterers, getCaterer, createCaterer, addReview } from '../controllers/cateringController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCaterers)
  .post(protect, createCaterer);

router.route('/:id')
  .get(getCaterer);

router.route('/:id/reviews')
  .post(addReview);

export default router;

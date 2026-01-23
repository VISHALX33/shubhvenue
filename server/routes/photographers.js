import express from 'express';
import { getPhotographers, getPhotographer, createPhotographer, addReview } from '../controllers/photographerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getPhotographers)
  .post(protect, createPhotographer);

router.route('/:id')
  .get(getPhotographer);

router.route('/:id/reviews')
  .post(addReview);

export default router;

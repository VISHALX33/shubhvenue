import express from 'express';
import {
  getVideographers,
  getVideographer,
  createVideographer,
  addReview
} from '../controllers/videographerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getVideographers)
  .post(protect, createVideographer);

router.route('/:id')
  .get(getVideographer);

router.route('/:id/reviews')
  .post(addReview);

export default router;

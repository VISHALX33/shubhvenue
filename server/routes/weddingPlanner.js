import express from 'express';
import {
  getWeddingPlanners,
  getWeddingPlanner,
  createWeddingPlanner,
  addReview
} from '../controllers/weddingPlannerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getWeddingPlanners)
  .post(protect, createWeddingPlanner);

router.route('/:id')
  .get(getWeddingPlanner);

router.route('/:id/reviews')
  .post(addReview);

export default router;

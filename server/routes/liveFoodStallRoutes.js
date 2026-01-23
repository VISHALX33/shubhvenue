import express from 'express';
import {
  getLiveFoodStalls,
  getLiveFoodStallById,
  createLiveFoodStall,
  updateLiveFoodStall,
  deleteLiveFoodStall,
  addReview,
} from '../controllers/liveFoodStallController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getLiveFoodStalls).post(protect, createLiveFoodStall);

router
  .route('/:id')
  .get(getLiveFoodStallById)
  .put(updateLiveFoodStall)
  .delete(deleteLiveFoodStall);

router.route('/:id/reviews').post(addReview);

export default router;

import express from 'express';
import {
  getJuiceCounters,
  getJuiceCounterById,
  createJuiceCounter,
  updateJuiceCounter,
  deleteJuiceCounter,
  addReview,
} from '../controllers/juiceCounterController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getJuiceCounters).post(protect, createJuiceCounter);

router
  .route('/:id')
  .get(getJuiceCounterById)
  .put(updateJuiceCounter)
  .delete(deleteJuiceCounter);

router.route('/:id/reviews').post(addReview);

export default router;

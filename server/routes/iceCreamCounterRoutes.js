import express from 'express';
import {
  getIceCreamCounters,
  getIceCreamCounterById,
  createIceCreamCounter,
  updateIceCreamCounter,
  deleteIceCreamCounter,
  addReview,
} from '../controllers/iceCreamCounterController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getIceCreamCounters).post(protect, createIceCreamCounter);

router
  .route('/:id')
  .get(getIceCreamCounterById)
  .put(updateIceCreamCounter)
  .delete(deleteIceCreamCounter);

router.route('/:id/reviews').post(addReview);

export default router;

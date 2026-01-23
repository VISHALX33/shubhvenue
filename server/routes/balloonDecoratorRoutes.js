import express from 'express';
import {
  getBalloonDecorators,
  getBalloonDecoratorById,
  createBalloonDecorator,
  updateBalloonDecorator,
  deleteBalloonDecorator,
  addReview
} from '../controllers/balloonDecoratorController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getBalloonDecorators)
  .post(protect, createBalloonDecorator);

router.route('/:id')
  .get(getBalloonDecoratorById)
  .put(updateBalloonDecorator)
  .delete(deleteBalloonDecorator);

router.route('/:id/reviews')
  .post(addReview);

export default router;

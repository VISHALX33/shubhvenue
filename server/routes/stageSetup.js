import express from 'express';
import { getStageSetups, getStageSetup, createStageSetup, addReview } from '../controllers/stageSetupController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getStageSetups)
  .post(protect, createStageSetup);

router.route('/:id')
  .get(getStageSetup);

router.route('/:id/reviews')
  .post(addReview);

export default router;

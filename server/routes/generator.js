import express from 'express';
import { getGenerators, getGenerator, createGenerator, addReview } from '../controllers/generatorController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getGenerators)
  .post(protect, createGenerator);

router.route('/:id')
  .get(getGenerator);

router.route('/:id/reviews')
  .post(addReview);

export default router;

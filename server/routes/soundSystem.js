import express from 'express';
import { getSoundSystems, getSoundSystem, createSoundSystem, addReview } from '../controllers/soundSystemController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getSoundSystems)
  .post(protect, createSoundSystem);

router.route('/:id')
  .get(getSoundSystem);

router.route('/:id/reviews')
  .post(addReview);

export default router;

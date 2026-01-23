import express from 'express';
import { getLightingSetups, getLightingSetup, createLightingSetup, addReview } from '../controllers/lightingSetupController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getLightingSetups)
  .post(protect, createLightingSetup);

router.route('/:id')
  .get(getLightingSetup);

router.route('/:id/reviews')
  .post(addReview);

export default router;

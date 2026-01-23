import express from 'express';
import {
  getEventManagers,
  getEventManager,
  createEventManager,
  addReview
} from '../controllers/eventManagementController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getEventManagers)
  .post(protect, createEventManager);

router.route('/:id')
  .get(getEventManager);

router.route('/:id/reviews')
  .post(addReview);

export default router;

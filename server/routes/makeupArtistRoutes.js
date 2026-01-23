import express from 'express';
import {
  getMakeupArtists,
  getMakeupArtist,
  createMakeupArtist,
  updateMakeupArtist,
  deleteMakeupArtist,
  addReview
} from '../controllers/makeupArtistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getMakeupArtists)
  .post(protect, createMakeupArtist);

router.route('/:id')
  .get(getMakeupArtist)
  .put(updateMakeupArtist)
  .delete(deleteMakeupArtist);

router.route('/:id/reviews')
  .post(addReview);

export default router;

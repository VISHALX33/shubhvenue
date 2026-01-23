import express from 'express';
import {
  getMehndiArtists,
  getMehndiArtist,
  createMehndiArtist,
  updateMehndiArtist,
  deleteMehndiArtist,
  addReview
} from '../controllers/mehndiArtistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getMehndiArtists)
  .post(protect, createMehndiArtist);

router.route('/:id')
  .get(getMehndiArtist)
  .put(updateMehndiArtist)
  .delete(deleteMehndiArtist);

router.route('/:id/reviews')
  .post(addReview);

export default router;

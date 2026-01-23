import express from 'express';
import {
  getBouncyKidsGames,
  getBouncyKidsGameById,
  createBouncyKidsGame,
  updateBouncyKidsGame,
  deleteBouncyKidsGame,
  addReview
} from '../controllers/bouncyKidsGameController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getBouncyKidsGames)
  .post(protect, createBouncyKidsGame);

router.route('/:id')
  .get(getBouncyKidsGameById)
  .put(updateBouncyKidsGame)
  .delete(deleteBouncyKidsGame);

router.route('/:id/reviews')
  .post(addReview);

export default router;

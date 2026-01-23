import express from 'express';
import {
  getBanquetHalls,
  getBanquetHall,
  createBanquetHall,
  updateBanquetHall,
  addReview
} from '../controllers/banquetHallController.js';

const router = express.Router();

router.route('/')
  .get(getBanquetHalls)
  .post(createBanquetHall);

router.route('/:id')
  .get(getBanquetHall)
  .put(updateBanquetHall);
  

router.route('/:id/reviews')
  .post(addReview);

export default router;

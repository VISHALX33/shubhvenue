import express from 'express';
import { getResorts, getResort, createResort, updateResort, addReview } from '../controllers/resortController.js';

const router = express.Router();

router.route('/')
  .get(getResorts)
  .post(createResort);

router.route('/:id')
  .get(getResort)
  .put(updateResort);

router.route('/:id/reviews')
  .post(addReview);

export default router;

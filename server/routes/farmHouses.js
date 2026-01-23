import express from 'express';
import {
  getFarmHouses,
  getFarmHouse,
  createFarmHouse,
  updateFarmHouse,
  addReview 
} from '../controllers/farmHouseController.js';

const router = express.Router();

router.route('/')
  .get(getFarmHouses)
  .post(createFarmHouse);

router.route('/:id')
  .get(getFarmHouse)
  .put(updateFarmHouse);

router.route('/:id/reviews')
  .post(addReview);

export default router;

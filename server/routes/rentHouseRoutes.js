import express from 'express';
import {
  getRentHouses,
  getRentHouseById,
  createRentHouse,
  updateRentHouse,
  deleteRentHouse,
  addReview
} from '../controllers/rentHouseController.js';

const router = express.Router();

router.get('/', getRentHouses);
router.get('/:id', getRentHouseById);
router.post('/', createRentHouse);
router.put('/:id', updateRentHouse);
router.delete('/:id', deleteRentHouse);
router.post('/:id/reviews', addReview);

export default router;

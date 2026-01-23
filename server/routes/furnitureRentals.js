import express from 'express';
import {
  getFurnitureRentals,
  getFurnitureRental,
  createFurnitureRental,
  updateFurnitureRental,
  deleteFurnitureRental
} from '../controllers/furnitureRentalController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getFurnitureRentals)
  .post(protect, createFurnitureRental);

router.route('/:id')
  .get(getFurnitureRental)
  .put(protect, updateFurnitureRental)
  .delete(protect, deleteFurnitureRental);

export default router;

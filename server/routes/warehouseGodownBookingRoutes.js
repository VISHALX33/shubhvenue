import express from 'express';
import {
  getWarehouseGodowns,
  getWarehouseGodownById,
  createWarehouseGodown,
  updateWarehouseGodown,
  deleteWarehouseGodown,
  addReview
} from '../controllers/warehouseGodownBookingController.js';

const router = express.Router();

// Get all warehouses/godowns and create new
router.route('/')
  .get(getWarehouseGodowns)
  .post(createWarehouseGodown);

// Get, update, delete specific warehouse/godown
router.route('/:id')
  .get(getWarehouseGodownById)
  .put(updateWarehouseGodown)
  .delete(deleteWarehouseGodown);

// Add review
router.post('/:id/reviews', addReview);

export default router;

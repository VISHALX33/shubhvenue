import express from 'express';
import {
  getShops,
  getShopById,
  createShop,
  updateShop,
  deleteShop,
  addReview
} from '../controllers/shopBookingController.js';

const router = express.Router();

// Get all Shops or create new
router.route('/').get(getShops).post(createShop);

// Get, update, or delete specific Shop
router.route('/:id').get(getShopById).put(updateShop).delete(deleteShop);

// Add review
router.post('/:id/reviews', addReview);

export default router;

import express from 'express';
import {
  getFlowerVendors,
  getFlowerVendorById,
  createFlowerVendor,
  updateFlowerVendor,
  deleteFlowerVendor,
  addReview
} from '../controllers/flowerVendorController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getFlowerVendors)
  .post(protect, createFlowerVendor);

router.route('/:id')
  .get(getFlowerVendorById)
  .put(updateFlowerVendor)
  .delete(deleteFlowerVendor);

router.route('/:id/reviews')
  .post(addReview);

export default router;

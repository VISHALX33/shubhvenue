import express from 'express';
import {
  getSweetShopOrders,
  getSweetShopOrderById,
  createSweetShopOrder,
  updateSweetShopOrder,
  deleteSweetShopOrder,
  addReview,
} from '../controllers/sweetShopOrderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getSweetShopOrders).post(protect, createSweetShopOrder);

router
  .route('/:id')
  .get(getSweetShopOrderById)
  .put(updateSweetShopOrder)
  .delete(deleteSweetShopOrder);

router.route('/:id/reviews').post(addReview);

export default router;

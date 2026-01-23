import express from 'express';
import {
  getCostumeDresses,
  getCostumeDress,
  createCostumeDress,
  updateCostumeDress,
  deleteCostumeDress,
  addReview
} from '../controllers/costumeDressController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCostumeDresses)
  .post(protect, createCostumeDress);

router.route('/:id')
  .get(getCostumeDress)
  .put(updateCostumeDress)
  .delete(deleteCostumeDress);

router.route('/:id/reviews')
  .post(addReview);

export default router;

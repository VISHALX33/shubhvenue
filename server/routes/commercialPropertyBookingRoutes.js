import express from 'express';
import {
  getCommercialProperties,
  getCommercialPropertyById,
  createCommercialProperty,
  updateCommercialProperty,
  deleteCommercialProperty,
  addReview
} from '../controllers/commercialPropertyBookingController.js';

const router = express.Router();

router.get('/', getCommercialProperties);
router.post('/', createCommercialProperty);
router.get('/:id', getCommercialPropertyById);
router.put('/:id', updateCommercialProperty);
router.delete('/:id', deleteCommercialProperty);
router.post('/:id/reviews', addReview);

export default router;

import express from 'express';
import {
  getEventFurniture,
  getEventFurnitureById,
  createEventFurniture,
  updateEventFurniture,
  deleteEventFurniture,
  addReview
} from '../controllers/eventFurnitureController.js';

const router = express.Router();

router.route('/')
  .get(getEventFurniture)
  .post(createEventFurniture);

router.route('/:id')
  .get(getEventFurnitureById)
  .put(updateEventFurniture)
  .delete(deleteEventFurniture);

router.route('/:id/reviews')
  .post(addReview);

export default router;

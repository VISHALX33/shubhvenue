import express from 'express';
import {
  getOfficeSpaces,
  getOfficeSpaceById,
  createOfficeSpace,
  updateOfficeSpace,
  deleteOfficeSpace,
  addReview
} from '../controllers/officeSpaceBookingController.js';

const router = express.Router();

// Get all office spaces and create new
router.route('/')
  .get(getOfficeSpaces)
  .post(createOfficeSpace);

// Get, update, delete specific office space
router.route('/:id')
  .get(getOfficeSpaceById)
  .put(updateOfficeSpace)
  .delete(deleteOfficeSpace);

// Add review
router.post('/:id/reviews', addReview);

export default router;

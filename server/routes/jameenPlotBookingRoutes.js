import express from 'express';
import {
  getJameenPlots,
  getJameenPlotById,
  createJameenPlot,
  updateJameenPlot,
  deleteJameenPlot,
  addReview
} from '../controllers/jameenPlotBookingController.js';

const router = express.Router();

// Get all jameen/plots and create new
router.route('/')
  .get(getJameenPlots)
  .post(createJameenPlot);

// Get, update, delete specific jameen/plot
router.route('/:id')
  .get(getJameenPlotById)
  .put(updateJameenPlot)
  .delete(deleteJameenPlot);

// Add review
router.post('/:id/reviews', addReview);

export default router;

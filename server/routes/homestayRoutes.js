import express from 'express';
import {
  getHomestays,
  getHomestay,
  createHomestay,
  updateHomestay,
  deleteHomestay
} from '../controllers/homestayController.js';

const router = express.Router();

router.route('/')
  .get(getHomestays)
  .post(createHomestay);

router.route('/:id')
  .get(getHomestay)
  .put(updateHomestay)
  .delete(deleteHomestay);

export default router;

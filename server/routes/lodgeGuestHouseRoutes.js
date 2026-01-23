import express from 'express';
import {
  getLodges,
  getLodge,
  createLodge,
  updateLodge,
  deleteLodge
} from '../controllers/lodgeGuestHouseController.js';

const router = express.Router();

router.route('/')
  .get(getLodges)
  .post(createLodge);

router.route('/:id')
  .get(getLodge)
  .put(updateLodge)
  .delete(deleteLodge);

export default router;

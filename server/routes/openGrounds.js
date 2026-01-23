import express from 'express'
import { getOpenGrounds, getOpenGround, createOpenGround, updateOpenGround, addReview } from '../controllers/openGroundController.js'

const router = express.Router()

router.route('/')
  .get(getOpenGrounds)
  .post(createOpenGround)

router.route('/:id')
  .get(getOpenGround)
  .put(updateOpenGround)

router.route('/:id/reviews')
  .post(addReview)

export default router;

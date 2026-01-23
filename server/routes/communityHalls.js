import express from 'express'
import { getCommunityHalls, getCommunityHall, createCommunityHall, updateCommunityHall, addReview } from '../controllers/communityHallController.js'

const router = express.Router()

router.route('/')
  .get(getCommunityHalls)
  .post(createCommunityHall)

router.route('/:id')
  .get(getCommunityHall)
  .put(updateCommunityHall)

router.route('/:id/reviews')
  .post(addReview)

export default router;

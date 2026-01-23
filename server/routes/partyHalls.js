import express from 'express'
import { getPartyHalls, getPartyHall, createPartyHall, updatePartyHall, addReview } from '../controllers/partyHallController.js'

const router = express.Router()

router.route('/')
  .get(getPartyHalls)
  .post(createPartyHall)

router.route('/:id')
  .get(getPartyHall)
  .put(updatePartyHall)

router.route('/:id/reviews')
  .post(addReview)

export default router;

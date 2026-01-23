import express from 'express'
import { getCorporateEventSpaces, getCorporateEventSpace, createCorporateEventSpace, updateCorporateEventSpace, addReview } from '../controllers/corporateEventSpaceController.js'

const router = express.Router()

router.route('/')
  .get(getCorporateEventSpaces)
  .post(createCorporateEventSpace)

router.route('/:id')
  .get(getCorporateEventSpace)
  .put(updateCorporateEventSpace)

router.route('/:id/reviews')
  .post(addReview)

export default router;

import express from 'express';
import { getMarriageGardens, getMarriageGarden, createMarriageGarden, updateMarriageGarden, addReview } from '../controllers/marriageGardenController.js';

const router = express.Router();

router.get('/marriage-gardens', getMarriageGardens);
router.get('/marriage-gardens/:id', getMarriageGarden);
router.post('/marriage-gardens', createMarriageGarden);
router.put('/marriage-gardens/:id', updateMarriageGarden);
router.post('/marriage-gardens/:id/reviews', addReview);

export default router;

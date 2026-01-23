import express from 'express';
import { 
  getVendorListings, 
  deleteVendorListing,
  getVendorListing 
} from '../controllers/vendorController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all listings for authenticated vendor
router.get('/listings', getVendorListings);

// Get single listing
router.get('/listings/:id', getVendorListing);

// Delete listing
router.delete('/listings/:id', deleteVendorListing);

export default router;

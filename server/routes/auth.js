import express from 'express';
import { 
  registerVendor, 
  login, 
  firebaseAuth, 
  getCurrentUser,
  getAllUsers,
  getAllVendors
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/register/vendor', registerVendor);
router.post('/login', login);
router.post('/firebase', firebaseAuth);
router.get('/me', protect, getCurrentUser);
router.get('/users', protect, authorize('admin'), getAllUsers);
router.get('/vendors', protect, authorize('admin'), getAllVendors);

export default router;

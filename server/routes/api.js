import express from 'express';
import { getTest, createItem, getItems } from '../controllers/exampleController.js';

const router = express.Router();

// Test route
router.get('/test', getTest);

// Example CRUD routes
router.get('/items', getItems);
router.post('/items', createItem);

export default router;

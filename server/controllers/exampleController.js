import Item from '../models/Item.js';

// Test endpoint
export const getTest = (req, res) => {
  res.json({
    message: 'Backend API is working!',
    timestamp: new Date().toISOString()
  });
};

// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create new item
export const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

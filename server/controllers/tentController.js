import Tent from '../models/Tent.js';

// Get all tents with filters
export const getTents = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, minCapacity, maxCapacity, type } = req.query;
    
    let query = {};
    
    // Filter by city (case-insensitive)
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query['price.perEvent'] = {};
      if (minPrice) query['price.perEvent'].$gte = Number(minPrice);
      if (maxPrice) query['price.perEvent'].$lte = Number(maxPrice);
    }
    
    // Filter by capacity
    if (minCapacity) {
      query['capacity.max'] = { $gte: Number(minCapacity) };
    }
    if (maxCapacity) {
      query['capacity.min'] = { $lte: Number(maxCapacity) };
    }
    
    // Filter by tent type
    if (type) {
      query.type = type;
    }
    
    const tents = await Tent.find(query).sort({ 'ratings.average': -1 });
    
    res.status(200).json({
      success: true,
      count: tents.length,
      data: tents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tents',
      error: error.message
    });
  }
};

// Get single tent by ID
export const getTent = async (req, res) => {
  try {
    const tent = await Tent.findById(req.params.id);
    
    if (!tent) {
      return res.status(404).json({
        success: false,
        message: 'Tent not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: tent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tent',
      error: error.message
    });
  }
};

// Create new tent
export const createTent = async (req, res) => {
  try {
    const tent = await Tent.create({
      ...req.body,
      vendorId: req.user._id
    });
    
    res.status(201).json({
      success: true,
      data: tent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating tent',
      error: error.message
    });
  }
};

// Add review to tent
export const addReview = async (req, res) => {
  try {
    const tent = await Tent.findById(req.params.id);
    
    if (!tent) {
      return res.status(404).json({
        success: false,
        message: 'Tent not found'
      });
    }
    
    tent.reviews.push(req.body);
    
    // Recalculate average rating
    const totalRating = tent.reviews.reduce((sum, review) => sum + review.rating, 0);
    tent.ratings.average = totalRating / tent.reviews.length;
    tent.ratings.count = tent.reviews.length;
    
    await tent.save();
    
    res.status(200).json({
      success: true,
      data: tent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

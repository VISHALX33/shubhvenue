import StageSetup from '../models/StageSetup.js';

// Get all stage setups with filters
export const getStageSetups = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, type, capacity } = req.query;
    
    let query = {};
    
    // City filter
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }
    
    // Price filter
    if (minPrice || maxPrice) {
      query['price.perDay'] = {};
      if (minPrice) query['price.perDay'].$gte = Number(minPrice);
      if (maxPrice) query['price.perDay'].$lte = Number(maxPrice);
    }
    
    // Type filter
    if (type) {
      query.type = type;
    }
    
    // Capacity filter
    if (capacity) {
      query.capacity = { $gte: Number(capacity) };
    }
    
    const stageSetups = await StageSetup.find(query).sort({ 'ratings.average': -1 });
    
    res.status(200).json({
      success: true,
      count: stageSetups.length,
      data: stageSetups
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stage setups',
      error: error.message
    });
  }
};

// Get single stage setup
export const getStageSetup = async (req, res) => {
  try {
    const stageSetup = await StageSetup.findById(req.params.id);
    
    if (!stageSetup) {
      return res.status(404).json({
        success: false,
        message: 'Stage setup not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: stageSetup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stage setup',
      error: error.message
    });
  }
};

// Create stage setup
export const createStageSetup = async (req, res) => {
  try {
    const stageSetup = await StageSetup.create({
      ...req.body,
      vendorId: req.user._id
    });
    
    res.status(201).json({
      success: true,
      data: stageSetup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating stage setup',
      error: error.message
    });
  }
};

// Add review
export const addReview = async (req, res) => {
  try {
    const stageSetup = await StageSetup.findById(req.params.id);
    
    if (!stageSetup) {
      return res.status(404).json({
        success: false,
        message: 'Stage setup not found'
      });
    }
    
    stageSetup.reviews.push(req.body);
    
    // Recalculate average rating
    const totalRating = stageSetup.reviews.reduce((sum, review) => sum + review.rating, 0);
    stageSetup.ratings.average = totalRating / stageSetup.reviews.length;
    stageSetup.ratings.count = stageSetup.reviews.length;
    
    await stageSetup.save();
    
    res.status(200).json({
      success: true,
      data: stageSetup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

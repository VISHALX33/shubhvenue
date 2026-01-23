import SoundSystem from '../models/SoundSystem.js';

// Get all sound systems with filters
export const getSoundSystems = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, type, power, coverage } = req.query;
    
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
    
    // Power filter
    if (power) {
      query.power = { $gte: Number(power) };
    }
    
    // Coverage filter
    if (coverage) {
      query.coverage = { $gte: Number(coverage) };
    }
    
    const soundSystems = await SoundSystem.find(query).sort({ 'ratings.average': -1 });
    
    res.status(200).json({
      success: true,
      count: soundSystems.length,
      data: soundSystems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sound systems',
      error: error.message
    });
  }
};

// Get single sound system
export const getSoundSystem = async (req, res) => {
  try {
    const soundSystem = await SoundSystem.findById(req.params.id);
    
    if (!soundSystem) {
      return res.status(404).json({
        success: false,
        message: 'Sound system not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: soundSystem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sound system',
      error: error.message
    });
  }
};

// Create sound system
export const createSoundSystem = async (req, res) => {
  try {
    const soundSystem = await SoundSystem.create({
      ...req.body,
      vendorId: req.user._id
    });
    
    res.status(201).json({
      success: true,
      data: soundSystem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating sound system',
      error: error.message
    });
  }
};

// Add review
export const addReview = async (req, res) => {
  try {
    const soundSystem = await SoundSystem.findById(req.params.id);
    
    if (!soundSystem) {
      return res.status(404).json({
        success: false,
        message: 'Sound system not found'
      });
    }
    
    soundSystem.reviews.push(req.body);
    
    // Recalculate average rating
    const totalRating = soundSystem.reviews.reduce((sum, review) => sum + review.rating, 0);
    soundSystem.ratings.average = totalRating / soundSystem.reviews.length;
    soundSystem.ratings.count = soundSystem.reviews.length;
    
    await soundSystem.save();
    
    res.status(200).json({
      success: true,
      data: soundSystem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

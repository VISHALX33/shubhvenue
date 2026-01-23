import Photographer from '../models/Photographer.js';

// Get all photographers with filters
export const getPhotographers = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, type, specialization } = req.query;
    
    let query = {};
    
    // Filter by city (case-insensitive)
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }
    
    // Filter by price range (per day)
    if (minPrice || maxPrice) {
      query['price.perDay'] = {};
      if (minPrice) query['price.perDay'].$gte = Number(minPrice);
      if (maxPrice) query['price.perDay'].$lte = Number(maxPrice);
    }
    
    // Filter by photographer type
    if (type) {
      query.type = type;
    }
    
    // Filter by specialization
    if (specialization) {
      query.specializations = { $in: [specialization] };
    }
    
    const photographers = await Photographer.find(query).sort({ 'ratings.average': -1 });
    
    res.status(200).json({
      success: true,
      count: photographers.length,
      data: photographers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching photographers',
      error: error.message
    });
  }
};

// Get single photographer by ID
export const getPhotographer = async (req, res) => {
  try {
    const photographer = await Photographer.findById(req.params.id);
    
    if (!photographer) {
      return res.status(404).json({
        success: false,
        message: 'Photographer not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: photographer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching photographer',
      error: error.message
    });
  }
};

// Create new photographer
export const createPhotographer = async (req, res) => {
  try {
    const photographer = await Photographer.create({
      ...req.body,
      vendorId: req.user._id
    });
    
    res.status(201).json({
      success: true,
      data: photographer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating photographer',
      error: error.message
    });
  }
};

// Add review to photographer
export const addReview = async (req, res) => {
  try {
    const photographer = await Photographer.findById(req.params.id);
    
    if (!photographer) {
      return res.status(404).json({
        success: false,
        message: 'Photographer not found'
      });
    }
    
    photographer.reviews.push(req.body);
    
    // Recalculate average rating
    const totalRating = photographer.reviews.reduce((sum, review) => sum + review.rating, 0);
    photographer.ratings.average = totalRating / photographer.reviews.length;
    photographer.ratings.count = photographer.reviews.length;
    
    await photographer.save();
    
    res.status(200).json({
      success: true,
      data: photographer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

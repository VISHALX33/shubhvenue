import Resort from '../models/Resort.js';

// Get all resorts with filters
export const getResorts = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, minCapacity, maxCapacity, type } = req.query;
    
    let query = {};
    
    // Filter by city (case-insensitive)
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query['price.perDay'] = {};
      if (minPrice) query['price.perDay'].$gte = Number(minPrice);
      if (maxPrice) query['price.perDay'].$lte = Number(maxPrice);
    }
    
    // Filter by capacity
    if (minCapacity || maxCapacity) {
      if (minCapacity) query['capacity.max'] = { $gte: Number(minCapacity) };
      if (maxCapacity) query['capacity.min'] = { $lte: Number(maxCapacity) };
    }
    
    // Filter by type
    if (type) {
      query.type = type;
    }
    
    const resorts = await Resort.find(query).sort({ 'ratings.average': -1 });
    
    res.status(200).json({
      success: true,
      count: resorts.length,
      data: resorts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single resort
export const getResort = async (req, res) => {
  try {
    const resort = await Resort.findById(req.params.id);
    
    if (!resort) {
      return res.status(404).json({
        success: false,
        message: 'Resort not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: resort
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create resort
export const createResort = async (req, res) => {
  try {
    const resort = await Resort.create(req.body);
    
    res.status(201).json({
      success: true,
      data: resort
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    });
  }
};

// Update resort
export const updateResort = async (req, res) => {
  try {
    const resort = await Resort.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!resort) {
      return res.status(404).json({
        success: false,
        message: 'Resort not found'
      });
    }
    
    res.json({
      success: true,
      data: resort
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating resort',
      error: error.message
    });
  }
};

// Add review
export const addReview = async (req, res) => {
  try {
    const resort = await Resort.findById(req.params.id);
    
    if (!resort) {
      return res.status(404).json({
        success: false,
        message: 'Resort not found'
      });
    }
    
    resort.reviews.push(req.body);
    
    // Recalculate average rating
    const totalRating = resort.reviews.reduce((sum, review) => sum + review.rating, 0);
    resort.ratings.average = totalRating / resort.reviews.length;
    resort.ratings.count = resort.reviews.length;
    
    await resort.save();
    
    res.status(200).json({
      success: true,
      data: resort
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    });
  }
};

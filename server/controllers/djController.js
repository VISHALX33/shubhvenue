import DJ from '../models/DJ.js';

// Get all DJs with filters
export const getDJs = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, type, genre } = req.query;
    
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
    
    // Filter by DJ type
    if (type) {
      query.type = type;
    }
    
    // Filter by music genre
    if (genre) {
      query.musicGenres = { $in: [genre] };
    }
    
    const djs = await DJ.find(query).sort({ 'ratings.average': -1 });
    
    res.status(200).json({
      success: true,
      count: djs.length,
      data: djs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching DJs',
      error: error.message
    });
  }
};

// Get single DJ by ID
export const getDJ = async (req, res) => {
  try {
    const dj = await DJ.findById(req.params.id);
    
    if (!dj) {
      return res.status(404).json({
        success: false,
        message: 'DJ not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: dj
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching DJ',
      error: error.message
    });
  }
};

// Create new DJ
export const createDJ = async (req, res) => {
  try {
    const dj = await DJ.create({
      ...req.body,
      vendorId: req.user._id
    });
    
    res.status(201).json({
      success: true,
      data: dj
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating DJ',
      error: error.message
    });
  }
};

// Add review to DJ
export const addReview = async (req, res) => {
  try {
    const dj = await DJ.findById(req.params.id);
    
    if (!dj) {
      return res.status(404).json({
        success: false,
        message: 'DJ not found'
      });
    }
    
    dj.reviews.push(req.body);
    
    // Recalculate average rating
    const totalRating = dj.reviews.reduce((sum, review) => sum + review.rating, 0);
    dj.ratings.average = totalRating / dj.reviews.length;
    dj.ratings.count = dj.reviews.length;
    
    await dj.save();
    
    res.status(200).json({
      success: true,
      data: dj
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

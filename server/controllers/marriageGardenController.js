import MarriageGarden from '../models/MarriageGarden.js';

// Get all marriage gardens
export const getMarriageGardens = async (req, res) => {
  try {
    const { type, city, limit } = req.query;
    
    let query = { isActive: true };
    
    if (type) {
      query.type = type;
    }
    
    if (city) {
      query['location.city'] = city;
    }
    
    const marriageGardens = await MarriageGarden.find(query)
      .limit(limit ? parseInt(limit) : 0)
      .sort({ 'ratings.average': -1 });
    
    res.json({
      success: true,
      count: marriageGardens.length,
      data: marriageGardens
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get single marriage garden
export const getMarriageGarden = async (req, res) => {
  try {
    const marriageGarden = await MarriageGarden.findById(req.params.id);
    
    if (!marriageGarden) {
      return res.status(404).json({
        success: false,
        error: 'Marriage Garden not found'
      });
    }
    
    res.json({
      success: true,
      data: marriageGarden
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create marriage garden
export const createMarriageGarden = async (req, res) => {
  try {
    const marriageGarden = await MarriageGarden.create(req.body);
    
    res.status(201).json({
      success: true,
      data: marriageGarden
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update marriage garden
export const updateMarriageGarden = async (req, res) => {
  try {
    const marriageGarden = await MarriageGarden.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!marriageGarden) {
      return res.status(404).json({
        success: false,
        error: 'Marriage Garden not found'
      });
    }
    
    res.json({
      success: true,
      data: marriageGarden
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Add review to marriage garden
export const addReview = async (req, res) => {
  try {
    const marriageGarden = await MarriageGarden.findById(req.params.id);
    
    if (!marriageGarden) {
      return res.status(404).json({
        success: false,
        error: 'Marriage Garden not found'
      });
    }
    
    marriageGarden.reviews.push(req.body);
    
    // Recalculate average rating
    const totalRating = marriageGarden.reviews.reduce((acc, review) => acc + review.rating, 0);
    marriageGarden.ratings.average = totalRating / marriageGarden.reviews.length;
    marriageGarden.ratings.count = marriageGarden.reviews.length;
    
    await marriageGarden.save();
    
    res.json({
      success: true,
      data: marriageGarden
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

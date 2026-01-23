import BanquetHall from '../models/BanquetHall.js';

// Get all banquet halls with filters
export const getBanquetHalls = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, minCapacity, maxCapacity, type } = req.query;
    
    let query = {};
    
    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }
    
    if (minPrice || maxPrice) {
      query['price.perDay'] = {};
      if (minPrice) query['price.perDay'].$gte = Number(minPrice);
      if (maxPrice) query['price.perDay'].$lte = Number(maxPrice);
    }
    
    if (minCapacity || maxCapacity) {
      if (minCapacity) query['capacity.max'] = { $gte: Number(minCapacity) };
      if (maxCapacity) query['capacity.min'] = { $lte: Number(maxCapacity) };
    }

    if (type) {
      query.type = type;
    }
    
    const banquetHalls = await BanquetHall.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: banquetHalls.length,
      data: banquetHalls
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching banquet halls',
      error: error.message
    });
  }
};

// Get single banquet hall
export const getBanquetHall = async (req, res) => {
  try {
    const banquetHall = await BanquetHall.findById(req.params.id);
    
    if (!banquetHall) {
      return res.status(404).json({
        success: false,
        message: 'Banquet hall not found'
      });
    }
    
    res.json({
      success: true,
      data: banquetHall
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching banquet hall',
      error: error.message
    });
  }
};

// Create banquet hall
export const createBanquetHall = async (req, res) => {
  try {
    const banquetHall = await BanquetHall.create(req.body);
    
    res.status(201).json({
      success: true,
      data: banquetHall
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating banquet hall',
      error: error.message
    });
  }
};

// Update banquet hall
export const updateBanquetHall = async (req, res) => {
  try {
    const banquetHall = await BanquetHall.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!banquetHall) {
      return res.status(404).json({
        success: false,
        message: 'Banquet hall not found'
      });
    }
    
    res.json({
      success: true,
      data: banquetHall
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating banquet hall',
      error: error.message
    });
  }
};

// Add review
export const addReview = async (req, res) => {
  try {
    const { rating, comment, userName } = req.body;
    const banquetHall = await BanquetHall.findById(req.params.id);
    
    if (!banquetHall) {
      return res.status(404).json({
        success: false,
        message: 'Banquet hall not found'
      });
    }
    
    banquetHall.reviews.push({
      userName,
      rating,
      comment,
      date: new Date()
    });
    
    // Update average rating
    const totalRating = banquetHall.reviews.reduce((sum, review) => sum + review.rating, 0);
    banquetHall.ratings.average = totalRating / banquetHall.reviews.length;
    banquetHall.ratings.count = banquetHall.reviews.length;
    
    await banquetHall.save();
    
    res.json({
      success: true,
      data: banquetHall
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

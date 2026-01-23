import FarmHouse from '../models/FarmHouse.js';

// Get all farm houses with filters
export const getFarmHouses = async (req, res) => {
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
    
    const farmHouses = await FarmHouse.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: farmHouses.length,
      data: farmHouses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching farm houses',
      error: error.message
    });
  }
};

// Get single farm house
export const getFarmHouse = async (req, res) => {
  try {
    const farmHouse = await FarmHouse.findById(req.params.id);
    
    if (!farmHouse) {
      return res.status(404).json({
        success: false,
        message: 'Farm house not found'
      });
    }
    
    res.json({
      success: true,
      data: farmHouse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching farm house',
      error: error.message
    });
  }
};

// Create farm house
export const createFarmHouse = async (req, res) => {
  try {
    const farmHouse = await FarmHouse.create(req.body);
    
    res.status(201).json({
      success: true,
      data: farmHouse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating farm house',
      error: error.message
    });
  }
};

// Update farm house
export const updateFarmHouse = async (req, res) => {
  try {
    const farmHouse = await FarmHouse.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!farmHouse) {
      return res.status(404).json({
        success: false,
        message: 'Farm house not found'
      });
    }
    
    res.json({
      success: true,
      data: farmHouse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating farm house',
      error: error.message
    });
  }
};

// Add review
export const addReview = async (req, res) => {
  try {
    const { rating, comment, userName } = req.body;
    const farmHouse = await FarmHouse.findById(req.params.id);
    
    if (!farmHouse) {
      return res.status(404).json({
        success: false,
        message: 'Farm house not found'
      });
    }
    
    farmHouse.reviews.push({
      userName,
      rating,
      comment,
      date: new Date()
    });
    
    // Update average rating
    const totalRating = farmHouse.reviews.reduce((sum, review) => sum + review.rating, 0);
    farmHouse.ratings.average = totalRating / farmHouse.reviews.length;
    farmHouse.ratings.count = farmHouse.reviews.length;
    
    await farmHouse.save();
    
    res.json({
      success: true,
      data: farmHouse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

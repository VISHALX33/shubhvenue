import LodgeGuestHouse from '../models/LodgeGuestHouse.js';

// Get all lodges/guest houses with filters
export const getLodges = async (req, res) => {
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
    
    const lodges = await LodgeGuestHouse.find(query).sort({ 'ratings.average': -1 });
    
    res.status(200).json({
      success: true,
      count: lodges.length,
      data: lodges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single lodge/guest house
export const getLodge = async (req, res) => {
  try {
    const lodge = await LodgeGuestHouse.findById(req.params.id);
    
    if (!lodge) {
      return res.status(404).json({
        success: false,
        message: 'Lodge/Guest House not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: lodge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create lodge/guest house
export const createLodge = async (req, res) => {
  try {
    const lodge = await LodgeGuestHouse.create(req.body);
    
    res.status(201).json({
      success: true,
      data: lodge
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    });
  }
};

// Update lodge/guest house
export const updateLodge = async (req, res) => {
  try {
    const lodge = await LodgeGuestHouse.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!lodge) {
      return res.status(404).json({
        success: false,
        message: 'Lodge/Guest House not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: lodge
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    });
  }
};

// Delete lodge/guest house
export const deleteLodge = async (req, res) => {
  try {
    const lodge = await LodgeGuestHouse.findByIdAndDelete(req.params.id);
    
    if (!lodge) {
      return res.status(404).json({
        success: false,
        message: 'Lodge/Guest House not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Lodge/Guest House deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

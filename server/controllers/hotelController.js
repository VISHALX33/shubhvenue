import Hotel from '../models/Hotel.js';

// Get all hotels with filters
export const getHotels = async (req, res) => {
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
    
    const hotels = await Hotel.find(query).sort({ 'ratings.average': -1 });
    
    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single hotel
export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: hotel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create hotel
export const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    
    res.status(201).json({
      success: true,
      data: hotel
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    });
  }
};

// Update hotel
export const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }
    
    res.json({
      success: true,
      data: hotel
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating hotel',
      error: error.message
    });
  }
};

// Add review
export const addReview = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }
    
    hotel.reviews.push(req.body);
    
    // Recalculate average rating
    const totalRating = hotel.reviews.reduce((sum, review) => sum + review.rating, 0);
    hotel.ratings.average = totalRating / hotel.reviews.length;
    hotel.ratings.count = hotel.reviews.length;
    
    await hotel.save();
    
    res.status(200).json({
      success: true,
      data: hotel
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    });
  }
};

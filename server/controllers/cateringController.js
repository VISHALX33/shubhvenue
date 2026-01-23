import Catering from '../models/Catering.js';

// Get all caterers with filters
export const getCaterers = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minGuests, cuisine, servingStyle } = req.query;
    let query = {};

    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    if (type) {
      query.type = type;
    }

    if (minPrice || maxPrice) {
      query.pricePerPlate = {};
      if (minPrice) query.pricePerPlate.$gte = Number(minPrice);
      if (maxPrice) query.pricePerPlate.$lte = Number(maxPrice);
    }

    if (minGuests) {
      query.maximumGuests = { $gte: Number(minGuests) };
    }

    if (cuisine) {
      query.cuisineTypes = { $in: [cuisine] };
    }

    if (servingStyle) {
      query.servingStyle = servingStyle;
    }

    const caterers = await Catering.find(query).sort({ 'ratings.average': -1 });

    res.status(200).json({
      success: true,
      count: caterers.length,
      data: caterers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single caterer
export const getCaterer = async (req, res) => {
  try {
    const caterer = await Catering.findById(req.params.id);

    if (!caterer) {
      return res.status(404).json({
        success: false,
        message: 'Caterer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: caterer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new caterer
export const createCaterer = async (req, res) => {
  try {
    const caterer = await Catering.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: caterer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    });
  }
};

// Add review to caterer
export const addReview = async (req, res) => {
  try {
    const caterer = await Catering.findById(req.params.id);

    if (!caterer) {
      return res.status(404).json({
        success: false,
        message: 'Caterer not found'
      });
    }

    caterer.reviews.push(req.body);

    // Recalculate average rating
    const totalRating = caterer.reviews.reduce((sum, review) => sum + review.rating, 0);
    caterer.ratings.average = totalRating / caterer.reviews.length;
    caterer.ratings.count = caterer.reviews.length;

    await caterer.save();

    res.status(200).json({
      success: true,
      data: caterer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    });
  }
};

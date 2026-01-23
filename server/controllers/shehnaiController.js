import Shehnai from '../models/Shehnai.js';

// Get all shehnai groups with filters
export const getShehnais = async (req, res) => {
  try {
    const { city, type, musicStyle, minMembers, minShehnaiPlayers, minPrice, maxPrice } = req.query;
    
    let query = {};

    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    if (type) {
      query.type = type;
    }

    if (musicStyle) {
      query.musicStyle = musicStyle;
    }

    if (minMembers) {
      query.groupMembers = { $gte: Number(minMembers) };
    }

    if (minShehnaiPlayers) {
      query.shehnaiPlayers = { $gte: Number(minShehnaiPlayers) };
    }

    if (minPrice || maxPrice) {
      query['price.perEvent'] = {};
      if (minPrice) query['price.perEvent'].$gte = Number(minPrice);
      if (maxPrice) query['price.perEvent'].$lte = Number(maxPrice);
    }

    const shehnais = await Shehnai.find(query).sort({ 'ratings.average': -1 });

    res.status(200).json({
      success: true,
      count: shehnais.length,
      data: shehnais
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single shehnai group
export const getShehnai = async (req, res) => {
  try {
    const shehnai = await Shehnai.findById(req.params.id);

    if (!shehnai) {
      return res.status(404).json({
        success: false,
        message: 'Shehnai group not found'
      });
    }

    res.status(200).json({
      success: true,
      data: shehnai
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create shehnai group
export const createShehnai = async (req, res) => {
  try {
    const shehnai = await Shehnai.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: shehnai
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Add review to shehnai group
export const addReview = async (req, res) => {
  try {
    const shehnai = await Shehnai.findById(req.params.id);

    if (!shehnai) {
      return res.status(404).json({
        success: false,
        message: 'Shehnai group not found'
      });
    }

    shehnai.reviews.push(req.body);
    
    // Recalculate average rating
    const totalRating = shehnai.reviews.reduce((sum, review) => sum + review.rating, 0);
    shehnai.ratings.average = totalRating / shehnai.reviews.length;
    shehnai.ratings.count = shehnai.reviews.length;

    await shehnai.save();

    res.status(200).json({
      success: true,
      data: shehnai
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

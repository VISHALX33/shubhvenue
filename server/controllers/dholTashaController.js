import DholTasha from '../models/DholTasha.js';

// Get all dhol tasha groups with filters
export const getDholTashas = async (req, res) => {
  try {
    const { city, type, minMembers, minDholPlayers, minTashaPlayers, minPrice, maxPrice } = req.query;
    
    let query = {};

    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    if (type) {
      query.type = type;
    }

    if (minMembers) {
      query.groupMembers = { $gte: Number(minMembers) };
    }

    if (minDholPlayers) {
      query.dholPlayers = { $gte: Number(minDholPlayers) };
    }

    if (minTashaPlayers) {
      query.tashaPlayers = { $gte: Number(minTashaPlayers) };
    }

    if (minPrice || maxPrice) {
      query['price.perEvent'] = {};
      if (minPrice) query['price.perEvent'].$gte = Number(minPrice);
      if (maxPrice) query['price.perEvent'].$lte = Number(maxPrice);
    }

    const dholTashas = await DholTasha.find(query).sort({ 'ratings.average': -1 });

    res.status(200).json({
      success: true,
      count: dholTashas.length,
      data: dholTashas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single dhol tasha group
export const getDholTasha = async (req, res) => {
  try {
    const dholTasha = await DholTasha.findById(req.params.id);

    if (!dholTasha) {
      return res.status(404).json({
        success: false,
        message: 'Dhol Tasha group not found'
      });
    }

    res.status(200).json({
      success: true,
      data: dholTasha
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create dhol tasha group
export const createDholTasha = async (req, res) => {
  try {
    const dholTasha = await DholTasha.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: dholTasha
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Add review to dhol tasha group
export const addReview = async (req, res) => {
  try {
    const dholTasha = await DholTasha.findById(req.params.id);

    if (!dholTasha) {
      return res.status(404).json({
        success: false,
        message: 'Dhol Tasha group not found'
      });
    }

    dholTasha.reviews.push(req.body);
    
    // Recalculate average rating
    const totalRating = dholTasha.reviews.reduce((sum, review) => sum + review.rating, 0);
    dholTasha.ratings.average = totalRating / dholTasha.reviews.length;
    dholTasha.ratings.count = dholTasha.reviews.length;

    await dholTasha.save();

    res.status(200).json({
      success: true,
      data: dholTasha
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

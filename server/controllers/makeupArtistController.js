import MakeupArtist from '../models/MakeupArtist.js';

// Get all makeup artists with filters
export const getMakeupArtists = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minExperience } = req.query;
    
    let query = {};

    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    if (type) {
      query.type = type;
    }

    if (minExperience) {
      query.experience = { $gte: Number(minExperience) };
    }

    // For price filtering with packages, check minimum package price
    if (minPrice || maxPrice) {
      const priceQuery = {};
      if (minPrice) priceQuery.$gte = Number(minPrice);
      if (maxPrice) priceQuery.$lte = Number(maxPrice);
      query['packages.price'] = priceQuery;
    }

    const makeupArtists = await MakeupArtist.find(query).sort({ 'ratings.average': -1 });

    res.status(200).json({
      success: true,
      count: makeupArtists.length,
      data: makeupArtists
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single makeup artist
export const getMakeupArtist = async (req, res) => {
  try {
    const makeupArtist = await MakeupArtist.findById(req.params.id);

    if (!makeupArtist) {
      return res.status(404).json({
        success: false,
        message: 'Makeup artist not found'
      });
    }

    res.status(200).json({
      success: true,
      data: makeupArtist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create makeup artist
export const createMakeupArtist = async (req, res) => {
  try {
    const makeupArtist = await MakeupArtist.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: makeupArtist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create makeup artist',
      error: error.message
    });
  }
};

// Update makeup artist
export const updateMakeupArtist = async (req, res) => {
  try {
    const makeupArtist = await MakeupArtist.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!makeupArtist) {
      return res.status(404).json({
        success: false,
        message: 'Makeup artist not found'
      });
    }

    res.status(200).json({
      success: true,
      data: makeupArtist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update makeup artist',
      error: error.message
    });
  }
};

// Delete makeup artist
export const deleteMakeupArtist = async (req, res) => {
  try {
    const makeupArtist = await MakeupArtist.findByIdAndDelete(req.params.id);

    if (!makeupArtist) {
      return res.status(404).json({
        success: false,
        message: 'Makeup artist not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Add review to makeup artist
export const addReview = async (req, res) => {
  try {
    const makeupArtist = await MakeupArtist.findById(req.params.id);

    if (!makeupArtist) {
      return res.status(404).json({
        success: false,
        message: 'Makeup artist not found'
      });
    }

    makeupArtist.reviews.push(req.body);
    
    // Update ratings
    const totalRating = makeupArtist.reviews.reduce((sum, review) => sum + review.rating, 0);
    makeupArtist.ratings.average = totalRating / makeupArtist.reviews.length;
    makeupArtist.ratings.count = makeupArtist.reviews.length;

    await makeupArtist.save();

    res.status(201).json({
      success: true,
      data: makeupArtist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add review',
      error: error.message
    });
  }
};

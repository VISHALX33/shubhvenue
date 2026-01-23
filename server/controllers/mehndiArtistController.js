import MehndiArtist from '../models/MehndiArtist.js';

// Get all mehndi artists with filters
export const getMehndiArtists = async (req, res) => {
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

    const mehndiArtists = await MehndiArtist.find(query).sort({ 'ratings.average': -1 });

    res.status(200).json({
      success: true,
      count: mehndiArtists.length,
      data: mehndiArtists
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single mehndi artist
export const getMehndiArtist = async (req, res) => {
  try {
    const mehndiArtist = await MehndiArtist.findById(req.params.id);

    if (!mehndiArtist) {
      return res.status(404).json({
        success: false,
        message: 'Mehndi artist not found'
      });
    }

    res.status(200).json({
      success: true,
      data: mehndiArtist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create mehndi artist
export const createMehndiArtist = async (req, res) => {
  try {
    const mehndiArtist = await MehndiArtist.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: mehndiArtist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create mehndi artist',
      error: error.message
    });
  }
};

// Update mehndi artist
export const updateMehndiArtist = async (req, res) => {
  try {
    const mehndiArtist = await MehndiArtist.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!mehndiArtist) {
      return res.status(404).json({
        success: false,
        message: 'Mehndi artist not found'
      });
    }

    res.status(200).json({
      success: true,
      data: mehndiArtist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update mehndi artist',
      error: error.message
    });
  }
};

// Delete mehndi artist
export const deleteMehndiArtist = async (req, res) => {
  try {
    const mehndiArtist = await MehndiArtist.findByIdAndDelete(req.params.id);

    if (!mehndiArtist) {
      return res.status(404).json({
        success: false,
        message: 'Mehndi artist not found'
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

// Add review to mehndi artist
export const addReview = async (req, res) => {
  try {
    const mehndiArtist = await MehndiArtist.findById(req.params.id);

    if (!mehndiArtist) {
      return res.status(404).json({
        success: false,
        message: 'Mehndi artist not found'
      });
    }

    mehndiArtist.reviews.push(req.body);
    
    // Update ratings
    const totalRating = mehndiArtist.reviews.reduce((sum, review) => sum + review.rating, 0);
    mehndiArtist.ratings.average = totalRating / mehndiArtist.reviews.length;
    mehndiArtist.ratings.count = mehndiArtist.reviews.length;

    await mehndiArtist.save();

    res.status(201).json({
      success: true,
      data: mehndiArtist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add review',
      error: error.message
    });
  }
};

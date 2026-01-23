import BandBaja from '../models/BandBaja.js';

// Get all band bajas with filters
export const getBandBajas = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minMembers, dholPlayers } = req.query;
    let query = {};

    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    if (type) {
      query.type = type;
    }

    if (minPrice || maxPrice) {
      query['price.perEvent'] = {};
      if (minPrice) query['price.perEvent'].$gte = Number(minPrice);
      if (maxPrice) query['price.perEvent'].$lte = Number(maxPrice);
    }

    if (minMembers) {
      query.bandMembers = { $gte: Number(minMembers) };
    }

    if (dholPlayers) {
      query.dholPlayers = { $gte: Number(dholPlayers) };
    }

    const bandBajas = await BandBaja.find(query).sort({ 'ratings.average': -1 });

    res.status(200).json({
      success: true,
      count: bandBajas.length,
      data: bandBajas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single band baja
export const getBandBaja = async (req, res) => {
  try {
    const bandBaja = await BandBaja.findById(req.params.id);

    if (!bandBaja) {
      return res.status(404).json({
        success: false,
        message: 'Band Baja not found'
      });
    }

    res.status(200).json({
      success: true,
      data: bandBaja
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new band baja
export const createBandBaja = async (req, res) => {
  try {
    const bandBaja = await BandBaja.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: bandBaja
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    });
  }
};

// Add review to band baja
export const addReview = async (req, res) => {
  try {
    const bandBaja = await BandBaja.findById(req.params.id);

    if (!bandBaja) {
      return res.status(404).json({
        success: false,
        message: 'Band Baja not found'
      });
    }

    bandBaja.reviews.push(req.body);

    // Recalculate average rating
    const totalRating = bandBaja.reviews.reduce((sum, review) => sum + review.rating, 0);
    bandBaja.ratings.average = totalRating / bandBaja.reviews.length;
    bandBaja.ratings.count = bandBaja.reviews.length;

    await bandBaja.save();

    res.status(200).json({
      success: true,
      data: bandBaja
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    });
  }
};

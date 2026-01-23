import Videographer from '../models/Videographer.js';

// Get all videographers with filters
export const getVideographers = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, type, specialization } = req.query;
    
    let query = {};

    // Filter by city (case-insensitive)
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    // Filter by price range (per day)
    if (minPrice || maxPrice) {
      query['price.perDay'] = {};
      if (minPrice) query['price.perDay'].$gte = Number(minPrice);
      if (maxPrice) query['price.perDay'].$lte = Number(maxPrice);
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by specialization
    if (specialization) {
      query.specializations = { $in: [specialization] };
    }

    const videographers = await Videographer.find(query).sort({ 'ratings.average': -1 });

    res.status(200).json({
      success: true,
      count: videographers.length,
      data: videographers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching videographers',
      error: error.message
    });
  }
};

// Get single videographer by ID
export const getVideographer = async (req, res) => {
  try {
    const videographer = await Videographer.findById(req.params.id);

    if (!videographer) {
      return res.status(404).json({
        success: false,
        message: 'Videographer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: videographer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching videographer',
      error: error.message
    });
  }
};

// Create new videographer
export const createVideographer = async (req, res) => {
  try {
    const videographer = await Videographer.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: videographer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating videographer',
      error: error.message
    });
  }
};

// Add review to videographer
export const addReview = async (req, res) => {
  try {
    const videographer = await Videographer.findById(req.params.id);

    if (!videographer) {
      return res.status(404).json({
        success: false,
        message: 'Videographer not found'
      });
    }

    const review = {
      userName: req.body.userName,
      rating: req.body.rating,
      comment: req.body.comment,
      date: new Date()
    };

    videographer.reviews.push(review);

    // Update average rating
    const totalRating = videographer.reviews.reduce((sum, review) => sum + review.rating, 0);
    videographer.ratings.average = totalRating / videographer.reviews.length;
    videographer.ratings.count = videographer.reviews.length;

    await videographer.save();

    res.status(200).json({
      success: true,
      data: videographer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

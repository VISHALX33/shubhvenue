import WeddingPlanner from '../models/WeddingPlanner.js';

// Get all wedding planners with filters
export const getWeddingPlanners = async (req, res) => {
  try {
    const { city, type, planningScope, minPrice, maxPrice, minExperience } = req.query;
    
    let query = {};

    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    if (type) {
      query.type = type;
    }

    if (planningScope) {
      query.planningScope = planningScope;
    }

    if (minExperience) {
      query.experience = { $gte: Number(minExperience) };
    }

    // For price filtering with packages, we need to check the minimum package price
    if (minPrice || maxPrice) {
      // This will be a simplified check - you might want to make it more sophisticated
      const priceQuery = {};
      if (minPrice) priceQuery.$gte = Number(minPrice);
      if (maxPrice) priceQuery.$lte = Number(maxPrice);
      query['packages.price'] = priceQuery;
    }

    const weddingPlanners = await WeddingPlanner.find(query).sort({ 'ratings.average': -1 });

    res.status(200).json({
      success: true,
      count: weddingPlanners.length,
      data: weddingPlanners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single wedding planner
export const getWeddingPlanner = async (req, res) => {
  try {
    const weddingPlanner = await WeddingPlanner.findById(req.params.id);

    if (!weddingPlanner) {
      return res.status(404).json({
        success: false,
        message: 'Wedding planner not found'
      });
    }

    res.status(200).json({
      success: true,
      data: weddingPlanner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create wedding planner
export const createWeddingPlanner = async (req, res) => {
  try {
    const weddingPlanner = await WeddingPlanner.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: weddingPlanner
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create wedding planner',
      error: error.message
    });
  }
};

// Add review to wedding planner
export const addReview = async (req, res) => {
  try {
    const weddingPlanner = await WeddingPlanner.findById(req.params.id);

    if (!weddingPlanner) {
      return res.status(404).json({
        success: false,
        message: 'Wedding planner not found'
      });
    }

    weddingPlanner.reviews.push(req.body);

    // Recalculate average rating
    const totalRating = weddingPlanner.reviews.reduce((sum, review) => sum + review.rating, 0);
    weddingPlanner.ratings.average = totalRating / weddingPlanner.reviews.length;
    weddingPlanner.ratings.count = weddingPlanner.reviews.length;

    await weddingPlanner.save();

    res.status(200).json({
      success: true,
      data: weddingPlanner
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add review',
      error: error.message
    });
  }
};

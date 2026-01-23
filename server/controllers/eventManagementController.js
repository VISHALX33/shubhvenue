import EventManagement from '../models/EventManagement.js';

// Get all event managers with filters
export const getEventManagers = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, type, specialization } = req.query;
    
    let query = {};

    // Filter by city (case-insensitive)
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    // Filter by price range (per event)
    if (minPrice || maxPrice) {
      query['price.perEvent'] = {};
      if (minPrice) query['price.perEvent'].$gte = Number(minPrice);
      if (maxPrice) query['price.perEvent'].$lte = Number(maxPrice);
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by specialization
    if (specialization) {
      query.specializations = { $in: [specialization] };
    }

    const eventManagers = await EventManagement.find(query).sort({ 'ratings.average': -1 });

    res.status(200).json({
      success: true,
      count: eventManagers.length,
      data: eventManagers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching event managers',
      error: error.message
    });
  }
};

// Get single event manager by ID
export const getEventManager = async (req, res) => {
  try {
    const eventManager = await EventManagement.findById(req.params.id);

    if (!eventManager) {
      return res.status(404).json({
        success: false,
        message: 'Event manager not found'
      });
    }

    res.status(200).json({
      success: true,
      data: eventManager
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching event manager',
      error: error.message
    });
  }
};

// Create new event manager
export const createEventManager = async (req, res) => {
  try {
    const eventManager = await EventManagement.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: eventManager
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating event manager',
      error: error.message
    });
  }
};

// Add review to event manager
export const addReview = async (req, res) => {
  try {
    const eventManager = await EventManagement.findById(req.params.id);

    if (!eventManager) {
      return res.status(404).json({
        success: false,
        message: 'Event manager not found'
      });
    }

    const review = {
      userName: req.body.userName,
      rating: req.body.rating,
      comment: req.body.comment,
      date: new Date()
    };

    eventManager.reviews.push(review);

    // Update average rating
    const totalRating = eventManager.reviews.reduce((sum, review) => sum + review.rating, 0);
    eventManager.ratings.average = totalRating / eventManager.reviews.length;
    eventManager.ratings.count = eventManager.reviews.length;

    await eventManager.save();

    res.status(200).json({
      success: true,
      data: eventManager
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

import Review from '../models/Review.js';

// Create Review (Guest only)
export const createReview = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      user: req.user._id
    });
    
    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get All Reviews (Admin)
export const getAllReviews = async (req, res) => {
  try {
    const { status, vendor, serviceType } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (vendor) filter.vendor = vendor;
    if (serviceType) filter.serviceType = serviceType;
    
    const reviews = await Review.find(filter)
      .populate('user', 'fullName email')
      .populate('vendor', 'fullName businessName')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get Reviews for Service
export const getServiceReviews = async (req, res) => {
  try {
    const { serviceType, serviceId } = req.params;
    
    const reviews = await Review.find({
      serviceType,
      serviceId,
      status: 'approved'
    })
      .populate('user', 'fullName profileImage')
      .sort({ createdAt: -1 });
    
    // Calculate average rating
    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : 0;
    
    res.json({
      success: true,
      count: reviews.length,
      avgRating,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get Vendor Reviews
export const getVendorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      vendor: req.params.vendorId,
      status: 'approved'
    })
      .populate('user', 'fullName profileImage')
      .sort({ createdAt: -1 });
    
    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : 0;
    
    res.json({
      success: true,
      count: reviews.length,
      avgRating,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update Review Status (Admin)
export const updateReviewStatus = async (req, res) => {
  try {
    const { status, moderatorNotes } = req.body;
    
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status, moderatorNotes },
      { new: true }
    );
    
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }
    
    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Add Vendor Response
export const addVendorResponse = async (req, res) => {
  try {
    const { response } = req.body;
    
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }
    
    // Check if user is the vendor
    if (review.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized'
      });
    }
    
    review.vendorResponse = {
      response,
      respondedAt: Date.now()
    };
    
    await review.save();
    
    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Mark Review Helpful
export const markHelpful = async (req, res) => {
  try {
    const { helpful } = req.body;
    
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }
    
    if (helpful) {
      review.helpful += 1;
    } else {
      review.notHelpful += 1;
    }
    
    await review.save();
    
    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get Review Stats
export const getReviewStats = async (req, res) => {
  try {
    const total = await Review.countDocuments();
    const pending = await Review.countDocuments({ status: 'pending' });
    const approved = await Review.countDocuments({ status: 'approved' });
    const rejected = await Review.countDocuments({ status: 'rejected' });
    
    const allReviews = await Review.find();
    const avgRating = allReviews.length > 0
      ? (allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length).toFixed(1)
      : 0;
    
    res.json({
      success: true,
      data: {
        total,
        pending,
        approved,
        rejected,
        avgRating
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

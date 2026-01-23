import LiveFoodStall from '../models/LiveFoodStall.js';

// @desc    Get all live food stalls
// @route   GET /api/live-food-stall
// @access  Public
export const getLiveFoodStalls = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minDishes } = req.query;

    // Build query
    let query = {};

    if (city) {
      query['location.city'] = city;
    }

    if (type) {
      query.type = type;
    }

    let stalls = await LiveFoodStall.find(query);

    // Filter by price range if provided
    if (minPrice || maxPrice) {
      stalls = stalls.filter((stall) => {
        const prices = stall.packages.map((pkg) => pkg.price);
        const minStallPrice = Math.min(...prices);
        const maxStallPrice = Math.max(...prices);

        if (minPrice && maxPrice) {
          return minStallPrice >= Number(minPrice) && maxStallPrice <= Number(maxPrice);
        } else if (minPrice) {
          return maxStallPrice >= Number(minPrice);
        } else if (maxPrice) {
          return minStallPrice <= Number(maxPrice);
        }
        return true;
      });
    }

    // Filter by minimum dishes if provided
    if (minDishes) {
      stalls = stalls.filter((stall) => stall.dishesAvailable >= Number(minDishes));
    }

    res.status(200).json({
      success: true,
      count: stalls.length,
      data: stalls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single live food stall
// @route   GET /api/live-food-stall/:id
// @access  Public
export const getLiveFoodStallById = async (req, res) => {
  try {
    const stall = await LiveFoodStall.findById(req.params.id);

    if (!stall) {
      return res.status(404).json({
        success: false,
        message: 'Live food stall not found',
      });
    }

    res.status(200).json({
      success: true,
      data: stall,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new live food stall
// @route   POST /api/live-food-stall
// @access  Private
export const createLiveFoodStall = async (req, res) => {
  try {
    const stall = await LiveFoodStall.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: stall,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update live food stall
// @route   PUT /api/live-food-stall/:id
// @access  Private
export const updateLiveFoodStall = async (req, res) => {
  try {
    const stall = await LiveFoodStall.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!stall) {
      return res.status(404).json({
        success: false,
        message: 'Live food stall not found',
      });
    }

    res.status(200).json({
      success: true,
      data: stall,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete live food stall
// @route   DELETE /api/live-food-stall/:id
// @access  Private
export const deleteLiveFoodStall = async (req, res) => {
  try {
    const stall = await LiveFoodStall.findByIdAndDelete(req.params.id);

    if (!stall) {
      return res.status(404).json({
        success: false,
        message: 'Live food stall not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Live food stall deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add review to live food stall
// @route   POST /api/live-food-stall/:id/reviews
// @access  Public
export const addReview = async (req, res) => {
  try {
    const stall = await LiveFoodStall.findById(req.params.id);

    if (!stall) {
      return res.status(404).json({
        success: false,
        message: 'Live food stall not found',
      });
    }

    const review = {
      userName: req.body.userName,
      rating: req.body.rating,
      comment: req.body.comment,
    };

    stall.reviews.push(review);

    // Update ratings
    stall.ratings.count = stall.reviews.length;
    stall.ratings.average =
      stall.reviews.reduce((acc, review) => acc + review.rating, 0) /
      stall.reviews.length;

    await stall.save();

    res.status(200).json({
      success: true,
      data: stall,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

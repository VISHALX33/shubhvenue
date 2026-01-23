import IceCreamCounter from '../models/IceCreamCounter.js';

// @desc    Get all ice cream counters
// @route   GET /api/ice-cream-counter
// @access  Public
export const getIceCreamCounters = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minFlavors } = req.query;

    // Build query
    let query = {};

    if (city) {
      query['location.city'] = city;
    }

    if (type) {
      query.type = type;
    }

    let counters = await IceCreamCounter.find(query);

    // Filter by price range if provided
    if (minPrice || maxPrice) {
      counters = counters.filter((counter) => {
        const prices = counter.packages.map((pkg) => pkg.price);
        const minCounterPrice = Math.min(...prices);
        const maxCounterPrice = Math.max(...prices);

        if (minPrice && maxPrice) {
          return minCounterPrice >= Number(minPrice) && maxCounterPrice <= Number(maxPrice);
        } else if (minPrice) {
          return maxCounterPrice >= Number(minPrice);
        } else if (maxPrice) {
          return minCounterPrice <= Number(maxPrice);
        }
        return true;
      });
    }

    // Filter by minimum flavors if provided
    if (minFlavors) {
      counters = counters.filter((counter) => counter.flavorsAvailable >= Number(minFlavors));
    }

    res.status(200).json({
      success: true,
      count: counters.length,
      data: counters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single ice cream counter
// @route   GET /api/ice-cream-counter/:id
// @access  Public
export const getIceCreamCounterById = async (req, res) => {
  try {
    const counter = await IceCreamCounter.findById(req.params.id);

    if (!counter) {
      return res.status(404).json({
        success: false,
        message: 'Ice cream counter not found',
      });
    }

    res.status(200).json({
      success: true,
      data: counter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new ice cream counter
// @route   POST /api/ice-cream-counter
// @access  Private
export const createIceCreamCounter = async (req, res) => {
  try {
    const counter = await IceCreamCounter.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: counter,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update ice cream counter
// @route   PUT /api/ice-cream-counter/:id
// @access  Private
export const updateIceCreamCounter = async (req, res) => {
  try {
    const counter = await IceCreamCounter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!counter) {
      return res.status(404).json({
        success: false,
        message: 'Ice cream counter not found',
      });
    }

    res.status(200).json({
      success: true,
      data: counter,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete ice cream counter
// @route   DELETE /api/ice-cream-counter/:id
// @access  Private
export const deleteIceCreamCounter = async (req, res) => {
  try {
    const counter = await IceCreamCounter.findByIdAndDelete(req.params.id);

    if (!counter) {
      return res.status(404).json({
        success: false,
        message: 'Ice cream counter not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Ice cream counter deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add review to ice cream counter
// @route   POST /api/ice-cream-counter/:id/reviews
// @access  Public
export const addReview = async (req, res) => {
  try {
    const counter = await IceCreamCounter.findById(req.params.id);

    if (!counter) {
      return res.status(404).json({
        success: false,
        message: 'Ice cream counter not found',
      });
    }

    const review = {
      userName: req.body.userName,
      rating: req.body.rating,
      comment: req.body.comment,
    };

    counter.reviews.push(review);

    // Update ratings
    counter.ratings.count = counter.reviews.length;
    counter.ratings.average =
      counter.reviews.reduce((acc, review) => acc + review.rating, 0) /
      counter.reviews.length;

    await counter.save();

    res.status(200).json({
      success: true,
      data: counter,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

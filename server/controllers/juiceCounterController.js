import JuiceCounter from '../models/JuiceCounter.js';

// @desc    Get all juice counters
// @route   GET /api/juice-counter
// @access  Public
export const getJuiceCounters = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minJuices } = req.query;

    // Build query
    let query = {};

    if (city) {
      query['location.city'] = city;
    }

    if (type) {
      query.type = type;
    }

    let counters = await JuiceCounter.find(query);

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

    // Filter by minimum juices if provided
    if (minJuices) {
      counters = counters.filter((counter) => counter.juicesAvailable >= Number(minJuices));
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

// @desc    Get single juice counter
// @route   GET /api/juice-counter/:id
// @access  Public
export const getJuiceCounterById = async (req, res) => {
  try {
    const counter = await JuiceCounter.findById(req.params.id);

    if (!counter) {
      return res.status(404).json({
        success: false,
        message: 'Juice counter not found',
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

// @desc    Create new juice counter
// @route   POST /api/juice-counter
// @access  Private
export const createJuiceCounter = async (req, res) => {
  try {
    const counter = await JuiceCounter.create({
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

// @desc    Update juice counter
// @route   PUT /api/juice-counter/:id
// @access  Private
export const updateJuiceCounter = async (req, res) => {
  try {
    const counter = await JuiceCounter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!counter) {
      return res.status(404).json({
        success: false,
        message: 'Juice counter not found',
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

// @desc    Delete juice counter
// @route   DELETE /api/juice-counter/:id
// @access  Private
export const deleteJuiceCounter = async (req, res) => {
  try {
    const counter = await JuiceCounter.findByIdAndDelete(req.params.id);

    if (!counter) {
      return res.status(404).json({
        success: false,
        message: 'Juice counter not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Juice counter deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add review to juice counter
// @route   POST /api/juice-counter/:id/reviews
// @access  Public
export const addReview = async (req, res) => {
  try {
    const counter = await JuiceCounter.findById(req.params.id);

    if (!counter) {
      return res.status(404).json({
        success: false,
        message: 'Juice counter not found',
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

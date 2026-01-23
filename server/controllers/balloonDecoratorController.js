import BalloonDecorator from '../models/BalloonDecorator.js';

// Get all balloon decorators with filters
export const getBalloonDecorators = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minInventory } = req.query;
    let query = {};

    if (city) {
      query['location.city'] = city;
    }

    if (type) {
      query.type = type;
    }

    let decorators = await BalloonDecorator.find(query);

    // Filter by price range if specified
    if (minPrice || maxPrice) {
      decorators = decorators.filter(decorator => {
        const prices = decorator.packages.map(pkg => pkg.price);
        const minDecoratorPrice = Math.min(...prices);
        const maxDecoratorPrice = Math.max(...prices);

        if (minPrice && maxDecoratorPrice < parseFloat(minPrice)) return false;
        if (maxPrice && minDecoratorPrice > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    // Filter by minimum inventory size
    if (minInventory) {
      decorators = decorators.filter(decorator => decorator.inventorySize >= parseInt(minInventory));
    }

    res.status(200).json({
      success: true,
      count: decorators.length,
      data: decorators
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single balloon decorator by ID
export const getBalloonDecoratorById = async (req, res) => {
  try {
    const decorator = await BalloonDecorator.findById(req.params.id);

    if (!decorator) {
      return res.status(404).json({
        success: false,
        message: 'Balloon decorator not found'
      });
    }

    res.status(200).json({
      success: true,
      data: decorator
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new balloon decorator
export const createBalloonDecorator = async (req, res) => {
  try {
    const decorator = await BalloonDecorator.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: decorator
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create balloon decorator',
      error: error.message
    });
  }
};

// Update balloon decorator
export const updateBalloonDecorator = async (req, res) => {
  try {
    const decorator = await BalloonDecorator.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!decorator) {
      return res.status(404).json({
        success: false,
        message: 'Balloon decorator not found'
      });
    }

    res.status(200).json({
      success: true,
      data: decorator
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update balloon decorator',
      error: error.message
    });
  }
};

// Delete balloon decorator
export const deleteBalloonDecorator = async (req, res) => {
  try {
    const decorator = await BalloonDecorator.findByIdAndDelete(req.params.id);

    if (!decorator) {
      return res.status(404).json({
        success: false,
        message: 'Balloon decorator not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Balloon decorator deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Add review to balloon decorator
export const addReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;

    const decorator = await BalloonDecorator.findById(req.params.id);

    if (!decorator) {
      return res.status(404).json({
        success: false,
        message: 'Balloon decorator not found'
      });
    }

    decorator.reviews.push({
      userName,
      rating,
      comment,
      date: new Date()
    });

    // Update average rating
    const totalRating = decorator.reviews.reduce((sum, review) => sum + review.rating, 0);
    decorator.ratings.average = totalRating / decorator.reviews.length;
    decorator.ratings.count = decorator.reviews.length;

    await decorator.save();

    res.status(200).json({
      success: true,
      data: decorator
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add review',
      error: error.message
    });
  }
};

import BouncyKidsGame from '../models/BouncyKidsGame.js';

// Get all bouncy kids games with filters
export const getBouncyKidsGames = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minInventory } = req.query;
    let query = {};

    if (city) {
      query['location.city'] = city;
    }

    if (type) {
      query.type = type;
    }

    let games = await BouncyKidsGame.find(query);

    // Filter by price range if specified
    if (minPrice || maxPrice) {
      games = games.filter(game => {
        const prices = game.packages.map(pkg => pkg.price);
        const minGamePrice = Math.min(...prices);
        const maxGamePrice = Math.max(...prices);

        if (minPrice && maxGamePrice < parseFloat(minPrice)) return false;
        if (maxPrice && minGamePrice > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    // Filter by minimum inventory
    if (minInventory) {
      games = games.filter(game => game.inventorySize >= parseInt(minInventory));
    }

    res.status(200).json({
      success: true,
      count: games.length,
      data: games
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single bouncy kids game by ID
export const getBouncyKidsGameById = async (req, res) => {
  try {
    const game = await BouncyKidsGame.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Bouncy kids game not found'
      });
    }

    res.status(200).json({
      success: true,
      data: game
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new bouncy kids game
export const createBouncyKidsGame = async (req, res) => {
  try {
    const game = await BouncyKidsGame.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: game
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create bouncy kids game',
      error: error.message
    });
  }
};

// Update bouncy kids game
export const updateBouncyKidsGame = async (req, res) => {
  try {
    const game = await BouncyKidsGame.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Bouncy kids game not found'
      });
    }

    res.status(200).json({
      success: true,
      data: game
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update bouncy kids game',
      error: error.message
    });
  }
};

// Delete bouncy kids game
export const deleteBouncyKidsGame = async (req, res) => {
  try {
    const game = await BouncyKidsGame.findByIdAndDelete(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Bouncy kids game not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bouncy kids game deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Add review to bouncy kids game
export const addReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;

    const game = await BouncyKidsGame.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Bouncy kids game not found'
      });
    }

    game.reviews.push({
      userName,
      rating,
      comment,
      date: Date.now()
    });

    // Update average rating
    const totalRating = game.reviews.reduce((sum, review) => sum + review.rating, 0);
    game.ratings.average = (totalRating / game.reviews.length).toFixed(1);
    game.ratings.count = game.reviews.length;

    await game.save();

    res.status(201).json({
      success: true,
      data: game
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add review',
      error: error.message
    });
  }
};

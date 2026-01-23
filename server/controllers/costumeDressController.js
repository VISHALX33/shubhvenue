import CostumeDress from '../models/CostumeDress.js';

// Get all costume dress rentals with filters
export const getCostumeDresses = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minInventory } = req.query;
    
    let query = {};
    
    if (city) {
      query['location.city'] = city;
    }
    
    if (type) {
      query.type = type;
    }
    
    let costumeDresses = await CostumeDress.find(query);
    
    // Filter by price range if specified
    if (minPrice || maxPrice) {
      costumeDresses = costumeDresses.filter(costume => {
        const prices = costume.packages.map(pkg => pkg.price);
        const minCostumePrice = Math.min(...prices);
        const maxCostumePrice = Math.max(...prices);
        
        if (minPrice && maxCostumePrice < Number(minPrice)) return false;
        if (maxPrice && minCostumePrice > Number(maxPrice)) return false;
        
        return true;
      });
    }
    
    // Filter by minimum inventory
    if (minInventory) {
      costumeDresses = costumeDresses.filter(costume => 
        costume.inventorySize >= Number(minInventory)
      );
    }
    
    res.status(200).json({
      success: true,
      count: costumeDresses.length,
      data: costumeDresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching costume dress rentals',
      error: error.message
    });
  }
};

// Get single costume dress rental by ID
export const getCostumeDress = async (req, res) => {
  try {
    const costumeDress = await CostumeDress.findById(req.params.id);
    
    if (!costumeDress) {
      return res.status(404).json({
        success: false,
        message: 'Costume dress rental not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: costumeDress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching costume dress rental',
      error: error.message
    });
  }
};

// Create new costume dress rental
export const createCostumeDress = async (req, res) => {
  try {
    const costumeDress = await CostumeDress.create({
      ...req.body,
      vendorId: req.user._id
    });
    
    res.status(201).json({
      success: true,
      data: costumeDress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating costume dress rental',
      error: error.message
    });
  }
};

// Update costume dress rental
export const updateCostumeDress = async (req, res) => {
  try {
    const costumeDress = await CostumeDress.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!costumeDress) {
      return res.status(404).json({
        success: false,
        message: 'Costume dress rental not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: costumeDress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating costume dress rental',
      error: error.message
    });
  }
};

// Delete costume dress rental
export const deleteCostumeDress = async (req, res) => {
  try {
    const costumeDress = await CostumeDress.findByIdAndDelete(req.params.id);
    
    if (!costumeDress) {
      return res.status(404).json({
        success: false,
        message: 'Costume dress rental not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Costume dress rental deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting costume dress rental',
      error: error.message
    });
  }
};

// Add review to costume dress rental
export const addReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;
    
    const costumeDress = await CostumeDress.findById(req.params.id);
    
    if (!costumeDress) {
      return res.status(404).json({
        success: false,
        message: 'Costume dress rental not found'
      });
    }
    
    const review = {
      userName,
      rating,
      comment,
      date: new Date()
    };
    
    costumeDress.reviews.push(review);
    
    // Recalculate average rating
    const totalRating = costumeDress.reviews.reduce((sum, rev) => sum + rev.rating, 0);
    costumeDress.ratings.average = (totalRating / costumeDress.reviews.length).toFixed(1);
    costumeDress.ratings.count = costumeDress.reviews.length;
    
    await costumeDress.save();
    
    res.status(200).json({
      success: true,
      data: costumeDress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

import FlowerVendor from '../models/FlowerVendor.js';

// Get all flower vendors with filters
export const getFlowerVendors = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minInventory } = req.query;
    let query = {};

    if (city) {
      query['location.city'] = city;
    }

    if (type) {
      query.type = type;
    }

    let vendors = await FlowerVendor.find(query);

    // Filter by price range if specified
    if (minPrice || maxPrice) {
      vendors = vendors.filter(vendor => {
        const prices = vendor.packages.map(pkg => pkg.price);
        const minVendorPrice = Math.min(...prices);
        const maxVendorPrice = Math.max(...prices);

        if (minPrice && maxVendorPrice < parseFloat(minPrice)) return false;
        if (maxPrice && minVendorPrice > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    // Filter by minimum inventory size
    if (minInventory) {
      vendors = vendors.filter(vendor => vendor.inventorySize >= parseInt(minInventory));
    }

    res.status(200).json({
      success: true,
      count: vendors.length,
      data: vendors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single flower vendor by ID
export const getFlowerVendorById = async (req, res) => {
  try {
    const vendor = await FlowerVendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Flower vendor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new flower vendor
export const createFlowerVendor = async (req, res) => {
  try {
    const vendor = await FlowerVendor.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create flower vendor',
      error: error.message
    });
  }
};

// Update flower vendor
export const updateFlowerVendor = async (req, res) => {
  try {
    const vendor = await FlowerVendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Flower vendor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update flower vendor',
      error: error.message
    });
  }
};

// Delete flower vendor
export const deleteFlowerVendor = async (req, res) => {
  try {
    const vendor = await FlowerVendor.findByIdAndDelete(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Flower vendor not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Flower vendor deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Add review to flower vendor
export const addReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;

    const vendor = await FlowerVendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Flower vendor not found'
      });
    }

    vendor.reviews.push({
      userName,
      rating,
      comment,
      date: new Date()
    });

    // Update average rating
    const totalRating = vendor.reviews.reduce((sum, review) => sum + review.rating, 0);
    vendor.ratings.average = totalRating / vendor.reviews.length;
    vendor.ratings.count = vendor.reviews.length;

    await vendor.save();

    res.status(200).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add review',
      error: error.message
    });
  }
};

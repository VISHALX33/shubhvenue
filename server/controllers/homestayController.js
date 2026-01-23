import Homestay from '../models/Homestay.js';

// Get all homestays with filters
export const getHomestays = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, minCapacity, maxCapacity, type } = req.query;

    // Build filter object
    let filter = {};

    if (city) {
      filter['location.city'] = { $regex: city, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      filter['price.perDay'] = {};
      if (minPrice) filter['price.perDay'].$gte = Number(minPrice);
      if (maxPrice) filter['price.perDay'].$lte = Number(maxPrice);
    }

    if (minCapacity) {
      filter['capacity.max'] = { $gte: Number(minCapacity) };
    }

    if (maxCapacity) {
      filter['capacity.min'] = { $lte: Number(maxCapacity) };
    }

    if (type) {
      filter.type = type;
    }

    const homestays = await Homestay.find(filter).sort({ 'ratings.average': -1 });

    res.status(200).json({
      success: true,
      count: homestays.length,
      data: homestays
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching homestays',
      error: error.message
    });
  }
};

// Get single homestay by ID
export const getHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id);

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: 'Homestay not found'
      });
    }

    res.status(200).json({
      success: true,
      data: homestay
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching homestay',
      error: error.message
    });
  }
};

// Create new homestay
export const createHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.create(req.body);

    res.status(201).json({
      success: true,
      data: homestay
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating homestay',
      error: error.message
    });
  }
};

// Update homestay
export const updateHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: 'Homestay not found'
      });
    }

    res.status(200).json({
      success: true,
      data: homestay
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating homestay',
      error: error.message
    });
  }
};

// Delete homestay
export const deleteHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findByIdAndDelete(req.params.id);

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: 'Homestay not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Homestay deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting homestay',
      error: error.message
    });
  }
};

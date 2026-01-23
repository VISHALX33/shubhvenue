import EventFurniture from '../models/EventFurniture.js';

// @desc    Get all furniture rentals
// @route   GET /api/furniture-rentals
// @access  Public
export const getFurnitureRentals = async (req, res) => {
  try {
    const furnitureRentals = await EventFurniture.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: furnitureRentals.length,
      data: furnitureRentals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single furniture rental
// @route   GET /api/furniture-rentals/:id
// @access  Public
export const getFurnitureRental = async (req, res) => {
  try {
    const furnitureRental = await EventFurniture.findById(req.params.id);
    
    if (!furnitureRental) {
      return res.status(404).json({
        success: false,
        message: 'Furniture rental not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: furnitureRental
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create furniture rental
// @route   POST /api/furniture-rentals
// @access  Private (Vendor)
export const createFurnitureRental = async (req, res) => {
  try {
    const furnitureRental = await EventFurniture.create({
      ...req.body,
      vendorId: req.user._id
    });
    
    res.status(201).json({
      success: true,
      data: furnitureRental
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create furniture rental',
      error: error.message
    });
  }
};

// @desc    Update furniture rental
// @route   PUT /api/furniture-rentals/:id
// @access  Private (Vendor)
export const updateFurnitureRental = async (req, res) => {
  try {
    let furnitureRental = await EventFurniture.findById(req.params.id);
    
    if (!furnitureRental) {
      return res.status(404).json({
        success: false,
        message: 'Furniture rental not found'
      });
    }
    
    // Check ownership
    if (furnitureRental.vendorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this furniture rental'
      });
    }
    
    furnitureRental = await EventFurniture.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: furnitureRental
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update furniture rental',
      error: error.message
    });
  }
};

// @desc    Delete furniture rental
// @route   DELETE /api/furniture-rentals/:id
// @access  Private (Vendor)
export const deleteFurnitureRental = async (req, res) => {
  try {
    const furnitureRental = await EventFurniture.findById(req.params.id);
    
    if (!furnitureRental) {
      return res.status(404).json({
        success: false,
        message: 'Furniture rental not found'
      });
    }
    
    // Check ownership
    if (furnitureRental.vendorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this furniture rental'
      });
    }
    
    await furnitureRental.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Furniture rental deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

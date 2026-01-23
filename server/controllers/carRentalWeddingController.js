import CarRentalWedding from '../models/CarRentalWedding.js';

// Get all car rentals with filters
export const getCarRentals = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minFleetSize } = req.query;
    let query = {};

    if (city) {
      query['location.city'] = city;
    }

    if (type) {
      query.type = type;
    }

    let carRentals = await CarRentalWedding.find(query);

    // Filter by price range if specified
    if (minPrice || maxPrice) {
      carRentals = carRentals.filter(rental => {
        const prices = rental.packages.map(pkg => pkg.price);
        const minRentalPrice = Math.min(...prices);
        const maxRentalPrice = Math.max(...prices);

        if (minPrice && maxRentalPrice < parseFloat(minPrice)) return false;
        if (maxPrice && minRentalPrice > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    // Filter by minimum fleet size
    if (minFleetSize) {
      carRentals = carRentals.filter(rental => rental.fleetSize >= parseInt(minFleetSize));
    }

    res.status(200).json({
      success: true,
      count: carRentals.length,
      data: carRentals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single car rental by ID
export const getCarRentalById = async (req, res) => {
  try {
    const carRental = await CarRentalWedding.findById(req.params.id);

    if (!carRental) {
      return res.status(404).json({
        success: false,
        message: 'Car rental not found'
      });
    }

    res.status(200).json({
      success: true,
      data: carRental
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new car rental
export const createCarRental = async (req, res) => {
  try {
    const carRental = await CarRentalWedding.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: carRental
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create car rental',
      error: error.message
    });
  }
};

// Update car rental
export const updateCarRental = async (req, res) => {
  try {
    const carRental = await CarRentalWedding.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!carRental) {
      return res.status(404).json({
        success: false,
        message: 'Car rental not found'
      });
    }

    res.status(200).json({
      success: true,
      data: carRental
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update car rental',
      error: error.message
    });
  }
};

// Delete car rental
export const deleteCarRental = async (req, res) => {
  try {
    const carRental = await CarRentalWedding.findByIdAndDelete(req.params.id);

    if (!carRental) {
      return res.status(404).json({
        success: false,
        message: 'Car rental not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Car rental deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Add review to car rental
export const addReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;

    const carRental = await CarRentalWedding.findById(req.params.id);

    if (!carRental) {
      return res.status(404).json({
        success: false,
        message: 'Car rental not found'
      });
    }

    carRental.reviews.push({
      userName,
      rating,
      comment,
      date: Date.now()
    });

    // Update average rating
    const totalRating = carRental.reviews.reduce((sum, review) => sum + review.rating, 0);
    carRental.ratings.average = (totalRating / carRental.reviews.length).toFixed(1);
    carRental.ratings.count = carRental.reviews.length;

    await carRental.save();

    res.status(201).json({
      success: true,
      data: carRental
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add review',
      error: error.message
    });
  }
};

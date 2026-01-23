import FlatBooking from '../models/FlatBooking.js';

// Get all flat bookings with filters
export const getFlatBookings = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minBedrooms, furnishedStatus } = req.query;
    
    let query = {};
    
    // Filter by city
    if (city) {
      query['location.city'] = city;
    }
    
    // Filter by flat type
    if (type) {
      query.type = type;
    }
    
    // Filter by furnished status
    if (furnishedStatus) {
      query.furnishedStatus = furnishedStatus;
    }
    
    // Filter by minimum bedrooms
    if (minBedrooms) {
      query.bedrooms = { $gte: parseInt(minBedrooms) };
    }
    
    let flats = await FlatBooking.find(query);
    
    // Filter by price range (checking packages)
    if (minPrice || maxPrice) {
      flats = flats.filter(flat => {
        const prices = flat.packages.map(pkg => pkg.price);
        const minFlatPrice = Math.min(...prices);
        const maxFlatPrice = Math.max(...prices);
        
        if (minPrice && maxFlatPrice < parseFloat(minPrice)) return false;
        if (maxPrice && minFlatPrice > parseFloat(maxPrice)) return false;
        
        return true;
      });
    }
    
    res.json(flats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single flat booking by ID
export const getFlatBookingById = async (req, res) => {
  try {
    const flat = await FlatBooking.findById(req.params.id);
    
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }
    
    res.json(flat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new flat booking
export const createFlatBooking = async (req, res) => {
  try {
    const flat = new FlatBooking(req.body);
    const newFlat = await flat.save();
    res.status(201).json(newFlat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update flat booking
export const updateFlatBooking = async (req, res) => {
  try {
    const flat = await FlatBooking.findById(req.params.id);
    
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }
    
    Object.assign(flat, req.body);
    const updatedFlat = await flat.save();
    
    res.json(updatedFlat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete flat booking
export const deleteFlatBooking = async (req, res) => {
  try {
    const flat = await FlatBooking.findById(req.params.id);
    
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }
    
    await flat.deleteOne();
    res.json({ message: 'Flat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add review to flat booking
export const addReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;
    
    const flat = await FlatBooking.findById(req.params.id);
    
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }
    
    const review = {
      userName,
      rating,
      comment,
      date: new Date()
    };
    
    flat.reviews.push(review);
    
    // Update average rating
    const totalRating = flat.reviews.reduce((sum, review) => sum + review.rating, 0);
    flat.ratings.average = totalRating / flat.reviews.length;
    flat.ratings.count = flat.reviews.length;
    
    await flat.save();
    
    res.status(201).json(flat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

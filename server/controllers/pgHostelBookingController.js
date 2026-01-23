import PGHostelBooking from '../models/PGHostelBooking.js';

// Get all PG/Hostels with optional filters
export const getPGHostels = async (req, res) => {
  try {
    const { city, type, gender, food, minPrice, maxPrice, roomType } = req.query;
    
    let query = {};
    
    // Filter by city
    if (city) {
      query['location.city'] = city;
    }
    
    // Filter by PG/Hostel type
    if (type) {
      query.type = type;
    }
    
    // Filter by gender
    if (gender) {
      query.gender = gender;
    }
    
    // Filter by food availability
    if (food) {
      query.food = food;
    }
    
    // Filter by room type
    if (roomType) {
      query.roomTypes = roomType;
    }
    
    let pgHostels = await PGHostelBooking.find(query);
    
    // Filter by price range
    if (minPrice || maxPrice) {
      pgHostels = pgHostels.filter(pg => {
        const prices = pg.packages.map(pkg => pkg.price);
        const minPkgPrice = Math.min(...prices);
        const maxPkgPrice = Math.max(...prices);
        
        if (minPrice && maxPrice) {
          return maxPkgPrice >= minPrice && minPkgPrice <= maxPrice;
        } else if (minPrice) {
          return maxPkgPrice >= minPrice;
        } else if (maxPrice) {
          return minPkgPrice <= maxPrice;
        }
        return true;
      });
    }
    
    res.status(200).json(pgHostels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single PG/Hostel by ID
export const getPGHostelById = async (req, res) => {
  try {
    const pgHostel = await PGHostelBooking.findById(req.params.id);
    
    if (!pgHostel) {
      return res.status(404).json({ message: 'PG/Hostel not found' });
    }
    
    res.status(200).json(pgHostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new PG/Hostel
export const createPGHostel = async (req, res) => {
  try {
    const pgHostel = new PGHostelBooking(req.body);
    const savedPGHostel = await pgHostel.save();
    res.status(201).json(savedPGHostel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update PG/Hostel
export const updatePGHostel = async (req, res) => {
  try {
    const updatedPGHostel = await PGHostelBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPGHostel) {
      return res.status(404).json({ message: 'PG/Hostel not found' });
    }
    
    res.status(200).json(updatedPGHostel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete PG/Hostel
export const deletePGHostel = async (req, res) => {
  try {
    const deletedPGHostel = await PGHostelBooking.findByIdAndDelete(req.params.id);
    
    if (!deletedPGHostel) {
      return res.status(404).json({ message: 'PG/Hostel not found' });
    }
    
    res.status(200).json({ message: 'PG/Hostel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add review to PG/Hostel
export const addReview = async (req, res) => {
  try {
    const pgHostel = await PGHostelBooking.findById(req.params.id);
    
    if (!pgHostel) {
      return res.status(404).json({ message: 'PG/Hostel not found' });
    }
    
    const review = {
      userName: req.body.userName,
      rating: req.body.rating,
      comment: req.body.comment,
      date: new Date()
    };
    
    await pgHostel.addReview(review);
    res.status(200).json(pgHostel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

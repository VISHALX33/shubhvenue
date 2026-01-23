import RentHouse from '../models/RentHouse.js';

// Get all rent houses with filters
export const getRentHouses = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minBedrooms, minCapacity } = req.query;
    
    let query = {};
    
    // Filter by city
    if (city) {
      query['location.city'] = city;
    }
    
    // Filter by house type
    if (type) {
      query.type = type;
    }
    
    // Filter by minimum bedrooms
    if (minBedrooms) {
      query.bedrooms = { $gte: parseInt(minBedrooms) };
    }
    
    // Filter by minimum capacity
    if (minCapacity) {
      query.capacity = { $gte: parseInt(minCapacity) };
    }
    
    let houses = await RentHouse.find(query);
    
    // Filter by price range (checking packages)
    if (minPrice || maxPrice) {
      houses = houses.filter(house => {
        const prices = house.packages.map(pkg => pkg.price);
        const minHousePrice = Math.min(...prices);
        const maxHousePrice = Math.max(...prices);
        
        if (minPrice && maxHousePrice < parseFloat(minPrice)) return false;
        if (maxPrice && minHousePrice > parseFloat(maxPrice)) return false;
        
        return true;
      });
    }
    
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single rent house by ID
export const getRentHouseById = async (req, res) => {
  try {
    const house = await RentHouse.findById(req.params.id);
    
    if (!house) {
      return res.status(404).json({ message: 'Rent house not found' });
    }
    
    res.json(house);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new rent house
export const createRentHouse = async (req, res) => {
  try {
    const house = new RentHouse(req.body);
    const newHouse = await house.save();
    res.status(201).json(newHouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update rent house
export const updateRentHouse = async (req, res) => {
  try {
    const house = await RentHouse.findById(req.params.id);
    
    if (!house) {
      return res.status(404).json({ message: 'Rent house not found' });
    }
    
    Object.assign(house, req.body);
    const updatedHouse = await house.save();
    
    res.json(updatedHouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete rent house
export const deleteRentHouse = async (req, res) => {
  try {
    const house = await RentHouse.findById(req.params.id);
    
    if (!house) {
      return res.status(404).json({ message: 'Rent house not found' });
    }
    
    await house.deleteOne();
    res.json({ message: 'Rent house deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add review to rent house
export const addReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;
    
    const house = await RentHouse.findById(req.params.id);
    
    if (!house) {
      return res.status(404).json({ message: 'Rent house not found' });
    }
    
    const review = {
      userName,
      rating,
      comment,
      date: new Date()
    };
    
    house.reviews.push(review);
    
    // Update average rating
    const totalRating = house.reviews.reduce((sum, review) => sum + review.rating, 0);
    house.ratings.average = totalRating / house.reviews.length;
    house.ratings.count = house.reviews.length;
    
    await house.save();
    
    res.status(201).json(house);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

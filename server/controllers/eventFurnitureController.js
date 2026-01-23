import EventFurniture from '../models/EventFurniture.js';

// Get all event furniture rentals with filters
export const getEventFurniture = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minInventory } = req.query;
    
    let query = {};
    
    if (city) {
      query['location.city'] = city;
    }
    
    if (type) {
      query.type = type;
    }
    
    let eventFurniture = await EventFurniture.find(query);
    
    // Filter by price range if specified
    if (minPrice || maxPrice) {
      eventFurniture = eventFurniture.filter(furniture => {
        const prices = furniture.packages.map(pkg => pkg.price);
        const minFurniturePrice = Math.min(...prices);
        const maxFurniturePrice = Math.max(...prices);
        
        if (minPrice && maxFurniturePrice < Number(minPrice)) return false;
        if (maxPrice && minFurniturePrice > Number(maxPrice)) return false;
        
        return true;
      });
    }
    
    // Filter by minimum inventory
    if (minInventory) {
      eventFurniture = eventFurniture.filter(furniture => 
        furniture.inventorySize >= Number(minInventory)
      );
    }
    
    res.status(200).json({
      success: true,
      count: eventFurniture.length,
      data: eventFurniture
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching event furniture rentals',
      error: error.message
    });
  }
};

// Get single event furniture rental by ID
export const getEventFurnitureById = async (req, res) => {
  try {
    const eventFurniture = await EventFurniture.findById(req.params.id);
    
    if (!eventFurniture) {
      return res.status(404).json({
        success: false,
        message: 'Event furniture rental not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: eventFurniture
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching event furniture rental',
      error: error.message
    });
  }
};

// Create new event furniture rental
export const createEventFurniture = async (req, res) => {
  try {
    const eventFurniture = await EventFurniture.create(req.body);
    
    res.status(201).json({
      success: true,
      data: eventFurniture
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating event furniture rental',
      error: error.message
    });
  }
};

// Update event furniture rental
export const updateEventFurniture = async (req, res) => {
  try {
    const eventFurniture = await EventFurniture.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!eventFurniture) {
      return res.status(404).json({
        success: false,
        message: 'Event furniture rental not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: eventFurniture
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating event furniture rental',
      error: error.message
    });
  }
};

// Delete event furniture rental
export const deleteEventFurniture = async (req, res) => {
  try {
    const eventFurniture = await EventFurniture.findByIdAndDelete(req.params.id);
    
    if (!eventFurniture) {
      return res.status(404).json({
        success: false,
        message: 'Event furniture rental not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Event furniture rental deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting event furniture rental',
      error: error.message
    });
  }
};

// Add review to event furniture rental
export const addReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;
    
    const eventFurniture = await EventFurniture.findById(req.params.id);
    
    if (!eventFurniture) {
      return res.status(404).json({
        success: false,
        message: 'Event furniture rental not found'
      });
    }
    
    const review = {
      userName,
      rating,
      comment,
      date: new Date()
    };
    
    eventFurniture.reviews.push(review);
    
    // Recalculate average rating
    const totalRating = eventFurniture.reviews.reduce((sum, rev) => sum + rev.rating, 0);
    eventFurniture.ratings.average = (totalRating / eventFurniture.reviews.length).toFixed(1);
    eventFurniture.ratings.count = eventFurniture.reviews.length;
    
    await eventFurniture.save();
    
    res.status(200).json({
      success: true,
      data: eventFurniture
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

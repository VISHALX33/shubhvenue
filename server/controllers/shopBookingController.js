import ShopBooking from '../models/ShopBooking.js';

// Get all Shops with optional filters
export const getShops = async (req, res) => {
  try {
    const { city, type, furnished, parking, minArea, maxArea, minPrice, maxPrice, suitableFor } = req.query;
    
    let query = {};
    
    // Filter by city
    if (city) {
      query['location.city'] = city;
    }
    
    // Filter by shop type
    if (type) {
      query.type = type;
    }
    
    // Filter by furnished status
    if (furnished) {
      query.furnished = furnished;
    }
    
    // Filter by parking availability
    if (parking) {
      query.parking = parking;
    }
    
    // Filter by area range
    if (minArea || maxArea) {
      query.area = {};
      if (minArea) query.area.$gte = Number(minArea);
      if (maxArea) query.area.$lte = Number(maxArea);
    }
    
    // Filter by suitable for
    if (suitableFor) {
      query.suitableFor = suitableFor;
    }
    
    let shops = await ShopBooking.find(query);
    
    // Filter by price range
    if (minPrice || maxPrice) {
      shops = shops.filter(shop => {
        const prices = shop.packages.map(pkg => pkg.price);
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
    
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single Shop by ID
export const getShopById = async (req, res) => {
  try {
    const shop = await ShopBooking.findById(req.params.id);
    
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new Shop
export const createShop = async (req, res) => {
  try {
    const shop = new ShopBooking(req.body);
    const savedShop = await shop.save();
    res.status(201).json(savedShop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Shop
export const updateShop = async (req, res) => {
  try {
    const updatedShop = await ShopBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    
    res.status(200).json(updatedShop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Shop
export const deleteShop = async (req, res) => {
  try {
    const deletedShop = await ShopBooking.findByIdAndDelete(req.params.id);
    
    if (!deletedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    
    res.status(200).json({ message: 'Shop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add review to Shop
export const addReview = async (req, res) => {
  try {
    const shop = await ShopBooking.findById(req.params.id);
    
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    
    const review = {
      userName: req.body.userName,
      rating: req.body.rating,
      comment: req.body.comment,
      date: new Date()
    };
    
    await shop.addReview(review);
    res.status(200).json(shop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

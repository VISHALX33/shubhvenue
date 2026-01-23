import CommercialPropertyBooking from '../models/CommercialPropertyBooking.js';

// Get all commercial properties with filters
export const getCommercialProperties = async (req, res) => {
  try {
    const { city, type, furnished, leaseTerm, minArea, maxArea, minPrice, maxPrice, parking, powerBackup, lift, buildingGrade, suitableFor } = req.query;
    
    let query = {};
    
    if (city) query['location.city'] = city;
    if (type) query.type = type;
    if (furnished) query.furnished = furnished;
    if (leaseTerm) query.leaseTerm = leaseTerm;
    if (buildingGrade) query.buildingGrade = buildingGrade;
    if (minArea || maxArea) {
      query.area = {};
      if (minArea) query.area.$gte = Number(minArea);
      if (maxArea) query.area.$lte = Number(maxArea);
    }
    if (parking) query.parking = { $gte: Number(parking) };
    if (powerBackup === 'true') query.powerBackup = true;
    if (lift === 'true') query.lift = true;
    if (suitableFor) query.suitableFor = { $in: [suitableFor] };
    
    let properties = await CommercialPropertyBooking.find(query);
    
    // Filter by price range if provided
    if (minPrice || maxPrice) {
      properties = properties.filter(property => {
        if (property.packages && property.packages.length > 0) {
          const prices = property.packages.map(pkg => pkg.price);
          const minPropertyPrice = Math.min(...prices);
          const maxPropertyPrice = Math.max(...prices);
          
          if (minPrice && maxPropertyPrice < Number(minPrice)) return false;
          if (maxPrice && minPropertyPrice > Number(maxPrice)) return false;
        }
        return true;
      });
    }
    
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single commercial property by ID
export const getCommercialPropertyById = async (req, res) => {
  try {
    const property = await CommercialPropertyBooking.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Commercial property not found' });
    }
    
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new commercial property
export const createCommercialProperty = async (req, res) => {
  try {
    const property = new CommercialPropertyBooking(req.body);
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update commercial property
export const updateCommercialProperty = async (req, res) => {
  try {
    const property = await CommercialPropertyBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!property) {
      return res.status(404).json({ message: 'Commercial property not found' });
    }
    
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete commercial property
export const deleteCommercialProperty = async (req, res) => {
  try {
    const property = await CommercialPropertyBooking.findByIdAndDelete(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Commercial property not found' });
    }
    
    res.json({ message: 'Commercial property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add review to commercial property
export const addReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;
    const property = await CommercialPropertyBooking.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Commercial property not found' });
    }
    
    await property.addReview(userName, rating, comment);
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

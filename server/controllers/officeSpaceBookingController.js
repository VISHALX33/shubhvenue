import OfficeSpaceBooking from '../models/OfficeSpaceBooking.js';

// Get all office spaces with filters
export const getOfficeSpaces = async (req, res) => {
  try {
    const { city, type, furnished, parking, powerBackup, buildingGrade, minSeats, maxSeats, minPrice, maxPrice, suitableFor } = req.query;
    
    let filter = {};
    
    if (city) filter['location.city'] = city;
    if (type) filter.type = type;
    if (furnished) filter.furnished = furnished;
    if (parking) filter.parking = parking;
    if (powerBackup) filter.powerBackup = powerBackup;
    if (buildingGrade) filter.buildingGrade = buildingGrade;
    if (minSeats || maxSeats) {
      filter.seatingCapacity = {};
      if (minSeats) filter.seatingCapacity.$gte = Number(minSeats);
      if (maxSeats) filter.seatingCapacity.$lte = Number(maxSeats);
    }
    if (suitableFor) filter.suitableFor = { $in: [suitableFor] };
    
    let officeSpaces = await OfficeSpaceBooking.find(filter).sort({ createdAt: -1 });
    
    // Filter by price range if provided
    if (minPrice || maxPrice) {
      officeSpaces = officeSpaces.filter(office => {
        const prices = office.packages.map(pkg => pkg.price);
        const minOfficePrice = Math.min(...prices);
        const maxOfficePrice = Math.max(...prices);
        
        if (minPrice && maxOfficePrice < Number(minPrice)) return false;
        if (maxPrice && minOfficePrice > Number(maxPrice)) return false;
        return true;
      });
    }
    
    res.json(officeSpaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single office space by ID
export const getOfficeSpaceById = async (req, res) => {
  try {
    const officeSpace = await OfficeSpaceBooking.findById(req.params.id);
    if (!officeSpace) {
      return res.status(404).json({ message: 'Office space not found' });
    }
    res.json(officeSpace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new office space
export const createOfficeSpace = async (req, res) => {
  try {
    const officeSpace = new OfficeSpaceBooking(req.body);
    const newOfficeSpace = await officeSpace.save();
    res.status(201).json(newOfficeSpace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update office space
export const updateOfficeSpace = async (req, res) => {
  try {
    const officeSpace = await OfficeSpaceBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!officeSpace) {
      return res.status(404).json({ message: 'Office space not found' });
    }
    res.json(officeSpace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete office space
export const deleteOfficeSpace = async (req, res) => {
  try {
    const officeSpace = await OfficeSpaceBooking.findByIdAndDelete(req.params.id);
    if (!officeSpace) {
      return res.status(404).json({ message: 'Office space not found' });
    }
    res.json({ message: 'Office space deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add review to office space
export const addReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;
    const officeSpace = await OfficeSpaceBooking.findById(req.params.id);
    
    if (!officeSpace) {
      return res.status(404).json({ message: 'Office space not found' });
    }
    
    await officeSpace.addReview(userName, rating, comment);
    res.json(officeSpace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

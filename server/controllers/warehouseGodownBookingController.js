import WarehouseGodownBooking from '../models/WarehouseGodownBooking.js';

// Get all warehouses/godowns with filters
export const getWarehouseGodowns = async (req, res) => {
  try {
    const { city, type, temperatureControlled, floorType, minArea, maxArea, minPrice, maxPrice, suitableFor } = req.query;
    
    let filter = {};
    
    if (city) filter['location.city'] = city;
    if (type) filter.type = type;
    if (temperatureControlled) filter.temperatureControlled = temperatureControlled;
    if (floorType) filter.floorType = floorType;
    if (minArea || maxArea) {
      filter.area = {};
      if (minArea) filter.area.$gte = Number(minArea);
      if (maxArea) filter.area.$lte = Number(maxArea);
    }
    if (suitableFor) filter.suitableFor = { $in: [suitableFor] };
    
    let warehouses = await WarehouseGodownBooking.find(filter).sort({ createdAt: -1 });
    
    // Filter by price range if provided
    if (minPrice || maxPrice) {
      warehouses = warehouses.filter(warehouse => {
        const prices = warehouse.packages.map(pkg => pkg.price);
        const minWarehousePrice = Math.min(...prices);
        const maxWarehousePrice = Math.max(...prices);
        
        if (minPrice && maxWarehousePrice < Number(minPrice)) return false;
        if (maxPrice && minWarehousePrice > Number(maxPrice)) return false;
        return true;
      });
    }
    
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single warehouse/godown by ID
export const getWarehouseGodownById = async (req, res) => {
  try {
    const warehouse = await WarehouseGodownBooking.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse/Godown not found' });
    }
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new warehouse/godown
export const createWarehouseGodown = async (req, res) => {
  try {
    const warehouse = new WarehouseGodownBooking(req.body);
    const newWarehouse = await warehouse.save();
    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update warehouse/godown
export const updateWarehouseGodown = async (req, res) => {
  try {
    const warehouse = await WarehouseGodownBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse/Godown not found' });
    }
    res.json(warehouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete warehouse/godown
export const deleteWarehouseGodown = async (req, res) => {
  try {
    const warehouse = await WarehouseGodownBooking.findByIdAndDelete(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse/Godown not found' });
    }
    res.json({ message: 'Warehouse/Godown deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add review to warehouse/godown
export const addReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;
    const warehouse = await WarehouseGodownBooking.findById(req.params.id);
    
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse/Godown not found' });
    }
    
    await warehouse.addReview(userName, rating, comment);
    res.json(warehouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

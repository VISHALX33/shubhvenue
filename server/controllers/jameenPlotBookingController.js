import JameenPlotBooking from '../models/JameenPlotBooking.js';

// Get all jameen/plots with filters
export const getJameenPlots = async (req, res) => {
  try {
    const { city, type, boundaryWall, roadAccess, waterSupply, electricity, plotFacing, possession, minArea, maxArea, minPrice, maxPrice, suitableFor } = req.query;
    
    let filter = {};
    
    if (city) filter['location.city'] = city;
    if (type) filter.type = type;
    if (boundaryWall) filter.boundaryWall = boundaryWall;
    if (roadAccess) filter.roadAccess = roadAccess;
    if (waterSupply) filter.waterSupply = waterSupply;
    if (electricity) filter.electricity = electricity;
    if (plotFacing) filter.plotFacing = plotFacing;
    if (possession) filter.possession = possession;
    if (minArea || maxArea) {
      filter.area = {};
      if (minArea) filter.area.$gte = Number(minArea);
      if (maxArea) filter.area.$lte = Number(maxArea);
    }
    if (suitableFor) filter.suitableFor = { $in: [suitableFor] };
    
    let plots = await JameenPlotBooking.find(filter).sort({ createdAt: -1 });
    
    // Filter by price range if provided
    if (minPrice || maxPrice) {
      plots = plots.filter(plot => {
        const prices = plot.packages.map(pkg => pkg.price);
        const minPlotPrice = Math.min(...prices);
        const maxPlotPrice = Math.max(...prices);
        
        if (minPrice && maxPlotPrice < Number(minPrice)) return false;
        if (maxPrice && minPlotPrice > Number(maxPrice)) return false;
        return true;
      });
    }
    
    res.json(plots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single jameen/plot by ID
export const getJameenPlotById = async (req, res) => {
  try {
    const plot = await JameenPlotBooking.findById(req.params.id);
    if (!plot) {
      return res.status(404).json({ message: 'Jameen/Plot not found' });
    }
    res.json(plot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new jameen/plot
export const createJameenPlot = async (req, res) => {
  try {
    const plot = new JameenPlotBooking(req.body);
    const newPlot = await plot.save();
    res.status(201).json(newPlot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update jameen/plot
export const updateJameenPlot = async (req, res) => {
  try {
    const plot = await JameenPlotBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!plot) {
      return res.status(404).json({ message: 'Jameen/Plot not found' });
    }
    res.json(plot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete jameen/plot
export const deleteJameenPlot = async (req, res) => {
  try {
    const plot = await JameenPlotBooking.findByIdAndDelete(req.params.id);
    if (!plot) {
      return res.status(404).json({ message: 'Jameen/Plot not found' });
    }
    res.json({ message: 'Jameen/Plot deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add review to jameen/plot
export const addReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;
    const plot = await JameenPlotBooking.findById(req.params.id);
    
    if (!plot) {
      return res.status(404).json({ message: 'Jameen/Plot not found' });
    }
    
    await plot.addReview(userName, rating, comment);
    res.json(plot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

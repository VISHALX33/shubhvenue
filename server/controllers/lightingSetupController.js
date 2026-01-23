import LightingSetup from '../models/LightingSetup.js';

export const getLightingSetups = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, type, power, coverage } = req.query;
    
    let query = {};
    
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      query['price.perDay'] = {};
      if (minPrice) query['price.perDay'].$gte = Number(minPrice);
      if (maxPrice) query['price.perDay'].$lte = Number(maxPrice);
    }
    
    if (type) {
      query.type = type;
    }

    if (power) {
      query.power = { $gte: Number(power) };
    }

    if (coverage) {
      query.coverage = { $gte: Number(coverage) };
    }
    
    const lightingSetups = await LightingSetup.find(query).sort({ 'ratings.average': -1 });
    
    res.status(200).json({
      success: true,
      count: lightingSetups.length,
      data: lightingSetups
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lighting setups',
      error: error.message
    });
  }
};

export const getLightingSetup = async (req, res) => {
  try {
    const lightingSetup = await LightingSetup.findById(req.params.id);
    
    if (!lightingSetup) {
      return res.status(404).json({
        success: false,
        message: 'Lighting setup not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: lightingSetup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lighting setup',
      error: error.message
    });
  }
};

export const createLightingSetup = async (req, res) => {
  try {
    const lightingSetup = await LightingSetup.create({
      ...req.body,
      vendorId: req.user._id
    });
    
    res.status(201).json({
      success: true,
      data: lightingSetup
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating lighting setup',
      error: error.message
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const lightingSetup = await LightingSetup.findById(req.params.id);
    
    if (!lightingSetup) {
      return res.status(404).json({
        success: false,
        message: 'Lighting setup not found'
      });
    }
    
    lightingSetup.reviews.push(req.body);
    
    const totalRating = lightingSetup.reviews.reduce((sum, review) => sum + review.rating, 0);
    lightingSetup.ratings.average = totalRating / lightingSetup.reviews.length;
    lightingSetup.ratings.count = lightingSetup.reviews.length;
    
    await lightingSetup.save();
    
    res.status(200).json({
      success: true,
      data: lightingSetup
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

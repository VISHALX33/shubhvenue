import Generator from '../models/Generator.js';

export const getGenerators = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, type, capacity, fuelType } = req.query;
    
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

    if (capacity) {
      query.capacity = { $gte: Number(capacity) };
    }

    if (fuelType) {
      query.fuelType = fuelType;
    }
    
    const generators = await Generator.find(query).sort({ 'ratings.average': -1 });
    
    res.status(200).json({
      success: true,
      count: generators.length,
      data: generators
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching generators',
      error: error.message
    });
  }
};

export const getGenerator = async (req, res) => {
  try {
    const generator = await Generator.findById(req.params.id);
    
    if (!generator) {
      return res.status(404).json({
        success: false,
        message: 'Generator not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: generator
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching generator',
      error: error.message
    });
  }
};

export const createGenerator = async (req, res) => {
  try {
    const generator = await Generator.create({
      ...req.body,
      vendorId: req.user._id
    });
    
    res.status(201).json({
      success: true,
      data: generator
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating generator',
      error: error.message
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const generator = await Generator.findById(req.params.id);
    
    if (!generator) {
      return res.status(404).json({
        success: false,
        message: 'Generator not found'
      });
    }
    
    generator.reviews.push(req.body);
    
    const totalRating = generator.reviews.reduce((sum, review) => sum + review.rating, 0);
    generator.ratings.average = totalRating / generator.reviews.length;
    generator.ratings.count = generator.reviews.length;
    
    await generator.save();
    
    res.status(200).json({
      success: true,
      data: generator
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

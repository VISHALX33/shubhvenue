import OpenGround from '../models/OpenGround.js'

// Get all open grounds with filters
export const getOpenGrounds = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, minCapacity, maxCapacity, type } = req.query
    
    let query = {}
    
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' }
    }
    
    if (minPrice || maxPrice) {
      query['price.perDay'] = {}
      if (minPrice) query['price.perDay'].$gte = Number(minPrice)
      if (maxPrice) query['price.perDay'].$lte = Number(maxPrice)
    }
    
    if (minCapacity || maxCapacity) {
      if (minCapacity) query['capacity.max'] = { $gte: Number(minCapacity) }
      if (maxCapacity) query['capacity.min'] = { $lte: Number(maxCapacity) }
    }
    
    if (type) {
      query.type = type
    }
    
    const openGrounds = await OpenGround.find(query).sort({ 'ratings.average': -1 })
    
    res.status(200).json({
      success: true,
      count: openGrounds.length,
      data: openGrounds
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// Get single open ground by ID
export const getOpenGround = async (req, res) => {
  try {
    const openGround = await OpenGround.findById(req.params.id)
    
    if (!openGround) {
      return res.status(404).json({
        success: false,
        message: 'Open Ground not found'
      })
    }
    
    res.status(200).json({
      success: true,
      data: openGround
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// Create new open ground
export const createOpenGround = async (req, res) => {
  try {
    const openGround = await OpenGround.create(req.body)
    
    res.status(201).json({
      success: true,
      data: openGround
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    })
  }
}

// Update open ground
export const updateOpenGround = async (req, res) => {
  try {
    const openGround = await OpenGround.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    
    if (!openGround) {
      return res.status(404).json({
        success: false,
        message: 'Open Ground not found'
      })
    }
    
    res.json({
      success: true,
      data: openGround
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating open ground',
      error: error.message
    })
  }
}

// Add review to open ground
export const addReview = async (req, res) => {
  try {
    const openGround = await OpenGround.findById(req.params.id)
    
    if (!openGround) {
      return res.status(404).json({
        success: false,
        message: 'Open Ground not found'
      })
    }
    
    openGround.reviews.push(req.body)
    
    const totalRating = openGround.reviews.reduce((sum, review) => sum + review.rating, 0)
    openGround.ratings.average = totalRating / openGround.reviews.length
    openGround.ratings.count = openGround.reviews.length
    
    await openGround.save()
    
    res.status(200).json({
      success: true,
      data: openGround
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    })
  }
}

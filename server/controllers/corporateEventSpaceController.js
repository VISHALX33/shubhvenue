import CorporateEventSpace from '../models/CorporateEventSpace.js'

// Get all corporate event spaces with filters
export const getCorporateEventSpaces = async (req, res) => {
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
    
    const corporateEventSpaces = await CorporateEventSpace.find(query).sort({ 'ratings.average': -1 })
    
    res.status(200).json({
      success: true,
      count: corporateEventSpaces.length,
      data: corporateEventSpaces
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// Get single corporate event space by ID
export const getCorporateEventSpace = async (req, res) => {
  try {
    const corporateEventSpace = await CorporateEventSpace.findById(req.params.id)
    
    if (!corporateEventSpace) {
      return res.status(404).json({
        success: false,
        message: 'Corporate Event Space not found'
      })
    }
    
    res.status(200).json({
      success: true,
      data: corporateEventSpace
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// Create new corporate event space
export const createCorporateEventSpace = async (req, res) => {
  try {
    const corporateEventSpace = await CorporateEventSpace.create(req.body)
    
    res.status(201).json({
      success: true,
      data: corporateEventSpace
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    })
  }
}

// Update corporate event space
export const updateCorporateEventSpace = async (req, res) => {
  try {
    const corporateEventSpace = await CorporateEventSpace.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    
    if (!corporateEventSpace) {
      return res.status(404).json({
        success: false,
        message: 'Corporate Event Space not found'
      })
    }
    
    res.json({
      success: true,
      data: corporateEventSpace
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating corporate event space',
      error: error.message
    })
  }
}

// Add review to corporate event space
export const addReview = async (req, res) => {
  try {
    const corporateEventSpace = await CorporateEventSpace.findById(req.params.id)
    
    if (!corporateEventSpace) {
      return res.status(404).json({
        success: false,
        message: 'Corporate Event Space not found'
      })
    }
    
    corporateEventSpace.reviews.push(req.body)
    
    const totalRating = corporateEventSpace.reviews.reduce((sum, review) => sum + review.rating, 0)
    corporateEventSpace.ratings.average = totalRating / corporateEventSpace.reviews.length
    corporateEventSpace.ratings.count = corporateEventSpace.reviews.length
    
    await corporateEventSpace.save()
    
    res.status(200).json({
      success: true,
      data: corporateEventSpace
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    })
  }
}

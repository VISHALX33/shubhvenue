import CommunityHall from '../models/CommunityHall.js'

// Get all community halls with filters
export const getCommunityHalls = async (req, res) => {
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
    
    const communityHalls = await CommunityHall.find(query).sort({ 'ratings.average': -1 })
    
    res.status(200).json({
      success: true,
      count: communityHalls.length,
      data: communityHalls
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// Get single community hall by ID
export const getCommunityHall = async (req, res) => {
  try {
    const communityHall = await CommunityHall.findById(req.params.id)
    
    if (!communityHall) {
      return res.status(404).json({
        success: false,
        message: 'Community Hall not found'
      })
    }
    
    res.status(200).json({
      success: true,
      data: communityHall
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// Create new community hall
export const createCommunityHall = async (req, res) => {
  try {
    const communityHall = await CommunityHall.create(req.body)
    
    res.status(201).json({
      success: true,
      data: communityHall
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    })
  }
}

// Update community hall
export const updateCommunityHall = async (req, res) => {
  try {
    const communityHall = await CommunityHall.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    
    if (!communityHall) {
      return res.status(404).json({
        success: false,
        message: 'Community Hall not found'
      })
    }
    
    res.json({
      success: true,
      data: communityHall
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating community hall',
      error: error.message
    })
  }
}

// Add review to community hall
export const addReview = async (req, res) => {
  try {
    const communityHall = await CommunityHall.findById(req.params.id)
    
    if (!communityHall) {
      return res.status(404).json({
        success: false,
        message: 'Community Hall not found'
      })
    }
    
    communityHall.reviews.push(req.body)
    
    const totalRating = communityHall.reviews.reduce((sum, review) => sum + review.rating, 0)
    communityHall.ratings.average = totalRating / communityHall.reviews.length
    communityHall.ratings.count = communityHall.reviews.length
    
    await communityHall.save()
    
    res.status(200).json({
      success: true,
      data: communityHall
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    })
  }
}

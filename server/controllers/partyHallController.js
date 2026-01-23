import PartyHall from '../models/PartyHall.js'

// Get all party halls with filters
export const getPartyHalls = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, minCapacity, maxCapacity, type } = req.query
    
    let query = {}
    
    // Filter by city (case-insensitive)
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' }
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query['price.perDay'] = {}
      if (minPrice) query['price.perDay'].$gte = Number(minPrice)
      if (maxPrice) query['price.perDay'].$lte = Number(maxPrice)
    }
    
    // Filter by capacity
    if (minCapacity || maxCapacity) {
      if (minCapacity) query['capacity.max'] = { $gte: Number(minCapacity) }
      if (maxCapacity) query['capacity.min'] = { $lte: Number(maxCapacity) }
    }
    
    // Filter by type
    if (type) {
      query.type = type
    }
    
    const partyHalls = await PartyHall.find(query).sort({ 'ratings.average': -1 })
    
    res.status(200).json({
      success: true,
      count: partyHalls.length,
      data: partyHalls
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// Get single party hall by ID
export const getPartyHall = async (req, res) => {
  try {
    const partyHall = await PartyHall.findById(req.params.id)
    
    if (!partyHall) {
      return res.status(404).json({
        success: false,
        message: 'Party Hall not found'
      })
    }
    
    res.status(200).json({
      success: true,
      data: partyHall
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// Create new party hall
export const createPartyHall = async (req, res) => {
  try {
    const partyHall = await PartyHall.create(req.body)
    
    res.status(201).json({
      success: true,
      data: partyHall
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    })
  }
}

// Update party hall
export const updatePartyHall = async (req, res) => {
  try {
    const partyHall = await PartyHall.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    
    if (!partyHall) {
      return res.status(404).json({
        success: false,
        message: 'Party Hall not found'
      })
    }
    
    res.json({
      success: true,
      data: partyHall
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating party hall',
      error: error.message
    })
  }
}

// Add review to party hall
export const addReview = async (req, res) => {
  try {
    const partyHall = await PartyHall.findById(req.params.id)
    
    if (!partyHall) {
      return res.status(404).json({
        success: false,
        message: 'Party Hall not found'
      })
    }
    
    partyHall.reviews.push(req.body)
    
    // Update average rating
    const totalRating = partyHall.reviews.reduce((sum, review) => sum + review.rating, 0)
    partyHall.ratings.average = totalRating / partyHall.reviews.length
    partyHall.ratings.count = partyHall.reviews.length
    
    await partyHall.save()
    
    res.status(200).json({
      success: true,
      data: partyHall
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    })
  }
}

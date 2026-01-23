import mongoose from 'mongoose'

const openGroundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Wedding Ground', 'Corporate Event Ground', 'Sports Ground', 'Exhibition Ground', 'Festival Ground', 'Budget Plot'],
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  location: {
    city: {
      type: String,
      required: true
    },
    area: String,
    address: String,
    pincode: String
  },
  price: {
    perDay: {
      type: Number,
      required: true
    }
  },
  capacity: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  area: {
    size: Number,
    unit: {
      type: String,
      enum: ['sqft', 'sqm', 'acres'],
      default: 'sqft'
    }
  },
  amenities: [String],
  about: {
    type: String,
    required: true
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  policies: {
    checkIn: String,
    checkOut: String,
    cancellation: String,
    tentAllowed: {
      type: Boolean,
      default: true
    },
    cateringAllowed: {
      type: Boolean,
      default: true
    },
    decorAllowed: {
      type: Boolean,
      default: true
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    userName: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  contactInfo: {
    phone: String,
    email: String,
    website: String
  }
}, {
  timestamps: true
})

const OpenGround = mongoose.model('OpenGround', openGroundSchema)

export default OpenGround

import mongoose from 'mongoose'

const corporateEventSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Conference Center', 'Business Hotel', 'Convention Hall', 'Meeting Room Complex', 'Corporate Resort', 'Executive Lounge'],
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
    },
    perHour: Number
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
  rooms: {
    conferenceRooms: Number,
    meetingRooms: Number,
    boardRooms: Number
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
    catering: {
      type: Boolean,
      default: true
    },
    wifi: {
      type: Boolean,
      default: true
    },
    parking: {
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

const CorporateEventSpace = mongoose.model('CorporateEventSpace', corporateEventSpaceSchema)

export default CorporateEventSpace

import mongoose from 'mongoose'

const partyHallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Rooftop Party Hall', 'Indoor Party Hall', 'Club Style', 'Lounge', 'Terrace Hall', 'Budget Party Hall'],
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
    perPlate: Number
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
    alcohol: {
      type: Boolean,
      default: true
    },
    dj: {
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

const PartyHall = mongoose.model('PartyHall', partyHallSchema)

export default PartyHall

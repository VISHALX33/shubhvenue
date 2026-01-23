import mongoose from 'mongoose';

const resortSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Beach Resort', 'Hill Station', 'Lake Resort', 'Wildlife Resort', 'Luxury Resort', 'Budget Resort'],
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
  rooms: {
    type: Number,
    required: true
  },
  amenities: [{
    type: String
  }],
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
    pets: {
      type: Boolean,
      default: true
    },
    smoking: {
      type: Boolean,
      default: false
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
    rating: Number,
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
});

export default mongoose.model('Resort', resortSchema);

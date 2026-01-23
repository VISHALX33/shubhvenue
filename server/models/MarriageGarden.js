import mongoose from 'mongoose';

const marriageGardenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add venue name'],
    trim: true
  },
  type: {
    type: String,
    enum: ['Marriage Garden', 'Banquet Hall', 'Resort', 'Farmhouse', 'Palace', 'Hotel', 'Community Hall', 'Party Hall', 'Open Ground', 'Indoor Garden', 'Outdoor Garden', 'Lawn', 'Terrace Garden', 'Poolside Garden'],
    required: true
  },
  mainImage: {
    type: String,
    required: [true, 'Please add main image']
  },
  images: [{
    type: String
  }],
  location: {
    city: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    address: String,
    pincode: String
  },
  price: {
    perDay: Number,
    perPlate: Number,
    currency: {
      type: String,
      default: 'INR'
    }
  },
  capacity: {
    min: Number,
    max: Number
  },
  area: {
    type: Number
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
      default: false
    },
    smoking: {
      type: Boolean,
      default: false
    },
    advancePayment: String,
    decorationPolicy: String,
    parking: Boolean,
    alcoholAllowed: Boolean
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: String,
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
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MarriageGarden = mongoose.model('MarriageGarden', marriageGardenSchema);

export default MarriageGarden;

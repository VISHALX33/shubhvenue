import mongoose from 'mongoose';

const homestaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Traditional Homestay', 'Modern Homestay', 'Village Homestay', 'Cultural Homestay', 'Eco Homestay'],
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
    area: {
      type: String,
      required: true
    },
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
  policies: {
    checkIn: String,
    checkOut: String,
    cancellation: String,
    parking: Boolean,
    smoking: Boolean
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

const Homestay = mongoose.model('Homestay', homestaySchema);

export default Homestay;

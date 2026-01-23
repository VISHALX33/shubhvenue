import mongoose from 'mongoose';

const tentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Wedding Tent', 'Corporate Tent', 'Party Tent', 'Exhibition Tent', 'Luxury Tent', 'Budget Tent']
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
    perEvent: {
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
  tentSize: {
    length: Number, // in feet
    width: Number, // in feet
    height: Number // in feet
  },
  features: [{
    type: String,
    required: true
  }],
  services: [{
    type: String,
    required: true
  }],
  furniture: [{
    type: String,
    required: true
  }],
  about: {
    type: String,
    required: true
  },
  setupTime: {
    type: String,
    required: true // e.g., "4-6 hours"
  },
  availability: {
    type: Boolean,
    default: true
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
    phone: {
      type: String,
      required: true
    },
    email: String,
    website: String,
    whatsapp: String
  }
}, {
  timestamps: true
});

const Tent = mongoose.model('Tent', tentSchema);

export default Tent;

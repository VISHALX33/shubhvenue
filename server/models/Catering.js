import mongoose from 'mongoose';

const cateringSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Wedding Catering', 'Party Catering', 'Corporate Catering', 'Birthday Catering', 'Festival Catering', 'Budget Catering']
  },
  mainImage: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  location: {
    area: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      default: 'Rajasthan'
    }
  },
  cuisineTypes: [{
    type: String,
    required: true
  }],
  menuItems: [{
    category: String,
    items: [String]
  }],
  servingStyle: {
    type: String,
    required: true,
    enum: ['Buffet', 'Plated', 'Family Style', 'Cocktail', 'Mixed']
  },
  minimumGuests: {
    type: Number,
    required: true
  },
  maximumGuests: {
    type: Number,
    required: true
  },
  pricePerPlate: {
    type: Number,
    required: true
  },
  packageDetails: {
    basic: {
      price: Number,
      includes: [String]
    },
    premium: {
      price: Number,
      includes: [String]
    },
    luxury: {
      price: Number,
      includes: [String]
    }
  },
  staffIncluded: {
    type: Boolean,
    default: true
  },
  staffCount: {
    cooks: Number,
    servers: Number,
    helpers: Number
  },
  equipmentIncluded: [{
    type: String
  }],
  specialties: [{
    type: String
  }],
  liveCounters: [{
    type: String
  }],
  features: [{
    type: String,
    required: true
  }],
  about: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  experience: {
    type: Number,
    required: true
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
    phone: String,
    email: String,
    website: String,
    whatsapp: String,
    instagram: String
  }
}, {
  timestamps: true
});

const Catering = mongoose.model('Catering', cateringSchema);

export default Catering;

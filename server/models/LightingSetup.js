import mongoose from 'mongoose';

const lightingSetupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Wedding Lighting', 'DJ Lighting', 'Concert Lighting', 'Corporate Lighting', 'Party Lighting', 'Basic Lighting'],
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
    area: String,
    city: {
      type: String,
      required: true
    },
    state: String,
    pincode: String
  },
  price: {
    perDay: {
      type: Number,
      required: true
    },
    perEvent: Number
  },
  power: {
    type: Number,
    required: true
  },
  coverage: {
    type: Number,
    required: true
  },
  equipment: [{
    type: String
  }],
  features: [{
    type: String
  }],
  effects: [{
    type: String
  }],
  technician: {
    type: Boolean,
    default: false
  },
  setupTime: {
    type: Number,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
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
    website: String,
    whatsapp: String,
    instagram: String
  }
}, {
  timestamps: true
});

const LightingSetup = mongoose.model('LightingSetup', lightingSetupSchema);

export default LightingSetup;

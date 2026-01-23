import mongoose from 'mongoose';

const flowerVendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Fresh Flowers', 'Artificial Flowers', 'Exotic Flowers', 'Seasonal Flowers', 'Decorative Plants', 'Flower Arrangements']
  },
  mainImage: {
    type: String,
    required: true
  },
  images: [String],
  location: {
    area: String,
    city: String,
    state: String
  },
  categories: [String],
  flowerTypes: [String],
  packages: [{
    name: String,
    price: Number,
    items: [String],
    description: String,
    coverage: String,
    services: [String]
  }],
  inventorySize: {
    type: Number,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  eventsServed: {
    type: Number,
    required: true
  },
  features: [String],
  about: {
    type: String,
    required: true
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
    whatsapp: String,
    instagram: String,
    website: String
  }
}, {
  timestamps: true
});

const FlowerVendor = mongoose.model('FlowerVendor', flowerVendorSchema);

export default FlowerVendor;

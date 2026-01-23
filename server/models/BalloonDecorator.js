import mongoose from 'mongoose';

const balloonDecoratorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Birthday Decorations', 'Wedding Decorations', 'Corporate Events', 'Baby Shower', 'Anniversary Decorations', 'Theme Parties']
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
  balloonTypes: [String],
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

const BalloonDecorator = mongoose.model('BalloonDecorator', balloonDecoratorSchema);

export default BalloonDecorator;

import mongoose from 'mongoose';

const bouncyKidsGameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      'Inflatable Bouncer',
      'Game Stalls',
      'Ride On Games',
      'Sports Activities',
      'Carnival Games',
      'Party Entertainment'
    ],
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
    city: String,
    state: String
  },
  categories: [{
    type: String
  }],
  gameTypes: [{
    type: String
  }],
  packages: [{
    name: String,
    price: Number,
    items: [String],
    description: String,
    duration: String
  }],
  inventorySize: {
    type: Number,
    default: 0
  },
  experience: {
    type: Number,
    default: 0
  },
  eventsServed: {
    type: Number,
    default: 0
  },
  features: [{
    type: String
  }],
  about: {
    type: String
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
    instagram: String,
    facebook: String
  }
}, {
  timestamps: true
});

export default mongoose.model('BouncyKidsGame', bouncyKidsGameSchema);

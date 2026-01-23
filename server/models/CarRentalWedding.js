import mongoose from 'mongoose';

const carRentalWeddingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      'Luxury Cars',
      'Vintage Cars',
      'Sports Cars',
      'SUV & Premium',
      'Decorated Cars',
      'Budget Cars'
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
  carBrands: [{
    type: String
  }],
  packages: [{
    name: String,
    price: Number,
    cars: [String],
    description: String,
    duration: String,
    services: [String]
  }],
  fleetSize: {
    type: Number,
    default: 0
  },
  experience: {
    type: Number,
    default: 0
  },
  weddingsServed: {
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

export default mongoose.model('CarRentalWedding', carRentalWeddingSchema);

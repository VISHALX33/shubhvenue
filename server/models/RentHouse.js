import mongoose from 'mongoose';

const rentHouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Cottage', 'Villa', 'Bungalow', 'Mansion', 'Beach House', 'Farmhouse']
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
  amenities: [{
    type: String
  }],
  packages: [{
    name: String,
    price: Number,
    duration: String,
    description: String,
    includes: [String]
  }],
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  floors: String,
  experience: {
    type: Number,
    required: true
  },
  eventsHosted: {
    type: Number,
    required: true
  },
  features: [{
    type: String
  }],
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

const RentHouse = mongoose.model('RentHouse', rentHouseSchema);

export default RentHouse;

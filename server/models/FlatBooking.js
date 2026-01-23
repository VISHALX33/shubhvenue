import mongoose from 'mongoose';

const flatBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Studio Apartment', '1BHK', '2BHK', '3BHK', '4BHK', 'Penthouse']
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
  furnishedStatus: {
    type: String,
    enum: ['Fully Furnished', 'Semi Furnished', 'Unfurnished'],
    required: true
  },
  floor: String,
  experience: {
    type: Number,
    required: true
  },
  guestsHosted: {
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

const FlatBooking = mongoose.model('FlatBooking', flatBookingSchema);

export default FlatBooking;

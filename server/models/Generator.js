import mongoose from 'mongoose';

const generatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Diesel Generator', 'Petrol Generator', 'Silent Generator', 'Industrial Generator', 'Portable Generator', 'Inverter Generator'],
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
  capacity: {
    type: Number,
    required: true
  },
  fuelType: {
    type: String,
    enum: ['Diesel', 'Petrol', 'Gas', 'Hybrid'],
    required: true
  },
  fuelConsumption: {
    type: Number,
    required: true
  },
  runTime: {
    type: Number,
    required: true
  },
  noiseLevel: {
    type: Number,
    required: true
  },
  features: [{
    type: String
  }],
  specifications: [{
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

const Generator = mongoose.model('Generator', generatorSchema);

export default Generator;

import mongoose from 'mongoose';

const dholTashaSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Traditional Dhol Tasha', 'Pathak Style', 'Modern Fusion', 'Competition Group', 'Festival Specialist', 'Budget Group'],
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
    state: String
  },
  groupMembers: {
    type: Number,
    required: true,
    min: 10,
    max: 100
  },
  dholPlayers: {
    type: Number,
    required: true,
    default: 0
  },
  tashaPlayers: {
    type: Number,
    required: true,
    default: 0
  },
  instruments: [{
    type: String,
    required: true
  }],
  costumes: {
    included: {
      type: Boolean,
      default: true
    },
    types: [String]
  },
  performances: [{
    type: String,
    required: true
  }],
  choreography: {
    type: Boolean,
    default: false
  },
  formations: [String],
  price: {
    perEvent: {
      type: Number,
      required: true
    },
    perHour: Number
  },
  duration: {
    minimum: {
      type: Number,
      required: true
    },
    maximum: Number
  },
  lightingIncluded: {
    type: Boolean,
    default: false
  },
  soundSystemIncluded: {
    type: Boolean,
    default: false
  },
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
    date: Date
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

const DholTasha = mongoose.model('DholTasha', dholTashaSchema);

export default DholTasha;

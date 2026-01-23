import mongoose from 'mongoose';

const bandBajaSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Traditional Band', 'Brass Band', 'Modern Band', 'Dhol with Band', 'Royal Band', 'Budget Band']
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
  bandMembers: {
    type: Number,
    required: true
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
  dholPlayers: {
    type: Number,
    default: 0
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

const BandBaja = mongoose.model('BandBaja', bandBajaSchema);

export default BandBaja;

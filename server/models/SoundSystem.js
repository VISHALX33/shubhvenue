import mongoose from 'mongoose';

const soundSystemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Wedding Sound System', 'DJ Sound System', 'Concert Sound System', 'Corporate Sound System', 'Party Sound System', 'Basic Sound System']
  },
  mainImage: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  location: {
    city: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  price: {
    perDay: {
      type: Number,
      required: true
    },
    perEvent: {
      type: Number
    }
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
  brands: [{
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
    date: Date
  }],
  contactInfo: {
    phone: {
      type: String,
      required: true
    },
    email: String,
    website: String,
    whatsapp: String,
    instagram: String
  }
}, {
  timestamps: true
});

const SoundSystem = mongoose.model('SoundSystem', soundSystemSchema);

export default SoundSystem;

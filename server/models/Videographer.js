import mongoose from 'mongoose';

const videographerSchema = new mongoose.Schema({
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
    enum: ['Wedding Videographer', 'Event Videographer', 'Commercial Videographer', 'Corporate Videographer', 'Documentary Videographer', 'Budget Videographer']
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
    perHour: {
      type: Number,
      required: true
    },
    perDay: {
      type: Number,
      required: true
    },
    perEvent: {
      type: Number
    }
  },
  experience: {
    type: Number,
    required: true
  },
  services: [{
    type: String
  }],
  equipment: [{
    type: String
  }],
  specializations: [{
    type: String
  }],
  about: {
    type: String,
    required: true
  },
  deliveryTime: {
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
    instagram: String,
    youtube: String
  }
}, {
  timestamps: true
});

const Videographer = mongoose.model('Videographer', videographerSchema);

export default Videographer;

import mongoose from 'mongoose';

const photographerSchema = new mongoose.Schema({
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
    enum: ['Wedding Photographer', 'Event Photographer', 'Commercial Photographer', 'Portrait Photographer', 'Product Photographer', 'Budget Photographer']
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
    address: String,
    pincode: String
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
    perEvent: Number
  },
  experience: {
    type: Number,
    required: true // Years of experience
  },
  services: [{
    type: String,
    required: true
  }],
  equipment: [{
    type: String,
    required: true
  }],
  specializations: [{
    type: String,
    required: true
  }],
  about: {
    type: String,
    required: true
  },
  deliveryTime: {
    type: String,
    required: true // e.g., "7-10 days"
  },
  availability: {
    type: Boolean,
    default: true
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

const Photographer = mongoose.model('Photographer', photographerSchema);

export default Photographer;

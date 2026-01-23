import mongoose from 'mongoose';

const stageSetupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Wedding Stage', 'Corporate Stage', 'Concert Stage', 'Fashion Show Stage', 'DJ Stage', 'Birthday Party Stage']
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
  dimensions: {
    length: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  capacity: {
    type: Number,
    required: true
  },
  features: [{
    type: String
  }],
  setupTime: {
    type: Number,
    required: true
  },
  materials: [{
    type: String
  }],
  included: [{
    type: String
  }],
  customization: {
    type: Boolean,
    default: false
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

const StageSetup = mongoose.model('StageSetup', stageSetupSchema);

export default StageSetup;

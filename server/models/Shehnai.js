import mongoose from 'mongoose';

const shehnaiSchema = new mongoose.Schema({
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
    enum: ['Traditional Shehnai', 'Wedding Specialist', 'Classical Shehnai', 'Fusion Shehnai', 'Temple Music', 'Budget Shehnai'],
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
    min: 2,
    max: 15
  },
  shehnaiPlayers: {
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
  musicStyle: {
    type: String,
    enum: ['Classical', 'Traditional', 'Fusion', 'Religious', 'Contemporary'],
    required: true
  },
  accompaniment: [String],
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

const Shehnai = mongoose.model('Shehnai', shehnaiSchema);

export default Shehnai;

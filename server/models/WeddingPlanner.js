import mongoose from 'mongoose';

const weddingPlannerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Full Service Wedding Planner',
      'Destination Wedding Specialist',
      'Budget Wedding Planner',
      'Luxury Wedding Planner',
      'Day-of Coordinator',
      'Cultural Wedding Specialist'
    ]
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
      required: true
    }
  },
  services: [{
    type: String,
    required: true
  }],
  specializations: [{
    type: String
  }],
  planningScope: {
    type: String,
    required: true,
    enum: [
      'Full Planning',
      'Partial Planning',
      'Day-of Coordination',
      'Consultation Only',
      'All Services'
    ]
  },
  packages: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    services: [{
      type: String
    }],
    description: String
  }],
  teamSize: {
    type: Number,
    required: true
  },
  weddingsCompleted: {
    type: Number,
    required: true
  },
  experience: {
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
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    whatsapp: String,
    instagram: String,
    website: String
  }
}, {
  timestamps: true
});

const WeddingPlanner = mongoose.model('WeddingPlanner', weddingPlannerSchema);

export default WeddingPlanner;

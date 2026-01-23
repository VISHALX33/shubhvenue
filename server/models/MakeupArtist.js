import mongoose from 'mongoose';

const makeupArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Bridal Makeup Artist',
      'HD Makeup Specialist',
      'Airbrush Makeup Expert',
      'Party Makeup Artist',
      'Celebrity Makeup Artist',
      'Traditional Makeup Expert'
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
  makeupStyles: [{
    type: String,
    required: true
  }],
  specializations: [{
    type: String
  }],
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
    description: String,
    duration: String
  }],
  teamSize: {
    type: Number,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  bridalMakeupCount: {
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

const MakeupArtist = mongoose.model('MakeupArtist', makeupArtistSchema);

export default MakeupArtist;

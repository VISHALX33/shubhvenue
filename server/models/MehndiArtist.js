import mongoose from 'mongoose';

const mehndiArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Bridal Mehndi Specialist',
      'Arabic Mehndi Artist',
      'Traditional Mehndi Artist',
      'Contemporary Mehndi Designer',
      'Indo-Arabic Specialist',
      'Rajasthani Mehndi Expert'
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
  mehndiStyles: [{
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
  bridalMehndiCount: {
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

const MehndiArtist = mongoose.model('MehndiArtist', mehndiArtistSchema);

export default MehndiArtist;

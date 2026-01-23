import mongoose from 'mongoose';

const eventManagementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Wedding Planner', 'Corporate Event Manager', 'Social Event Planner', 'Birthday Party Organizer', 'Conference & Seminar Manager', 'Budget Event Manager']
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
    perEvent: {
      type: Number,
      required: true
    },
    consultation: {
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
  specializations: [{
    type: String
  }],
  eventsManaged: {
    type: Number,
    default: 0
  },
  teamSize: {
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
    instagram: String,
    facebook: String
  }
}, {
  timestamps: true
});

const EventManagement = mongoose.model('EventManagement', eventManagementSchema);

export default EventManagement;

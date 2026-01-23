import mongoose from 'mongoose';

const eventFurnitureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Wedding Furniture',
      'Corporate Furniture',
      'Party Furniture',
      'Lounge Furniture',
      'Stage Furniture',
      'Outdoor Furniture'
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
  categories: [{
    type: String
  }],
  furnitureTypes: [{
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
    items: [{
      type: String
    }],
    description: String,
    quantity: String
  }],
  inventorySize: {
    type: Number,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  eventsServed: {
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
    userName: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
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

const EventFurniture = mongoose.model('EventFurniture', eventFurnitureSchema);

export default EventFurniture;

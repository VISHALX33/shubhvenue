import mongoose from 'mongoose';

const costumeDressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Bridal Wear',
      'Groom Wear',
      'Party Wear',
      'Traditional Wear',
      'Kids Costume',
      'Ethnic Wear'
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
  collections: [{
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
    duration: String
  }],
  inventorySize: {
    type: Number,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  deliveredCount: {
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

const CostumeDress = mongoose.model('CostumeDress', costumeDressSchema);

export default CostumeDress;

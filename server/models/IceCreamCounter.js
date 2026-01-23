import mongoose from 'mongoose';

const iceCreamCounterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add an ice cream counter name'],
    },
    type: {
      type: String,
      required: [true, 'Please add a counter type'],
      enum: [
        'Traditional Ice Cream',
        'Gelato Counter',
        'Soft Serve',
        'Sugar-Free Options',
        'Vegan Ice Cream',
        'Premium Artisan',
      ],
    },
    mainImage: {
      type: String,
      required: [true, 'Please add a main image'],
    },
    images: [String],
    location: {
      area: String,
      city: String,
      state: String,
    },
    categories: [String],
    flavors: [String],
    packages: [
      {
        name: String,
        price: Number,
        items: [String],
        description: String,
        servings: String,
        setupIncluded: Boolean,
      },
    ],
    flavorsAvailable: {
      type: Number,
      required: [true, 'Please add flavors available count'],
    },
    experience: {
      type: Number,
      required: [true, 'Please add years of experience'],
    },
    eventsServed: {
      type: Number,
      required: [true, 'Please add events served count'],
    },
    features: [String],
    about: {
      type: String,
      required: [true, 'Please add an about section'],
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    reviews: [
      {
        userName: String,
        rating: Number,
        comment: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    contactInfo: {
      phone: String,
      email: String,
      whatsapp: String,
      instagram: String,
      website: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('IceCreamCounter', iceCreamCounterSchema);

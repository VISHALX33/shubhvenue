import mongoose from 'mongoose';

const juiceCounterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a juice counter name'],
    },
    type: {
      type: String,
      required: [true, 'Please add a counter type'],
      enum: [
        'Fresh Juice Bar',
        'Smoothie Counter',
        'Detox Juice Station',
        'Seasonal Fruit Juices',
        'Premium Cold Press',
        'Mocktail Counter',
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
    juiceVarieties: [String],
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
    juicesAvailable: {
      type: Number,
      required: [true, 'Please add juices available count'],
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

export default mongoose.model('JuiceCounter', juiceCounterSchema);

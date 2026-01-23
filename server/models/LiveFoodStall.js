import mongoose from 'mongoose';

const liveFoodStallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a live food stall name'],
    },
    type: {
      type: String,
      required: [true, 'Please add a stall type'],
      enum: [
        'Chaat Counter',
        'Dosa & Idli Station',
        'Pav Bhaji Stall',
        'Pasta & Noodles Counter',
        'Pizza Station',
        'Sandwich & Burger Corner',
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
    dishVarieties: [String],
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
    dishesAvailable: {
      type: Number,
      required: [true, 'Please add dishes available count'],
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

export default mongoose.model('LiveFoodStall', liveFoodStallSchema);

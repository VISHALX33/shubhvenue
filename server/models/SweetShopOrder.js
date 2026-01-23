import mongoose from 'mongoose';

const sweetShopOrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a sweet shop name'],
    },
    type: {
      type: String,
      required: [true, 'Please add a sweet type'],
      enum: [
        'Traditional Sweets',
        'Modern Desserts',
        'Sugar-Free Options',
        'Festival Specials',
        'Wedding Sweets',
        'Corporate Gifts',
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
    sweetVarieties: [String],
    packages: [
      {
        name: String,
        price: Number,
        items: [String],
        description: String,
        quantity: String,
        deliveryIncluded: Boolean,
      },
    ],
    itemsAvailable: {
      type: Number,
      required: [true, 'Please add items available count'],
    },
    experience: {
      type: Number,
      required: [true, 'Please add years of experience'],
    },
    ordersCompleted: {
      type: Number,
      required: [true, 'Please add orders completed count'],
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

export default mongoose.model('SweetShopOrder', sweetShopOrderSchema);

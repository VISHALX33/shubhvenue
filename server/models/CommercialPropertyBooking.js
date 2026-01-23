import mongoose from 'mongoose';

const commercialPropertyBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Office Space', 'Retail Shop', 'Showroom', 'Restaurant Space', 'Warehouse', 'Industrial Unit']
  },
  mainImage: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  area: {
    type: Number,
    required: true
  },
  areaUnit: {
    type: String,
    enum: ['Sq Ft', 'Sq Meters'],
    default: 'Sq Ft'
  },
  floorNumber: {
    type: String
  },
  totalFloors: {
    type: Number
  },
  furnished: {
    type: String,
    required: true,
    enum: ['Fully Furnished', 'Semi Furnished', 'Unfurnished']
  },
  parking: {
    type: Number,
    default: 0
  },
  washrooms: {
    type: Number,
    default: 1
  },
  pantry: {
    type: Boolean,
    default: false
  },
  powerBackup: {
    type: Boolean,
    default: false
  },
  lift: {
    type: Boolean,
    default: false
  },
  securityDeposit: {
    type: Number
  },
  maintenanceCharges: {
    type: Number
  },
  lockInPeriod: {
    type: String
  },
  leaseTerm: {
    type: String,
    enum: ['Monthly', '3 Months', '6 Months', '1 Year', '2 Years', '3 Years', '5 Years'],
    required: true
  },
  suitableFor: [{
    type: String
  }],
  buildingGrade: {
    type: String,
    enum: ['Grade A', 'Grade B', 'Grade C']
  },
  propertyAge: {
    type: String
  },
  fireExtinguisher: {
    type: Boolean,
    default: false
  },
  cctvSurveillance: {
    type: Boolean,
    default: false
  },
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
    },
    landmark: String
  },
  categories: [{
    type: String
  }],
  amenities: [{
    type: String
  }],
  packages: [{
    name: String,
    price: Number,
    duration: String,
    description: String,
    includes: [String]
  }],
  features: [{
    type: String
  }],
  nearbyFacilities: [{
    type: String
  }],
  experience: Number,
  clientsServed: Number,
  about: String,
  ratings: {
    type: Number,
    default: 0
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
    phone: String,
    email: String,
    whatsapp: String,
    instagram: String,
    website: String
  }
}, {
  timestamps: true
});

// Method to add a review
commercialPropertyBookingSchema.methods.addReview = function(userName, rating, comment) {
  this.reviews.push({ userName, rating, comment });
  
  // Recalculate average rating
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.ratings = totalRating / this.reviews.length;
  
  return this.save();
};

const CommercialPropertyBooking = mongoose.model('CommercialPropertyBooking', commercialPropertyBookingSchema);

export default CommercialPropertyBooking;

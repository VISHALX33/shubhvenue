import mongoose from 'mongoose';

const jameenPlotBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Residential Plot', 'Commercial Plot', 'Agricultural Land', 'Industrial Plot', 'Farm Plot', 'Investment Land']
  },
  mainImage: {
    type: String,
    required: true
  },
  images: [String],
  location: {
    area: String,
    city: String,
    state: String,
    landmark: String
  },
  categories: [String],
  amenities: [String],
  packages: [{
    name: String,
    price: Number,
    duration: String,
    description: String,
    includes: [String]
  }],
  area: {
    type: Number,
    required: true // in square feet
  },
  areaUnit: {
    type: String,
    enum: ['Sq Ft', 'Sq Yards', 'Acres', 'Hectares', 'Bigha', 'Gaj'],
    default: 'Sq Ft'
  },
  dimensions: {
    type: String // e.g., "60 x 80 ft"
  },
  boundaryWall: {
    type: String,
    required: true,
    enum: ['Completed', 'Partial', 'Not Available']
  },
  roadAccess: {
    type: String,
    required: true,
    enum: ['Single Road', 'Corner Plot', 'Main Road', 'Park Facing', 'Two Road Corner', 'Three Side Open']
  },
  roadWidth: String, // e.g., "40 feet"
  waterSupply: {
    type: String,
    required: true,
    enum: ['Municipality', 'Borewell', 'Both', 'Not Available']
  },
  electricity: {
    type: String,
    required: true,
    enum: ['Available', 'Not Available', 'Nearby']
  },
  approved: [String], // RERA, Municipality, Gram Panchayat, etc.
  plotFacing: {
    type: String,
    enum: ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West']
  },
  soilType: String, // for agricultural land
  clearTitle: {
    type: Boolean,
    default: true
  },
  possession: {
    type: String,
    enum: ['Immediate', 'Within 1 Month', 'Within 3 Months', 'Within 6 Months', 'Under Development']
  },
  developerName: String,
  projectName: String,
  totalPlots: Number,
  plotsAvailable: Number,
  pricePerSqFt: Number,
  suitableFor: [String], // types of uses
  features: [String],
  nearbyFacilities: [String],
  experience: Number,
  clientsServed: Number,
  about: String,
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
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

// Method to add a review and update ratings
jameenPlotBookingSchema.methods.addReview = function(userName, rating, comment) {
  this.reviews.push({ userName, rating, comment, date: new Date() });
  
  // Recalculate average rating
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.ratings = totalRating / this.reviews.length;
  
  return this.save();
};

export default mongoose.model('JameenPlotBooking', jameenPlotBookingSchema);

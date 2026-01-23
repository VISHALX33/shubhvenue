import mongoose from 'mongoose';

const shopBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Retail Shop', 'Commercial Space', 'Showroom', 'Kiosk', 'Food Court Space', 'Office Shop']
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
  floors: String,
  shopNumber: String,
  buildingName: String,
  furnished: {
    type: String,
    enum: ['Fully Furnished', 'Semi Furnished', 'Unfurnished'],
    required: true
  },
  parking: {
    type: String,
    enum: ['Available', 'Not Available', 'Paid Parking'],
    required: true
  },
  securityDeposit: {
    type: Number,
    required: true
  },
  maintenanceCharges: Number,
  lockInPeriod: String,
  noticePeriod: String,
  suitableFor: [String], // Retail, Office, Clinic, Salon, etc.
  features: [String],
  nearbyFacilities: [String],
  experience: {
    type: Number,
    required: true
  },
  tenantsHosted: {
    type: Number,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  reviews: [{
    userName: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  contactInfo: {
    phone: String,
    email: String,
    whatsapp: String,
    instagram: String,
    website: String
  }
}, { timestamps: true });

// Add review and update ratings
shopBookingSchema.methods.addReview = function(review) {
  this.reviews.push(review);
  
  // Recalculate average rating
  const totalRating = this.reviews.reduce((sum, rev) => sum + rev.rating, 0);
  this.ratings.average = totalRating / this.reviews.length;
  this.ratings.count = this.reviews.length;
  
  return this.save();
};

const ShopBooking = mongoose.model('ShopBooking', shopBookingSchema);

export default ShopBooking;

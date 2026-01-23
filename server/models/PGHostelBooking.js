import mongoose from 'mongoose';

const pgHostelBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Boys PG', 'Girls PG', 'Co-living Space', 'Private Hostel', 'Shared Hostel', 'Studio PG']
  },
  mainImage: {
    type: String,
    required: true
  },
  images: [String],
  location: {
    area: String,
    city: String,
    state: String
  },
  categories: [String],
  amenities: [String],
  packages: [{
    name: String,
    price: Number,
    roomType: String,
    description: String,
    includes: [String]
  }],
  roomTypes: [String], // Single, Double, Triple, Dormitory
  gender: {
    type: String,
    enum: ['Boys Only', 'Girls Only', 'Unisex'],
    required: true
  },
  food: {
    type: String,
    enum: ['Available', 'Not Available', 'Optional'],
    required: true
  },
  totalBeds: {
    type: Number,
    required: true
  },
  occupiedBeds: {
    type: Number,
    default: 0
  },
  securityDeposit: {
    type: Number,
    required: true
  },
  noticePeriod: String,
  minimumStay: String,
  facilities: [String],
  rules: [String],
  nearbyPlaces: [String],
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
pgHostelBookingSchema.methods.addReview = function(review) {
  this.reviews.push(review);
  
  // Recalculate average rating
  const totalRating = this.reviews.reduce((sum, rev) => sum + rev.rating, 0);
  this.ratings.average = totalRating / this.reviews.length;
  this.ratings.count = this.reviews.length;
  
  return this.save();
};

const PGHostelBooking = mongoose.model('PGHostelBooking', pgHostelBookingSchema);

export default PGHostelBooking;

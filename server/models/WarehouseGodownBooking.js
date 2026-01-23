import mongoose from 'mongoose';

const warehouseGodownBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Cold Storage', 'Dry Warehouse', 'Bonded Warehouse', 'Distribution Center', 'Fulfillment Center', 'Storage Godown']
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
  height: {
    type: String, // ceiling height/clearance
    required: true
  },
  storageCapacity: {
    type: String, // in tons or pallets
    required: true
  },
  loadingDocks: {
    type: Number,
    default: 0
  },
  parkingSpace: {
    type: String,
    required: true
  },
  temperatureControlled: {
    type: String,
    enum: ['Yes', 'No', 'Partial'],
    required: true
  },
  temperatureRange: {
    type: String // e.g., "-20°C to 5°C"
  },
  floorType: {
    type: String,
    required: true,
    enum: ['Concrete', 'Epoxy Coated', 'Anti-Static', 'Industrial Grade']
  },
  securityFeatures: [String],
  fireSafety: [String],
  access247: {
    type: Boolean,
    default: false
  },
  certifications: [String],
  suitableFor: [String], // types of goods suitable for storage
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
warehouseGodownBookingSchema.methods.addReview = function(userName, rating, comment) {
  this.reviews.push({ userName, rating, comment, date: new Date() });
  
  // Recalculate average rating
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.ratings = totalRating / this.reviews.length;
  
  return this.save();
};

export default mongoose.model('WarehouseGodownBooking', warehouseGodownBookingSchema);

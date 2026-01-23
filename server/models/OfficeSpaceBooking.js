import mongoose from 'mongoose';

const officeSpaceBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Private Office', 'Co-working Space', 'Virtual Office', 'Meeting Room', 'Serviced Office', 'Shared Office']
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
  seatingCapacity: {
    type: Number,
    required: true
  },
  cabins: {
    type: Number,
    default: 0
  },
  meetingRooms: {
    type: Number,
    default: 0
  },
  furnished: {
    type: String,
    required: true,
    enum: ['Fully Furnished', 'Semi Furnished', 'Unfurnished']
  },
  parking: {
    type: String,
    required: true,
    enum: ['Available', 'Not Available', 'Paid Parking']
  },
  powerBackup: {
    type: String,
    required: true,
    enum: ['Full', 'Partial', 'None']
  },
  internetSpeed: {
    type: String // e.g., "100 Mbps", "1 Gbps"
  },
  cafeteria: {
    type: Boolean,
    default: false
  },
  floorNumber: {
    type: String
  },
  buildingGrade: {
    type: String,
    enum: ['Grade A', 'Grade B', 'Grade C', 'Premium']
  },
  securityDeposit: Number,
  lockInPeriod: String,
  noticePeriod: String,
  suitableFor: [String], // types of businesses
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
officeSpaceBookingSchema.methods.addReview = function(userName, rating, comment) {
  this.reviews.push({ userName, rating, comment, date: new Date() });
  
  // Recalculate average rating
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.ratings = totalRating / this.reviews.length;
  
  return this.save();
};

export default mongoose.model('OfficeSpaceBooking', officeSpaceBookingSchema);

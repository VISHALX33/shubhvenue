import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Guest ID is required']
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Vendor ID is required']
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: [
      'eventManagement',
      'marriageGarden',
      'banquetHall',
      'resort',
      'farmhouse',
      'partyHall',
      'communityHall',
      'openGround',
      'djServices',
      'tentServices',
      'catering',
      'photography',
      'videography',
      'decoration',
      'makeupArtist',
      'mehndiArtist',
      'weddingPlanner',
      'priest',
      'band',
      'choreographer',
      'securityServices',
      'valet',
      'transportation',
      'soundSystem',
      'lighting',
      'flowerVendor'
    ]
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Service ID is required']
  },
  eventName: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true
  },
  eventDate: {
    type: Date,
    required: [true, 'Event date is required']
  },
  eventTime: {
    type: String,
    required: [true, 'Event time is required']
  },
  guestCount: {
    type: Number,
    required: [true, 'Guest count is required'],
    min: [1, 'Guest count must be at least 1']
  },
  venue: {
    type: String,
    required: [true, 'Venue is required'],
    trim: true
  },
  venueAddress: {
    type: String,
    trim: true
  },
  contactPerson: {
    type: String,
    required: [true, 'Contact person name is required'],
    trim: true
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true
  },
  contactEmail: {
    type: String,
    trim: true
  },
  specialRequests: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected', 'cancelled', 'completed'],
    default: 'pending'
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  advancePayment: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'advance-paid', 'fully-paid'],
    default: 'unpaid'
  },
  vendorNotes: {
    type: String,
    trim: true
  },
  rejectionReason: {
    type: String,
    trim: true
  },
  confirmedAt: {
    type: Date
  },
  cancelledAt: {
    type: Date
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for faster queries
bookingSchema.index({ guest: 1, createdAt: -1 });
bookingSchema.index({ vendor: 1, createdAt: -1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ eventDate: 1 });

// Virtual for vendor service details
bookingSchema.virtual('serviceDetails', {
  ref: function() {
    // Dynamically determine the model based on serviceType
    const modelMap = {
      eventManagement: 'EventManagement',
      marriageGarden: 'MarriageGarden',
      banquetHall: 'BanquetHall',
      resort: 'Resort',
      farmhouse: 'Farmhouse',
      partyHall: 'PartyHall',
      communityHall: 'CommunityHall',
      openGround: 'OpenGround',
      djServices: 'DjService',
      tentServices: 'TentService',
      catering: 'Catering',
      photography: 'Photography',
      videography: 'Videography',
      decoration: 'Decoration',
      makeupArtist: 'MakeupArtist',
      mehndiArtist: 'MehndiArtist',
      weddingPlanner: 'WeddingPlanner',
      priest: 'Priest',
      band: 'Band',
      choreographer: 'Choreographer',
      securityServices: 'SecurityService',
      valet: 'Valet',
      transportation: 'Transportation',
      soundSystem: 'SoundSystem',
      lighting: 'Lighting',
      flowerVendor: 'FlowerVendor'
    };
    return modelMap[this.serviceType];
  },
  localField: 'serviceId',
  foreignField: '_id',
  justOne: true
});

// Make sure virtuals are included in JSON
bookingSchema.set('toJSON', { virtuals: true });
bookingSchema.set('toObject', { virtuals: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

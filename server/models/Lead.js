import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: [
      'Marriage Garden',
      'Banquet Hall',
      'Resort',
      'Farmhouse',
      'Party Hall',
      'Community Hall',
      'Open Ground',
      'DJ Services',
      'Tent Services',
      'Catering',
      'Photography',
      'Videography',
      'Event Management',
      'Wedding Planner',
      'Makeup Artist',
      'Mehndi Artist',
      'Other'
    ]
  },
  eventDate: {
    type: Date
  },
  guestCount: {
    type: Number
  },
  location: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: [{
    note: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  source: {
    type: String,
    enum: ['website', 'phone', 'email', 'referral', 'social-media'],
    default: 'website'
  }
}, {
  timestamps: true
});

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;

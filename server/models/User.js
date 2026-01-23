import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please add your full name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['guest', 'vendor', 'admin'],
    default: 'guest'
  },
  authProvider: {
    type: String,
    enum: ['local', 'google', 'firebase'],
    default: 'local'
  },
  firebaseUid: {
    type: String,
    sparse: true
  },
  vendorCategory: {
    type: String,
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
      'Decoration',
      'Makeup Artist',
      'Mehndi Artist',
      'Wedding Planner',
      'Other'
    ]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profileImage: String,
  businessName: String,
  businessAddress: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;

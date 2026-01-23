import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Deleting existing admin to recreate...');
      await User.deleteOne({ email: 'admin@gmail.com' });
    }

    // Create admin user (password will be hashed by the model's pre-save hook)
    const admin = await User.create({
      fullName: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
      authProvider: 'local',
      phone: '9999999999'
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@gmail.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();

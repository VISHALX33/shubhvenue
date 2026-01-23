import Payout from '../models/Payout.js';
import Booking from '../models/Booking.js';

// Create Payout Request (Vendor)
export const createPayoutRequest = async (req, res) => {
  try {
    const { bookingId, bankDetails } = req.body;
    
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    if (booking.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized'
      });
    }
    
    if (booking.status !== 'completed') {
      return res.status(400).json({
        success: false,
        error: 'Booking must be completed before requesting payout'
      });
    }
    
    // Check if payout already exists
    const existingPayout = await Payout.findOne({ booking: bookingId });
    if (existingPayout) {
      return res.status(400).json({
        success: false,
        error: 'Payout request already exists for this booking'
      });
    }
    
    // Calculate payout amounts
    const amount = booking.totalPrice || 0;
    const commissionRate = 10; // 10% commission
    const commissionAmount = (amount * commissionRate) / 100;
    const netAmount = amount - commissionAmount;
    
    const payout = await Payout.create({
      vendor: req.user._id,
      booking: bookingId,
      amount,
      commissionRate,
      commissionAmount,
      netAmount,
      bankDetails
    });
    
    res.status(201).json({
      success: true,
      data: payout
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get All Payouts (Admin)
export const getAllPayouts = async (req, res) => {
  try {
    const { status, vendor } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (vendor) filter.vendor = vendor;
    
    const payouts = await Payout.find(filter)
      .populate('vendor', 'fullName businessName email phone')
      .populate('booking', 'eventName eventDate serviceType')
      .populate('processedBy', 'fullName')
      .sort({ requestedAt: -1 });
    
    res.json({
      success: true,
      count: payouts.length,
      data: payouts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get Vendor Payouts
export const getVendorPayouts = async (req, res) => {
  try {
    const payouts = await Payout.find({ vendor: req.user._id })
      .populate('booking', 'eventName eventDate serviceType totalPrice')
      .sort({ requestedAt: -1 });
    
    res.json({
      success: true,
      count: payouts.length,
      data: payouts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get Single Payout
export const getPayout = async (req, res) => {
  try {
    const payout = await Payout.findById(req.params.id)
      .populate('vendor', 'fullName businessName email phone')
      .populate('booking')
      .populate('processedBy', 'fullName');
    
    if (!payout) {
      return res.status(404).json({
        success: false,
        error: 'Payout not found'
      });
    }
    
    res.json({
      success: true,
      data: payout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update Payout Status (Admin)
export const updatePayoutStatus = async (req, res) => {
  try {
    const { status, transactionId, notes } = req.body;
    
    const updateData = {
      status,
      notes,
      processedBy: req.user._id
    };
    
    if (status === 'processing' && !transactionId) {
      updateData.processedAt = Date.now();
    }
    
    if (status === 'completed') {
      updateData.completedAt = Date.now();
      if (transactionId) updateData.transactionId = transactionId;
    }
    
    const payout = await Payout.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!payout) {
      return res.status(404).json({
        success: false,
        error: 'Payout not found'
      });
    }
    
    res.json({
      success: true,
      data: payout
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get Payout Stats (Admin)
export const getPayoutStats = async (req, res) => {
  try {
    const total = await Payout.countDocuments();
    const pending = await Payout.countDocuments({ status: 'pending' });
    const processing = await Payout.countDocuments({ status: 'processing' });
    const completed = await Payout.countDocuments({ status: 'completed' });
    const failed = await Payout.countDocuments({ status: 'failed' });
    
    const allPayouts = await Payout.find();
    const totalAmount = allPayouts.reduce((sum, p) => sum + p.amount, 0);
    const totalCommission = allPayouts.reduce((sum, p) => sum + p.commissionAmount, 0);
    const totalNetAmount = allPayouts.reduce((sum, p) => sum + p.netAmount, 0);
    
    const completedPayouts = await Payout.find({ status: 'completed' });
    const paidAmount = completedPayouts.reduce((sum, p) => sum + p.netAmount, 0);
    
    res.json({
      success: true,
      data: {
        total,
        pending,
        processing,
        completed,
        failed,
        totalAmount,
        totalCommission,
        totalNetAmount,
        paidAmount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

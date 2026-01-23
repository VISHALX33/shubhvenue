import mongoose from 'mongoose';

const payoutSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  commissionRate: {
    type: Number,
    default: 10 // percentage
  },
  commissionAmount: {
    type: Number,
    required: true
  },
  netAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['bank-transfer', 'upi', 'cheque', 'cash'],
    default: 'bank-transfer'
  },
  bankDetails: {
    accountHolderName: String,
    accountNumber: String,
    ifscCode: String,
    bankName: String,
    upiId: String
  },
  transactionId: {
    type: String
  },
  notes: {
    type: String
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  processedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
payoutSchema.index({ vendor: 1, status: 1 });
payoutSchema.index({ status: 1, requestedAt: -1 });

const Payout = mongoose.model('Payout', payoutSchema);

export default Payout;

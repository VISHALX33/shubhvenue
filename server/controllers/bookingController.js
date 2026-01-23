import Booking from '../models/Booking.js';
import User from '../models/User.js';

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const {
      vendorId,
      serviceType,
      serviceId,
      eventName,
      eventDate,
      eventTime,
      guestCount,
      venue,
      venueAddress,
      contactPerson,
      contactPhone,
      contactEmail,
      specialRequests
    } = req.body;

    // Verify vendor exists
    const vendor = await User.findById(vendorId);
    if (!vendor || vendor.role !== 'vendor') {
      return res.status(404).json({
        success: false,
        error: 'Vendor not found'
      });
    }

    // Create booking
    const booking = await Booking.create({
      guest: req.user._id,
      vendor: vendorId,
      serviceType,
      serviceId,
      eventName,
      eventDate,
      eventTime,
      guestCount,
      venue,
      venueAddress,
      contactPerson,
      contactPhone,
      contactEmail,
      specialRequests
    });

    // Populate guest and vendor details
    await booking.populate('guest', 'fullName email phone');
    await booking.populate('vendor', 'fullName email phone businessName');

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all bookings for a guest
export const getGuestBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.user._id })
      .populate('vendor', 'fullName email phone businessName')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all bookings for a vendor
export const getVendorBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ vendor: req.user._id })
      .populate('guest', 'fullName email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get single booking by ID
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('guest', 'fullName email phone')
      .populate('vendor', 'fullName email phone businessName');

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Check if user is guest or vendor of this booking
    if (
      booking.guest._id.toString() !== req.user._id.toString() &&
      booking.vendor._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this booking'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update booking status (vendor only)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status, vendorNotes, rejectionReason, totalPrice } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Check if user is the vendor
    if (booking.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this booking'
      });
    }

    // Update status
    booking.status = status || booking.status;
    
    if (vendorNotes) booking.vendorNotes = vendorNotes;
    if (totalPrice) booking.totalPrice = totalPrice;
    
    if (status === 'confirmed') {
      booking.confirmedAt = Date.now();
    } else if (status === 'rejected') {
      booking.rejectionReason = rejectionReason;
    } else if (status === 'cancelled') {
      booking.cancelledAt = Date.now();
    } else if (status === 'completed') {
      booking.completedAt = Date.now();
    }

    await booking.save();

    // Populate details
    await booking.populate('guest', 'fullName email phone');
    await booking.populate('vendor', 'fullName email phone businessName');

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Cancel booking (guest only)
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Check if user is the guest
    if (booking.guest.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to cancel this booking'
      });
    }

    // Can only cancel pending or confirmed bookings
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        error: `Cannot cancel booking with status: ${booking.status}`
      });
    }

    booking.status = 'cancelled';
    booking.cancelledAt = Date.now();
    await booking.save();

    await booking.populate('vendor', 'fullName email phone businessName');

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get booking statistics for vendor dashboard
export const getVendorBookingStats = async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      { $match: { vendor: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statsObj = {
      total: 0,
      pending: 0,
      confirmed: 0,
      rejected: 0,
      cancelled: 0,
      completed: 0
    };

    stats.forEach(stat => {
      statsObj[stat._id] = stat.count;
      statsObj.total += stat.count;
    });

    res.json({
      success: true,
      data: statsObj
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

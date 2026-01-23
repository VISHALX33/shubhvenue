import { useState, useEffect } from 'react';
import axios from 'axios';

function VendorBookings() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchBookings();
    fetchStats();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings/vendor');
      setBookings(response.data.data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/bookings/vendor/stats');
      setStats(response.data.data || {});
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleUpdateStatus = async (bookingId, status, additionalData = {}) => {
    setActionLoading(bookingId);
    try {
      await axios.patch(`/api/bookings/${bookingId}/status`, {
        status,
        ...additionalData
      });
      await fetchBookings();
      await fetchStats();
    } catch (err) {
      console.error('Error updating booking:', err);
      alert(err.response?.data?.error || 'Failed to update booking');
    } finally {
      setActionLoading(null);
    }
  };

  const handleConfirm = async (bookingId) => {
    const totalPrice = prompt('Enter total price (optional):');
    const vendorNotes = prompt('Add any notes for the guest (optional):');
    
    await handleUpdateStatus(bookingId, 'confirmed', {
      totalPrice: totalPrice ? parseFloat(totalPrice) : undefined,
      vendorNotes
    });
  };

  const handleReject = async (bookingId) => {
    const rejectionReason = prompt('Please provide a reason for rejection:');
    if (!rejectionReason) {
      alert('Rejection reason is required');
      return;
    }
    
    await handleUpdateStatus(bookingId, 'rejected', { rejectionReason });
  };

  const handleComplete = async (bookingId) => {
    if (window.confirm('Mark this booking as completed?')) {
      await handleUpdateStatus(bookingId, 'completed');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
      cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      confirmed: '✅',
      rejected: '❌',
      cancelled: '🚫',
      completed: '🎉'
    };
    return icons[status] || '📋';
  };

  const filteredBookings = bookings.filter(booking => 
    filterStatus === 'all' || booking.status === filterStatus
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Requests</h1>
          <p className="text-gray-600">Manage your incoming bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-center">
              <p className="text-gray-600 text-xs mb-1">Total</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total || 0}</p>
              <p className="text-2xl">📋</p>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg shadow-md p-4">
            <div className="text-center">
              <p className="text-yellow-700 text-xs mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending || 0}</p>
              <p className="text-2xl">⏳</p>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg shadow-md p-4">
            <div className="text-center">
              <p className="text-green-700 text-xs mb-1">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">{stats.confirmed || 0}</p>
              <p className="text-2xl">✅</p>
            </div>
          </div>
          
          <div className="bg-red-50 rounded-lg shadow-md p-4">
            <div className="text-center">
              <p className="text-red-700 text-xs mb-1">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected || 0}</p>
              <p className="text-2xl">❌</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg shadow-md p-4">
            <div className="text-center">
              <p className="text-gray-700 text-xs mb-1">Cancelled</p>
              <p className="text-2xl font-bold text-gray-600">{stats.cancelled || 0}</p>
              <p className="text-2xl">🚫</p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg shadow-md p-4">
            <div className="text-center">
              <p className="text-blue-700 text-xs mb-1">Completed</p>
              <p className="text-2xl font-bold text-blue-600">{stats.completed || 0}</p>
              <p className="text-2xl">🎉</p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'confirmed', 'rejected', 'cancelled', 'completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg transition capitalize ${
                  filterStatus === status
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Found</h3>
            <p className="text-gray-600">
              {filterStatus === 'all' 
                ? "You don't have any booking requests yet" 
                : `No ${filterStatus} bookings`}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map(booking => (
              <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  {/* Booking Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {booking.eventName}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Booking ID: #{booking._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)} {booking.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Guest Details */}
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-indigo-800 mb-2">Guest Information</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-indigo-700 font-medium">Name:</span> {booking.guest?.fullName}
                      </div>
                      <div>
                        <span className="text-indigo-700 font-medium">Email:</span> {booking.guest?.email || 'N/A'}
                      </div>
                      <div>
                        <span className="text-indigo-700 font-medium">Phone:</span> {booking.guest?.phone || booking.contactPhone}
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600 text-sm">Event Date</p>
                      <p className="font-semibold">
                        {new Date(booking.eventDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Event Time</p>
                      <p className="font-semibold">{booking.eventTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Guest Count</p>
                      <p className="font-semibold">{booking.guestCount} people</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Venue</p>
                      <p className="font-semibold">{booking.venue}</p>
                    </div>
                  </div>

                  {booking.venueAddress && (
                    <div className="mb-4">
                      <p className="text-gray-600 text-sm">Venue Address</p>
                      <p className="font-semibold">{booking.venueAddress}</p>
                    </div>
                  )}

                  {/* Contact Person */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600 text-sm">Contact Person</p>
                      <p className="font-semibold">{booking.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Contact Phone</p>
                      <p className="font-semibold">{booking.contactPhone}</p>
                    </div>
                    {booking.contactEmail && (
                      <div>
                        <p className="text-gray-600 text-sm">Contact Email</p>
                        <p className="font-semibold">{booking.contactEmail}</p>
                      </div>
                    )}
                  </div>

                  {/* Special Requests */}
                  {booking.specialRequests && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-amber-800 mb-1">Special Requests:</p>
                      <p className="text-sm text-amber-700">{booking.specialRequests}</p>
                    </div>
                  )}

                  {/* Price */}
                  {booking.totalPrice > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-green-800">
                        Total Price: <span className="text-lg font-bold">₹{booking.totalPrice.toLocaleString()}</span>
                      </p>
                    </div>
                  )}

                  {/* Vendor Notes */}
                  {booking.vendorNotes && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-blue-800 mb-1">Your Notes:</p>
                      <p className="text-sm text-blue-700">{booking.vendorNotes}</p>
                    </div>
                  )}

                  {/* Rejection Reason */}
                  {booking.status === 'rejected' && booking.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-red-800 mb-1">Rejection Reason:</p>
                      <p className="text-sm text-red-700">{booking.rejectionReason}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    {/* Pending Actions */}
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleConfirm(booking._id)}
                          disabled={actionLoading === booking._id}
                          className="flex-1 min-w-[150px] px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50"
                        >
                          ✅ Confirm Booking
                        </button>
                        <button
                          onClick={() => handleReject(booking._id)}
                          disabled={actionLoading === booking._id}
                          className="flex-1 min-w-[150px] px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50"
                        >
                          ❌ Reject Booking
                        </button>
                      </>
                    )}

                    {/* Confirmed Actions */}
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleComplete(booking._id)}
                        disabled={actionLoading === booking._id}
                        className="flex-1 min-w-[150px] px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                      >
                        🎉 Mark as Completed
                      </button>
                    )}

                    {/* Contact Actions (Available for all active bookings) */}
                    {!['cancelled', 'rejected'].includes(booking.status) && (
                      <>
                        <a
                          href={`tel:${booking.contactPhone}`}
                          className="flex-1 min-w-[150px] px-4 py-2 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition font-medium"
                        >
                          📞 Call Guest
                        </a>
                        {booking.contactEmail && (
                          <a
                            href={`mailto:${booking.contactEmail}`}
                            className="flex-1 min-w-[150px] px-4 py-2 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition font-medium"
                          >
                            ✉️ Email Guest
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-3 text-sm text-gray-600 flex justify-between">
                  <span>
                    Received on {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {booking.confirmedAt && (
                    <span className="text-green-600">
                      Confirmed on {new Date(booking.confirmedAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorBookings;

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function GuestDashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings/guest');
      setBookings(response.data.data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await axios.patch(`/api/bookings/${bookingId}/cancel`);
      setSuccessMessage('Booking cancelled successfully');
      fetchBookings();
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert(err.response?.data?.error || 'Failed to cancel booking');
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

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length
  };

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
          <p className="text-gray-600">Welcome back, {user?.fullName}!</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Confirmed</p>
                <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-3xl font-bold text-blue-600">{stats.completed}</p>
              </div>
              <div className="text-4xl">🎉</div>
            </div>
          </div>
        </div>

        {/* Filter and Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
            
            <Link
              to="/guest/browse"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              + New Booking
            </Link>
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
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Found</h3>
            <p className="text-gray-600 mb-6">
              {filterStatus === 'all' 
                ? "You haven't made any bookings yet" 
                : `No ${filterStatus} bookings`}
            </p>
            <Link
              to="/guest/browse"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Browse Services
            </Link>
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

                  {/* Booking Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600 text-sm">Vendor</p>
                      <p className="font-semibold">{booking.vendor?.businessName || booking.vendor?.fullName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Event Date</p>
                      <p className="font-semibold">
                        {new Date(booking.eventDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })} at {booking.eventTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Guests</p>
                      <p className="font-semibold">{booking.guestCount} people</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Venue</p>
                      <p className="font-semibold">{booking.venue}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Contact</p>
                      <p className="font-semibold">{booking.contactPhone}</p>
                    </div>
                    {booking.totalPrice > 0 && (
                      <div>
                        <p className="text-gray-600 text-sm">Total Price</p>
                        <p className="font-semibold text-indigo-600">₹{booking.totalPrice.toLocaleString()}</p>
                      </div>
                    )}
                  </div>

                  {/* Vendor Notes */}
                  {booking.vendorNotes && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-blue-800 mb-1">Vendor Notes:</p>
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

                  {/* Special Requests */}
                  {booking.specialRequests && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-gray-800 mb-1">Your Special Requests:</p>
                      <p className="text-sm text-gray-700">{booking.specialRequests}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <a
                      href={`tel:${booking.vendor?.phone}`}
                      className="flex-1 px-4 py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition font-medium"
                    >
                      📞 Call Vendor
                    </a>
                    <a
                      href={`mailto:${booking.vendor?.email}`}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      ✉️ Email Vendor
                    </a>
                    {['pending', 'confirmed'].includes(booking.status) && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-3 text-sm text-gray-600">
                  Booked on {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GuestDashboard;

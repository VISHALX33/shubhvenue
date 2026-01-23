import { useState, useEffect } from 'react'
import axios from 'axios'

function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, venue, event, property, stay

  useEffect(() => {
    // TODO: Fetch bookings from backend API
    // For now, using sample data
    const sampleBookings = [
      {
        id: 1,
        type: 'venue',
        title: 'Party Hall Booking',
        venue: 'Royal Banquet Hall',
        date: '2026-02-15',
        time: '6:00 PM',
        status: 'confirmed',
        amount: 25000,
        bookingDate: '2026-01-20'
      },
      {
        id: 2,
        type: 'event',
        title: 'DJ Booking',
        service: 'DJ Sound System',
        date: '2026-02-15',
        time: '7:00 PM',
        status: 'pending',
        amount: 15000,
        bookingDate: '2026-01-19'
      },
      {
        id: 3,
        type: 'property',
        title: 'Flat Booking',
        property: '2BHK Apartment, MG Road',
        date: '2026-03-01',
        duration: '11 months',
        status: 'confirmed',
        amount: 18000,
        bookingDate: '2026-01-18'
      }
    ]
    
    setTimeout(() => {
      setBookings(sampleBookings)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'venue':
        return 'bg-blue-100 text-blue-800'
      case 'event':
        return 'bg-purple-100 text-purple-800'
      case 'property':
        return 'bg-indigo-100 text-indigo-800'
      case 'stay':
        return 'bg-teal-100 text-teal-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.type === filter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage all your bookings</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md font-medium transition ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setFilter('venue')}
              className={`px-4 py-2 rounded-md font-medium transition ${
                filter === 'venue'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Venue & Halls
            </button>
            <button
              onClick={() => setFilter('event')}
              className={`px-4 py-2 rounded-md font-medium transition ${
                filter === 'event'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Event Services
            </button>
            <button
              onClick={() => setFilter('property')}
              className={`px-4 py-2 rounded-md font-medium transition ${
                filter === 'property'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Property & Rentals
            </button>
            <button
              onClick={() => setFilter('stay')}
              className={`px-4 py-2 rounded-md font-medium transition ${
                filter === 'stay'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Stay & Hospitality
            </button>
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600">Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings found</h3>
              <p className="mt-1 text-gray-500">
                {filter === 'all' 
                  ? 'You haven\'t made any bookings yet.'
                  : `No ${filter} bookings found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(booking.type)}`}>
                          {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {booking.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {booking.venue || booking.service || booking.property}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {booking.date}
                        </div>
                        {booking.time && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {booking.time}
                          </div>
                        )}
                        {booking.duration && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {booking.duration}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 md:text-right">
                      <div className="text-2xl font-bold text-indigo-600 mb-2">
                        ₹{booking.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mb-3">
                        Booked on {booking.bookingDate}
                      </div>
                      <div className="flex gap-2 md:justify-end">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition">
                          View Details
                        </button>
                        {booking.status === 'pending' && (
                          <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Card */}
          {!loading && bookings.length > 0 && (
            <div className="mt-8 bg-indigo-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">{bookings.length}</div>
                  <div className="text-sm text-gray-600">Total Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </div>
                  <div className="text-sm text-gray-600">Confirmed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">
                    {bookings.filter(b => b.status === 'pending').length}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bookings

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaStore, FaCalendarAlt, FaChartLine, FaCog, FaUsers, FaBoxOpen } from 'react-icons/fa';
import axios from 'axios';
import API_URL from '../config/api';

function VendorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalListings: 0,
    totalBookings: 0,
    loading: true
  });

  useEffect(() => {
    fetchVendorStats();
  }, []);

  const fetchVendorStats = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch all vendor listings from the unified endpoint
      const listingsResponse = await axios.get(`${API_URL}/vendor/listings`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Fetch booking stats
      const bookingsResponse = await axios.get(`${API_URL}/bookings/vendor/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (listingsResponse.data.success) {
        // Count total listings across all services
        const allListings = listingsResponse.data.data || [];
        const bookingStats = bookingsResponse.data.success ? bookingsResponse.data.data : { total: 0 };
        
        setStats({
          totalListings: allListings.length,
          totalBookings: bookingStats.total || 0,
          loading: false
        });
      }
    } catch (error) {
      console.error('Error fetching vendor stats:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  const dashboardCards = [
    {
      title: 'My Listings',
      icon: FaBoxOpen,
      count: stats.loading ? '...' : stats.totalListings,
      color: 'bg-blue-500',
      link: '/vendor/listings'
    },
    {
      title: 'Bookings',
      icon: FaCalendarAlt,
      count: stats.loading ? '...' : stats.totalBookings,
      color: 'bg-green-500',
      link: '/vendor/bookings'
    },
    {
      title: 'Analytics',
      icon: FaChartLine,
      count: 'View',
      color: 'bg-purple-500',
      link: '/vendor/analytics'
    },
    {
      title: 'Profile Settings',
      icon: FaCog,
      count: 'Manage',
      color: 'bg-orange-500',
      link: '/vendor/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome, {user?.name || 'Vendor'}!
              </h1>
              <p className="text-gray-600">
                Manage your business and track your performance
              </p>
            </div>
            <FaStore className="text-6xl text-blue-500" />
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.link)}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <card.icon className="text-2xl text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{card.count}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/vendor/add-listing')}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md"
            >
              + Add New Listing
            </button>
            <button
              onClick={() => navigate('/vendor/bookings')}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md"
            >
              View Bookings
            </button>
            <button
              onClick={() => navigate('/vendor/settings')}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-md"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="text-center py-12">
            <FaUsers className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No recent activity</p>
            <p className="text-gray-400 mt-2">Start by adding your first listing!</p>
          </div>
        </div>

        {/* Getting Started Guide */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg p-6 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-2">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Complete Your Profile</h3>
              <p className="text-sm opacity-90">Add your business details and contact information</p>
            </div>
            <div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-2">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Add Your Listings</h3>
              <p className="text-sm opacity-90">Create listings for your venues or services</p>
            </div>
            <div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-2">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Start Receiving Bookings</h3>
              <p className="text-sm opacity-90">Manage inquiries and confirm bookings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;

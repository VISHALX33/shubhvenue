import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalBookings: 0,
    totalLeads: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalRevenue: 0,
    activeVendors: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Fetch users
      const usersRes = await axios.get('/api/auth/users', config);
      const users = usersRes.data.data || usersRes.data;
      const vendors = users.filter(u => u.role === 'vendor');
      const guests = users.filter(u => u.role === 'guest');

      // Fetch bookings
      const bookingsRes = await axios.get('/api/bookings', config);
      const bookings = bookingsRes.data.data || [];

      setStats({
        totalUsers: guests.length,
        totalVendors: vendors.length,
        totalBookings: bookings.length,
        totalLeads: 0, // Will be implemented later
        pendingBookings: bookings.filter(b => b.status === 'pending').length,
        confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
        totalRevenue: bookings.filter(b => b.totalPrice).reduce((sum, b) => sum + b.totalPrice, 0),
        activeVendors: vendors.filter(v => v.isActive !== false).length
      });

      // Recent bookings (last 5)
      setRecentBookings(bookings.slice(0, 5));

      // Recent users (last 5)
      setRecentUsers(users.slice(0, 5));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Vendors',
      value: stats.totalVendors,
      icon: '🏪',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: '📅',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings,
      icon: '⏳',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Confirmed Bookings',
      value: stats.confirmedBookings,
      icon: '✅',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: '💰',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      title: 'Active Vendors',
      value: stats.activeVendors,
      icon: '✨',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600'
    },
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: '📞',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome to ShubhVenue Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`bg-gradient-to-r ${stat.color} p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium opacity-90">{stat.title}</p>
                  <p className="text-white text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className="text-5xl opacity-80">{stat.icon}</div>
              </div>
            </div>
            <div className={`${stat.bgColor} px-4 py-2`}>
              <p className={`${stat.textColor} text-xs font-semibold`}>View Details →</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Bookings</h2>
          <div className="space-y-3">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <div key={booking._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-800">{booking.eventName}</p>
                    <p className="text-sm text-gray-600">{booking.serviceType}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{new Date(booking.eventDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No bookings yet</p>
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Users</h2>
          <div className="space-y-3">
            {recentUsers.length > 0 ? (
              recentUsers.map((user) => (
                <div key={user._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {user.fullName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.fullName}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'vendor' ? 'bg-green-100 text-green-700' :
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No users yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition">
            <div className="text-3xl mb-2">➕</div>
            <div className="font-semibold">Add Vendor</div>
          </button>
          <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">View Reports</div>
          </button>
          <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition">
            <div className="text-3xl mb-2">⚙️</div>
            <div className="font-semibold">Settings</div>
          </button>
          <button className="p-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition">
            <div className="text-3xl mb-2">📧</div>
            <div className="font-semibold">Send Email</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

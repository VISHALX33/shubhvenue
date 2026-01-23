import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalBookings: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // This is placeholder - you'll need to create these endpoints
      setStats({
        totalUsers: 0,
        totalVendors: 0,
        totalBookings: 0,
        totalRevenue: 0
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Vendors</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalVendors}</p>
            </div>
            <div className="text-4xl">🏪</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalBookings}</p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-800">₹{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
            Add New Venue
          </button>
          <button className="p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition">
            Verify Vendor
          </button>
          <button className="p-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
            View Bookings
          </button>
          <button className="p-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition">
            Manage Users
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <p className="text-gray-500 text-center py-8">No recent activity</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

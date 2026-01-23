import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaEye, FaHeart, FaPhoneAlt, FaChartBar } from 'react-icons/fa';

function VendorAnalytics() {
  const navigate = useNavigate();

  const metrics = [
    { label: 'Total Views', value: '0', icon: FaEye, color: 'bg-blue-500', trend: '+0%' },
    { label: 'Total Inquiries', value: '0', icon: FaPhoneAlt, color: 'bg-green-500', trend: '+0%' },
    { label: 'Favorites', value: '0', icon: FaHeart, color: 'bg-pink-500', trend: '+0%' },
    { label: 'Conversions', value: '0%', icon: FaChartBar, color: 'bg-purple-500', trend: '+0%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics</h1>
              <p className="text-gray-600">Track your business performance and insights</p>
            </div>
            <button
              onClick={() => navigate('/vendor/dashboard')}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <metric.icon className="text-2xl text-white" />
                </div>
                <span className="text-green-600 font-semibold text-sm">{metric.trend}</span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{metric.label}</h3>
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Performance Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Overview</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <FaChartLine className="mx-auto text-6xl text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-semibold">Performance Charts</p>
              <p className="text-gray-400 mt-2">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Top Performing Listings */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Performing Listings</h2>
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <FaChartBar className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-gray-600 mb-4">No data available yet</p>
            <p className="text-gray-500 text-sm">
              Start getting bookings to see your top performing listings
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">No recent activity</p>
            <button
              onClick={() => navigate('/vendor/add-listing')}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md"
            >
              Create Your First Listing
            </button>
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-lg p-6 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Advanced Analytics Coming Soon!</h3>
          <p className="text-lg opacity-90">
            We're building detailed analytics and insights to help you grow your business.
          </p>
        </div>
      </div>
    </div>
  );
}

export default VendorAnalytics;

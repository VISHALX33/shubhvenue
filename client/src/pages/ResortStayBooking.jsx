import { useState, useEffect } from 'react';
import axios from 'axios';
import ResortCard from '../components/ResortCard';
import API_URL from '../config/api';

function ResortStayBooking() {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    minCapacity: '',
    maxCapacity: '',
    type: ''
  });

  useEffect(() => {
    fetchResorts();
  }, []);

  const fetchResorts = async (filterParams = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filterParams).toString();
      const response = await axios.get(`${API_URL}/resorts?${queryParams}`);
      setResorts(response.data.data);
    } catch (error) {
      console.error('Error fetching resorts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
    fetchResorts(activeFilters);
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      minPrice: '',
      maxPrice: '',
      minCapacity: '',
      maxCapacity: '',
      type: ''
    });
    fetchResorts();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            Luxury Resorts
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl">
            Destination celebrations in paradise settings
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Filter Resorts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Enter city"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Beach Resort">Beach Resort</option>
                <option value="Hill Station">Hill Station</option>
                <option value="Lake Resort">Lake Resort</option>
                <option value="Wildlife Resort">Wildlife Resort</option>
                <option value="Luxury Resort">Luxury Resort</option>
                <option value="Budget Resort">Budget Resort</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Capacity</label>
              <input
                type="number"
                name="minCapacity"
                value={filters.minCapacity}
                onChange={handleFilterChange}
                placeholder="Min guests"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Capacity</label>
              <input
                type="number"
                name="maxCapacity"
                value={filters.maxCapacity}
                onChange={handleFilterChange}
                placeholder="Max guests"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-end space-x-2 lg:col-span-2">
              <button
                onClick={applyFilters}
                className="flex-1 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {loading ? 'Loading...' : `${resorts.length} Resorts Found`}
          </h2>
        </div>

        {/* Resorts Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
          </div>
        ) : resorts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resorts.map((resort) => (
              <ResortCard key={resort._id} resort={resort} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Resorts Found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
            <button
              onClick={clearFilters}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResortStayBooking;

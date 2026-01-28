import { useState, useEffect } from 'react';
import axios from 'axios';
import LodgeGuestHouseCard from '../components/LodgeGuestHouseCard';
import { FaHome } from 'react-icons/fa';
import API_URL from '../config/api';

function LodgeGuestHouseBooking() {
  const [lodges, setLodges] = useState([]);
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
    fetchLodges();
  }, []);

  const fetchLodges = async (filterParams = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(
        Object.fromEntries(Object.entries(filterParams).filter(([_, value]) => value !== ''))
      ).toString();
      const response = await axios.get(`${API_URL}/lodges?${queryParams}`);
      setLodges(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching lodges:', error);
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
    fetchLodges(activeFilters);
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
    fetchLodges();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center flex items-center justify-center">
            <FaHome className="mr-4" />
            Lodge / Guest House Booking
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl">
            Comfortable and affordable stays for your travels
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Filter Lodges & Guest Houses</h2>
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
                <option value="Lodge">Lodge</option>
                <option value="Guest House">Guest House</option>
                <option value="Homestay">Homestay</option>
                <option value="Hostel">Hostel</option>
                <option value="Budget Stay">Budget Stay</option>
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
                className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all font-semibold"
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
            {loading ? 'Loading...' : `${lodges.length} Lodges & Guest Houses Found`}
          </h2>
        </div>

        {/* Lodges Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
          </div>
        ) : lodges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lodges.map((lodge) => (
              <LodgeGuestHouseCard key={lodge._id} lodge={lodge} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FaHome className="mx-auto text-6xl text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Lodges or Guest Houses Found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LodgeGuestHouseBooking;

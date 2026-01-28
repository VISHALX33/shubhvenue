import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TentCard from '../components/TentCard';
import API_URL from '../config/api';

function TentBooking() {
  const [tents, setTents] = useState([]);
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
    fetchTents();
  }, []);

  const fetchTents = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.minCapacity) queryParams.append('minCapacity', filters.minCapacity);
      if (filters.maxCapacity) queryParams.append('maxCapacity', filters.maxCapacity);
      if (filters.type) queryParams.append('type', filters.type);

      const queryString = queryParams.toString();
      const response = await axios.get(
        `${API_URL}/tents${queryString ? `?${queryString}` : ''}`
      );
      
      setTents(response.data.data);
    } catch (error) {
      console.error('Error fetching tents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = () => {
    fetchTents();
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
    setTimeout(() => {
      fetchTents();
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600')"
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Tent Booking</h1>
          <p className="text-xl">Premium tent setups for all your events</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Filter Tents</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Enter city"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tent Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Wedding Tent">Wedding Tent</option>
                <option value="Corporate Tent">Corporate Tent</option>
                <option value="Party Tent">Party Tent</option>
                <option value="Exhibition Tent">Exhibition Tent</option>
                <option value="Luxury Tent">Luxury Tent</option>
                <option value="Budget Tent">Budget Tent</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="₹ Min"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="₹ Max"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Capacity</label>
                <input
                  type="number"
                  name="minCapacity"
                  value={filters.minCapacity}
                  onChange={handleFilterChange}
                  placeholder="Min guests"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {tents.length} Tents Found
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
          </div>
        ) : tents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tents.map((tent) => (
              <TentCard key={tent._id} tent={tent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⛺</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Tents Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TentBooking;


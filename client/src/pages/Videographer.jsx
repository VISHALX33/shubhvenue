import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideographerCard from '../components/VideographerCard';

function Videographer() {
  const [videographers, setVideographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    type: '',
    specialization: ''
  });

  useEffect(() => {
    fetchVideographers();
  }, []);

  const fetchVideographers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.city) params.append('city', filters.city);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.type) params.append('type', filters.type);
      if (filters.specialization) params.append('specialization', filters.specialization);

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await axios.get(`http://localhost:5000/api/videographers${queryString}`);
      
      setVideographers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching videographers:', error);
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
    fetchVideographers();
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      minPrice: '',
      maxPrice: '',
      type: '',
      specialization: ''
    });
    setTimeout(() => {
      fetchVideographers();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3)',
            opacity: 0.3
          }}
        />
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Professional Videographers</h1>
            <p className="text-xl">Cinematic storytelling for your special moments</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Find Your Perfect Videographer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Enter city"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Videographer Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Wedding Videographer">Wedding Videographer</option>
                <option value="Event Videographer">Event Videographer</option>
                <option value="Commercial Videographer">Commercial Videographer</option>
                <option value="Corporate Videographer">Corporate Videographer</option>
                <option value="Documentary Videographer">Documentary Videographer</option>
                <option value="Budget Videographer">Budget Videographer</option>
              </select>
            </div>

            {/* Specialization Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <select
                name="specialization"
                value={filters.specialization}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Specializations</option>
                <option value="Cinematic Wedding Films">Cinematic Wedding Films</option>
                <option value="Corporate Videos">Corporate Videos</option>
                <option value="Commercial Advertisements">Commercial Advertisements</option>
                <option value="Documentary Films">Documentary Films</option>
                <option value="Drone Aerial Videography">Drone Videography</option>
                <option value="Live Streaming">Live Streaming</option>
              </select>
            </div>

            {/* Min Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (per day)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min ₹"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Max Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (per day)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max ₹"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-semibold"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-semibold"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {videographers.length} Videographer{videographers.length !== 1 ? 's' : ''} Found
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : videographers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videographers.map((videographer) => (
                <VideographerCard key={videographer._id} videographer={videographer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Videographers Found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Videographer

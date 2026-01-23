import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotographerCard from '../components/PhotographerCard';

function CameramanPhotographer() {
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    type: '',
    specialization: ''
  });

  useEffect(() => {
    fetchPhotographers();
  }, []);

  const fetchPhotographers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.city) params.append('city', filters.city);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.type) params.append('type', filters.type);
      if (filters.specialization) params.append('specialization', filters.specialization);

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await axios.get(`http://localhost:5000/api/photographers${queryString}`);
      
      setPhotographers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching photographers:', error);
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
    fetchPhotographers();
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
      fetchPhotographers();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3)',
            opacity: 0.3
          }}
        />
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Cameraman / Photographer</h1>
            <p className="text-xl">Professional photography services to capture your special moments</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Find Your Perfect Photographer</h2>
          
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photographer Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Wedding Photographer">Wedding Photographer</option>
                <option value="Event Photographer">Event Photographer</option>
                <option value="Commercial Photographer">Commercial Photographer</option>
                <option value="Portrait Photographer">Portrait Photographer</option>
                <option value="Product Photographer">Product Photographer</option>
                <option value="Budget Photographer">Budget Photographer</option>
              </select>
            </div>

            {/* Specialization Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <select
                name="specialization"
                value={filters.specialization}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">All Specializations</option>
                <option value="Candid Wedding Photography">Candid Photography</option>
                <option value="Traditional Wedding Photography">Traditional Photography</option>
                <option value="Portrait Photography">Portrait Photography</option>
                <option value="Product Photography">Product Photography</option>
                <option value="Commercial Photography">Commercial Photography</option>
                <option value="Drone Aerial Photography">Drone Photography</option>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-semibold"
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
            {photographers.length} Photographer{photographers.length !== 1 ? 's' : ''} Found
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          ) : photographers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photographers.map((photographer) => (
                <PhotographerCard key={photographer._id} photographer={photographer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Photographers Found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
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

export default CameramanPhotographer

import { useState, useEffect } from 'react';
import axios from 'axios';
import StageSetupCard from '../components/StageSetupCard';
import API_URL from '../config/api';

function StageSetupBooking() {
  const [stageSetups, setStageSetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    type: '',
    capacity: ''
  });

  useEffect(() => {
    fetchStageSetups();
  }, []);

  const fetchStageSetups = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.capacity) queryParams.append('capacity', filters.capacity);

      const queryString = queryParams.toString();
      const url = `${API_URL}/stage-setups${queryString ? `?${queryString}` : ''}`;
      
      const response = await axios.get(url);
      setStageSetups(response.data.data);
    } catch (error) {
      console.error('Error fetching stage setups:', error);
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
    fetchStageSetups();
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      minPrice: '',
      maxPrice: '',
      type: '',
      capacity: ''
    });
    setTimeout(() => {
      fetchStageSetups();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-purple-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f29da8fddb?ixlib=rb-4.0.3" 
            alt="Stage Setup"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Professional Stage Setups
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Premium stages for weddings, concerts, corporate events, and celebrations
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 mb-8">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Find Your Perfect Stage</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Enter city"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stage Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Wedding Stage">Wedding Stage</option>
                <option value="Corporate Stage">Corporate Stage</option>
                <option value="Concert Stage">Concert Stage</option>
                <option value="Fashion Show Stage">Fashion Show Stage</option>
                <option value="DJ Stage">DJ Stage</option>
                <option value="Birthday Party Stage">Birthday Party Stage</option>
              </select>
            </div>

            {/* Capacity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Capacity</label>
              <input
                type="number"
                name="capacity"
                value={filters.capacity}
                onChange={handleFilterChange}
                placeholder="Min capacity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Min Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Max Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-4">
            <button
              onClick={applyFilters}
              className="flex-1 bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {loading ? 'Loading...' : `${stageSetups.length} Stage Setups Found`}
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        )}

        {/* Stage Setups Grid */}
        {!loading && stageSetups.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stageSetups.map((stage) => (
              <StageSetupCard key={stage._id} stageSetup={stage} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && stageSetups.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Stage Setups Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
            <button
              onClick={clearFilters}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StageSetupBooking

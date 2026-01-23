import { useState, useEffect } from 'react';
import axios from 'axios';
import LightingSetupCard from '../components/LightingSetupCard';

const LightingSetupBooking = () => {
  const [lightingSetups, setLightingSetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    type: '',
    power: '',
    coverage: ''
  });

  useEffect(() => {
    fetchLightingSetups();
  }, []);

  const fetchLightingSetups = async () => {
    try {
      setLoading(true);
      
      const queryParams = new URLSearchParams();
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.power) queryParams.append('power', filters.power);
      if (filters.coverage) queryParams.append('coverage', filters.coverage);

      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await axios.get(`http://localhost:5000/api/lighting-setups${queryString}`);
      setLightingSetups(response.data.data);
    } catch (error) {
      console.error('Error fetching lighting setups:', error);
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
    fetchLightingSetups();
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      minPrice: '',
      maxPrice: '',
      type: '',
      power: '',
      coverage: ''
    });
    setTimeout(() => {
      fetchLightingSetups();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-yellow-600 to-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <img 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200"
          alt="Lighting Setup"
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Professional Lighting Setups</h1>
            <p className="text-xl md:text-2xl">Illuminate your events with stunning lighting effects and designs</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 mb-12">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Lighting Setup</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="e.g., Jaipur"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lighting Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Wedding Lighting">Wedding Lighting</option>
                <option value="DJ Lighting">DJ Lighting</option>
                <option value="Concert Lighting">Concert Lighting</option>
                <option value="Corporate Lighting">Corporate Lighting</option>
                <option value="Party Lighting">Party Lighting</option>
                <option value="Basic Lighting">Basic Lighting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Power (Watts)</label>
              <input
                type="number"
                name="power"
                value={filters.power}
                onChange={handleFilterChange}
                placeholder="e.g., 5000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Coverage (sq ft)</label>
              <input
                type="number"
                name="coverage"
                value={filters.coverage}
                onChange={handleFilterChange}
                placeholder="e.g., 2000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="e.g., 10000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="e.g., 50000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={applyFilters}
              className="flex-1 bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {loading ? 'Loading...' : `${lightingSetups.length} Lighting Setups Found`}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-600"></div>
          </div>
        ) : lightingSetups.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lightingSetups.map((lightingSetup) => (
              <LightingSetupCard key={lightingSetup._id} lightingSetup={lightingSetup} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">💡</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Lighting Setups Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
            <button
              onClick={clearFilters}
              className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LightingSetupBooking;

import { useState, useEffect } from 'react';
import axios from 'axios';
import BandBajaCard from '../components/BandBajaCard';
import API_URL from '../config/api';

function BandBajaBooking() {
  const [bandBajas, setBandBajas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    minMembers: '',
    dholPlayers: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    fetchBandBajas();
  }, []);

  const fetchBandBajas = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.minMembers) queryParams.append('minMembers', filters.minMembers);
      if (filters.dholPlayers) queryParams.append('dholPlayers', filters.dholPlayers);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);

      const queryString = queryParams.toString();
      const url = `${API_URL}/band-baja${queryString ? `?${queryString}` : ''}`;
      
      const response = await axios.get(url);
      setBandBajas(response.data.data);
    } catch (error) {
      console.error('Error fetching band bajas:', error);
      setBandBajas([]);
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
    fetchBandBajas();
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      type: '',
      minMembers: '',
      dholPlayers: '',
      minPrice: '',
      maxPrice: ''
    });
    setTimeout(() => {
      fetchBandBajas();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
            opacity: 0.4
          }}
        ></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold mb-4">Professional Band Baja Services</h1>
          <p className="text-xl max-w-2xl">Make your baraat unforgettable with traditional and modern band performances</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-20 mb-12">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Band</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Band Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Traditional Band">Traditional Band</option>
                <option value="Brass Band">Brass Band</option>
                <option value="Modern Band">Modern Band</option>
                <option value="Dhol with Band">Dhol with Band</option>
                <option value="Royal Band">Royal Band</option>
                <option value="Budget Band">Budget Band</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Band Members</label>
              <input
                type="number"
                name="minMembers"
                value={filters.minMembers}
                onChange={handleFilterChange}
                placeholder="e.g., 15"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Dhol Players</label>
              <input
                type="number"
                name="dholPlayers"
                value={filters.dholPlayers}
                onChange={handleFilterChange}
                placeholder="e.g., 2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={applyFilters}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {loading ? 'Loading...' : `${bandBajas.length} Band Baja${bandBajas.length !== 1 ? 's' : ''} Found`}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        ) : bandBajas.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎺</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Band Bajas Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more options</p>
            <button
              onClick={clearFilters}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bandBajas.map((bandBaja) => (
              <BandBajaCard key={bandBaja._id} bandBaja={bandBaja} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BandBajaBooking

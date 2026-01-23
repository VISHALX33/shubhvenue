import { useState, useEffect } from 'react';
import axios from 'axios';
import DholTashaCard from '../components/DholTashaCard';

function DholTashaGroup() {
  const [dholTashas, setDholTashas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    minMembers: '',
    minDholPlayers: '',
    minTashaPlayers: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    fetchDholTashas();
  }, []);

  const fetchDholTashas = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.minMembers) queryParams.append('minMembers', filters.minMembers);
      if (filters.minDholPlayers) queryParams.append('minDholPlayers', filters.minDholPlayers);
      if (filters.minTashaPlayers) queryParams.append('minTashaPlayers', filters.minTashaPlayers);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);

      const queryString = queryParams.toString();
      const url = `http://localhost:5000/api/dhol-tasha${queryString ? `?${queryString}` : ''}`;
      
      const response = await axios.get(url);
      setDholTashas(response.data.data);
    } catch (error) {
      console.error('Error fetching dhol tasha groups:', error);
      setDholTashas([]);
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
    fetchDholTashas();
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      type: '',
      minMembers: '',
      minDholPlayers: '',
      minTashaPlayers: '',
      minPrice: '',
      maxPrice: ''
    });
    setTimeout(() => {
      fetchDholTashas();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-orange-600 to-red-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
            opacity: 0.4
          }}
        ></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold mb-4">Professional Dhol Tasha Groups</h1>
          <p className="text-xl max-w-2xl">Experience the thunderous energy of traditional Maharashtrian dhol-tasha performances</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-20 mb-12">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Dhol Tasha Group</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Enter city"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Group Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Traditional Dhol Tasha">Traditional Dhol Tasha</option>
                <option value="Pathak Style">Pathak Style</option>
                <option value="Modern Fusion">Modern Fusion</option>
                <option value="Competition Group">Competition Group</option>
                <option value="Festival Specialist">Festival Specialist</option>
                <option value="Budget Group">Budget Group</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Group Members</label>
              <input
                type="number"
                name="minMembers"
                value={filters.minMembers}
                onChange={handleFilterChange}
                placeholder="e.g., 30"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Dhol Players</label>
              <input
                type="number"
                name="minDholPlayers"
                value={filters.minDholPlayers}
                onChange={handleFilterChange}
                placeholder="e.g., 15"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Tasha Players</label>
              <input
                type="number"
                name="minTashaPlayers"
                value={filters.minTashaPlayers}
                onChange={handleFilterChange}
                placeholder="e.g., 10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="e.g., 15000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="e.g., 60000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={applyFilters}
              className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
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
          {loading ? 'Loading...' : `${dholTashas.length} Dhol Tasha Group${dholTashas.length !== 1 ? 's' : ''} Found`}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
          </div>
        ) : dholTashas.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🥁</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Dhol Tasha Groups Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more options</p>
            <button
              onClick={clearFilters}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dholTashas.map((dholTasha) => (
              <DholTashaCard key={dholTasha._id} dholTasha={dholTasha} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DholTashaGroup

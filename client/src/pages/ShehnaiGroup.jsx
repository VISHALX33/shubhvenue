import { useState, useEffect } from 'react';
import axios from 'axios';
import ShehnaiCard from '../components/ShehnaiCard';

const ShehnaiGroup = () => {
  const [shehnais, setShehnais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    musicStyle: '',
    minMembers: '',
    minShehnaiPlayers: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    fetchShehnais();
  }, []);

  const fetchShehnais = async (filterParams = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filterParams.city) params.append('city', filterParams.city);
      if (filterParams.type) params.append('type', filterParams.type);
      if (filterParams.musicStyle) params.append('musicStyle', filterParams.musicStyle);
      if (filterParams.minMembers) params.append('minMembers', filterParams.minMembers);
      if (filterParams.minShehnaiPlayers) params.append('minShehnaiPlayers', filterParams.minShehnaiPlayers);
      if (filterParams.minPrice) params.append('minPrice', filterParams.minPrice);
      if (filterParams.maxPrice) params.append('maxPrice', filterParams.maxPrice);

      const response = await axios.get(`http://localhost:5000/api/shehnai?${params.toString()}`);
      setShehnais(response.data.data);
    } catch (error) {
      console.error('Error fetching shehnais:', error);
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
    fetchShehnais(filters);
  };

  const clearFilters = () => {
    const resetFilters = {
      city: '',
      type: '',
      musicStyle: '',
      minMembers: '',
      minShehnaiPlayers: '',
      minPrice: '',
      maxPrice: ''
    };
    setFilters(resetFilters);
    fetchShehnais(resetFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Traditional Shehnai Services</h1>
          <p className="text-xl">Celebrate auspicious moments with soulful shehnai melodies</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Shehnai Group</h2>
          
          {/* Filter Inputs - Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Enter city"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Traditional Shehnai">Traditional Shehnai</option>
                <option value="Wedding Specialist">Wedding Specialist</option>
                <option value="Classical Shehnai">Classical Shehnai</option>
                <option value="Fusion Shehnai">Fusion Shehnai</option>
                <option value="Temple Music">Temple Music</option>
                <option value="Budget Shehnai">Budget Shehnai</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Music Style</label>
              <select
                name="musicStyle"
                value={filters.musicStyle}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Styles</option>
                <option value="Classical">Classical</option>
                <option value="Traditional">Traditional</option>
                <option value="Fusion">Fusion</option>
                <option value="Religious">Religious</option>
                <option value="Contemporary">Contemporary</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min. Group Members</label>
              <input
                type="number"
                name="minMembers"
                value={filters.minMembers}
                onChange={handleFilterChange}
                placeholder="e.g., 5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Inputs - Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min. Shehnai Players</label>
              <input
                type="number"
                name="minShehnaiPlayers"
                value={filters.minShehnaiPlayers}
                onChange={handleFilterChange}
                placeholder="e.g., 2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min. Price (₹)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="e.g., 10000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max. Price (₹)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="e.g., 50000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={applyFilters}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {shehnais.length} Shehnai {shehnais.length === 1 ? 'Group' : 'Groups'} Found
          </h2>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <>
            {/* Shehnai Cards Grid */}
            {shehnais.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shehnais.map((shehnai) => (
                  <ShehnaiCard key={shehnai._id} shehnai={shehnai} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎺</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Shehnai Groups Found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShehnaiGroup;

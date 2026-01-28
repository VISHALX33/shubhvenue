import { useState, useEffect } from 'react';
import axios from 'axios';
import CateringCard from '../components/CateringCard';
import API_URL from '../config/api';

function CateringServices() {
  const [caterings, setCaterings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    minGuests: '',
    cuisine: '',
    servingStyle: ''
  });

  useEffect(() => {
    fetchCaterings();
  }, []);

  const fetchCaterings = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.minGuests) queryParams.append('minGuests', filters.minGuests);
      if (filters.cuisine) queryParams.append('cuisine', filters.cuisine);
      if (filters.servingStyle) queryParams.append('servingStyle', filters.servingStyle);

      const queryString = queryParams.toString();
      const url = `${API_URL}/catering${queryString ? `?${queryString}` : ''}`;
      
      const response = await axios.get(url);
      setCaterings(response.data.data);
    } catch (error) {
      console.error('Error fetching caterings:', error);
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
    fetchCaterings();
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      minGuests: '',
      cuisine: '',
      servingStyle: ''
    });
    setTimeout(() => {
      fetchCaterings();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-orange-600 to-red-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <img 
          src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1200" 
          alt="Catering" 
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Professional Catering Services</h1>
            <p className="text-xl md:text-2xl mb-8">Delicious food for every occasion</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Filter Caterers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="e.g., Jaipur"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Wedding Catering">Wedding Catering</option>
                <option value="Party Catering">Party Catering</option>
                <option value="Corporate Catering">Corporate Catering</option>
                <option value="Birthday Catering">Birthday Catering</option>
                <option value="Festival Catering">Festival Catering</option>
                <option value="Budget Catering">Budget Catering</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
              <select
                name="cuisine"
                value={filters.cuisine}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Cuisines</option>
                <option value="North Indian">North Indian</option>
                <option value="South Indian">South Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Continental">Continental</option>
                <option value="Rajasthani">Rajasthani</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Fast Food">Fast Food</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Serving Style</label>
              <select
                name="servingStyle"
                value={filters.servingStyle}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Styles</option>
                <option value="Buffet">Buffet</option>
                <option value="Plated">Plated</option>
                <option value="Family Style">Family Style</option>
                <option value="Cocktail">Cocktail</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Guests</label>
              <input
                type="number"
                name="minGuests"
                value={filters.minGuests}
                onChange={handleFilterChange}
                placeholder="Minimum capacity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price/Plate (₹)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price/Plate (₹)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={applyFilters}
                className="flex-1 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {caterings.length} Catering Service{caterings.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
          </div>
        ) : caterings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caterings.map((catering) => (
              <CateringCard key={catering._id} catering={catering} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Catering Services Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
            <button
              onClick={clearFilters}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CateringServices;

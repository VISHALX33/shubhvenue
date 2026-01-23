import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BalloonDecoratorCard from '../components/BalloonDecoratorCard';
import { FaBirthdayCake, FaFilter } from 'react-icons/fa';

function BalloonDecorator() {
  const [decorators, setDecorators] = useState([]);
  const [filteredDecorators, setFilteredDecorators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    priceRange: '',
    minInventory: ''
  });

  useEffect(() => {
    fetchDecorators();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [decorators, filters]);

  const fetchDecorators = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/balloon-decorator');
      setDecorators(response.data.data);
    } catch (error) {
      console.error('Error fetching balloon decorators:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...decorators];

    if (filters.city) {
      filtered = filtered.filter(decorator => decorator.location.city === filters.city);
    }

    if (filters.type) {
      filtered = filtered.filter(decorator => decorator.type === filters.type);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(decorator => {
        const prices = decorator.packages.map(pkg => pkg.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        switch (filters.priceRange) {
          case 'under-10000':
            return minPrice < 10000;
          case '10000-25000':
            return maxPrice >= 10000 && minPrice <= 25000;
          case '25000-50000':
            return maxPrice >= 25000 && minPrice <= 50000;
          case 'above-50000':
            return maxPrice > 50000;
          default:
            return true;
        }
      });
    }

    if (filters.minInventory) {
      filtered = filtered.filter(decorator => decorator.inventorySize >= parseInt(filters.minInventory));
    }

    setFilteredDecorators(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      type: '',
      priceRange: '',
      minInventory: ''
    });
  };

  const cities = [...new Set(decorators.map(d => d.location.city))];
  const types = ['Birthday Decorations', 'Wedding Decorations', 'Corporate Events', 'Baby Shower', 'Anniversary Decorations', 'Theme Parties'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <FaBirthdayCake className="text-6xl mr-4" />
            <h1 className="text-5xl font-bold">Balloon Decorators</h1>
          </div>
          <p className="text-center text-xl opacity-90 max-w-2xl mx-auto">
            Create magical moments with stunning balloon decorations
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaFilter className="text-purple-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Filter Decorators</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Decoration Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Prices</option>
                <option value="under-10000">Under ₹10,000</option>
                <option value="10000-25000">₹10,000 - ₹25,000</option>
                <option value="25000-50000">₹25,000 - ₹50,000</option>
                <option value="above-50000">Above ₹50,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Inventory</label>
              <select
                value={filters.minInventory}
                onChange={(e) => handleFilterChange('minInventory', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Any Size</option>
                <option value="100">100+ items</option>
                <option value="200">200+ items</option>
                <option value="500">500+ items</option>
              </select>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="mt-4 text-purple-600 hover:text-purple-700 font-semibold"
          >
            Clear all filters
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* Decorators Grid */}
        {!loading && filteredDecorators.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredDecorators.length} Balloon Decorator{filteredDecorators.length !== 1 ? 's' : ''} Found
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDecorators.map(decorator => (
                <BalloonDecoratorCard key={decorator._id} decorator={decorator} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredDecorators.length === 0 && (
          <div className="text-center py-20">
            <FaBirthdayCake className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Balloon Decorators Found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BalloonDecorator

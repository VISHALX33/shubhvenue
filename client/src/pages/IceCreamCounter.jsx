import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IceCreamCounterCard from '../components/IceCreamCounterCard';
import { FaIceCream } from 'react-icons/fa';

function IceCreamCounter() {
  const [counters, setCounters] = useState([]);
  const [filteredCounters, setFilteredCounters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    priceRange: '',
    minFlavors: '',
  });

  useEffect(() => {
    fetchCounters();
  }, []);

  const fetchCounters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ice-cream-counter');
      setCounters(response.data.data);
      setFilteredCounters(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ice cream counters:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, counters]);

  const applyFilters = () => {
    let filtered = [...counters];

    if (filters.city) {
      filtered = filtered.filter((counter) => counter.location.city === filters.city);
    }

    if (filters.type) {
      filtered = filtered.filter((counter) => counter.type === filters.type);
    }

    if (filters.priceRange) {
      filtered = filtered.filter((counter) => {
        const prices = counter.packages.map((pkg) => pkg.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        switch (filters.priceRange) {
          case 'under3000':
            return minPrice < 3000;
          case '3000-8000':
            return maxPrice >= 3000 && minPrice <= 8000;
          case '8000-15000':
            return maxPrice >= 8000 && minPrice <= 15000;
          case 'above15000':
            return maxPrice > 15000;
          default:
            return true;
        }
      });
    }

    if (filters.minFlavors) {
      filtered = filtered.filter((counter) => counter.flavorsAvailable >= Number(filters.minFlavors));
    }

    setFilteredCounters(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      type: '',
      priceRange: '',
      minFlavors: '',
    });
  };

  const cities = [...new Set(counters.map((counter) => counter.location.city))];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-2xl p-12 mb-8 text-center">
          <FaIceCream className="text-6xl text-white mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-white mb-4">Ice Cream Counter</h1>
          <p className="text-xl text-white/90">Delicious ice cream counters for your events</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Counter Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Traditional Ice Cream">Traditional Ice Cream</option>
                <option value="Gelato Counter">Gelato Counter</option>
                <option value="Soft Serve">Soft Serve</option>
                <option value="Sugar-Free Options">Sugar-Free Options</option>
                <option value="Vegan Ice Cream">Vegan Ice Cream</option>
                <option value="Premium Artisan">Premium Artisan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">All Prices</option>
                <option value="under3000">Under ₹3,000</option>
                <option value="3000-8000">₹3,000 - ₹8,000</option>
                <option value="8000-15000">₹8,000 - ₹15,000</option>
                <option value="above15000">Above ₹15,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Flavors</label>
              <select
                value={filters.minFlavors}
                onChange={(e) => handleFilterChange('minFlavors', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Any Amount</option>
                <option value="10">10+ flavors</option>
                <option value="20">20+ flavors</option>
                <option value="30">30+ flavors</option>
              </select>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
          >
            Clear all filters
          </button>
        </div>

        {/* Results */}
        {filteredCounters.length === 0 ? (
          <div className="text-center py-12">
            <FaIceCream className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No ice cream counters found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-800">{filteredCounters.length}</span> ice cream counters
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCounters.map((counter) => (
                <IceCreamCounterCard key={counter._id} counter={counter} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default IceCreamCounter;

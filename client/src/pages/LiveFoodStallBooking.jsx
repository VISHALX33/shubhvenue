import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LiveFoodStallCard from '../components/LiveFoodStallCard';
import { FaUtensils, FaFilter } from 'react-icons/fa';

function LiveFoodStallBooking() {
  const [stalls, setStalls] = useState([]);
  const [filteredStalls, setFilteredStalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    priceRange: '',
    minDishes: '',
  });

  useEffect(() => {
    fetchStalls();
  }, []);

  const fetchStalls = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/live-food-stall');
      setStalls(response.data.data);
      setFilteredStalls(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching live food stalls:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    filterStalls();
  }, [filters, stalls]);

  const filterStalls = () => {
    let filtered = [...stalls];

    if (filters.city) {
      filtered = filtered.filter((stall) => stall.location.city === filters.city);
    }

    if (filters.type) {
      filtered = filtered.filter((stall) => stall.type === filters.type);
    }

    if (filters.priceRange) {
      filtered = filtered.filter((stall) => {
        const minPrice = Math.min(...stall.packages.map((pkg) => pkg.price));
        switch (filters.priceRange) {
          case 'under5k':
            return minPrice < 5000;
          case '5k-15k':
            return minPrice >= 5000 && minPrice <= 15000;
          case '15k-30k':
            return minPrice > 15000 && minPrice <= 30000;
          case 'above30k':
            return minPrice > 30000;
          default:
            return true;
        }
      });
    }

    if (filters.minDishes) {
      filtered = filtered.filter(
        (stall) => stall.dishesAvailable >= Number(filters.minDishes)
      );
    }

    setFilteredStalls(filtered);
  };

  const cities = [...new Set(stalls.map((stall) => stall.location.city))];
  const types = [
    'Chaat Counter',
    'Dosa & Idli Station',
    'Pav Bhaji Stall',
    'Pasta & Noodles Counter',
    'Pizza Station',
    'Sandwich & Burger Corner',
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FaUtensils className="text-6xl text-orange-600 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Live Food Stall Booking
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book live food stalls for your events with delicious freshly prepared dishes
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaFilter className="text-orange-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stall Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Prices</option>
                <option value="under5k">Under ₹5,000</option>
                <option value="5k-15k">₹5,000 - ₹15,000</option>
                <option value="15k-30k">₹15,000 - ₹30,000</option>
                <option value="above30k">Above ₹30,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Dishes</label>
              <select
                value={filters.minDishes}
                onChange={(e) => setFilters({ ...filters, minDishes: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="10">10+ Dishes</option>
                <option value="20">20+ Dishes</option>
                <option value="30">30+ Dishes</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-orange-600">{filteredStalls.length}</span> of{' '}
              <span className="font-semibold">{stalls.length}</span> live food stalls
            </p>
            <button
              onClick={() =>
                setFilters({ city: '', type: '', priceRange: '', minDishes: '' })
              }
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-all"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Stalls Grid */}
        {filteredStalls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStalls.map((stall) => (
              <LiveFoodStallCard key={stall._id} stall={stall} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaUtensils className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No live food stalls found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more options</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveFoodStallBooking;

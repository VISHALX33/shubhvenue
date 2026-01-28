import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JuiceCounterCard from '../components/JuiceCounterCard';
import { FaGlassWhiskey, FaFilter } from 'react-icons/fa';
import API_URL from '../config/api';

function JuiceCounterBooking() {
  const [counters, setCounters] = useState([]);
  const [filteredCounters, setFilteredCounters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    priceRange: '',
    minJuices: '',
  });

  useEffect(() => {
    fetchCounters();
  }, []);

  const fetchCounters = async () => {
    try {
      const response = await axios.get(`${API_URL}/juice-counter`);
      setCounters(response.data.data);
      setFilteredCounters(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching juice counters:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    filterCounters();
  }, [filters, counters]);

  const filterCounters = () => {
    let filtered = [...counters];

    if (filters.city) {
      filtered = filtered.filter((counter) => counter.location.city === filters.city);
    }

    if (filters.type) {
      filtered = filtered.filter((counter) => counter.type === filters.type);
    }

    if (filters.priceRange) {
      filtered = filtered.filter((counter) => {
        const minPrice = Math.min(...counter.packages.map((pkg) => pkg.price));
        switch (filters.priceRange) {
          case 'under3k':
            return minPrice < 3000;
          case '3k-8k':
            return minPrice >= 3000 && minPrice <= 8000;
          case '8k-15k':
            return minPrice > 8000 && minPrice <= 15000;
          case 'above15k':
            return minPrice > 15000;
          default:
            return true;
        }
      });
    }

    if (filters.minJuices) {
      filtered = filtered.filter(
        (counter) => counter.juicesAvailable >= Number(filters.minJuices)
      );
    }

    setFilteredCounters(filtered);
  };

  const cities = [...new Set(counters.map((counter) => counter.location.city))];
  const types = [
    'Fresh Juice Bar',
    'Smoothie Counter',
    'Detox Juice Station',
    'Seasonal Fruit Juices',
    'Premium Cold Press',
    'Mocktail Counter',
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FaGlassWhiskey className="text-6xl text-green-600 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
              Juice Counter Booking
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book fresh juice counters for your events with a variety of flavors
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaFilter className="text-green-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Prices</option>
                <option value="under3k">Under ₹3,000</option>
                <option value="3k-8k">₹3,000 - ₹8,000</option>
                <option value="8k-15k">₹8,000 - ₹15,000</option>
                <option value="above15k">Above ₹15,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Juices</label>
              <select
                value={filters.minJuices}
                onChange={(e) => setFilters({ ...filters, minJuices: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="10">10+ Juices</option>
                <option value="20">20+ Juices</option>
                <option value="30">30+ Juices</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-green-600">{filteredCounters.length}</span> of{' '}
              <span className="font-semibold">{counters.length}</span> juice counters
            </p>
            <button
              onClick={() =>
                setFilters({ city: '', type: '', priceRange: '', minJuices: '' })
              }
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-all"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Counters Grid */}
        {filteredCounters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCounters.map((counter) => (
              <JuiceCounterCard key={counter._id} counter={counter} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaGlassWhiskey className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No juice counters found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more options</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JuiceCounterBooking;

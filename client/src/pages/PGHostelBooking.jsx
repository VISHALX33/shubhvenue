import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PGHostelBookingCard from '../components/PGHostelBookingCard';
import API_URL from '../config/api';

function PGHostelBooking() {
  const [pgHostels, setPGHostels] = useState([]);
  const [filteredPGHostels, setFilteredPGHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    gender: '',
    food: '',
    roomType: '',
    priceRange: ''
  });

  useEffect(() => {
    fetchPGHostels();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, pgHostels]);

  const fetchPGHostels = async () => {
    try {
      const response = await axios.get(`${API_URL}/pg-hostel`);
      setPGHostels(response.data);
      setFilteredPGHostels(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching PG/Hostels:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...pgHostels];

    if (filters.city) {
      filtered = filtered.filter(pg => pg.location.city === filters.city);
    }

    if (filters.type) {
      filtered = filtered.filter(pg => pg.type === filters.type);
    }

    if (filters.gender) {
      filtered = filtered.filter(pg => pg.gender === filters.gender);
    }

    if (filters.food) {
      filtered = filtered.filter(pg => pg.food === filters.food);
    }

    if (filters.roomType) {
      filtered = filtered.filter(pg => pg.roomTypes.includes(filters.roomType));
    }

    if (filters.priceRange) {
      filtered = filtered.filter(pg => {
        const minPrice = Math.min(...pg.packages.map(pkg => pkg.price));
        switch (filters.priceRange) {
          case 'under5000':
            return minPrice < 5000;
          case '5000-10000':
            return minPrice >= 5000 && minPrice <= 10000;
          case '10000-20000':
            return minPrice >= 10000 && minPrice <= 20000;
          case 'above20000':
            return minPrice > 20000;
          default:
            return true;
        }
      });
    }

    setFilteredPGHostels(filtered);
  };

  const resetFilters = () => {
    setFilters({
      city: '',
      type: '',
      gender: '',
      food: '',
      roomType: '',
      priceRange: ''
    });
  };

  const uniqueCities = [...new Set(pgHostels.map(pg => pg.location.city))];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
            PG / Hostel Booking
          </h1>
          <p className="text-gray-600 text-lg">
            Find comfortable and affordable PG accommodations and hostels
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              >
                <option value="">All Cities</option>
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                PG/Hostel Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Boys PG">Boys PG</option>
                <option value="Girls PG">Girls PG</option>
                <option value="Co-living Space">Co-living Space</option>
                <option value="Private Hostel">Private Hostel</option>
                <option value="Shared Hostel">Shared Hostel</option>
                <option value="Studio PG">Studio PG</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={filters.gender}
                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="Boys Only">Boys Only</option>
                <option value="Girls Only">Girls Only</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            {/* Food Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Food
              </label>
              <select
                value={filters.food}
                onChange={(e) => setFilters({ ...filters, food: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
                <option value="Optional">Optional</option>
              </select>
            </div>

            {/* Room Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Room Type
              </label>
              <select
                value={filters.roomType}
                onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              >
                <option value="">All Room Types</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
                <option value="Dormitory">Dormitory</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              >
                <option value="">All Prices</option>
                <option value="under5000">Under ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-20000">₹10,000 - ₹20,000</option>
                <option value="above20000">Above ₹20,000</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredPGHostels.length} of {pgHostels.length} PG/Hostels
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* PG/Hostels Grid */}
        {filteredPGHostels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPGHostels.map((pg) => (
              <PGHostelBookingCard key={pg._id} pg={pg} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No PG/Hostels found matching your criteria</p>
            <button
              onClick={resetFilters}
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PGHostelBooking;

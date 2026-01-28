import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlatBookingCard from '../components/FlatBookingCard';
import { FaHome, FaFilter } from 'react-icons/fa';
import API_URL from '../config/api';

function FlatBooking() {
  const [flats, setFlats] = useState([]);
  const [filteredFlats, setFilteredFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    priceRange: '',
    minBedrooms: '',
    furnishedStatus: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchFlats();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [flats, filters]);

  const fetchFlats = async () => {
    try {
      const response = await axios.get(`${API_URL}/flat-booking`);
      setFlats(response.data);
      setFilteredFlats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching flats:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...flats];

    // City filter
    if (filters.city) {
      filtered = filtered.filter(flat => flat.location.city === filters.city);
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(flat => flat.type === filters.type);
    }

    // Furnished status filter
    if (filters.furnishedStatus) {
      filtered = filtered.filter(flat => flat.furnishedStatus === filters.furnishedStatus);
    }

    // Bedrooms filter
    if (filters.minBedrooms) {
      filtered = filtered.filter(flat => flat.bedrooms >= parseInt(filters.minBedrooms));
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(flat => {
        const minPrice = Math.min(...flat.packages.map(pkg => pkg.price));
        switch (filters.priceRange) {
          case 'under10000':
            return minPrice < 10000;
          case '10000-25000':
            return minPrice >= 10000 && minPrice <= 25000;
          case '25000-50000':
            return minPrice >= 25000 && minPrice <= 50000;
          case 'above50000':
            return minPrice > 50000;
          default:
            return true;
        }
      });
    }

    setFilteredFlats(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const resetFilters = () => {
    setFilters({
      city: '',
      type: '',
      priceRange: '',
      minBedrooms: '',
      furnishedStatus: ''
    });
  };

  const cities = [...new Set(flats.map(flat => flat.location.city))];
  const flatTypes = ['Studio Apartment', '1BHK', '2BHK', '3BHK', '4BHK', 'Penthouse'];
  const furnishedStatuses = ['Fully Furnished', 'Semi Furnished', 'Unfurnished'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaHome className="text-5xl text-teal-600 mr-4" />
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Flat Booking</h1>
                <p className="text-gray-600">Find your perfect temporary home for events and stays</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-teal-600">{filteredFlats.length}</p>
              <p className="text-gray-600">Flats Available</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-teal-600 font-semibold mb-4 lg:hidden"
          >
            <FaFilter className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* City Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Flat Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {flatTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Furnished Status Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Furnished</label>
                <select
                  value={filters.furnishedStatus}
                  onChange={(e) => handleFilterChange('furnishedStatus', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  {furnishedStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Bedrooms Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Min Bedrooms</label>
                <select
                  value={filters.minBedrooms}
                  onChange={(e) => handleFilterChange('minBedrooms', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="1">1+ Bedroom</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">All Prices</option>
                  <option value="under10000">Under ₹10,000</option>
                  <option value="10000-25000">₹10,000 - ₹25,000</option>
                  <option value="25000-50000">₹25,000 - ₹50,000</option>
                  <option value="above50000">Above ₹50,000</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Flats Grid */}
        {filteredFlats.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FaHome className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No flats found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters</p>
            <button
              onClick={resetFilters}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFlats.map(flat => (
              <FlatBookingCard key={flat._id} flat={flat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FlatBooking;

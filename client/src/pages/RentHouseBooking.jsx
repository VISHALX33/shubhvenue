import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RentHouseCard from '../components/RentHouseCard';
import { FaHome, FaFilter } from 'react-icons/fa';

function RentHouseBooking() {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    priceRange: '',
    minBedrooms: '',
    minCapacity: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchHouses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [houses, filters]);

  const fetchHouses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rent-house');
      setHouses(response.data);
      setFilteredHouses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching houses:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...houses];

    // City filter
    if (filters.city) {
      filtered = filtered.filter(house => house.location.city === filters.city);
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(house => house.type === filters.type);
    }

    // Bedrooms filter
    if (filters.minBedrooms) {
      filtered = filtered.filter(house => house.bedrooms >= parseInt(filters.minBedrooms));
    }

    // Capacity filter
    if (filters.minCapacity) {
      filtered = filtered.filter(house => house.capacity >= parseInt(filters.minCapacity));
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(house => {
        const minPrice = Math.min(...house.packages.map(pkg => pkg.price));
        switch (filters.priceRange) {
          case 'under20000':
            return minPrice < 20000;
          case '20000-50000':
            return minPrice >= 20000 && minPrice <= 50000;
          case '50000-100000':
            return minPrice >= 50000 && minPrice <= 100000;
          case 'above100000':
            return minPrice > 100000;
          default:
            return true;
        }
      });
    }

    setFilteredHouses(filtered);
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
      minCapacity: ''
    });
  };

  const cities = [...new Set(houses.map(house => house.location.city))];
  const houseTypes = ['Cottage', 'Villa', 'Bungalow', 'Mansion', 'Beach House', 'Farmhouse'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaHome className="text-5xl text-indigo-600 mr-4" />
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Rent House Booking</h1>
                <p className="text-gray-600">Find the perfect house for your event or celebration</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-indigo-600">{filteredHouses.length}</p>
              <p className="text-gray-600">Houses Available</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-indigo-600 font-semibold mb-4 lg:hidden"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">House Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {houseTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Bedrooms Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Min Bedrooms</label>
                <select
                  value={filters.minBedrooms}
                  onChange={(e) => handleFilterChange('minBedrooms', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
              </div>

              {/* Capacity Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Min Capacity</label>
                <select
                  value={filters.minCapacity}
                  onChange={(e) => handleFilterChange('minCapacity', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="10">10+ Guests</option>
                  <option value="20">20+ Guests</option>
                  <option value="30">30+ Guests</option>
                  <option value="50">50+ Guests</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">All Prices</option>
                  <option value="under20000">Under ₹20,000</option>
                  <option value="20000-50000">₹20,000 - ₹50,000</option>
                  <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                  <option value="above100000">Above ₹1,00,000</option>
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

        {/* Houses Grid */}
        {filteredHouses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FaHome className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No houses found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters</p>
            <button
              onClick={resetFilters}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHouses.map(house => (
              <RentHouseCard key={house._id} house={house} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RentHouseBooking;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarRentalWeddingCard from '../components/CarRentalWeddingCard';
import { FaCar, FaFilter } from 'react-icons/fa';

function CarRentalWedding() {
  const [carRentals, setCarRentals] = useState([]);
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    priceRange: '',
    minFleetSize: ''
  });

  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Kolkata', 'Ahmedabad'];
  const carTypes = [
    'Luxury Cars',
    'Vintage Cars',
    'Sports Cars',
    'SUV & Premium',
    'Decorated Cars',
    'Budget Cars'
  ];
  const priceRanges = [
    { label: 'Under ₹20,000', min: 0, max: 20000 },
    { label: '₹20,000 - ₹50,000', min: 20000, max: 50000 },
    { label: '₹50,000 - ₹100,000', min: 50000, max: 100000 },
    { label: 'Above ₹100,000', min: 100000, max: 1000000 }
  ];
  const fleetSizes = [
    { label: '10+ Cars', value: 10 },
    { label: '20+ Cars', value: 20 },
    { label: '30+ Cars', value: 30 }
  ];

  useEffect(() => {
    fetchCarRentals();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, carRentals]);

  const fetchCarRentals = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/car-rental-wedding');
      setCarRentals(response.data.data);
      setFilteredRentals(response.data.data);
    } catch (error) {
      console.error('Error fetching car rentals:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...carRentals];

    // Filter by city
    if (filters.city) {
      filtered = filtered.filter(rental => rental.location.city === filters.city);
    }

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter(rental => rental.type === filters.type);
    }

    // Filter by price range
    if (filters.priceRange) {
      const range = priceRanges.find(r => r.label === filters.priceRange);
      if (range) {
        filtered = filtered.filter(rental => {
          const minPrice = Math.min(...rental.packages.map(pkg => pkg.price));
          return minPrice >= range.min && minPrice <= range.max;
        });
      }
    }

    // Filter by fleet size
    if (filters.minFleetSize) {
      filtered = filtered.filter(rental => rental.fleetSize >= parseInt(filters.minFleetSize));
    }

    setFilteredRentals(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      type: '',
      priceRange: '',
      minFleetSize: ''
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <FaCar className="text-5xl mr-4" />
            <h1 className="text-5xl font-bold">Car Rental for Wedding</h1>
          </div>
          <p className="text-center text-xl text-blue-100 max-w-2xl mx-auto">
            Arrive in style with our premium wedding car collection
          </p>
          <div className="mt-6 text-center">
            <p className="text-blue-100">Showing {filteredRentals.length} of {carRentals.length} car rental services</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FaFilter className="mr-2 text-blue-600" />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Clear All
                </button>
              </div>

              {/* City Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  City
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Car Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Car Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {carTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Prices</option>
                  {priceRanges.map((range) => (
                    <option key={range.label} value={range.label}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fleet Size Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Minimum Fleet Size
                </label>
                <select
                  value={filters.minFleetSize}
                  onChange={(e) => handleFilterChange('minFleetSize', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Size</option>
                  {fleetSizes.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Car Rentals Grid */}
          <div className="lg:w-3/4">
            {filteredRentals.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <FaCar className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No car rentals found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to see more options</p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRentals.map((rental) => (
                  <CarRentalWeddingCard key={rental._id} rental={rental} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarRentalWedding

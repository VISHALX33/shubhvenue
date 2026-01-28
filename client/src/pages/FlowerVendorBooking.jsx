import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlowerVendorCard from '../components/FlowerVendorCard';
import { FaLeaf, FaFilter } from 'react-icons/fa';
import API_URL from '../config/api';

function FlowerVendorBooking() {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    priceRange: '',
    minInventory: ''
  });

  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Kolkata', 'Ahmedabad'];
  const flowerTypes = [
    'Fresh Flowers',
    'Artificial Flowers',
    'Exotic Flowers',
    'Seasonal Flowers',
    'Decorative Plants',
    'Flower Arrangements'
  ];
  const priceRanges = [
    { label: 'Under ₹10,000', min: 0, max: 10000 },
    { label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
    { label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
    { label: 'Above ₹50,000', min: 50000, max: 1000000 }
  ];
  const inventorySizes = [
    { label: '100+ Items', value: 100 },
    { label: '200+ Items', value: 200 },
    { label: '500+ Items', value: 500 }
  ];

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, vendors]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/flower-vendor`);
      setVendors(response.data.data);
      setFilteredVendors(response.data.data);
    } catch (error) {
      console.error('Error fetching flower vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...vendors];

    if (filters.city) {
      filtered = filtered.filter(vendor => vendor.location.city === filters.city);
    }

    if (filters.type) {
      filtered = filtered.filter(vendor => vendor.type === filters.type);
    }

    if (filters.priceRange) {
      const range = priceRanges.find(r => r.label === filters.priceRange);
      if (range) {
        filtered = filtered.filter(vendor => {
          const minPrice = Math.min(...vendor.packages.map(pkg => pkg.price));
          return minPrice >= range.min && minPrice <= range.max;
        });
      }
    }

    if (filters.minInventory) {
      filtered = filtered.filter(vendor => vendor.inventorySize >= parseInt(filters.minInventory));
    }

    setFilteredVendors(filtered);
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
      minInventory: ''
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <FaLeaf className="text-5xl mr-4" />
            <h1 className="text-5xl font-bold">Flower Vendor Booking</h1>
          </div>
          <p className="text-center text-xl text-pink-100 max-w-2xl mx-auto">
            Beautiful flowers for your special events
          </p>
          <div className="mt-6 text-center">
            <p className="text-pink-100">Showing {filteredVendors.length} of {vendors.length} flower vendors</p>
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
                  <FaFilter className="mr-2 text-pink-600" />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-pink-600 hover:text-pink-700 font-semibold"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Flower Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Flower Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {flowerTypes.map((type) => (
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">All Prices</option>
                  {priceRanges.map((range) => (
                    <option key={range.label} value={range.label}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Inventory Size Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Minimum Inventory
                </label>
                <select
                  value={filters.minInventory}
                  onChange={(e) => handleFilterChange('minInventory', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Any Size</option>
                  {inventorySizes.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Vendors Grid */}
          <div className="lg:w-3/4">
            {filteredVendors.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <FaLeaf className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No flower vendors found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to see more options</p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVendors.map((vendor) => (
                  <FlowerVendorCard key={vendor._id} vendor={vendor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlowerVendorBooking

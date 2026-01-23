import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SweetShopOrderCard from '../components/SweetShopOrderCard';
import { FaCandyCane } from 'react-icons/fa';

function SweetShopOrders() {
  const [sweetShops, setSweetShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    priceRange: '',
    minItems: '',
  });

  useEffect(() => {
    fetchSweetShops();
  }, []);

  const fetchSweetShops = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sweet-shop-orders');
      setSweetShops(response.data.data);
      setFilteredShops(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sweet shops:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, sweetShops]);

  const applyFilters = () => {
    let filtered = [...sweetShops];

    if (filters.city) {
      filtered = filtered.filter((shop) => shop.location.city === filters.city);
    }

    if (filters.type) {
      filtered = filtered.filter((shop) => shop.type === filters.type);
    }

    if (filters.priceRange) {
      filtered = filtered.filter((shop) => {
        const prices = shop.packages.map((pkg) => pkg.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        switch (filters.priceRange) {
          case 'under5000':
            return minPrice < 5000;
          case '5000-15000':
            return maxPrice >= 5000 && minPrice <= 15000;
          case '15000-30000':
            return maxPrice >= 15000 && minPrice <= 30000;
          case 'above30000':
            return maxPrice > 30000;
          default:
            return true;
        }
      });
    }

    if (filters.minItems) {
      filtered = filtered.filter((shop) => shop.itemsAvailable >= Number(filters.minItems));
    }

    setFilteredShops(filtered);
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
      minItems: '',
    });
  };

  const cities = [...new Set(sweetShops.map((shop) => shop.location.city))];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl shadow-2xl p-12 mb-8 text-center">
          <FaCandyCane className="text-6xl text-white mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-white mb-4">Sweet Shop Orders</h1>
          <p className="text-xl text-white/90">Order delicious sweets for your special occasions</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sweet Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Traditional Sweets">Traditional Sweets</option>
                <option value="Modern Desserts">Modern Desserts</option>
                <option value="Sugar-Free Options">Sugar-Free Options</option>
                <option value="Festival Specials">Festival Specials</option>
                <option value="Wedding Sweets">Wedding Sweets</option>
                <option value="Corporate Gifts">Corporate Gifts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">All Prices</option>
                <option value="under5000">Under ₹5,000</option>
                <option value="5000-15000">₹5,000 - ₹15,000</option>
                <option value="15000-30000">₹15,000 - ₹30,000</option>
                <option value="above30000">Above ₹30,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Items</label>
              <select
                value={filters.minItems}
                onChange={(e) => handleFilterChange('minItems', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">Any Amount</option>
                <option value="50">50+ items</option>
                <option value="100">100+ items</option>
                <option value="200">200+ items</option>
              </select>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="text-pink-600 hover:text-pink-700 font-semibold transition-colors"
          >
            Clear all filters
          </button>
        </div>

        {/* Results */}
        {filteredShops.length === 0 ? (
          <div className="text-center py-12">
            <FaCandyCane className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No sweet shops found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-rose-700 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-800">{filteredShops.length}</span> sweet shops
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredShops.map((shop) => (
                <SweetShopOrderCard key={shop._id} sweetShop={shop} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SweetShopOrders;

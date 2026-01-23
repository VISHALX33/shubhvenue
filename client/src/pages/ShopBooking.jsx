import { useState, useEffect } from 'react'
import axios from 'axios'
import ShopBookingCard from '../components/ShopBookingCard'
import { FaStore, FaFilter } from 'react-icons/fa'

function ShopBooking() {
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    furnished: '',
    parking: '',
    priceRange: '',
    areaRange: ''
  })

  const shopTypes = [
    'Retail Shop',
    'Commercial Space',
    'Showroom',
    'Kiosk',
    'Food Court Space',
    'Office Shop'
  ]

  const furnishedOptions = ['Fully Furnished', 'Semi Furnished', 'Unfurnished']
  const parkingOptions = ['Available', 'Not Available', 'Paid Parking']
  const priceRanges = [
    { label: 'Under ₹10k', value: 'under-10k', min: 0, max: 10000 },
    { label: '₹10k - ₹30k', value: '10k-30k', min: 10000, max: 30000 },
    { label: '₹30k - ₹50k', value: '30k-50k', min: 30000, max: 50000 },
    { label: 'Above ₹50k', value: 'above-50k', min: 50000, max: Infinity }
  ]
  const areaRanges = [
    { label: 'Under 500 sq ft', value: 'under-500', min: 0, max: 500 },
    { label: '500 - 1000 sq ft', value: '500-1000', min: 500, max: 1000 },
    { label: '1000 - 2000 sq ft', value: '1000-2000', min: 1000, max: 2000 },
    { label: '2000 - 5000 sq ft', value: '2000-5000', min: 2000, max: 5000 },
    { label: 'Above 5000 sq ft', value: 'above-5000', min: 5000, max: Infinity }
  ]

  const [cities, setCities] = useState([])

  useEffect(() => {
    fetchShops()
  }, [filters])

  const fetchShops = async () => {
    try {
      setLoading(true)
      const params = {}
      
      if (filters.city) params.city = filters.city
      if (filters.type) params.type = filters.type
      if (filters.furnished) params.furnished = filters.furnished
      if (filters.parking) params.parking = filters.parking
      
      if (filters.priceRange) {
        const range = priceRanges.find(r => r.value === filters.priceRange)
        if (range) {
          params.minPrice = range.min
          if (range.max !== Infinity) params.maxPrice = range.max
        }
      }
      
      if (filters.areaRange) {
        const range = areaRanges.find(r => r.value === filters.areaRange)
        if (range) {
          params.minArea = range.min
          if (range.max !== Infinity) params.maxArea = range.max
        }
      }

      const response = await axios.get('http://localhost:5000/api/shop', { params })
      setShops(response.data)
      
      // Extract unique cities
      const uniqueCities = [...new Set(response.data.map(shop => shop.location.city))]
      setCities(uniqueCities)
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching shops:', error)
      setLoading(false)
    }
  }

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      city: '',
      type: '',
      furnished: '',
      parking: '',
      priceRange: '',
      areaRange: ''
    })
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <FaStore className="text-4xl text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Shop Booking</h1>
                <p className="text-amber-100 text-lg">Find the perfect commercial space for your business</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="text-white text-center">
                <p className="text-3xl font-bold">{shops.length}</p>
                <p className="text-amber-100">Available Shops</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FaFilter className="text-amber-600 text-xl" />
              <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
              {activeFilterCount > 0 && (
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {activeFilterCount} active
                </span>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
              >
                Reset All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* City Filter */}
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
            >
              <option value="">All Types</option>
              {shopTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Furnished Filter */}
            <select
              value={filters.furnished}
              onChange={(e) => handleFilterChange('furnished', e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
            >
              <option value="">Any Furnishing</option>
              {furnishedOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            {/* Parking Filter */}
            <select
              value={filters.parking}
              onChange={(e) => handleFilterChange('parking', e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
            >
              <option value="">Any Parking</option>
              {parkingOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            {/* Area Range Filter */}
            <select
              value={filters.areaRange}
              onChange={(e) => handleFilterChange('areaRange', e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
            >
              <option value="">All Areas</option>
              {areaRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>

            {/* Price Range Filter */}
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
            >
              <option value="">All Prices</option>
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-600"></div>
          </div>
        ) : shops.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FaStore className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No shops found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-700 text-lg">
                Showing <span className="font-bold text-amber-600">{shops.length}</span> {shops.length === 1 ? 'shop' : 'shops'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map(shop => (
                <ShopBookingCard key={shop._id} shop={shop} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ShopBooking

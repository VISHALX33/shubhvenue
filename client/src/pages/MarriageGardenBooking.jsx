import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MarriageGardenCard from '../components/MarriageGardenCard'

function MarriageGardenBooking() {
  const navigate = useNavigate()
  const [marriageGardens, setMarriageGardens] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    city: 'all',
    priceRange: 'all',
    capacity: 'all'
  })

  // Fetch all marriage gardens
  useEffect(() => {
    const fetchMarriageGardens = async () => {
      try {
        const response = await axios.get('/api/marriage-gardens')
        setMarriageGardens(response.data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching marriage gardens:', error)
        setLoading(false)
      }
    }
    
    fetchMarriageGardens()
  }, [])

  // Filter gardens based on selected filters
  const filteredGardens = marriageGardens.filter(garden => {
    // City filter
    if (filters.city !== 'all' && garden.location.city !== filters.city) {
      return false
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const price = garden.price?.perDay || 0
      if (filters.priceRange === 'budget' && price > 100000) return false
      if (filters.priceRange === 'medium' && (price <= 100000 || price > 150000)) return false
      if (filters.priceRange === 'premium' && price <= 150000) return false
    }

    // Capacity filter
    if (filters.capacity !== 'all') {
      const maxCapacity = garden.capacity?.max || 0
      if (filters.capacity === 'small' && maxCapacity > 500) return false
      if (filters.capacity === 'medium' && (maxCapacity <= 500 || maxCapacity > 1000)) return false
      if (filters.capacity === 'large' && maxCapacity <= 1000) return false
    }

    return true
  })

  // Get unique cities for filter dropdown
  const cities = ['all', ...new Set(marriageGardens.map(g => g.location.city))]

  const handleViewDetails = (garden) => {
    navigate(`/venue-hall/marriage-garden/${garden._id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f29da8855c?w=1600)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Marriage Gardens
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6">
              Discover Beautiful Garden Venues for Your Perfect Wedding Day
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full text-white">
                <span className="font-semibold">{marriageGardens.length}+</span> Venues Available
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full text-white">
                <span className="font-semibold">{cities.length - 1}</span> Cities Covered
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Find Your Perfect Venue</h3>
            <button
              onClick={() => setFilters({ city: 'all', priceRange: 'all', capacity: 'all' })}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Clear All Filters
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city === 'all' ? 'All Cities' : city}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Prices</option>
                <option value="budget">Budget (Under ₹1 Lakh)</option>
                <option value="medium">Medium (₹1-1.5 Lakh)</option>
                <option value="premium">Premium (Above ₹1.5 Lakh)</option>
              </select>
            </div>

            {/* Capacity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
              <select
                value={filters.capacity}
                onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Capacities</option>
                <option value="small">Small (Up to 500)</option>
                <option value="medium">Medium (500-1000)</option>
                <option value="large">Large (Above 1000)</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredGardens.length}</span> of <span className="font-semibold">{marriageGardens.length}</span> marriage gardens
            </p>
          </div>
        </div>

        {/* Gardens Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading marriage gardens...</p>
          </div>
        ) : filteredGardens.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGardens.map((garden) => (
              <MarriageGardenCard
                key={garden._id}
                marriageGarden={garden}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No marriage gardens found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarriageGardenBooking

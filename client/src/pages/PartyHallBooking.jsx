import { useState, useEffect } from 'react'
import axios from 'axios'
import PartyHallCard from '../components/PartyHallCard'

function PartyHallBooking() {
  const [partyHalls, setPartyHalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    minCapacity: '',
    maxCapacity: '',
    type: ''
  })

  useEffect(() => {
    fetchPartyHalls()
  }, [])

  const fetchPartyHalls = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
      if (filters.city) queryParams.append('city', filters.city)
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice)
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice)
      if (filters.minCapacity) queryParams.append('minCapacity', filters.minCapacity)
      if (filters.maxCapacity) queryParams.append('maxCapacity', filters.maxCapacity)
      if (filters.type) queryParams.append('type', filters.type)

      const response = await axios.get(
        `http://localhost:5000/api/party-halls${queryParams.toString() ? '?' + queryParams.toString() : ''}`
      )
      setPartyHalls(response.data.data)
    } catch (error) {
      console.error('Error fetching party halls:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    fetchPartyHalls()
  }

  const clearFilters = () => {
    setFilters({
      city: '',
      minPrice: '',
      maxPrice: '',
      minCapacity: '',
      maxCapacity: '',
      type: ''
    })
    setTimeout(() => fetchPartyHalls(), 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section */}
      <div 
        className="h-96 bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Party Halls</h1>
            <p className="text-xl">Celebrate in style at the perfect party venue</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Filter Party Halls</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Enter city name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Party Hall Type
              </label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">All Types</option>
                <option value="Rooftop Party Hall">Rooftop Party Hall</option>
                <option value="Indoor Party Hall">Indoor Party Hall</option>
                <option value="Club Style">Club Style</option>
                <option value="Lounge">Lounge</option>
                <option value="Terrace Hall">Terrace Hall</option>
                <option value="Budget Party Hall">Budget Party Hall</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price (₹)
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Minimum price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price (₹)
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Maximum price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Min Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Capacity
              </label>
              <input
                type="number"
                name="minCapacity"
                value={filters.minCapacity}
                onChange={handleFilterChange}
                placeholder="Minimum guests"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Max Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Capacity
              </label>
              <input
                type="number"
                name="maxCapacity"
                value={filters.maxCapacity}
                onChange={handleFilterChange}
                placeholder="Maximum guests"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {partyHalls.length} Party Halls Found
          </h2>
        </div>

        {/* Party Halls Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        ) : partyHalls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partyHalls.map(hall => (
              <PartyHallCard key={hall._id} hall={hall} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">😞</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Party Halls Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PartyHallBooking

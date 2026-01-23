import { useState, useEffect } from 'react'
import axios from 'axios'
import MarriageGardenCard from '../components/MarriageGardenCard'
import BanquetHallCard from '../components/BanquetHallCard'
import FarmHouseCard from '../components/FarmHouseCard'
import HotelCard from '../components/HotelCard'
import ResortCard from '../components/ResortCard'

function AllVenueHallBookings() {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    venueType: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    minCapacity: '',
    maxCapacity: ''
  })

  useEffect(() => {
    fetchAllVenues()
  }, [])

  const fetchAllVenues = async () => {
    setLoading(true)
    try {
      // Build query params based on filters
      const params = new URLSearchParams()
      if (filters.city) params.append('city', filters.city)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
      if (filters.minCapacity) params.append('minCapacity', filters.minCapacity)
      if (filters.maxCapacity) params.append('maxCapacity', filters.maxCapacity)
      
      const queryString = params.toString()

      // Fetch from all venue APIs in parallel
      const [marriageGardens, banquetHalls, farmHouses, hotels, resorts] = await Promise.all([
        axios.get(`http://localhost:5000/api/marriage-gardens${queryString ? '?' + queryString : ''}`),
        axios.get(`http://localhost:5000/api/banquet-halls${queryString ? '?' + queryString : ''}`),
        axios.get(`http://localhost:5000/api/farm-houses${queryString ? '?' + queryString : ''}`),
        axios.get(`http://localhost:5000/api/hotels${queryString ? '?' + queryString : ''}`),
        axios.get(`http://localhost:5000/api/resorts${queryString ? '?' + queryString : ''}`)
      ])

      // Combine all venues with type identifier
      let allVenues = [
        ...marriageGardens.data.data.map(v => ({ ...v, venueCategory: 'marriageGarden' })),
        ...banquetHalls.data.data.map(v => ({ ...v, venueCategory: 'banquetHall' })),
        ...farmHouses.data.data.map(v => ({ ...v, venueCategory: 'farmHouse' })),
        ...hotels.data.data.map(v => ({ ...v, venueCategory: 'hotel' })),
        ...resorts.data.data.map(v => ({ ...v, venueCategory: 'resort' }))
      ]

      // Filter by venue type if selected
      if (filters.venueType) {
        allVenues = allVenues.filter(v => v.venueCategory === filters.venueType)
      }

      setVenues(allVenues)
    } catch (error) {
      console.error('Error fetching venues:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    fetchAllVenues()
  }

  const clearFilters = () => {
    setFilters({
      venueType: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      minCapacity: '',
      maxCapacity: ''
    })
    setTimeout(() => fetchAllVenues(), 100)
  }

  const renderVenueCard = (venue) => {
    switch (venue.venueCategory) {
      case 'marriageGarden':
        return <MarriageGardenCard key={venue._id} marriageGarden={venue} />
      case 'banquetHall':
        return <BanquetHallCard key={venue._id} hall={venue} />
      case 'farmHouse':
        return <FarmHouseCard key={venue._id} farmHouse={venue} />
      case 'hotel':
        return <HotelCard key={venue._id} hotel={venue} />
      case 'resort':
        return <ResortCard key={venue._id} resort={venue} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div 
        className="h-80 bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f29da8fd54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">All Venues & Halls</h1>
            <p className="text-xl">Discover the perfect venue for your special occasion</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Filter Venues</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Venue Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue Type
              </label>
              <select
                name="venueType"
                value={filters.venueType}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                <option value="marriageGarden">Marriage Gardens</option>
                <option value="banquetHall">Banquet Halls</option>
                <option value="farmHouse">Farm Houses</option>
                <option value="hotel">Hotels</option>
                <option value="resort">Resorts</option>
              </select>
            </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
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
            {venues.length} Venues Found
          </h2>
        </div>

        {/* Venues Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : venues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map(venue => renderVenueCard(venue))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">😞</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Venues Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllVenueHallBookings

import API_URL from '../config/api';
import { useState, useEffect } from 'react'
import axios from 'axios'
import JameenPlotBookingCard from '../components/JameenPlotBookingCard'
import { FaMapMarkedAlt, FaFilter } from 'react-icons/fa'

function JameenPlotBooking() {
  const [plots, setPlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    boundaryWall: '',
    roadAccess: '',
    waterSupply: '',
    electricity: '',
    plotFacing: '',
    possession: '',
    areaRange: '',
    priceRange: ''
  })

  const plotTypes = ['Residential Plot', 'Commercial Plot', 'Agricultural Land', 'Industrial Plot', 'Farm Plot', 'Investment Land']
  const boundaryWallOptions = ['Completed', 'Partial', 'Not Available']
  const roadAccessOptions = ['Single Road', 'Corner Plot', 'Main Road', 'Park Facing', 'Two Road Corner', 'Three Side Open']
  const waterSupplyOptions = ['Municipality', 'Borewell', 'Both', 'Not Available']
  const electricityOptions = ['Available', 'Not Available', 'Nearby']
  const plotFacings = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West']
  const possessionOptions = ['Immediate', 'Within 1 Month', 'Within 3 Months', 'Within 6 Months', 'Under Development']
  
  const areaRanges = [
    { label: 'Under 1000 Sq Ft', min: 0, max: 1000 },
    { label: '1000-2000 Sq Ft', min: 1000, max: 2000 },
    { label: '2000-5000 Sq Ft', min: 2000, max: 5000 },
    { label: '5000-10000 Sq Ft', min: 5000, max: 10000 },
    { label: 'Above 10000 Sq Ft', min: 10000, max: 999999999 }
  ]

  const priceRanges = [
    { label: 'Under ₹10L', min: 0, max: 1000000 },
    { label: '₹10L - ₹25L', min: 1000000, max: 2500000 },
    { label: '₹25L - ₹50L', min: 2500000, max: 5000000 },
    { label: 'Above ₹50L', min: 5000000, max: 999999999 }
  ]

  useEffect(() => {
    fetchPlots()
  }, [filters])

  const fetchPlots = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filters.city) params.city = filters.city
      if (filters.type) params.type = filters.type
      if (filters.boundaryWall) params.boundaryWall = filters.boundaryWall
      if (filters.roadAccess) params.roadAccess = filters.roadAccess
      if (filters.waterSupply) params.waterSupply = filters.waterSupply
      if (filters.electricity) params.electricity = filters.electricity
      if (filters.plotFacing) params.plotFacing = filters.plotFacing
      if (filters.possession) params.possession = filters.possession
      
      if (filters.areaRange) {
        const range = areaRanges.find(r => r.label === filters.areaRange)
        if (range) {
          params.minArea = range.min
          params.maxArea = range.max
        }
      }
      
      if (filters.priceRange) {
        const range = priceRanges.find(r => r.label === filters.priceRange)
        if (range) {
          params.minPrice = range.min
          params.maxPrice = range.max
        }
      }

      const response = await axios.get(`${API_URL}/jameen-plot`, { params })
      setPlots(response.data)
    } catch (error) {
      console.error('Error fetching plots:', error)
    } finally {
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
      boundaryWall: '',
      roadAccess: '',
      waterSupply: '',
      electricity: '',
      plotFacing: '',
      possession: '',
      areaRange: '',
      priceRange: ''
    })
  }

  const cities = [...new Set(plots.map(plot => plot.location.city))].sort()
  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaMapMarkedAlt className="text-5xl mr-4" />
              <div>
                <h1 className="text-4xl font-bold mb-2">Jameen/Plot Booking</h1>
                <p className="text-green-100">Find Your Perfect Land Investment</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{plots.length}</p>
              <p className="text-green-100">Plots Available</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaFilter className="text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
              {activeFiltersCount > 0 && (
                <span className="ml-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {activeFiltersCount} active
                </span>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-green-600 hover:text-green-800 font-semibold text-sm"
              >
                Reset All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Plot Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plot Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {plotTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Boundary Wall Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Boundary Wall</label>
              <select
                value={filters.boundaryWall}
                onChange={(e) => handleFilterChange('boundaryWall', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Any Status</option>
                {boundaryWallOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Road Access Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Road Access</label>
              <select
                value={filters.roadAccess}
                onChange={(e) => handleFilterChange('roadAccess', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Any Access</option>
                {roadAccessOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Water Supply Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Water Supply</label>
              <select
                value={filters.waterSupply}
                onChange={(e) => handleFilterChange('waterSupply', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Any Water Supply</option>
                {waterSupplyOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Electricity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Electricity</label>
              <select
                value={filters.electricity}
                onChange={(e) => handleFilterChange('electricity', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Any Electricity</option>
                {electricityOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Plot Facing Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plot Facing</label>
              <select
                value={filters.plotFacing}
                onChange={(e) => handleFilterChange('plotFacing', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Any Direction</option>
                {plotFacings.map(facing => (
                  <option key={facing} value={facing}>{facing}</option>
                ))}
              </select>
            </div>

            {/* Possession Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Possession</label>
              <select
                value={filters.possession}
                onChange={(e) => handleFilterChange('possession', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Any Timeline</option>
                {possessionOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Area Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area Range</label>
              <select
                value={filters.areaRange}
                onChange={(e) => handleFilterChange('areaRange', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Areas</option>
                {areaRanges.map(range => (
                  <option key={range.label} value={range.label}>{range.label}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Prices</option>
                {priceRanges.map(range => (
                  <option key={range.label} value={range.label}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
          </div>
        ) : plots.length === 0 ? (
          <div className="text-center py-20">
            <FaMapMarkedAlt className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No plots found matching your criteria</p>
            <button
              onClick={resetFilters}
              className="mt-4 text-green-600 hover:text-green-800 font-semibold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-green-700">{plots.length}</span> plot{plots.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plots.map(plot => (
                <JameenPlotBookingCard key={plot._id} plot={plot} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default JameenPlotBooking

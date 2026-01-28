import API_URL from '../config/api';
import { useState, useEffect } from 'react'
import axios from 'axios'
import CommercialPropertyBookingCard from '../components/CommercialPropertyBookingCard'
import { FaBuilding, FaFilter } from 'react-icons/fa'

function CommercialPropertyBooking() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    furnished: '',
    leaseTerm: '',
    areaRange: '',
    priceRange: '',
    parking: '',
    powerBackup: '',
    lift: '',
    buildingGrade: ''
  })

  const propertyTypes = ['Office Space', 'Retail Shop', 'Showroom', 'Restaurant Space', 'Warehouse', 'Industrial Unit']
  const furnishedOptions = ['Fully Furnished', 'Semi Furnished', 'Unfurnished']
  const leaseTermOptions = ['Monthly', '3 Months', '6 Months', '1 Year', '2 Years', '3 Years', '5 Years']
  const buildingGrades = ['Grade A', 'Grade B', 'Grade C']
  const parkingOptions = [
    { label: '1+ Parking', value: '1' },
    { label: '2+ Parking', value: '2' },
    { label: '5+ Parking', value: '5' },
    { label: '10+ Parking', value: '10' }
  ]
  
  const areaRanges = [
    { label: 'Under 500 Sq Ft', min: 0, max: 500 },
    { label: '500-1000 Sq Ft', min: 500, max: 1000 },
    { label: '1000-2000 Sq Ft', min: 1000, max: 2000 },
    { label: '2000-5000 Sq Ft', min: 2000, max: 5000 },
    { label: 'Above 5000 Sq Ft', min: 5000, max: 999999999 }
  ]

  const priceRanges = [
    { label: 'Under ₹25K', min: 0, max: 25000 },
    { label: '₹25K - ₹50K', min: 25000, max: 50000 },
    { label: '₹50K - ₹1L', min: 50000, max: 100000 },
    { label: 'Above ₹1L', min: 100000, max: 999999999 }
  ]

  useEffect(() => {
    fetchProperties()
  }, [filters])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filters.city) params.city = filters.city
      if (filters.type) params.type = filters.type
      if (filters.furnished) params.furnished = filters.furnished
      if (filters.leaseTerm) params.leaseTerm = filters.leaseTerm
      if (filters.buildingGrade) params.buildingGrade = filters.buildingGrade
      if (filters.parking) params.parking = filters.parking
      if (filters.powerBackup) params.powerBackup = filters.powerBackup
      if (filters.lift) params.lift = filters.lift
      
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

      const response = await axios.get(`${API_URL}/commercial-property`, { params })
      setProperties(response.data)
    } catch (error) {
      console.error('Error fetching properties:', error)
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
      furnished: '',
      leaseTerm: '',
      areaRange: '',
      priceRange: '',
      parking: '',
      powerBackup: '',
      lift: '',
      buildingGrade: ''
    })
  }

  const cities = [...new Set(properties.map(property => property.location.city))].sort()
  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaBuilding className="text-5xl mr-4" />
              <div>
                <h1 className="text-4xl font-bold mb-2">Commercial Property Booking</h1>
                <p className="text-blue-100">Find the perfect commercial space for your business</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{properties.length}</p>
              <p className="text-blue-100">Properties Available</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaFilter className="text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              {activeFiltersCount > 0 && (
                <span className="ml-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {activeFiltersCount} active
                </span>
              )}
            </div>
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Reset All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Property Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Furnished Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Furnished Status</label>
              <select
                value={filters.furnished}
                onChange={(e) => handleFilterChange('furnished', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Any Status</option>
                {furnishedOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Lease Term Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lease Term</label>
              <select
                value={filters.leaseTerm}
                onChange={(e) => handleFilterChange('leaseTerm', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Any Term</option>
                {leaseTermOptions.map(term => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>

            {/* Building Grade Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Building Grade</label>
              <select
                value={filters.buildingGrade}
                onChange={(e) => handleFilterChange('buildingGrade', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Any Grade</option>
                {buildingGrades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            {/* Parking Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parking Spaces</label>
              <select
                value={filters.parking}
                onChange={(e) => handleFilterChange('parking', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Any Parking</option>
                {parkingOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Power Backup Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Power Backup</label>
              <select
                value={filters.powerBackup}
                onChange={(e) => handleFilterChange('powerBackup', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Any</option>
                <option value="true">Available</option>
              </select>
            </div>

            {/* Lift Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lift</label>
              <select
                value={filters.lift}
                onChange={(e) => handleFilterChange('lift', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Any</option>
                <option value="true">Available</option>
              </select>
            </div>

            {/* Area Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area Range</label>
              <select
                value={filters.areaRange}
                onChange={(e) => handleFilterChange('areaRange', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <FaBuilding className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No properties found matching your criteria</p>
            <button
              onClick={resetFilters}
              className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-blue-700">{properties.length}</span> propert{properties.length !== 1 ? 'ies' : 'y'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map(property => (
                <CommercialPropertyBookingCard key={property._id} property={property} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CommercialPropertyBooking


import { useState, useEffect } from 'react'
import axios from 'axios'
import OfficeSpaceBookingCard from '../components/OfficeSpaceBookingCard'
import { FaBuilding, FaFilter } from 'react-icons/fa'

function OfficeSpaceBooking() {
  const [offices, setOffices] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    furnished: '',
    parking: '',
    powerBackup: '',
    buildingGrade: '',
    seatingRange: '',
    priceRange: ''
  })

  const officeTypes = ['Private Office', 'Co-working Space', 'Virtual Office', 'Meeting Room', 'Serviced Office', 'Shared Office']
  const furnishedOptions = ['Fully Furnished', 'Semi Furnished', 'Unfurnished']
  const parkingOptions = ['Available', 'Not Available', 'Paid Parking']
  const powerBackupOptions = ['Full', 'Partial', 'None']
  const buildingGrades = ['Grade A', 'Grade B', 'Grade C', 'Premium']
  
  const seatingRanges = [
    { label: 'Under 10 Seats', min: 0, max: 10 },
    { label: '10-25 Seats', min: 10, max: 25 },
    { label: '25-50 Seats', min: 25, max: 50 },
    { label: '50-100 Seats', min: 50, max: 100 },
    { label: 'Above 100 Seats', min: 100, max: 999999 }
  ]

  const priceRanges = [
    { label: 'Under ₹20,000', min: 0, max: 20000 },
    { label: '₹20,000 - ₹50,000', min: 20000, max: 50000 },
    { label: '₹50,000 - ₹1,00,000', min: 50000, max: 100000 },
    { label: 'Above ₹1,00,000', min: 100000, max: 999999999 }
  ]

  useEffect(() => {
    fetchOffices()
  }, [filters])

  const fetchOffices = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filters.city) params.city = filters.city
      if (filters.type) params.type = filters.type
      if (filters.furnished) params.furnished = filters.furnished
      if (filters.parking) params.parking = filters.parking
      if (filters.powerBackup) params.powerBackup = filters.powerBackup
      if (filters.buildingGrade) params.buildingGrade = filters.buildingGrade
      
      if (filters.seatingRange) {
        const range = seatingRanges.find(r => r.label === filters.seatingRange)
        if (range) {
          params.minSeats = range.min
          params.maxSeats = range.max
        }
      }
      
      if (filters.priceRange) {
        const range = priceRanges.find(r => r.label === filters.priceRange)
        if (range) {
          params.minPrice = range.min
          params.maxPrice = range.max
        }
      }

      const response = await axios.get('http://localhost:5000/api/office-space', { params })
      setOffices(response.data)
    } catch (error) {
      console.error('Error fetching offices:', error)
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
      parking: '',
      powerBackup: '',
      buildingGrade: '',
      seatingRange: '',
      priceRange: ''
    })
  }

  const cities = [...new Set(offices.map(office => office.location.city))].sort()
  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaBuilding className="text-5xl mr-4" />
              <div>
                <h1 className="text-4xl font-bold mb-2">Office Space Booking</h1>
                <p className="text-blue-100">Find Your Perfect Workspace</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{offices.length}</p>
              <p className="text-blue-100">Spaces Available</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaFilter className="text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
              {activeFiltersCount > 0 && (
                <span className="ml-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {activeFiltersCount} active
                </span>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Office Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Office Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {officeTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Furnished Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Furnished</label>
              <select
                value={filters.furnished}
                onChange={(e) => handleFilterChange('furnished', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Furnishing</option>
                {furnishedOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Parking Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parking</label>
              <select
                value={filters.parking}
                onChange={(e) => handleFilterChange('parking', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Parking</option>
                {parkingOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Power Backup Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Power Backup</label>
              <select
                value={filters.powerBackup}
                onChange={(e) => handleFilterChange('powerBackup', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Power Backup</option>
                {powerBackupOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Building Grade Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Building Grade</label>
              <select
                value={filters.buildingGrade}
                onChange={(e) => handleFilterChange('buildingGrade', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Grade</option>
                {buildingGrades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            {/* Seating Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seating Capacity</label>
              <select
                value={filters.seatingRange}
                onChange={(e) => handleFilterChange('seatingRange', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Capacities</option>
                {seatingRanges.map(range => (
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        ) : offices.length === 0 ? (
          <div className="text-center py-20">
            <FaBuilding className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No office spaces found matching your criteria</p>
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
                Showing <span className="font-semibold text-blue-700">{offices.length}</span> office space{offices.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offices.map(office => (
                <OfficeSpaceBookingCard key={office._id} office={office} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OfficeSpaceBooking

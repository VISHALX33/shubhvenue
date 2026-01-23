import { useState, useEffect } from 'react'
import axios from 'axios'
import WarehouseGodownBookingCard from '../components/WarehouseGodownBookingCard'
import { FaWarehouse, FaFilter } from 'react-icons/fa'

function WarehouseGodownBooking() {
  const [warehouses, setWarehouses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    temperatureControlled: '',
    floorType: '',
    priceRange: '',
    areaRange: ''
  })

  const warehouseTypes = [
    'Cold Storage',
    'Dry Warehouse',
    'Bonded Warehouse',
    'Distribution Center',
    'Fulfillment Center',
    'Storage Godown'
  ]

  const temperatureOptions = ['Yes', 'No', 'Partial']
  const floorTypes = ['Concrete', 'Epoxy Coated', 'Anti-Static', 'Industrial Grade']
  const priceRanges = [
    { label: 'Under ₹20k', value: 'under-20k', min: 0, max: 20000 },
    { label: '₹20k - ₹50k', value: '20k-50k', min: 20000, max: 50000 },
    { label: '₹50k - ₹1L', value: '50k-1l', min: 50000, max: 100000 },
    { label: 'Above ₹1L', value: 'above-1l', min: 100000, max: Infinity }
  ]
  const areaRanges = [
    { label: 'Under 2000 sq ft', value: 'under-2000', min: 0, max: 2000 },
    { label: '2000 - 5000 sq ft', value: '2000-5000', min: 2000, max: 5000 },
    { label: '5000 - 10000 sq ft', value: '5000-10000', min: 5000, max: 10000 },
    { label: '10000 - 20000 sq ft', value: '10000-20000', min: 10000, max: 20000 },
    { label: 'Above 20000 sq ft', value: 'above-20000', min: 20000, max: Infinity }
  ]

  const [cities, setCities] = useState([])

  useEffect(() => {
    fetchWarehouses()
  }, [filters])

  const fetchWarehouses = async () => {
    try {
      setLoading(true)
      const params = {}
      
      if (filters.city) params.city = filters.city
      if (filters.type) params.type = filters.type
      if (filters.temperatureControlled) params.temperatureControlled = filters.temperatureControlled
      if (filters.floorType) params.floorType = filters.floorType
      
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

      const response = await axios.get('http://localhost:5000/api/warehouse-godown', { params })
      setWarehouses(response.data)
      
      // Extract unique cities
      const uniqueCities = [...new Set(response.data.map(warehouse => warehouse.location.city))]
      setCities(uniqueCities)
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching warehouses:', error)
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
      temperatureControlled: '',
      floorType: '',
      priceRange: '',
      areaRange: ''
    })
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-600 to-gray-600 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <FaWarehouse className="text-4xl text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Warehouse/Godown Booking</h1>
                <p className="text-slate-100 text-lg">Find secure and spacious storage solutions</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="text-white text-center">
                <p className="text-3xl font-bold">{warehouses.length}</p>
                <p className="text-slate-100">Available Warehouses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FaFilter className="text-slate-600 text-xl" />
              <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
              {activeFilterCount > 0 && (
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {activeFilterCount} active
                </span>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-slate-600 hover:text-slate-700 font-semibold transition-colors"
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
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-500 focus:outline-none transition-colors"
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
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-500 focus:outline-none transition-colors"
            >
              <option value="">All Types</option>
              {warehouseTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Temperature Control Filter */}
            <select
              value={filters.temperatureControlled}
              onChange={(e) => handleFilterChange('temperatureControlled', e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-500 focus:outline-none transition-colors"
            >
              <option value="">Any Climate Control</option>
              {temperatureOptions.map(option => (
                <option key={option} value={option}>{option === 'Yes' ? 'Climate Controlled' : option === 'No' ? 'Standard' : 'Partial AC'}</option>
              ))}
            </select>

            {/* Floor Type Filter */}
            <select
              value={filters.floorType}
              onChange={(e) => handleFilterChange('floorType', e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-500 focus:outline-none transition-colors"
            >
              <option value="">Any Floor Type</option>
              {floorTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Area Range Filter */}
            <select
              value={filters.areaRange}
              onChange={(e) => handleFilterChange('areaRange', e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-500 focus:outline-none transition-colors"
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
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-500 focus:outline-none transition-colors"
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
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-slate-600"></div>
          </div>
        ) : warehouses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FaWarehouse className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No warehouses found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-700 text-lg">
                Showing <span className="font-bold text-slate-700">{warehouses.length}</span> {warehouses.length === 1 ? 'warehouse' : 'warehouses'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {warehouses.map(warehouse => (
                <WarehouseGodownBookingCard key={warehouse._id} warehouse={warehouse} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default WarehouseGodownBooking

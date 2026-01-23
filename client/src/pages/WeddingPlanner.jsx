import { useState, useEffect } from 'react';
import axios from 'axios';
import WeddingPlannerCard from '../components/WeddingPlannerCard';
import { FaSearch, FaFilter, FaBriefcase, FaHeart } from 'react-icons/fa';

function WeddingPlanner() {
  const [weddingPlanners, setWeddingPlanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    planningScope: '',
    minPrice: '',
    maxPrice: '',
    minExperience: ''
  });

  useEffect(() => {
    fetchWeddingPlanners();
  }, []);

  const fetchWeddingPlanners = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.type) params.append('type', filters.type);
      if (filters.planningScope) params.append('planningScope', filters.planningScope);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.minExperience) params.append('minExperience', filters.minExperience);

      const response = await axios.get(`http://localhost:5000/api/wedding-planner?${params}`);
      setWeddingPlanners(response.data.data);
    } catch (error) {
      console.error('Error fetching wedding planners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = () => {
    fetchWeddingPlanners();
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      type: '',
      planningScope: '',
      minPrice: '',
      maxPrice: '',
      minExperience: ''
    });
    // Fetch all planners after clearing
    setTimeout(() => fetchWeddingPlanners(), 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FaHeart className="text-6xl mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4">Professional Wedding Planners</h1>
            <p className="text-xl text-pink-100">Let experts create your dream wedding stress-free. From full-service planning to day-of coordination.</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaFilter className="text-pink-600 mr-2" />
            <h2 className="text-xl font-bold">Filter Wedding Planners</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaSearch className="inline mr-2" />
                City
              </label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Enter city name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaBriefcase className="inline mr-2" />
                Planner Type
              </label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Full Service Wedding Planner">Full Service Wedding Planner</option>
                <option value="Destination Wedding Specialist">Destination Wedding Specialist</option>
                <option value="Budget Wedding Planner">Budget Wedding Planner</option>
                <option value="Luxury Wedding Planner">Luxury Wedding Planner</option>
                <option value="Day-of Coordinator">Day-of Coordinator</option>
                <option value="Cultural Wedding Specialist">Cultural Wedding Specialist</option>
              </select>
            </div>

            {/* Planning Scope Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Planning Scope
              </label>
              <select
                name="planningScope"
                value={filters.planningScope}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">All Scopes</option>
                <option value="Full Planning">Full Planning</option>
                <option value="Partial Planning">Partial Planning</option>
                <option value="Day-of Coordination">Day-of Coordination</option>
                <option value="Consultation Only">Consultation Only</option>
                <option value="All Services">All Services</option>
              </select>
            </div>

            {/* Min Experience Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Minimum Experience (Years)
              </label>
              <input
                type="number"
                name="minExperience"
                value={filters.minExperience}
                onChange={handleFilterChange}
                placeholder="e.g., 5"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Min Price Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Min Package Price (₹)
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="e.g., 50000"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Max Price Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Max Package Price (₹)
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="e.g., 500000"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-4">
            <button
              onClick={applyFilters}
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="px-8 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition duration-300"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {weddingPlanners.length} Wedding Planner{weddingPlanners.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
          </div>
        ) : weddingPlanners.length > 0 ? (
          /* Wedding Planners Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weddingPlanners.map((planner) => (
              <WeddingPlannerCard key={planner._id} planner={planner} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Wedding Planners Found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeddingPlanner

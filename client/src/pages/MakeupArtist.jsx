import { useState, useEffect } from 'react';
import axios from 'axios';
import MakeupArtistCard from '../components/MakeupArtistCard';
import { FaFilter, FaTimes, FaPaintBrush } from 'react-icons/fa';
import API_URL from '../config/api';

function MakeupArtist() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    minExperience: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  // Cities and types for dropdowns
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Hyderabad', 'Chennai', 'Pune', 'Jaipur'];
  const makeupTypes = [
    'Bridal Makeup Artist',
    'HD Makeup Specialist',
    'Airbrush Makeup Expert',
    'Party Makeup Artist',
    'Celebrity Makeup Artist',
    'Traditional Makeup Expert'
  ];

  useEffect(() => {
    fetchArtists();
  }, [filters]);

  const fetchArtists = async () => {
    try {
      setLoading(true);
      
      // Build query params
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.type) params.append('type', filters.type);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.minExperience) params.append('minExperience', filters.minExperience);

      const response = await axios.get(`${API_URL}/makeup-artist?${params}`);
      setArtists(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      minExperience: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(val => val !== '');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50">
        <div className="text-red-600 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FaPaintBrush className="text-6xl mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4">Makeup Artists</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Transform your look with expert makeup artists specializing in bridal, HD, airbrush, and more
            </p>
            <div className="mt-8 flex justify-center gap-8 text-center">
              <div>
                <p className="text-4xl font-bold">{artists.length}</p>
                <p className="text-purple-100">Artists Available</p>
              </div>
              <div>
                <p className="text-4xl font-bold">{cities.length}</p>
                <p className="text-purple-100">Cities Covered</p>
              </div>
              <div>
                <p className="text-4xl font-bold">{makeupTypes.length}</p>
                <p className="text-purple-100">Specializations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Toggle Button (Mobile) */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            <FaFilter />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaFilter className="text-purple-600" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1"
                  >
                    <FaTimes />
                    Clear
                  </button>
                )}
              </div>

              {/* City Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Makeup Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Makeup Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {makeupTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range (₹)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Experience
                </label>
                <select
                  value={filters.minExperience}
                  onChange={(e) => handleFilterChange('minExperience', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Any Experience</option>
                  <option value="5">5+ Years</option>
                  <option value="10">10+ Years</option>
                  <option value="15">15+ Years</option>
                </select>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="pt-4 border-t">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Active Filters:</p>
                  <div className="space-y-2">
                    {filters.city && (
                      <div className="flex items-center justify-between bg-purple-50 px-3 py-2 rounded">
                        <span className="text-sm text-purple-800">City: {filters.city}</span>
                        <button onClick={() => handleFilterChange('city', '')} className="text-purple-600 hover:text-purple-800">
                          <FaTimes className="text-xs" />
                        </button>
                      </div>
                    )}
                    {filters.type && (
                      <div className="flex items-center justify-between bg-purple-50 px-3 py-2 rounded">
                        <span className="text-sm text-purple-800">Type: {filters.type}</span>
                        <button onClick={() => handleFilterChange('type', '')} className="text-purple-600 hover:text-purple-800">
                          <FaTimes className="text-xs" />
                        </button>
                      </div>
                    )}
                    {(filters.minPrice || filters.maxPrice) && (
                      <div className="flex items-center justify-between bg-purple-50 px-3 py-2 rounded">
                        <span className="text-sm text-purple-800">
                          Price: {filters.minPrice || '0'} - {filters.maxPrice || '∞'}
                        </span>
                        <button onClick={() => {
                          handleFilterChange('minPrice', '');
                          handleFilterChange('maxPrice', '');
                        }} className="text-purple-600 hover:text-purple-800">
                          <FaTimes className="text-xs" />
                        </button>
                      </div>
                    )}
                    {filters.minExperience && (
                      <div className="flex items-center justify-between bg-purple-50 px-3 py-2 rounded">
                        <span className="text-sm text-purple-800">Experience: {filters.minExperience}+ years</span>
                        <button onClick={() => handleFilterChange('minExperience', '')} className="text-purple-600 hover:text-purple-800">
                          <FaTimes className="text-xs" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Artists Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {artists.length} Makeup Artist{artists.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            {artists.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <FaPaintBrush className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No makeup artists found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {artists.map(artist => (
                  <MakeupArtistCard key={artist._id} artist={artist} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeupArtist;

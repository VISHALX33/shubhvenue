import { useState, useEffect } from 'react';
import axios from 'axios';
import MehndiArtistCard from '../components/MehndiArtistCard';
import { FaSearch, FaFilter, FaPalette, FaHeart } from 'react-icons/fa';
import API_URL from '../config/api';

const MehndiArtist = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    minExperience: ''
  });

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/mehndi-artist`);
      setArtists(response.data.data);
      setFilteredArtists(response.data.data);
    } catch (error) {
      console.error('Error fetching mehndi artists:', error);
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

  const applyFilters = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      });
      
      const response = await axios.get(`${API_URL}/mehndi-artist?${queryParams}`);
      setFilteredArtists(response.data.data);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      minExperience: ''
    });
    setFilteredArtists(artists);
  };

  if (loading && artists.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center mb-4">
              <FaPalette className="text-4xl mr-4" />
              <h1 className="text-5xl font-bold">Mehndi Artists</h1>
            </div>
            <p className="text-xl text-rose-100 mb-6">
              Find skilled mehndi artists for your special day - from traditional to contemporary designs
            </p>
            <div className="flex items-center bg-white rounded-lg p-2">
              <FaSearch className="text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Search by city..."
                value={filters.city}
                name="city"
                onChange={handleFilterChange}
                className="flex-1 px-4 py-2 outline-none text-gray-800"
              />
              <button 
                onClick={applyFilters}
                className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FaFilter className="mr-2 text-rose-600" />
                  Filters
                </h2>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-rose-600"
                >
                  {showFilters ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mehndi Type
                  </label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="Bridal Mehndi Specialist">Bridal Mehndi Specialist</option>
                    <option value="Arabic Mehndi Artist">Arabic Mehndi Artist</option>
                    <option value="Traditional Mehndi Artist">Traditional Mehndi Artist</option>
                    <option value="Contemporary Mehndi Designer">Contemporary Mehndi Designer</option>
                    <option value="Indo-Arabic Specialist">Indo-Arabic Specialist</option>
                    <option value="Rajasthani Mehndi Expert">Rajasthani Mehndi Expert</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Experience (years)
                  </label>
                  <input
                    type="number"
                    name="minExperience"
                    placeholder="e.g., 5"
                    value={filters.minExperience}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                  />
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4">
                  <button
                    onClick={applyFilters}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold transition"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={clearFilters}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {filteredArtists.length} Mehndi Artist{filteredArtists.length !== 1 ? 's' : ''} Found
                </h2>
                <p className="text-gray-600">Browse and select the perfect mehndi artist for your event</p>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-rose-600"></div>
              </div>
            ) : filteredArtists.length === 0 ? (
              <div className="text-center py-20">
                <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Mehndi Artists Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                <button
                  onClick={clearFilters}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArtists.map((artist) => (
                  <MehndiArtistCard key={artist._id} artist={artist} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MehndiArtist;
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaEye, FaStore } from 'react-icons/fa';

function VendorListings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchVendorListings();
  }, []);

  const fetchVendorListings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      // This will fetch all listings created by this vendor
      const response = await axios.get(`http://localhost:5000/api/vendor/listings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setListings(response.data.data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (listingId, type) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/vendor/listings/${listingId}`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { type }
        });
        fetchVendorListings();
      } catch (error) {
        console.error('Error deleting listing:', error);
        alert('Failed to delete listing');
      }
    }
  };

  const serviceTypes = [
    'All',
    'Marriage Garden',
    'Banquet Hall',
    'Party Hall',
    'Farm House',
    'Hotel',
    'Resort',
    'Lodge/Guest House',
    'Homestay',
    'Community Hall',
    'Open Ground',
    'Corporate Event Space',
    'DJ',
    'Tent',
    'Photographer',
    'Videographer',
    'Event Management',
    'Stage Setup',
    'Sound System',
    'Lighting Setup',
    'Generator',
    'Catering',
    'Band Baja',
    'Dhol Tasha',
    'Shehnai',
    'Wedding Planner',
    'Mehndi Artist',
    'Makeup Artist',
    'Costume/Dress Rental',
    'Event Furniture',
    'Furniture Rental',
    'Bouncy Kids Games',
    'Car Rental',
    'Flower Vendor',
    'Balloon Decorator',
    'Sweet Shop',
    'Ice Cream Counter',
    'Juice Counter',
    'Live Food Stall'
  ];

  const filteredListings = filter === 'all' 
    ? listings 
    : listings.filter(listing => listing.serviceType?.toLowerCase() === filter.toLowerCase());

  // Convert service type to URL format for edit routes
  const getEditRoute = (listing) => {
    const serviceTypeMap = {
      'Event Management': 'event-management',
      'Tent': 'tent',
      'Stage Setup': 'stage-setup',
      'Sound System': 'sound-system',
      'Lighting Setup': 'lighting-setup',
      'Generator': 'generator',
      'Catering': 'catering',
      'Sweet Shop': 'sweet-shop',
      'Ice Cream Counter': 'ice-cream-counter',
      'Juice Counter': 'juice-counter',
      'Live Food Stall': 'live-food-stall',
      'Wedding Planner': 'wedding-planner',
      'Mehndi Artist': 'mehndi-artist',
      'Makeup Artist': 'makeup-artist',
      'Costume/Dress Rental': 'costume-dress',
      'Costume Dress': 'costume-dress',
      'Bouncy Kids Games': 'bouncy-kids-game',
      'Bouncy Kids Game': 'bouncy-kids-game',
      'Car Rental': 'car-rental',
      'Flower Vendor': 'flower-vendor',
      'Balloon Decorator': 'balloon-decorator',
      'Furniture Rental': 'furniture-rental',
      'Event Furniture': 'furniture-rental',
      'DJ': 'dj',
      'Band Baja': 'band-baja',
      'Dhol Tasha': 'dhol-tasha',
      'Shehnai': 'shehnai',
      'Photographer': 'photographer',
      'Videographer': 'videographer',
    };
    
    const urlSlug = serviceTypeMap[listing.serviceType] || listing.serviceType?.toLowerCase().replace(/\s+/g, '-');
    return `/vendor/edit-listing/${urlSlug}/${listing._id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">My Listings</h1>
              <p className="text-gray-600">Manage all your services and venues</p>
            </div>
            <button
              onClick={() => navigate('/vendor/add-listing')}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md flex items-center"
            >
              <FaPlus className="mr-2" />
              Add New Listing
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Filter by Type</h2>
          <div className="flex flex-wrap gap-2">
            {serviceTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type === 'All' ? 'all' : type)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === (type === 'All' ? 'all' : type)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div key={listing._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <img
                    src={listing.mainImage || listing.images?.[0] || 'https://via.placeholder.com/400x300'}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {listing.serviceType}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{listing.name}</h3>
                  <p className="text-gray-600 mb-2">
                    {listing.location?.city}, {listing.location?.area}
                  </p>
                  
                  {listing.price && (
                    <p className="text-2xl font-bold text-blue-600 mb-4">
                      ₹{listing.price.perDay?.toLocaleString() || listing.price.perEvent?.toLocaleString() || listing.price.perHour?.toLocaleString()}
                      <span className="text-sm text-gray-600">
                        /{listing.price.perDay ? 'day' : listing.price.perEvent ? 'event' : 'hour'}
                      </span>
                    </p>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(getEditRoute(listing))}
                      className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(listing._id, listing.serviceType)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FaStore className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Listings Yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first service or venue</p>
            <button
              onClick={() => navigate('/vendor/add-listing')}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md inline-flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Your First Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorListings;

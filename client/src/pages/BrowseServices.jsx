import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const serviceTypes = [
  { value: 'eventManagement', label: 'Event Management', endpoint: '/api/event-management', icon: '🎯' },
  { value: 'marriageGarden', label: 'Marriage Garden', endpoint: '/api/marriage-gardens', icon: '🌳' },
  { value: 'banquetHall', label: 'Banquet Hall', endpoint: '/api/banquet-halls', icon: '🏛️' },
  { value: 'resort', label: 'Resort', endpoint: '/api/resorts', icon: '🏖️' },
  { value: 'farmhouse', label: 'Farmhouse', endpoint: '/api/farm-houses', icon: '🏡' },
  { value: 'partyHall', label: 'Party Hall', endpoint: '/api/party-halls', icon: '🎊' },
  { value: 'communityHall', label: 'Community Hall', endpoint: '/api/community-halls', icon: '🏢' },
  { value: 'openGround', label: 'Open Ground', endpoint: '/api/open-grounds', icon: '🌾' },
  { value: 'djServices', label: 'DJ Services', endpoint: '/api/djs', icon: '🎧' },
  { value: 'tentServices', label: 'Tent Services', endpoint: '/api/tents', icon: '⛺' },
  { value: 'catering', label: 'Catering', endpoint: '/api/catering', icon: '🍽️' },
  { value: 'photography', label: 'Photography', endpoint: '/api/photographers', icon: '📷' },
  { value: 'videography', label: 'Videography', endpoint: '/api/videographers', icon: '🎥' },
  { value: 'decoration', label: 'Decoration', endpoint: '/api/balloon-decorator', icon: '🎈' },
  { value: 'makeupArtist', label: 'Makeup Artist', endpoint: '/api/makeup-artist', icon: '💄' },
  { value: 'mehndiArtist', label: 'Mehndi Artist', endpoint: '/api/mehndi-artist', icon: '✋' },
  { value: 'weddingPlanner', label: 'Wedding Planner', endpoint: '/api/wedding-planner', icon: '💒' },
  { value: 'priest', label: 'Priest', endpoint: '/api/band-baja', icon: '🙏' },
  { value: 'band', label: 'Band', endpoint: '/api/band-baja', icon: '🎺' },
  { value: 'choreographer', label: 'Choreographer', endpoint: '/api/dhol-tasha', icon: '💃' },
  { value: 'securityServices', label: 'Security Services', endpoint: '/api/generators', icon: '🛡️' },
  { value: 'valet', label: 'Valet Services', endpoint: '/api/car-rental-wedding', icon: '🚗' },
  { value: 'transportation', label: 'Transportation', endpoint: '/api/car-rental-wedding', icon: '🚐' },
  { value: 'soundSystem', label: 'Sound System', endpoint: '/api/sound-systems', icon: '🔊' },
  { value: 'lighting', label: 'Lighting', endpoint: '/api/lighting-setups', icon: '💡' },
  { value: 'flowerVendor', label: 'Flower Vendor', endpoint: '/api/flower-vendor', icon: '💐' }
];

function BrowseServices() {
  const [selectedService, setSelectedService] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (selectedService) {
      fetchServices();
    }
  }, [selectedService]);

  const fetchServices = async () => {
    setLoading(true);
    setError('');
    try {
      const serviceType = serviceTypes.find(s => s.value === selectedService);
      const response = await axios.get(serviceType.endpoint);
      setServices(response.data.data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(service => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (service.businessName && service.businessName.toLowerCase().includes(searchLower)) ||
      (service.ownerName && service.ownerName.toLowerCase().includes(searchLower)) ||
      (service.city && service.city.toLowerCase().includes(searchLower)) ||
      (service.description && service.description.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Browse Services</h1>
          <p className="text-indigo-100">Find the perfect vendor for your event</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Service Category Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Select Service Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {serviceTypes.map(service => (
              <button
                key={service.value}
                onClick={() => setSelectedService(service.value)}
                className={`p-4 rounded-lg border-2 transition text-center ${
                  selectedService === service.value
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-gray-200 hover:border-indigo-300 text-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">{service.icon}</div>
                <div className="text-sm font-medium">{service.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Results */}
        {selectedService && (
          <div>
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <input
                type="text"
                placeholder="Search by business name, owner, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600">Loading services...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {/* Services Grid */}
            {!loading && !error && filteredServices.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map(service => (
                  <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                    {/* Service Image */}
                    <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
                      <span className="text-6xl text-white">
                        {serviceTypes.find(s => s.value === selectedService)?.icon}
                      </span>
                    </div>

                    {/* Service Details */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {service.businessName || service.ownerName || 'Unnamed Service'}
                      </h3>
                      
                      {service.ownerName && (
                        <p className="text-gray-600 text-sm mb-2">
                          by {service.ownerName}
                        </p>
                      )}

                      {(service.city || service.area) && (
                        <p className="text-gray-600 text-sm mb-2">
                          📍 {service.area && `${service.area}, `}{service.city}
                        </p>
                      )}

                      {service.pricePerDay && (
                        <p className="text-indigo-600 font-semibold mb-2">
                          ₹{service.pricePerDay.toLocaleString()}/day
                        </p>
                      )}

                      {service.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {service.description}
                        </p>
                      )}

                      {/* Contact Info */}
                      <div className="space-y-1 mb-4 text-sm">
                        {service.email && (
                          <p className="text-gray-600">
                            📧 {service.email}
                          </p>
                        )}
                        {service.phone && (
                          <p className="text-gray-600">
                            📞 {service.phone}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <Link
                        to={`/guest/book/${selectedService}/${service._id}`}
                        className="block w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && selectedService && filteredServices.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No services found</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Try adjusting your search criteria' 
                    : 'No vendors available in this category yet'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!selectedService && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a Service Category</h3>
            <p className="text-gray-600">Choose a category above to browse available vendors</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseServices;

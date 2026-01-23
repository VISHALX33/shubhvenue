import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function BookingForm() {
  const { serviceType, serviceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    guestCount: '',
    venue: '',
    venueAddress: '',
    contactPerson: user?.fullName || '',
    contactPhone: user?.phone || '',
    contactEmail: user?.email || '',
    specialRequests: ''
  });

  const serviceTypeMap = {
    eventManagement: { label: 'Event Management', endpoint: '/api/event-management' },
    marriageGarden: { label: 'Marriage Garden', endpoint: '/api/marriage-gardens' },
    banquetHall: { label: 'Banquet Hall', endpoint: '/api/banquet-halls' },
    resort: { label: 'Resort', endpoint: '/api/resorts' },
    farmhouse: { label: 'Farmhouse', endpoint: '/api/farm-houses' },
    partyHall: { label: 'Party Hall', endpoint: '/api/party-halls' },
    communityHall: { label: 'Community Hall', endpoint: '/api/community-halls' },
    openGround: { label: 'Open Ground', endpoint: '/api/open-grounds' },
    djServices: { label: 'DJ Services', endpoint: '/api/djs' },
    tentServices: { label: 'Tent Services', endpoint: '/api/tents' },
    catering: { label: 'Catering', endpoint: '/api/catering' },
    photography: { label: 'Photography', endpoint: '/api/photographers' },
    videography: { label: 'Videography', endpoint: '/api/videographers' },
    decoration: { label: 'Decoration', endpoint: '/api/balloon-decorator' },
    makeupArtist: { label: 'Makeup Artist', endpoint: '/api/makeup-artist' },
    mehndiArtist: { label: 'Mehndi Artist', endpoint: '/api/mehndi-artist' },
    weddingPlanner: { label: 'Wedding Planner', endpoint: '/api/wedding-planner' },
    priest: { label: 'Priest', endpoint: '/api/band-baja' },
    band: { label: 'Band', endpoint: '/api/band-baja' },
    choreographer: { label: 'Choreographer', endpoint: '/api/dhol-tasha' },
    securityServices: { label: 'Security Services', endpoint: '/api/generators' },
    valet: { label: 'Valet Services', endpoint: '/api/car-rental-wedding' },
    transportation: { label: 'Transportation', endpoint: '/api/car-rental-wedding' },
    soundSystem: { label: 'Sound System', endpoint: '/api/sound-systems' },
    lighting: { label: 'Lighting', endpoint: '/api/lighting-setups' },
    flowerVendor: { label: 'Flower Vendor', endpoint: '/api/flower-vendor' }
  };

  useEffect(() => {
    if (!user) {
      navigate('/guest/login');
      return;
    }
    fetchServiceDetails();
  }, [serviceId, serviceType, user]);

  const fetchServiceDetails = async () => {
    try {
      const serviceInfo = serviceTypeMap[serviceType];
      const response = await axios.get(`${serviceInfo.endpoint}/${serviceId}`);
      const serviceData = response.data.data;
      setService(serviceData);
      
      // Auto-fill venue and address from service details
      setFormData(prev => ({
        ...prev,
        venue: serviceData.businessName || serviceData.name || serviceData.ownerName || '',
        venueAddress: serviceData.address || `${serviceData.city || ''}, ${serviceData.state || ''}`.trim() || ''
      }));
    } catch (err) {
      console.error('Error fetching service:', err);
      setError('Failed to load service details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const bookingData = {
        vendorId: service.vendorId,
        serviceType,
        serviceId,
        ...formData,
        guestCount: parseInt(formData.guestCount)
      };

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.post('/api/bookings', bookingData, config);
      navigate('/guest/dashboard', {
        state: { message: 'Booking request submitted successfully!' }
      });
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.response?.data?.error || 'Failed to submit booking request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Service</h1>
          <p className="text-gray-600">
            {serviceTypeMap[serviceType]?.label}
          </p>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Event Details</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Information */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Event Name *
              </label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Wedding Reception, Birthday Party"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Event Time *
                </label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Expected Guest Count *
              </label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Number of guests"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Venue Name *
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Venue name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Venue Address
              </label>
              <textarea
                name="venueAddress"
                value={formData.venueAddress}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Full venue address"
              />
            </div>

            {/* Contact Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Special Requests / Additional Information
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Any special requirements or additional details..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;

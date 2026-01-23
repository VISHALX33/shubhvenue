import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function CorporateEventSpaceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchSpaceDetails();
  }, [id]);

  const fetchSpaceDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/corporate-event-spaces/${id}`);
      setSpace(response.data.data);
    } catch (error) {
      console.error('Error fetching corporate event space details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!space) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Corporate Event Space Not Found</h2>
        <button
          onClick={() => navigate('/venue-hall/corporate-event')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Corporate Event Spaces
        </button>
      </div>
    );
  }

  const allImages = [space.mainImage, ...(space.images || [])];

  const tabs = [
    { id: 'about', name: 'About', icon: '📋' },
    { id: 'amenities', name: 'Amenities', icon: '✨' },
    { id: 'portfolio', name: 'Portfolio', icon: '📸' },
    { id: 'policies', name: 'Policies', icon: '📜' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="relative h-96">
                <img
                  src={allImages[selectedImage]}
                  alt={space.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-6 gap-2 p-4">
                {allImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${space.name} ${index + 1}`}
                    className={`h-20 object-cover cursor-pointer rounded-lg ${
                      selectedImage === index ? 'ring-4 ring-blue-600' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Header */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{space.name}</h1>
                  <p className="text-gray-600 flex items-center">
                    <span className="mr-2">📍</span>
                    {space.location.area}, {space.location.city}
                  </p>
                </div>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                  {space.type}
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex text-2xl mr-2">
                  {renderStars(Math.round(space.ratings.average))}
                </div>
                <span className="text-gray-600">
                  {space.ratings.average.toFixed(1)} ({space.ratings.count} reviews)
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex border-b overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 font-semibold whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Space</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{space.about}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">👥 Capacity</h3>
                        <p className="text-gray-600">{space.capacity.min} - {space.capacity.max} guests</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">🏢 Meeting Rooms</h3>
                        <p className="text-gray-600">
                          {space.rooms.conferenceRooms} Conference<br />
                          {space.rooms.meetingRooms} Meeting<br />
                          {space.rooms.boardRooms} Board Rooms
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">🕐 Check-in Time</h3>
                        <p className="text-gray-600">{space.policies.checkIn}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Amenities Tab */}
                {activeTab === 'amenities' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {space.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-green-500 mr-3 text-xl">✓</span>
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Portfolio</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {allImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90"
                          onClick={() => setSelectedImage(index)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Policies Tab */}
                {activeTab === 'policies' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Policies</h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">⏰ Timing</h3>
                        <p className="text-gray-600">Check-in: {space.policies.checkIn}</p>
                        <p className="text-gray-600">Check-out: {space.policies.checkOut}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-600">
                        <h3 className="font-semibold text-gray-800 mb-2">❌ Cancellation Policy</h3>
                        <p className="text-gray-600">{space.policies.cancellation}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">📋 Additional Services</h3>
                        <div className="space-y-2">
                          <p className="text-gray-600">
                            WiFi: <span className={space.policies.wifi ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                              {space.policies.wifi ? '✓ Available' : '✗ Not Available'}
                            </span>
                          </p>
                          <p className="text-gray-600">
                            Catering: <span className={space.policies.catering ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                              {space.policies.catering ? '✓ Available' : '✗ Not Available'}
                            </span>
                          </p>
                          <p className="text-gray-600">
                            Parking: <span className={space.policies.parking ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                              {space.policies.parking ? '✓ Available' : '✗ Not Available'}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
                    {space.reviews && space.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {space.reviews.map((review, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                {review.userName.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">{review.userName}</p>
                                <div className="flex text-yellow-400">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                            <p className="text-gray-500 text-sm mt-2">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Pricing Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">Starting from</p>
                  <p className="text-3xl font-bold text-blue-600">
                    ₹{(space.price.perDay / 1000).toFixed(0)}k
                    <span className="text-lg text-gray-600">/day</span>
                  </p>
                  {space.price.perHour && (
                    <p className="text-lg text-gray-600 mt-1">
                      or ₹{(space.price.perHour / 1000).toFixed(0)}k/hr
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Capacity</span>
                    <span className="font-semibold">{space.capacity.min}-{space.capacity.max}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Rooms</span>
                    <span className="font-semibold">
                      {space.rooms.conferenceRooms + space.rooms.meetingRooms + space.rooms.boardRooms} Total
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Type</span>
                    <span className="font-semibold">{space.type}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold">{space.location.city}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (!user) {
                      navigate('/guest/login')
                    } else if (user.role !== 'guest') {
                      alert('Only guests can book services. Please login as a guest.')
                    } else {
                      navigate(`/guest/book/corporateEventSpace/${id}`)
                    }
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3"
                >
                  Book Now
                </button>
                <button className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Request Callback
                </button>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <a href={`tel:${space.contactInfo.phone}`} className="flex items-center text-gray-700 hover:text-blue-600">
                    <span className="mr-2">📞</span>
                    {space.contactInfo.phone}
                  </a>
                  <a href={`mailto:${space.contactInfo.email}`} className="flex items-center text-gray-700 hover:text-blue-600">
                    <span className="mr-2">📧</span>
                    {space.contactInfo.email}
                  </a>
                  {space.contactInfo.website && (
                    <a href={space.contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-blue-600">
                      <span className="mr-2">🌐</span>
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CorporateEventSpaceDetails;

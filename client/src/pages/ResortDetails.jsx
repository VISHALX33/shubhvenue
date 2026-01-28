import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

function ResortDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [resort, setResort] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchResortDetails();
  }, [id]);

  const fetchResortDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/resorts/${id}`);
      setResort(response.data.data);
    } catch (error) {
      console.error('Error fetching resort details:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'about', name: 'About', icon: '📋' },
    { id: 'amenities', name: 'Amenities', icon: '✨' },
    { id: 'portfolio', name: 'Portfolio', icon: '🖼️' },
    { id: 'policies', name: 'Policies', icon: '📜' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
      </div>
    );
  }

  if (!resort) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Resort Not Found</h2>
          <button
            onClick={() => navigate('/venue-hall/resort')}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            Back to Resorts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/venue-hall/resort')}
          className="flex items-center text-teal-600 hover:text-teal-700 mb-6 font-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Resorts
        </button>

        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="h-96 overflow-hidden">
            <img
              src={selectedImage === 0 ? resort.mainImage : resort.images[selectedImage - 1]}
              alt={resort.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 grid grid-cols-5 gap-4">
            <img
              src={resort.mainImage}
              alt="Main"
              onClick={() => setSelectedImage(0)}
              className={`h-24 w-full object-cover rounded cursor-pointer transition-all ${
                selectedImage === 0 ? 'ring-4 ring-teal-600' : 'hover:opacity-75'
              }`}
            />
            {resort.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index + 1}`}
                onClick={() => setSelectedImage(index + 1)}
                className={`h-24 w-full object-cover rounded cursor-pointer transition-all ${
                  selectedImage === index + 1 ? 'ring-4 ring-teal-600' : 'hover:opacity-75'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tabs Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{resort.name}</h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{resort.location.area}, {resort.location.city}</span>
                    </div>
                    <span className="inline-block bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {resort.type}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="ml-2 text-xl font-bold text-gray-800">{resort.ratings.average}</span>
                    <span className="ml-1 text-gray-600">({resort.ratings.count} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'text-teal-600 border-b-2 border-teal-600'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'about' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">About This Resort</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{resort.about}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <div className="flex items-center text-teal-600 mb-2">
                          <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <h4 className="font-semibold">Rooms</h4>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{resort.rooms}</p>
                      </div>
                      
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <div className="flex items-center text-teal-600 mb-2">
                          <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <h4 className="font-semibold">Min Capacity</h4>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{resort.capacity.min}</p>
                      </div>
                      
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <div className="flex items-center text-teal-600 mb-2">
                          <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <h4 className="font-semibold">Max Capacity</h4>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{resort.capacity.max}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'amenities' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Amenities & Facilities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resort.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <svg className="w-5 h-5 text-teal-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'portfolio' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <img src={resort.mainImage} alt="Gallery" className="w-full h-48 object-cover rounded-lg" />
                      {resort.images.map((image, index) => (
                        <img key={index} src={image} alt={`Gallery ${index}`} className="w-full h-48 object-cover rounded-lg" />
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'policies' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Resort Policies</h3>
                    
                    <div className="space-y-4">
                      <div className="border-l-4 border-teal-600 pl-4">
                        <h4 className="font-semibold text-gray-800 mb-1">Check-in Time</h4>
                        <p className="text-gray-600">{resort.policies.checkIn}</p>
                      </div>
                      
                      <div className="border-l-4 border-teal-600 pl-4">
                        <h4 className="font-semibold text-gray-800 mb-1">Check-out Time</h4>
                        <p className="text-gray-600">{resort.policies.checkOut}</p>
                      </div>
                      
                      <div className="border-l-4 border-teal-600 pl-4">
                        <h4 className="font-semibold text-gray-800 mb-1">Cancellation Policy</h4>
                        <p className="text-gray-600">{resort.policies.cancellation}</p>
                      </div>
                      
                      <div className="flex items-center space-x-8">
                        <div className="flex items-center">
                          {resort.policies.pets ? (
                            <svg className="w-6 h-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          <span className="text-gray-700">Pets {resort.policies.pets ? 'Allowed' : 'Not Allowed'}</span>
                        </div>
                        
                        <div className="flex items-center">
                          {resort.policies.smoking ? (
                            <svg className="w-6 h-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          <span className="text-gray-700">Smoking {resort.policies.smoking ? 'Allowed' : 'Not Allowed'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Guest Reviews</h3>
                    <div className="space-y-4">
                      {resort.reviews.map((review, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-800">{review.userName}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Booking Information</h3>
              
              {/* Price */}
              <div className="mb-6 pb-6 border-b">
                <div className="text-3xl font-bold text-teal-600 mb-1">
                  ₹{resort.price.perDay.toLocaleString()}
                  <span className="text-lg text-gray-600 font-normal">/day</span>
                </div>
                {resort.price.perPlate && (
                  <div className="text-gray-600">
                    ₹{resort.price.perPlate}/plate
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span><strong>{resort.rooms}</strong> Rooms</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span><strong>{resort.capacity.min} - {resort.capacity.max}</strong> Guests</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>{resort.type}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{resort.location.city}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    if (!user) {
                      navigate('/guest/login')
                    } else if (user.role !== 'guest') {
                      alert('Only guests can book services. Please login as a guest.')
                    } else {
                      navigate(`/guest/book/resort/${id}`)
                    }
                  }}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Book Now
                </button>
                <button className="w-full border-2 border-teal-600 text-teal-600 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
                  Request Callback
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <a href={`tel:${resort.contactInfo.phone}`} className="flex items-center text-gray-600 hover:text-teal-600">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {resort.contactInfo.phone}
                  </a>
                  <a href={`mailto:${resort.contactInfo.email}`} className="flex items-center text-gray-600 hover:text-teal-600">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {resort.contactInfo.email}
                  </a>
                  {resort.contactInfo.website && (
                    <a href={resort.contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-teal-600">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
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

export default ResortDetails;

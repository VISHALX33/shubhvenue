import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

function FarmhouseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [farmHouse, setFarmHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchFarmHouseDetails();
  }, [id]);

  const fetchFarmHouseDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/farm-houses/${id}`);
      setFarmHouse(response.data.data);
    } catch (error) {
      console.error('Error fetching farm house details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  if (!farmHouse) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Farm House Not Found</h2>
          <button
            onClick={() => navigate('/venue-hall/farmhouse')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Back to Farm Houses
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'amenities', label: 'Amenities', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { id: 'portfolio', label: 'Portfolio', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'policies', label: 'Policies', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'reviews', label: 'Reviews', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/venue-hall/farmhouse')}
          className="flex items-center text-green-600 hover:text-green-800 mb-6 font-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Farm Houses
        </button>

        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={farmHouse.images[selectedImage]}
              alt={farmHouse.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-5 gap-2 p-4">
            {farmHouse.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${farmHouse.name} ${index + 1}`}
                className={`w-full h-24 object-cover rounded cursor-pointer transition-all ${
                  selectedImage === index ? 'ring-4 ring-green-600' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">{farmHouse.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{farmHouse.location.area}, {farmHouse.location.city} - {farmHouse.location.pincode}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="ml-2 text-lg font-semibold text-gray-700">
                      {farmHouse.ratings.average} ({farmHouse.ratings.count} reviews)
                    </span>
                  </div>
                </div>
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {farmHouse.type}
                </span>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-green-600 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                      </svg>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === 'about' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{farmHouse.about}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Min Capacity</p>
                        <p className="text-2xl font-bold text-green-600">{farmHouse.capacity.min} guests</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Max Capacity</p>
                        <p className="text-2xl font-bold text-green-600">{farmHouse.capacity.max} guests</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'amenities' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {farmHouse.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'portfolio' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Photo Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {farmHouse.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${farmHouse.name} ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                          onClick={() => setSelectedImage(index)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'policies' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Policies</h2>
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-600 pl-4">
                        <h3 className="font-semibold text-gray-800 mb-1">Check-in</h3>
                        <p className="text-gray-600">{farmHouse.policies.checkIn}</p>
                      </div>
                      <div className="border-l-4 border-green-600 pl-4">
                        <h3 className="font-semibold text-gray-800 mb-1">Check-out</h3>
                        <p className="text-gray-600">{farmHouse.policies.checkOut}</p>
                      </div>
                      <div className="border-l-4 border-green-600 pl-4">
                        <h3 className="font-semibold text-gray-800 mb-1">Cancellation Policy</h3>
                        <p className="text-gray-600">{farmHouse.policies.cancellation}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                          <svg className={`w-5 h-5 ${farmHouse.policies.pets ? 'text-green-500' : 'text-red-500'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d={farmHouse.policies.pets ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"} clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{farmHouse.policies.pets ? 'Pets Allowed' : 'No Pets'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className={`w-5 h-5 ${farmHouse.policies.smoking ? 'text-green-500' : 'text-red-500'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d={farmHouse.policies.smoking ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"} clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{farmHouse.policies.smoking ? 'Smoking Allowed' : 'No Smoking'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Guest Reviews</h2>
                    <div className="space-y-6">
                      {farmHouse.reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-800">{review.userName}</h3>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{review.comment}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="mb-6">
                <p className="text-3xl font-bold text-green-600 mb-2">
                  ₹{farmHouse.price.perDay.toLocaleString()}
                  <span className="text-lg text-gray-500 font-normal">/day</span>
                </p>
                {farmHouse.price.perPlate && (
                  <p className="text-gray-600">₹{farmHouse.price.perPlate}/plate</p>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-semibold">{farmHouse.capacity.min} - {farmHouse.capacity.max}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Type</span>
                  <span className="font-semibold">{farmHouse.type}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold">{farmHouse.location.city}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  if (!user) {
                    navigate('/guest/login')
                  } else if (user.role !== 'guest') {
                    alert('Only guests can book services. Please login as a guest.')
                  } else {
                    navigate(`/guest/book/farmhouse/${id}`)
                  }
                }}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold mb-3"
              >
                Book Now
              </button>
              <button className="w-full border-2 border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold">
                Request Callback
              </button>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  {farmHouse.contactInfo.phone && (
                    <a href={`tel:${farmHouse.contactInfo.phone}`} className="flex items-center text-gray-600 hover:text-green-600">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {farmHouse.contactInfo.phone}
                    </a>
                  )}
                  {farmHouse.contactInfo.email && (
                    <a href={`mailto:${farmHouse.contactInfo.email}`} className="flex items-center text-gray-600 hover:text-green-600">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {farmHouse.contactInfo.email}
                    </a>
                  )}
                  {farmHouse.contactInfo.website && (
                    <a href={`https://${farmHouse.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-green-600">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      {farmHouse.contactInfo.website}
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

export default FarmhouseDetails;

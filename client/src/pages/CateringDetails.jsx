import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

const CateringDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [catering, setCatering] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchCateringDetails();
  }, [id]);

  const fetchCateringDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/catering/${id}`);
      setCatering(response.data.data);
    } catch (error) {
      console.error('Error fetching catering details:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  const tabs = [
    { id: 'about', name: 'About', icon: '📋' },
    { id: 'menu', name: 'Menu', icon: '🍽️' },
    { id: 'packages', name: 'Packages', icon: '📦' },
    { id: 'features', name: 'Features', icon: '✨' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-red-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
      </div>
    );
  }

  if (!catering) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-red-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Catering Service Not Found</h2>
          <button
            onClick={() => navigate('/event-services/catering')}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Back to Caterings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="relative h-96">
            <img
              src={catering.images[selectedImage]}
              alt={catering.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-6 gap-2 p-4">
            {catering.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-4 ring-orange-600' : 'ring-2 ring-gray-200'
                }`}
              >
                <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl font-bold text-gray-800">{catering.name}</h1>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {catering.type}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <svg className="w-5 h-5 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{catering.location.area}, {catering.location.city}</span>
                </div>

                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(catering.ratings.average)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {catering.ratings.average.toFixed(1)} ({catering.ratings.count} reviews)
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-orange-600 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">About This Service</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{catering.about}</p>
                    
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{catering.experience} Years</div>
                        <div className="text-sm text-gray-600">Experience</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{catering.minimumGuests}-{catering.maximumGuests}</div>
                        <div className="text-sm text-gray-600">Guest Capacity</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{catering.servingStyle}</div>
                        <div className="text-sm text-gray-600">Serving Style</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{catering.cuisineTypes.length}</div>
                        <div className="text-sm text-gray-600">Cuisines</div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-bold text-gray-800 mb-3">Cuisines Offered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {catering.cuisineTypes.map((cuisine, index) => (
                          <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                            {cuisine}
                          </span>
                        ))}
                      </div>
                    </div>

                    {catering.specialties.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-bold text-gray-800 mb-3">Specialties:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {catering.specialties.map((specialty, index) => (
                            <div key={index} className="flex items-center text-gray-700">
                              <span className="text-orange-600 mr-2">🌟</span>
                              {specialty}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Menu Tab */}
                {activeTab === 'menu' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Menu Items</h3>
                    <div className="space-y-6">
                      {catering.menuItems.map((menu, index) => (
                        <div key={index} className="bg-orange-50 p-4 rounded-lg">
                          <h4 className="font-bold text-orange-800 mb-3">{menu.category}</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {menu.items.map((item, idx) => (
                              <div key={idx} className="flex items-center text-gray-700">
                                <span className="text-orange-600 mr-2">•</span>
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {catering.liveCounters.length > 0 && (
                      <div className="mt-6 bg-orange-50 border border-orange-200 p-4 rounded-lg">
                        <h4 className="font-bold text-orange-800 mb-3">🔥 Live Counters Available:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {catering.liveCounters.map((counter, index) => (
                            <div key={index} className="flex items-center text-gray-700 font-medium">
                              <span className="text-orange-600 mr-2">👨‍🍳</span>
                              {counter}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Packages Tab */}
                {activeTab === 'packages' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Catering Packages</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Basic Package */}
                      <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-orange-600 transition-colors">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">Basic Package</h4>
                        <div className="text-3xl font-bold text-orange-600 mb-4">
                          ₹{catering.packageDetails.basic.price}
                          <span className="text-sm text-gray-600">/plate</span>
                        </div>
                        <h5 className="font-semibold text-gray-700 mb-2">Includes:</h5>
                        <ul className="space-y-2">
                          {catering.packageDetails.basic.includes.map((item, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600">
                              <svg className="w-4 h-4 text-orange-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Premium Package */}
                      <div className="border-2 border-orange-600 rounded-lg p-6 relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          POPULAR
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">Premium Package</h4>
                        <div className="text-3xl font-bold text-orange-600 mb-4">
                          ₹{catering.packageDetails.premium.price}
                          <span className="text-sm text-gray-600">/plate</span>
                        </div>
                        <h5 className="font-semibold text-gray-700 mb-2">Includes:</h5>
                        <ul className="space-y-2">
                          {catering.packageDetails.premium.includes.map((item, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600">
                              <svg className="w-4 h-4 text-orange-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Luxury Package */}
                      <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-orange-600 transition-colors">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">Luxury Package</h4>
                        <div className="text-3xl font-bold text-orange-600 mb-4">
                          ₹{catering.packageDetails.luxury.price}
                          <span className="text-sm text-gray-600">/plate</span>
                        </div>
                        <h5 className="font-semibold text-gray-700 mb-2">Includes:</h5>
                        <ul className="space-y-2">
                          {catering.packageDetails.luxury.includes.map((item, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600">
                              <svg className="w-4 h-4 text-orange-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {catering.features.map((feature, index) => (
                        <div key={index} className="bg-orange-50 px-4 py-3 rounded-lg flex items-center">
                          <svg className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {catering.equipmentIncluded.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-bold text-gray-800 mb-3">Equipment Included:</h4>
                        <div className="grid md:grid-cols-3 gap-2">
                          {catering.equipmentIncluded.map((equipment, index) => (
                            <div key={index} className="bg-orange-50 px-3 py-2 rounded-lg text-center text-sm text-gray-700">
                              {equipment}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {catering.staffIncluded && (
                      <div className="mt-6 bg-orange-50 border border-orange-200 p-4 rounded-lg">
                        <h4 className="font-bold text-orange-800 mb-3">👥 Professional Staff Included:</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{catering.staffCount.cooks}</div>
                            <div className="text-sm text-gray-600">Cooks</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{catering.staffCount.servers}</div>
                            <div className="text-sm text-gray-600">Servers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{catering.staffCount.helpers}</div>
                            <div className="text-sm text-gray-600">Helpers</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h3>
                    <div className="space-y-4">
                      {catering.reviews.map((review, index) => (
                        <div key={index} className="bg-orange-50 p-6 rounded-lg">
                          <div className="flex items-center mb-3">
                            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                              {review.userName.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{review.userName}</h4>
                              <div className="flex items-center">
                                {renderStars(review.rating)}
                                <span className="text-sm text-gray-500 ml-2">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
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
                <h3 className="text-xl font-bold text-gray-800 mb-4">Pricing</h3>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-orange-600">
                    ₹{catering.pricePerPlate}
                  </div>
                  <div className="text-gray-600 text-sm">per plate</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium">{catering.experience} Years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Serving Style</span>
                    <span className="font-medium">{catering.servingStyle}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Min Guests</span>
                    <span className="font-medium">{catering.minimumGuests}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Max Guests</span>
                    <span className="font-medium">{catering.maximumGuests}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Staff</span>
                    <span className="font-medium">{catering.staffIncluded ? 'Included ✓' : 'Not Included'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium">{catering.location.city}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (!user) {
                      navigate('/guest/login')
                    } else if (user.role !== 'guest') {
                      alert('Only guests can book services. Please login as a guest.')
                    } else {
                      navigate(`/guest/book/catering/${id}`)
                    }
                  }}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium mb-3"
                >
                  Book Now
                </button>
                <button className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-lg hover:bg-orange-50 transition-colors font-medium">
                  Request Quote
                </button>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {catering.contactInfo.phone && (
                    <a href={`tel:${catering.contactInfo.phone}`} className="flex items-center text-gray-600 hover:text-orange-600">
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {catering.contactInfo.phone}
                    </a>
                  )}
                  {catering.contactInfo.email && (
                    <a href={`mailto:${catering.contactInfo.email}`} className="flex items-center text-gray-600 hover:text-orange-600">
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {catering.contactInfo.email}
                    </a>
                  )}
                  {catering.contactInfo.whatsapp && (
                    <a href={`https://wa.me/${catering.contactInfo.whatsapp}`} className="flex items-center text-gray-600 hover:text-orange-600">
                      <span className="w-5 h-5 mr-3">💬</span>
                      WhatsApp
                    </a>
                  )}
                  {catering.contactInfo.instagram && (
                    <a href={`https://instagram.com/${catering.contactInfo.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-orange-600">
                      <span className="w-5 h-5 mr-3">📸</span>
                      {catering.contactInfo.instagram}
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
};

export default CateringDetails;

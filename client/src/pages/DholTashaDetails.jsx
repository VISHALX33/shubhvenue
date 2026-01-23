import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const DholTashaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dholTasha, setDholTasha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchDholTashaDetails();
  }, [id]);

  const fetchDholTashaDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/dhol-tasha/${id}`);
      setDholTasha(response.data.data);
    } catch (error) {
      console.error('Error fetching dhol tasha details:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'about', name: 'About', icon: '📋' },
    { id: 'instruments', name: 'Instruments', icon: '🥁' },
    { id: 'performances', name: 'Performances', icon: '🎭' },
    { id: 'formations', name: 'Formations', icon: '💫' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
      </div>
    );
  }

  if (!dholTasha) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Dhol Tasha Group not found</h2>
          <button
            onClick={() => navigate('/event-services/dhol-tasha')}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
          >
            Back to Listing
          </button>
        </div>
      </div>
    );
  }

  const allImages = [dholTasha.mainImage, ...dholTasha.images];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <img
                src={allImages[selectedImage]}
                alt={dholTasha.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              {allImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${dholTasha.name} ${index + 1}`}
                  className={`w-full h-32 object-cover rounded-lg cursor-pointer transition-all ${
                    selectedImage === index ? 'ring-4 ring-orange-600' : 'hover:opacity-75'
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{dholTasha.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {dholTasha.type}
                </span>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{dholTasha.location.area}, {dholTasha.location.city}, {dholTasha.location.state}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(dholTasha.ratings.average) ? 'text-yellow-500' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600">({dholTasha.ratings.count} reviews)</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-orange-600 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About {dholTasha.name}</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">{dholTasha.about}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Group Members</div>
                        <div className="text-2xl font-bold text-orange-600">{dholTasha.groupMembers}</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Dhol Players</div>
                        <div className="text-2xl font-bold text-orange-600">{dholTasha.dholPlayers}</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Tasha Players</div>
                        <div className="text-2xl font-bold text-orange-600">{dholTasha.tashaPlayers}</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Experience</div>
                        <div className="text-2xl font-bold text-orange-600">{dholTasha.experience} Years</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {dholTasha.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      {dholTasha.choreography && (
                        <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Choreography Included
                        </div>
                      )}
                      {dholTasha.lightingIncluded && (
                        <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Lighting Included
                        </div>
                      )}
                      {dholTasha.soundSystemIncluded && (
                        <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Sound System Included
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Instruments Tab */}
                {activeTab === 'instruments' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Musical Instruments</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {dholTasha.instruments.map((instrument, index) => (
                        <div key={index} className="flex items-center bg-orange-50 p-4 rounded-lg">
                          <svg className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-800 font-medium">{instrument}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Performances Tab */}
                {activeTab === 'performances' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Performance Types</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dholTasha.performances.map((performance, index) => (
                        <div key={index} className="flex items-center bg-orange-50 p-4 rounded-lg">
                          <span className="text-3xl mr-4">🎭</span>
                          <span className="text-gray-800 font-medium text-lg">{performance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formations Tab */}
                {activeTab === 'formations' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Choreographic Formations</h2>
                    {dholTasha.formations && dholTasha.formations.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dholTasha.formations.map((formation, index) => (
                          <div key={index} className="bg-orange-50 p-4 rounded-lg flex items-center">
                            <span className="text-2xl mr-3">💫</span>
                            <span className="text-gray-800 font-medium">{formation}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No specific formations listed.</p>
                    )}
                    
                    {dholTasha.costumes.included && (
                      <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Costumes</h3>
                        <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium text-lg">Professional costumes included in the package</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {dholTasha.costumes.types.map((type, index) => (
                            <div key={index} className="bg-orange-50 p-4 rounded-lg flex items-center">
                              <span className="text-2xl mr-3">👔</span>
                              <span className="text-gray-800 font-medium">{type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
                    {dholTasha.reviews && dholTasha.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {dholTasha.reviews.map((review, index) => (
                          <div key={index} className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                {review.userName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">{review.userName}</div>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No reviews yet.</p>
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
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing</h3>
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-1">Price per event</div>
                  <div className="text-3xl font-bold text-orange-600">₹{(dholTasha.price.perEvent / 1000).toFixed(0)}k</div>
                  {dholTasha.price.perHour && (
                    <div className="text-sm text-gray-600 mt-2">₹{(dholTasha.price.perHour / 1000).toFixed(1)}k per hour</div>
                  )}
                </div>

                <div className="space-y-3 mb-6 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Group Members</span>
                    <span className="font-semibold text-gray-800">{dholTasha.groupMembers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dhol Players</span>
                    <span className="font-semibold text-gray-800">{dholTasha.dholPlayers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tasha Players</span>
                    <span className="font-semibold text-gray-800">{dholTasha.tashaPlayers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-800">
                      {dholTasha.duration.minimum}-{dholTasha.duration.maximum || dholTasha.duration.minimum} hrs
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Choreography</span>
                    <span className="font-semibold text-gray-800">{dholTasha.choreography ? 'Included' : 'Not Included'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold text-gray-800">{dholTasha.location.city}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (!user) {
                      navigate('/guest/login')
                    } else if (user.role !== 'guest') {
                      alert('Only guests can book services. Please login as a guest.')
                    } else {
                      navigate(`/guest/book/choreographer/${id}`)
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
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${dholTasha.contactInfo.phone}`}
                    className="flex items-center text-gray-700 hover:text-orange-600"
                  >
                    <svg className="w-5 h-5 mr-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {dholTasha.contactInfo.phone}
                  </a>
                  <a
                    href={`mailto:${dholTasha.contactInfo.email}`}
                    className="flex items-center text-gray-700 hover:text-orange-600"
                  >
                    <svg className="w-5 h-5 mr-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {dholTasha.contactInfo.email}
                  </a>
                  {dholTasha.contactInfo.whatsapp && (
                    <a
                      href={`https://wa.me/${dholTasha.contactInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-orange-600"
                    >
                      <svg className="w-5 h-5 mr-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 00-8 8c0 1.85.63 3.55 1.69 4.9L2.08 18l3.15-1.6A8 8 0 1010 2zm4.54 11.54c-.2.55-1.17 1.06-1.61 1.1-.44.04-.88.2-2.95-.61-2.47-.97-4.07-3.47-4.19-3.63-.12-.16-1.01-1.34-1.01-2.56 0-1.22.64-1.82.86-2.07.22-.25.48-.31.64-.31.16 0 .32 0 .46.01.15 0 .34-.06.53.41.2.47.67 1.63.73 1.75.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.57-.14 1.12z" />
                      </svg>
                      WhatsApp
                    </a>
                  )}
                  {dholTasha.contactInfo.instagram && (
                    <a
                      href={`https://instagram.com/${dholTasha.contactInfo.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-orange-600"
                    >
                      <svg className="w-5 h-5 mr-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2c2.17 0 2.43.01 3.29.05.85.04 1.43.18 1.94.38.53.21.98.49 1.43.94.45.45.73.9.94 1.43.2.51.34 1.09.38 1.94.04.86.05 1.12.05 3.29s-.01 2.43-.05 3.29c-.04.85-.18 1.43-.38 1.94-.21.53-.49.98-.94 1.43-.45.45-.9.73-1.43.94-.51.2-1.09.34-1.94.38-.86.04-1.12.05-3.29.05s-2.43-.01-3.29-.05c-.85-.04-1.43-.18-1.94-.38-.53-.21-.98-.49-1.43-.94-.45-.45-.73-.9-.94-1.43-.2-.51-.34-1.09-.38-1.94C2.01 12.43 2 12.17 2 10s.01-2.43.05-3.29c.04-.85.18-1.43.38-1.94.21-.53.49-.98.94-1.43.45-.45.9-.73 1.43-.94.51-.2 1.09-.34 1.94-.38C7.57 2.01 7.83 2 10 2zm0 1.44c-2.14 0-2.39.01-3.23.05-.78.04-1.2.17-1.48.28-.37.14-.64.32-.92.6-.28.28-.46.55-.6.92-.11.28-.24.7-.28 1.48-.04.84-.05 1.09-.05 3.23s.01 2.39.05 3.23c.04.78.17 1.2.28 1.48.14.37.32.64.6.92.28.28.55.46.92.6.28.11.7.24 1.48.28.84.04 1.09.05 3.23.05s2.39-.01 3.23-.05c.78-.04 1.2-.17 1.48-.28.37-.14.64-.32.92-.6.28-.28.46-.55.6-.92.11-.28.24-.7.28-1.48.04-.84.05-1.09.05-3.23s-.01-2.39-.05-3.23c-.04-.78-.17-1.2-.28-1.48-.14-.37-.32-.64-.6-.92-.28-.28-.55-.46-.92-.6-.28-.11-.7-.24-1.48-.28C12.39 3.45 12.14 3.44 10 3.44z" />
                        <circle cx="10" cy="10" r="2.5" />
                        <circle cx="14.5" cy="5.5" r="1" />
                      </svg>
                      Instagram
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

export default DholTashaDetails;

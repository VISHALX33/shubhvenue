import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShehnaiDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shehnai, setShehnai] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchShehnaiDetails();
  }, [id]);

  const fetchShehnaiDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/shehnai/${id}`);
      setShehnai(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shehnai details:', error);
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'about', name: 'About', icon: '📋' },
    { id: 'instruments', name: 'Instruments', icon: '🎺' },
    { id: 'musicstyle', name: 'Music Style', icon: '🎵' },
    { id: 'performances', name: 'Performances', icon: '🎭' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!shehnai) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Shehnai Group Not Found</h2>
          <button
            onClick={() => navigate('/event-services/shehnai')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Back to Shehnai Groups
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/event-services/shehnai')}
          className="mb-6 flex items-center text-red-600 hover:text-red-700 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Shehnai Groups
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="relative h-96">
                <img
                  src={shehnai.images[selectedImage]}
                  alt={shehnai.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 p-4 overflow-x-auto">
                {shehnai.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${shehnai.name} ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 object-cover rounded cursor-pointer transition-all ${
                      selectedImage === index ? 'ring-4 ring-red-600' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Title & Basic Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{shehnai.name}</h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                      {shehnai.type}
                    </span>
                    <span className="inline-flex items-center bg-red-50 text-red-700 text-sm font-medium px-3 py-1 rounded-full">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                      </svg>
                      {shehnai.musicStyle} Music
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{shehnai.location.area}, {shehnai.location.city}, {shehnai.location.state}</span>
              </div>

              {shehnai.ratings && (
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(shehnai.ratings.average) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {shehnai.ratings.average} ({shehnai.ratings.count} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg mb-6">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 min-w-max px-6 py-4 text-center font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-red-600 border-b-2 border-red-600'
                          : 'text-gray-600 hover:text-red-600'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About Us</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">{shehnai.about}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Group Members</div>
                        <div className="text-2xl font-bold text-red-600">{shehnai.groupMembers}</div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Shehnai Players</div>
                        <div className="text-2xl font-bold text-red-600">{shehnai.shehnaiPlayers}</div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Duration (hrs)</div>
                        <div className="text-2xl font-bold text-red-600">{shehnai.duration.minimum}-{shehnai.duration.maximum || shehnai.duration.minimum}</div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Experience</div>
                        <div className="text-2xl font-bold text-red-600">{shehnai.experience}+ yrs</div>
                      </div>
                    </div>

                    {shehnai.features && shehnai.features.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Features & Highlights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {shehnai.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Instruments Tab */}
                {activeTab === 'instruments' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Musical Instruments</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {shehnai.instruments.map((instrument, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 font-medium">{instrument}</span>
                        </div>
                      ))}
                    </div>

                    {shehnai.accompaniment && shehnai.accompaniment.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Accompaniment Musicians</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {shehnai.accompaniment.map((musician, index) => (
                            <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg">
                              <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                              </svg>
                              <span className="text-gray-700">{musician}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {shehnai.costumes && shehnai.costumes.included && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Traditional Costumes Included</h3>
                        <div className="flex flex-wrap gap-2">
                          {shehnai.costumes.types.map((type, index) => (
                            <span key={index} className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Music Style Tab */}
                {activeTab === 'musicstyle' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Music Style & Specialty</h2>
                    
                    <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
                      <div className="flex items-center mb-2">
                        <svg className="w-6 h-6 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                        </svg>
                        <h3 className="text-xl font-bold text-gray-800">Primary Style: {shehnai.musicStyle}</h3>
                      </div>
                      <p className="text-gray-700 mt-2">
                        {shehnai.musicStyle === 'Classical' && 'Specializing in pure classical Indian music with traditional ragas and compositions. Our shehnai maestros are trained in the authentic classical tradition, bringing the rich heritage of Indian classical music to your special occasions.'}
                        {shehnai.musicStyle === 'Traditional' && 'Rooted in traditional Indian music, perfect for weddings and religious ceremonies. We bring the authentic sound of traditional shehnai music that has graced auspicious occasions for centuries.'}
                        {shehnai.musicStyle === 'Fusion' && 'A unique blend of traditional shehnai with contemporary music elements. We combine the soulful sound of shehnai with modern instrumentation, creating an innovative musical experience.'}
                        {shehnai.musicStyle === 'Religious' && 'Specialized in devotional and religious music for temple ceremonies and spiritual occasions. Our performances create a sacred atmosphere perfect for religious functions.'}
                        {shehnai.musicStyle === 'Contemporary' && 'Modern interpretations of shehnai music incorporating current musical trends while respecting traditional roots.'}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-bold text-gray-800 mb-2">Musical Heritage</h4>
                        <p className="text-gray-600">
                          The shehnai is a traditional Indian wind instrument that has been an integral part of Indian weddings and religious ceremonies for centuries. Its melodious sound is considered auspicious and is believed to bring blessings.
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-bold text-gray-800 mb-2">Performance Expertise</h4>
                        <p className="text-gray-600">
                          Our ensemble specializes in creating the perfect musical atmosphere for various occasions, from intimate ceremonies to grand celebrations. With {shehnai.experience}+ years of experience, we understand the importance of timing and musical selection for each moment.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Performances Tab */}
                {activeTab === 'performances' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Performances</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {shehnai.performances.map((performance, index) => (
                        <div key={index} className="flex items-start p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
                          <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <h3 className="font-semibold text-gray-800">{performance}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
                    {shehnai.reviews && shehnai.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {shehnai.reviews.map((review, index) => (
                          <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                                  {review.userName.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800">{review.userName}</h4>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
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
                <h3 className="text-xl font-bold text-gray-800 mb-4">Pricing</h3>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    ₹{shehnai.price.perEvent.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Per Event</div>
                </div>
                {shehnai.price.perHour && (
                  <div className="mb-4 pb-4 border-b">
                    <div className="text-xl font-semibold text-gray-700">
                      ₹{shehnai.price.perHour.toLocaleString()}/hour
                    </div>
                    <div className="text-sm text-gray-600">Hourly Rate</div>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Group Members:</span>
                    <span className="font-semibold text-gray-800">{shehnai.groupMembers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shehnai Players:</span>
                    <span className="font-semibold text-gray-800">{shehnai.shehnaiPlayers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Music Style:</span>
                    <span className="font-semibold text-gray-800">{shehnai.musicStyle}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold text-gray-800">{shehnai.duration.minimum}-{shehnai.duration.maximum || shehnai.duration.minimum} hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Accompaniment:</span>
                    <span className="font-semibold text-gray-800">{shehnai.accompaniment?.length || 0} musicians</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold text-gray-800">{shehnai.location.city}</span>
                  </div>
                </div>

                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors mb-3">
                  Book Now
                </button>
                <button className="w-full bg-white hover:bg-gray-50 text-red-600 font-semibold py-3 px-6 rounded-lg border-2 border-red-600 transition-colors">
                  Request Quote
                </button>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Details</h3>
                <div className="space-y-3">
                  <a href={`tel:${shehnai.contactInfo.phone}`} className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {shehnai.contactInfo.phone}
                  </a>
                  <a href={`mailto:${shehnai.contactInfo.email}`} className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {shehnai.contactInfo.email}
                  </a>
                  {shehnai.contactInfo.whatsapp && (
                    <a href={`https://wa.me/${shehnai.contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      WhatsApp
                    </a>
                  )}
                  {shehnai.contactInfo.instagram && (
                    <a href={`https://instagram.com/${shehnai.contactInfo.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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

export default ShehnaiDetails;

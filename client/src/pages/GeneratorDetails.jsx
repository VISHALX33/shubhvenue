import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const GeneratorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [generator, setGenerator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchGeneratorDetails();
  }, [id]);

  const fetchGeneratorDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/generators/${id}`);
      setGenerator(response.data.data);
    } catch (error) {
      console.error('Error fetching generator details:', error);
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
    { id: 'features', name: 'Features', icon: '✨' },
    { id: 'specifications', name: 'Specifications', icon: '⚙️' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-emerald-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  if (!generator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-emerald-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Generator Not Found</h2>
          <button
            onClick={() => navigate('/event-services/generator')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Generators
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="relative h-96">
            <img
              src={generator.images[selectedImage]}
              alt={generator.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-6 gap-2 p-4">
            {generator.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-4 ring-green-600' : 'ring-2 ring-gray-200'
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
                  <h1 className="text-3xl font-bold text-gray-800">{generator.name}</h1>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {generator.type}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{generator.location.area}, {generator.location.city}</span>
                </div>

                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(generator.ratings.average)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {generator.ratings.average.toFixed(1)} ({generator.ratings.count} reviews)
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
                          ? 'border-green-600 text-green-600'
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
                    <h3 className="text-xl font-bold text-gray-800 mb-4">About This Generator</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{generator.about}</p>
                    
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{generator.capacity} kVA</div>
                        <div className="text-sm text-gray-600">Capacity</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{generator.runTime}hrs</div>
                        <div className="text-sm text-gray-600">Runtime</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{generator.noiseLevel} dB</div>
                        <div className="text-sm text-gray-600">Noise Level</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{generator.fuelType}</div>
                        <div className="text-sm text-gray-600">Fuel Type</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {generator.features.map((feature, index) => (
                        <div key={index} className="bg-green-50 px-4 py-3 rounded-lg flex items-center">
                          <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {generator.technician && (
                      <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-lg">
                        <div className="flex items-center text-green-800">
                          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-bold">Professional Technician Included</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Specifications Tab */}
                {activeTab === 'specifications' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Technical Specifications</h3>
                    <div className="space-y-3">
                      {generator.specifications.map((spec, index) => (
                        <div key={index} className="bg-green-50 p-4 rounded-lg">
                          <span className="text-gray-700">{spec}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Fuel Consumption</div>
                        <div className="text-lg font-bold text-green-600">{generator.fuelConsumption} L/hr</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Setup Time</div>
                        <div className="text-lg font-bold text-green-600">{generator.setupTime} hours</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h3>
                    <div className="space-y-4">
                      {generator.reviews.map((review, index) => (
                        <div key={index} className="bg-green-50 p-6 rounded-lg">
                          <div className="flex items-center mb-3">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
                  <div className="text-3xl font-bold text-green-600">
                    ₹{(generator.price.perDay / 1000).toFixed(1)}k
                  </div>
                  <div className="text-gray-600 text-sm">per day</div>
                  {generator.price.perEvent && (
                    <div className="mt-2 text-sm text-gray-600">
                      Per Event: ₹{(generator.price.perEvent / 1000).toFixed(1)}k
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Capacity</span>
                    <span className="font-medium">{generator.capacity} kVA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Fuel Type</span>
                    <span className="font-medium">{generator.fuelType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Runtime</span>
                    <span className="font-medium">{generator.runTime} hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Noise Level</span>
                    <span className="font-medium">{generator.noiseLevel} dB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Technician</span>
                    <span className="font-medium">{generator.technician ? 'Included ✓' : 'Not Included'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium">{generator.location.city}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (!user) {
                      navigate('/guest/login')
                    } else if (user.role !== 'guest') {
                      alert('Only guests can book services. Please login as a guest.')
                    } else {
                      navigate(`/guest/book/generator/${id}`)
                    }
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium mb-3"
                >
                  Book Now
                </button>
                <button className="w-full border-2 border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50 transition-colors font-medium">
                  Request Quote
                </button>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {generator.contactInfo.phone && (
                    <a href={`tel:${generator.contactInfo.phone}`} className="flex items-center text-gray-600 hover:text-green-600">
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {generator.contactInfo.phone}
                    </a>
                  )}
                  {generator.contactInfo.email && (
                    <a href={`mailto:${generator.contactInfo.email}`} className="flex items-center text-gray-600 hover:text-green-600">
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {generator.contactInfo.email}
                    </a>
                  )}
                  {generator.contactInfo.whatsapp && (
                    <a href={`https://wa.me/${generator.contactInfo.whatsapp}`} className="flex items-center text-gray-600 hover:text-green-600">
                      <span className="w-5 h-5 mr-3">💬</span>
                      WhatsApp
                    </a>
                  )}
                  {generator.contactInfo.instagram && (
                    <a href={`https://instagram.com/${generator.contactInfo.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-green-600">
                      <span className="w-5 h-5 mr-3">📸</span>
                      {generator.contactInfo.instagram}
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

export default GeneratorDetails;

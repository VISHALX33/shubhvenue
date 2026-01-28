import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import { 
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaWhatsapp, FaInstagram,
  FaStar, FaUsers, FaCheckCircle, FaBriefcase, FaAward, FaHeart, FaShare,
  FaArrowLeft
} from 'react-icons/fa';

const WeddingPlannerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planner, setPlanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchPlannerDetails();
  }, [id]);

  const fetchPlannerDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/wedding-planner/${id}`);
      setPlanner(response.data.data);
    } catch (error) {
      console.error('Error fetching wedding planner details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
      </div>
    );
  }

  if (!planner) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Wedding Planner Not Found</h2>
          <button onClick={() => navigate('/event-services/wedding-planner')} className="text-pink-600 hover:underline">
            Back to Wedding Planners
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About', icon: '📋' },
    { id: 'services', label: 'Services', icon: '✨' },
    { id: 'packages', label: 'Packages', icon: '💰' },
    { id: 'specializations', label: 'Specializations', icon: '⭐' },
    { id: 'portfolio', label: 'Portfolio', icon: '📸' },
    { id: 'reviews', label: 'Reviews', icon: '💬' }
  ];

  // Calculate price range
  const prices = planner.packages.map(pkg => pkg.price);
  const minPrice = Math.min(...prices);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={() => navigate('/event-services/wedding-planner')}
            className="flex items-center text-pink-600 hover:text-pink-700"
          >
            <FaArrowLeft className="mr-2" />
            Back to Wedding Planners
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Image */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img 
                src={planner.images[selectedImage]} 
                alt={planner.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 gap-4">
              {planner.images.map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-44 rounded-lg overflow-hidden cursor-pointer ${selectedImage === index ? 'ring-4 ring-pink-600' : ''}`}
                >
                  <img src={img} alt={`${planner.name} ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-gray-800">{planner.name}</h1>
                <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {planner.type}
                </span>
                <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {planner.planningScope}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-3">
                <FaMapMarkerAlt className="mr-2 text-pink-600" />
                <span>{planner.location.area}, {planner.location.city}, {planner.location.state}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-bold text-gray-800">{planner.ratings.average}</span>
                  <span className="text-gray-600 ml-2">({planner.ratings.count} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="p-3 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition">
                <FaHeart />
              </button>
              <button className="p-3 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition">
                <FaShare />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'text-pink-600 border-b-2 border-pink-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">About {planner.name}</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{planner.about}</p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-pink-50 p-4 rounded-lg text-center">
                    <FaUsers className="text-3xl text-pink-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">{planner.teamSize}</p>
                    <p className="text-sm text-gray-600">Team Members</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg text-center">
                    <FaCheckCircle className="text-3xl text-pink-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">{planner.weddingsCompleted}+</p>
                    <p className="text-sm text-gray-600">Weddings</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg text-center">
                    <FaBriefcase className="text-3xl text-pink-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">{planner.experience}</p>
                    <p className="text-sm text-gray-600">Years</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg text-center">
                    <FaAward className="text-3xl text-pink-600 mx-auto mb-2" />
                    <p className="text-sm font-bold text-gray-800">{planner.planningScope}</p>
                    <p className="text-xs text-gray-600">Scope</p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-bold mb-3">Why Choose Us</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {planner.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <FaCheckCircle className="text-pink-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {planner.services.map((service, index) => (
                    <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                      <FaCheckCircle className="text-pink-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Packages Tab */}
            {activeTab === 'packages' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Our Packages</h2>
                {planner.packages.map((pkg, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 border-2 border-transparent hover:border-pink-600 transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{pkg.name}</h3>
                        <p className="text-gray-600">{pkg.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-pink-600">₹{(pkg.price / 1000).toFixed(0)}k</p>
                        <p className="text-sm text-gray-500">Starting Price</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Included Services:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {pkg.services.map((service, idx) => (
                          <div key={idx} className="flex items-start">
                            <FaCheckCircle className="text-pink-500 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition">
                      Choose This Package
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Specializations Tab */}
            {activeTab === 'specializations' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Our Specializations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {planner.specializations.map((spec, index) => (
                    <div key={index} className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border-l-4 border-pink-600">
                      <h3 className="font-bold text-gray-800">{spec}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Our Portfolio</h2>
                <div className="text-center py-8">
                  <FaAward className="text-6xl text-pink-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-gray-800 mb-2">{planner.weddingsCompleted}+ Successful Weddings</p>
                  <p className="text-gray-600 mb-6">Over {planner.experience} years of creating unforgettable wedding experiences</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <p className="text-3xl font-bold text-pink-600">{planner.teamSize}</p>
                      <p className="text-sm text-gray-600">Team Members</p>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <p className="text-3xl font-bold text-pink-600">{planner.ratings.average}</p>
                      <p className="text-sm text-gray-600">Average Rating</p>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <p className="text-3xl font-bold text-pink-600">{planner.ratings.count}</p>
                      <p className="text-sm text-gray-600">Happy Clients</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Client Reviews</h2>
                {planner.reviews && planner.reviews.length > 0 ? (
                  planner.reviews.map((review, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                          {review.userName?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{review.userName || 'Anonymous'}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              {/* Pricing Overview */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-bold text-gray-800 mb-2">Package Pricing</h3>
                <p className="text-3xl font-bold text-pink-600 mb-1">Starting from ₹{(minPrice / 1000).toFixed(0)}k</p>
                <p className="text-sm text-gray-600">{planner.packages.length} packages available</p>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex items-center">
                  <FaUsers className="text-pink-600 mr-3" />
                  <div>
                    <p className="text-xs text-gray-600">Team Size</p>
                    <p className="font-semibold">{planner.teamSize} Members</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-pink-600 mr-3" />
                  <div>
                    <p className="text-xs text-gray-600">Weddings Completed</p>
                    <p className="font-semibold">{planner.weddingsCompleted}+</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaBriefcase className="text-pink-600 mr-3" />
                  <div>
                    <p className="text-xs text-gray-600">Experience</p>
                    <p className="font-semibold">{planner.experience} Years</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaAward className="text-pink-600 mr-3" />
                  <div>
                    <p className="text-xs text-gray-600">Planning Scope</p>
                    <p className="font-semibold">{planner.planningScope}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-pink-600 mr-3" />
                  <div>
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="font-semibold">{planner.location.city}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition">
                  Book Consultation
                </button>
                <button className="w-full bg-white border-2 border-pink-600 text-pink-600 hover:bg-pink-50 py-3 rounded-lg font-semibold transition">
                  Request Custom Quote
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-800 mb-3">Contact Information</h3>
                <a href={`tel:${planner.contactInfo.phone}`} className="flex items-center text-gray-700 hover:text-pink-600 transition">
                  <FaPhone className="mr-3 text-pink-600" />
                  <span>{planner.contactInfo.phone}</span>
                </a>
                <a href={`mailto:${planner.contactInfo.email}`} className="flex items-center text-gray-700 hover:text-pink-600 transition">
                  <FaEnvelope className="mr-3 text-pink-600" />
                  <span>{planner.contactInfo.email}</span>
                </a>
                {planner.contactInfo.website && (
                  <a href={`https://${planner.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-pink-600 transition">
                    <FaGlobe className="mr-3 text-pink-600" />
                    <span>{planner.contactInfo.website}</span>
                  </a>
                )}
                {planner.contactInfo.whatsapp && (
                  <a href={`https://wa.me/${planner.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-pink-600 transition">
                    <FaWhatsapp className="mr-3 text-pink-600" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {planner.contactInfo.instagram && (
                  <a href={`https://instagram.com/${planner.contactInfo.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-pink-600 transition">
                    <FaInstagram className="mr-3 text-pink-600" />
                    <span>{planner.contactInfo.instagram}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingPlannerDetails;

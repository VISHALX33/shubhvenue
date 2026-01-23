import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaWhatsapp, FaInstagram,
  FaStar, FaPalette, FaBriefcase, FaAward, FaHeart, FaShare, FaArrowLeft, FaCheckCircle
} from 'react-icons/fa';

const MehndiArtistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchArtistDetails();
  }, [id]);

  const fetchArtistDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/mehndi-artist/${id}`);
      setArtist(response.data.data);
    } catch (error) {
      console.error('Error fetching mehndi artist details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-rose-600"></div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mehndi Artist Not Found</h2>
          <button onClick={() => navigate('/event-services/mehndi-artist')} className="text-rose-600 hover:underline">
            Back to Mehndi Artists
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About', icon: '📋' },
    { id: 'styles', label: 'Mehndi Styles', icon: '🎨' },
    { id: 'packages', label: 'Packages', icon: '💰' },
    { id: 'specializations', label: 'Specializations', icon: '⭐' },
    { id: 'portfolio', label: 'Portfolio', icon: '📸' },
    { id: 'reviews', label: 'Reviews', icon: '💬' }
  ];

  // Calculate price range
  const prices = artist.packages.map(pkg => pkg.price);
  const minPrice = Math.min(...prices);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={() => navigate('/event-services/mehndi-artist')}
            className="flex items-center text-rose-600 hover:text-rose-700"
          >
            <FaArrowLeft className="mr-2" />
            Back to Mehndi Artists
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
                src={artist.images[selectedImage]} 
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 gap-4">
              {artist.images.map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-44 rounded-lg overflow-hidden cursor-pointer ${selectedImage === index ? 'ring-4 ring-rose-600' : ''}`}
                >
                  <img src={img} alt={`${artist.name} ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition duration-300" />
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
                <h1 className="text-4xl font-bold text-gray-800">{artist.name}</h1>
                <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {artist.type}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-3">
                <FaMapMarkerAlt className="mr-2 text-rose-600" />
                <span>{artist.location.area}, {artist.location.city}, {artist.location.state}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-bold text-gray-800">{artist.ratings.average}</span>
                  <span className="text-gray-600 ml-2">({artist.ratings.count} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="p-3 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition">
                <FaHeart />
              </button>
              <button className="p-3 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition">
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
                    ? 'text-rose-600 border-b-2 border-rose-600'
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
                <h2 className="text-2xl font-bold mb-4">About {artist.name}</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{artist.about}</p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-rose-50 p-4 rounded-lg text-center">
                    <FaBriefcase className="text-3xl text-rose-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">{artist.experience}</p>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-lg text-center">
                    <FaPalette className="text-3xl text-rose-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">{artist.bridalMehndiCount}+</p>
                    <p className="text-sm text-gray-600">Brides Served</p>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-lg text-center">
                    <FaAward className="text-3xl text-rose-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">{artist.teamSize}</p>
                    <p className="text-sm text-gray-600">Team Members</p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-bold mb-3">Why Choose Us</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {artist.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <FaCheckCircle className="text-rose-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mehndi Styles Tab */}
            {activeTab === 'styles' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Mehndi Styles We Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {artist.mehndiStyles.map((style, index) => (
                    <div key={index} className="flex items-center bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-lg border-l-4 border-rose-600">
                      <FaPalette className="text-rose-600 mr-3 text-2xl" />
                      <span className="text-gray-700 font-semibold">{style}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Packages Tab */}
            {activeTab === 'packages' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Our Packages</h2>
                {artist.packages.map((pkg, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 border-2 border-transparent hover:border-rose-600 transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{pkg.name}</h3>
                        <p className="text-gray-600">{pkg.description}</p>
                        {pkg.duration && (
                          <p className="text-sm text-rose-600 mt-1">⏱ Duration: {pkg.duration}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-rose-600">₹{(pkg.price / 1000).toFixed(0)}k</p>
                        <p className="text-sm text-gray-500">Package Price</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Included Services:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {pkg.services.map((service, idx) => (
                          <div key={idx} className="flex items-start">
                            <FaCheckCircle className="text-rose-500 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold transition">
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
                  {artist.specializations.map((spec, index) => (
                    <div key={index} className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-lg border-l-4 border-rose-600">
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
                  <FaPalette className="text-6xl text-rose-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-gray-800 mb-2">{artist.bridalMehndiCount}+ Brides Adorned</p>
                  <p className="text-gray-600 mb-6">Over {artist.experience} years of creating beautiful mehndi art</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-rose-50 p-4 rounded-lg">
                      <p className="text-3xl font-bold text-rose-600">{artist.teamSize}</p>
                      <p className="text-sm text-gray-600">Artists</p>
                    </div>
                    <div className="bg-rose-50 p-4 rounded-lg">
                      <p className="text-3xl font-bold text-rose-600">{artist.ratings.average}</p>
                      <p className="text-sm text-gray-600">Rating</p>
                    </div>
                    <div className="bg-rose-50 p-4 rounded-lg">
                      <p className="text-3xl font-bold text-rose-600">{artist.ratings.count}</p>
                      <p className="text-sm text-gray-600">Reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Client Reviews</h2>
                {artist.reviews && artist.reviews.length > 0 ? (
                  artist.reviews.map((review, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
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
                <p className="text-3xl font-bold text-rose-600 mb-1">Starting from ₹{(minPrice / 1000).toFixed(0)}k</p>
                <p className="text-sm text-gray-600">{artist.packages.length} package{artist.packages.length > 1 ? 's' : ''} available</p>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex items-center">
                  <FaBriefcase className="text-rose-600 mr-3" />
                  <div>
                    <p className="text-xs text-gray-600">Experience</p>
                    <p className="font-semibold">{artist.experience} Years</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaPalette className="text-rose-600 mr-3" />
                  <div>
                    <p className="text-xs text-gray-600">Brides Served</p>
                    <p className="font-semibold">{artist.bridalMehndiCount}+</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaAward className="text-rose-600 mr-3" />
                  <div>
                    <p className="text-xs text-gray-600">Team Size</p>
                    <p className="font-semibold">{artist.teamSize} Artists</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-rose-600 mr-3" />
                  <div>
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="font-semibold">{artist.location.city}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold transition">
                  Book Now
                </button>
                <button className="w-full bg-white border-2 border-rose-600 text-rose-600 hover:bg-rose-50 py-3 rounded-lg font-semibold transition">
                  Request Quote
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-800 mb-3">Contact Information</h3>
                <a href={`tel:${artist.contactInfo.phone}`} className="flex items-center text-gray-700 hover:text-rose-600 transition">
                  <FaPhone className="mr-3 text-rose-600" />
                  <span>{artist.contactInfo.phone}</span>
                </a>
                <a href={`mailto:${artist.contactInfo.email}`} className="flex items-center text-gray-700 hover:text-rose-600 transition">
                  <FaEnvelope className="mr-3 text-rose-600" />
                  <span>{artist.contactInfo.email}</span>
                </a>
                {artist.contactInfo.website && (
                  <a href={`https://${artist.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-rose-600 transition">
                    <FaGlobe className="mr-3 text-rose-600" />
                    <span>{artist.contactInfo.website}</span>
                  </a>
                )}
                {artist.contactInfo.whatsapp && (
                  <a href={`https://wa.me/${artist.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-rose-600 transition">
                    <FaWhatsapp className="mr-3 text-rose-600" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {artist.contactInfo.instagram && (
                  <a href={`https://instagram.com/${artist.contactInfo.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-rose-600 transition">
                    <FaInstagram className="mr-3 text-rose-600" />
                    <span>{artist.contactInfo.instagram}</span>
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

export default MehndiArtistDetails;

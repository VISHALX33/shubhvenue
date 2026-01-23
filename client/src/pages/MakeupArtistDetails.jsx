import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaMapMarkerAlt, 
  FaStar, 
  FaPhone, 
  FaWhatsapp, 
  FaEnvelope, 
  FaInstagram, 
  FaGlobe,
  FaPaintBrush,
  FaBriefcase,
  FaUsers,
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaCheckCircle
} from 'react-icons/fa';

const MakeupArtistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchArtistDetails();
  }, [id]);

  const fetchArtistDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/makeup-artist/${id}`);
      setArtist(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error: {error || 'Artist not found'}</div>
          <button
            onClick={() => navigate('/event-services/makeup-artist')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Back to Makeup Artists
          </button>
        </div>
      </div>
    );
  }

  const minPrice = Math.min(...artist.packages.map(pkg => pkg.price));
  const maxPrice = Math.max(...artist.packages.map(pkg => pkg.price));

  const tabs = [
    { id: 'about', label: 'About', icon: FaPaintBrush },
    { id: 'styles', label: 'Makeup Styles', icon: FaCheckCircle },
    { id: 'packages', label: 'Packages', icon: FaBriefcase },
    { id: 'specializations', label: 'Specializations', icon: FaStar },
    { id: 'portfolio', label: 'Portfolio', icon: FaHeart },
    { id: 'reviews', label: 'Reviews', icon: FaStar }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/event-services/makeup-artist')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition"
          >
            <FaArrowLeft />
            <span>Back to Makeup Artists</span>
          </button>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Image */}
            <div className="relative">
              <img
                src={artist.images[selectedImage]}
                alt={artist.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition">
                  <FaHeart className="text-purple-600" />
                </button>
                <button className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition">
                  <FaShare className="text-purple-600" />
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {artist.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${artist.name} ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    className={`w-full h-32 object-cover rounded-lg cursor-pointer transition ${
                      selectedImage === index
                        ? 'ring-4 ring-purple-600 shadow-lg'
                        : 'hover:opacity-75'
                    }`}
                  />
                ))}
              </div>

              {/* Quick Info Card */}
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-lg p-6 shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{artist.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {artist.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-bold">{artist.ratings.average}</span>
                    <span className="text-gray-600">({artist.ratings.count} reviews)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-600">Location</p>
                      <p className="font-semibold text-gray-800">{artist.location.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBriefcase className="text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-600">Experience</p>
                      <p className="font-semibold text-gray-800">{artist.experience} Years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPaintBrush className="text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-600">Brides Done</p>
                      <p className="font-semibold text-gray-800">{artist.bridalMakeupCount}+</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-600">Team Size</p>
                      <p className="font-semibold text-gray-800">{artist.teamSize} Members</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Starting Price</span>
                    <span className="text-2xl font-bold text-purple-600">₹{(minPrice / 1000).toFixed(0)}k</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Packages range from ₹{(minPrice / 1000).toFixed(0)}k to ₹{(maxPrice / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex overflow-x-auto border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About {artist.name}</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{artist.about}</p>
                    
                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {artist.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <FaCheckCircle className="text-purple-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Makeup Styles Tab */}
                {activeTab === 'styles' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Makeup Styles</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {artist.makeupStyles.map((style, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-4 rounded-lg text-center hover:shadow-md transition"
                        >
                          <FaPaintBrush className="text-3xl text-purple-600 mx-auto mb-2" />
                          <p className="font-semibold text-gray-800">{style}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Packages Tab */}
                {activeTab === 'packages' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Packages & Pricing</h2>
                    <div className="space-y-6">
                      {artist.packages.map((pkg, index) => (
                        <div
                          key={index}
                          className="border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition hover:border-purple-400"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-1">{pkg.name}</h3>
                              <p className="text-gray-600">{pkg.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold text-purple-600">₹{(pkg.price / 1000).toFixed(0)}k</p>
                              <p className="text-sm text-gray-600">{pkg.duration}</p>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Package Includes:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {pkg.services.map((service, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <FaCheckCircle className="text-purple-600 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{service}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <button className="mt-4 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold">
                            Book This Package
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specializations Tab */}
                {activeTab === 'specializations' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Specializations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {artist.specializations.map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-fuchsia-50 p-4 rounded-lg hover:shadow-md transition"
                        >
                          <FaCheckCircle className="text-purple-600 text-xl flex-shrink-0" />
                          <span className="font-medium text-gray-800">{spec}</span>
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
                      {artist.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Portfolio ${index + 1}`}
                            className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-xl transition"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Client Reviews</h2>
                    
                    {/* Rating Summary */}
                    <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-center gap-8">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-purple-600 mb-2">
                            {artist.ratings.average}
                          </div>
                          <div className="flex items-center justify-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={i < Math.floor(artist.ratings.average) ? 'text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">{artist.ratings.count} Reviews</p>
                        </div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {artist.reviews.map((review, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-gray-800">{review.userName}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>

                    {artist.reviews.length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <FaStar className="text-5xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {artist.contactInfo.phone && (
                    <a
                      href={`tel:${artist.contactInfo.phone}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition"
                    >
                      <FaPhone className="text-purple-600" />
                      <span>{artist.contactInfo.phone}</span>
                    </a>
                  )}
                  {artist.contactInfo.whatsapp && (
                    <a
                      href={`https://wa.me/${artist.contactInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition"
                    >
                      <FaWhatsapp className="text-green-600" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                  {artist.contactInfo.email && (
                    <a
                      href={`mailto:${artist.contactInfo.email}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition"
                    >
                      <FaEnvelope className="text-purple-600" />
                      <span className="break-all">{artist.contactInfo.email}</span>
                    </a>
                  )}
                  {artist.contactInfo.instagram && (
                    <a
                      href={`https://instagram.com/${artist.contactInfo.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-pink-600 transition"
                    >
                      <FaInstagram className="text-pink-600" />
                      <span>@{artist.contactInfo.instagram}</span>
                    </a>
                  )}
                  {artist.contactInfo.website && (
                    <a
                      href={artist.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition"
                    >
                      <FaGlobe className="text-purple-600" />
                      <span>Website</span>
                    </a>
                  )}
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-fuchsia-700 transition font-semibold">
                  Request Quote
                </button>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-bold text-gray-800">{artist.experience} Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brides Done</span>
                    <span className="font-bold text-gray-800">{artist.bridalMakeupCount}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team Size</span>
                    <span className="font-bold text-gray-800">{artist.teamSize} Members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Packages</span>
                    <span className="font-bold text-gray-800">{artist.packages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating</span>
                    <span className="font-bold text-gray-800 flex items-center gap-1">
                      {artist.ratings.average} <FaStar className="text-yellow-400 text-sm" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Location</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-purple-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">{artist.location.area}</p>
                      <p className="text-gray-600">{artist.location.city}, {artist.location.state}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeupArtistDetails;

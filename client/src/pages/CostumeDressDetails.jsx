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
  FaTshirt,
  FaBox,
  FaUsers,
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaCheckCircle
} from 'react-icons/fa';

const CostumeDressDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [costume, setCostume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchCostumeDetails();
  }, [id]);

  const fetchCostumeDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/costume-dress/${id}`);
      setCostume(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !costume) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error: {error || 'Costume rental not found'}</div>
          <button
            onClick={() => navigate('/event-services/costume-dress')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Costume Rentals
          </button>
        </div>
      </div>
    );
  }

  const minPrice = Math.min(...costume.packages.map(pkg => pkg.price));
  const maxPrice = Math.max(...costume.packages.map(pkg => pkg.price));

  const tabs = [
    { id: 'about', label: 'About', icon: FaTshirt },
    { id: 'categories', label: 'Categories', icon: FaCheckCircle },
    { id: 'packages', label: 'Packages', icon: FaBox },
    { id: 'collections', label: 'Collections', icon: FaStar },
    { id: 'portfolio', label: 'Portfolio', icon: FaHeart },
    { id: 'reviews', label: 'Reviews', icon: FaStar }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/event-services/costume-dress')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition"
          >
            <FaArrowLeft />
            <span>Back to Costume Rentals</span>
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
                src={costume.images[selectedImage]}
                alt={costume.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition">
                  <FaHeart className="text-indigo-600" />
                </button>
                <button className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition">
                  <FaShare className="text-indigo-600" />
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {costume.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${costume.name} ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    className={`w-full h-32 object-cover rounded-lg cursor-pointer transition ${
                      selectedImage === index
                        ? 'ring-4 ring-indigo-600 shadow-lg'
                        : 'hover:opacity-75'
                    }`}
                  />
                ))}
              </div>

              {/* Quick Info Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{costume.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {costume.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-bold">{costume.ratings.average}</span>
                    <span className="text-gray-600">({costume.ratings.count} reviews)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-indigo-600" />
                    <div>
                      <p className="text-xs text-gray-600">Location</p>
                      <p className="font-semibold text-gray-800">{costume.location.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBox className="text-indigo-600" />
                    <div>
                      <p className="text-xs text-gray-600">Inventory</p>
                      <p className="font-semibold text-gray-800">{costume.inventorySize}+ Items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTshirt className="text-indigo-600" />
                    <div>
                      <p className="text-xs text-gray-600">Delivered</p>
                      <p className="font-semibold text-gray-800">{costume.deliveredCount}+</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-indigo-600" />
                    <div>
                      <p className="text-xs text-gray-600">Experience</p>
                      <p className="font-semibold text-gray-800">{costume.experience} Years</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Starting Price</span>
                    <span className="text-2xl font-bold text-indigo-600">₹{(minPrice / 1000).toFixed(0)}k</span>
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
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About {costume.name}</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{costume.about}</p>
                    
                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {costume.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <FaCheckCircle className="text-indigo-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Categories Tab */}
                {activeTab === 'categories' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {costume.categories.map((category, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg text-center hover:shadow-md transition"
                        >
                          <FaTshirt className="text-3xl text-indigo-600 mx-auto mb-2" />
                          <p className="font-semibold text-gray-800">{category}</p>
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
                      {costume.packages.map((pkg, index) => (
                        <div
                          key={index}
                          className="border-2 border-indigo-200 rounded-lg p-6 hover:shadow-lg transition hover:border-indigo-400"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-1">{pkg.name}</h3>
                              <p className="text-gray-600">{pkg.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold text-indigo-600">₹{(pkg.price / 1000).toFixed(0)}k</p>
                              <p className="text-sm text-gray-600">{pkg.duration}</p>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Package Includes:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {pkg.items.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <FaCheckCircle className="text-indigo-600 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <button className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold">
                            Book This Package
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Collections Tab */}
                {activeTab === 'collections' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Collections</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {costume.collections.map((collection, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg hover:shadow-md transition"
                        >
                          <FaCheckCircle className="text-indigo-600 text-xl flex-shrink-0" />
                          <span className="font-medium text-gray-800">{collection}</span>
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
                      {costume.images.map((image, index) => (
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
                    
                    {/* Rating Summary */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-center gap-8">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-indigo-600 mb-2">
                            {costume.ratings.average}
                          </div>
                          <div className="flex items-center justify-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={i < Math.floor(costume.ratings.average) ? 'text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">{costume.ratings.count} Reviews</p>
                        </div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {costume.reviews.map((review, index) => (
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

                    {costume.reviews.length === 0 && (
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
                  {costume.contactInfo.phone && (
                    <a
                      href={`tel:${costume.contactInfo.phone}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                    >
                      <FaPhone className="text-indigo-600" />
                      <span>{costume.contactInfo.phone}</span>
                    </a>
                  )}
                  {costume.contactInfo.whatsapp && (
                    <a
                      href={`https://wa.me/${costume.contactInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition"
                    >
                      <FaWhatsapp className="text-green-600" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                  {costume.contactInfo.email && (
                    <a
                      href={`mailto:${costume.contactInfo.email}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                    >
                      <FaEnvelope className="text-indigo-600" />
                      <span className="break-all">{costume.contactInfo.email}</span>
                    </a>
                  )}
                  {costume.contactInfo.instagram && (
                    <a
                      href={`https://instagram.com/${costume.contactInfo.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-pink-600 transition"
                    >
                      <FaInstagram className="text-pink-600" />
                      <span>@{costume.contactInfo.instagram}</span>
                    </a>
                  )}
                  {costume.contactInfo.website && (
                    <a
                      href={costume.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                    >
                      <FaGlobe className="text-indigo-600" />
                      <span>Website</span>
                    </a>
                  )}
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold">
                  Request Quote
                </button>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Inventory</span>
                    <span className="font-bold text-gray-800">{costume.inventorySize}+ Items</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivered</span>
                    <span className="font-bold text-gray-800">{costume.deliveredCount}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-bold text-gray-800">{costume.experience} Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Packages</span>
                    <span className="font-bold text-gray-800">{costume.packages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating</span>
                    <span className="font-bold text-gray-800 flex items-center gap-1">
                      {costume.ratings.average} <FaStar className="text-yellow-400 text-sm" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Location</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-indigo-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">{costume.location.area}</p>
                      <p className="text-gray-600">{costume.location.city}, {costume.location.state}</p>
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

export default CostumeDressDetails;

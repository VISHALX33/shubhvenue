import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import { 
  FaCouch, FaMapMarkerAlt, FaStar, FaPhone, FaEnvelope, 
  FaGlobe, FaInstagram, FaFacebook, FaWhatsapp, FaBox,
  FaCalendarCheck, FaCheckCircle, FaArrowLeft, FaChair,
  FaUsers, FaTrophy
} from 'react-icons/fa';

function EventFurnitureDetails() {
  const { id } = useParams();
  const [furniture, setFurniture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [newReview, setNewReview] = useState({ userName: '', rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchFurnitureDetails();
  }, [id]);

  const fetchFurnitureDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/event-furniture/${id}`);
      setFurniture(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.userName.trim() || !newReview.comment.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setSubmittingReview(true);
    try {
      await axios.post(`${API_URL}/event-furniture/${id}/reviews`, newReview);
      setNewReview({ userName: '', rating: 5, comment: '' });
      fetchFurnitureDetails();
      alert('Review submitted successfully!');
    } catch (err) {
      alert('Failed to submit review: ' + err.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !furniture) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        <div className="text-red-600 text-xl">Error: {error || 'Furniture rental not found'}</div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About', icon: FaCouch },
    { id: 'categories', label: 'Categories', icon: FaChair },
    { id: 'packages', label: 'Packages', icon: FaBox },
    { id: 'furniture', label: 'Furniture Types', icon: FaTrophy },
    { id: 'portfolio', label: 'Portfolio', icon: FaCalendarCheck },
    { id: 'reviews', label: 'Reviews', icon: FaStar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/event-services/furniture-rental" 
          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-800 mb-6 font-medium"
        >
          <FaArrowLeft /> Back to Furniture Rentals
        </Link>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
          <div className="relative h-96">
            <img 
              src={furniture.mainImage} 
              alt={furniture.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                    {furniture.type}
                  </span>
                  <h1 className="text-4xl font-bold text-white mb-2">{furniture.name}</h1>
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-teal-400" />
                      <span>{furniture.location.area}, {furniture.location.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">{furniture.ratings.average}</span>
                      <span className="text-gray-300">({furniture.ratings.count} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="border-b overflow-x-auto">
                <div className="flex">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition ${
                        activeTab === tab.id
                          ? 'text-teal-600 border-b-2 border-teal-600'
                          : 'text-gray-600 hover:text-teal-600'
                      }`}
                    >
                      <tab.icon />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">About Us</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {furniture.about}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3">Key Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {furniture.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <FaCheckCircle className="text-teal-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-teal-600">{furniture.inventorySize.toLocaleString()}+</div>
                        <div className="text-gray-600 text-sm mt-1">Furniture Items</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-teal-600">{furniture.eventsServed}+</div>
                        <div className="text-gray-600 text-sm mt-1">Events Served</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-teal-600">{furniture.experience}+</div>
                        <div className="text-gray-600 text-sm mt-1">Years Experience</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Categories Tab */}
                {activeTab === 'categories' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Furniture Categories</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {furniture.categories.map((category, index) => (
                        <div 
                          key={index}
                          className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 text-center border-2 border-teal-200 hover:border-teal-400 transition"
                        >
                          <FaChair className="text-3xl text-teal-600 mx-auto mb-2" />
                          <p className="font-semibold text-gray-800">{category}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Packages Tab */}
                {activeTab === 'packages' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Rental Packages</h3>
                    <div className="space-y-6">
                      {furniture.packages.map((pkg, index) => (
                        <div 
                          key={index}
                          className="border-2 border-teal-200 rounded-lg p-6 hover:border-teal-400 hover:shadow-lg transition"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-xl font-bold text-gray-800">{pkg.name}</h4>
                              <p className="text-gray-600 mt-1">{pkg.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold text-teal-600">₹{pkg.price.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">Quantity: {pkg.quantity}</p>
                            </div>
                          </div>
                          <div className="border-t pt-4">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Included Items:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {pkg.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <FaCheckCircle className="text-teal-600 text-sm flex-shrink-0" />
                                  <span className="text-gray-700 text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Furniture Types Tab */}
                {activeTab === 'furniture' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Available Furniture Types</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {furniture.furnitureTypes.map((type, index) => (
                        <div 
                          key={index}
                          className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-5 border-l-4 border-teal-600 hover:shadow-md transition"
                        >
                          <div className="flex items-center gap-3">
                            <FaTrophy className="text-2xl text-teal-600" />
                            <p className="font-semibold text-gray-800 text-lg">{type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Portfolio</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {furniture.images.map((image, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                          <img 
                            src={image} 
                            alt={`Portfolio ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h3>
                      
                      {/* Review Stats */}
                      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 mb-6">
                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <div className="text-5xl font-bold text-teal-600">{furniture.ratings.average}</div>
                            <div className="flex items-center justify-center gap-1 mt-2">
                              {[...Array(5)].map((_, i) => (
                                <FaStar 
                                  key={i}
                                  className={i < Math.floor(furniture.ratings.average) ? 'text-yellow-400' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                            <div className="text-gray-600 text-sm mt-1">{furniture.ratings.count} reviews</div>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-700 font-medium mb-2">Rating Distribution</p>
                            {[5, 4, 3, 2, 1].map(star => {
                              const count = furniture.reviews.filter(r => Math.floor(r.rating) === star).length;
                              const percentage = furniture.reviews.length > 0 ? (count / furniture.reviews.length) * 100 : 0;
                              return (
                                <div key={star} className="flex items-center gap-2 mb-1">
                                  <span className="text-sm text-gray-600 w-8">{star} ★</span>
                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-teal-600 h-2 rounded-full transition-all"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-600 w-8">{count}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Reviews List */}
                      <div className="space-y-4">
                        {furniture.reviews.length === 0 ? (
                          <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review!</p>
                        ) : (
                          furniture.reviews.map((review, index) => (
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
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Add Review Form */}
                    <div className="border-t pt-8">
                      <h4 className="text-xl font-bold text-gray-800 mb-4">Write a Review</h4>
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            value={newReview.userName}
                            onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Rating
                          </label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewReview({...newReview, rating: star})}
                                className="focus:outline-none"
                              >
                                <FaStar 
                                  className={`text-2xl ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Review
                          </label>
                          <textarea
                            value={newReview.comment}
                            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={submittingReview}
                          className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {submittingReview ? 'Submitting...' : 'Submit Review'}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4 space-y-6">
              {/* Quick Stats */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaBox className="text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-600">Inventory Size</p>
                      <p className="font-semibold">{furniture.inventorySize.toLocaleString()}+ items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaUsers className="text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-600">Events Served</p>
                      <p className="font-semibold">{furniture.eventsServed}+</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaCalendarCheck className="text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-semibold">{furniture.experience}+ years</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {furniture.contactInfo.phone && (
                    <a 
                      href={`tel:${furniture.contactInfo.phone}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-teal-600 transition"
                    >
                      <FaPhone className="text-teal-600" />
                      <span>{furniture.contactInfo.phone}</span>
                    </a>
                  )}
                  {furniture.contactInfo.email && (
                    <a 
                      href={`mailto:${furniture.contactInfo.email}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-teal-600 transition break-all"
                    >
                      <FaEnvelope className="text-teal-600" />
                      <span>{furniture.contactInfo.email}</span>
                    </a>
                  )}
                  {furniture.contactInfo.website && (
                    <a 
                      href={furniture.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-teal-600 transition"
                    >
                      <FaGlobe className="text-teal-600" />
                      <span>Visit Website</span>
                    </a>
                  )}
                  {furniture.contactInfo.whatsapp && (
                    <a 
                      href={`https://wa.me/${furniture.contactInfo.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-teal-600 transition"
                    >
                      <FaWhatsapp className="text-teal-600" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Social Media */}
              {(furniture.contactInfo.instagram || furniture.contactInfo.facebook) && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {furniture.contactInfo.instagram && (
                      <a 
                        href={furniture.contactInfo.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-3 rounded-lg hover:shadow-lg transition"
                      >
                        <FaInstagram className="text-xl" />
                      </a>
                    )}
                    {furniture.contactInfo.facebook && (
                      <a 
                        href={furniture.contactInfo.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white p-3 rounded-lg hover:shadow-lg transition"
                      >
                        <FaFacebook className="text-xl" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <div className="border-t pt-6">
                <a
                  href={`tel:${furniture.contactInfo.phone}`}
                  className="block w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-center py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventFurnitureDetails;

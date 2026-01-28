import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import {
  FaStore,
  FaMapMarkerAlt,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaGlobe,
  FaRulerCombined,
  FaCar,
  FaCheck,
  FaArrowLeft
} from 'react-icons/fa';

const ShopBookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    fetchShopDetails();
  }, [id]);

  const fetchShopDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/shop/${id}`);
      setShop(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shop details:', error);
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/shop/${id}/reviews`, reviewForm);
      setReviewForm({ userName: '', rating: 5, comment: '' });
      fetchShopDetails();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Shop not found</p>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'categories', label: 'Categories' },
    { id: 'packages', label: 'Packages' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'features', label: 'Features & Facilities' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-6">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:text-gray-200 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Listings
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
              <div className="flex items-center text-amber-100">
                <FaMapMarkerAlt className="mr-2" />
                <span>{shop.location.area}, {shop.location.city}, {shop.location.state}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white text-amber-600 px-4 py-2 rounded-lg">
                <p className="text-sm">Starting from</p>
                <p className="text-2xl font-bold">
                  ₹{Math.min(...shop.packages.map(pkg => pkg.price)).toLocaleString()}/month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 md:row-span-2">
            <img
              src={shop.mainImage}
              alt={shop.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {shop.images.slice(0, 4).map((image, index) => (
            <div key={index} className="h-48">
              <img
                src={image}
                alt={`${shop.name} ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <FaStore className="text-3xl text-amber-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold text-gray-800">{shop.type}</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <FaRulerCombined className="text-3xl text-amber-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Area</p>
                  <p className="font-semibold text-gray-800">{shop.area} sq ft</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <span className="text-3xl mx-auto mb-2 block">🏢</span>
                  <p className="text-sm text-gray-600">Furnished</p>
                  <p className="font-semibold text-gray-800">{shop.furnished}</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <FaCar className="text-3xl text-amber-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Parking</p>
                  <p className="font-semibold text-gray-800">{shop.parking}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex border-b overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 font-semibold whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-amber-600 border-b-2 border-amber-600'
                        : 'text-gray-600 hover:text-amber-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About {shop.name}</h2>
                    <p className="text-gray-700 whitespace-pre-line mb-6">{shop.about}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Building</p>
                        <p className="text-lg font-semibold text-gray-800">{shop.buildingName}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Shop Number</p>
                        <p className="text-lg font-semibold text-gray-800">{shop.shopNumber}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Security Deposit</p>
                        <p className="text-lg font-semibold text-gray-800">₹{shop.securityDeposit.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Maintenance</p>
                        <p className="text-lg font-semibold text-gray-800">₹{shop.maintenanceCharges?.toLocaleString() || 'Included'}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Lock-in Period</p>
                        <p className="text-lg font-semibold text-gray-800">{shop.lockInPeriod}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Notice Period</p>
                        <p className="text-lg font-semibold text-gray-800">{shop.noticePeriod}</p>
                      </div>
                    </div>

                    {shop.nearbyFacilities && shop.nearbyFacilities.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Nearby Facilities</h3>
                        <ul className="space-y-2">
                          {shop.nearbyFacilities.map((facility, index) => (
                            <li key={index} className="flex items-start">
                              <FaMapMarkerAlt className="text-amber-600 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{facility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Categories Tab */}
                {activeTab === 'categories' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {shop.categories.map((category, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg text-center"
                        >
                          <p className="font-semibold text-amber-700">{category}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Suitable For</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {shop.suitableFor.map((suitable, index) => (
                          <div
                            key={index}
                            className="bg-amber-50 p-3 rounded-lg text-center"
                          >
                            <p className="font-semibold text-amber-700">{suitable}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Packages Tab */}
                {activeTab === 'packages' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Packages</h2>
                    <div className="space-y-4">
                      {shop.packages.map((pkg, index) => (
                        <div key={index} className="border border-amber-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">{pkg.name}</h3>
                              <p className="text-amber-600 font-semibold">{pkg.duration}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold text-amber-600">
                                ₹{pkg.price.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-600">/month</p>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{pkg.description}</p>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-800 mb-2">Includes:</p>
                            <ul className="space-y-1">
                              {pkg.includes.map((item, idx) => (
                                <li key={idx} className="flex items-start text-gray-700">
                                  <FaCheck className="text-amber-600 mr-2 mt-1 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Amenities Tab */}
                {activeTab === 'amenities' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {shop.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <FaCheck className="text-amber-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features & Facilities Tab */}
                {activeTab === 'features' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Features & Facilities</h2>
                    <ul className="space-y-2">
                      {shop.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-amber-600 mr-2">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews & Ratings</h2>
                    
                    {/* Rating Summary */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg mb-6">
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-5xl font-bold text-amber-600 mb-2">
                            {shop.ratings.average > 0 ? shop.ratings.average.toFixed(1) : 'N/A'}
                          </p>
                          <div className="flex items-center justify-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`${
                                  star <= shop.ratings.average ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">
                            Based on {shop.ratings.count} {shop.ratings.count === 1 ? 'review' : 'reviews'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Review Form */}
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Write a Review</h3>
                      <form onSubmit={handleReviewSubmit}>
                        <div className="mb-4">
                          <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                          <input
                            type="text"
                            value={reviewForm.userName}
                            onChange={(e) => setReviewForm({ ...reviewForm, userName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 font-semibold mb-2">Rating</label>
                          <div className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                className="focus:outline-none"
                              >
                                <FaStar
                                  className={`text-2xl ${
                                    star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 font-semibold mb-2">Your Review</label>
                          <textarea
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                            rows="4"
                            required
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 font-semibold"
                        >
                          Submit Review
                        </button>
                      </form>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {shop.reviews.length > 0 ? (
                        shop.reviews.map((review, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-semibold text-gray-800">{review.userName}</p>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <FaStar
                                    key={star}
                                    className={`text-sm ${
                                      star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 mb-2">{review.comment}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600 text-center py-4">No reviews yet. Be the first to review!</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              
              <div className="space-y-3 mb-6">
                {shop.contactInfo.phone && (
                  <a
                    href={`tel:${shop.contactInfo.phone}`}
                    className="flex items-center p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                  >
                    <FaPhone className="text-amber-600 mr-3" />
                    <span className="text-gray-700">{shop.contactInfo.phone}</span>
                  </a>
                )}
                
                {shop.contactInfo.email && (
                  <a
                    href={`mailto:${shop.contactInfo.email}`}
                    className="flex items-center p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                  >
                    <FaEnvelope className="text-amber-600 mr-3" />
                    <span className="text-gray-700 break-all">{shop.contactInfo.email}</span>
                  </a>
                )}
                
                {shop.contactInfo.whatsapp && (
                  <a
                    href={`https://wa.me/${shop.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                  >
                    <FaWhatsapp className="text-amber-600 mr-3" />
                    <span className="text-gray-700">WhatsApp</span>
                  </a>
                )}
                
                {shop.contactInfo.instagram && (
                  <a
                    href={shop.contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                  >
                    <FaInstagram className="text-amber-600 mr-3" />
                    <span className="text-gray-700">Instagram</span>
                  </a>
                )}
                
                {shop.contactInfo.website && (
                  <a
                    href={shop.contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                  >
                    <FaGlobe className="text-amber-600 mr-3" />
                    <span className="text-gray-700">Website</span>
                  </a>
                )}
              </div>

              <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 font-semibold">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBookingDetails;

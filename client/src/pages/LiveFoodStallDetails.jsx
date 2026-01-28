import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import {
  FaMapMarkerAlt,
  FaStar,
  FaUtensils,
  FaAward,
  FaChartLine,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaGlobe,
} from 'react-icons/fa';

const LiveFoodStallDetails = () => {
  const { id } = useParams();
  const [stall, setStall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    const fetchStall = async () => {
      try {
        const response = await axios.get(`${API_URL}/live-food-stall/${id}`);
        setStall(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching live food stall:', error);
        setLoading(false);
      }
    };

    fetchStall();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/live-food-stall/${id}/reviews`, reviewForm);
      const response = await axios.get(`${API_URL}/live-food-stall/${id}`);
      setStall(response.data.data);
      setReviewForm({ userName: '', rating: 5, comment: '' });
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
      </div>
    );
  }

  if (!stall) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Live food stall not found</h2>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About', icon: FaUtensils },
    { id: 'categories', label: 'Categories', icon: FaCheckCircle },
    { id: 'packages', label: 'Packages', icon: FaAward },
    { id: 'dishes', label: 'Dish Varieties', icon: FaUtensils },
    { id: 'portfolio', label: 'Portfolio', icon: FaChartLine },
    { id: 'reviews', label: 'Reviews', icon: FaStar },
  ];

  const minPrice = Math.min(...stall.packages.map((pkg) => pkg.price));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <img
            src={stall.mainImage}
            alt={stall.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
              {stall.type}
            </span>
            <h1 className="text-5xl font-bold text-white mb-4">{stall.name}</h1>
            <div className="flex items-center text-white text-lg mb-2">
              <FaMapMarkerAlt className="mr-2" />
              <span>{stall.location.area}, {stall.location.city}, {stall.location.state}</span>
            </div>
            <div className="flex items-center text-white">
              <FaStar className="text-yellow-400 mr-2" />
              <span className="text-lg font-semibold">
                {stall.ratings.average.toFixed(1)} ({stall.ratings.count} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Dishes Available</p>
                <p className="text-3xl font-bold text-gray-800">{stall.dishesAvailable}+</p>
              </div>
              <FaUtensils className="text-5xl text-orange-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Experience</p>
                <p className="text-3xl font-bold text-gray-800">{stall.experience} Years</p>
              </div>
              <FaAward className="text-5xl text-red-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Events Served</p>
                <p className="text-3xl font-bold text-gray-800">{stall.eventsServed}+</p>
              </div>
              <FaChartLine className="text-5xl text-orange-600 opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
              <div className="flex flex-wrap border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-b-4 border-orange-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
                      <FaUtensils className="mr-3 text-orange-600" />
                      About {stall.name}
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">{stall.about}</p>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {stall.features.map((feature, index) => (
                        <div key={index} className="flex items-start bg-orange-50 p-4 rounded-lg">
                          <FaCheckCircle className="text-orange-600 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories Tab */}
                {activeTab === 'categories' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
                      <FaCheckCircle className="mr-3 text-orange-600" />
                      Service Categories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {stall.categories.map((category, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg text-center hover:from-orange-200 hover:to-red-200 transition-all"
                        >
                          <p className="font-semibold text-orange-800">{category}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Packages Tab */}
                {activeTab === 'packages' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
                      <FaAward className="mr-3 text-orange-600" />
                      Our Packages
                    </h2>
                    <div className="space-y-6">
                      {stall.packages.map((pkg, index) => (
                        <div
                          key={index}
                          className="border-2 border-orange-200 rounded-xl p-6 hover:border-orange-400 transition-all hover:shadow-lg"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">{pkg.name}</h3>
                            <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                              ₹{pkg.price.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">{pkg.description}</p>
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                              Servings: {pkg.servings}
                            </p>
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                              Setup: {pkg.setupIncluded ? 'Included' : 'Not Included'}
                            </p>
                          </div>
                          <h4 className="font-semibold text-gray-800 mb-2">Package Includes:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {pkg.items.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <FaCheckCircle className="text-orange-600 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dish Varieties Tab */}
                {activeTab === 'dishes' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
                      <FaUtensils className="mr-3 text-orange-600" />
                      Dish Varieties
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {stall.dishVarieties.map((dish, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg text-center hover:from-orange-100 hover:to-red-100 transition-all shadow-md hover:shadow-lg"
                        >
                          <FaUtensils className="text-3xl text-orange-600 mx-auto mb-2" />
                          <p className="font-semibold text-gray-800">{dish}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
                      <FaChartLine className="mr-3 text-orange-600" />
                      Our Portfolio
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {stall.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                        >
                          <img
                            src={image}
                            alt={`Portfolio ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
                      <FaStar className="mr-3 text-orange-600" />
                      Customer Reviews
                    </h2>

                    {/* Existing Reviews */}
                    <div className="space-y-4 mb-8">
                      {stall.reviews.map((review, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg shadow">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-800">{review.userName}</span>
                            <div className="flex items-center">
                              <FaStar className="text-yellow-400 mr-1" />
                              <span className="font-semibold">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Review Form */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800">Write a Review</h3>
                      <form onSubmit={handleReviewSubmit}>
                        <div className="mb-4">
                          <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                          <input
                            type="text"
                            value={reviewForm.userName}
                            onChange={(e) =>
                              setReviewForm({ ...reviewForm, userName: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 font-semibold mb-2">Rating</label>
                          <select
                            value={reviewForm.rating}
                            onChange={(e) =>
                              setReviewForm({ ...reviewForm, rating: Number(e.target.value) })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value={5}>5 - Excellent</option>
                            <option value={4.5}>4.5 - Very Good</option>
                            <option value={4}>4 - Good</option>
                            <option value={3.5}>3.5 - Above Average</option>
                            <option value={3}>3 - Average</option>
                            <option value={2.5}>2.5 - Below Average</option>
                            <option value={2}>2 - Poor</option>
                            <option value={1.5}>1.5 - Very Poor</option>
                            <option value={1}>1 - Terrible</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 font-semibold mb-2">Comment</label>
                          <textarea
                            value={reviewForm.comment}
                            onChange={(e) =>
                              setReviewForm({ ...reviewForm, comment: e.target.value })
                            }
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            required
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                        >
                          Submit Review
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
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">Starting from</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  ₹{minPrice.toLocaleString()}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {stall.contactInfo.phone && (
                    <a
                      href={`tel:${stall.contactInfo.phone}`}
                      className="flex items-center text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      <FaPhone className="mr-3 text-orange-600" />
                      {stall.contactInfo.phone}
                    </a>
                  )}
                  {stall.contactInfo.email && (
                    <a
                      href={`mailto:${stall.contactInfo.email}`}
                      className="flex items-center text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      <FaEnvelope className="mr-3 text-orange-600" />
                      {stall.contactInfo.email}
                    </a>
                  )}
                  {stall.contactInfo.whatsapp && (
                    <a
                      href={`https://wa.me/${stall.contactInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      <FaWhatsapp className="mr-3 text-orange-600" />
                      WhatsApp
                    </a>
                  )}
                  {stall.contactInfo.instagram && (
                    <a
                      href={stall.contactInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      <FaInstagram className="mr-3 text-orange-600" />
                      Instagram
                    </a>
                  )}
                  {stall.contactInfo.website && (
                    <a
                      href={stall.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      <FaGlobe className="mr-3 text-orange-600" />
                      Website
                    </a>
                  )}
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-md hover:shadow-lg mb-4">
                Book Stall
              </button>

              <div className="border-t pt-4">
                <h4 className="font-bold text-gray-800 mb-3">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dishes Available:</span>
                    <span className="font-semibold text-gray-800">{stall.dishesAvailable}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-semibold text-gray-800">{stall.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Events Served:</span>
                    <span className="font-semibold text-gray-800">{stall.eventsServed}+</span>
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

export default LiveFoodStallDetails;

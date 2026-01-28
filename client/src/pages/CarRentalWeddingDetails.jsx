import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import {
  FaCar,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaGlobe,
  FaChartLine,
  FaAward,
  FaCheckCircle
} from 'react-icons/fa';

const CarRentalWeddingDetails = () => {
  const { id } = useParams();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    fetchRentalDetails();
  }, [id]);

  const fetchRentalDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/car-rental-wedding/${id}`);
      setRental(response.data.data);
    } catch (error) {
      console.error('Error fetching car rental details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/car-rental-wedding/${id}/reviews`, reviewForm);
      setReviewForm({ userName: '', rating: 5, comment: '' });
      fetchRentalDetails();
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!rental) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Car Rental Not Found</h2>
          <p className="text-gray-600">The car rental service you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About', icon: FaCar },
    { id: 'categories', label: 'Categories', icon: FaCheckCircle },
    { id: 'packages', label: 'Packages', icon: FaAward },
    { id: 'brands', label: 'Car Brands', icon: FaCar },
    { id: 'portfolio', label: 'Portfolio', icon: FaChartLine },
    { id: 'reviews', label: 'Reviews', icon: FaStar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={rental.mainImage}
          alt={rental.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <div className="text-white">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {rental.type}
              </div>
              <h1 className="text-5xl font-bold mb-4">{rental.name}</h1>
              <div className="flex items-center gap-6 text-lg">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  {rental.location.area}, {rental.location.city}
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaStar className="mr-2 text-yellow-400" />
                  {rental.ratings.average} ({rental.ratings.count} reviews)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Fleet Size</p>
                    <p className="text-3xl font-bold text-gray-800">{rental.fleetSize}</p>
                    <p className="text-blue-600 text-sm">Cars Available</p>
                  </div>
                  <FaCar className="text-4xl text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Experience</p>
                    <p className="text-3xl font-bold text-gray-800">{rental.experience}</p>
                    <p className="text-indigo-600 text-sm">Years</p>
                  </div>
                  <FaAward className="text-4xl text-indigo-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Weddings Served</p>
                    <p className="text-3xl font-bold text-gray-800">{rental.weddingsServed}+</p>
                    <p className="text-blue-600 text-sm">Happy Couples</p>
                  </div>
                  <FaChartLine className="text-4xl text-blue-600" />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex border-b overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
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
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">{rental.about}</p>

                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rental.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories Tab */}
                {activeTab === 'categories' && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Service Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rental.categories.map((category, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200"
                        >
                          <div className="flex items-center">
                            <FaCheckCircle className="text-blue-600 mr-3" />
                            <span className="text-gray-800 font-semibold">{category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Packages Tab */}
                {activeTab === 'packages' && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Packages</h2>
                    <div className="space-y-6">
                      {rental.packages.map((pkg, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-800">{pkg.name}</h3>
                              <p className="text-gray-600 mt-2">{pkg.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                ₹{pkg.price.toLocaleString()}
                              </p>
                              <p className="text-gray-600 text-sm">{pkg.duration}</p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-800 mb-2">Vehicles Included:</h4>
                            <div className="space-y-2">
                              {pkg.cars.map((car, carIndex) => (
                                <div key={carIndex} className="flex items-center">
                                  <FaCar className="text-blue-600 mr-2" />
                                  <span className="text-gray-700">{car}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Services:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {pkg.services.map((service, serviceIndex) => (
                                <div key={serviceIndex} className="flex items-center">
                                  <FaCheckCircle className="text-green-500 mr-2" />
                                  <span className="text-gray-700">{service}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Car Brands Tab */}
                {activeTab === 'brands' && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Car Brands</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {rental.carBrands.map((brand, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 flex items-center"
                        >
                          <FaCar className="text-blue-600 mr-3 text-xl" />
                          <span className="text-gray-800 font-semibold">{brand}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Portfolio</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {rental.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                        >
                          <img
                            src={image}
                            alt={`Portfolio ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Client Reviews</h2>
                    
                    {/* Existing Reviews */}
                    <div className="space-y-6 mb-8">
                      {rental.reviews.map((review, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="font-bold text-gray-800">{review.userName}</h4>
                              <p className="text-gray-600 text-sm">
                                {new Date(review.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full">
                              <FaStar className="mr-2" />
                              <span className="font-semibold">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add Review Form */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Write a Review</h3>
                      <form onSubmit={handleReviewSubmit}>
                        <div className="mb-4">
                          <label className="block text-gray-700 font-semibold mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            value={reviewForm.userName}
                            onChange={(e) => setReviewForm({ ...reviewForm, userName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 font-semibold mb-2">
                            Rating
                          </label>
                          <select
                            value={reviewForm.rating}
                            onChange={(e) => setReviewForm({ ...reviewForm, rating: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="5">5 - Excellent</option>
                            <option value="4.5">4.5 - Very Good</option>
                            <option value="4">4 - Good</option>
                            <option value="3.5">3.5 - Above Average</option>
                            <option value="3">3 - Average</option>
                            <option value="2.5">2.5 - Below Average</option>
                            <option value="2">2 - Poor</option>
                            <option value="1.5">1.5 - Very Poor</option>
                            <option value="1">1 - Terrible</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 font-semibold mb-2">
                            Your Review
                          </label>
                          <textarea
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
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
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Information</h3>

              {/* Price Range */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Starting from</p>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  ₹{Math.min(...rental.packages.map(p => p.price)).toLocaleString()}
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-gray-800 mb-3">Contact Details</h4>
                
                <a
                  href={`tel:${rental.contactInfo.phone}`}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FaPhone className="mr-3 text-blue-600" />
                  {rental.contactInfo.phone}
                </a>

                <a
                  href={`mailto:${rental.contactInfo.email}`}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FaEnvelope className="mr-3 text-blue-600" />
                  {rental.contactInfo.email}
                </a>

                <a
                  href={`https://wa.me/${rental.contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                >
                  <FaWhatsapp className="mr-3 text-green-600" />
                  WhatsApp
                </a>

                {rental.contactInfo.instagram && (
                  <a
                    href={`https://instagram.com/${rental.contactInfo.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <FaInstagram className="mr-3 text-pink-600" />
                    @{rental.contactInfo.instagram}
                  </a>
                )}

                {rental.contactInfo.website && (
                  <a
                    href={rental.contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <FaGlobe className="mr-3 text-blue-600" />
                    Visit Website
                  </a>
                )}
              </div>

              {/* Book Now Button */}
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                Book Now
              </button>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Fleet Size:</span>
                    <span className="font-semibold text-gray-800">{rental.fleetSize} cars</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experience:</span>
                    <span className="font-semibold text-gray-800">{rental.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weddings Served:</span>
                    <span className="font-semibold text-gray-800">{rental.weddingsServed}+</span>
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

export default CarRentalWeddingDetails;

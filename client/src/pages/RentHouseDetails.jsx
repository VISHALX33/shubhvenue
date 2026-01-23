import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaHome, FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, 
  FaWhatsapp, FaInstagram, FaGlobe, FaBed, FaBath, 
  FaRulerCombined, FaUsers, FaArrowLeft, FaCheck 
} from 'react-icons/fa';

const RentHouseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    fetchHouseDetails();
  }, [id]);

  const fetchHouseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/rent-house/${id}`);
      setHouse(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching house details:', error);
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/rent-house/${id}/reviews`, reviewForm);
      setReviewForm({ userName: '', rating: 5, comment: '' });
      fetchHouseDetails();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!house) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">House not found</h2>
          <button
            onClick={() => navigate('/event-services/rent-house')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  const images = [house.mainImage, ...house.images];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/event-services/rent-house')}
          className="flex items-center text-indigo-600 hover:text-indigo-700 mb-6 font-semibold"
        >
          <FaArrowLeft className="mr-2" />
          Back to Rent House Listings
        </button>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Image Gallery */}
            <div>
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={images[selectedImage]}
                  alt={house.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${house.name} ${index + 1}`}
                    className={`w-full h-20 object-cover rounded cursor-pointer ${
                      selectedImage === index ? 'ring-2 ring-indigo-600' : ''
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* House Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{house.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-2 text-indigo-600" />
                    <span>{house.location.area}, {house.location.city}, {house.location.state}</span>
                  </div>
                </div>
                <FaHome className="text-indigo-600 text-4xl" />
              </div>

              <div className="flex items-center mb-4">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold mr-3">
                  {house.type}
                </span>
                <span className="bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-semibold">
                  {house.floors}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <FaBed className="text-indigo-600 text-2xl mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{house.bedrooms}</p>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <FaBath className="text-purple-600 text-2xl mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{house.bathrooms}</p>
                  <p className="text-sm text-gray-600">Bathrooms</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <FaUsers className="text-indigo-600 text-2xl mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{house.capacity}</p>
                  <p className="text-sm text-gray-600">Capacity</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <FaRulerCombined className="text-purple-600 text-2xl mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{house.area}</p>
                  <p className="text-sm text-gray-600">sq.ft</p>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="flex items-center mr-6">
                  <FaStar className="text-yellow-400 text-xl mr-2" />
                  <span className="text-2xl font-bold text-gray-800">
                    {house.ratings.average.toFixed(1)}
                  </span>
                  <span className="text-gray-500 ml-2">({house.ratings.count} reviews)</span>
                </div>
                <div className="text-gray-600">
                  <span className="font-semibold">{house.eventsHosted}+</span> events hosted
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600 mb-2">Starting from</p>
                <p className="text-3xl font-bold text-indigo-600">
                  ₹{Math.min(...house.packages.map(pkg => pkg.price)).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">per {house.packages[0]?.duration || 'day'}</p>
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300">
                Book This House
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
              {['about', 'categories', 'packages', 'amenities', 'portfolio', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-semibold capitalize ${
                    activeTab === tab
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This House</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{house.about}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-indigo-600 font-semibold mb-2">Experience</p>
                    <p className="text-2xl font-bold text-gray-800">{house.experience} Years</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-purple-600 font-semibold mb-2">Events Hosted</p>
                    <p className="text-2xl font-bold text-gray-800">{house.eventsHosted}+</p>
                  </div>
                </div>
              </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {house.categories.map((category, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow"
                    >
                      <p className="font-semibold text-gray-800">{category}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Packages Tab */}
            {activeTab === 'packages' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Rental Packages</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {house.packages.map((pkg, index) => (
                    <div
                      key={index}
                      className="border-2 border-indigo-200 rounded-lg p-6 hover:border-indigo-400 transition-colors"
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                      <p className="text-3xl font-bold text-indigo-600 mb-2">
                        ₹{pkg.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">per {pkg.duration}</p>
                      <p className="text-gray-700 mb-4">{pkg.description}</p>
                      <div className="border-t pt-4">
                        <p className="font-semibold text-gray-800 mb-2">Includes:</p>
                        <ul className="space-y-2">
                          {pkg.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                              <span className="text-indigo-600 mr-2">✓</span>
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {house.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg flex items-center hover:shadow-md transition-shadow"
                    >
                      <FaCheck className="text-indigo-600 mr-3" />
                      <span className="text-gray-800 font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Features & Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {house.features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg flex items-start hover:shadow-md transition-shadow"
                    >
                      <span className="text-indigo-600 font-bold mr-3 text-xl">✓</span>
                      <p className="text-gray-800">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Guest Reviews</h2>
                
                {/* Review Form */}
                <div className="bg-indigo-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Write a Review</h3>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                      <input
                        type="text"
                        value={reviewForm.userName}
                        onChange={(e) => setReviewForm({ ...reviewForm, userName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Rating</label>
                      <select
                        value={reviewForm.rating}
                        onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        {[5, 4, 3, 2, 1].map((num) => (
                          <option key={num} value={num}>
                            {num} Star{num !== 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Your Review</label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {house.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-800">{review.userName}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Sidebar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
          <div className="space-y-3">
            {house.contactInfo.phone && (
              <a href={`tel:${house.contactInfo.phone}`} className="flex items-center text-gray-700 hover:text-indigo-600">
                <FaPhone className="mr-3 text-indigo-600" />
                <span>{house.contactInfo.phone}</span>
              </a>
            )}
            {house.contactInfo.email && (
              <a href={`mailto:${house.contactInfo.email}`} className="flex items-center text-gray-700 hover:text-indigo-600">
                <FaEnvelope className="mr-3 text-indigo-600" />
                <span>{house.contactInfo.email}</span>
              </a>
            )}
            {house.contactInfo.whatsapp && (
              <a href={`https://wa.me/${house.contactInfo.whatsapp}`} className="flex items-center text-gray-700 hover:text-indigo-600" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="mr-3 text-indigo-600" />
                <span>WhatsApp</span>
              </a>
            )}
            {house.contactInfo.instagram && (
              <a href={house.contactInfo.instagram} className="flex items-center text-gray-700 hover:text-indigo-600" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="mr-3 text-indigo-600" />
                <span>Instagram</span>
              </a>
            )}
            {house.contactInfo.website && (
              <a href={house.contactInfo.website} className="flex items-center text-gray-700 hover:text-indigo-600" target="_blank" rel="noopener noreferrer">
                <FaGlobe className="mr-3 text-indigo-600" />
                <span>Website</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentHouseDetails;

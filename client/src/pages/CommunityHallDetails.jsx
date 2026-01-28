import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

const CommunityHallDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hall, setHall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: ''
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchHallDetails();
  }, [id]);

  const fetchHallDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/community-halls/${id}`);
      setHall(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hall details:', error);
      setLoading(false);
    }
  };

  const handleWriteReview = () => {
    if (!user) {
      alert('Please login to write a review');
      navigate('/guest/login');
      return;
    }
    setShowReviewModal(true);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/community-halls/${id}/reviews`,
        reviewData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Update local state with new hall data including the new review
      setHall(response.data.data);
      setShowReviewModal(false);
      setReviewData({ rating: 5, comment: '' });
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
      </div>
    );
  }

  if (!hall) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Community Hall Not Found</h2>
        <button 
          onClick={() => navigate('/venue-hall/community-hall')}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Back to Community Halls
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'about', name: 'About', icon: '📋' },
    { id: 'amenities', name: 'Amenities', icon: '✨' },
    { id: 'portfolio', name: 'Portfolio', icon: '🖼️' },
    { id: 'policies', name: 'Policies', icon: '📜' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="h-96">
            <img 
              src={selectedImage === 0 ? hall.mainImage : hall.images[selectedImage - 1]} 
              alt={hall.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 p-4">
            <div 
              onClick={() => setSelectedImage(0)}
              className={`cursor-pointer rounded-lg overflow-hidden ${selectedImage === 0 ? 'ring-4 ring-orange-600' : ''}`}
            >
              <img src={hall.mainImage} alt="Main" className="w-full h-24 object-cover" />
            </div>
            {hall.images.map((image, index) => (
              <div 
                key={index}
                onClick={() => setSelectedImage(index + 1)}
                className={`cursor-pointer rounded-lg overflow-hidden ${selectedImage === index + 1 ? 'ring-4 ring-orange-600' : ''}`}
              >
                <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-24 object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{hall.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span>{hall.location.city}, {hall.location.area}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {hall.type}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg 
                      key={index}
                      className={`w-5 h-5 ${index < Math.round(hall.ratings.average) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">
                    {hall.ratings.average} ({hall.ratings.count} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex border-b">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-4 text-center font-semibold transition-colors ${
                      activeTab === tab.id 
                        ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50' 
                        : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">About {hall.name}</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{hall.about}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                        <h4 className="font-semibold text-gray-800 mb-2">Capacity</h4>
                        <p className="text-gray-700">{hall.capacity.min} - {hall.capacity.max} Guests</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                        <h4 className="font-semibold text-gray-800 mb-2">Check-in Time</h4>
                        <p className="text-gray-700">{hall.policies.checkIn}</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                        <h4 className="font-semibold text-gray-800 mb-2">Check-out Time</h4>
                        <p className="text-gray-700">{hall.policies.checkOut}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Amenities Tab */}
                {activeTab === 'amenities' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Amenities & Facilities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {hall.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <img src={hall.mainImage} alt="Main" className="w-full h-48 object-cover rounded-lg" />
                      {hall.images.map((image, index) => (
                        <img key={index} src={image} alt={`Gallery ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Policies Tab */}
                {activeTab === 'policies' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Hall Policies</h3>
                    
                    <div className="space-y-4">
                      <div className="border-l-4 border-orange-600 pl-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Check-in / Check-out</h4>
                        <p className="text-gray-700">Check-in: {hall.policies.checkIn}</p>
                        <p className="text-gray-700">Check-out: {hall.policies.checkOut}</p>
                      </div>

                      <div className="border-l-4 border-orange-600 pl-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Cancellation Policy</h4>
                        <p className="text-gray-700">{hall.policies.cancellation}</p>
                      </div>

                      <div className="border-l-4 border-orange-600 pl-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Event Permissions</h4>
                        <div className="flex gap-4 mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${hall.policies.religious ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            Religious Events: {hall.policies.religious ? 'Allowed' : 'Not Allowed'}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${hall.policies.catering ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            Catering: {hall.policies.catering ? 'Allowed' : 'Not Allowed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Guest Reviews</h3>
                      <button
                        onClick={handleWriteReview}
                        className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                      >
                        Write a Review
                      </button>
                    </div>
                    <div className="space-y-4">
                      {hall.reviews && hall.reviews.length > 0 ? (
                        hall.reviews.map((review, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                {review.userName.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">{review.userName}</h4>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <svg 
                                      key={i}
                                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="mb-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  ₹{hall.price.perDay.toLocaleString()}
                  <span className="text-lg text-gray-600">/day</span>
                </div>
                {hall.price.perPlate && (
                  <p className="text-gray-600">+ ₹{hall.price.perPlate}/plate</p>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                  </svg>
                  <span>{hall.capacity.min} - {hall.capacity.max} Guests</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  <span>{hall.type}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span>{hall.location.city}, {hall.location.area}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  if (!user) {
                    navigate('/guest/login')
                  } else if (user.role !== 'guest') {
                    alert('Only guests can book services. Please login as a guest.')
                  } else {
                    navigate(`/guest/book/communityHall/${id}`)
                  }
                }}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors mb-3"
              >
                Book Now
              </button>

              <button className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                Request Callback
              </button>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  {hall.contactInfo?.phone && (
                    <a href={`tel:${hall.contactInfo.phone}`} className="flex items-center text-gray-700 hover:text-orange-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                      {hall.contactInfo.phone}
                    </a>
                  )}
                  {hall.contactInfo?.email && (
                    <a href={`mailto:${hall.contactInfo.email}`} className="flex items-center text-gray-700 hover:text-orange-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      {hall.contactInfo.email}
                    </a>
                  )}
                  {hall.contactInfo?.website && (
                    <a href={`https://${hall.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-orange-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"/>
                      </svg>
                      {hall.contactInfo.website}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => {
          setShowReviewModal(false);
          setReviewData({ rating: 5, comment: '' });
        }}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`w-8 h-8 ${star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-600"
                  placeholder="Share your experience..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="flex-1 bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewModal(false);
                    setReviewData({ rating: 5, comment: '' });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHallDetails;

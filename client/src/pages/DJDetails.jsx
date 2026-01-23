import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function DJDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dj, setDJ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchDJDetails();
  }, [id]);

  const fetchDJDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/djs/${id}`);
      setDJ(response.data.data);
    } catch (error) {
      console.error('Error fetching DJ details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (!dj) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">DJ Not Found</h2>
        <button
          onClick={() => navigate('/event-services/dj')}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Back to DJ Listing
        </button>
      </div>
    );
  }

  const allImages = [dj.mainImage, ...(dj.images || [])];

  const tabs = [
    { id: 'about', name: 'About', icon: '📋' },
    { id: 'services', name: 'Services', icon: '🎵' },
    { id: 'equipment', name: 'Equipment', icon: '🎧' },
    { id: 'portfolio', name: 'Portfolio', icon: '📸' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="relative h-96">
                <img
                  src={allImages[selectedImage]}
                  alt={dj.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-6 gap-2 p-4">
                {allImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${dj.name} ${index + 1}`}
                    className={`h-20 object-cover cursor-pointer rounded-lg ${
                      selectedImage === index ? 'ring-4 ring-purple-600' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Header */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{dj.name}</h1>
                  <p className="text-gray-600 flex items-center">
                    <span className="mr-2">📍</span>
                    {dj.location.area}, {dj.location.city}
                  </p>
                </div>
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-semibold">
                  {dj.type}
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex text-2xl mr-2">
                  {renderStars(Math.round(dj.ratings.average))}
                </div>
                <span className="text-gray-600">
                  {dj.ratings.average.toFixed(1)} ({dj.ratings.count} reviews)
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex border-b overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 font-semibold whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-purple-600 border-b-4 border-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-purple-600'
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About This DJ</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{dj.about}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">🎵 Music Genres</h3>
                        <p className="text-gray-600">{dj.musicGenres.join(', ')}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">⏱️ Experience</h3>
                        <p className="text-gray-600">{dj.experience} Years</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">✅ Availability</h3>
                        <p className={`font-semibold ${dj.availability ? 'text-green-600' : 'text-red-600'}`}>
                          {dj.availability ? 'Available' : 'Booked'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Services Offered</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dj.services.map((service, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-green-500 mr-3 text-xl">✓</span>
                          <span className="text-gray-700">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Equipment Tab */}
                {activeTab === 'equipment' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Equipment & Setup</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dj.equipment.map((item, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-purple-500 mr-3 text-xl">🎧</span>
                          <span className="text-gray-700">{item}</span>
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
                      {allImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90"
                          onClick={() => setSelectedImage(index)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
                    {dj.reviews && dj.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {dj.reviews.map((review, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                {review.userName.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">{review.userName}</p>
                                <div className="flex text-yellow-400">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                            <p className="text-gray-500 text-sm mt-2">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Pricing Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">Starting from</p>
                  <p className="text-3xl font-bold text-purple-600">
                    ₹{(dj.price.perEvent / 1000).toFixed(0)}k
                    <span className="text-lg text-gray-600">/event</span>
                  </p>
                  <p className="text-lg text-gray-600 mt-1">
                    or ₹{(dj.price.perHour / 1000).toFixed(1)}k/hr
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold">{dj.experience} Years</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Type</span>
                    <span className="font-semibold">{dj.type}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold">{dj.location.city}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (!user) {
                      navigate('/guest/login')
                    } else if (user.role !== 'guest') {
                      alert('Only guests can book services. Please login as a guest.')
                    } else {
                      navigate(`/guest/book/djServices/${id}`)
                    }
                  }}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-3"
                >
                  Book Now
                </button>
                <button className="w-full py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                  Request Callback
                </button>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <a href={`tel:${dj.contactInfo.phone}`} className="flex items-center text-gray-700 hover:text-purple-600">
                    <span className="mr-2">📞</span>
                    {dj.contactInfo.phone}
                  </a>
                  {dj.contactInfo.email && (
                    <a href={`mailto:${dj.contactInfo.email}`} className="flex items-center text-gray-700 hover:text-purple-600">
                      <span className="mr-2">📧</span>
                      {dj.contactInfo.email}
                    </a>
                  )}
                  {dj.contactInfo.whatsapp && (
                    <a href={`https://wa.me/${dj.contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-purple-600">
                      <span className="mr-2">💬</span>
                      WhatsApp
                    </a>
                  )}
                  {dj.contactInfo.website && (
                    <a href={dj.contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-purple-600">
                      <span className="mr-2">🌐</span>
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DJDetails;

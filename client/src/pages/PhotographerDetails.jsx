import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

const PhotographerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchPhotographerDetails();
  }, [id]);

  const fetchPhotographerDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/photographers/${id}`);
      setPhotographer(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching photographer details:', error);
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400 text-xl">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400 text-xl">★</span>);
    }
    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} className="text-gray-300 text-xl">★</span>);
    }
    return stars;
  };

  const tabs = [
    { id: 'about', name: 'About', icon: '📋' },
    { id: 'services', name: 'Services', icon: '📸' },
    { id: 'equipment', name: 'Equipment', icon: '📷' },
    { id: 'specializations', name: 'Specializations', icon: '✨' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!photographer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Photographer not found</h2>
          <button
            onClick={() => navigate('/event-services/cameraman-photographer')}
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/event-services/cameraman-photographer')}
          className="mb-6 flex items-center text-teal-600 hover:text-teal-700 font-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Photographers
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="h-96 overflow-hidden">
                <img
                  src={photographer.images[selectedImage]}
                  alt={photographer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 grid grid-cols-6 gap-2">
                {photographer.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${photographer.name} ${index + 1}`}
                    className={`h-20 object-cover cursor-pointer rounded border-2 ${
                      selectedImage === index ? 'border-teal-600' : 'border-gray-200'
                    } hover:border-teal-400 transition-colors`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Photographer Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{photographer.name}</h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{photographer.location.area}, {photographer.location.city}</span>
              </div>

              <div className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-semibold mb-4">
                {photographer.type}
              </div>

              <div className="flex items-center mb-4">
                <div className="flex mr-3">
                  {renderStars(photographer.ratings.average)}
                </div>
                <span className="text-gray-600">
                  {photographer.ratings.average} ({photographer.ratings.count} reviews)
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'text-teal-600 border-b-2 border-teal-600'
                          : 'text-gray-600 hover:text-teal-600'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">About</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{photographer.about}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <div className="text-teal-600 font-semibold mb-1">Experience</div>
                        <div className="text-2xl font-bold text-gray-800">{photographer.experience} years</div>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <div className="text-teal-600 font-semibold mb-1">Specializations</div>
                        <div className="text-2xl font-bold text-gray-800">{photographer.specializations.length}</div>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <div className="text-teal-600 font-semibold mb-1">Delivery Time</div>
                        <div className="text-lg font-bold text-gray-800">{photographer.deliveryTime}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Services Offered</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {photographer.services.map((service, index) => (
                        <div key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Equipment Tab */}
                {activeTab === 'equipment' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Professional Equipment</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {photographer.equipment.map((item, index) => (
                        <div key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
                          <svg className="w-5 h-5 text-teal-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specializations Tab */}
                {activeTab === 'specializations' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Photography Specializations</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {photographer.specializations.map((spec, index) => (
                        <div key={index} className="bg-teal-50 text-teal-700 px-4 py-3 rounded-lg text-center font-semibold">
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h3>
                    {photographer.reviews && photographer.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {photographer.reviews.map((review, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                                {review.userName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">{review.userName}</div>
                                <div className="flex items-center">
                                  {renderStars(review.rating)}
                                  <span className="text-sm text-gray-500 ml-2">
                                    {new Date(review.date).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600 mt-2">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No reviews yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Pricing Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Pricing</h3>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-teal-600">
                    ₹{photographer.price.perDay.toLocaleString()}
                    <span className="text-lg text-gray-600 font-normal">/day</span>
                  </div>
                  {photographer.price.perHour && (
                    <div className="text-gray-600 mt-2">
                      or ₹{photographer.price.perHour.toLocaleString()}/hour
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold">{photographer.experience} years</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Type</span>
                    <span className="font-semibold">{photographer.type}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Delivery Time</span>
                    <span className="font-semibold">{photographer.deliveryTime}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold">{photographer.location.city}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (!user) {
                      navigate('/guest/login')
                    } else if (user.role !== 'guest') {
                      alert('Only guests can book services. Please login as a guest.')
                    } else {
                      navigate(`/guest/book/photography/${id}`)
                    }
                  }}
                  className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors font-semibold mb-3"
                >
                  Book Now
                </button>
                <button className="w-full border-2 border-teal-600 text-teal-600 py-3 rounded-md hover:bg-teal-50 transition-colors font-semibold">
                  Request Callback
                </button>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {photographer.contactInfo.phone && (
                    <a
                      href={`tel:${photographer.contactInfo.phone}`}
                      className="flex items-center text-gray-700 hover:text-teal-600 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {photographer.contactInfo.phone}
                    </a>
                  )}
                  {photographer.contactInfo.email && (
                    <a
                      href={`mailto:${photographer.contactInfo.email}`}
                      className="flex items-center text-gray-700 hover:text-teal-600 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {photographer.contactInfo.email}
                    </a>
                  )}
                  {photographer.contactInfo.whatsapp && (
                    <a
                      href={`https://wa.me/${photographer.contactInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-teal-600 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </a>
                  )}
                  {photographer.contactInfo.instagram && (
                    <a
                      href={`https://instagram.com/${photographer.contactInfo.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-teal-600 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      {photographer.contactInfo.instagram}
                    </a>
                  )}
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Address</h3>
                <p className="text-gray-600">
                  {photographer.location.address}<br />
                  {photographer.location.area}<br />
                  {photographer.location.city} - {photographer.location.pincode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerDetails;

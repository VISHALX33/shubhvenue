import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaBed, FaUsers, FaStar, FaRupeeSign, FaPhone, FaEnvelope, FaGlobe, FaArrowLeft, FaCheckCircle, FaClock, FaBan, FaParking, FaSmoking } from 'react-icons/fa';

function HomestayDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [homestay, setHomestay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    fetchHomestay();
  }, [id]);

  const fetchHomestay = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/homestays/${id}`);
      setHomestay(response.data.data);
    } catch (error) {
      console.error('Error fetching homestay:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-rose-500"></div>
      </div>
    );
  }

  if (!homestay) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Homestay not found</h2>
          <button
            onClick={() => navigate('/stay-hospitality/homestay')}
            className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-rose-600 hover:to-pink-700"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About', icon: FaCheckCircle },
    { id: 'amenities', label: 'Amenities', icon: FaCheckCircle },
    { id: 'portfolio', label: 'Portfolio', icon: FaStar },
    { id: 'policies', label: 'Policies', icon: FaClock },
    { id: 'reviews', label: 'Reviews', icon: FaStar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/stay-hospitality/homestay')}
          className="mb-6 flex items-center text-rose-600 hover:text-rose-700 font-semibold"
        >
          <FaArrowLeft className="mr-2" />
          Back to Homestays
        </button>

        {/* Image Gallery */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            <div className="lg:col-span-2">
              <img
                src={homestay.images[selectedImage] || homestay.mainImage}
                alt={homestay.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {homestay.images.slice(0, 5).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${homestay.name} ${index + 1}`}
                  className={`w-full h-24 lg:h-16 object-cover rounded-lg cursor-pointer transition-all ${
                    selectedImage === index ? 'ring-4 ring-rose-500' : 'hover:opacity-75'
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Header */}
              <div className="mb-6 relative">
                <div className="absolute top-0 right-0">
                  <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {homestay.type}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{homestay.name}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaMapMarkerAlt className="text-rose-500 mr-2" />
                  <span>{homestay.location.area}, {homestay.location.city}, {homestay.location.pincode}</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-semibold text-gray-800 mr-1">{homestay.ratings.average.toFixed(1)}</span>
                  <span className="text-gray-600">({homestay.ratings.count} reviews)</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex flex-wrap gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-4 py-2 font-semibold transition-colors ${
                        activeTab === tab.id
                          ? 'text-rose-600 border-b-2 border-rose-600'
                          : 'text-gray-600 hover:text-rose-600'
                      }`}
                    >
                      <tab.icon className="mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'about' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Homestay</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">{homestay.about}</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-rose-50 p-4 rounded-lg text-center">
                      <FaBed className="text-3xl text-rose-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-800">{homestay.rooms}</p>
                      <p className="text-sm text-gray-600">Rooms</p>
                    </div>
                    <div className="bg-rose-50 p-4 rounded-lg text-center">
                      <FaUsers className="text-3xl text-rose-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-800">{homestay.capacity.min}</p>
                      <p className="text-sm text-gray-600">Min Capacity</p>
                    </div>
                    <div className="bg-rose-50 p-4 rounded-lg text-center">
                      <FaUsers className="text-3xl text-rose-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-800">{homestay.capacity.max}</p>
                      <p className="text-sm text-gray-600">Max Capacity</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'amenities' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {homestay.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <FaCheckCircle className="text-rose-500 mr-2" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Photo Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {homestay.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
                        onClick={() => setSelectedImage(index)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'policies' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">House Policies</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FaClock className="text-rose-500 mr-3 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Check-in Time</p>
                        <p className="text-gray-600">{homestay.policies.checkIn}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaClock className="text-rose-500 mr-3 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Check-out Time</p>
                        <p className="text-gray-600">{homestay.policies.checkOut}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaBan className="text-rose-500 mr-3 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Cancellation Policy</p>
                        <p className="text-gray-600">{homestay.policies.cancellation}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaParking className="text-rose-500 mr-3 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Parking</p>
                        <p className="text-gray-600">
                          {homestay.policies.parking ? 'Available' : 'Not Available'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaSmoking className="text-rose-500 mr-3 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Smoking</p>
                        <p className="text-gray-600">
                          {homestay.policies.smoking ? 'Allowed' : 'Not Allowed'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Guest Reviews</h2>
                  <div className="space-y-4">
                    {homestay.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-rose-600 font-semibold">
                              {review.userName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{review.userName}</p>
                            <div className="flex items-center">
                              <FaStar className="text-yellow-400 mr-1" />
                              <span className="text-sm text-gray-600">{review.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 ml-13">{review.comment}</p>
                        <p className="text-sm text-gray-500 ml-13 mt-1">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <FaRupeeSign className="text-2xl text-rose-600 mr-1" />
                  <span className="text-4xl font-bold text-rose-600">{homestay.price.perDay.toLocaleString()}</span>
                  <span className="text-gray-600 ml-2">/day</span>
                </div>
                {homestay.price.perPlate && (
                  <div className="flex items-baseline">
                    <FaRupeeSign className="text-sm text-gray-500 mr-1" />
                    <span className="text-gray-600">{homestay.price.perPlate.toLocaleString()} per plate</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Rooms</span>
                  <span className="font-semibold text-gray-800">{homestay.rooms}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-semibold text-gray-800">{homestay.capacity.min}-{homestay.capacity.max} guests</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Type</span>
                  <span className="font-semibold text-gray-800">{homestay.type}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold text-gray-800">{homestay.location.city}</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-md mb-3">
                Book Now
              </button>

              <button className="w-full border-2 border-rose-500 text-rose-600 py-3 rounded-lg font-semibold hover:bg-rose-50 transition-colors">
                Request Callback
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  {homestay.contactInfo.phone && (
                    <a href={`tel:${homestay.contactInfo.phone}`} className="flex items-center text-gray-600 hover:text-rose-600">
                      <FaPhone className="mr-2" />
                      <span>{homestay.contactInfo.phone}</span>
                    </a>
                  )}
                  {homestay.contactInfo.email && (
                    <a href={`mailto:${homestay.contactInfo.email}`} className="flex items-center text-gray-600 hover:text-rose-600">
                      <FaEnvelope className="mr-2" />
                      <span>{homestay.contactInfo.email}</span>
                    </a>
                  )}
                  {homestay.contactInfo.website && (
                    <a href={`https://${homestay.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-rose-600">
                      <FaGlobe className="mr-2" />
                      <span>{homestay.contactInfo.website}</span>
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

export default HomestayDetails;

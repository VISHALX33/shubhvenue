import API_URL from '../config/api';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaWarehouse, FaRulerCombined, FaTruck, FaThermometerHalf, FaShieldAlt, FaCheck, FaPhone, FaEnvelope, FaWhatsapp, FaInstagram, FaGlobe } from 'react-icons/fa'

function WarehouseGodownBookingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [warehouse, setWarehouse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('about')
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    comment: ''
  })

  useEffect(() => {
    fetchWarehouseDetails()
  }, [id])

  const fetchWarehouseDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/warehouse-godown/${id}`)
      setWarehouse(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching warehouse details:', error)
      setLoading(false)
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/warehouse-godown/${id}/reviews`, reviewForm)
      setReviewForm({ userName: '', rating: 5, comment: '' })
      fetchWarehouseDetails()
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-slate-600"></div>
      </div>
    )
  }

  if (!warehouse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Warehouse/Godown not found</h2>
          <button onClick={() => navigate('/property-rental/warehouse-godown')} className="text-slate-600 hover:underline">
            Back to Listings
          </button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'categories', label: 'Categories' },
    { id: 'packages', label: 'Packages' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'features', label: 'Features & Security' },
    { id: 'reviews', label: 'Reviews' }
  ]

  const minPrice = warehouse.packages.length > 0 ? Math.min(...warehouse.packages.map(pkg => pkg.price)) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/property-rental/warehouse-godown')}
            className="flex items-center text-white hover:text-slate-200 mb-4 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Warehouses
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{warehouse.name}</h1>
              <div className="flex items-center text-slate-100 mb-2">
                <FaMapMarkerAlt className="mr-2" />
                <span>{warehouse.location.area}, {warehouse.location.city}, {warehouse.location.state}</span>
              </div>
              {warehouse.location.landmark && (
                <p className="text-slate-200 text-sm">Near {warehouse.location.landmark}</p>
              )}
            </div>
            <div className="bg-white text-slate-700 px-6 py-4 rounded-lg shadow-lg">
              <p className="text-sm text-gray-600">Starting from</p>
              <p className="text-3xl font-bold">₹{minPrice.toLocaleString()}</p>
              <p className="text-sm text-gray-600">per month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="grid grid-cols-2 gap-2 p-2">
                <img
                  src={warehouse.mainImage}
                  alt={warehouse.name}
                  className="col-span-2 w-full h-96 object-cover rounded-lg"
                />
                {warehouse.images.slice(1, 5).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${warehouse.name} ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <FaWarehouse className="text-3xl text-slate-600" />
                </div>
                <p className="text-sm text-gray-600 text-center">Type</p>
                <p className="text-lg font-bold text-center text-slate-700">{warehouse.type}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <FaRulerCombined className="text-3xl text-slate-600" />
                </div>
                <p className="text-sm text-gray-600 text-center">Area</p>
                <p className="text-lg font-bold text-center text-slate-700">{warehouse.area.toLocaleString()} sq ft</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <FaThermometerHalf className="text-3xl text-slate-600" />
                </div>
                <p className="text-sm text-gray-600 text-center">Climate Control</p>
                <p className="text-lg font-bold text-center text-slate-700">{warehouse.temperatureControlled}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <FaTruck className="text-3xl text-slate-600" />
                </div>
                <p className="text-sm text-gray-600 text-center">Loading Docks</p>
                <p className="text-lg font-bold text-center text-slate-700">{warehouse.loadingDocks}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200 overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'text-slate-700 border-b-2 border-slate-600 bg-slate-50'
                        : 'text-gray-600 hover:text-slate-700 hover:bg-gray-50'
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
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">About This Warehouse</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{warehouse.about}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <p className="text-sm text-gray-600 mb-1">Experience</p>
                        <p className="text-xl font-bold text-slate-700">{warehouse.experience} Years</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <p className="text-sm text-gray-600 mb-1">Clients Served</p>
                        <p className="text-xl font-bold text-slate-700">{warehouse.clientsServed}+</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <p className="text-sm text-gray-600 mb-1">24/7 Access</p>
                        <p className="text-xl font-bold text-slate-700">{warehouse.access247 ? 'Yes' : 'No'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Storage Capacity</p>
                        <p className="text-lg font-semibold text-gray-800">{warehouse.storageCapacity}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Ceiling Height</p>
                        <p className="text-lg font-semibold text-gray-800">{warehouse.height}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Floor Type</p>
                        <p className="text-lg font-semibold text-gray-800">{warehouse.floorType}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Parking Space</p>
                        <p className="text-lg font-semibold text-gray-800">{warehouse.parkingSpace}</p>
                      </div>
                      {warehouse.temperatureRange && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2">
                          <p className="text-sm text-gray-600 mb-1">Temperature Range</p>
                          <p className="text-lg font-semibold text-gray-800">{warehouse.temperatureRange}</p>
                        </div>
                      )}
                    </div>

                    {warehouse.certifications && warehouse.certifications.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Certifications</h4>
                        <div className="flex flex-wrap gap-2">
                          {warehouse.certifications.map((cert, index) => (
                            <span key={index} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold border border-slate-300">
                              🏆 {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {warehouse.nearbyFacilities && warehouse.nearbyFacilities.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Nearby Facilities</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {warehouse.nearbyFacilities.map((facility, index) => (
                            <div key={index} className="flex items-center text-gray-700">
                              <span className="text-slate-600 mr-2">📍</span>
                              <span>{facility}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Categories Tab */}
                {activeTab === 'categories' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Categories</h3>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {warehouse.categories.map((category, index) => (
                        <span key={index} className="bg-gradient-to-r from-slate-600 to-gray-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md">
                          {category}
                        </span>
                      ))}
                    </div>

                    {warehouse.suitableFor && warehouse.suitableFor.length > 0 && (
                      <>
                        <h4 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Suitable For Storage</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {warehouse.suitableFor.map((item, index) => (
                            <div key={index} className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 text-center hover:border-slate-400 transition-colors">
                              <p className="font-semibold text-slate-700">📦 {item}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Packages Tab */}
                {activeTab === 'packages' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Rental Packages</h3>
                    <div className="space-y-4">
                      {warehouse.packages.map((pkg, index) => (
                        <div key={index} className="border-2 border-slate-200 rounded-xl p-6 hover:border-slate-400 transition-colors hover:shadow-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-xl font-bold text-slate-700">{pkg.name}</h4>
                              <p className="text-sm text-gray-600">{pkg.duration}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold text-slate-700">₹{pkg.price.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">per month</p>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{pkg.description}</p>
                          <div className="bg-slate-50 rounded-lg p-4">
                            <p className="font-semibold text-gray-800 mb-2">Includes:</p>
                            <ul className="space-y-1">
                              {pkg.includes.map((item, idx) => (
                                <li key={idx} className="flex items-start text-gray-700">
                                  <FaCheck className="text-slate-600 mr-2 mt-1 flex-shrink-0" />
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
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Amenities & Facilities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {warehouse.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center text-gray-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                          <FaCheck className="text-slate-600 mr-3 flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features & Security Tab */}
                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Special Features</h3>
                    <div className="mb-6">
                      <ul className="space-y-2">
                        {warehouse.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-gray-700">
                            <span className="text-slate-600 mr-3 mt-1">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {warehouse.securityFeatures && warehouse.securityFeatures.length > 0 && (
                      <>
                        <h4 className="text-xl font-semibold text-gray-800 mb-3 mt-6 flex items-center">
                          <FaShieldAlt className="mr-2 text-slate-600" />
                          Security Features
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                          {warehouse.securityFeatures.map((feature, index) => (
                            <div key={index} className="flex items-center text-gray-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                              <FaShieldAlt className="text-slate-600 mr-3 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {warehouse.fireSafety && warehouse.fireSafety.length > 0 && (
                      <>
                        <h4 className="text-xl font-semibold text-gray-800 mb-3 mt-6 flex items-center">
                          🔥 Fire Safety Systems
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {warehouse.fireSafety.map((safety, index) => (
                            <div key={index} className="flex items-center text-gray-700 bg-red-50 p-3 rounded-lg border border-red-200">
                              <span className="mr-3">🚒</span>
                              <span>{safety}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h3>
                    
                    {/* Rating Summary */}
                    <div className="bg-slate-50 rounded-xl p-6 mb-6 border border-slate-200">
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-5xl font-bold text-slate-700 mr-3">{warehouse.ratings.toFixed(1)}</span>
                        <div>
                          <div className="flex text-yellow-400 text-2xl">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={i < Math.round(warehouse.ratings) ? 'text-yellow-400' : 'text-gray-300'} />
                            ))}
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{warehouse.reviews.length} reviews</p>
                        </div>
                      </div>
                    </div>

                    {/* Review Form */}
                    <div className="bg-white border-2 border-slate-200 rounded-xl p-6 mb-6">
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">Write a Review</h4>
                      <form onSubmit={handleReviewSubmit}>
                        <div className="mb-4">
                          <label className="block text-gray-700 mb-2">Your Name</label>
                          <input
                            type="text"
                            value={reviewForm.userName}
                            onChange={(e) => setReviewForm({...reviewForm, userName: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 mb-2">Rating</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewForm({...reviewForm, rating: star})}
                                className="text-3xl focus:outline-none"
                              >
                                <FaStar className={star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 mb-2">Your Review</label>
                          <textarea
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            rows="4"
                            required
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-slate-600 to-gray-600 text-white px-6 py-2 rounded-lg hover:from-slate-700 hover:to-gray-700 transition-all duration-300 font-semibold"
                        >
                          Submit Review
                        </button>
                      </form>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {warehouse.reviews.map((review, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-gray-800">{review.userName}</p>
                              <div className="flex text-yellow-400 text-sm">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-3">
                {warehouse.contactInfo.phone && (
                  <a href={`tel:${warehouse.contactInfo.phone}`} className="flex items-center text-gray-700 hover:text-slate-600 transition-colors p-3 bg-slate-50 rounded-lg">
                    <FaPhone className="mr-3 text-slate-600" />
                    <span>{warehouse.contactInfo.phone}</span>
                  </a>
                )}
                {warehouse.contactInfo.email && (
                  <a href={`mailto:${warehouse.contactInfo.email}`} className="flex items-center text-gray-700 hover:text-slate-600 transition-colors p-3 bg-slate-50 rounded-lg">
                    <FaEnvelope className="mr-3 text-slate-600" />
                    <span className="break-all">{warehouse.contactInfo.email}</span>
                  </a>
                )}
                {warehouse.contactInfo.whatsapp && (
                  <a href={`https://wa.me/${warehouse.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-slate-600 transition-colors p-3 bg-slate-50 rounded-lg">
                    <FaWhatsapp className="mr-3 text-slate-600" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {warehouse.contactInfo.instagram && (
                  <a href={`https://instagram.com/${warehouse.contactInfo.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-slate-600 transition-colors p-3 bg-slate-50 rounded-lg">
                    <FaInstagram className="mr-3 text-slate-600" />
                    <span>{warehouse.contactInfo.instagram}</span>
                  </a>
                )}
                {warehouse.contactInfo.website && (
                  <a href={warehouse.contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-slate-600 transition-colors p-3 bg-slate-50 rounded-lg">
                    <FaGlobe className="mr-3 text-slate-600" />
                    <span>Visit Website</span>
                  </a>
                )}
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-slate-600 to-gray-600 text-white py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WarehouseGodownBookingDetails

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaMapMarkedAlt, FaRuler, FaRoad, FaTint, FaBolt, FaCheckCircle, FaCheck, FaPhone, FaEnvelope, FaWhatsapp, FaInstagram, FaGlobe } from 'react-icons/fa'

function JameenPlotBookingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [plot, setPlot] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('about')
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    comment: ''
  })

  useEffect(() => {
    fetchPlotDetails()
  }, [id])

  const fetchPlotDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jameen-plot/${id}`)
      setPlot(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching plot details:', error)
      setLoading(false)
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:5000/api/jameen-plot/${id}/reviews`, reviewForm)
      setReviewForm({ userName: '', rating: 5, comment: '' })
      fetchPlotDetails()
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    )
  }

  if (!plot) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Jameen/Plot not found</h2>
          <button onClick={() => navigate('/property-rental/jameen-plot')} className="text-green-600 hover:underline">
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
    { id: 'features', label: 'Features & Approvals' },
    { id: 'reviews', label: 'Reviews' }
  ]

  const minPrice = plot.packages.length > 0 ? Math.min(...plot.packages.map(pkg => pkg.price)) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/property-rental/jameen-plot')}
            className="flex items-center text-white hover:text-green-200 mb-4 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Jameen/Plot Listings
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{plot.name}</h1>
              <div className="flex items-center text-green-100 mb-2">
                <FaMapMarkerAlt className="mr-2" />
                <span>{plot.location.area}, {plot.location.city}, {plot.location.state}</span>
              </div>
              {plot.location.landmark && (
                <p className="text-green-200 text-sm">Near {plot.location.landmark}</p>
              )}
            </div>
            <div className="bg-white text-green-700 px-6 py-4 rounded-lg shadow-lg">
              <p className="text-sm text-gray-600">Starting from</p>
              <p className="text-3xl font-bold">₹{minPrice.toLocaleString()}</p>
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
                  src={plot.mainImage}
                  alt={plot.name}
                  className="col-span-2 w-full h-96 object-cover rounded-lg"
                />
                {plot.images.slice(1, 5).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${plot.name} ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <FaMapMarkedAlt className="text-3xl text-green-600" />
                </div>
                <p className="text-sm text-gray-600 text-center">Type</p>
                <p className="text-lg font-bold text-center text-green-700">{plot.type}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <FaRuler className="text-3xl text-green-600" />
                </div>
                <p className="text-sm text-gray-600 text-center">Area</p>
                <p className="text-lg font-bold text-center text-green-700">{plot.area} {plot.areaUnit}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <FaRoad className="text-3xl text-green-600" />
                </div>
                <p className="text-sm text-gray-600 text-center">Road Access</p>
                <p className="text-lg font-bold text-center text-green-700">{plot.roadAccess}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl">🧭</span>
                </div>
                <p className="text-sm text-gray-600 text-center">Facing</p>
                <p className="text-lg font-bold text-center text-green-700">{plot.plotFacing || 'N/A'}</p>
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
                        ? 'text-green-700 border-b-2 border-green-600 bg-green-50'
                        : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
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
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">About This Plot</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{plot.about}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-600 mb-1">Experience</p>
                        <p className="text-xl font-bold text-green-700">{plot.experience} Years</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-600 mb-1">Clients Served</p>
                        <p className="text-xl font-bold text-green-700">{plot.clientsServed}+</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-600 mb-1">Price per {plot.areaUnit}</p>
                        <p className="text-xl font-bold text-green-700">₹{plot.pricePerSqFt?.toLocaleString() || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {plot.dimensions && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">Dimensions</p>
                          <p className="text-lg font-semibold text-gray-800">{plot.dimensions}</p>
                        </div>
                      )}
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Boundary Wall</p>
                        <p className="text-lg font-semibold text-gray-800">{plot.boundaryWall}</p>
                      </div>
                      {plot.roadWidth && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">Road Width</p>
                          <p className="text-lg font-semibold text-gray-800">{plot.roadWidth}</p>
                        </div>
                      )}
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Water Supply</p>
                        <p className="text-lg font-semibold text-gray-800">{plot.waterSupply}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Electricity</p>
                        <p className="text-lg font-semibold text-gray-800">{plot.electricity}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Possession</p>
                        <p className="text-lg font-semibold text-gray-800">{plot.possession}</p>
                      </div>
                      {plot.soilType && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">Soil Type</p>
                          <p className="text-lg font-semibold text-gray-800">{plot.soilType}</p>
                        </div>
                      )}
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Clear Title</p>
                        <p className="text-lg font-semibold text-gray-800">{plot.clearTitle ? 'Yes' : 'No'}</p>
                      </div>
                    </div>

                    {plot.developerName && (
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
                        <p className="text-sm text-gray-600 mb-1">Developer</p>
                        <p className="text-xl font-bold text-green-700">{plot.developerName}</p>
                        {plot.projectName && (
                          <p className="text-gray-700 mt-2">Project: {plot.projectName}</p>
                        )}
                        {plot.totalPlots && (
                          <p className="text-gray-600 text-sm mt-1">
                            {plot.plotsAvailable} of {plot.totalPlots} plots available
                          </p>
                        )}
                      </div>
                    )}

                    {plot.nearbyFacilities && plot.nearbyFacilities.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Nearby Facilities</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {plot.nearbyFacilities.map((facility, index) => (
                            <div key={index} className="flex items-center text-gray-700">
                              <span className="text-green-600 mr-2">📍</span>
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
                      {plot.categories.map((category, index) => (
                        <span key={index} className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md">
                          {category}
                        </span>
                      ))}
                    </div>

                    {plot.suitableFor && plot.suitableFor.length > 0 && (
                      <>
                        <h4 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Suitable For</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {plot.suitableFor.map((item, index) => (
                            <div key={index} className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
                              <p className="font-semibold text-green-700">🏗️ {item}</p>
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
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Pricing Packages</h3>
                    <div className="space-y-4">
                      {plot.packages.map((pkg, index) => (
                        <div key={index} className="border-2 border-green-200 rounded-xl p-6 hover:border-green-400 transition-colors hover:shadow-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-xl font-bold text-green-700">{pkg.name}</h4>
                              <p className="text-sm text-gray-600">{pkg.duration}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold text-green-700">₹{pkg.price.toLocaleString()}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{pkg.description}</p>
                          <div className="bg-green-50 rounded-lg p-4">
                            <p className="font-semibold text-gray-800 mb-2">Includes:</p>
                            <ul className="space-y-1">
                              {pkg.includes.map((item, idx) => (
                                <li key={idx} className="flex items-start text-gray-700">
                                  <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
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
                      {plot.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center text-gray-700 bg-green-50 p-3 rounded-lg border border-green-200">
                          <FaCheck className="text-green-600 mr-3 flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Special Features</h3>
                    <div className="mb-6">
                      <ul className="space-y-2">
                        {plot.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-gray-700">
                            <span className="text-green-600 mr-3 mt-1">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plot.approved && plot.approved.length > 0 && (
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-3">Approvals & Certifications</h4>
                        <div className="flex flex-wrap gap-3">
                          {plot.approved.map((approval, index) => (
                            <div key={index} className="bg-green-50 border-2 border-green-300 rounded-lg px-4 py-2 flex items-center">
                              <FaCheckCircle className="text-green-600 mr-2" />
                              <span className="font-semibold text-green-700">{approval}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h3>
                    
                    {/* Rating Summary */}
                    <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-200">
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-5xl font-bold text-green-700 mr-3">{plot.ratings.toFixed(1)}</span>
                        <div>
                          <div className="flex text-yellow-400 text-2xl">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={i < Math.round(plot.ratings) ? 'text-yellow-400' : 'text-gray-300'} />
                            ))}
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{plot.reviews.length} reviews</p>
                        </div>
                      </div>
                    </div>

                    {/* Review Form */}
                    <div className="bg-white border-2 border-green-200 rounded-xl p-6 mb-6">
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">Write a Review</h4>
                      <form onSubmit={handleReviewSubmit}>
                        <div className="mb-4">
                          <label className="block text-gray-700 mb-2">Your Name</label>
                          <input
                            type="text"
                            value={reviewForm.userName}
                            onChange={(e) => setReviewForm({...reviewForm, userName: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            rows="4"
                            required
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold"
                        >
                          Submit Review
                        </button>
                      </form>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {plot.reviews.map((review, index) => (
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
                {plot.contactInfo.phone && (
                  <a href={`tel:${plot.contactInfo.phone}`} className="flex items-center text-gray-700 hover:text-green-600 transition-colors p-3 bg-green-50 rounded-lg">
                    <FaPhone className="mr-3 text-green-600" />
                    <span>{plot.contactInfo.phone}</span>
                  </a>
                )}
                {plot.contactInfo.email && (
                  <a href={`mailto:${plot.contactInfo.email}`} className="flex items-center text-gray-700 hover:text-green-600 transition-colors p-3 bg-green-50 rounded-lg">
                    <FaEnvelope className="mr-3 text-green-600" />
                    <span className="break-all">{plot.contactInfo.email}</span>
                  </a>
                )}
                {plot.contactInfo.whatsapp && (
                  <a href={`https://wa.me/${plot.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-green-600 transition-colors p-3 bg-green-50 rounded-lg">
                    <FaWhatsapp className="mr-3 text-green-600" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {plot.contactInfo.instagram && (
                  <a href={`https://instagram.com/${plot.contactInfo.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-green-600 transition-colors p-3 bg-green-50 rounded-lg">
                    <FaInstagram className="mr-3 text-green-600" />
                    <span>{plot.contactInfo.instagram}</span>
                  </a>
                )}
                {plot.contactInfo.website && (
                  <a href={plot.contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-green-600 transition-colors p-3 bg-green-50 rounded-lg">
                    <FaGlobe className="mr-3 text-green-600" />
                    <span>Visit Website</span>
                  </a>
                )}
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JameenPlotBookingDetails

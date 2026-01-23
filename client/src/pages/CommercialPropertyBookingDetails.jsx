import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaCheck, FaBuilding, FaRuler, FaCouch, FaParking, FaBolt, FaArrowUp, FaCheckCircle } from 'react-icons/fa'

function CommercialPropertyBookingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('about')
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    comment: ''
  })

  useEffect(() => {
    fetchProperty()
  }, [id])

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/commercial-property/${id}`)
      setProperty(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching property:', error)
      setLoading(false)
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:5000/api/commercial-property/${id}/reviews`, reviewForm)
      setReviewForm({ userName: '', rating: 5, comment: '' })
      fetchProperty()
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Property not found</h2>
          <button onClick={() => navigate('/property-rental/commercial-property')} className="text-blue-600 hover:text-blue-800">
            Back to listings
          </button>
        </div>
      </div>
    )
  }

  const minPrice = property.packages && property.packages.length > 0
    ? Math.min(...property.packages.map(pkg => pkg.price))
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate('/property-rental/commercial-property')} className="flex items-center mb-4 hover:text-blue-200 transition-colors">
            <FaArrowLeft className="mr-2" /> Back to Commercial Properties
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{property.name}</h1>
              <div className="flex items-center text-blue-100">
                <FaMapMarkerAlt className="mr-2" />
                <span>{property.location.area}, {property.location.city}, {property.location.state}</span>
                {property.location.landmark && <span className="ml-2">• {property.location.landmark}</span>}
              </div>
            </div>
            <div className="bg-white text-blue-600 px-6 py-4 rounded-lg shadow-lg">
              <p className="text-sm text-gray-600">Starting from</p>
              <p className="text-3xl font-bold">₹{minPrice.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{property.leaseTerm}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <img src={property.mainImage} alt={property.name} className="w-full h-96 object-cover rounded-lg mb-4" />
              <div className="grid grid-cols-4 gap-4">
                {property.images && property.images.slice(0, 4).map((image, index) => (
                  <img key={index} src={image} alt={`${property.name} ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <FaBuilding className="text-3xl text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-semibold text-gray-800">{property.type}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <FaRuler className="text-3xl text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Area</p>
                <p className="font-semibold text-gray-800">{property.area} {property.areaUnit}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <FaCouch className="text-3xl text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Furnished</p>
                <p className="font-semibold text-gray-800">{property.furnished}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <span className="text-3xl mx-auto mb-2 block">📅</span>
                <p className="text-sm text-gray-600">Lease Term</p>
                <p className="font-semibold text-gray-800">{property.leaseTerm}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex border-b border-gray-200 mb-6">
                <button onClick={() => setActiveTab('about')} className={`px-6 py-3 font-semibold ${activeTab === 'about' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
                  About
                </button>
                <button onClick={() => setActiveTab('categories')} className={`px-6 py-3 font-semibold ${activeTab === 'categories' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
                  Categories
                </button>
                <button onClick={() => setActiveTab('packages')} className={`px-6 py-3 font-semibold ${activeTab === 'packages' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
                  Packages
                </button>
                <button onClick={() => setActiveTab('amenities')} className={`px-6 py-3 font-semibold ${activeTab === 'amenities' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
                  Amenities
                </button>
                <button onClick={() => setActiveTab('features')} className={`px-6 py-3 font-semibold ${activeTab === 'features' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
                  Features
                </button>
                <button onClick={() => setActiveTab('reviews')} className={`px-6 py-3 font-semibold ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
                  Reviews
                </button>
              </div>

              {/* About Tab */}
              {activeTab === 'about' && (
                <div>
                  <p className="text-gray-700 leading-relaxed mb-6">{property.about}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-blue-600">{property.experience}+</p>
                      <p className="text-sm text-gray-600">Years Experience</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-blue-600">{property.clientsServed}+</p>
                      <p className="text-sm text-gray-600">Clients Served</p>
                    </div>
                    {property.securityDeposit && (
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-3xl font-bold text-blue-600">₹{property.securityDeposit.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Security Deposit</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {property.floorNumber && (
                      <div>
                        <p className="text-sm text-gray-600">Floor Number</p>
                        <p className="font-semibold text-gray-800">{property.floorNumber}</p>
                      </div>
                    )}
                    {property.totalFloors && (
                      <div>
                        <p className="text-sm text-gray-600">Total Floors</p>
                        <p className="font-semibold text-gray-800">{property.totalFloors}</p>
                      </div>
                    )}
                    {property.parking > 0 && (
                      <div>
                        <p className="text-sm text-gray-600">Parking Spaces</p>
                        <p className="font-semibold text-gray-800">{property.parking}</p>
                      </div>
                    )}
                    {property.washrooms && (
                      <div>
                        <p className="text-sm text-gray-600">Washrooms</p>
                        <p className="font-semibold text-gray-800">{property.washrooms}</p>
                      </div>
                    )}
                    {property.maintenanceCharges && (
                      <div>
                        <p className="text-sm text-gray-600">Maintenance Charges</p>
                        <p className="font-semibold text-gray-800">₹{property.maintenanceCharges.toLocaleString()}/month</p>
                      </div>
                    )}
                    {property.lockInPeriod && (
                      <div>
                        <p className="text-sm text-gray-600">Lock-in Period</p>
                        <p className="font-semibold text-gray-800">{property.lockInPeriod}</p>
                      </div>
                    )}
                    {property.buildingGrade && (
                      <div>
                        <p className="text-sm text-gray-600">Building Grade</p>
                        <p className="font-semibold text-gray-800">{property.buildingGrade}</p>
                      </div>
                    )}
                    {property.propertyAge && (
                      <div>
                        <p className="text-sm text-gray-600">Property Age</p>
                        <p className="font-semibold text-gray-800">{property.propertyAge}</p>
                      </div>
                    )}
                  </div>

                  {property.nearbyFacilities && property.nearbyFacilities.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Nearby Facilities</h3>
                      <ul className="space-y-2">
                        {property.nearbyFacilities.map((facility, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <FaMapMarkerAlt className="mr-2 text-blue-600" />
                            {facility}
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {property.categories && property.categories.map((category, index) => (
                      <div key={index} className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="font-semibold text-blue-700">{category}</p>
                      </div>
                    ))}
                  </div>
                  
                  {property.suitableFor && property.suitableFor.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Suitable For</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {property.suitableFor.map((use, index) => (
                          <div key={index} className="bg-gradient-to-r from-blue-50 to-sky-50 p-4 rounded-lg text-center">
                            <p className="text-2xl mb-2">🏢</p>
                            <p className="font-semibold text-gray-800">{use}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Packages Tab */}
              {activeTab === 'packages' && (
                <div className="space-y-6">
                  {property.packages && property.packages.map((pkg, index) => (
                    <div key={index} className="border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{pkg.name}</h3>
                          <p className="text-gray-600">{pkg.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-blue-600">₹{pkg.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{pkg.description}</p>
                      {pkg.includes && pkg.includes.length > 0 && (
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Includes:</p>
                          <ul className="space-y-2">
                            {pkg.includes.map((item, i) => (
                              <li key={i} className="flex items-center text-gray-700">
                                <FaCheck className="mr-2 text-blue-600" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Amenities Tab */}
              {activeTab === 'amenities' && (
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities && property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <FaCheck className="text-blue-600 mr-3" />
                      <span className="text-gray-800">{amenity}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className={`p-4 rounded-lg text-center ${property.powerBackup ? 'bg-blue-50' : 'bg-gray-100'}`}>
                      <FaBolt className={`text-3xl mx-auto mb-2 ${property.powerBackup ? 'text-blue-600' : 'text-gray-400'}`} />
                      <p className="text-sm font-semibold">Power Backup</p>
                      <p className="text-xs text-gray-600">{property.powerBackup ? 'Available' : 'Not Available'}</p>
                    </div>
                    <div className={`p-4 rounded-lg text-center ${property.lift ? 'bg-blue-50' : 'bg-gray-100'}`}>
                      <FaArrowUp className={`text-3xl mx-auto mb-2 ${property.lift ? 'text-blue-600' : 'text-gray-400'}`} />
                      <p className="text-sm font-semibold">Lift</p>
                      <p className="text-xs text-gray-600">{property.lift ? 'Available' : 'Not Available'}</p>
                    </div>
                    <div className={`p-4 rounded-lg text-center ${property.pantry ? 'bg-blue-50' : 'bg-gray-100'}`}>
                      <span className={`text-3xl mx-auto mb-2 block ${property.pantry ? '' : 'opacity-40'}`}>🍽️</span>
                      <p className="text-sm font-semibold">Pantry</p>
                      <p className="text-xs text-gray-600">{property.pantry ? 'Available' : 'Not Available'}</p>
                    </div>
                    <div className={`p-4 rounded-lg text-center ${property.parking > 0 ? 'bg-blue-50' : 'bg-gray-100'}`}>
                      <FaParking className={`text-3xl mx-auto mb-2 ${property.parking > 0 ? 'text-blue-600' : 'text-gray-400'}`} />
                      <p className="text-sm font-semibold">Parking</p>
                      <p className="text-xs text-gray-600">{property.parking > 0 ? `${property.parking} spots` : 'Not Available'}</p>
                    </div>
                    <div className={`p-4 rounded-lg text-center ${property.fireExtinguisher ? 'bg-blue-50' : 'bg-gray-100'}`}>
                      <span className={`text-3xl mx-auto mb-2 block ${property.fireExtinguisher ? '' : 'opacity-40'}`}>🧯</span>
                      <p className="text-sm font-semibold">Fire Extinguisher</p>
                      <p className="text-xs text-gray-600">{property.fireExtinguisher ? 'Available' : 'Not Available'}</p>
                    </div>
                    <div className={`p-4 rounded-lg text-center ${property.cctvSurveillance ? 'bg-blue-50' : 'bg-gray-100'}`}>
                      <span className={`text-3xl mx-auto mb-2 block ${property.cctvSurveillance ? '' : 'opacity-40'}`}>📹</span>
                      <p className="text-sm font-semibold">CCTV Surveillance</p>
                      <p className="text-xs text-gray-600">{property.cctvSurveillance ? 'Available' : 'Not Available'}</p>
                    </div>
                  </div>

                  {property.features && property.features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Additional Features</h3>
                      <ul className="space-y-2">
                        {property.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-gray-700">
                            <span className="mr-2 text-blue-600">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <FaStar className="text-yellow-400 text-3xl mr-2" />
                      <span className="text-3xl font-bold text-gray-800">{property.ratings || 0}</span>
                      <span className="text-gray-600 ml-2">({property.reviews?.length || 0} reviews)</span>
                    </div>
                  </div>

                  <form onSubmit={handleReviewSubmit} className="mb-8 p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Write a Review</h3>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        value={reviewForm.userName}
                        onChange={(e) => setReviewForm({...reviewForm, userName: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Rating</label>
                      <select
                        value={reviewForm.rating}
                        onChange={(e) => setReviewForm({...reviewForm, rating: Number(e.target.value)})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      >
                        {[5, 4, 3, 2, 1].map(num => (
                          <option key={num} value={num}>{num} Stars</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Comment</label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        rows="4"
                        required
                      />
                    </div>
                    <button type="submit" className="bg-gradient-to-r from-blue-600 to-sky-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-sky-700 transition-all">
                      Submit Review
                    </button>
                  </form>

                  <div className="space-y-4">
                    {property.reviews && property.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <div className="flex items-center mb-2">
                          <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3">
                            {review.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{review.userName}</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                              ))}
                              <span className="text-sm text-gray-600 ml-2">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 ml-13">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              
              {property.contactInfo?.phone && (
                <a href={`tel:${property.contactInfo.phone}`} className="block mb-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-blue-600">{property.contactInfo.phone}</p>
                </a>
              )}
              
              {property.contactInfo?.email && (
                <a href={`mailto:${property.contactInfo.email}`} className="block mb-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-blue-600">{property.contactInfo.email}</p>
                </a>
              )}
              
              {property.contactInfo?.whatsapp && (
                <a href={`https://wa.me/${property.contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="block mb-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <p className="text-sm text-gray-600">WhatsApp</p>
                  <p className="font-semibold text-blue-600">{property.contactInfo.whatsapp}</p>
                </a>
              )}
              
              {property.contactInfo?.instagram && (
                <a href={`https://instagram.com/${property.contactInfo.instagram}`} target="_blank" rel="noopener noreferrer" className="block mb-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <p className="text-sm text-gray-600">Instagram</p>
                  <p className="font-semibold text-blue-600">@{property.contactInfo.instagram}</p>
                </a>
              )}
              
              {property.contactInfo?.website && (
                <a href={property.contactInfo.website} target="_blank" rel="noopener noreferrer" className="block mb-6 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <p className="text-sm text-gray-600">Website</p>
                  <p className="font-semibold text-blue-600">{property.contactInfo.website}</p>
                </a>
              )}
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-sky-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-sky-700 transition-all font-semibold">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommercialPropertyBookingDetails

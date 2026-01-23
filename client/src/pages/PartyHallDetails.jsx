import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

function PartyHallDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [hall, setHall] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('about')
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    fetchHallDetails()
  }, [id])

  const fetchHallDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/party-halls/${id}`)
      setHall(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching party hall details:', error)
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'about', name: 'About', icon: '📋' },
    { id: 'amenities', name: 'Amenities', icon: '✨' },
    { id: 'portfolio', name: 'Portfolio', icon: '🖼️' },
    { id: 'policies', name: 'Policies', icon: '📜' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    )
  }

  if (!hall) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Party Hall Not Found</h2>
          <button
            onClick={() => navigate('/venue-hall/party-hall')}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Back to Party Halls
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <img
              src={selectedImage === 0 ? hall.mainImage : hall.images[selectedImage - 1]}
              alt={hall.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <img
              src={hall.mainImage}
              alt="Main"
              onClick={() => setSelectedImage(0)}
              className={`h-24 object-cover rounded-md cursor-pointer ${selectedImage === 0 ? 'ring-4 ring-purple-600' : ''}`}
            />
            {hall.images && hall.images.slice(0, 3).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Gallery ${index + 1}`}
                onClick={() => setSelectedImage(index + 1)}
                className={`h-24 object-cover rounded-md cursor-pointer ${selectedImage === index + 1 ? 'ring-4 ring-purple-600' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{hall.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{hall.location.city}, {hall.location.area}</span>
              </div>
              <span className="inline-block bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                {hall.type}
              </span>
              <div className="flex items-center mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(hall.ratings.average) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">
                    {hall.ratings.average} ({hall.ratings.count} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-b-2 border-purple-600 text-purple-600'
                          : 'text-gray-500 hover:text-gray-700'
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
                    <h3 className="text-xl font-bold text-gray-800 mb-4">About This Party Hall</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{hall.about}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Capacity</h4>
                        <p className="text-gray-600">{hall.capacity.min} - {hall.capacity.max} guests</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Check-in Time</h4>
                        <p className="text-gray-600">{hall.policies.checkIn}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Check-out Time</h4>
                        <p className="text-gray-600">{hall.policies.checkOut}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Amenities Tab */}
                {activeTab === 'amenities' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Amenities & Facilities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {hall.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Photo Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <img src={hall.mainImage} alt="Portfolio" className="w-full h-48 object-cover rounded-lg" />
                      {hall.images && hall.images.map((img, index) => (
                        <img key={index} src={img} alt={`Portfolio ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Policies Tab */}
                {activeTab === 'policies' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Venue Policies</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-purple-600 pl-4">
                        <h4 className="font-semibold text-gray-800 mb-1">Check-in / Check-out</h4>
                        <p className="text-gray-600">Check-in: {hall.policies.checkIn} | Check-out: {hall.policies.checkOut}</p>
                      </div>
                      <div className="border-l-4 border-purple-600 pl-4">
                        <h4 className="font-semibold text-gray-800 mb-1">Cancellation Policy</h4>
                        <p className="text-gray-600">{hall.policies.cancellation}</p>
                      </div>
                      <div className="border-l-4 border-purple-600 pl-4">
                        <h4 className="font-semibold text-gray-800 mb-1">Special Permissions</h4>
                        <div className="flex gap-4 mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm ${hall.policies.alcohol ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {hall.policies.alcohol ? '✓ Alcohol Allowed' : '✗ No Alcohol'}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm ${hall.policies.dj ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {hall.policies.dj ? '✓ DJ Allowed' : '✗ No DJ'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Guest Reviews</h3>
                    <div className="space-y-4">
                      {hall.reviews && hall.reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                              {review.userName.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{review.userName}</h4>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 ml-13">{review.comment}</p>
                        </div>
                      ))}
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
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-purple-600">₹{hall.price.perDay.toLocaleString()}</span>
                  <span className="text-gray-500">/day</span>
                </div>
                {hall.price.perPlate && (
                  <p className="text-gray-600">₹{hall.price.perPlate}/plate</p>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-semibold text-gray-800">{hall.capacity.min} - {hall.capacity.max} guests</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Type</span>
                  <span className="font-semibold text-gray-800">{hall.type}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold text-gray-800">{hall.location.city}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  if (!user) {
                    navigate('/guest/login')
                  } else if (user.role !== 'guest') {
                    alert('Only guests can book services. Please login as a guest.')
                  } else {
                    navigate(`/guest/book/partyHall/${id}`)
                  }
                }}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold mb-3"
              >
                Book Now
              </button>
              <button className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold">
                Request Callback
              </button>

              {hall.contactInfo && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    {hall.contactInfo.phone && (
                      <a href={`tel:${hall.contactInfo.phone}`} className="flex items-center text-purple-600 hover:text-purple-700">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {hall.contactInfo.phone}
                      </a>
                    )}
                    {hall.contactInfo.email && (
                      <a href={`mailto:${hall.contactInfo.email}`} className="flex items-center text-purple-600 hover:text-purple-700">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {hall.contactInfo.email}
                      </a>
                    )}
                    {hall.contactInfo.website && (
                      <a href={`https://${hall.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-600 hover:text-purple-700">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        {hall.contactInfo.website}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartyHallDetails

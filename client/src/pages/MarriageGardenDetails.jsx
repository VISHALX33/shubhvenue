import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

function MarriageGardenDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [marriageGarden, setMarriageGarden] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('about')

  useEffect(() => {
    const fetchMarriageGarden = async () => {
      try {
        const response = await axios.get(`/api/marriage-gardens/${id}`)
        setMarriageGarden(response.data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching marriage garden:', error)
        setLoading(false)
      }
    }
    
    if (id) {
      fetchMarriageGarden()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading details...</p>
        </div>
      </div>
    )
  }

  if (!marriageGarden) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Marriage Garden Not Found</h2>
          <button
            onClick={() => navigate('/venue-hall/marriage-garden')}
            className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to All Gardens
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/venue-hall/marriage-garden')}
          className="mb-4 flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Gardens
        </button>

        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Main Image */}
          <div className="relative h-96">
            <img
              src={marriageGarden.mainImage}
              alt={marriageGarden.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            {/* Title and Rating */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 gap-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{marriageGarden.name}</h1>
                <p className="text-lg text-gray-600 flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {marriageGarden.location.area}, {marriageGarden.location.city}
                </p>
                {marriageGarden.location.address && (
                  <p className="text-sm text-gray-500 mt-1">{marriageGarden.location.address}</p>
                )}
              </div>
              {marriageGarden.ratings.average > 0 && (
                <div className="bg-indigo-100 px-6 py-3 rounded-lg">
                  <div className="flex items-center gap-1">
                    <svg className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="font-bold text-2xl">{marriageGarden.ratings.average.toFixed(1)}</span>
                  </div>
                  <p className="text-sm text-gray-600 text-center">{marriageGarden.ratings.count} reviews</p>
                </div>
              )}
            </div>

            {/* Price and Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {marriageGarden.price && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Pricing</p>
                  <p className="text-3xl font-bold text-indigo-600">
                    ₹{marriageGarden.price.perDay?.toLocaleString()}
                    <span className="text-sm font-normal text-gray-600">/day</span>
                  </p>
                  {marriageGarden.price.perPlate && (
                    <p className="text-sm text-gray-600 mt-1">
                      ₹{marriageGarden.price.perPlate}/plate
                    </p>
                  )}
                </div>
              )}
              {marriageGarden.capacity && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Guest Capacity</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {marriageGarden.capacity.min} - {marriageGarden.capacity.max}
                  </p>
                  <p className="text-sm text-gray-600">guests</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-gray-200">
              <button 
                onClick={() => {
                  if (!user) {
                    navigate('/guest/login')
                  } else if (user.role !== 'guest') {
                    alert('Only guests can book services. Please login as a guest.')
                  } else {
                    navigate(`/guest/book/marriageGarden/${id}`)
                  }
                }}
                className="flex-1 min-w-[200px] bg-indigo-600 text-white py-4 px-6 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg"
              >
                Book Now
              </button>
              <button className="flex-1 min-w-[200px] border-2 border-indigo-600 text-indigo-600 py-4 px-6 rounded-lg hover:bg-indigo-50 transition font-semibold text-lg">
                Contact Venue
              </button>
              <button className="border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-lg hover:bg-gray-50 transition font-semibold">
                <svg className="w-6 h-6 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Write a Review
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex flex-wrap gap-2 md:gap-4">
                {['about', 'amenities', 'portfolio', 'policies', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-3 capitalize font-medium transition text-sm md:text-base ${
                      activeTab === tab
                        ? 'border-b-2 border-indigo-600 text-indigo-600'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    {tab === 'portfolio' ? 'Portfolio & Albums' : tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-96">
              {activeTab === 'about' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Venue</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">{marriageGarden.about}</p>
                </div>
              )}

              {activeTab === 'amenities' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {marriageGarden.amenities?.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Portfolio & Albums</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {marriageGarden.images?.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Venue ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer shadow-md"
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'policies' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Policies & Guidelines</h2>
                  <div className="space-y-6">
                    {marriageGarden.policies?.checkIn && (
                      <div>
                        <p className="font-semibold text-gray-800 text-lg">Check-in</p>
                        <p className="text-gray-600">{marriageGarden.policies.checkIn}</p>
                      </div>
                    )}
                    {marriageGarden.policies?.checkOut && (
                      <div>
                        <p className="font-semibold text-gray-800 text-lg">Check-out</p>
                        <p className="text-gray-600">{marriageGarden.policies.checkOut}</p>
                      </div>
                    )}
                    {marriageGarden.policies?.cancellation && (
                      <div>
                        <p className="font-semibold text-gray-800 text-lg">Cancellation Policy</p>
                        <p className="text-gray-600">{marriageGarden.policies.cancellation}</p>
                      </div>
                    )}
                    <div className="flex gap-8">
                      <div>
                        <p className="font-semibold text-gray-800 text-lg">Pets</p>
                        <p className={`text-lg ${marriageGarden.policies?.pets ? 'text-green-600' : 'text-red-600'}`}>
                          {marriageGarden.policies?.pets ? '✓ Allowed' : '✗ Not Allowed'}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-lg">Smoking</p>
                        <p className={`text-lg ${marriageGarden.policies?.smoking ? 'text-green-600' : 'text-red-600'}`}>
                          {marriageGarden.policies?.smoking ? '✓ Allowed' : '✗ Not Allowed'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Guest Reviews ({marriageGarden.reviews?.length || 0})</h2>
                  <div className="space-y-4">
                    {marriageGarden.reviews?.map((review, index) => (
                      <div key={index} className="p-6 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-gray-800 text-lg">{review.user}</span>
                          <div className="flex items-center gap-1">
                            <svg className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span className="text-lg font-medium">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{review.comment}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    ))}
                    {(!marriageGarden.reviews || marriageGarden.reviews.length === 0) && (
                      <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information */}
            {marriageGarden.contactInfo && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {marriageGarden.contactInfo.phone && (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{marriageGarden.contactInfo.phone}</p>
                      </div>
                    </div>
                  )}
                  {marriageGarden.contactInfo.email && (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{marriageGarden.contactInfo.email}</p>
                      </div>
                    </div>
                  )}
                  {marriageGarden.contactInfo.website && (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Website</p>
                        <p className="font-medium">{marriageGarden.contactInfo.website}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarriageGardenDetails

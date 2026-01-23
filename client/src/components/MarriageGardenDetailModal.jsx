import { useState } from 'react'

function MarriageGardenDetailModal({ marriageGarden, onClose }) {
  const [activeTab, setActiveTab] = useState('about')

  if (!marriageGarden) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-2xl">
          {/* Header */}
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Main Image */}
            <img
              src={marriageGarden.mainImage}
              alt={marriageGarden.name}
              className="w-full h-96 object-cover rounded-t-lg"
            />
          </div>

          <div className="p-8">
            {/* Title and Rating */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{marriageGarden.name}</h2>
                <p className="text-gray-600 flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {marriageGarden.location.area}, {marriageGarden.location.city}
                </p>
              </div>
              {marriageGarden.ratings.average > 0 && (
                <div className="bg-indigo-100 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="font-bold text-lg">{marriageGarden.ratings.average.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-gray-600">{marriageGarden.ratings.count} reviews</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition font-semibold">
                Book Now
              </button>
              <button className="flex-1 border-2 border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-50 transition font-semibold">
                Contact Venue
              </button>
              <button className="border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition">
                Write a Review
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex gap-4">
                {['about', 'amenities', 'portfolio', 'policies', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-2 capitalize font-medium transition ${
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
            <div className="min-h-64">
              {activeTab === 'about' && (
                <div>
                  <h3 className="text-xl font-bold mb-3">About This Venue</h3>
                  <p className="text-gray-700 leading-relaxed">{marriageGarden.about}</p>
                  {marriageGarden.capacity && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-gray-800">Guest Capacity</p>
                      <p className="text-gray-600">{marriageGarden.capacity.min} - {marriageGarden.capacity.max} guests</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'amenities' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {marriageGarden.amenities?.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <h3 className="text-xl font-bold mb-4">Portfolio & Albums</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {marriageGarden.images?.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Venue ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'policies' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Policies & Guidelines</h3>
                  <div className="space-y-4">
                    {marriageGarden.policies?.checkIn && (
                      <div>
                        <p className="font-semibold text-gray-800">Check-in</p>
                        <p className="text-gray-600">{marriageGarden.policies.checkIn}</p>
                      </div>
                    )}
                    {marriageGarden.policies?.checkOut && (
                      <div>
                        <p className="font-semibold text-gray-800">Check-out</p>
                        <p className="text-gray-600">{marriageGarden.policies.checkOut}</p>
                      </div>
                    )}
                    {marriageGarden.policies?.cancellation && (
                      <div>
                        <p className="font-semibold text-gray-800">Cancellation Policy</p>
                        <p className="text-gray-600">{marriageGarden.policies.cancellation}</p>
                      </div>
                    )}
                    <div className="flex gap-8">
                      <div>
                        <p className="font-semibold text-gray-800">Pets</p>
                        <p className={`${marriageGarden.policies?.pets ? 'text-green-600' : 'text-red-600'}`}>
                          {marriageGarden.policies?.pets ? 'Allowed' : 'Not Allowed'}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Smoking</p>
                        <p className={`${marriageGarden.policies?.smoking ? 'text-green-600' : 'text-red-600'}`}>
                          {marriageGarden.policies?.smoking ? 'Allowed' : 'Not Allowed'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Guest Reviews ({marriageGarden.reviews?.length || 0})</h3>
                  <div className="space-y-4">
                    {marriageGarden.reviews?.map((review, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800">{review.user}</span>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span className="text-sm font-medium">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(review.date).toLocaleDateString()}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarriageGardenDetailModal

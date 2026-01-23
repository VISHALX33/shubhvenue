import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PartyHallCard({ hall }) {
  const navigate = useNavigate()
  const [isShortlisted, setIsShortlisted] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hall.name,
        text: `Check out ${hall.name} in ${hall.location.city}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleCardClick = () => {
    navigate(`/venue-hall/party-hall/${hall._id}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-64 overflow-hidden group">
        <img
          src={hall.mainImage}
          alt={hall.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsShortlisted(!isShortlisted)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            title="Shortlist"
          >
            <svg
              className={`w-5 h-5 ${isShortlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              fill={isShortlisted ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            onClick={handleShare}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            title="Share"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {hall.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Location */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{hall.name}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{hall.location.city}, {hall.location.area}</span>
        </div>

        {/* Capacity */}
        <div className="flex items-center text-gray-700 mb-3">
          <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-sm">{hall.capacity.min} - {hall.capacity.max} guests</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-purple-600">₹{hall.price.perDay.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">/day</span>
          </div>
          {hall.price.perPlate && (
            <p className="text-sm text-gray-600">₹{hall.price.perPlate}/plate</p>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(hall.ratings.average) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {hall.ratings.average} ({hall.ratings.count} reviews)
            </span>
          </div>
        </div>

        {/* Amenities Preview */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {hall.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
            {hall.amenities.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                +{hall.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={handleCardClick}
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default PartyHallCard

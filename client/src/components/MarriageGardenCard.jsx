import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function MarriageGardenCard({ marriageGarden, onViewDetails }) {
  const [isShortlisted, setIsShortlisted] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: marriageGarden.name,
        text: `Check out ${marriageGarden.name} in ${marriageGarden.location.city}`,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-64 overflow-hidden group">
        <img
          src={marriageGarden.mainImage}
          alt={marriageGarden.name}
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
        {marriageGarden.ratings.average > 0 && (
          <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="font-semibold text-sm">{marriageGarden.ratings.average.toFixed(1)}</span>
            <span className="text-xs text-gray-500">({marriageGarden.ratings.count})</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{marriageGarden.name}</h3>
        <p className="text-gray-600 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {marriageGarden.location.area}, {marriageGarden.location.city}
        </p>

        {/* Capacity */}
        {marriageGarden.capacity && (
          <p className="text-sm text-gray-600 mb-3">
            <span className="font-semibold">Capacity:</span> {marriageGarden.capacity.min} - {marriageGarden.capacity.max} guests
          </p>
        )}

        {/* Price */}
        {marriageGarden.price && (
          <div className="mb-4">
            <p className="text-2xl font-bold text-indigo-600">
              ₹{marriageGarden.price.perDay?.toLocaleString()}
              <span className="text-sm font-normal text-gray-600">/day</span>
            </p>
            {marriageGarden.price.perPlate && (
              <p className="text-sm text-gray-600">
                ₹{marriageGarden.price.perPlate}/plate
              </p>
            )}
          </div>
        )}

        {/* Amenities Preview */}
        {marriageGarden.amenities && marriageGarden.amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {marriageGarden.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
              {marriageGarden.amenities.length > 3 && (
                <span className="text-xs text-indigo-600 font-medium">
                  +{marriageGarden.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(marriageGarden)}
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition font-medium"
          >
            View Details
          </button>
          <button className="flex-1 border-2 border-indigo-600 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition font-medium">
            Contact
          </button>
        </div>
      </div>
    </div>
  )
}

export default MarriageGardenCard

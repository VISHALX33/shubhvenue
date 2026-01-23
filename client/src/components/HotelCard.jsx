import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HotelCard({ hotel }) {
  const navigate = useNavigate();
  const [isShortlisted, setIsShortlisted] = useState(false);

  // Safety check for undefined hotel
  if (!hotel) {
    return null;
  }

  const handleCardClick = () => {
    navigate(`/venue-hall/hotel/${hotel._id}`);
  };

  const handleShortlist = (e) => {
    e.stopPropagation();
    setIsShortlisted(!isShortlisted);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: hotel.name,
          text: `Check out ${hotel.name} - ${hotel.type}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={hotel.mainImage} 
          alt={hotel.name}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {hotel.type}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleShortlist}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
            aria-label="Shortlist"
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
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
            aria-label="Share"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Location */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {hotel.name}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{hotel.location.area}, {hotel.location.city}</span>
        </div>

        {/* Rooms and Capacity */}
        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{hotel.rooms} Rooms</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{hotel.capacity.min} - {hotel.capacity.max}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className="text-2xl font-bold text-amber-600">
            ₹{hotel.price.perDay.toLocaleString()}
          </span>
          <span className="text-gray-500 text-sm">/day</span>
          {hotel.price.perPlate && (
            <div className="text-sm text-gray-600">
              ₹{hotel.price.perPlate}/plate
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <span className="ml-2 text-gray-700 font-semibold">{hotel.ratings.average}</span>
          <span className="ml-1 text-gray-500 text-sm">({hotel.ratings.count} reviews)</span>
        </div>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index}
              className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded"
            >
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* View Details Button */}
        <button 
          className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
          onClick={handleCardClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default HotelCard;

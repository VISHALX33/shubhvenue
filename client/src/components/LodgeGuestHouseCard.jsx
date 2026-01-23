import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaUsers, FaStar, FaRupeeSign } from 'react-icons/fa';

function LodgeGuestHouseCard({ lodge }) {
  const navigate = useNavigate();
  const [isShortlisted, setIsShortlisted] = useState(false);

  // Safety check for undefined lodge
  if (!lodge) {
    return null;
  }

  const handleCardClick = () => {
    navigate(`/stay-hospitality/lodge-guest-house/${lodge._id}`);
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
          title: lodge.name,
          text: `Check out ${lodge.name} - ${lodge.type}`,
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
          src={lodge.mainImage} 
          alt={lodge.name}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {lodge.type}
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
          {lodge.name}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <FaMapMarkerAlt className="w-4 h-4 mr-2 text-teal-600" />
          <span className="text-sm">{lodge.location.area}, {lodge.location.city}</span>
        </div>

        {/* Rooms and Capacity */}
        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          <div className="flex items-center">
            <FaBed className="w-4 h-4 mr-1 text-teal-600" />
            <span>{lodge.rooms} Rooms</span>
          </div>
          <div className="flex items-center">
            <FaUsers className="w-4 h-4 mr-1 text-teal-600" />
            <span>{lodge.capacity.min} - {lodge.capacity.max}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-center">
            <FaRupeeSign className="text-teal-600 text-xl" />
            <span className="text-2xl font-bold text-teal-600">
              {lodge.price.perDay.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm ml-1">/day</span>
          </div>
          {lodge.price.perPlate && (
            <div className="text-sm text-gray-600 flex items-center mt-1">
              <FaRupeeSign className="text-xs" />
              <span>{lodge.price.perPlate}/plate</span>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <FaStar className="w-5 h-5 text-yellow-400" />
          <span className="ml-2 text-gray-700 font-semibold">{lodge.ratings.average}</span>
          <span className="ml-1 text-gray-500 text-sm">({lodge.ratings.count} reviews)</span>
        </div>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {lodge.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index}
              className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded"
            >
              {amenity}
            </span>
          ))}
          {lodge.amenities.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              +{lodge.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* View Details Button */}
        <button 
          className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all"
          onClick={handleCardClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default LodgeGuestHouseCard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CorporateEventSpaceCard = ({ space }) => {
  const navigate = useNavigate();
  const [isShortlisted, setIsShortlisted] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: space.name,
      text: `Check out ${space.name} in ${space.location.city}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleCardClick = () => {
    navigate(`/venue-hall/corporate-event/${space._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={space.mainImage} 
          alt={space.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onClick={handleCardClick}
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsShortlisted(!isShortlisted);
            }}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <svg 
              className={`w-5 h-5 ${isShortlisted ? 'fill-red-500' : 'fill-gray-400'}`}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 fill-gray-600" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {space.type}
          </span>
        </div>
      </div>
      
      <div className="p-6" onClick={handleCardClick}>
        <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
          {space.name}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          <span className="text-sm">{space.location.city}, {space.location.area}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
          </svg>
          <span className="text-sm">{space.capacity.min} - {space.capacity.max} Guests</span>
        </div>

        {space.rooms && (
          <div className="flex items-center text-gray-600 mb-3">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
            </svg>
            <span className="text-sm">{space.rooms.conferenceRooms} Conference | {space.rooms.meetingRooms} Meeting Rooms</span>
          </div>
        )}
        
        <div className="mb-3">
          <span className="text-2xl font-bold text-blue-600">₹{space.price.perDay.toLocaleString()}</span>
          <span className="text-gray-600 text-sm">/day</span>
          {space.price.perHour && (
            <span className="text-gray-600 text-sm ml-2">
              or ₹{space.price.perHour.toLocaleString()}/hr
            </span>
          )}
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <svg 
                key={index}
                className={`w-4 h-4 ${index < Math.round(space.ratings.average) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {space.ratings.average} ({space.ratings.count} reviews)
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {space.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">
              {amenity}
            </span>
          ))}
          {space.amenities.length > 3 && (
            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs">
              +{space.amenities.length - 3} more
            </span>
          )}
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CorporateEventSpaceCard;

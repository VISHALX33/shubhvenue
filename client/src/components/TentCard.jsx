import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TentCard({ tent }) {
  const navigate = useNavigate();
  const [isShortlisted, setIsShortlisted] = useState(false);

  const handleCardClick = () => {
    navigate(`/event-services/tent/${tent._id}`);
  };

  const handleShortlist = (e) => {
    e.stopPropagation();
    setIsShortlisted(!isShortlisted);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: tent.name,
        text: `Check out ${tent.name} - ${tent.type}`,
        url: window.location.href
      });
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
    ));
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={handleCardClick}
    >
      <div className="relative h-64">
        <img 
          src={tent.mainImage} 
          alt={tent.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleShortlist}
            className={`p-2 rounded-full ${isShortlisted ? 'bg-red-500' : 'bg-white'} shadow-lg transition-colors`}
          >
            <svg className={`w-6 h-6 ${isShortlisted ? 'text-white' : 'text-gray-600'}`} fill={isShortlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">
            {tent.type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{tent.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{tent.location.area}, {tent.location.city}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-sm font-semibold">{tent.capacity.min}-{tent.capacity.max} Guests</span>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          <span className="text-sm">{tent.tentSize.length}' x {tent.tentSize.width}'</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-green-600">
              ₹{(tent.price.perEvent / 1000).toFixed(0)}k
              <span className="text-sm text-gray-600 font-normal">/event</span>
            </p>
            <p className="text-sm text-gray-600">or ₹{(tent.price.perDay / 1000).toFixed(0)}k/day</p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex text-xl mr-2">
            {renderStars(Math.round(tent.ratings.average))}
          </div>
          <span className="text-gray-600 text-sm">
            {tent.ratings.average.toFixed(1)} ({tent.ratings.count} reviews)
          </span>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2 font-semibold">Key Features:</p>
          <div className="flex flex-wrap gap-2">
            {tent.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                {feature}
              </span>
            ))}
            {tent.features.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{tent.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        <button
          className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          onClick={handleCardClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default TentCard;

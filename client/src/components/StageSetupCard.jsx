import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StageSetupCard = ({ stageSetup }) => {
  const navigate = useNavigate();
  const [isShortlisted, setIsShortlisted] = useState(false);

  const handleShortlist = (e) => {
    e.stopPropagation();
    setIsShortlisted(!isShortlisted);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: stageSetup.name,
          text: `Check out ${stageSetup.name} on ShubhVenue`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const handleCardClick = () => {
    navigate(`/event-services/stage-setup/${stageSetup._id}`);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < Math.floor(rating) ? 'text-purple-500' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative h-64">
        <img 
          src={stageSetup.mainImage} 
          alt={stageSetup.name}
          className="w-full h-full object-cover"
        />
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {stageSetup.type}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleShortlist}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <span className={isShortlisted ? 'text-red-500' : 'text-gray-400'}>
              ❤
            </span>
          </button>
          <button
            onClick={handleShare}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-600">↗</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Stage Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-purple-600 transition-colors">
          {stageSetup.name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-1 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">{stageSetup.location.city}, {stageSetup.location.area}</span>
        </div>

        {/* Dimensions & Capacity */}
        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span>{stageSetup.dimensions.length}x{stageSetup.dimensions.width}ft</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span>{stageSetup.capacity} capacity</span>
          </div>
        </div>

        {/* Setup Time */}
        <div className="flex items-center mb-3 text-sm text-gray-600">
          <svg className="w-4 h-4 mr-1 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>{stageSetup.setupTime} hours setup time</span>
        </div>

        {/* Features Preview */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {stageSetup.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
            {stageSetup.features.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{stageSetup.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className="text-3xl font-bold text-purple-600">
            ₹{(stageSetup.price.perDay / 1000).toFixed(0)}k
          </span>
          <span className="text-gray-600 text-sm ml-1">/day</span>
          {stageSetup.customization && (
            <div className="text-xs text-gray-500 mt-1 flex items-center">
              <span className="text-green-600 mr-1">✓</span> Custom designs available
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {renderStars(stageSetup.ratings.average)}
          </div>
          <span className="text-sm text-gray-600">
            {stageSetup.ratings.average.toFixed(1)} ({stageSetup.ratings.count} reviews)
          </span>
        </div>

        {/* View Details Button */}
        <button 
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          onClick={handleCardClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default StageSetupCard;

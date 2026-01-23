import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SoundSystemCard = ({ soundSystem }) => {
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
          title: soundSystem.name,
          text: `Check out ${soundSystem.name} on ShubhVenue`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const handleCardClick = () => {
    navigate(`/event-services/sound-system/${soundSystem._id}`);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < Math.floor(rating) ? 'text-blue-500' : 'text-gray-300'}>
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
          src={soundSystem.mainImage} 
          alt={soundSystem.name}
          className="w-full h-full object-cover"
        />
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {soundSystem.type}
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
        {/* Sound System Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
          {soundSystem.name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">{soundSystem.location.city}, {soundSystem.location.area}</span>
        </div>

        {/* Power & Coverage */}
        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span>{soundSystem.power}W</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span>{soundSystem.coverage} coverage</span>
          </div>
        </div>

        {/* Setup Time & Technician */}
        <div className="flex items-center mb-3 text-sm text-gray-600">
          <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>{soundSystem.setupTime}hrs setup</span>
          {soundSystem.technician && (
            <span className="ml-3 text-green-600 font-medium">✓ Technician included</span>
          )}
        </div>

        {/* Equipment Preview */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {soundSystem.equipment.slice(0, 2).map((item, index) => (
              <span 
                key={index}
                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
            {soundSystem.equipment.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{soundSystem.equipment.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className="text-3xl font-bold text-blue-600">
            ₹{(soundSystem.price.perDay / 1000).toFixed(0)}k
          </span>
          <span className="text-gray-600 text-sm ml-1">/day</span>
          {soundSystem.price.perEvent && (
            <div className="text-xs text-gray-500 mt-1">
              Per Event: ₹{(soundSystem.price.perEvent / 1000).toFixed(0)}k
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {renderStars(soundSystem.ratings.average)}
          </div>
          <span className="text-sm text-gray-600">
            {soundSystem.ratings.average.toFixed(1)} ({soundSystem.ratings.count} reviews)
          </span>
        </div>

        {/* View Details Button */}
        <button 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          onClick={handleCardClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default SoundSystemCard;

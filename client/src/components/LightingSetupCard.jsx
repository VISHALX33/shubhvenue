import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LightingSetupCard = ({ lightingSetup }) => {
  const navigate = useNavigate();
  const [isShortlisted, setIsShortlisted] = useState(false);

  const handleCardClick = () => {
    navigate(`/event-services/lighting-setup/${lightingSetup._id}`);
  };

  const handleShortlist = (e) => {
    e.stopPropagation();
    setIsShortlisted(!isShortlisted);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: lightingSetup.name,
        text: `Check out ${lightingSetup.name} for lighting services`,
        url: window.location.href,
      });
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="relative h-56">
        <img
          src={lightingSetup.mainImage}
          alt={lightingSetup.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleShortlist}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className={`w-6 h-6 ${isShortlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`}
              fill={isShortlisted ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button
            onClick={handleShare}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {lightingSetup.type}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{lightingSetup.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">{lightingSetup.location.area}, {lightingSetup.location.city}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm">
            <span className="text-yellow-600 mr-2">⚡</span>
            <span className="text-gray-700 font-medium">{lightingSetup.power}W</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-yellow-600 mr-2">📐</span>
            <span className="text-gray-700 font-medium">{lightingSetup.coverage} sq ft</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-yellow-600 mr-2">⏱️</span>
            <span className="text-gray-700 font-medium">{lightingSetup.setupTime}hrs setup</span>
          </div>
          <div className="flex items-center text-sm">
            {lightingSetup.technician && (
              <span className="text-green-600 font-medium">✓ Technician</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Equipment Preview:</p>
          <div className="flex flex-wrap gap-1">
            {lightingSetup.equipment.slice(0, 2).map((item, index) => (
              <span key={index} className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs">
                {item}
              </span>
            ))}
            {lightingSetup.equipment.length > 2 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                +{lightingSetup.equipment.length - 2} more
              </span>
            )}
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                ₹{(lightingSetup.price.perDay / 1000).toFixed(0)}k
              </div>
              <div className="text-sm text-gray-500">per day</div>
              {lightingSetup.price.perEvent && (
                <div className="text-xs text-gray-500">
                  ₹{(lightingSetup.price.perEvent / 1000).toFixed(0)}k per event
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-1">
                <div className="flex mr-1">
                  {renderStars(lightingSetup.ratings.average)}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {lightingSetup.ratings.average.toFixed(1)}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {lightingSetup.ratings.count} reviews
              </div>
            </div>
          </div>
          <button className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default LightingSetupCard;

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ShehnaiCard = ({ shehnai }) => {
  const navigate = useNavigate();
  const [isShortlisted, setIsShortlisted] = useState(false);

  const handleCardClick = () => {
    navigate(`/event-services/shehnai/${shehnai._id}`);
  };

  const handleShortlist = (e) => {
    e.stopPropagation();
    setIsShortlisted(!isShortlisted);
    // TODO: Implement actual shortlist functionality
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: shehnai.name,
        text: `Check out ${shehnai.name} in ${shehnai.location.city}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 relative"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={shehnai.mainImage}
          alt={shehnai.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {/* Type Badge */}
        <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
          {shehnai.type}
        </div>
        {/* Shortlist & Share Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleShortlist}
            className={`p-2 rounded-full ${
              isShortlisted ? 'bg-red-600' : 'bg-white'
            } shadow-lg hover:scale-110 transition-transform`}
          >
            <svg
              className={`w-5 h-5 ${isShortlisted ? 'text-white' : 'text-red-600'}`}
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
            className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {shehnai.name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-4">
          <svg
            className="w-4 h-4 mr-2 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm">
            {shehnai.location.area}, {shehnai.location.city}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Group Members</div>
            <div className="text-lg font-bold text-red-600">{shehnai.groupMembers}</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Shehnai Players</div>
            <div className="text-lg font-bold text-red-600">{shehnai.shehnaiPlayers}</div>
          </div>
        </div>

        {/* Music Style Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
            {shehnai.musicStyle}
          </span>
          <span className="ml-2 text-xs text-gray-500">{shehnai.experience}+ years exp</span>
        </div>

        {/* Instruments Preview */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Instruments:</h4>
          <div className="flex flex-wrap gap-2">
            {shehnai.instruments.slice(0, 3).map((instrument, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {instrument}
              </span>
            ))}
            {shehnai.instruments.length > 3 && (
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                +{shehnai.instruments.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Performances Preview */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Performances:</h4>
          <div className="text-xs text-gray-600 line-clamp-2">
            {shehnai.performances.slice(0, 2).join(', ')}
            {shehnai.performances.length > 2 && '...'}
          </div>
        </div>

        {/* Features */}
        {shehnai.features && shehnai.features.length > 0 && (
          <div className="mb-4 space-y-1">
            {shehnai.features.slice(0, 2).map((feature, index) => (
              <div key={index} className="flex items-start text-xs text-gray-600">
                <svg
                  className="w-4 h-4 text-red-600 mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Pricing Section */}
        <div className="border-t pt-4 mb-4">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-2xl font-bold text-red-600">
                ₹{shehnai.price.perEvent.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600"> /event</span>
            </div>
            {shehnai.price.perHour && (
              <div className="text-right">
                <div className="text-xs text-gray-500">Per Hour</div>
                <div className="text-sm font-semibold text-gray-700">
                  ₹{shehnai.price.perHour.toLocaleString()}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rating */}
        {shehnai.ratings && (
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-2 text-sm font-semibold text-gray-800">
                {shehnai.ratings.average}
              </span>
            </div>
            <span className="ml-2 text-xs text-gray-500">
              ({shehnai.ratings.count} reviews)
            </span>
          </div>
        )}

        {/* Book Now Button */}
        <button
          onClick={handleCardClick}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ShehnaiCard;

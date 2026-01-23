import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BanquetHallCard({ hall }) {
  const navigate = useNavigate();
  const [isShortlisted, setIsShortlisted] = useState(false);

  const handleCardClick = () => {
    navigate(`/venue-hall/banquet-hall/${hall._id}`);
  };

  const handleShortlist = (e) => {
    e.stopPropagation();
    setIsShortlisted(!isShortlisted);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: hall.name,
        text: `Check out ${hall.name} in ${hall.location.city}`,
        url: window.location.href + `/venue-hall/banquet-hall/${hall._id}`,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      alert('Share functionality not supported on this browser');
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={hall.mainImage}
          alt={hall.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleShortlist}
            className={`p-2 rounded-full transition-colors ${
              isShortlisted 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-red-50'
            }`}
          >
            <svg className="w-5 h-5" fill={isShortlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-white rounded-full text-gray-700 hover:bg-blue-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {hall.type}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{hall.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{hall.location.area}, {hall.location.city}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-sm">Capacity: {hall.capacity.min} - {hall.capacity.max} guests</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-indigo-600">
              ₹{hall.price.perDay.toLocaleString()}
              <span className="text-sm text-gray-500 font-normal">/day</span>
            </p>
            {hall.price.perPlate && (
              <p className="text-sm text-gray-500">
                ₹{hall.price.perPlate}/plate
              </p>
            )}
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="ml-1 text-sm font-semibold text-gray-700">
              {hall.ratings.average} ({hall.ratings.count})
            </span>
          </div>
        </div>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hall.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {amenity}
            </span>
          ))}
          {hall.amenities.length > 3 && (
            <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full font-semibold">
              +{hall.amenities.length - 3} more
            </span>
          )}
        </div>

        <button
          onClick={handleCardClick}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default BanquetHallCard;

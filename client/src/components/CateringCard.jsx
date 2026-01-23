import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CateringCard = ({ catering }) => {
  const navigate = useNavigate();
  const [isShortlisted, setIsShortlisted] = useState(false);

  const handleCardClick = () => {
    navigate(`/event-services/catering/${catering._id}`);
  };

  const handleShortlist = (e) => {
    e.stopPropagation();
    setIsShortlisted(!isShortlisted);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: catering.name,
        text: `Check out ${catering.name} - ${catering.type}`,
        url: window.location.href
      });
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={handleCardClick}
    >
      <div className="relative h-64">
        <img 
          src={catering.mainImage} 
          alt={catering.name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {catering.type}
        </span>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button 
            onClick={handleShortlist}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <svg 
              className={`w-5 h-5 ${isShortlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button 
            onClick={handleShare}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{catering.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">{catering.location.area}, {catering.location.city}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Serving Style</div>
            <div className="text-sm font-semibold text-orange-600">{catering.servingStyle}</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Capacity</div>
            <div className="text-sm font-semibold text-orange-600">{catering.minimumGuests}-{catering.maximumGuests}</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Experience</div>
            <div className="text-sm font-semibold text-orange-600">{catering.experience} Years</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Cuisines</div>
            <div className="text-sm font-semibold text-orange-600">{catering.cuisineTypes.length} Types</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span className="font-medium">🍽️ Cuisines:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {catering.cuisineTypes.slice(0, 3).map((cuisine, index) => (
              <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                {cuisine}
              </span>
            ))}
            {catering.cuisineTypes.length > 3 && (
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                +{catering.cuisineTypes.length - 3} more
              </span>
            )}
          </div>
        </div>

        {catering.staffIncluded && (
          <div className="mb-4 flex items-center text-orange-600">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Professional Staff Included</span>
          </div>
        )}

        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Key Features:</div>
          <div className="space-y-1">
            {catering.features.slice(0, 2).map((feature, index) => (
              <div key={index} className="flex items-start">
                <svg className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
            {catering.features.length > 2 && (
              <span className="text-xs text-orange-600 font-medium">+{catering.features.length - 2} more features</span>
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-600">Price per plate</div>
              <div className="text-2xl font-bold text-orange-600">₹{catering.pricePerPlate}</div>
            </div>
            <div className="flex items-center">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(catering.ratings.average) ? 'text-yellow-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">({catering.ratings.count})</span>
            </div>
          </div>
          <button 
            onClick={handleCardClick}
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CateringCard;

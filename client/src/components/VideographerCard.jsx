import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VideographerCard = ({ videographer }) => {
  const navigate = useNavigate();
  const [isShortlisted, setIsShortlisted] = useState(false);

  const handleViewDetails = () => {
    navigate(`/event-services/videographer/${videographer._id}`);
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
          title: videographer.name,
          text: `Check out ${videographer.name} - ${videographer.type}`,
          url: window.location.origin + `/event-services/videographer/${videographer._id}`
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">★</span>
      );
    }
    while (stars.length < 5) {
      stars.push(
        <span key={`empty-${stars.length}`} className="text-gray-300">★</span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden group">
        <img
          src={videographer.mainImage}
          alt={videographer.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleShortlist}
            className={`p-2 rounded-full ${
              isShortlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
            } hover:bg-red-500 hover:text-white transition-colors shadow-md`}
          >
            <svg className="w-5 h-5" fill={isShortlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-white rounded-full text-gray-700 hover:bg-indigo-500 hover:text-white transition-colors shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded-full shadow-md">
            {videographer.type}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-indigo-600 transition-colors">
          {videographer.name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-2">
          <svg className="w-4 h-4 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{videographer.location.city}, {videographer.location.area}</span>
        </div>

        {/* Experience */}
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">{videographer.experience} years experience</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-indigo-600">₹{videographer.price.perDay.toLocaleString()}</span>
            <span className="text-gray-600 ml-2">/day</span>
          </div>
          {videographer.price.perHour && (
            <div className="text-sm text-gray-500 mt-1">
              or ₹{videographer.price.perHour.toLocaleString()}/hr
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex mr-2">
            {renderStars(videographer.ratings.average)}
          </div>
          <span className="text-gray-600 text-sm">
            {videographer.ratings.average} ({videographer.ratings.count} reviews)
          </span>
        </div>

        {/* Specializations Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {videographer.specializations.slice(0, 3).map((spec, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full"
            >
              {spec}
            </span>
          ))}
          {videographer.specializations.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{videographer.specializations.length - 3} more
            </span>
          )}
        </div>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-semibold"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default VideographerCard;

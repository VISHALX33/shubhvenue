import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DJCard({ dj }) {
  const navigate = useNavigate();
  const [isShortlisted, setIsShortlisted] = useState(false);

  const handleCardClick = () => {
    navigate(`/event-services/dj/${dj._id}`);
  };

  const handleShortlist = (e) => {
    e.stopPropagation();
    setIsShortlisted(!isShortlisted);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: dj.name,
        text: `Check out ${dj.name} - ${dj.type}`,
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
          src={dj.mainImage} 
          alt={dj.name}
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
          <span className="px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full">
            {dj.type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{dj.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{dj.location.area}, {dj.location.city}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold">{dj.experience} Years Experience</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-purple-600">
              ₹{(dj.price.perEvent / 1000).toFixed(0)}k
              <span className="text-sm text-gray-600 font-normal">/event</span>
            </p>
            <p className="text-sm text-gray-600">or ₹{(dj.price.perHour / 1000).toFixed(1)}k/hr</p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex text-xl mr-2">
            {renderStars(Math.round(dj.ratings.average))}
          </div>
          <span className="text-gray-600 text-sm">
            {dj.ratings.average.toFixed(1)} ({dj.ratings.count} reviews)
          </span>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2 font-semibold">Music Genres:</p>
          <div className="flex flex-wrap gap-2">
            {dj.musicGenres.slice(0, 3).map((genre, index) => (
              <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                {genre}
              </span>
            ))}
            {dj.musicGenres.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{dj.musicGenres.length - 3} more
              </span>
            )}
          </div>
        </div>

        <button
          className="w-full py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          onClick={handleCardClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default DJCard;

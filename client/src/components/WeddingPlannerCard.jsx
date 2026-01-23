import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUsers, FaCheckCircle, FaStar, FaHeart, FaShare, FaBriefcase, FaAward } from 'react-icons/fa';

const WeddingPlannerCard = ({ planner }) => {
  const navigate = useNavigate();
  const [isShortlisted, setIsShortlisted] = useState(false);

  const handleCardClick = () => {
    navigate(`/event-services/wedding-planner/${planner._id}`);
  };

  const handleShortlist = (e) => {
    e.stopPropagation();
    setIsShortlisted(!isShortlisted);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: planner.name,
        text: `Check out ${planner.name} on ShubhVenue!`,
        url: window.location.href
      });
    }
  };

  // Calculate price range from packages
  const prices = planner.packages.map(pkg => pkg.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative h-64">
        <img 
          src={planner.mainImage} 
          alt={planner.name}
          className="w-full h-full object-cover"
        />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {planner.type}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={handleShortlist}
            className={`p-2 rounded-full ${isShortlisted ? 'bg-pink-600 text-white' : 'bg-white text-gray-700'} hover:scale-110 transition`}
          >
            <FaHeart />
          </button>
          <button 
            onClick={handleShare}
            className="bg-white text-gray-700 p-2 rounded-full hover:scale-110 transition"
          >
            <FaShare />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Name and Location */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{planner.name}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <FaMapMarkerAlt className="mr-2 text-pink-600" />
          <span>{planner.location.city}, {planner.location.state}</span>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-pink-50 p-3 rounded-lg">
            <div className="flex items-center text-pink-600 mb-1">
              <FaUsers className="mr-2" />
              <span className="text-sm font-semibold">Team Size</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{planner.teamSize} Members</p>
          </div>

          <div className="bg-pink-50 p-3 rounded-lg">
            <div className="flex items-center text-pink-600 mb-1">
              <FaCheckCircle className="mr-2" />
              <span className="text-sm font-semibold">Completed</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{planner.weddingsCompleted}+ Weddings</p>
          </div>

          <div className="bg-pink-50 p-3 rounded-lg">
            <div className="flex items-center text-pink-600 mb-1">
              <FaBriefcase className="mr-2" />
              <span className="text-sm font-semibold">Experience</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{planner.experience} Years</p>
          </div>

          <div className="bg-pink-50 p-3 rounded-lg">
            <div className="flex items-center text-pink-600 mb-1">
              <FaAward className="mr-2" />
              <span className="text-sm font-semibold">Scope</span>
            </div>
            <p className="text-sm font-bold text-gray-800">{planner.planningScope}</p>
          </div>
        </div>

        {/* Package Price Range */}
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-3 rounded-lg mb-4">
          <p className="text-sm text-gray-600 mb-1">Package Pricing</p>
          <p className="text-xl font-bold text-pink-600">
            ₹{(minPrice / 1000).toFixed(0)}k - ₹{(maxPrice / 1000).toFixed(0)}k
          </p>
          <p className="text-xs text-gray-500">{planner.packages.length} packages available</p>
        </div>

        {/* Specializations Preview */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Specializations:</p>
          <div className="flex flex-wrap gap-2">
            {planner.specializations.slice(0, 3).map((spec, index) => (
              <span 
                key={index}
                className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs"
              >
                {spec}
              </span>
            ))}
            {planner.specializations.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                +{planner.specializations.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Services Preview */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Services Include:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            {planner.services.slice(0, 3).map((service, index) => (
              <li key={index} className="flex items-start">
                <FaCheckCircle className="text-pink-500 mt-1 mr-2 flex-shrink-0" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
          {planner.services.length > 3 && (
            <p className="text-xs text-gray-500 mt-2">+{planner.services.length - 3} more services</p>
          )}
        </div>

        {/* Features Preview */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {planner.features.slice(0, 2).map((feature, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4 pb-4 border-b">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="font-bold text-gray-800">{planner.ratings.average}</span>
          <span className="text-gray-600 text-sm ml-2">({planner.ratings.count} reviews)</span>
        </div>

        {/* Book Now Button */}
        <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition duration-300">
          Book Consultation
        </button>
      </div>
    </div>
  );
};

export default WeddingPlannerCard;

import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaTshirt, FaBox, FaHeart, FaShare } from 'react-icons/fa';

const CostumeDressCard = ({ costume }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/event-services/costume-dress/${costume._id}`);
  };

  // Calculate minimum price from packages
  const minPrice = Math.min(...costume.packages.map(pkg => pkg.price));

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden group">
        <img 
          src={costume.mainImage} 
          alt={costume.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-indigo-600 font-bold">₹{(minPrice / 1000).toFixed(0)}k+</span>
        </div>
        <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {costume.type}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Header */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{costume.name}</h3>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <FaMapMarkerAlt className="mr-2 text-indigo-500 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{costume.location.area}, {costume.location.city}</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center">
            <FaBox className="text-indigo-500 mr-2" />
            <div>
              <p className="text-xs text-gray-600">Inventory</p>
              <p className="font-semibold text-gray-800">{costume.inventorySize}+ Items</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaTshirt className="text-indigo-500 mr-2" />
            <div>
              <p className="text-xs text-gray-600">Delivered</p>
              <p className="font-semibold text-gray-800">{costume.deliveredCount}+</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {costume.categories.slice(0, 3).map((category, index) => (
              <span 
                key={index}
                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {category}
              </span>
            ))}
            {costume.categories.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                +{costume.categories.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Rating and Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-bold text-gray-800 mr-1">{costume.ratings.average}</span>
            <span className="text-gray-600 text-sm">({costume.ratings.count})</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-2 hover:bg-indigo-100 rounded-full transition"
              aria-label="Add to favorites"
            >
              <FaHeart className="text-indigo-600" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-2 hover:bg-indigo-100 rounded-full transition"
              aria-label="Share"
            >
              <FaShare className="text-indigo-600" />
            </button>
          </div>
        </div>

        {/* Packages Info */}
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            {costume.packages.length} Package{costume.packages.length > 1 ? 's' : ''} Available
          </p>
        </div>

        {/* Book Now Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/event-services/costume-dress/${costume._id}`);
          }}
          className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CostumeDressCard;

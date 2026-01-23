import { FaMapMarkerAlt, FaBed, FaUsers, FaStar, FaRupeeSign, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HomestayCard({ homestay }) {
  if (!homestay) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden group">
        <img
          src={homestay.mainImage}
          alt={homestay.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            {homestay.type}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="bg-white p-2.5 rounded-full shadow-lg hover:bg-rose-50 transition-colors">
            <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="bg-white p-2.5 rounded-full shadow-lg hover:bg-rose-50 transition-colors">
            <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {homestay.name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-4">
          <FaMapMarkerAlt className="text-rose-500 mr-2" />
          <span className="text-sm">{homestay.location.area}, {homestay.location.city}</span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center text-gray-700">
            <FaBed className="text-rose-500 mr-2" />
            <span className="text-sm font-medium">{homestay.rooms} Rooms</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaUsers className="text-rose-500 mr-2" />
            <span className="text-sm font-medium">{homestay.capacity.min}-{homestay.capacity.max} Guests</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline">
            <FaRupeeSign className="text-rose-600 text-xl mr-1" />
            <span className="text-3xl font-bold text-rose-600">{homestay.price.perDay?.toLocaleString()}</span>
            <span className="text-gray-600 ml-2">/day</span>
          </div>
          {homestay.price.perPlate && (
            <div className="flex items-baseline mt-1">
              <FaRupeeSign className="text-gray-500 text-sm mr-1" />
              <span className="text-sm text-gray-600">{homestay.price.perPlate?.toLocaleString()} /plate</span>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="font-semibold text-gray-800 mr-1">{homestay.ratings.average.toFixed(1)}</span>
          <span className="text-gray-600 text-sm">({homestay.ratings.count} reviews)</span>
        </div>

        {/* Amenities Preview */}
        {homestay.amenities && homestay.amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {homestay.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="text-xs bg-rose-50 text-rose-700 px-3 py-1 rounded-full">
                  {amenity}
                </span>
              ))}
              {homestay.amenities.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  +{homestay.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* View Details Button */}
        <Link to={`/stay-hospitality/homestay/${homestay._id}`}>
          <button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomestayCard;

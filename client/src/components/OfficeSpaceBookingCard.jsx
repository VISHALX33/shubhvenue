import { Link } from 'react-router-dom'
import { FaBuilding, FaStar, FaMapMarkerAlt, FaUsers, FaDoorOpen, FaWifi, FaCar } from 'react-icons/fa'

function OfficeSpaceBookingCard({ office }) {
  const minPrice = office.packages && office.packages.length > 0
    ? Math.min(...office.packages.map(pkg => pkg.price))
    : 0

  return (
    <Link to={`/property-rental/office-space/${office._id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative h-48">
          <img
            src={office.mainImage}
            alt={office.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {office.type}
            </span>
          </div>
          {office.buildingGrade && (
            <div className="absolute top-4 right-4">
              <span className="bg-white text-blue-700 px-3 py-2 rounded-full text-sm font-semibold shadow-lg">
                🏢 {office.buildingGrade}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {office.name}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-4">
            <FaMapMarkerAlt className="mr-2 text-blue-600" />
            <span className="text-sm">{office.location.area}, {office.location.city}</span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <FaUsers className="mr-2 text-blue-600" />
              <span>{office.seatingCapacity} Seats</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaDoorOpen className="mr-2 text-blue-600" />
              <span>{office.cabins} Cabins</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">🪑</span>
              <span>{office.furnished}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaCar className="mr-2 text-blue-600" />
              <span>{office.parking}</span>
            </div>
          </div>

          {/* Suitable For */}
          {office.suitableFor && office.suitableFor.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2 font-semibold">SUITABLE FOR:</p>
              <div className="flex flex-wrap gap-2">
                {office.suitableFor.slice(0, 3).map((item, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs border border-blue-200">
                    {item}
                  </span>
                ))}
                {office.suitableFor.length > 3 && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    +{office.suitableFor.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Amenities */}
          {office.amenities && office.amenities.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {office.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                    {amenity}
                  </span>
                ))}
                {office.amenities.length > 3 && (
                  <span className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-200 font-semibold">
                    +{office.amenities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Rating and Price */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-semibold text-gray-800">{office.ratings.toFixed(1)}</span>
              <span className="text-gray-500 text-sm ml-1">({office.reviews.length})</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-xl font-bold text-blue-700">₹{minPrice.toLocaleString()}<span className="text-sm font-normal text-gray-500">/month</span></p>
            </div>
          </div>

          {/* View Details Button */}
          <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
            View Details
          </button>
        </div>
      </div>
    </Link>
  )
}

export default OfficeSpaceBookingCard

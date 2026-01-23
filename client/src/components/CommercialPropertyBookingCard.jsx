import { Link } from 'react-router-dom'
import { FaBuilding, FaStar, FaMapMarkerAlt, FaRuler, FaCouch, FaParking, FaBolt, FaArrowUp } from 'react-icons/fa'

function CommercialPropertyBookingCard({ property }) {
  const minPrice = property.packages && property.packages.length > 0
    ? Math.min(...property.packages.map(pkg => pkg.price))
    : 0

  const getBadgeColor = (furnished) => {
    switch(furnished) {
      case 'Fully Furnished':
        return 'bg-gradient-to-r from-blue-600 to-sky-600 text-white'
      case 'Semi Furnished':
        return 'bg-gradient-to-r from-blue-500 to-sky-500 text-white'
      case 'Unfurnished':
        return 'bg-gray-100 text-gray-700 border border-gray-300'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <Link to={`/property-rental/commercial-property/${property._id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative h-48">
          <img
            src={property.mainImage}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-blue-600 to-sky-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {property.type}
            </span>
          </div>
          {property.buildingGrade && (
            <div className="absolute top-4 right-4">
              <span className="bg-white text-blue-700 px-3 py-2 rounded-full text-sm font-semibold shadow-lg">
                🏢 {property.buildingGrade}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {property.name}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-4">
            <FaMapMarkerAlt className="mr-2 text-blue-600" />
            <span className="text-sm">{property.location.area}, {property.location.city}</span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <FaRuler className="mr-2 text-blue-600" />
              <span>{property.area} {property.areaUnit}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaCouch className="mr-2 text-blue-600" />
              <span>{property.furnished}</span>
            </div>
            {property.parking > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <FaParking className="mr-2 text-blue-600" />
                <span>{property.parking} Parking</span>
              </div>
            )}
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">📅</span>
              <span>{property.leaseTerm}</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {property.powerBackup && (
              <span className="flex items-center text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                <FaBolt className="mr-1" /> Power Backup
              </span>
            )}
            {property.lift && (
              <span className="flex items-center text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                <FaArrowUp className="mr-1" /> Lift
              </span>
            )}
            {property.pantry && (
              <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                🍽️ Pantry
              </span>
            )}
          </div>

          {/* Suitable For */}
          {property.suitableFor && property.suitableFor.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Suitable For:</p>
              <div className="flex flex-wrap gap-2">
                {property.suitableFor.slice(0, 3).map((use, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {use}
                  </span>
                ))}
                {property.suitableFor.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                    +{property.suitableFor.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Amenities:</p>
              <div className="flex flex-wrap gap-2">
                {property.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                    {amenity}
                  </span>
                ))}
                {property.amenities.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    +{property.amenities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-sm font-semibold text-gray-700">{property.ratings || 0}</span>
            <span className="text-sm text-gray-500 ml-1">({property.reviews?.length || 0} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                ₹{minPrice.toLocaleString()}
              </p>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-sky-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-sky-700 transition-all duration-300 font-semibold">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CommercialPropertyBookingCard

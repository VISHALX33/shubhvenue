import { Link } from 'react-router-dom'
import { FaMapMarkedAlt, FaStar, FaMapMarkerAlt, FaRuler, FaRoad, FaTint, FaBolt } from 'react-icons/fa'

function JameenPlotBookingCard({ plot }) {
  const minPrice = plot.packages && plot.packages.length > 0
    ? Math.min(...plot.packages.map(pkg => pkg.price))
    : 0

  return (
    <Link to={`/property-rental/jameen-plot/${plot._id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative h-48">
          <img
            src={plot.mainImage}
            alt={plot.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {plot.type}
            </span>
          </div>
          {plot.plotFacing && (
            <div className="absolute top-4 right-4">
              <span className="bg-white text-green-700 px-3 py-2 rounded-full text-sm font-semibold shadow-lg">
                🧭 {plot.plotFacing} Facing
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {plot.name}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-4">
            <FaMapMarkerAlt className="mr-2 text-green-600" />
            <span className="text-sm">{plot.location.area}, {plot.location.city}</span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <FaRuler className="mr-2 text-green-600" />
              <span>{plot.area} {plot.areaUnit}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaRoad className="mr-2 text-green-600" />
              <span>{plot.roadAccess}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaTint className="mr-2 text-green-600" />
              <span>{plot.waterSupply}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaBolt className="mr-2 text-green-600" />
              <span>{plot.electricity}</span>
            </div>
          </div>

          {/* Boundary Wall Badge */}
          <div className="mb-4">
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
              plot.boundaryWall === 'Completed' 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : plot.boundaryWall === 'Partial'
                ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}>
              {plot.boundaryWall === 'Completed' ? '✓ ' : plot.boundaryWall === 'Partial' ? '◐ ' : '○ '}
              Boundary Wall: {plot.boundaryWall}
            </span>
          </div>

          {/* Suitable For */}
          {plot.suitableFor && plot.suitableFor.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2 font-semibold">SUITABLE FOR:</p>
              <div className="flex flex-wrap gap-2">
                {plot.suitableFor.slice(0, 3).map((item, index) => (
                  <span key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs border border-green-200">
                    {item}
                  </span>
                ))}
                {plot.suitableFor.length > 3 && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    +{plot.suitableFor.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Amenities */}
          {plot.amenities && plot.amenities.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {plot.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                    {amenity}
                  </span>
                ))}
                {plot.amenities.length > 3 && (
                  <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200 font-semibold">
                    +{plot.amenities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Rating and Price */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-semibold text-gray-800">{plot.ratings.toFixed(1)}</span>
              <span className="text-gray-500 text-sm ml-1">({plot.reviews.length})</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-xl font-bold text-green-700">₹{minPrice.toLocaleString()}</p>
            </div>
          </div>

          {/* View Details Button */}
          <button className="mt-4 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg">
            View Details
          </button>
        </div>
      </div>
    </Link>
  )
}

export default JameenPlotBookingCard

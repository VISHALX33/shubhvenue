import { Link } from 'react-router-dom'
import { FaWarehouse, FaStar, FaMapMarkerAlt, FaRulerCombined, FaTruck, FaThermometerHalf, FaShieldAlt } from 'react-icons/fa'

function WarehouseGodownBookingCard({ warehouse }) {
  const minPrice = warehouse.packages && warehouse.packages.length > 0
    ? Math.min(...warehouse.packages.map(pkg => pkg.price))
    : 0

  return (
    <Link to={`/property-rental/warehouse-godown/${warehouse._id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative h-48">
          <img
            src={warehouse.mainImage}
            alt={warehouse.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-slate-600 to-gray-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {warehouse.type}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-white text-slate-700 px-3 py-2 rounded-full text-sm font-semibold shadow-lg">
              {warehouse.temperatureControlled === 'Yes' ? '❄️ Climate Controlled' : warehouse.temperatureControlled === 'Partial' ? '🌡️ Partial AC' : '🏭 Standard'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {warehouse.name}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-4">
            <FaMapMarkerAlt className="mr-2 text-slate-600" />
            <span className="text-sm">{warehouse.location.area}, {warehouse.location.city}</span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <FaRulerCombined className="mr-2 text-slate-600" />
              <span>{warehouse.area.toLocaleString()} sq ft</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaTruck className="mr-2 text-slate-600" />
              <span>{warehouse.loadingDocks} Docks</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">📦</span>
              <span>{warehouse.storageCapacity}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">📏</span>
              <span>{warehouse.height} height</span>
            </div>
          </div>

          {/* Suitable For */}
          {warehouse.suitableFor && warehouse.suitableFor.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2 font-semibold">SUITABLE FOR:</p>
              <div className="flex flex-wrap gap-2">
                {warehouse.suitableFor.slice(0, 3).map((item, index) => (
                  <span key={index} className="bg-slate-50 text-slate-700 px-3 py-1 rounded-full text-xs border border-slate-200">
                    {item}
                  </span>
                ))}
                {warehouse.suitableFor.length > 3 && (
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                    +{warehouse.suitableFor.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Amenities */}
          {warehouse.amenities && warehouse.amenities.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {warehouse.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                    {amenity}
                  </span>
                ))}
                {warehouse.amenities.length > 3 && (
                  <span className="text-xs text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-200 font-semibold">
                    +{warehouse.amenities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Rating and Price */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-semibold text-gray-800">{warehouse.ratings.toFixed(1)}</span>
              <span className="text-gray-500 text-sm ml-1">({warehouse.reviews.length})</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-xl font-bold text-slate-700">₹{minPrice.toLocaleString()}<span className="text-sm font-normal text-gray-500">/month</span></p>
            </div>
          </div>

          {/* View Details Button */}
          <button className="mt-4 w-full bg-gradient-to-r from-slate-600 to-gray-600 text-white py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-lg">
            View Details
          </button>
        </div>
      </div>
    </Link>
  )
}

export default WarehouseGodownBookingCard

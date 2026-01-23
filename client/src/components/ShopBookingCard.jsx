import React from 'react';
import { Link } from 'react-router-dom';
import { FaStore, FaStar, FaMapMarkerAlt, FaRulerCombined, FaCar } from 'react-icons/fa';

const ShopBookingCard = ({ shop }) => {
  const minPrice = Math.min(...shop.packages.map(pkg => pkg.price));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={shop.mainImage}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {shop.type}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white text-amber-600 px-3 py-1 rounded-full text-sm font-semibold">
            {shop.furnished}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{shop.name}</h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <FaMapMarkerAlt className="mr-1" />
          <span>{shop.location.area}, {shop.location.city}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
          <div className="flex items-center text-gray-700">
            <FaRulerCombined className="mr-2 text-amber-600" />
            <span className="font-semibold">{shop.area} sq ft</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaCar className="mr-2 text-amber-600" />
            <span>{shop.parking}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaStore className="mr-2 text-amber-600" />
            <span>{shop.floors}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">📍</span>
            <span>{shop.buildingName}</span>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-gray-600 text-sm mb-2">Suitable For:</p>
          <div className="flex flex-wrap gap-1">
            {shop.suitableFor.slice(0, 3).map((suitable, index) => (
              <span
                key={index}
                className="bg-amber-50 text-amber-700 px-2 py-1 rounded text-xs"
              >
                {suitable}
              </span>
            ))}
            {shop.suitableFor.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                +{shop.suitableFor.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-gray-600 text-sm mb-1">Amenities:</p>
          <div className="flex flex-wrap gap-1">
            {shop.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {amenity}
              </span>
            ))}
            {shop.amenities.length > 3 && (
              <span className="text-amber-600 text-xs font-semibold">
                +{shop.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center mb-3">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="font-semibold text-gray-800">
            {shop.ratings.average > 0 ? shop.ratings.average.toFixed(1) : 'New'}
          </span>
          <span className="text-gray-600 text-sm ml-1">
            ({shop.ratings.count} {shop.ratings.count === 1 ? 'review' : 'reviews'})
          </span>
        </div>

        <div className="border-t pt-3 flex justify-between items-center">
          <div>
            <p className="text-gray-600 text-xs">Starting from</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              ₹{minPrice.toLocaleString()}
              <span className="text-sm text-gray-600">/month</span>
            </p>
          </div>
          <Link
            to={`/property-rental/shop/${shop._id}`}
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 font-semibold"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopBookingCard;

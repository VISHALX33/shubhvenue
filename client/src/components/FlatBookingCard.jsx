import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaStar, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

const FlatBookingCard = ({ flat }) => {
  const minPrice = Math.min(...flat.packages.map(pkg => pkg.price));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={flat.mainImage}
          alt={flat.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {flat.type}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800 flex-1">{flat.name}</h3>
          <FaHome className="text-teal-600 text-2xl ml-2" />
        </div>

        <p className="text-gray-600 text-sm mb-3">
          {flat.location.area}, {flat.location.city}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center text-gray-700">
            <FaBed className="text-teal-500 mr-1" />
            <span className="text-sm">{flat.bedrooms} Beds</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaBath className="text-teal-500 mr-1" />
            <span className="text-sm">{flat.bathrooms} Baths</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaRulerCombined className="text-teal-500 mr-1" />
            <span className="text-sm">{flat.area} sqft</span>
          </div>
        </div>

        <div className="mb-3">
          <span className="inline-block bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded">
            {flat.furnishedStatus}
          </span>
          <span className="text-gray-600 text-sm ml-2">
            {flat.guestsHosted}+ guests hosted
          </span>
        </div>

        <div className="flex items-center mb-3">
          {flat.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2">
              {amenity}
            </span>
          ))}
          {flat.amenities.length > 3 && (
            <span className="text-xs text-teal-600">+{flat.amenities.length - 3} more</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-semibold text-gray-800">
                {flat.ratings.average.toFixed(1)}
              </span>
              <span className="text-gray-500 text-sm ml-1">
                ({flat.ratings.count})
              </span>
            </div>
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-xl font-bold text-teal-600">₹{minPrice.toLocaleString()}</p>
          </div>
          <Link
            to={`/event-services/flat-booking/${flat._id}`}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlatBookingCard;

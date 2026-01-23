import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaStar, FaUtensils, FaMapMarkerAlt } from 'react-icons/fa';

const PGHostelBookingCard = ({ pg }) => {
  const minPrice = Math.min(...pg.packages.map(pkg => pkg.price));
  const availableBeds = pg.totalBeds - pg.occupiedBeds;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={pg.mainImage}
          alt={pg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {pg.type}
          </span>
        </div>
        {availableBeds <= 5 && availableBeds > 0 && (
          <div className="absolute top-3 right-3">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Only {availableBeds} beds left!
            </span>
          </div>
        )}
        {availableBeds === 0 && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Fully Occupied
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{pg.name}</h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <FaMapMarkerAlt className="mr-1" />
          <span>{pg.location.area}, {pg.location.city}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
          <div className="flex items-center text-gray-700">
            <FaUsers className="mr-2 text-emerald-600" />
            <span className="font-semibold">{pg.gender}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaUtensils className="mr-2 text-emerald-600" />
            <span>{pg.food}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaHome className="mr-2 text-emerald-600" />
            <span>{pg.totalBeds} Total Beds</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">🛏️</span>
            <span>{availableBeds} Available</span>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-gray-600 text-sm mb-2">Room Types:</p>
          <div className="flex flex-wrap gap-1">
            {pg.roomTypes.slice(0, 3).map((room, index) => (
              <span
                key={index}
                className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs"
              >
                {room}
              </span>
            ))}
            {pg.roomTypes.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                +{pg.roomTypes.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-gray-600 text-sm mb-1">Amenities:</p>
          <div className="flex flex-wrap gap-1">
            {pg.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {amenity}
              </span>
            ))}
            {pg.amenities.length > 3 && (
              <span className="text-emerald-600 text-xs font-semibold">
                +{pg.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center mb-3">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="font-semibold text-gray-800">
            {pg.ratings.average > 0 ? pg.ratings.average.toFixed(1) : 'New'}
          </span>
          <span className="text-gray-600 text-sm ml-1">
            ({pg.ratings.count} {pg.ratings.count === 1 ? 'review' : 'reviews'})
          </span>
        </div>

        <div className="border-t pt-3 flex justify-between items-center">
          <div>
            <p className="text-gray-600 text-xs">Starting from</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              ₹{minPrice.toLocaleString()}
              <span className="text-sm text-gray-600">/month</span>
            </p>
          </div>
          <Link
            to={`/property-rental/pg-hostel/${pg._id}`}
            className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 font-semibold"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PGHostelBookingCard;

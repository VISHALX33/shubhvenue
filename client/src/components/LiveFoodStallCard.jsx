import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaUtensils, FaChartLine } from 'react-icons/fa';

const LiveFoodStallCard = ({ stall }) => {
  const minPrice = Math.min(...stall.packages.map((pkg) => pkg.price));

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-64">
        <img
          src={stall.mainImage}
          alt={stall.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            {stall.type}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{stall.name}</h3>
          <div className="flex items-center text-white/90">
            <FaMapMarkerAlt className="mr-2" />
            <span>{stall.location.area}, {stall.location.city}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-1 rounded-full">
            <FaStar className="mr-1" />
            <span className="font-semibold">{stall.ratings.average.toFixed(1)}</span>
            <span className="ml-1 text-sm">({stall.ratings.count})</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-600">
            <div className="flex items-center text-orange-600 mb-1">
              <FaUtensils className="mr-2" />
              <span className="text-xs font-semibold">Dishes</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{stall.dishesAvailable}+</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-600">
            <div className="flex items-center text-red-600 mb-1">
              <FaChartLine className="mr-2" />
              <span className="text-xs font-semibold">Events</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{stall.eventsServed}+</p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Popular Dishes:</h4>
          <div className="flex flex-wrap gap-2">
            {stall.dishVarieties.slice(0, 3).map((dish, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {dish}
              </span>
            ))}
            {stall.dishVarieties.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                +{stall.dishVarieties.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Starting from</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                ₹{minPrice.toLocaleString()}
              </p>
            </div>
          </div>
          <Link
            to={`/event-services/live-food-stall/${stall._id}`}
            className="block w-full bg-gradient-to-r from-orange-600 to-red-600 text-white text-center py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Book Stall
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LiveFoodStallCard;

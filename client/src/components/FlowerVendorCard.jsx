import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaStar, FaMapMarkerAlt, FaChartLine } from 'react-icons/fa';

const FlowerVendorCard = ({ vendor }) => {
  const minPrice = Math.min(...vendor.packages.map(pkg => pkg.price));

  return (
    <Link 
      to={`/event-services/flower-vendor/${vendor._id}`}
      className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={vendor.mainImage}
          alt={vendor.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          {vendor.type}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-xl font-bold">{vendor.name}</h3>
        </div>
      </div>

      <div className="p-5">
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <FaMapMarkerAlt className="mr-2 text-pink-600" />
          <span className="text-sm">{vendor.location.area}, {vendor.location.city}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center bg-gradient-to-r from-pink-600 to-rose-600 text-white px-3 py-1 rounded-full">
            <FaStar className="mr-1 text-xs" />
            <span className="font-semibold text-sm">{vendor.ratings.average}</span>
          </div>
          <span className="text-gray-500 text-sm ml-2">({vendor.ratings.count} reviews)</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-pink-50 p-3 rounded-lg">
            <div className="flex items-center text-pink-600 mb-1">
              <FaLeaf className="mr-2" />
              <span className="text-xs font-semibold">Inventory</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{vendor.inventorySize}+ items</p>
          </div>
          <div className="bg-rose-50 p-3 rounded-lg">
            <div className="flex items-center text-rose-600 mb-1">
              <FaChartLine className="mr-2" />
              <span className="text-xs font-semibold">Served</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{vendor.eventsServed}+</p>
          </div>
        </div>

        {/* Flower Types */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Available Flowers:</h4>
          <div className="flex flex-wrap gap-2">
            {vendor.flowerTypes.slice(0, 3).map((flower, index) => (
              <span
                key={index}
                className="text-xs bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 px-3 py-1 rounded-full"
              >
                {flower}
              </span>
            ))}
            {vendor.flowerTypes.length > 3 && (
              <span className="text-xs bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 px-3 py-1 rounded-full">
                +{vendor.flowerTypes.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price and Book Now Button */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-gray-500 text-xs">Starting from</p>
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
              ₹{minPrice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Book Now Button */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="w-full mt-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Book Now
        </button>
      </div>
    </Link>
  );
};

export default FlowerVendorCard;

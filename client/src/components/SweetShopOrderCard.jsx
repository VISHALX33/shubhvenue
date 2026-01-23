import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaCandyCane, FaShoppingBag } from 'react-icons/fa';

const SweetShopOrderCard = ({ sweetShop }) => {
  const minPrice = Math.min(...sweetShop.packages.map((pkg) => pkg.price));

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-64">
        <img
          src={sweetShop.mainImage}
          alt={sweetShop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            {sweetShop.type}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{sweetShop.name}</h3>
          <div className="flex items-center text-white/90">
            <FaMapMarkerAlt className="mr-2" />
            <span>{sweetShop.location.area}, {sweetShop.location.city}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center bg-gradient-to-r from-pink-600 to-rose-600 text-white px-3 py-1 rounded-full">
            <FaStar className="mr-1" />
            <span className="font-semibold">{sweetShop.ratings.average.toFixed(1)}</span>
            <span className="ml-1 text-sm">({sweetShop.ratings.count})</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-pink-50 p-3 rounded-lg border-l-4 border-pink-600">
            <div className="flex items-center text-pink-600 mb-1">
              <FaCandyCane className="mr-2" />
              <span className="text-xs font-semibold">Items</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{sweetShop.itemsAvailable}+</p>
          </div>
          <div className="bg-rose-50 p-3 rounded-lg border-l-4 border-rose-600">
            <div className="flex items-center text-rose-600 mb-1">
              <FaShoppingBag className="mr-2" />
              <span className="text-xs font-semibold">Orders</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{sweetShop.ordersCompleted}+</p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Popular Items:</h4>
          <div className="flex flex-wrap gap-2">
            {sweetShop.sweetVarieties.slice(0, 3).map((variety, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {variety}
              </span>
            ))}
            {sweetShop.sweetVarieties.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                +{sweetShop.sweetVarieties.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Starting from</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                ₹{minPrice.toLocaleString()}
              </p>
            </div>
          </div>
          <Link
            to={`/event-services/sweet-shop/${sweetShop._id}`}
            className="block w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white text-center py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SweetShopOrderCard;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStore, FaMusic, FaCamera, FaUtensils, FaTree, FaHome, FaBed, FaBuilding } from 'react-icons/fa';

function AddListing() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      name: 'Venue & Halls',
      icon: FaBuilding,
      color: 'from-blue-500 to-indigo-600',
      services: [
        { name: 'Marriage Garden', path: '/vendor/add-listing/marriage-garden' },
        { name: 'Banquet Hall', path: '/vendor/add-listing/banquet-hall' },
        { name: 'Party Hall', path: '/vendor/add-listing/party-hall' },
        { name: 'Farm House', path: '/vendor/add-listing/farmhouse' },
        { name: 'Community Hall', path: '/vendor/add-listing/community-hall' },
        { name: 'Open Ground', path: '/vendor/add-listing/open-ground' },
        { name: 'Corporate Event Space', path: '/vendor/add-listing/corporate-event-space' }
      ]
    },
    {
      name: 'Stay & Hospitality',
      icon: FaBed,
      color: 'from-green-500 to-emerald-600',
      services: [
        { name: 'Hotel', path: '/vendor/add-listing/hotel' },
        { name: 'Resort', path: '/vendor/add-listing/resort' },
        { name: 'Lodge/Guest House', path: '/vendor/add-listing/lodge' },
        { name: 'Homestay', path: '/vendor/add-listing/homestay' }
      ]
    },
    {
      name: 'Entertainment Services',
      icon: FaMusic,
      color: 'from-purple-500 to-pink-600',
      services: [
        { name: 'DJ', path: '/vendor/add-listing/dj' },
        { name: 'Band Baja', path: '/vendor/add-listing/band-baja' },
        { name: 'Dhol Tasha', path: '/vendor/add-listing/dhol-tasha' },
        { name: 'Shehnai', path: '/vendor/add-listing/shehnai' }
      ]
    },
    {
      name: 'Photography & Video',
      icon: FaCamera,
      color: 'from-orange-500 to-red-600',
      services: [
        { name: 'Photographer', path: '/vendor/add-listing/photographer' },
        { name: 'Videographer', path: '/vendor/add-listing/videographer' }
      ]
    },
    {
      name: 'Event Services',
      icon: FaStore,
      color: 'from-teal-500 to-cyan-600',
      services: [
        { name: 'Event Management', path: '/vendor/add-listing/event-management' },
        { name: 'Tent', path: '/vendor/add-listing/tent' },
        { name: 'Stage Setup', path: '/vendor/add-listing/stage-setup' },
        { name: 'Sound System', path: '/vendor/add-listing/sound-system' },
        { name: 'Lighting Setup', path: '/vendor/add-listing/lighting-setup' },
        { name: 'Generator', path: '/vendor/add-listing/generator' }
      ]
    },
    {
      name: 'Catering & Food',
      icon: FaUtensils,
      color: 'from-yellow-500 to-orange-600',
      services: [
        { name: 'Catering Services', path: '/vendor/add-listing/catering' },
        { name: 'Sweet Shop', path: '/vendor/add-listing/sweet-shop' },
        { name: 'Ice Cream Counter', path: '/vendor/add-listing/ice-cream' },
        { name: 'Juice Counter', path: '/vendor/add-listing/juice-counter' },
        { name: 'Live Food Stall', path: '/vendor/add-listing/live-food-stall' }
      ]
    },
    {
      name: 'Wedding Services',
      icon: FaTree,
      color: 'from-rose-500 to-pink-600',
      services: [
        { name: 'Wedding Planner', path: '/vendor/add-listing/wedding-planner' },
        { name: 'Mehndi Artist', path: '/vendor/add-listing/mehndi-artist' },
        { name: 'Makeup Artist', path: '/vendor/add-listing/makeup-artist' },
        { name: 'Costume/Dress Rental', path: '/vendor/add-listing/costume-rental' }
      ]
    },
    {
      name: 'Decoration & Rental',
      icon: FaHome,
      color: 'from-indigo-500 to-purple-600',
      services: [
        { name: 'Event Furniture', path: '/vendor/add-listing/furniture-rental' },
        { name: 'Bouncy Kids Games', path: '/vendor/add-listing/bouncy-games' },
        { name: 'Car Rental', path: '/vendor/add-listing/car-rental' },
        { name: 'Flower Vendor', path: '/vendor/add-listing/flower-vendor' },
        { name: 'Balloon Decorator', path: '/vendor/add-listing/balloon-decorator' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <button
            onClick={() => navigate('/vendor/listings')}
            className="text-blue-600 hover:text-blue-700 font-semibold mb-4 flex items-center"
          >
            ← Back to Listings
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Listing</h1>
          <p className="text-gray-600">Choose a service category to get started</p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className={`bg-gradient-to-r ${category.color} p-6`}>
                <category.icon className="text-4xl text-white mb-2" />
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
              </div>
              <div className="p-4">
                {category.services.map((service, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(service.path)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-lg transition-colors mb-2 font-medium text-gray-700 hover:text-blue-600"
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddListing;

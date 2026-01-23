import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AddCatering = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Wedding Catering',
    mainImage: '',
    images: ['', '', ''],
    location: {
      area: '',
      city: '',
      state: ''
    },
    cuisineTypes: [],
    menuItems: [],
    servingStyle: 'Buffet',
    minimumGuests: '',
    maximumGuests: '',
    pricePerPlate: '',
    packageDetails: {
      basic: {
        price: '',
        includes: []
      },
      premium: {
        price: '',
        includes: []
      },
      luxury: {
        price: '',
        includes: []
      }
    },
    staffIncluded: true,
    staffCount: {
      cooks: '',
      servers: '',
      helpers: ''
    },
    equipmentIncluded: [],
    specialties: [],
    liveCounters: [],
    features: [],
    about: '',
    experience: '',
    contactInfo: {
      phone: '',
      email: '',
      whatsapp: '',
      instagram: '',
      website: ''
    }
  });

  const [currentCuisineType, setCurrentCuisineType] = useState('');
  const [currentMenuItem, setCurrentMenuItem] = useState({
    category: '',
    items: []
  });
  const [currentMenuItemItem, setCurrentMenuItemItem] = useState('');
  const [currentBasicInclude, setCurrentBasicInclude] = useState('');
  const [currentPremiumInclude, setCurrentPremiumInclude] = useState('');
  const [currentLuxuryInclude, setCurrentLuxuryInclude] = useState('');
  const [currentEquipment, setCurrentEquipment] = useState('');
  const [currentSpecialty, setCurrentSpecialty] = useState('');
  const [currentLiveCounter, setCurrentLiveCounter] = useState('');
  const [currentFeature, setCurrentFeature] = useState('');

  const cateringTypes = [
    'Wedding Catering',
    'Party Catering',
    'Corporate Catering',
    'Birthday Catering',
    'Festival Catering',
    'Budget Catering'
  ];

  const servingStyles = [
    'Buffet',
    'Plated',
    'Family Style',
    'Cocktail',
    'Mixed'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const parts = name.split('.');
      if (parts.length === 2) {
        const [parent, child] = parts;
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: type === 'checkbox' ? checked : value
          }
        });
      } else if (parts.length === 3) {
        const [parent, child, grandchild] = parts;
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: {
              ...formData[parent][child],
              [grandchild]: type === 'checkbox' ? checked : value
            }
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addCuisineType = () => {
    if (currentCuisineType.trim()) {
      setFormData({
        ...formData,
        cuisineTypes: [...formData.cuisineTypes, currentCuisineType.trim()]
      });
      setCurrentCuisineType('');
    }
  };

  const removeCuisineType = (index) => {
    setFormData({
      ...formData,
      cuisineTypes: formData.cuisineTypes.filter((_, i) => i !== index)
    });
  };

  const handleMenuItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentMenuItem({
      ...currentMenuItem,
      [name]: value
    });
  };

  const addMenuItemItem = () => {
    if (currentMenuItemItem.trim()) {
      setCurrentMenuItem({
        ...currentMenuItem,
        items: [...currentMenuItem.items, currentMenuItemItem.trim()]
      });
      setCurrentMenuItemItem('');
    }
  };

  const removeMenuItemItem = (index) => {
    setCurrentMenuItem({
      ...currentMenuItem,
      items: currentMenuItem.items.filter((_, i) => i !== index)
    });
  };

  const addMenuItem = () => {
    if (currentMenuItem.category && currentMenuItem.items.length > 0) {
      setFormData({
        ...formData,
        menuItems: [...formData.menuItems, { ...currentMenuItem }]
      });
      setCurrentMenuItem({
        category: '',
        items: []
      });
    }
  };

  const removeMenuItem = (index) => {
    setFormData({
      ...formData,
      menuItems: formData.menuItems.filter((_, i) => i !== index)
    });
  };

  const addBasicInclude = () => {
    if (currentBasicInclude.trim()) {
      setFormData({
        ...formData,
        packageDetails: {
          ...formData.packageDetails,
          basic: {
            ...formData.packageDetails.basic,
            includes: [...formData.packageDetails.basic.includes, currentBasicInclude.trim()]
          }
        }
      });
      setCurrentBasicInclude('');
    }
  };

  const removeBasicInclude = (index) => {
    setFormData({
      ...formData,
      packageDetails: {
        ...formData.packageDetails,
        basic: {
          ...formData.packageDetails.basic,
          includes: formData.packageDetails.basic.includes.filter((_, i) => i !== index)
        }
      }
    });
  };

  const addPremiumInclude = () => {
    if (currentPremiumInclude.trim()) {
      setFormData({
        ...formData,
        packageDetails: {
          ...formData.packageDetails,
          premium: {
            ...formData.packageDetails.premium,
            includes: [...formData.packageDetails.premium.includes, currentPremiumInclude.trim()]
          }
        }
      });
      setCurrentPremiumInclude('');
    }
  };

  const removePremiumInclude = (index) => {
    setFormData({
      ...formData,
      packageDetails: {
        ...formData.packageDetails,
        premium: {
          ...formData.packageDetails.premium,
          includes: formData.packageDetails.premium.includes.filter((_, i) => i !== index)
        }
      }
    });
  };

  const addLuxuryInclude = () => {
    if (currentLuxuryInclude.trim()) {
      setFormData({
        ...formData,
        packageDetails: {
          ...formData.packageDetails,
          luxury: {
            ...formData.packageDetails.luxury,
            includes: [...formData.packageDetails.luxury.includes, currentLuxuryInclude.trim()]
          }
        }
      });
      setCurrentLuxuryInclude('');
    }
  };

  const removeLuxuryInclude = (index) => {
    setFormData({
      ...formData,
      packageDetails: {
        ...formData.packageDetails,
        luxury: {
          ...formData.packageDetails.luxury,
          includes: formData.packageDetails.luxury.includes.filter((_, i) => i !== index)
        }
      }
    });
  };

  const addEquipment = () => {
    if (currentEquipment.trim()) {
      setFormData({
        ...formData,
        equipmentIncluded: [...formData.equipmentIncluded, currentEquipment.trim()]
      });
      setCurrentEquipment('');
    }
  };

  const removeEquipment = (index) => {
    setFormData({
      ...formData,
      equipmentIncluded: formData.equipmentIncluded.filter((_, i) => i !== index)
    });
  };

  const addSpecialty = () => {
    if (currentSpecialty.trim()) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, currentSpecialty.trim()]
      });
      setCurrentSpecialty('');
    }
  };

  const removeSpecialty = (index) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((_, i) => i !== index)
    });
  };

  const addLiveCounter = () => {
    if (currentLiveCounter.trim()) {
      setFormData({
        ...formData,
        liveCounters: [...formData.liveCounters, currentLiveCounter.trim()]
      });
      setCurrentLiveCounter('');
    }
  };

  const removeLiveCounter = (index) => {
    setFormData({
      ...formData,
      liveCounters: formData.liveCounters.filter((_, i) => i !== index)
    });
  };

  const addFeature = () => {
    if (currentFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, currentFeature.trim()]
      });
      setCurrentFeature('');
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/caterings',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        alert('Catering listing created successfully!');
        navigate('/vendor/listings');
      }
    } catch (error) {
      console.error('Error creating catering listing:', error);
      alert(error.response?.data?.message || 'Failed to create listing');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Catering Service</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catering Service Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter catering service name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {cateringTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image URL *
            </label>
            <input
              type="url"
              name="mainImage"
              value={formData.mainImage}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Images (3)
            </label>
            {formData.images.map((image, index) => (
              <input
                key={index}
                type="url"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-2"
                placeholder={`Image ${index + 1} URL`}
              />
            ))}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area *
                </label>
                <input
                  type="text"
                  name="location.area"
                  value={formData.location.area}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine Types *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentCuisineType}
                onChange={(e) => setCurrentCuisineType(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add cuisine type (e.g., North Indian, South Indian, Chinese)"
              />
              <button
                type="button"
                onClick={addCuisineType}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.cuisineTypes.map((cuisine, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
                  {cuisine}
                  <button
                    type="button"
                    onClick={() => removeCuisineType(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Menu Items</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={currentMenuItem.category}
                  onChange={handleMenuItemChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Starters, Main Course, Desserts"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Items
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentMenuItemItem}
                    onChange={(e) => setCurrentMenuItemItem(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Add item"
                  />
                  <button
                    type="button"
                    onClick={addMenuItemItem}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add Item
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentMenuItem.items.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2">
                      {item}
                      <button
                        type="button"
                        onClick={() => removeMenuItemItem(index)}
                        className="text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={addMenuItem}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={!currentMenuItem.category || currentMenuItem.items.length === 0}
              >
                Add Menu Category
              </button>
            </div>
            <div className="space-y-2">
              {formData.menuItems.map((menuItem, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{menuItem.category}</h4>
                    <button
                      type="button"
                      onClick={() => removeMenuItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {menuItem.items.map((item, itemIndex) => (
                      <span key={itemIndex} className="px-2 py-1 bg-white text-gray-700 rounded text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serving Style *
            </label>
            <select
              name="servingStyle"
              value={formData.servingStyle}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {servingStyles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Guests *
              </label>
              <input
                type="number"
                name="minimumGuests"
                value={formData.minimumGuests}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Guests *
              </label>
              <input
                type="number"
                name="maximumGuests"
                value={formData.maximumGuests}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Per Plate (₹) *
            </label>
            <input
              type="number"
              name="pricePerPlate"
              value={formData.pricePerPlate}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Basic Package</h4>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="packageDetails.basic.price"
                    value={formData.packageDetails.basic.price}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Includes
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentBasicInclude}
                      onChange={(e) => setCurrentBasicInclude(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Add included item"
                    />
                    <button
                      type="button"
                      onClick={addBasicInclude}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.packageDetails.basic.includes.map((item, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
                        {item}
                        <button
                          type="button"
                          onClick={() => removeBasicInclude(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Premium Package</h4>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="packageDetails.premium.price"
                    value={formData.packageDetails.premium.price}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Includes
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentPremiumInclude}
                      onChange={(e) => setCurrentPremiumInclude(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Add included item"
                    />
                    <button
                      type="button"
                      onClick={addPremiumInclude}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.packageDetails.premium.includes.map((item, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-2">
                        {item}
                        <button
                          type="button"
                          onClick={() => removePremiumInclude(index)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Luxury Package</h4>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="packageDetails.luxury.price"
                    value={formData.packageDetails.luxury.price}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Includes
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentLuxuryInclude}
                      onChange={(e) => setCurrentLuxuryInclude(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Add included item"
                    />
                    <button
                      type="button"
                      onClick={addLuxuryInclude}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.packageDetails.luxury.includes.map((item, index) => (
                      <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-2">
                        {item}
                        <button
                          type="button"
                          onClick={() => removeLuxuryInclude(index)}
                          className="text-yellow-600 hover:text-yellow-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <input
                type="checkbox"
                name="staffIncluded"
                checked={formData.staffIncluded}
                onChange={handleChange}
                className="mr-2"
              />
              Staff Included
            </label>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Count</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cooks
                </label>
                <input
                  type="number"
                  name="staffCount.cooks"
                  value={formData.staffCount.cooks}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Servers
                </label>
                <input
                  type="number"
                  name="staffCount.servers"
                  value={formData.staffCount.servers}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Helpers
                </label>
                <input
                  type="number"
                  name="staffCount.helpers"
                  value={formData.staffCount.helpers}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipment Included
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentEquipment}
                onChange={(e) => setCurrentEquipment(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add equipment (e.g., Plates, Cutlery, Serving Bowls)"
              />
              <button
                type="button"
                onClick={addEquipment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.equipmentIncluded.map((equipment, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center gap-2">
                  {equipment}
                  <button
                    type="button"
                    onClick={() => removeEquipment(index)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialties
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentSpecialty}
                onChange={(e) => setCurrentSpecialty(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add specialty dish"
              />
              <button
                type="button"
                onClick={addSpecialty}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((specialty, index) => (
                <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-2">
                  {specialty}
                  <button
                    type="button"
                    onClick={() => removeSpecialty(index)}
                    className="text-orange-600 hover:text-orange-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Live Counters
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentLiveCounter}
                onChange={(e) => setCurrentLiveCounter(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add live counter (e.g., Pasta Counter, Chaat Counter)"
              />
              <button
                type="button"
                onClick={addLiveCounter}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.liveCounters.map((counter, index) => (
                <span key={index} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm flex items-center gap-2">
                  {counter}
                  <button
                    type="button"
                    onClick={() => removeLiveCounter(index)}
                    className="text-pink-600 hover:text-pink-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentFeature}
                onChange={(e) => setCurrentFeature(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add feature"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2">
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About *
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your catering services..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience (years) *
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="contactInfo.phone"
                  value={formData.contactInfo.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="contactInfo.email"
                  value={formData.contactInfo.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="contactInfo.whatsapp"
                  value={formData.contactInfo.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  type="text"
                  name="contactInfo.instagram"
                  value={formData.contactInfo.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="@username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="contactInfo.website"
                  value={formData.contactInfo.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Create Listing
            </button>
            <button
              type="button"
              onClick={() => navigate('/vendor/listings')}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCatering;

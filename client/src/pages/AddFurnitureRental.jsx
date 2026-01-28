import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

const AddFurnitureRental = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Wedding Furniture',
    mainImage: '',
    images: ['', '', ''],
    location: {
      area: '',
      city: '',
      state: ''
    },
    categories: [],
    furnitureTypes: [],
    packages: [],
    inventorySize: '',
    experience: '',
    eventsServed: '',
    features: [],
    about: '',
    contactInfo: {
      phone: '',
      email: '',
      whatsapp: '',
      instagram: '',
      website: ''
    }
  });

  const [currentCategory, setCurrentCategory] = useState('');
  const [currentFurnitureType, setCurrentFurnitureType] = useState('');
  const [currentFeature, setCurrentFeature] = useState('');
  const [currentPackage, setCurrentPackage] = useState({
    name: '',
    price: '',
    items: [],
    description: '',
    quantity: ''
  });
  const [currentPackageItem, setCurrentPackageItem] = useState('');

  const furnitureTypes = [
    'Wedding Furniture',
    'Corporate Furniture',
    'Party Furniture',
    'Lounge Furniture',
    'Stage Furniture',
    'Outdoor Furniture'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      });
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

  const addCategory = () => {
    if (currentCategory.trim()) {
      setFormData({
        ...formData,
        categories: [...formData.categories, currentCategory.trim()]
      });
      setCurrentCategory('');
    }
  };

  const removeCategory = (index) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((_, i) => i !== index)
    });
  };

  const addFurnitureType = () => {
    if (currentFurnitureType.trim()) {
      setFormData({
        ...formData,
        furnitureTypes: [...formData.furnitureTypes, currentFurnitureType.trim()]
      });
      setCurrentFurnitureType('');
    }
  };

  const removeFurnitureType = (index) => {
    setFormData({
      ...formData,
      furnitureTypes: formData.furnitureTypes.filter((_, i) => i !== index)
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

  const handlePackageChange = (e) => {
    const { name, value } = e.target;
    setCurrentPackage({
      ...currentPackage,
      [name]: value
    });
  };

  const addPackageItem = () => {
    if (currentPackageItem.trim()) {
      setCurrentPackage({
        ...currentPackage,
        items: [...currentPackage.items, currentPackageItem.trim()]
      });
      setCurrentPackageItem('');
    }
  };

  const removePackageItem = (index) => {
    setCurrentPackage({
      ...currentPackage,
      items: currentPackage.items.filter((_, i) => i !== index)
    });
  };

  const addPackage = () => {
    if (currentPackage.name && currentPackage.price) {
      setFormData({
        ...formData,
        packages: [...formData.packages, { ...currentPackage }]
      });
      setCurrentPackage({
        name: '',
        price: '',
        items: [],
        description: '',
        quantity: ''
      });
    }
  };

  const removePackage = (index) => {
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/furniture-rentals`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        alert('Furniture Rental listing created successfully!');
        navigate('/vendor/listings');
      }
    } catch (error) {
      console.error('Error creating furniture rental listing:', error);
      alert(error.response?.data?.message || 'Failed to create listing');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Furniture Rental</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Furniture Rental Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter furniture rental business name"
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
              {furnitureTypes.map((type) => (
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
              placeholder="https://example.com/main-image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Images (3)
            </label>
            {formData.images.map((img, index) => (
              <input
                key={index}
                type="url"
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-2"
                placeholder={`Image ${index + 1} URL`}
              />
            ))}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location *</h3>
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

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add category (e.g., Chairs, Tables, Sofas)"
              />
              <button
                type="button"
                onClick={addCategory}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => removeCategory(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Furniture Types</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={currentFurnitureType}
                onChange={(e) => setCurrentFurnitureType(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add furniture type (e.g., Chiavari Chairs, Round Tables)"
              />
              <button
                type="button"
                onClick={addFurnitureType}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.furnitureTypes.map((type, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {type}
                  <button
                    type="button"
                    onClick={() => removeFurnitureType(index)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Packages</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentPackage.name}
                    onChange={handlePackageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Basic Package, Premium Package"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={currentPackage.price}
                    onChange={handlePackageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter price"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={currentPackage.quantity}
                  onChange={handlePackageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Number of pieces included"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={currentPackage.description}
                  onChange={handlePackageChange}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Package description"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Items
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentPackageItem}
                    onChange={(e) => setCurrentPackageItem(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Add item (e.g., 50 Chairs, 10 Tables)"
                  />
                  <button
                    type="button"
                    onClick={addPackageItem}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add Item
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentPackage.items.map((item, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removePackageItem(index)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={addPackage}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Add Package
              </button>
            </div>

            <div className="space-y-3">
              {formData.packages.map((pkg, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4 rounded-lg bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                      <p className="text-lg text-blue-600 font-bold">₹{pkg.price}</p>
                      {pkg.quantity && (
                        <p className="text-sm text-gray-600">Quantity: {pkg.quantity}</p>
                      )}
                      {pkg.description && (
                        <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removePackage(index)}
                      className="text-red-600 hover:text-red-800 text-xl"
                    >
                      ×
                    </button>
                  </div>
                  {pkg.items && pkg.items.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">Items:</p>
                      <div className="flex flex-wrap gap-1">
                        {pkg.items.map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inventory Size *
                </label>
                <input
                  type="number"
                  name="inventorySize"
                  value={formData.inventorySize}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Total pieces"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Events Served *
                </label>
                <input
                  type="number"
                  name="eventsServed"
                  value={formData.eventsServed}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={currentFeature}
                onChange={(e) => setCurrentFeature(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add feature (e.g., Free Delivery, Setup Service)"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Your Business *
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your furniture rental services..."
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

export default AddFurnitureRental;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

const EditFlowerVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Fresh Flowers',
    mainImage: '',
    images: ['', '', ''],
    location: {
      area: '',
      city: '',
      state: ''
    },
    categories: [],
    flowerTypes: [],
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
  const [currentFlowerType, setCurrentFlowerType] = useState('');
  const [currentFeature, setCurrentFeature] = useState('');
  const [currentPackage, setCurrentPackage] = useState({
    name: '',
    price: '',
    items: [],
    description: '',
    coverage: '',
    services: []
  });
  const [currentPackageItem, setCurrentPackageItem] = useState('');
  const [currentPackageService, setCurrentPackageService] = useState('');

  const flowerVendorTypes = [
    'Fresh Flowers',
    'Artificial Flowers',
    'Exotic Flowers',
    'Seasonal Flowers',
    'Decorative Plants',
    'Flower Arrangements'
  ];

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/flower-vendors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching flower vendor listing:', error);
      alert('Failed to fetch listing');
    } finally {
      setLoading(false);
    }
  };

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

  const addFlowerType = () => {
    if (currentFlowerType.trim()) {
      setFormData({
        ...formData,
        flowerTypes: [...formData.flowerTypes, currentFlowerType.trim()]
      });
      setCurrentFlowerType('');
    }
  };

  const removeFlowerType = (index) => {
    setFormData({
      ...formData,
      flowerTypes: formData.flowerTypes.filter((_, i) => i !== index)
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

  const addPackageService = () => {
    if (currentPackageService.trim()) {
      setCurrentPackage({
        ...currentPackage,
        services: [...currentPackage.services, currentPackageService.trim()]
      });
      setCurrentPackageService('');
    }
  };

  const removePackageService = (index) => {
    setCurrentPackage({
      ...currentPackage,
      services: currentPackage.services.filter((_, i) => i !== index)
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
        coverage: '',
        services: []
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
      const response = await axios.put(
        `${API_URL}/flower-vendors/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        alert('Flower Vendor listing updated successfully!');
        navigate('/vendor/listings');
      }
    } catch (error) {
      console.error('Error updating flower vendor listing:', error);
      alert(error.response?.data?.message || 'Failed to update listing');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Flower Vendor</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flower Vendor Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter flower vendor name"
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
              {flowerVendorTypes.map(type => (
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

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Additional Images
            </label>
            {formData.images.map((image, index) => (
              <input
                key={index}
                type="url"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={`Image ${index + 1} URL`}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Wedding Flowers, Event Decoration"
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
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {category}
                  <button type="button" onClick={() => removeCategory(index)} className="text-blue-600 hover:text-blue-800">×</button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flower Types
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentFlowerType}
                onChange={(e) => setCurrentFlowerType(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Roses, Orchids, Lilies"
              />
              <button
                type="button"
                onClick={addFlowerType}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.flowerTypes.map((type, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {type}
                  <button type="button" onClick={() => removeFlowerType(index)} className="text-green-600 hover:text-green-800">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inventory Size
              </label>
              <input
                type="text"
                name="inventorySize"
                value={formData.inventorySize}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Large, Medium, Small"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience (years)
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Events Served
              </label>
              <input
                type="number"
                name="eventsServed"
                value={formData.eventsServed}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentFeature}
                onChange={(e) => setCurrentFeature(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Same Day Delivery, Custom Arrangements"
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
                <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {feature}
                  <button type="button" onClick={() => removeFeature(index)} className="text-purple-600 hover:text-purple-800">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Packages</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={currentPackage.name}
                  onChange={handlePackageChange}
                  placeholder="Package Name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="price"
                  value={currentPackage.price}
                  onChange={handlePackageChange}
                  placeholder="Price"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                name="coverage"
                value={currentPackage.coverage}
                onChange={handlePackageChange}
                placeholder="Coverage (e.g., 100 people)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                value={currentPackage.description}
                onChange={handlePackageChange}
                placeholder="Package Description"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Items Included</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentPackageItem}
                    onChange={(e) => setCurrentPackageItem(e.target.value)}
                    placeholder="e.g., Rose Bouquet"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="button" onClick={addPackageItem} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentPackage.items.map((item, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2">
                      {item}
                      <button type="button" onClick={() => removePackageItem(index)} className="text-green-600 hover:text-green-800">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentPackageService}
                    onChange={(e) => setCurrentPackageService(e.target.value)}
                    placeholder="e.g., Setup & Installation"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="button" onClick={addPackageService} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentPackage.services.map((service, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
                      {service}
                      <button type="button" onClick={() => removePackageService(index)} className="text-blue-600 hover:text-blue-800">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={addPackage}
                className="w-full px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Package
              </button>
            </div>

            <div className="space-y-3">
              {formData.packages.map((pkg, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{pkg.name}</h4>
                      <p className="text-gray-600">₹{pkg.price} - {pkg.coverage}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePackage(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{pkg.description}</p>
                  {pkg.items.length > 0 && (
                    <div className="text-sm">
                      <strong>Items:</strong> {pkg.items.join(', ')}
                    </div>
                  )}
                  {pkg.services.length > 0 && (
                    <div className="text-sm">
                      <strong>Services:</strong> {pkg.services.join(', ')}
                    </div>
                  )}
                </div>
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
              placeholder="Describe your flower vendor services..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Email
              </label>
              <input
                type="email"
                name="contactInfo.email"
                value={formData.contactInfo.email}
                onChange={handleChange}
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
              />
            </div>
            <div className="md:col-span-2">
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

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Update Listing
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

export default EditFlowerVendor;

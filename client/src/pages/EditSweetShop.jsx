import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

const EditSweetShop = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Traditional Sweets',
    mainImage: '',
    images: ['', '', ''],
    location: {
      city: '',
      area: '',
      state: ''
    },
    categories: [],
    sweetVarieties: [],
    packages: [],
    itemsAvailable: '',
    experience: '',
    ordersCompleted: '',
    features: [],
    about: '',
    contactInfo: {
      phone: '',
      email: '',
      website: '',
      whatsapp: '',
      instagram: ''
    }
  });

  const [currentCategory, setCurrentCategory] = useState('');
  const [currentVariety, setCurrentVariety] = useState('');
  const [currentFeature, setCurrentFeature] = useState('');
  const [currentPackage, setCurrentPackage] = useState({
    name: '',
    price: '',
    items: [],
    description: '',
    quantity: '',
    deliveryIncluded: false
  });
  const [currentPackageItem, setCurrentPackageItem] = useState('');

  const sweetTypes = [
    'Traditional Sweets',
    'Modern Desserts',
    'Sugar-Free Options',
    'Festival Specials',
    'Wedding Sweets',
    'Corporate Gifts'
  ];

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/sweet-shops/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
      alert('Failed to fetch listing data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
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

  const addVariety = () => {
    if (currentVariety.trim()) {
      setFormData({
        ...formData,
        sweetVarieties: [...formData.sweetVarieties, currentVariety.trim()]
      });
      setCurrentVariety('');
    }
  };

  const removeVariety = (index) => {
    setFormData({
      ...formData,
      sweetVarieties: formData.sweetVarieties.filter((_, i) => i !== index)
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
        packages: [...formData.packages, currentPackage]
      });
      setCurrentPackage({
        name: '',
        price: '',
        items: [],
        description: '',
        quantity: '',
        deliveryIncluded: false
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
        `${API_URL}/sweet-shops/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        alert('Sweet Shop listing updated successfully!');
        navigate('/vendor/listings');
      }
    } catch (error) {
      console.error('Error updating sweet shop listing:', error);
      alert(error.response?.data?.message || 'Failed to update listing');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Sweet Shop</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sweet Shop Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter sweet shop name"
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
              {sweetTypes.map((type) => (
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
              Additional Images (Up to 3)
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

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area
              </label>
              <input
                type="text"
                name="location.area"
                value={formData.location.area}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="location.state"
                value={formData.location.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Items Available *
              </label>
              <input
                type="number"
                name="itemsAvailable"
                value={formData.itemsAvailable}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                Orders Completed *
              </label>
              <input
                type="number"
                name="ordersCompleted"
                value={formData.ordersCompleted}
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
                placeholder="e.g., Mithai, Barfi, Ladoo"
              />
              <button
                type="button"
                onClick={addCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.categories.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                >
                  {item}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sweet Varieties
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentVariety}
                onChange={(e) => setCurrentVariety(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Kaju Katli, Gulab Jamun, Rasgulla"
              />
              <button
                type="button"
                onClick={addVariety}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.sweetVarieties.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeVariety(index)}
                    className="text-blue-600 hover:text-blue-800"
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
                <input
                  type="text"
                  placeholder="Package Name *"
                  value={currentPackage.name}
                  onChange={(e) => setCurrentPackage({ ...currentPackage, name: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Price *"
                  value={currentPackage.price}
                  onChange={(e) => setCurrentPackage({ ...currentPackage, price: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Quantity (e.g., 1kg, 20 pieces)"
                value={currentPackage.quantity}
                onChange={(e) => setCurrentPackage({ ...currentPackage, quantity: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <textarea
                placeholder="Description"
                value={currentPackage.description}
                onChange={(e) => setCurrentPackage({ ...currentPackage, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
                rows="2"
              />
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add item"
                  value={currentPackageItem}
                  onChange={(e) => setCurrentPackageItem(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addPackageItem}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Add Item
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentPackage.items.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-full"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removePackageItem(index)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={currentPackage.deliveryIncluded}
                  onChange={(e) => setCurrentPackage({ ...currentPackage, deliveryIncluded: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Delivery Included</span>
              </label>
              <button
                type="button"
                onClick={addPackage}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Package
              </button>
            </div>
            <div className="space-y-2">
              {formData.packages.map((pkg, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div>
                    <p className="font-medium">{pkg.name} - ₹{pkg.price}</p>
                    <p className="text-sm text-gray-600">{pkg.items.join(', ')}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePackage(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
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
                placeholder="e.g., Fresh Daily, Pure Ghee, No Preservatives"
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
              {formData.features.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-blue-600 hover:text-blue-800"
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
              placeholder="Describe your sweet shop..."
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="tel"
                name="contactInfo.phone"
                placeholder="Phone"
                value={formData.contactInfo.phone}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="contactInfo.email"
                placeholder="Email"
                value={formData.contactInfo.email}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                name="contactInfo.website"
                placeholder="Website"
                value={formData.contactInfo.website}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                name="contactInfo.whatsapp"
                placeholder="WhatsApp"
                value={formData.contactInfo.whatsapp}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="contactInfo.instagram"
                placeholder="Instagram"
                value={formData.contactInfo.instagram}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-medium"
            >
              Update Sweet Shop Listing
            </button>
            <button
              type="button"
              onClick={() => navigate('/vendor/listings')}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSweetShop;

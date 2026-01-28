import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

const EditMehndiArtist = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Bridal Mehndi Specialist',
    mainImage: '',
    images: ['', '', ''],
    location: {
      area: '',
      city: '',
      state: ''
    },
    mehndiStyles: [],
    specializations: [],
    packages: [],
    teamSize: '',
    experience: '',
    bridalMehndiCount: '',
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

  const [currentStyle, setCurrentStyle] = useState('');
  const [currentSpecialization, setCurrentSpecialization] = useState('');
  const [currentFeature, setCurrentFeature] = useState('');
  const [currentPackage, setCurrentPackage] = useState({
    name: '',
    price: '',
    services: [],
    description: '',
    duration: ''
  });
  const [currentPackageService, setCurrentPackageService] = useState('');

  const mehndiTypes = [
    'Bridal Mehndi Specialist',
    'Arabic Mehndi Artist',
    'Traditional Mehndi Artist',
    'Contemporary Mehndi Designer',
    'Indo-Arabic Specialist',
    'Rajasthani Mehndi Expert'
  ];

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/mehndi-artists/${id}`, {
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

  const addStyle = () => {
    if (currentStyle.trim()) {
      setFormData({
        ...formData,
        mehndiStyles: [...formData.mehndiStyles, currentStyle.trim()]
      });
      setCurrentStyle('');
    }
  };

  const removeStyle = (index) => {
    setFormData({
      ...formData,
      mehndiStyles: formData.mehndiStyles.filter((_, i) => i !== index)
    });
  };

  const addSpecialization = () => {
    if (currentSpecialization.trim()) {
      setFormData({
        ...formData,
        specializations: [...formData.specializations, currentSpecialization.trim()]
      });
      setCurrentSpecialization('');
    }
  };

  const removeSpecialization = (index) => {
    setFormData({
      ...formData,
      specializations: formData.specializations.filter((_, i) => i !== index)
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
        services: [],
        description: '',
        duration: ''
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
        `${API_URL}/mehndi-artists/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        alert('Mehndi Artist listing updated successfully!');
        navigate('/vendor/listings');
      }
    } catch (error) {
      console.error('Error updating mehndi artist listing:', error);
      alert(error.response?.data?.message || 'Failed to update listing');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Mehndi Artist</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mehndi Artist Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mehndi artist name"
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
              {mehndiTypes.map((type) => (
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mehndi Styles
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentStyle}
                onChange={(e) => setCurrentStyle(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add style"
              />
              <button
                type="button"
                onClick={addStyle}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.mehndiStyles.map((style, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
                  {style}
                  <button
                    type="button"
                    onClick={() => removeStyle(index)}
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
              Specializations
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentSpecialization}
                onChange={(e) => setCurrentSpecialization(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add specialization"
              />
              <button
                type="button"
                onClick={addSpecialization}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specializations.map((specialization, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2">
                  {specialization}
                  <button
                    type="button"
                    onClick={() => removeSpecialization(index)}
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
            <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentPackage.name}
                    onChange={handlePackageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Package name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={currentPackage.price}
                    onChange={handlePackageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Price"
                  />
                </div>
              </div>
              <div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={currentPackage.duration}
                  onChange={handlePackageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2-3 hours"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Services
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentPackageService}
                    onChange={(e) => setCurrentPackageService(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Add service"
                  />
                  <button
                    type="button"
                    onClick={addPackageService}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add Service
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentPackage.services.map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-2">
                      {service}
                      <button
                        type="button"
                        onClick={() => removePackageService(index)}
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
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Package
              </button>
            </div>
            <div className="space-y-3">
              {formData.packages.map((pkg, index) => (
                <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                      <p className="text-blue-600 font-semibold">₹{pkg.price}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePackage(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
                  <p className="text-sm text-gray-600 mb-2">Duration: {pkg.duration}</p>
                  {pkg.services.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {pkg.services.map((service, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {service}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Size
              </label>
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Number of team members"
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
                placeholder="Years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bridal Mehndi Count
              </label>
              <input
                type="number"
                name="bridalMehndiCount"
                value={formData.bridalMehndiCount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Number of brides"
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
                <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-2">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your mehndi artist services..."
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
              Update Mehndi Artist Listing
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

export default EditMehndiArtist;

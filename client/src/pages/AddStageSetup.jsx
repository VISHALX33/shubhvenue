import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_URL from '../config/api';

function AddStageSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', type: '', mainImage: '', images: ['', '', ''],
    location: { city: '', area: '', address: '', pincode: '' },
    price: { perDay: '', perEvent: '' },
    dimensions: { length: '', width: '', height: '' },
    capacity: '', features: [], setupTime: '',
    materials: [], included: [], customization: false, about: '',
    contactInfo: { phone: '', email: '', website: '', whatsapp: '', instagram: '' }
  });

  const [featureInput, setFeatureInput] = useState('');
  const [materialInput, setMaterialInput] = useState('');
  const [includedInput, setIncludedInput] = useState('');

  const stageTypes = ['Wedding Stage', 'Corporate Stage', 'Concert Stage', 'Fashion Show Stage', 'DJ Stage', 'Birthday Party Stage'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: type === 'checkbox' ? checked : value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleImageChange = (idx, value) => {
    const newImages = [...formData.images];
    newImages[idx] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addItem = (field, input, setInput) => {
    if (input.trim()) {
      setFormData(prev => ({ ...prev, [field]: [...prev[field], input.trim()] }));
      setInput('');
    }
  };

  const removeItem = (field, idx) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/stage-setups`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        alert('Stage Setup listing created successfully!');
        navigate('/vendor/listings');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.error || 'Failed to create listing');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Stage Setup Service</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stage Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stage Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select Type</option>
                {stageTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="customization" checked={formData.customization} onChange={handleChange} className="w-4 h-4" />
              <span className="text-sm font-medium text-gray-700">Customization Available</span>
            </label>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Images</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL *</label>
              <input type="url" name="mainImage" value={formData.mainImage} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            {formData.images.map((img, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Image {idx + 1}</label>
                <input type="url" value={img} onChange={(e) => handleImageChange(idx, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Location</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input type="text" name="location.city" value={formData.location.city} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area *</label>
                <input type="text" name="location.area" value={formData.location.area} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <input type="text" name="location.address" value={formData.location.address} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                <input type="text" name="location.pincode" value={formData.location.pincode} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Dimensions & Capacity</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length (feet) *</label>
                <input type="number" name="dimensions.length" value={formData.dimensions.length} onChange={handleChange} required min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width (feet) *</label>
                <input type="number" name="dimensions.width" value={formData.dimensions.width} onChange={handleChange} required min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (feet) *</label>
                <input type="number" name="dimensions.height" value={formData.dimensions.height} onChange={handleChange} required min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (persons) *</label>
              <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Pricing & Setup</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Day (₹) *</label>
                <input type="number" name="price.perDay" value={formData.price.perDay} onChange={handleChange} required min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Event (₹)</label>
                <input type="number" name="price.perEvent" value={formData.price.perEvent} onChange={handleChange} min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Setup Time (hours) *</label>
              <input type="number" name="setupTime" value={formData.setupTime} onChange={handleChange} required min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Features</h2>
            <div className="flex gap-2">
              <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., LED Backdrop, Lighting" />
              <button type="button" onClick={() => addItem('features', featureInput, setFeatureInput)} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((item, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {item}
                  <button type="button" onClick={() => removeItem('features', idx)} className="text-blue-600 hover:text-blue-800">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Materials</h2>
            <div className="flex gap-2">
              <input type="text" value={materialInput} onChange={(e) => setMaterialInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Steel, Wood, Aluminum" />
              <button type="button" onClick={() => addItem('materials', materialInput, setMaterialInput)} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.materials.map((item, idx) => (
                <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {item}
                  <button type="button" onClick={() => removeItem('materials', idx)} className="text-green-600 hover:text-green-800">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">What's Included</h2>
            <div className="flex gap-2">
              <input type="text" value={includedInput} onChange={(e) => setIncludedInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Setup, Breakdown, Decoration" />
              <button type="button" onClick={() => addItem('included', includedInput, setIncludedInput)} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.included.map((item, idx) => (
                <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {item}
                  <button type="button" onClick={() => removeItem('included', idx)} className="text-purple-600 hover:text-purple-800">×</button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">About *</label>
            <textarea name="about" value={formData.about} onChange={handleChange} required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Describe your stage setup service..." />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input type="tel" name="contactInfo.phone" value={formData.contactInfo.phone} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" name="contactInfo.email" value={formData.contactInfo.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                <input type="tel" name="contactInfo.whatsapp" value={formData.contactInfo.whatsapp} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input type="url" name="contactInfo.website" value={formData.contactInfo.website} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input type="text" name="contactInfo.instagram" value={formData.contactInfo.instagram} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button type="submit" className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700">
              Create Stage Setup Listing
            </button>
            <button type="button" onClick={() => navigate('/vendor/listings')} className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStageSetup;

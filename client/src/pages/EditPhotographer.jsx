import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_URL from '../config/api';

function EditPhotographer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    mainImage: '',
    images: ['', '', ''],
    location: { city: '', area: '', address: '', pincode: '' },
    price: { perHour: '', perDay: '', perEvent: '' },
    experience: '',
    services: [],
    equipment: [],
    specializations: [],
    about: '',
    deliveryTime: '',
    contactInfo: { phone: '', email: '', website: '', whatsapp: '', instagram: '' }
  });

  const [serviceInput, setServiceInput] = useState('');
  const [equipmentInput, setEquipmentInput] = useState('');
  const [specializationInput, setSpecializationInput] = useState('');

  const photographerTypes = ['Wedding Photographer', 'Event Photographer', 'Commercial Photographer', 'Portrait Photographer', 'Product Photographer', 'Budget Photographer'];

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/photographers/${id}`, {
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
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addItem = (field, input, setInput) => {
    if (input.trim()) {
      setFormData(prev => ({ ...prev, [field]: [...prev[field], input.trim()] }));
      setInput('');
    }
  };

  const removeItem = (field, index) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/photographers/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        alert('Photographer listing updated successfully!');
        navigate('/vendor/listings');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.error || 'Failed to update listing');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Photographer</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Professional Wedding Photography" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photographer Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select Type</option>
                {photographerTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years) *</label>
                <input type="number" name="experience" value={formData.experience} onChange={handleChange} required min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time *</label>
                <input type="text" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., 7-10 days" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Images</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL *</label>
              <input type="url" name="mainImage" value={formData.mainImage} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="https://example.com/image.jpg" />
            </div>
            {formData.images.map((img, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Image {idx + 1}</label>
                <input type="url" value={img} onChange={(e) => handleImageChange(idx, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="https://example.com/image.jpg" />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input type="text" name="location.city" value={formData.location.city} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area *</label>
                <input type="text" name="location.area" value={formData.location.area} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input type="text" name="location.address" value={formData.location.address} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                <input type="text" name="location.pincode" value={formData.location.pincode} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Hour (₹) *</label>
                <input type="number" name="price.perHour" value={formData.price.perHour} onChange={handleChange} required min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Day (₹) *</label>
                <input type="number" name="price.perDay" value={formData.price.perDay} onChange={handleChange} required min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Event (₹)</label>
                <input type="number" name="price.perEvent" value={formData.price.perEvent} onChange={handleChange} min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Services Offered</h2>
            <div className="flex gap-2">
              <input type="text" value={serviceInput} onChange={(e) => setServiceInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Pre-Wedding Shoot, Candid Photography" />
              <button type="button" onClick={() => addItem('services', serviceInput, setServiceInput)} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.services.map((item, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {item}
                  <button type="button" onClick={() => removeItem('services', idx)} className="text-blue-600 hover:text-blue-800">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Equipment</h2>
            <div className="flex gap-2">
              <input type="text" value={equipmentInput} onChange={(e) => setEquipmentInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., DSLR Camera, Drone, Lighting" />
              <button type="button" onClick={() => addItem('equipment', equipmentInput, setEquipmentInput)} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.equipment.map((item, idx) => (
                <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {item}
                  <button type="button" onClick={() => removeItem('equipment', idx)} className="text-green-600 hover:text-green-800">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Specializations</h2>
            <div className="flex gap-2">
              <input type="text" value={specializationInput} onChange={(e) => setSpecializationInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Traditional, Candid, Cinematic" />
              <button type="button" onClick={() => addItem('specializations', specializationInput, setSpecializationInput)} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specializations.map((item, idx) => (
                <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {item}
                  <button type="button" onClick={() => removeItem('specializations', idx)} className="text-purple-600 hover:text-purple-800">×</button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">About *</label>
            <textarea name="about" value={formData.about} onChange={handleChange} required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Describe your photography service..." />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input type="tel" name="contactInfo.phone" value={formData.contactInfo.phone} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" name="contactInfo.email" value={formData.contactInfo.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input type="url" name="contactInfo.website" value={formData.contactInfo.website} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                <input type="tel" name="contactInfo.whatsapp" value={formData.contactInfo.whatsapp} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input type="text" name="contactInfo.instagram" value={formData.contactInfo.instagram} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button type="submit" className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700">
              Update Photographer Listing
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

export default EditPhotographer;

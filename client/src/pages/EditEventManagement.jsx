import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_URL from '../config/api';

function EditEventManagement() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', type: '', mainImage: '', images: ['', '', ''],
    location: { city: '', area: '', address: '', pincode: '' },
    price: { perEvent: '', consultation: '' },
    experience: '', services: [], specializations: [],
    eventsManaged: '', teamSize: '', about: '',
    contactInfo: { phone: '', email: '', website: '', whatsapp: '', instagram: '', facebook: '' }
  });

  const [serviceInput, setServiceInput] = useState('');
  const [specializationInput, setSpecializationInput] = useState('');

  const eventTypes = ['Wedding Planner', 'Corporate Event Manager', 'Social Event Planner', 'Birthday Party Organizer', 'Conference & Seminar Manager', 'Budget Event Manager'];

  useEffect(() => {
    fetchListingData();
  }, [id]);

  const fetchListingData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/event-management/${id}`, {
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

  const handleImageChange = (idx, value) => {
    const newImages = [...formData.images];
    newImages[idx] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addService = () => {
    if (serviceInput.trim()) {
      setFormData(prev => ({ ...prev, services: [...prev.services, serviceInput.trim()] }));
      setServiceInput('');
    }
  };

  const removeService = (idx) => {
    setFormData(prev => ({ ...prev, services: prev.services.filter((_, i) => i !== idx) }));
  };

  const addSpecialization = () => {
    if (specializationInput.trim()) {
      setFormData(prev => ({ ...prev, specializations: [...prev.specializations, specializationInput.trim()] }));
      setSpecializationInput('');
    }
  };

  const removeSpecialization = (idx) => {
    setFormData(prev => ({ ...prev, specializations: prev.specializations.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/event-management/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        alert('Event Management listing updated successfully!');
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Event Management Service</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select Type</option>
                {eventTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Size *</label>
                <input type="number" name="teamSize" value={formData.teamSize} onChange={handleChange} required min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                <input type="number" name="experience" value={formData.experience} onChange={handleChange} required min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Events Managed *</label>
              <input type="number" name="eventsManaged" value={formData.eventsManaged} onChange={handleChange} required min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Images</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL *</label>
              <input type="url" name="mainImage" value={formData.mainImage} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            {formData.images.map((img, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Image {idx + 1} URL</label>
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

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price per Event (₹)</label>
                <input type="number" name="price.perEvent" value={formData.price.perEvent} onChange={handleChange} min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee (₹)</label>
                <input type="number" name="price.consultation" value={formData.price.consultation} onChange={handleChange} min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Services Offered</h2>
            <div className="flex gap-2">
              <input type="text" value={serviceInput} onChange={(e) => setServiceInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())} placeholder="Enter a service" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              <button type="button" onClick={addService} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.services.map((service, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2">
                  {service}
                  <button type="button" onClick={() => removeService(idx)} className="text-blue-600 hover:text-blue-800">&times;</button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Specializations</h2>
            <div className="flex gap-2">
              <input type="text" value={specializationInput} onChange={(e) => setSpecializationInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())} placeholder="Enter a specialization" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              <button type="button" onClick={addSpecialization} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specializations.map((spec, idx) => (
                <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-2">
                  {spec}
                  <button type="button" onClick={() => removeSpecialization(idx)} className="text-green-600 hover:text-green-800">&times;</button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">About</h2>
            <textarea name="about" value={formData.about} onChange={handleChange} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Describe your event management services..."></textarea>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <input type="text" name="contactInfo.facebook" value={formData.contactInfo.facebook} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
              Update Listing
            </button>
            <button type="button" onClick={() => navigate('/vendor/listings')} className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition duration-200">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEventManagement;

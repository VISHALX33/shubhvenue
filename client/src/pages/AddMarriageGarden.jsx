import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';
import API_URL from '../config/api';

function AddMarriageGarden() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Indoor Garden',
    mainImage: '',
    images: ['', '', '', '', ''],
    location: {
      city: '',
      area: '',
      address: '',
      pincode: ''
    },
    price: {
      perDay: '',
      perPlate: ''
    },
    capacity: {
      min: '',
      max: ''
    },
    area: '',
    amenities: [],
    about: '',
    policies: {
      advancePayment: '',
      cancellation: '',
      decorationPolicy: '',
      parking: true,
      alcoholAllowed: false
    },
    contactInfo: {
      phone: '',
      email: '',
      website: ''
    }
  });

  const gardenTypes = ['Indoor Garden', 'Outdoor Garden', 'Lawn', 'Terrace Garden', 'Poolside Garden'];
  const commonAmenities = [
    'Parking', 'AC', 'Stage', 'Green Rooms', 'Kitchen', 'Dining Hall',
    'Playground', 'Swimming Pool', 'Garden', 'Sound System', 'Lighting',
    'Generator Backup', 'Valet Parking', 'Wi-Fi', 'CCTV', 'Security'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      const submitData = {
        ...formData,
        price: {
          perDay: Number(formData.price.perDay),
          perPlate: Number(formData.price.perPlate)
        },
        capacity: {
          min: Number(formData.capacity.min),
          max: Number(formData.capacity.max)
        },
        area: Number(formData.area)
        // vendorId will be set by backend from auth token
      };

      await axios.post(`${API_URL}/marriage-gardens`, submitData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Marriage Garden listing created successfully!');
      navigate('/vendor/listings');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert(error.response?.data?.error || 'Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <button
            onClick={() => navigate('/vendor/add-listing')}
            className="text-blue-600 hover:text-blue-700 font-semibold mb-4"
          >
            ← Back
          </button>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Marriage Garden</h1>
          <p className="text-gray-600 mb-6">Fill in the details to list your marriage garden</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Garden Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Royal Garden Palace"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Garden Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {gardenTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Images</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL *</label>
                <input
                  type="url"
                  name="mainImage"
                  value={formData.mainImage}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.images.map((img, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Image {index + 1}
                    </label>
                    <input
                      type="url"
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
                  <input
                    type="text"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                  <input
                    type="text"
                    name="location.pincode"
                    value={formData.location.pincode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Capacity */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Pricing & Capacity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per Day (₹) *</label>
                  <input
                    type="number"
                    name="price.perDay"
                    value={formData.price.perDay}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per Plate (₹)</label>
                  <input
                    type="number"
                    name="price.perPlate"
                    value={formData.price.perPlate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Capacity *</label>
                  <input
                    type="number"
                    name="capacity.min"
                    value={formData.capacity.min}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Capacity *</label>
                  <input
                    type="number"
                    name="capacity.max"
                    value={formData.capacity.max}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft) *</label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {commonAmenities.map(amenity => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About</h2>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your marriage garden..."
              />
            </div>

            {/* Contact Information */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
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

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/vendor/add-listing')}
                className="px-8 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMarriageGarden;

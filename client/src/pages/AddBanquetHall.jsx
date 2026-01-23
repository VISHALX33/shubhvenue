import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function AddBanquetHall() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'AC',
    mainImage: '',
    images: ['', '', ''],
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
    amenities: [],
    about: '',
    policies: {
      checkIn: '',
      checkOut: '',
      cancellation: '',
      pets: false,
      smoking: false
    },
    contactInfo: {
      phone: '',
      email: '',
      website: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
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
        vendorId: user._id,
        images: formData.images.filter(img => img.trim() !== ''),
        price: {
          perDay: Number(formData.price.perDay),
          perPlate: Number(formData.price.perPlate) || undefined
        },
        capacity: {
          min: Number(formData.capacity.min),
          max: Number(formData.capacity.max)
        }
      };

      await axios.post(
        'http://localhost:5000/api/banquet-halls',
        submitData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Banquet Hall listed successfully!');
      navigate('/vendor/listings');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert(error.response?.data?.error || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const amenitiesList = [
    'AC', 'Parking', 'Valet Parking', 'WiFi', 'Sound System',
    'Lighting', 'Stage', 'Green Rooms', 'Catering Service',
    'In-house Catering', 'Decor Service', 'DJ Service',
    'Projector', 'Dance Floor', 'Generator Backup'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Banquet Hall</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Hall Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter banquet hall name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Images</h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Main Image URL *</label>
                  <input
                    type="url"
                    value={formData.mainImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, mainImage: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {[0, 1, 2].map((index) => (
                  <div key={index}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Additional Image {index + 1}
                    </label>
                    <input
                      type="url"
                      value={formData.images[index]}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.location.city}
                    onChange={(e) => handleNestedChange('location', 'city', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Area *</label>
                  <input
                    type="text"
                    value={formData.location.area}
                    onChange={(e) => handleNestedChange('location', 'area', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Andheri West"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Full Address *</label>
                  <textarea
                    value={formData.location.address}
                    onChange={(e) => handleNestedChange('location', 'address', e.target.value)}
                    required
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full address"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Pincode *</label>
                  <input
                    type="text"
                    value={formData.location.pincode}
                    onChange={(e) => handleNestedChange('location', 'pincode', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 400053"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Capacity */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Pricing & Capacity</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Price per Day (₹) *</label>
                  <input
                    type="number"
                    value={formData.price.perDay}
                    onChange={(e) => handleNestedChange('price', 'perDay', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 75000"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Price per Plate (₹)</label>
                  <input
                    type="number"
                    value={formData.price.perPlate}
                    onChange={(e) => handleNestedChange('price', 'perPlate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 1000"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Min Capacity *</label>
                  <input
                    type="number"
                    value={formData.capacity.min}
                    onChange={(e) => handleNestedChange('capacity', 'min', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Max Capacity *</label>
                  <input
                    type="number"
                    value={formData.capacity.max}
                    onChange={(e) => handleNestedChange('capacity', 'max', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 500"
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenitiesList.map((amenity) => (
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
            <div>
              <label className="block text-gray-700 font-semibold mb-2">About *</label>
              <textarea
                value={formData.about}
                onChange={(e) => setFormData(prev => ({ ...prev, about: e.target.value }))}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your banquet hall..."
              />
            </div>

            {/* Policies */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Policies</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Check-in Time</label>
                  <input
                    type="text"
                    value={formData.policies.checkIn}
                    onChange={(e) => handleNestedChange('policies', 'checkIn', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 6:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Check-out Time</label>
                  <input
                    type="text"
                    value={formData.policies.checkOut}
                    onChange={(e) => handleNestedChange('policies', 'checkOut', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2:00 AM"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Cancellation Policy</label>
                  <input
                    type="text"
                    value={formData.policies.cancellation}
                    onChange={(e) => handleNestedChange('policies', 'cancellation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Full refund 30 days before event"
                  />
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.policies.pets}
                      onChange={(e) => handleNestedChange('policies', 'pets', e.target.checked)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">Pets Allowed</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.policies.smoking}
                      onChange={(e) => handleNestedChange('policies', 'smoking', e.target.checked)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">Smoking Allowed</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => handleNestedChange('contactInfo', 'phone', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 1234567890"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="hall@example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.contactInfo.website}
                    onChange={(e) => handleNestedChange('contactInfo', 'website', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.yourwebsite.com"
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/vendor/add-listing')}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBanquetHall;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_URL from '../config/api';

function AddCommunityHall() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Government Community Hall',
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
      alcohol: false,
      nonVeg: true
    },
    contactInfo: {
      phone: '',
      email: '',
      website: ''
    }
  });

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
        `${API_URL}/community-halls`,
        submitData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Community Hall listed successfully!');
      navigate('/vendor/listings');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert(error.response?.data?.error || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const amenitiesList = [
    'AC', 'Parking', 'Stage', 'Sound System', 'Kitchen',
    'Dining Hall', 'WiFi', 'Washrooms', 'Green Room', 'Storage Room',
    'Chairs & Tables', 'Power Backup', 'CCTV', 'Wheelchair Access'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Community Hall</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Hall Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="Enter community hall name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="Government Community Hall">Government Community Hall</option>
                    <option value="Society Hall">Society Hall</option>
                    <option value="Cultural Center">Cultural Center</option>
                    <option value="Religious Hall">Religious Hall</option>
                    <option value="Multi-Purpose Hall">Multi-Purpose Hall</option>
                    <option value="Budget Community Hall">Budget Community Hall</option>
                  </select>
                </div>
              </div>
            </div>

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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {[0, 1, 2].map((index) => (
                  <div key={index}>
                    <label className="block text-gray-700 font-semibold mb-2">Additional Image {index + 1}</label>
                    <input
                      type="url"
                      value={formData.images[index]}
                      onChange={(e) => {
                        const newImages = [...formData.images];
                        newImages[index] = e.target.value;
                        setFormData(prev => ({ ...prev, images: newImages }));
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.location.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, city: e.target.value } }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g., Pune"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Area</label>
                  <input
                    type="text"
                    value={formData.location.area}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, area: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g., Kothrud"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Address</label>
                  <textarea
                    value={formData.location.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, address: e.target.value } }))}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="Enter full address"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Pincode</label>
                  <input
                    type="text"
                    value={formData.location.pincode}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, pincode: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g., 411038"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Pricing & Capacity</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Price per Day (₹) *</label>
                  <input
                    type="number"
                    value={formData.price.perDay}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: { ...prev.price, perDay: e.target.value } }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g., 15000"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Price per Plate (₹)</label>
                  <input
                    type="number"
                    value={formData.price.perPlate}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: { ...prev.price, perPlate: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g., 500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Min Capacity *</label>
                  <input
                    type="number"
                    value={formData.capacity.min}
                    onChange={(e) => setFormData(prev => ({ ...prev, capacity: { ...prev.capacity, min: e.target.value } }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g., 50"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Max Capacity *</label>
                  <input
                    type="number"
                    value={formData.capacity.max}
                    onChange={(e) => setFormData(prev => ({ ...prev, capacity: { ...prev.capacity, max: e.target.value } }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g., 300"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesList.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => {
                        setFormData(prev => ({
                          ...prev,
                          amenities: prev.amenities.includes(amenity)
                            ? prev.amenities.filter(a => a !== amenity)
                            : [...prev.amenities, amenity]
                        }));
                      }}
                      className="w-4 h-4 text-rose-600"
                    />
                    <span className="text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">About *</label>
              <textarea
                value={formData.about}
                onChange={(e) => setFormData(prev => ({ ...prev, about: e.target.value }))}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                placeholder="Describe your community hall..."
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Policies</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Check-in Time</label>
                  <input
                    type="text"
                    value={formData.policies.checkIn}
                    onChange={(e) => setFormData(prev => ({ ...prev, policies: { ...prev.policies, checkIn: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g., 10:00 AM"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Check-out Time</label>
                  <input
                    type="text"
                    value={formData.policies.checkOut}
                    onChange={(e) => setFormData(prev => ({ ...prev, policies: { ...prev.policies, checkOut: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g., 10:00 PM"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Cancellation Policy</label>
                  <input
                    type="text"
                    value={formData.policies.cancellation}
                    onChange={(e) => setFormData(prev => ({ ...prev, policies: { ...prev.policies, cancellation: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g., Full refund 7 days before event"
                  />
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.policies.alcohol}
                      onChange={(e) => setFormData(prev => ({ ...prev, policies: { ...prev.policies, alcohol: e.target.checked } }))}
                      className="w-4 h-4 text-rose-600"
                    />
                    <span className="text-gray-700">Alcohol Allowed</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.policies.nonVeg}
                      onChange={(e) => setFormData(prev => ({ ...prev, policies: { ...prev.policies, nonVeg: e.target.checked } }))}
                      className="w-4 h-4 text-rose-600"
                    />
                    <span className="text-gray-700">Non-Veg Allowed</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: { ...prev.contactInfo, phone: e.target.value } }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="+91 1234567890"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: { ...prev.contactInfo, email: e.target.value } }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="hall@example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.contactInfo.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: { ...prev.contactInfo, website: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="https://www.yourwebsite.com"
                  />
                </div>
              </div>
            </div>

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
                className="flex-1 bg-gradient-to-r from-rose-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50"
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

export default AddCommunityHall;

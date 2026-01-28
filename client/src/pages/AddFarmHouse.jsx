import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_URL from '../config/api';

function AddFarmHouse() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Luxury',
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
      pets: true,
      smoking: false
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
        `${API_URL}/farm-houses`,
        submitData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Farm House listed successfully!');
      navigate('/vendor/listings');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert(error.response?.data?.error || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const amenitiesList = [
    'Swimming Pool', 'BBQ Area', 'Garden', 'Bonfire', 'Indoor Games',
    'Outdoor Games', 'Kitchen', 'WiFi', 'Parking', 'Security',
    'Caretaker', 'AC Rooms', 'Gazebo', 'Jacuzzi', 'Horse Riding'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Farm House</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Farm House Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter farm house name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Luxury">Luxury</option>
                    <option value="Budget">Budget</option>
                    <option value="Premium">Premium</option>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                      onChange={(e) => {
                        const newImages = [...formData.images];
                        newImages[index] = e.target.value;
                        setFormData(prev => ({ ...prev, images: newImages }));
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, city: e.target.value } }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Lonavala"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Area</label>
                  <input
                    type="text"
                    value={formData.location.area}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, area: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Khandala"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Address</label>
                  <textarea
                    value={formData.location.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, address: e.target.value } }))}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter full address"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Pincode</label>
                  <input
                    type="text"
                    value={formData.location.pincode}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, pincode: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 410401"
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
                    onChange={(e) => setFormData(prev => ({ ...prev, price: { ...prev.price, perDay: e.target.value } }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 30000"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Price per Plate (₹)</label>
                  <input
                    type="number"
                    value={formData.price.perPlate}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: { ...prev.price, perPlate: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 700"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Min Capacity *</label>
                  <input
                    type="number"
                    value={formData.capacity.min}
                    onChange={(e) => setFormData(prev => ({ ...prev, capacity: { ...prev.capacity, min: e.target.value } }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 20"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Max Capacity *</label>
                  <input
                    type="number"
                    value={formData.capacity.max}
                    onChange={(e) => setFormData(prev => ({ ...prev, capacity: { ...prev.capacity, max: e.target.value } }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 100"
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
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
                      className="w-4 h-4 text-green-600"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your farm house..."
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
                    onChange={(e) => setFormData(prev => ({ ...prev, policies: { ...prev.policies, checkIn: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 12:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Check-out Time</label>
                  <input
                    type="text"
                    value={formData.policies.checkOut}
                    onChange={(e) => setFormData(prev => ({ ...prev, policies: { ...prev.policies, checkOut: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 10:00 AM"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Cancellation Policy</label>
                  <input
                    type="text"
                    value={formData.policies.cancellation}
                    onChange={(e) => setFormData(prev => ({ ...prev, policies: { ...prev.policies, cancellation: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Full refund 7 days before check-in"
                  />
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.policies.pets}
                      onChange={(e) => setFormData(prev => ({ ...prev, policies: { ...prev.policies, pets: e.target.checked } }))}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-gray-700">Pets Allowed</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.policies.smoking}
                      onChange={(e) => setFormData(prev => ({ ...prev, policies: { ...prev.policies, smoking: e.target.checked } }))}
                      className="w-4 h-4 text-green-600"
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
                    onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: { ...prev.contactInfo, phone: e.target.value } }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="farmhouse@example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.contactInfo.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: { ...prev.contactInfo, website: e.target.value } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default AddFarmHouse;

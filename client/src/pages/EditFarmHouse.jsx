import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

function EditFarmHouse() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  
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

  useEffect(() => {
    const fetchFarmHouseData = async () => {
      try {
        setFetchingData(true);
        
        // Try to get data from location state first
        if (location.state?.farmHouse) {
          const farm = location.state.farmHouse;
          setFormData({
            name: farm.name || '',
            type: farm.type || 'Luxury',
            mainImage: farm.mainImage || '',
            images: farm.images || ['', '', ''],
            location: {
              city: farm.location?.city || '',
              area: farm.location?.area || '',
              address: farm.location?.address || '',
              pincode: farm.location?.pincode || ''
            },
            price: {
              perDay: farm.price?.perDay || '',
              perPlate: farm.price?.perPlate || ''
            },
            capacity: {
              min: farm.capacity?.min || '',
              max: farm.capacity?.max || ''
            },
            amenities: farm.amenities || [],
            about: farm.about || '',
            policies: {
              checkIn: farm.policies?.checkIn || '',
              checkOut: farm.policies?.checkOut || '',
              cancellation: farm.policies?.cancellation || '',
              pets: farm.policies?.pets !== undefined ? farm.policies.pets : true,
              smoking: farm.policies?.smoking || false
            },
            contactInfo: {
              phone: farm.contactInfo?.phone || '',
              email: farm.contactInfo?.email || '',
              website: farm.contactInfo?.website || ''
            }
          });
        } else {
          // Fallback: Fetch from API
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_URL}/farm-houses/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const farm = response.data.data;
          
          setFormData({
            name: farm.name || '',
            type: farm.type || 'Luxury',
            mainImage: farm.mainImage || '',
            images: farm.images || ['', '', ''],
            location: {
              city: farm.location?.city || '',
              area: farm.location?.area || '',
              address: farm.location?.address || '',
              pincode: farm.location?.pincode || ''
            },
            price: {
              perDay: farm.price?.perDay || '',
              perPlate: farm.price?.perPlate || ''
            },
            capacity: {
              min: farm.capacity?.min || '',
              max: farm.capacity?.max || ''
            },
            amenities: farm.amenities || [],
            about: farm.about || '',
            policies: {
              checkIn: farm.policies?.checkIn || '',
              checkOut: farm.policies?.checkOut || '',
              cancellation: farm.policies?.cancellation || '',
              pets: farm.policies?.pets !== undefined ? farm.policies.pets : true,
              smoking: farm.policies?.smoking || false
            },
            contactInfo: {
              phone: farm.contactInfo?.phone || '',
              email: farm.contactInfo?.email || '',
              website: farm.contactInfo?.website || ''
            }
          });
        }
      } catch (error) {
        console.error('Error fetching farm house data:', error);
        alert('Failed to load farm house data');
      } finally {
        setFetchingData(false);
      }
    };

    fetchFarmHouseData();
  }, [id, location.state]);

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
    
    if (!user || user.role !== 'vendor') {
      alert('Only vendors can update farm houses');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.put(
        `${API_URL}/farm-houses/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      alert('Farm House updated successfully!');
      navigate('/vendor/my-listings');
    } catch (error) {
      console.error('Error updating farm house:', error);
      alert(error.response?.data?.message || 'Failed to update farm house. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const amenitiesList = [
    'Swimming Pool', 'BBQ Area', 'Garden', 'Bonfire', 'Indoor Games',
    'Outdoor Games', 'Kitchen', 'WiFi', 'Parking', 'Security',
    'Caretaker', 'AC Rooms', 'Gazebo', 'Jacuzzi', 'Horse Riding'
  ];

  if (fetchingData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Edit Farm House
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm House Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter farm house name"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Luxury">Luxury</option>
                    <option value="Premium">Premium</option>
                    <option value="Budget">Budget</option>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Images (3 URLs)
                  </label>
                  {[0, 1, 2].map((index) => (
                    <input
                      key={index}
                      type="url"
                      value={formData.images[index]}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-2"
                      placeholder={`Image ${index + 1} URL`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.location.city}
                    onChange={(e) => handleNestedChange('location', 'city', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Pune"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area *
                  </label>
                  <input
                    type="text"
                    value={formData.location.area}
                    onChange={(e) => handleNestedChange('location', 'area', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Lonavala"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address *
                  </label>
                  <input
                    type="text"
                    value={formData.location.address}
                    onChange={(e) => handleNestedChange('location', 'address', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Full address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={formData.location.pincode}
                    onChange={(e) => handleNestedChange('location', 'pincode', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="410001"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Capacity */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Pricing & Capacity</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Day (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price.perDay}
                    onChange={(e) => handleNestedChange('price', 'perDay', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="15000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Plate (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.price.perPlate}
                    onChange={(e) => handleNestedChange('price', 'perPlate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Capacity *
                  </label>
                  <input
                    type="number"
                    value={formData.capacity.min}
                    onChange={(e) => handleNestedChange('capacity', 'min', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Capacity *
                  </label>
                  <input
                    type="number"
                    value={formData.capacity.max}
                    onChange={(e) => handleNestedChange('capacity', 'max', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="200"
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesList.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">About</h2>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your farm house..."
              />
            </div>

            {/* Policies */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Policies</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Time
                  </label>
                  <input
                    type="text"
                    value={formData.policies.checkIn}
                    onChange={(e) => handleNestedChange('policies', 'checkIn', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 12:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Time
                  </label>
                  <input
                    type="text"
                    value={formData.policies.checkOut}
                    onChange={(e) => handleNestedChange('policies', 'checkOut', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 11:00 AM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cancellation Policy
                  </label>
                  <textarea
                    value={formData.policies.cancellation}
                    onChange={(e) => handleNestedChange('policies', 'cancellation', e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Describe cancellation policy..."
                  />
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.policies.pets}
                      onChange={(e) => handleNestedChange('policies', 'pets', e.target.checked)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Pets Allowed</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.policies.smoking}
                      onChange={(e) => handleNestedChange('policies', 'smoking', e.target.checked)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Smoking Allowed</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="pb-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => handleNestedChange('contactInfo', 'phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="contact@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="text"
                    value={formData.contactInfo.website}
                    onChange={(e) => handleNestedChange('contactInfo', 'website', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="www.example.com"
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-green-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Farm House'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/vendor/my-listings')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
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

export default EditFarmHouse;

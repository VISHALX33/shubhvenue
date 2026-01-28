import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_URL from '../config/api';

function EditPartyHall() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Rooftop Party Hall',
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
      alcohol: true,
      dj: true
    },
    contactInfo: {
      phone: '',
      email: '',
      website: ''
    }
  });

  useEffect(() => {
    // Load data from location state or fetch from API
    if (location.state?.listing) {
      const listing = location.state.listing;
      setFormData({
        ...listing,
        images: listing.images?.length > 0 ? [...listing.images, '', '', ''].slice(0, 3) : ['', '', ''],
        amenities: listing.amenities || []
      });
      setFetchingData(false);
    } else {
      fetchPartyHallData();
    }
  }, [id, location.state]);

  const fetchPartyHallData = async () => {
    try {
      const response = await axios.get(`${API_URL}/party-halls/${id}`);
      const listing = response.data.data;
      
      setFormData({
        ...listing,
        images: listing.images?.length > 0 ? [...listing.images, '', '', ''].slice(0, 3) : ['', '', ''],
        amenities: listing.amenities || [],
        price: {
          perDay: listing.price?.perDay || '',
          perPlate: listing.price?.perPlate || ''
        },
        capacity: {
          min: listing.capacity?.min || '',
          max: listing.capacity?.max || ''
        }
      });
      setFetchingData(false);
    } catch (error) {
      console.error('Error fetching party hall data:', error);
      alert('Failed to load party hall data');
      navigate('/vendor/listings');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      const submitData = {
        ...formData,
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

      await axios.put(
        `${API_URL}/party-halls/${id}`,
        submitData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Party Hall updated successfully!');
      navigate('/vendor/listings');
    } catch (error) {
      console.error('Error updating listing:', error);
      alert(error.response?.data?.message || 'Failed to update listing');
    } finally {
      setLoading(false);
    }
  };

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

  const amenitiesList = [
    'AC', 'DJ Setup', 'Dance Floor', 'Bar Counter', 'Valet Parking', 
    'WiFi', 'Sound System', 'Lighting', 'Stage', 'Karaoke',
    'Smoking Area', 'VIP Lounge', 'Outdoor Area', 'Games Zone'
  ];

  if (fetchingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Party Hall</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Hall Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="Rooftop Party Hall">Rooftop Party Hall</option>
                    <option value="Indoor Party Hall">Indoor Party Hall</option>
                    <option value="Club Style">Club Style</option>
                    <option value="Lounge">Lounge</option>
                    <option value="Terrace Hall">Terrace Hall</option>
                    <option value="Budget Party Hall">Budget Party Hall</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Images</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700 mb-2">Main Image URL *</label>
                  <input
                    type="url"
                    name="mainImage"
                    value={formData.mainImage}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {[0, 1, 2].map((index) => (
                  <div key={index}>
                    <label className="block text-gray-700 mb-2">Additional Image {index + 1}</label>
                    <input
                      type="url"
                      value={formData.images[index]}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
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
                  <label className="block text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Area</label>
                  <input
                    type="text"
                    name="location.area"
                    value={formData.location.area}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Full Address</label>
                  <input
                    type="text"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    name="location.pincode"
                    value={formData.location.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Price Per Day (₹) *</label>
                  <input
                    type="number"
                    name="price.perDay"
                    value={formData.price.perDay}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Price Per Plate (₹)</label>
                  <input
                    type="number"
                    name="price.perPlate"
                    value={formData.price.perPlate}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Capacity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Minimum Capacity *</label>
                  <input
                    type="number"
                    name="capacity.min"
                    value={formData.capacity.min}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Maximum Capacity *</label>
                  <input
                    type="number"
                    name="capacity.max"
                    value={formData.capacity.max}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
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
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* About */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                placeholder="Describe your party hall..."
              />
            </div>

            {/* Policies */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Policies</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Check-in Time</label>
                    <input
                      type="text"
                      name="policies.checkIn"
                      value={formData.policies.checkIn}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                      placeholder="e.g., 6:00 PM"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Check-out Time</label>
                    <input
                      type="text"
                      name="policies.checkOut"
                      value={formData.policies.checkOut}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                      placeholder="e.g., 2:00 AM"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Cancellation Policy</label>
                  <textarea
                    name="policies.cancellation"
                    value={formData.policies.cancellation}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                    placeholder="Describe cancellation terms..."
                  />
                </div>
                <div className="flex gap-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="policies.alcohol"
                      checked={formData.policies.alcohol}
                      onChange={handleChange}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span>Alcohol Allowed</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="policies.dj"
                      checked={formData.policies.dj}
                      onChange={handleChange}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span>DJ Allowed</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="contactInfo.phone"
                    value={formData.contactInfo.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="contactInfo.email"
                    value={formData.contactInfo.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    name="contactInfo.website"
                    value={formData.contactInfo.website}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-md font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Party Hall'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/vendor/listings')}
                className="px-6 py-3 border border-gray-300 rounded-md font-semibold hover:bg-gray-50"
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

export default EditPartyHall;

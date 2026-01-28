import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_URL from '../config/api';

function EditMarriageGarden() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Indoor Garden',
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
    area: '',
    amenities: [],
    about: '',
    policies: {
      advancePayment: '',
      cancellation: '',
      decorationPolicy: '',
      parking: false,
      alcoholAllowed: false
    },
    contactInfo: {
      phone: '',
      email: '',
      website: ''
    }
  });

  useEffect(() => {
    // Load listing data from location state or fetch from API
    const loadListingData = async () => {
      if (location.state?.listing) {
        const listing = location.state.listing;
        setFormData({
          name: listing.name || '',
          type: listing.type || 'Indoor Garden',
          mainImage: listing.mainImage || '',
          images: listing.images?.slice(0, 3) || ['', '', ''],
          location: {
            city: listing.location?.city || '',
            area: listing.location?.area || '',
            address: listing.location?.address || '',
            pincode: listing.location?.pincode || ''
          },
          price: {
            perDay: listing.price?.perDay || '',
            perPlate: listing.price?.perPlate || ''
          },
          capacity: {
            min: listing.capacity?.min || '',
            max: listing.capacity?.max || ''
          },
          area: listing.area || '',
          amenities: listing.amenities || [],
          about: listing.about || '',
          policies: {
            advancePayment: listing.policies?.advancePayment || '',
            cancellation: listing.policies?.cancellation || '',
            decorationPolicy: listing.policies?.decorationPolicy || '',
            parking: listing.policies?.parking || false,
            alcoholAllowed: listing.policies?.alcoholAllowed || false
          },
          contactInfo: {
            phone: listing.contactInfo?.phone || '',
            email: listing.contactInfo?.email || '',
            website: listing.contactInfo?.website || ''
          }
        });
      } else {
        // Fetch from API if no state data
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(
            `${API_URL}/marriage-gardens/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          
          const listing = response.data.data;
          setFormData({
            name: listing.name || '',
            type: listing.type || 'Indoor Garden',
            mainImage: listing.mainImage || '',
            images: listing.images?.slice(0, 3) || ['', '', ''],
            location: {
              city: listing.location?.city || '',
              area: listing.location?.area || '',
              address: listing.location?.address || '',
              pincode: listing.location?.pincode || ''
            },
            price: {
              perDay: listing.price?.perDay || '',
              perPlate: listing.price?.perPlate || ''
            },
            capacity: {
              min: listing.capacity?.min || '',
              max: listing.capacity?.max || ''
            },
            area: listing.area || '',
            amenities: listing.amenities || [],
            about: listing.about || '',
            policies: {
              advancePayment: listing.policies?.advancePayment || '',
              cancellation: listing.policies?.cancellation || '',
              decorationPolicy: listing.policies?.decorationPolicy || '',
              parking: listing.policies?.parking || false,
              alcoholAllowed: listing.policies?.alcoholAllowed || false
            },
            contactInfo: {
              phone: listing.contactInfo?.phone || '',
              email: listing.contactInfo?.email || '',
              website: listing.contactInfo?.website || ''
            }
          });
        } catch (error) {
          console.error('Error fetching listing:', error);
          alert('Failed to load listing data');
          navigate('/vendor/listings');
        }
      }
    };
    
    loadListingData();
  }, [location.state, id, navigate]);

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
        images: formData.images.filter(img => img.trim() !== ''),
        price: {
          perDay: Number(formData.price.perDay),
          perPlate: Number(formData.price.perPlate)
        },
        capacity: {
          min: Number(formData.capacity.min),
          max: Number(formData.capacity.max)
        },
        area: Number(formData.area)
      };

      await axios.put(
        `${API_URL}/marriage-gardens/${id}`,
        submitData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Listing updated successfully!');
      navigate('/vendor/listings');
    } catch (error) {
      console.error('Error updating listing:', error);
      alert(error.response?.data?.error || 'Failed to update listing');
    } finally {
      setLoading(false);
    }
  };

  const amenitiesList = [
    'Parking', 'Valet Parking', 'AC', 'WiFi', 'Sound System',
    'Lighting', 'Stage', 'Green Rooms', 'Catering Service',
    'In-house Catering', 'Decor Service', 'DJ Service',
    'Swimming Pool', 'Garden', 'Lawn', 'Terrace'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Marriage Garden</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Venue Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter venue name"
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
                    <option value="Indoor Garden">Indoor Garden</option>
                    <option value="Outdoor Garden">Outdoor Garden</option>
                    <option value="Lawn">Lawn</option>
                    <option value="Terrace Garden">Terrace Garden</option>
                    <option value="Poolside Garden">Poolside Garden</option>
                    <option value="Marriage Garden">Marriage Garden</option>
                    <option value="Banquet Hall">Banquet Hall</option>
                    <option value="Resort">Resort</option>
                    <option value="Farmhouse">Farmhouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Area (sq ft) *</label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 5000"
                  />
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
                  <label className="block text-gray-700 font-semibold mb-2">Full Address</label>
                  <textarea
                    value={formData.location.address}
                    onChange={(e) => handleNestedChange('location', 'address', e.target.value)}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full address"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Pincode</label>
                  <input
                    type="text"
                    value={formData.location.pincode}
                    onChange={(e) => handleNestedChange('location', 'pincode', e.target.value)}
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
                    placeholder="e.g., 50000"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Price per Plate (₹)</label>
                  <input
                    type="number"
                    value={formData.price.perPlate}
                    onChange={(e) => handleNestedChange('price', 'perPlate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 800"
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
                placeholder="Describe your venue..."
              />
            </div>

            {/* Policies */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Policies</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Advance Payment Policy</label>
                  <input
                    type="text"
                    value={formData.policies.advancePayment}
                    onChange={(e) => handleNestedChange('policies', 'advancePayment', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 30% advance required"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Cancellation Policy</label>
                  <input
                    type="text"
                    value={formData.policies.cancellation}
                    onChange={(e) => handleNestedChange('policies', 'cancellation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Full refund 30 days before event"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Decoration Policy</label>
                  <input
                    type="text"
                    value={formData.policies.decorationPolicy}
                    onChange={(e) => handleNestedChange('policies', 'decorationPolicy', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Outside decorators allowed"
                  />
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.policies.parking}
                      onChange={(e) => handleNestedChange('policies', 'parking', e.target.checked)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">Parking Available</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.policies.alcoholAllowed}
                      onChange={(e) => handleNestedChange('policies', 'alcoholAllowed', e.target.checked)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">Alcohol Allowed</span>
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
                    placeholder="venue@example.com"
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
                onClick={() => navigate('/vendor/listings')}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditMarriageGarden;

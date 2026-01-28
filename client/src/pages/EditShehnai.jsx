import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_URL from '../config/api';

function EditShehnai() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', type: '', mainImage: '', images: ['', '', ''],
    location: { area: '', city: '', state: '' },
    groupMembers: '', shehnaiPlayers: '',
    instruments: [], costumes: { included: true, types: [] },
    performances: [], musicStyle: '',
    accompaniment: [],
    price: { perEvent: '', perHour: '' },
    duration: { minimum: '', maximum: '' },
    features: [], about: '', experience: '',
    contactInfo: { phone: '', email: '', whatsapp: '', instagram: '', website: '' }
  });

  const [instrumentInput, setInstrumentInput] = useState('');
  const [performanceInput, setPerformanceInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [accompanimentInput, setAccompanimentInput] = useState('');
  const [costumeInput, setCostumeInput] = useState('');

  const shehnaiTypes = ['Traditional Shehnai', 'Wedding Specialist', 'Classical Shehnai', 'Fusion Shehnai', 'Temple Music', 'Budget Shehnai'];

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/shehnais/${id}`, {
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

  const musicStyles = ['Classical', 'Traditional', 'Fusion', 'Religious', 'Contemporary'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: type === 'checkbox' ? checked : value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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

  const addCostume = () => {
    if (costumeInput.trim()) {
      setFormData(prev => ({ ...prev, costumes: { ...prev.costumes, types: [...prev.costumes.types, costumeInput.trim()] } }));
      setCostumeInput('');
    }
  };

  const removeCostume = (idx) => {
    setFormData(prev => ({ ...prev, costumes: { ...prev.costumes, types: prev.costumes.types.filter((_, i) => i !== idx) } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/shehnais/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        alert('Shehnai listing updated successfully!');
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Shehnai</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shehnai Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select Type</option>
                {shehnaiTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Music Style *</label>
              <select name="musicStyle" value={formData.musicStyle} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select Style</option>
                {musicStyles.map(style => <option key={style} value={style}>{style}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Members (2-15) *</label>
                <input type="number" name="groupMembers" value={formData.groupMembers} onChange={handleChange} required min="2" max="15" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shehnai Players *</label>
                <input type="number" name="shehnaiPlayers" value={formData.shehnaiPlayers} onChange={handleChange} required min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years) *</label>
                <input type="number" name="experience" value={formData.experience} onChange={handleChange} required min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Image {idx + 1}</label>
                <input type="url" value={img} onChange={(e) => handleImageChange(idx, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input type="text" name="location.city" value={formData.location.city} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                <input type="text" name="location.area" value={formData.location.area} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input type="text" name="location.state" value={formData.location.state} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Pricing & Duration</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Event (₹) *</label>
                <input type="number" name="price.perEvent" value={formData.price.perEvent} onChange={handleChange} required min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Hour (₹)</label>
                <input type="number" name="price.perHour" value={formData.price.perHour} onChange={handleChange} min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Duration (hours) *</label>
                <input type="number" name="duration.minimum" value={formData.duration.minimum} onChange={handleChange} required min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Duration (hours)</label>
                <input type="number" name="duration.maximum" value={formData.duration.maximum} onChange={handleChange} min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Instruments</h2>
            <div className="flex gap-2">
              <input type="text" value={instrumentInput} onChange={(e) => setInstrumentInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Shehnai, Tabla, Harmonium" />
              <button type="button" onClick={() => addItem('instruments', instrumentInput, setInstrumentInput)} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.instruments.map((item, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {item}
                  <button type="button" onClick={() => removeItem('instruments', idx)} className="text-blue-600 hover:text-blue-800">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Accompaniment</h2>
            <div className="flex gap-2">
              <input type="text" value={accompanimentInput} onChange={(e) => setAccompanimentInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Tabla Player, Harmonium Player" />
              <button type="button" onClick={() => addItem('accompaniment', accompanimentInput, setAccompanimentInput)} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.accompaniment.map((item, idx) => (
                <span key={idx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {item}
                  <button type="button" onClick={() => removeItem('accompaniment', idx)} className="text-indigo-600 hover:text-indigo-800">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Performances</h2>
            <div className="flex gap-2">
              <input type="text" value={performanceInput} onChange={(e) => setPerformanceInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Wedding Entry, Temple Ceremony" />
              <button type="button" onClick={() => addItem('performances', performanceInput, setPerformanceInput)} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.performances.map((item, idx) => (
                <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {item}
                  <button type="button" onClick={() => removeItem('performances', idx)} className="text-green-600 hover:text-green-800">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Features</h2>
            <div className="flex gap-2">
              <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Classical Training, Traditional Attire" />
              <button type="button" onClick={() => addItem('features', featureInput, setFeatureInput)} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((item, idx) => (
                <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {item}
                  <button type="button" onClick={() => removeItem('features', idx)} className="text-purple-600 hover:text-purple-800">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Costumes</h2>
            <label className="flex items-center gap-2 mb-2">
              <input type="checkbox" name="costumes.included" checked={formData.costumes.included} onChange={handleChange} className="w-4 h-4" />
              <span className="text-sm font-medium text-gray-700">Costumes Included</span>
            </label>
            {formData.costumes.included && (
              <>
                <div className="flex gap-2">
                  <input type="text" value={costumeInput} onChange={(e) => setCostumeInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Traditional, Ceremonial" />
                  <button type="button" onClick={addCostume} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.costumes.types.map((item, idx) => (
                    <span key={idx} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full flex items-center gap-2">
                      {item}
                      <button type="button" onClick={() => removeCostume(idx)} className="text-pink-600 hover:text-pink-800">×</button>
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">About *</label>
            <textarea name="about" value={formData.about} onChange={handleChange} required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Describe your Shehnai service..." />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" name="contactInfo.phone" value={formData.contactInfo.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input type="text" name="contactInfo.instagram" value={formData.contactInfo.instagram} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button type="submit" className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700">
              Update Shehnai Listing
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

export default EditShehnai;

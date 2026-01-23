import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    newLeads: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    lost: 0,
    highPriority: 0,
    conversionRate: 0
  });
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    serviceType: '',
    search: ''
  });
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [noteText, setNoteText] = useState('');

  const serviceTypes = [
    'photography', 'videography', 'dj', 'decoration', 'venue',
    'event-management', 'stage-setup', 'sound-system', 'lighting-setup',
    'generator', 'catering', 'band-baja', 'dhol-tasha', 'shehnai',
    'wedding-planner', 'mehndi-artist', 'makeup-artist'
  ];

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, [filters]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { 
        headers: { Authorization: `Bearer ${token}` },
        params: filters
      };
      const response = await axios.get('/api/leads', config);
      setLeads(response.data.data || response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('/api/leads/stats', config);
      setStats(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const viewLead = async (leadId) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`/api/leads/${leadId}`, config);
      setSelectedLead(response.data.data || response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching lead details:', error);
    }
  };

  const updateLeadStatus = async (leadId, status) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`/api/leads/${leadId}`, { status }, config);
      fetchLeads();
      fetchStats();
      if (selectedLead?._id === leadId) {
        viewLead(leadId);
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const updateLeadPriority = async (leadId, priority) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`/api/leads/${leadId}`, { priority }, config);
      fetchLeads();
      fetchStats();
      if (selectedLead?._id === leadId) {
        viewLead(leadId);
      }
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  const addNote = async () => {
    if (!noteText.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`/api/leads/${selectedLead._id}/notes`, { note: noteText }, config);
      setNoteText('');
      viewLead(selectedLead._id);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteLead = async (leadId) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`/api/leads/${leadId}`, config);
      fetchLeads();
      fetchStats();
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-purple-100 text-purple-800',
      converted: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Lead Management</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Leads</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">New Leads</p>
          <p className="text-2xl font-bold text-blue-600">{stats.newLeads}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Contacted</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.contacted}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Qualified</p>
          <p className="text-2xl font-bold text-purple-600">{stats.qualified}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Converted</p>
          <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Lost</p>
          <p className="text-2xl font-bold text-red-600">{stats.lost}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">High Priority</p>
          <p className="text-2xl font-bold text-orange-600">{stats.highPriority}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Conversion Rate</p>
          <p className="text-2xl font-bold text-indigo-600">{stats.conversionRate}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Service Type</label>
            <select
              value={filters.serviceType}
              onChange={(e) => setFilters({ ...filters, serviceType: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All Services</option>
              {serviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Name, email, phone..."
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">Loading...</td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">No leads found</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{lead.fullName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{lead.email}</div>
                    <div className="text-sm text-gray-500">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm">{lead.serviceType}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => viewLead(lead._id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Lead Details Modal */}
      {showModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">Lead Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{selectedLead.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{selectedLead.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{selectedLead.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Service Type</p>
                <p className="font-medium">{selectedLead.serviceType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Event Date</p>
                <p className="font-medium">
                  {selectedLead.eventDate ? new Date(selectedLead.eventDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Guest Count</p>
                <p className="font-medium">{selectedLead.guestCount || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{selectedLead.location || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Source</p>
                <p className="font-medium">{selectedLead.source}</p>
              </div>
            </div>

            {selectedLead.message && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Message</p>
                <p className="bg-gray-50 p-3 rounded">{selectedLead.message}</p>
              </div>
            )}

            {/* Status Update */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Update Status</p>
              <div className="flex gap-2">
                {['new', 'contacted', 'qualified', 'converted', 'lost'].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateLeadStatus(selectedLead._id, status)}
                    className={`px-4 py-2 rounded text-sm ${
                      selectedLead.status === status
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Update */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Update Priority</p>
              <div className="flex gap-2">
                {['low', 'medium', 'high'].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => updateLeadPriority(selectedLead._id, priority)}
                    className={`px-4 py-2 rounded text-sm ${
                      selectedLead.priority === priority
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Notes</p>
              <div className="space-y-2 mb-3">
                {selectedLead.notes?.map((note, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <p className="text-sm">{note.note}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {note.addedBy?.name || 'Unknown'} - {new Date(note.addedAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 border rounded px-3 py-2"
                />
                <button
                  onClick={addNote}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Add Note
                </button>
              </div>
            </div>

            {/* Delete Button */}
            <div className="flex justify-end">
              <button
                onClick={() => deleteLead(selectedLead._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;

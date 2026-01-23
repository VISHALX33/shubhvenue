import Lead from '../models/Lead.js';

// Create Lead
export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    
    res.status(201).json({
      success: true,
      data: lead
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get All Leads (Admin only)
export const getAllLeads = async (req, res) => {
  try {
    const { status, priority, serviceType } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (serviceType) filter.serviceType = serviceType;
    
    const leads = await Lead.find(filter)
      .populate('assignedTo', 'fullName email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: leads.length,
      data: leads
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get Single Lead
export const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assignedTo', 'fullName email')
      .populate('notes.addedBy', 'fullName');
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    res.json({
      success: true,
      data: lead
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update Lead
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    res.json({
      success: true,
      data: lead
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Add Note to Lead
export const addLeadNote = async (req, res) => {
  try {
    const { note } = req.body;
    
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    lead.notes.push({
      note,
      addedBy: req.user._id
    });
    
    await lead.save();
    
    res.json({
      success: true,
      data: lead
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete Lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get Lead Stats
export const getLeadStats = async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const contacted = await Lead.countDocuments({ status: 'contacted' });
    const qualified = await Lead.countDocuments({ status: 'qualified' });
    const converted = await Lead.countDocuments({ status: 'converted' });
    const lost = await Lead.countDocuments({ status: 'lost' });
    
    const highPriority = await Lead.countDocuments({ priority: 'high' });
    
    res.json({
      success: true,
      data: {
        total,
        newLeads,
        contacted,
        qualified,
        converted,
        lost,
        highPriority,
        conversionRate: total > 0 ? ((converted / total) * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

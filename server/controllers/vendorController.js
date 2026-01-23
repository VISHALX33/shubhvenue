import MarriageGarden from '../models/MarriageGarden.js';
import BanquetHall from '../models/BanquetHall.js';
import PartyHall from '../models/PartyHall.js';
import FarmHouse from '../models/FarmHouse.js';
import Hotel from '../models/Hotel.js';
import Resort from '../models/Resort.js';
import LodgeGuestHouse from '../models/LodgeGuestHouse.js';
import Homestay from '../models/Homestay.js';
import CommunityHall from '../models/CommunityHall.js';
import OpenGround from '../models/OpenGround.js';
import CorporateEventSpace from '../models/CorporateEventSpace.js';
import DJ from '../models/DJ.js';
import BandBaja from '../models/BandBaja.js';
import DholTasha from '../models/DholTasha.js';
import Shehnai from '../models/Shehnai.js';
import Photographer from '../models/Photographer.js';
import Videographer from '../models/Videographer.js';

// Get all listings for the authenticated vendor
export const getVendorListings = async (req, res) => {
  try {
    const vendorId = req.user._id;
    
    // Fetch all listing types for this vendor
    const [marriageGardens, banquetHalls, partyHalls, farmHouses, hotels, resorts, lodges, homestays, communityHalls, openGrounds, corporateSpaces, djs, bandBajas, dholTashas, shehnais, photographers, videographers] = await Promise.all([
      MarriageGarden.find({ vendorId }),
      BanquetHall.find({ vendorId }),
      PartyHall.find({ vendorId }),
      FarmHouse.find({ vendorId }),
      Hotel.find({ vendorId }),
      Resort.find({ vendorId }),
      LodgeGuestHouse.find({ vendorId }),
      Homestay.find({ vendorId }),
      CommunityHall.find({ vendorId }),
      OpenGround.find({ vendorId }),
      CorporateEventSpace.find({ vendorId }),
      DJ.find({ vendorId }),
      BandBaja.find({ vendorId }),
      DholTasha.find({ vendorId }),
      Shehnai.find({ vendorId }),
      Photographer.find({ vendorId }),
      Videographer.find({ vendorId })
    ]);
    
    // Combine all listings with a type identifier
    const allListings = [
      ...marriageGardens.map(item => ({ ...item.toObject(), serviceType: 'Marriage Garden', listingType: 'marriage-garden' })),
      ...banquetHalls.map(item => ({ ...item.toObject(), serviceType: 'Banquet Hall', listingType: 'banquet-hall' })),
      ...partyHalls.map(item => ({ ...item.toObject(), serviceType: 'Party Hall', listingType: 'party-hall' })),
      ...farmHouses.map(item => ({ ...item.toObject(), serviceType: 'Farm House', listingType: 'farmhouse' })),
      ...hotels.map(item => ({ ...item.toObject(), serviceType: 'Hotel', listingType: 'hotel' })),
      ...resorts.map(item => ({ ...item.toObject(), serviceType: 'Resort', listingType: 'resort' })),
      ...lodges.map(item => ({ ...item.toObject(), serviceType: 'Lodge/Guest House', listingType: 'lodge' })),
      ...homestays.map(item => ({ ...item.toObject(), serviceType: 'Homestay', listingType: 'homestay' })),
      ...communityHalls.map(item => ({ ...item.toObject(), serviceType: 'Community Hall', listingType: 'community-hall' })),
      ...openGrounds.map(item => ({ ...item.toObject(), serviceType: 'Open Ground', listingType: 'open-ground' })),
      ...corporateSpaces.map(item => ({ ...item.toObject(), serviceType: 'Corporate Event Space', listingType: 'corporate-event-space' })),
      ...djs.map(item => ({ ...item.toObject(), serviceType: 'DJ', listingType: 'dj' })),
      ...bandBajas.map(item => ({ ...item.toObject(), serviceType: 'Band Baja', listingType: 'band-baja' })),
      ...dholTashas.map(item => ({ ...item.toObject(), serviceType: 'Dhol Tasha', listingType: 'dhol-tasha' })),
      ...shehnais.map(item => ({ ...item.toObject(), serviceType: 'Shehnai', listingType: 'shehnai' })),
      ...photographers.map(item => ({ ...item.toObject(), serviceType: 'Photographer', listingType: 'photographer' })),
      ...videographers.map(item => ({ ...item.toObject(), serviceType: 'Videographer', listingType: 'videographer' }))
    ];
    
    res.json({
      success: true,
      count: allListings.length,
      data: allListings
    });
  } catch (error) {
    console.error('Error fetching vendor listings:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a vendor listing
export const deleteVendorListing = async (req, res) => {
  try {
    const { id } = req.params;
    const vendorId = req.user._id;
    
    let deletedItem;
    
    // Try to delete from various collections
    deletedItem = await MarriageGarden.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await BanquetHall.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await PartyHall.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await FarmHouse.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await Hotel.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await Resort.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await LodgeGuestHouse.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await Homestay.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await CommunityHall.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await OpenGround.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await CorporateEventSpace.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await DJ.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await BandBaja.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await DholTasha.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await Shehnai.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await Photographer.findOneAndDelete({ _id: id, vendorId });
    if (!deletedItem) deletedItem = await Videographer.findOneAndDelete({ _id: id, vendorId });
    // if (!deletedItem) {
    //   deletedItem = await BanquetHall.findOneAndDelete({ _id: id, vendorId });
    // }
    
    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        error: 'Listing not found or unauthorized'
      });
    }
    
    res.json({
      success: true,
      message: 'Listing deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single vendor listing for editing
export const getVendorListing = async (req, res) => {
  try {
    const { id } = req.params;
    const vendorId = req.user._id;
    
    // Try to find in different collections
    let listing = await MarriageGarden.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Marriage Garden' } });
    
    listing = await BanquetHall.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Banquet Hall' } });
    
    listing = await PartyHall.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Party Hall' } });
    
    listing = await FarmHouse.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Farm House' } });
    
    listing = await Hotel.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Hotel' } });
    
    listing = await Resort.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Resort' } });
    
    listing = await LodgeGuestHouse.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Lodge/Guest House' } });
    
    listing = await Homestay.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Homestay' } });
    
    listing = await CommunityHall.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Community Hall' } });
    
    listing = await OpenGround.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Open Ground' } });
    
    listing = await CorporateEventSpace.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Corporate Event Space' } });
    
    listing = await DJ.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'DJ' } });
    
    listing = await BandBaja.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Band Baja' } });
    
    listing = await DholTasha.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Dhol Tasha' } });
    
    listing = await Shehnai.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Shehnai' } });
    
    listing = await Photographer.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Photographer' } });
    
    listing = await Videographer.findOne({ _id: id, vendorId });
    if (listing) return res.json({ success: true, data: { ...listing.toObject(), serviceType: 'Videographer' } });
    
    res.status(404).json({
      success: false,
      error: 'Listing not found'
    });
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

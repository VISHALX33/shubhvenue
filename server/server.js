import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import apiRoutes from './routes/api.js';
import marriageGardenRoutes from './routes/marriageGardens.js';
import banquetHallRoutes from './routes/banquetHalls.js';
import farmHouseRoutes from './routes/farmHouses.js';
import hotelRoutes from './routes/hotels.js';
import resortRoutes from './routes/resorts.js';
import lodgeGuestHouseRoutes from './routes/lodgeGuestHouseRoutes.js';
import homestayRoutes from './routes/homestayRoutes.js';
import partyHallRoutes from './routes/partyHalls.js';
import communityHallRoutes from './routes/communityHalls.js';
import openGroundRoutes from './routes/openGrounds.js';
import corporateEventSpaceRoutes from './routes/corporateEventSpaces.js';
import djRoutes from './routes/djs.js';
import tentRoutes from './routes/tents.js';
import photographerRoutes from './routes/photographers.js';
import videographerRoutes from './routes/videographers.js';
import eventManagementRoutes from './routes/eventManagement.js';
import stageSetupRoutes from './routes/stageSetup.js';
import soundSystemRoutes from './routes/soundSystem.js';
import lightingSetupRoutes from './routes/lightingSetup.js';
import generatorRoutes from './routes/generator.js';
import cateringRoutes from './routes/catering.js';
import bandBajaRoutes from './routes/bandBaja.js';
import dholTashaRoutes from './routes/dholTasha.js';
import shehnaiRoutes from './routes/shehnai.js';
import weddingPlannerRoutes from './routes/weddingPlanner.js';
import mehndiArtistRoutes from './routes/mehndiArtistRoutes.js';
import makeupArtistRoutes from './routes/makeupArtistRoutes.js';
import costumeDressRoutes from './routes/costumeDressRoutes.js';
import eventFurnitureRoutes from './routes/eventFurnitureRoutes.js';
import furnitureRentalRoutes from './routes/furnitureRentals.js';
import bouncyKidsGameRoutes from './routes/bouncyKidsGameRoutes.js';
import carRentalWeddingRoutes from './routes/carRentalWeddingRoutes.js';
import flowerVendorRoutes from './routes/flowerVendorRoutes.js';
import balloonDecoratorRoutes from './routes/balloonDecoratorRoutes.js';
import sweetShopOrderRoutes from './routes/sweetShopOrderRoutes.js';
import iceCreamCounterRoutes from './routes/iceCreamCounterRoutes.js';
import juiceCounterRoutes from './routes/juiceCounterRoutes.js';
import liveFoodStallRoutes from './routes/liveFoodStallRoutes.js';
import flatBookingRoutes from './routes/flatBookingRoutes.js';
import rentHouseRoutes from './routes/rentHouseRoutes.js';
import pgHostelBookingRoutes from './routes/pgHostelBookingRoutes.js';
import shopBookingRoutes from './routes/shopBookingRoutes.js';
import warehouseGodownBookingRoutes from './routes/warehouseGodownBookingRoutes.js';
import officeSpaceBookingRoutes from './routes/officeSpaceBookingRoutes.js';
import jameenPlotBookingRoutes from './routes/jameenPlotBookingRoutes.js';
import commercialPropertyBookingRoutes from './routes/commercialPropertyBookingRoutes.js';
import authRoutes from './routes/auth.js';
import vendorRoutes from './routes/vendorRoutes.js';
import bookingRoutes from './routes/booking.js';
import leadRoutes from './routes/lead.js';
import reviewRoutes from './routes/review.js';
import payoutRoutes from './routes/payout.js';

// ES Module dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS for server-side rendering (if needed)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API Routes
app.use('/api', apiRoutes);
app.use('/api', marriageGardenRoutes);
app.use('/api/banquet-halls', banquetHallRoutes);
app.use('/api/farm-houses', farmHouseRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/resorts', resortRoutes);
app.use('/api/lodges', lodgeGuestHouseRoutes);
app.use('/api/homestays', homestayRoutes);
app.use('/api/party-halls', partyHallRoutes);
app.use('/api/community-halls', communityHallRoutes);
app.use('/api/open-grounds', openGroundRoutes);
app.use('/api/corporate-event-spaces', corporateEventSpaceRoutes);
app.use('/api/djs', djRoutes);
app.use('/api/tents', tentRoutes);
app.use('/api/photographers', photographerRoutes);
app.use('/api/videographers', videographerRoutes);
app.use('/api/event-management', eventManagementRoutes);
app.use('/api/stage-setups', stageSetupRoutes);
app.use('/api/sound-systems', soundSystemRoutes);
app.use('/api/lighting-setups', lightingSetupRoutes);
app.use('/api/generators', generatorRoutes);
app.use('/api/catering', cateringRoutes);
app.use('/api/band-baja', bandBajaRoutes);
app.use('/api/dhol-tasha', dholTashaRoutes);
app.use('/api/shehnai', shehnaiRoutes);
app.use('/api/wedding-planner', weddingPlannerRoutes);
app.use('/api/mehndi-artist', mehndiArtistRoutes);
app.use('/api/makeup-artist', makeupArtistRoutes);
app.use('/api/costume-dress', costumeDressRoutes);
app.use('/api/event-furniture', eventFurnitureRoutes);
app.use('/api/furniture-rentals', furnitureRentalRoutes);
app.use('/api/bouncy-kids-game', bouncyKidsGameRoutes);
app.use('/api/car-rental-wedding', carRentalWeddingRoutes);
app.use('/api/flower-vendor', flowerVendorRoutes);
app.use('/api/balloon-decorator', balloonDecoratorRoutes);
app.use('/api/sweet-shop-orders', sweetShopOrderRoutes);
app.use('/api/ice-cream-counter', iceCreamCounterRoutes);
app.use('/api/juice-counter', juiceCounterRoutes);
app.use('/api/live-food-stall', liveFoodStallRoutes);
app.use('/api/flat-booking', flatBookingRoutes);
app.use('/api/rent-house', rentHouseRoutes);
app.use('/api/pg-hostel', pgHostelBookingRoutes);
app.use('/api/shop', shopBookingRoutes);
app.use('/api/warehouse-godown', warehouseGodownBookingRoutes);
app.use('/api/office-space', officeSpaceBookingRoutes);
app.use('/api/jameen-plot', jameenPlotBookingRoutes);
app.use('/api/commercial-property', commercialPropertyBookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payouts', payoutRoutes);

// EJS example route
app.get('/admin', (req, res) => {
  res.render('admin', {
    title: 'Admin Dashboard',
    message: 'Welcome to the admin panel'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'ShubhVenue API Server',
    version: '1.0.0',
    endpoints: {
      api: '/api',
      admin: '/admin'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

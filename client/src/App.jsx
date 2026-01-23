import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import GuestLogin from './pages/GuestLogin'
import GuestRegister from './pages/GuestRegister'
import GuestDashboard from './pages/GuestDashboard'
import BrowseServices from './pages/BrowseServices'
import BookingForm from './pages/BookingForm'
import VendorLogin from './pages/VendorLogin'
import VendorRegister from './pages/VendorRegister'
import VendorDashboard from './pages/VendorDashboard'
import VendorListings from './pages/VendorListings'
import VendorBookings from './pages/VendorBookings'
import VendorAnalytics from './pages/VendorAnalytics'
import VendorSettings from './pages/VendorSettings'
import AddListing from './pages/AddListing'
import AddMarriageGarden from './pages/AddMarriageGarden'
import AddBanquetHall from './pages/AddBanquetHall'
import AddPartyHall from './pages/AddPartyHall'
import AddFarmHouse from './pages/AddFarmHouse'
import AddHotel from './pages/AddHotel'
import AddResort from './pages/AddResort'
import AddLodge from './pages/AddLodge'
import AddHomestay from './pages/AddHomestay'
import AddCommunityHall from './pages/AddCommunityHall'
import AddOpenGround from './pages/AddOpenGround'
import AddCorporateEventSpace from './pages/AddCorporateEventSpace'
import AddDJ from './pages/AddDJ'
import AddBandBaja from './pages/AddBandBaja'
import AddDholTasha from './pages/AddDholTasha'
import AddShehnai from './pages/AddShehnai'
import AddPhotographer from './pages/AddPhotographer'
import AddVideographer from './pages/AddVideographer'
import AddEventManagement from './pages/AddEventManagement'
import AddTent from './pages/AddTent'
import AddStageSetup from './pages/AddStageSetup'
import AddSoundSystem from './pages/AddSoundSystem'
import AddLightingSetup from './pages/AddLightingSetup'
import AddGenerator from './pages/AddGenerator'
import AddCatering from './pages/AddCatering'
import AddSweetShop from './pages/AddSweetShop'
import AddIceCreamCounter from './pages/AddIceCreamCounter'
import AddJuiceCounter from './pages/AddJuiceCounter'
import AddLiveFoodStall from './pages/AddLiveFoodStall'
import AddWeddingPlanner from './pages/AddWeddingPlanner'
import AddMehndiArtist from './pages/AddMehndiArtist'
import AddMakeupArtist from './pages/AddMakeupArtist'
import AddCostumeDress from './pages/AddCostumeDress'
import AddBouncyKidsGame from './pages/AddBouncyKidsGame'
import AddCarRental from './pages/AddCarRental'
import AddFlowerVendor from './pages/AddFlowerVendor'
import AddBalloonDecorator from './pages/AddBalloonDecorator'
import AddFurnitureRental from './pages/AddFurnitureRental'
import EditMarriageGarden from './pages/EditMarriageGarden'
import EditEventManagement from './pages/EditEventManagement'
import EditTent from './pages/EditTent'
import EditStageSetup from './pages/EditStageSetup'
import EditSoundSystem from './pages/EditSoundSystem'
import EditLightingSetup from './pages/EditLightingSetup'
import EditGenerator from './pages/EditGenerator'
import EditCatering from './pages/EditCatering'
import EditSweetShop from './pages/EditSweetShop'
import EditIceCreamCounter from './pages/EditIceCreamCounter'
import EditJuiceCounter from './pages/EditJuiceCounter'
import EditLiveFoodStall from './pages/EditLiveFoodStall'
import EditWeddingPlanner from './pages/EditWeddingPlanner'
import EditMehndiArtist from './pages/EditMehndiArtist'
import EditMakeupArtist from './pages/EditMakeupArtist'
import EditCostumeDress from './pages/EditCostumeDress'
import EditBouncyKidsGame from './pages/EditBouncyKidsGame'
import EditCarRental from './pages/EditCarRental'
import EditFlowerVendor from './pages/EditFlowerVendor'
import EditBalloonDecorator from './pages/EditBalloonDecorator'
import EditFurnitureRental from './pages/EditFurnitureRental'
import EditDJ from './pages/EditDJ'
import EditBandBaja from './pages/EditBandBaja'
import EditDholTasha from './pages/EditDholTasha'
import EditShehnai from './pages/EditShehnai'
import EditPhotographer from './pages/EditPhotographer'
import EditVideographer from './pages/EditVideographer'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminVendors from './pages/AdminVendors'
import AdminBookings from './pages/AdminBookings'
import AdminLeads from './pages/AdminLeads'
import AllVenueHallBookings from './pages/AllVenueHallBookings'
import PartyHallBooking from './pages/PartyHallBooking'
import PartyHallDetails from './pages/PartyHallDetails'
import CommunityHallBooking from './pages/CommunityHallBooking'
import CommunityHallDetails from './pages/CommunityHallDetails'
import MarriageGardenBooking from './pages/MarriageGardenBooking'
import MarriageGardenDetails from './pages/MarriageGardenDetails'
import BanquetHallBooking from './pages/BanquetHallBooking'
import BanquetHallDetails from './pages/BanquetHallDetails'
import FarmhouseBooking from './pages/FarmhouseBooking'
import FarmhouseDetails from './pages/FarmhouseDetails'
import HotelBooking from './pages/HotelBooking'
import HotelDetails from './pages/HotelDetails'
import ResortBooking from './pages/ResortBooking'
import ResortDetails from './pages/ResortDetails'
import OpenGroundBooking from './pages/OpenGroundBooking'
import OpenGroundDetails from './pages/OpenGroundDetails'
import CorporateEventSpace from './pages/CorporateEventSpace'
import CorporateEventSpaceDetails from './pages/CorporateEventSpaceDetails'
import AllEventServices from './pages/AllEventServices'
import TentBooking from './pages/TentBooking'
import TentDetails from './pages/TentDetails'
import DJBooking from './pages/DJBooking'
import DJDetails from './pages/DJDetails'
import CameramanPhotographer from './pages/CameramanPhotographer'
import PhotographerDetails from './pages/PhotographerDetails'
import Videographer from './pages/Videographer'
import VideographerDetails from './pages/VideographerDetails'
import EventManagement from './pages/EventManagement'
import EventManagementDetails from './pages/EventManagementDetails'
import StageSetupBooking from './pages/StageSetupBooking'
import StageSetupDetails from './pages/StageSetupDetails'
import SoundSystemBooking from './pages/SoundSystemBooking'
import SoundSystemDetails from './pages/SoundSystemDetails'
import LightingSetupBooking from './pages/LightingSetupBooking'
import LightingSetupDetails from './pages/LightingSetupDetails'
import GeneratorBooking from './pages/GeneratorBooking'
import GeneratorDetails from './pages/GeneratorDetails'
import CateringServices from './pages/CateringServices'
import CateringDetails from './pages/CateringDetails'
import BandBajaBooking from './pages/BandBajaBooking'
import BandBajaDetails from './pages/BandBajaDetails'
import DholTashaGroup from './pages/DholTashaGroup'
import DholTashaDetails from './pages/DholTashaDetails'
import ShehnaiGroup from './pages/ShehnaiGroup'
import ShehnaiDetails from './pages/ShehnaiDetails'
import WeddingPlanner from './pages/WeddingPlanner'
import WeddingPlannerDetails from './pages/WeddingPlannerDetails'
import MehndiArtist from './pages/MehndiArtist'
import MehndiArtistDetails from './pages/MehndiArtistDetails'
import MakeupArtist from './pages/MakeupArtist'
import MakeupArtistDetails from './pages/MakeupArtistDetails'
import CostumeDressRental from './pages/CostumeDressRental'
import CostumeDressDetails from './pages/CostumeDressDetails'
import EventFurnitureRental from './pages/EventFurnitureRental'
import EventFurnitureDetails from './pages/EventFurnitureDetails'
import BouncyKidsGameSetup from './pages/BouncyKidsGameSetup'
import BouncyKidsGameDetails from './pages/BouncyKidsGameDetails'
import CrockeryUtensilsRental from './pages/CrockeryUtensilsRental'
import CarRentalWedding from './pages/CarRentalWedding'
import CarRentalWeddingDetails from './pages/CarRentalWeddingDetails'
import FlowerVendorBooking from './pages/FlowerVendorBooking'
import FlowerVendorDetails from './pages/FlowerVendorDetails'
import BalloonDecorator from './pages/BalloonDecorator'
import BalloonDecoratorDetails from './pages/BalloonDecoratorDetails'
import SweetShopOrders from './pages/SweetShopOrders'
import SweetShopOrderDetails from './pages/SweetShopOrderDetails'
import IceCreamCounter from './pages/IceCreamCounter'
import IceCreamCounterDetails from './pages/IceCreamCounterDetails'
import JuiceCounterBooking from './pages/JuiceCounterBooking'
import JuiceCounterDetails from './pages/JuiceCounterDetails'
import LiveFoodStallBooking from './pages/LiveFoodStallBooking'
import LiveFoodStallDetails from './pages/LiveFoodStallDetails'
import AllPropertyRentalBookings from './pages/AllPropertyRentalBookings'
import FlatBooking from './pages/FlatBooking'
import FlatBookingDetails from './pages/FlatBookingDetails'
import RentHouseBooking from './pages/RentHouseBooking'
import RentHouseDetails from './pages/RentHouseDetails'
import PGHostelBooking from './pages/PGHostelBooking'
import PGHostelBookingDetails from './pages/PGHostelBookingDetails'
import ShopBooking from './pages/ShopBooking'
import ShopBookingDetails from './pages/ShopBookingDetails'
import WarehouseGodownBooking from './pages/WarehouseGodownBooking'
import WarehouseGodownBookingDetails from './pages/WarehouseGodownBookingDetails'
import OfficeSpaceBooking from './pages/OfficeSpaceBooking'
import OfficeSpaceBookingDetails from './pages/OfficeSpaceBookingDetails'
import JameenPlotBooking from './pages/JameenPlotBooking'
import JameenPlotBookingDetails from './pages/JameenPlotBookingDetails'
import CommercialPropertyBooking from './pages/CommercialPropertyBooking'
import CommercialPropertyBookingDetails from './pages/CommercialPropertyBookingDetails'
import AllStayHospitalityBookings from './pages/AllStayHospitalityBookings'
import HotelRoomBooking from './pages/HotelRoomBooking'
import LodgeGuestHouseBooking from './pages/LodgeGuestHouseBooking'
import LodgeGuestHouseDetails from './pages/LodgeGuestHouseDetails'
import ResortStayBooking from './pages/ResortStayBooking'
import HomestayBooking from './pages/HomestayBooking'
import HomestayDetails from './pages/HomestayDetails'
import FarmhouseStay from './pages/FarmhouseStay'
import Bookings from './pages/Bookings'

function App() {
  return (
    <Router>
      <Routes>
        {/* Guest Auth Routes */}
        <Route path="/login" element={<GuestLogin />} />
        <Route path="/guest/login" element={<GuestLogin />} />
        <Route path="/guest/register" element={<GuestRegister />} />
        
        {/* Guest Protected Routes */}
        <Route path="/guest/dashboard" element={
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <ProtectedRoute allowedRoles={['guest']}>
              <GuestDashboard />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        
        <Route path="/guest/browse" element={
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <BrowseServices />
            <Footer />
          </div>
        } />
        
        <Route path="/guest/book/:serviceType/:serviceId" element={
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <ProtectedRoute allowedRoles={['guest']}>
              <BookingForm />
            </ProtectedRoute>
            <Footer />
          </div>
        } />

        {/* Vendor Auth Routes */}
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/register" element={<VendorRegister />} />
        
        {/* Vendor Routes with Navbar and Footer */}
        <Route path="/vendor/dashboard" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorDashboard />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/listings" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorListings />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddListing />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/marriage-garden" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddMarriageGarden />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/banquet-hall" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddBanquetHall />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/party-hall" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddPartyHall />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/farmhouse" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddFarmHouse />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/hotel" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddHotel />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/resort" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddResort />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/lodge" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddLodge />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/homestay" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddHomestay />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/community-hall" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddCommunityHall />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/open-ground" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddOpenGround />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/corporate-event-space" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddCorporateEventSpace />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/dj" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddDJ />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/band-baja" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddBandBaja />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/dhol-tasha" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddDholTasha />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/shehnai" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddShehnai />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/photographer" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddPhotographer />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/videographer" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddVideographer />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/event-management" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddEventManagement />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/tent" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddTent />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/stage-setup" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddStageSetup />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/sound-system" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddSoundSystem />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/lighting-setup" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddLightingSetup />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/generator" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddGenerator />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/catering" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddCatering />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/sweet-shop" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddSweetShop />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/ice-cream-counter" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddIceCreamCounter />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/ice-cream" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddIceCreamCounter />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/juice-counter" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddJuiceCounter />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/live-food-stall" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddLiveFoodStall />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/wedding-planner" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddWeddingPlanner />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/mehndi-artist" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddMehndiArtist />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/makeup-artist" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddMakeupArtist />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/costume-dress" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddCostumeDress />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/costume-rental" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddCostumeDress />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/bouncy-kids-game" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddBouncyKidsGame />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/bouncy-games" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddBouncyKidsGame />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/car-rental" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddCarRental />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/flower-vendor" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddFlowerVendor />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/balloon-decorator" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddBalloonDecorator />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/add-listing/furniture-rental" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <AddFurnitureRental />
            </ProtectedRoute>
            <Footer />
          </div>
        } />

        {/* Edit Listing Routes */}
        <Route path="/vendor/edit-listing/event-management/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditEventManagement />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/tent/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditTent />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/stage-setup/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditStageSetup />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/sound-system/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditSoundSystem />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/lighting-setup/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditLightingSetup />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/generator/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditGenerator />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/catering/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditCatering />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/sweet-shop/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditSweetShop />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/ice-cream-counter/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditIceCreamCounter />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/juice-counter/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditJuiceCounter />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/live-food-stall/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditLiveFoodStall />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/wedding-planner/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditWeddingPlanner />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/mehndi-artist/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditMehndiArtist />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/makeup-artist/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditMakeupArtist />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/costume-dress/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditCostumeDress />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/bouncy-kids-game/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditBouncyKidsGame />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/car-rental/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditCarRental />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/flower-vendor/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditFlowerVendor />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/balloon-decorator/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditBalloonDecorator />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/furniture-rental/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditFurnitureRental />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/dj/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditDJ />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/band-baja/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditBandBaja />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/dhol-tasha/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditDholTasha />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/shehnai/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditShehnai />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/photographer/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditPhotographer />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/edit-listing/videographer/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditVideographer />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        
        <Route path="/vendor/edit-listing/:id" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <EditMarriageGarden />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/bookings" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorBookings />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/analytics" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorAnalytics />
            </ProtectedRoute>
            <Footer />
          </div>
        } />
        <Route path="/vendor/settings" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorSettings />
            </ProtectedRoute>
            <Footer />
          </div>
        } />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="vendors" element={<AdminVendors />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="vendor-categories" element={<div className="p-8"><h2 className="text-2xl font-bold">Vendor Categories</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
          <Route path="venues/*" element={<div className="p-8"><h2 className="text-2xl font-bold">Venues Management</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
          <Route path="categories" element={<div className="p-8"><h2 className="text-2xl font-bold">Categories</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
          <Route path="menus" element={<div className="p-8"><h2 className="text-2xl font-bold">Menus</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
          <Route path="banner-video" element={<div className="p-8"><h2 className="text-2xl font-bold">Banner Video</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
          <Route path="banners" element={<div className="p-8"><h2 className="text-2xl font-bold">Banners</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
          <Route path="payouts" element={<div className="p-8"><h2 className="text-2xl font-bold">Payouts</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
          <Route path="reviews" element={<div className="p-8"><h2 className="text-2xl font-bold">Reviews</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
          <Route path="verification" element={<div className="p-8"><h2 className="text-2xl font-bold">Verification</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
          <Route path="plans" element={<div className="p-8"><h2 className="text-2xl font-bold">Plans</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
          <Route path="subscriptions" element={<div className="p-8"><h2 className="text-2xl font-bold">Subscriptions</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
          <Route path="staff/*" element={<div className="p-8"><h2 className="text-2xl font-bold">Staff Management</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
          <Route path="analytics" element={<div className="p-8"><h2 className="text-2xl font-bold">Analytics</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
          <Route path="settings/*" element={<div className="p-8"><h2 className="text-2xl font-bold">Settings</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>} />
        </Route>

        {/* Public Routes with Navbar */}
        <Route path="/*" element={ 
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venue-hall" element={<AllVenueHallBookings />} />
          <Route path="/venue-hall/all" element={<AllVenueHallBookings />} />
          <Route path="/venue-hall/party-hall" element={<PartyHallBooking />} />
          <Route path="/venue-hall/party-hall/:id" element={<PartyHallDetails />} />
          <Route path="/venue-hall/community-hall" element={<CommunityHallBooking />} />
          <Route path="/venue-hall/community-hall/:id" element={<CommunityHallDetails />} />
          <Route path="/venue-hall/marriage-garden" element={<MarriageGardenBooking />} />
          <Route path="/venue-hall/marriage-garden/:id" element={<MarriageGardenDetails />} />
          <Route path="/venue-hall/banquet-hall" element={<BanquetHallBooking />} />
          <Route path="/venue-hall/banquet-hall/:id" element={<BanquetHallDetails />} />
          <Route path="/venue-hall/farmhouse" element={<FarmhouseBooking />} />
          <Route path="/venue-hall/farmhouse/:id" element={<FarmhouseDetails />} />
          <Route path="/venue-hall/hotel" element={<HotelBooking />} />
          <Route path="/venue-hall/hotel/:id" element={<HotelDetails />} />
          <Route path="/venue-hall/resort" element={<ResortBooking />} />
          <Route path="/venue-hall/resort/:id" element={<ResortDetails />} />
          <Route path="/venue-hall/open-ground" element={<OpenGroundBooking />} />
          <Route path="/venue-hall/open-ground/:id" element={<OpenGroundDetails />} />
          <Route path="/venue-hall/corporate-event" element={<CorporateEventSpace />} />
          <Route path="/venue-hall/corporate-event/:id" element={<CorporateEventSpaceDetails />} />
          <Route path="/event-services/all" element={<AllEventServices />} />
          <Route path="/event-services/tent" element={<TentBooking />} />
          <Route path="/event-services/tent/:id" element={<TentDetails />} />
          <Route path="/event-services/dj" element={<DJBooking />} />
          <Route path="/event-services/dj/:id" element={<DJDetails />} />
          <Route path="/event-services/cameraman-photographer" element={<CameramanPhotographer />} />
          <Route path="/event-services/cameraman-photographer/:id" element={<PhotographerDetails />} />
          <Route path="/event-services/videographer" element={<Videographer />} />
          <Route path="/event-services/videographer/:id" element={<VideographerDetails />} />
          <Route path="/event-services/event-management" element={<EventManagement />} />
          <Route path="/event-services/event-management/:id" element={<EventManagementDetails />} />
          <Route path="/event-services/stage-setup" element={<StageSetupBooking />} />
          <Route path="/event-services/stage-setup/:id" element={<StageSetupDetails />} />
          <Route path="/event-services/sound-system" element={<SoundSystemBooking />} />
          <Route path="/event-services/sound-system/:id" element={<SoundSystemDetails />} />
          <Route path="/event-services/lighting-setup" element={<LightingSetupBooking />} />
          <Route path="/event-services/lighting-setup/:id" element={<LightingSetupDetails />} />
          <Route path="/event-services/generator" element={<GeneratorBooking />} />
          <Route path="/event-services/generator/:id" element={<GeneratorDetails />} />
          <Route path="/event-services/catering" element={<CateringServices />} />
          <Route path="/event-services/catering/:id" element={<CateringDetails />} />
          <Route path="/event-services/band-baja" element={<BandBajaBooking />} />
          <Route path="/event-services/band-baja/:id" element={<BandBajaDetails />} />
          <Route path="/event-services/dhol-tasha" element={<DholTashaGroup />} />
          <Route path="/event-services/dhol-tasha/:id" element={<DholTashaDetails />} />
          <Route path="/event-services/shehnai" element={<ShehnaiGroup />} />
          <Route path="/event-services/shehnai/:id" element={<ShehnaiDetails />} />
          <Route path="/event-services/wedding-planner" element={<WeddingPlanner />} />
          <Route path="/event-services/wedding-planner/:id" element={<WeddingPlannerDetails />} />
          <Route path="/event-services/mehndi-artist" element={<MehndiArtist />} />
          <Route path="/event-services/mehndi-artist/:id" element={<MehndiArtistDetails />} />
          <Route path="/event-services/makeup-artist" element={<MakeupArtist />} />
          <Route path="/event-services/makeup-artist/:id" element={<MakeupArtistDetails />} />
          <Route path="/event-services/costume-dress" element={<CostumeDressRental />} />
          <Route path="/event-services/costume-dress/:id" element={<CostumeDressDetails />} />
          <Route path="/event-services/furniture-rental" element={<EventFurnitureRental />} />
          <Route path="/event-services/furniture-rental/:id" element={<EventFurnitureDetails />} />
          <Route path="/event-services/bouncy-kids" element={<BouncyKidsGameSetup />} />
          <Route path="/event-services/bouncy-kids/:id" element={<BouncyKidsGameDetails />} />
          <Route path="/event-services/crockery-utensils" element={<CrockeryUtensilsRental />} />
          <Route path="/event-services/car-rental" element={<CarRentalWedding />} />
          <Route path="/event-services/car-rental/:id" element={<CarRentalWeddingDetails />} />
          <Route path="/event-services/flower-vendor" element={<FlowerVendorBooking />} />
          <Route path="/event-services/flower-vendor/:id" element={<FlowerVendorDetails />} />
          <Route path="/event-services/balloon-decorator" element={<BalloonDecorator />} />
          <Route path="/event-services/balloon-decorator/:id" element={<BalloonDecoratorDetails />} />
          <Route path="/event-services/sweet-shop" element={<SweetShopOrders />} />
          <Route path="/event-services/sweet-shop/:id" element={<SweetShopOrderDetails />} />
          <Route path="/event-services/ice-cream" element={<IceCreamCounter />} />
          <Route path="/event-services/ice-cream/:id" element={<IceCreamCounterDetails />} />
          <Route path="/event-services/juice-counter" element={<JuiceCounterBooking />} />
          <Route path="/event-services/juice-counter/:id" element={<JuiceCounterDetails />} />
          <Route path="/event-services/live-food-stall" element={<LiveFoodStallBooking />} />
          <Route path="/event-services/live-food-stall/:id" element={<LiveFoodStallDetails />} />
          <Route path="/event-services/flat-booking" element={<FlatBooking />} />
          <Route path="/event-services/flat-booking/:id" element={<FlatBookingDetails />} />
          <Route path="/event-services/rent-house" element={<RentHouseBooking />} />
          <Route path="/event-services/rent-house/:id" element={<RentHouseDetails />} />
          <Route path="/property-rental/all" element={<AllPropertyRentalBookings />} />
          <Route path="/property-rental/flat" element={<FlatBooking />} />
          <Route path="/property-rental/rent-house" element={<RentHouseBooking />} />
          <Route path="/property-rental/pg-hostel" element={<PGHostelBooking />} />
          <Route path="/property-rental/pg-hostel/:id" element={<PGHostelBookingDetails />} />
          <Route path="/property-rental/shop" element={<ShopBooking />} />
          <Route path="/property-rental/shop/:id" element={<ShopBookingDetails />} />
          <Route path="/property-rental/warehouse-godown" element={<WarehouseGodownBooking />} />
          <Route path="/property-rental/warehouse-godown/:id" element={<WarehouseGodownBookingDetails />} />
          <Route path="/property-rental/office-space" element={<OfficeSpaceBooking />} />
          <Route path="/property-rental/office-space/:id" element={<OfficeSpaceBookingDetails />} />
          <Route path="/property-rental/jameen-plot" element={<JameenPlotBooking />} />
          <Route path="/property-rental/jameen-plot/:id" element={<JameenPlotBookingDetails />} />
          <Route path="/property-rental/commercial-property" element={<CommercialPropertyBooking />} />
          <Route path="/property-rental/commercial-property/:id" element={<CommercialPropertyBookingDetails />} />
          <Route path="/stay-hospitality/all" element={<AllStayHospitalityBookings />} />
          <Route path="/stay-hospitality/hotel-room" element={<HotelRoomBooking />} />
          <Route path="/stay-hospitality/lodge-guest-house" element={<LodgeGuestHouseBooking />} />
          <Route path="/stay-hospitality/lodge-guest-house/:id" element={<LodgeGuestHouseDetails />} />
          <Route path="/stay-hospitality/resort-stay" element={<ResortStayBooking />} />
          <Route path="/stay-hospitality/homestay" element={<HomestayBooking />} />
          <Route path="/stay-hospitality/homestay/:id" element={<HomestayDetails />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/stay-hospitality/farmhouse-stay" element={<FarmhouseStay />} />
            </Routes>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  )
}


export default App

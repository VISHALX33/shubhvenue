import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MarriageGardenCard from '../components/MarriageGardenCard'
import BanquetHallCard from '../components/BanquetHallCard'
import FarmHouseCard from '../components/FarmHouseCard'
import HotelCard from '../components/HotelCard'
import ResortCard from '../components/ResortCard'
import CorporateEventSpaceCard from '../components/CorporateEventSpaceCard'

function Home() {
  const navigate = useNavigate()
  const [venueType, setVenueType] = useState('')
  const [location, setLocation] = useState('Kota')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [marriageGardens, setMarriageGardens] = useState([])
  const [banquetHalls, setBanquetHalls] = useState([])
  const [farmHouses, setFarmHouses] = useState([])
  const [hotels, setHotels] = useState([])
  const [resorts, setResorts] = useState([])
  const [corporateEventSpaces, setCorporateEventSpaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const venueTypes = [
    'Rooftop',
    'Club',
    'Palace',
    'Community Hall',
    'Hotels',
    'Marriage Garden',
    'Resort',
    'Farmhouse',
    'Open Grounds',
    'Banquet Hall'
  ]

  const rajasthanCities = [
    'Jaipur',
    'Jodhpur',
    'Udaipur',
    'Kota',
    'Ajmer',
    'Bikaner',
    'Alwar',
    'Bharatpur',
    'Bhilwara',
    'Sri Ganganagar',
    'Pali',
    'Sikar',
    'Tonk',
    'Kishangarh',
    'Beawar',
    'Hanumangarh',
    'Jhunjhunu',
    'Churu',
    'Baran',
    'Sawai Madhopur',
    'Nagaur',
    'Chittorgarh',
    'Dungarpur',
    'Banswara',
    'Mount Abu'
  ].sort()

  const handleSearch = (e) => {
    e.preventDefault()
    
    // Map venue types to their routes
    const venueRouteMap = {
      'rooftop': '/venue-hall/party-hall',
      'club': '/venue-hall/party-hall',
      'palace': '/venue-hall/banquet-hall',
      'community-hall': '/venue-hall/community-hall',
      'hotels': '/venue-hall/hotel',
      'marriage-garden': '/venue-hall/marriage-garden',
      'resort': '/venue-hall/resort',
      'farmhouse': '/venue-hall/farmhouse',
      'open-grounds': '/venue-hall/open-ground',
      'banquet-hall': '/venue-hall/banquet-hall'
    }

    // If venue type is selected, navigate to specific page
    if (venueType && venueRouteMap[venueType]) {
      navigate(venueRouteMap[venueType])
    } else {
      // If no venue type selected, go to all venues page
      navigate('/venue-hall/all')
    }
  }

  const venueCategories = [
    {
      name: 'Rooftop',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400',
      path: '/venue-hall/party-hall'
    },
    {
      name: 'Club',
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=400',
      path: '/venue-hall/party-hall'
    },
    {
      name: 'Palace',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400',
      path: '/venue-hall/banquet-hall'
    },
    {
      name: 'Community Hall',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      path: '/venue-hall/community-hall'
    },
    {
      name: 'Hotels',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      path: '/venue-hall/hotel'
    },
    {
      name: 'Marriage Garden',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
      path: '/venue-hall/marriage-garden'
    },
    {
      name: 'Resort',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
      path: '/venue-hall/resort'
    },
    {
      name: 'Farmhouse',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      path: '/venue-hall/farmhouse'
    },
    {
      name: 'Open Grounds',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400',
      path: '/venue-hall/open-ground'
    },
    {
      name: 'Banquet Hall',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8fd54?w=400',
      path: '/venue-hall/banquet-hall'
    }
  ]

  const itemsPerSlide = 5
  const totalSlides = Math.ceil(venueCategories.length / itemsPerSlide)

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [totalSlides])

  // Fetch marriage gardens, banquet halls, farm houses, hotels, resorts, and corporate event spaces
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const [gardensResponse, hallsResponse, farmHousesResponse, hotelsResponse, resortsResponse, corporateSpacesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/marriage-gardens'),
          axios.get('http://localhost:5000/api/banquet-halls'),
          axios.get('http://localhost:5000/api/farm-houses'),
          axios.get('http://localhost:5000/api/hotels'),
          axios.get('http://localhost:5000/api/resorts'),
          axios.get('http://localhost:5000/api/corporate-event-spaces')
        ])
        setMarriageGardens(gardensResponse.data.data.slice(0, 3))
        setBanquetHalls(hallsResponse.data.data.slice(0, 3))
        setFarmHouses(farmHousesResponse.data.data.slice(0, 3))
        setHotels(hotelsResponse.data.data.slice(0, 3))
        setResorts(resortsResponse.data.data.slice(0, 3))
        setCorporateEventSpaces(corporateSpacesResponse.data.data.slice(0, 3))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching venues:', error)
        setLoading(false)
      }
    }
    
    fetchVenues()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getCurrentCategories = () => {
    const start = currentSlide * itemsPerSlide
    return venueCategories.slice(start, start + itemsPerSlide)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center min-h-[600px] flex items-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f29da8fd54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Find Your Perfect Wedding Venue
            </h1>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Venue Type Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue Type
                  </label>
                  <select
                    value={venueType}
                    onChange={(e) => setVenueType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                  >
                    <option value="">Select Venue Type</option>
                    {venueTypes.map((type) => (
                      <option key={type} value={type.toLowerCase().replace(' ', '-')}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                  >
                    {rajasthanCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 px-6 rounded-md text-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
              >
                Find Wedding Venues
              </button>
            </div>
          </form>
        </div>
      </div>

     

   

      {/* Top Venue Category Section */}
      <div id="featured-venues" className="bg-gradient-to-br from-gray-50 to-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Top Venue Category
          </h2>

          {/* Carousel */}
          <div className="relative">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition hover:bg-gray-50"
              aria-label="Previous"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {getCurrentCategories().map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="flex flex-col items-center group"
                >
                  <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 text-center group-hover:text-indigo-600 transition">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition hover:bg-gray-50"
              aria-label="Next"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition ${
                  currentSlide === index
                    ? 'bg-indigo-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Marriage Gardens Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Marriage Gardens</h2>
              <p className="text-gray-600">Find the perfect garden venue for your special day</p>
            </div>
            <Link
              to="/venue-hall/marriage-garden"
              className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1"
            >
              View All
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600">Loading marriage gardens...</p>
            </div>
          ) : marriageGardens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marriageGardens.map((marriageGarden) => (
                <MarriageGardenCard
                  key={marriageGarden._id}
                  marriageGarden={marriageGarden}
                  onViewDetails={(garden) => navigate(`/venue-hall/marriage-garden/${garden._id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No marriage gardens available at the moment</p>
            </div>
          )}
        </div>
      </div>

      {/* Banquet Halls Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Banquet Halls</h2>
              <p className="text-gray-600">Elegant venues for your grand celebrations</p>
            </div>
            <Link
              to="/venue-hall/banquet-hall"
              className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1"
            >
              View All
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600">Loading banquet halls...</p>
            </div>
          ) : banquetHalls.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {banquetHalls.map((hall) => (
                <BanquetHallCard
                  key={hall._id}
                  hall={hall}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No banquet halls available at the moment</p>
            </div>
          )}
        </div>
      </div>

      {/* Farm Houses Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Farm Houses</h2>
              <p className="text-gray-600">Rustic charm meets modern luxury</p>
            </div>
            <Link
              to="/venue-hall/farmhouse"
              className="text-green-600 font-semibold hover:text-green-700 flex items-center gap-1"
            >
              View All
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600">Loading farm houses...</p>
            </div>
          ) : farmHouses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmHouses.map((farm) => (
                <FarmHouseCard
                  key={farm._id}
                  farmHouse={farm}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No farm houses available at the moment</p>
            </div>
          )}
        </div>
      </div>

      {/* Hotels Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Luxury Hotels</h2>
              <p className="text-gray-600">Premium hospitality for grand celebrations</p>
            </div>
            <Link
              to="/venue-hall/hotel"
              className="text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1"
            >
              View All
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
              <p className="mt-4 text-gray-600">Loading hotels...</p>
            </div>
          ) : hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <HotelCard
                  key={hotel._id}
                  hotel={hotel}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No hotels available at the moment</p>
            </div>
          )}
        </div>
      </div>

      {/* Resorts Section */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Luxury Resorts</h2>
              <p className="text-gray-600">Paradise destinations for unforgettable celebrations</p>
            </div>
            <Link
              to="/venue-hall/resort"
              className="text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-1"
            >
              View All
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
              <p className="mt-4 text-gray-600">Loading resorts...</p>
            </div>
          ) : resorts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resorts.map((resort) => (
                <ResortCard
                  key={resort._id}
                  resort={resort}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No resorts available at the moment</p>
            </div>
          )}
        </div>
      </div>

      {/* Corporate Event Spaces Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Corporate Event Spaces</h2>
              <p className="text-gray-600">Professional venues for business events and conferences</p>
            </div>
            <Link
              to="/venue-hall/corporate-event"
              className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1"
            >
              View All
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading corporate event spaces...</p>
            </div>
          ) : corporateEventSpaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {corporateEventSpaces.map((space) => (
                <CorporateEventSpaceCard
                  key={space._id}
                  space={space}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No corporate event spaces available at the moment</p>
            </div>
          )}
        </div>
      </div>

       {/* How it Works Section */}
      <div id="how-it-works" className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How it Works?
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to find and book your perfect venue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Browse Venues Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Browse Venues</h3>
              <p className="text-gray-600 leading-relaxed">
                Check out the best suited Venues, compare photos, special offers and function packages.
              </p>
            </div>

            {/* Request Quotes Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Request Quotes</h3>
              <p className="text-gray-600 leading-relaxed">
                Get custom quotes of your short-listed Venues at the click of GET FREE QUOTES button.
              </p>
            </div>

            {/* Book a Venue Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Book a Venue</h3>
              <p className="text-gray-600 leading-relaxed">
                Select and Book the perfect venue in no time at all. Time is money, save both.
              </p>
            </div>

            {/* Event Planning Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Event Planning</h3>
              <p className="text-gray-600 leading-relaxed">
                Plan your event effortlessly with expert guidance. Save time, stay stress-free.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why ShubhVenue Section */}
      <div id="why-shubhvenue" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why ShubhVenue?
            </h2>
            <p className="text-lg text-gray-600">
              Your trusted partner for perfect venue booking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Save Money Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Save Money</h3>
              <p className="text-gray-600 text-lg font-semibold">
                Lowest Price Guaranteed
              </p>
            </div>

            {/* Verified Listing Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Verified Listing</h3>
              <p className="text-gray-600 text-lg font-semibold">
                Dependable & Accurate
              </p>
            </div>

            {/* Hassle Free Booking Card */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Hassle Free Booking</h3>
              <p className="text-gray-600 text-lg font-semibold">
                Convenience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-white border border-gray-200 px-6 py-2 rounded-full text-sm font-medium text-gray-800">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Here's what our clients say
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Video/Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition cursor-pointer">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-white text-lg font-semibold">Happy Clients</p>
                    <p className="text-white/80 text-sm">Watch testimonial video</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                    alt="Priya Sharma"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Priya Sharma</h3>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className="w-4 h-4 fill-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  I booked a marriage garden through ShubhVenue for my daughter's wedding. The venue was exactly as shown in photos, and the booking process was so smooth. The team helped us every step of the way. I'm truly grateful to ShubhVenue!
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
                    alt="Rajesh Kumar"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Rajesh Kumar</h3>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className="w-4 h-4 fill-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  ShubhVenue's service is brilliant. I needed a resort for my anniversary celebration, and they helped us find the perfect place. The venue exceeded our expectations. Thank you, ShubhVenue, for making our day special!
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
                    alt="Anita Patel"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Anita Patel</h3>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className="w-4 h-4 fill-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  I was searching for a banquet hall for my son's engagement. ShubhVenue helped me compare multiple venues and get quotes instantly. I found the perfect hall within hours. ShubhVenue is awesome!
                </p>
              </div>

              {/* Testimonial 4 */}
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
                    alt="Vikram Singh"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Vikram Singh</h3>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className="w-4 h-4 fill-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  ShubhVenue does a fabulous job. I needed a farmhouse for a corporate event urgently. The customer support team was available 24/7 and helped me book the perfect venue. Highly recommend ShubhVenue!
                </p>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-12">
            <button className="w-8 h-2 rounded-full bg-indigo-600 transition-all hover:w-10"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-all"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-all"></button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about venue booking
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - FAQ Accordion */}
            <div className="space-y-4">
              {/* FAQ 1 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900">
                    How do I book a venue on ShubhVenue?
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${openFaqIndex === 0 ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaqIndex === 0 && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      Simply browse our venue listings, filter by location, type, and budget, then click "Book Now" or "Request Quote" on your preferred venue. Our team will contact you within 24 hours to finalize the booking.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900">
                    Are the venue photos and details accurate?
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${openFaqIndex === 1 ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaqIndex === 1 && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      Yes, all venue listings are verified by our team. We ensure photos are recent and accurate. Each venue undergoes a thorough verification process before being listed on our platform.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 3 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900">
                    What is your cancellation policy?
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${openFaqIndex === 2 ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaqIndex === 2 && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      Cancellation policies vary by venue. Typically, full refunds are available for cancellations made 30+ days before the event. Partial refunds for 15-30 days, and no refunds within 15 days of the event. Check specific venue policies during booking.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 4 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900">
                    Do you charge any booking fees?
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${openFaqIndex === 3 ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaqIndex === 3 && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      No, browsing and requesting quotes on ShubhVenue is completely free. We only charge a small service fee at the time of final booking confirmation, which is clearly disclosed upfront.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 5 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === 4 ? null : 4)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900">
                    Can I visit the venue before booking?
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${openFaqIndex === 4 ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaqIndex === 4 && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      Absolutely! We highly recommend visiting venues in person. Contact us or the venue directly to schedule a site visit. Most venues are happy to arrange tours for serious inquiries.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 6 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === 5 ? null : 5)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900">
                    What payment methods do you accept?
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${openFaqIndex === 5 ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaqIndex === 5 && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      We accept all major credit/debit cards, net banking, UPI, and digital wallets. For larger bookings, we also offer bank transfer options. All transactions are secure and encrypted.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=1000&fit=crop"
                  alt="Frequently Asked Questions"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Still have questions?
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Our support team is here to help you 24/7
                    </p>
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About and Destinations Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - About Shubh Venue */}
            <div id="about" className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About Shubh Venue
              </h2>
              
              <p className="text-gray-700 leading-relaxed">
                Shubh Venue is your trusted partner in finding the perfect venue for your special occasions. 
                We specialize in connecting you with the finest wedding venues, banquet halls, farm houses, 
                resorts, and hotels across Rajasthan and beyond. Whether you're planning a grand wedding, 
                intimate birthday celebration, corporate event, or traditional Haldi/Mehndi ceremony, 
                we have the perfect venue waiting for you.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Venue Types We Offer
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our platform features a diverse range of venue types to suit every occasion and preference. 
                  From elegant Marriage Gardens with lush green surroundings to sophisticated Banquet Halls 
                  perfect for grand celebrations, we have it all. Explore our collection of Farm Houses for a 
                  rustic charm, luxurious Resorts for a complete experience, or premium Hotels for unmatched 
                  hospitality.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  City Coverage
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Shubh Venue proudly serves customers across multiple cities in Rajasthan and India. Our extensive 
                  network includes premium venues in Kota, Jaipur, Udaipur, Jodhpur, Ajmer, and many more cities. 
                  No matter where you are planning your event, we have carefully curated venues that meet the highest 
                  standards of quality and service.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Why Choose Shubh Venue?
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Choosing Shubh Venue means choosing convenience, quality, and reliability. Our platform offers 
                  easy venue search and comparison, detailed venue information with high-quality images, transparent 
                  pricing, and dedicated customer support. We work with verified venue partners to ensure you get 
                  the best experience. With thousands of satisfied customers and hundreds of premium venues, Shubh 
                  Venue is your one-stop solution for all venue booking needs.
                </p>
                <p className="text-gray-700 leading-relaxed font-semibold">
                  Browse through our extensive collection of venues, compare prices and amenities, and book your 
                  perfect venue today!
                </p>
              </div>
            </div>

            {/* Right Side - Popular Wedding Venue Destinations */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Popular Wedding Venue Destinations
              </h2>

              <div className="space-y-4">
                {/* Kota */}
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-indigo-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Wedding Venues in Kota
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Discover the best wedding venues in Kota with Shubh Venue. From luxurious banquet halls to 
                    beautiful marriage gardens, find your perfect venue for your special day in Kota.
                  </p>
                </div>

                {/* Jaipur */}
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-pink-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Wedding Venues in Jaipur
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Discover the best wedding venues in Jaipur with Shubh Venue. From luxurious banquet halls to 
                    beautiful marriage gardens, find your perfect venue for your special day in Jaipur.
                  </p>
                </div>

                {/* Udaipur */}
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Wedding Venues in Udaipur
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Discover the best wedding venues in Udaipur with Shubh Venue. From luxurious banquet halls to 
                    beautiful marriage gardens, find your perfect venue for your special day in Udaipur.
                  </p>
                </div>

                {/* Jodhpur */}
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Wedding Venues in Jodhpur
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Discover the best wedding venues in Jodhpur with Shubh Venue. From luxurious banquet halls to 
                    beautiful marriage gardens, find your perfect venue for your special day in Jodhpur.
                  </p>
                </div>

                {/* Ajmer */}
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Wedding Venues in Ajmer
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Discover the best wedding venues in Ajmer with Shubh Venue. From luxurious banquet halls to 
                    beautiful marriage gardens, find your perfect venue for your special day in Ajmer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>)
}

export default Home

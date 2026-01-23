import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showVenueDropdown, setShowVenueDropdown] = useState(false)
  const [showEventDropdown, setShowEventDropdown] = useState(false)
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false)
  const [showStayDropdown, setShowStayDropdown] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Venue & Hall Bookings', 
      path: '/venue-hall',
      hasDropdown: true,
      subItems: [
        { name: 'All Venue & Hall Bookings', path: '/venue-hall/all' },
        { name: 'Party Hall Booking', path: '/venue-hall/party-hall' },
        { name: 'Community Hall Booking', path: '/venue-hall/community-hall' },
        { name: 'Marriage Garden Booking', path: '/venue-hall/marriage-garden' },
        { name: 'Banquet Hall Booking', path: '/venue-hall/banquet-hall' },
        { name: 'Farmhouse Booking', path: '/venue-hall/farmhouse' },
        { name: 'Resort Booking', path: '/venue-hall/resort' },
        { name: 'Open Ground/Plot for Events', path: '/venue-hall/open-ground' },
        { name: 'Corporate Event Space', path: '/venue-hall/corporate-event' },
      ]
    },
    { 
      name: 'Event Services', 
      path: '/event-services',
      hasDropdown: true,
      subItems: [
        { name: 'All Event Services', path: '/event-services/all' },
        { name: 'Tent Booking', path: '/event-services/tent' },
        { name: 'DJ Booking', path: '/event-services/dj' },
        { name: 'Cameraman / Photographer', path: '/event-services/cameraman-photographer' },
        { name: 'Videographer', path: '/event-services/videographer' },
        { name: 'Event Management', path: '/event-services/event-management' },
        { name: 'Stage Setup Booking', path: '/event-services/stage-setup' },
        { name: 'Sound System Booking', path: '/event-services/sound-system' },
        { name: 'Lighting Setup Booking', path: '/event-services/lighting-setup' },
        { name: 'Generator Booking', path: '/event-services/generator' },
        { name: 'Catering Services', path: '/event-services/catering' },
        { name: 'Band Baja Booking', path: '/event-services/band-baja' },
        { name: 'Dhol / Tasha Group', path: '/event-services/dhol-tasha' },
        { name: 'Shehnai Group', path: '/event-services/shehnai' },
        { name: 'Wedding Planner', path: '/event-services/wedding-planner' },
        { name: 'Mehndi Artist', path: '/event-services/mehndi-artist' },
        { name: 'Makeup Artist', path: '/event-services/makeup-artist' },
        { name: 'Costume & Dress Rental', path: '/event-services/costume-dress' },
        { name: 'Event Furniture Rental', path: '/event-services/furniture-rental' },
        { name: 'Bouncy / Kids Game Setup', path: '/event-services/bouncy-kids' },
        { name: 'Crockery & Utensils Rental', path: '/event-services/crockery-utensils' },
        { name: 'Car Rental for Wedding', path: '/event-services/car-rental' },
        { name: 'Flower Vendor Booking', path: '/event-services/flower-vendor' },
        { name: 'Balloon Decorator', path: '/event-services/balloon-decorator' },
        { name: 'Sweet Shop Orders', path: '/event-services/sweet-shop' },
        { name: 'Ice Cream Counter', path: '/event-services/ice-cream' },
        { name: 'Juice Counter Booking', path: '/event-services/juice-counter' },
        { name: 'Live Food Stall Booking', path: '/event-services/live-food-stall' },
      ]
    },
    { 
      name: 'Property & Rental Bookings', 
      path: '/property-rental',
      hasDropdown: true,
      subItems: [
        { name: 'All Property & Rental Bookings', path: '/property-rental/all' },
        { name: 'Flat Booking', path: '/property-rental/flat' },
        { name: 'Rent House Booking', path: '/property-rental/rent-house' },
        { name: 'PG / Hostel Booking', path: '/property-rental/pg-hostel' },
        { name: 'Shop Booking', path: '/property-rental/shop' },
        { name: 'Warehouse/Godown Booking', path: '/property-rental/warehouse-godown' },
        { name: 'Office Space Booking', path: '/property-rental/office-space' },
        { name: 'Jameen/Plot Booking', path: '/property-rental/jameen-plot' },
        { name: 'Commercial Property Booking', path: '/property-rental/commercial-property' },
      ]
    },
    { 
      name: 'Stay & Hospitality Bookings', 
      path: '/stay-hospitality',
      hasDropdown: true,
      subItems: [
        { name: 'All Stay & Hospitality Bookings', path: '/stay-hospitality/all' },
        { name: 'Hotel Room Booking', path: '/stay-hospitality/hotel-room' },
        { name: 'Lodge / Guest House Booking', path: '/stay-hospitality/lodge-guest-house' },
        { name: 'Resort Stay Booking', path: '/stay-hospitality/resort-stay' },
        { name: 'Homestay Booking', path: '/stay-hospitality/homestay' },
        { name: 'Farmhouse Stay', path: '/stay-hospitality/farmhouse-stay' },
      ]
    },
    { name: 'Bookings', path: '/bookings' },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-bold text-indigo-600">ShubhVenue</h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => {
                  if (item.hasDropdown) {
                    if (item.name === 'Venue & Hall Bookings') setShowVenueDropdown(true)
                    if (item.name === 'Event Services') setShowEventDropdown(true)
                    if (item.name === 'Property & Rental Bookings') setShowPropertyDropdown(true)
                    if (item.name === 'Stay & Hospitality Bookings') setShowStayDropdown(true)
                  }
                }}
                onMouseLeave={() => {
                  if (item.hasDropdown) {
                    if (item.name === 'Venue & Hall Bookings') setShowVenueDropdown(false)
                    if (item.name === 'Event Services') setShowEventDropdown(false)
                    if (item.name === 'Property & Rental Bookings') setShowPropertyDropdown(false)
                    if (item.name === 'Stay & Hospitality Bookings') setShowStayDropdown(false)
                  }
                }}
              >
                <Link
                  to={item.path}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-200 flex items-center"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <svg 
                      className="ml-1 h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {item.hasDropdown && (
                  (item.name === 'Venue & Hall Bookings' && showVenueDropdown) ||
                  (item.name === 'Event Services' && showEventDropdown) ||
                  (item.name === 'Property & Rental Bookings' && showPropertyDropdown) ||
                  (item.name === 'Stay & Hospitality Bookings' && showStayDropdown)
                ) && (
                  <div className={`absolute left-0 mt-0 bg-white rounded-md shadow-lg py-3 z-50 border border-gray-200 ${
                    item.name === 'Venue & Hall Bookings' || item.name === 'Event Services'
                      ? 'w-[48rem] grid grid-cols-3 gap-x-2 gap-y-1 px-2'
                      : 'w-64 max-h-96 overflow-y-auto'
                  }`}>
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-200 rounded-md"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Section - Desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                    {user.fullName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span>{user.fullName}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                          {user.role}
                        </span>
                      </div>
                      
                      {user.role === 'vendor' && (
                        <>
                          <Link
                            to="/vendor/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                              </svg>
                              Vendor Dashboard
                            </div>
                          </Link>
                          <Link
                            to="/vendor/bookings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                              My Bookings
                            </div>
                          </Link>
                        </>
                      )}
                      
                      {user.role === 'guest' && (
                        <>
                          <Link
                            to="/guest/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                              My Bookings
                            </div>
                          </Link>
                          <Link
                            to="/guest/browse"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              Browse Services
                            </div>
                          </Link>
                        </>
                      )}
                      
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Admin Panel
                          </div>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout()
                          setShowUserDropdown(false)
                          navigate('/')
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                      >
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-200"
                >
                  Login 
                </Link>
                {/* <Link
                  to="/vendor/register"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 shadow-md"
                >
                  Register as Vendor
                </Link> */}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-200"
                  onClick={() => !item.hasDropdown && setIsOpen(false)}
                >
                  {item.name}
                </Link>
                {item.hasDropdown && (
                  <div className="pl-4 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Auth Section */}
            <div className="border-t border-gray-200 pt-3 mt-3">
              {user ? (
                <>
                  <div className="px-3 py-2 border-b border-gray-100 mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                        {user.fullName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {user.role === 'vendor' && (
                    <>
                      <Link
                        to="/vendor/dashboard"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        Vendor Dashboard
                      </Link>
                      <Link
                        to="/vendor/bookings"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        My Bookings
                      </Link>
                    </>
                  )}
                  
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                      navigate('/')
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/vendor/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 mx-3 text-center mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Register as Vendor
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

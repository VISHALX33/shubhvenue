import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-slate-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">SV</span>
              </div>
              <h3 className="text-2xl font-bold text-white">ShubhVenue</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner in finding the perfect venue for every occasion. Making event planning simple and stress-free.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-pink-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/#about" className="hover:text-pink-500 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  About Us
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-pink-500 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#featured-venues" className="hover:text-pink-500 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Featured Venues
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="hover:text-pink-500 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Testimonials
                </a>
              </li>
              <li>
                <Link to="/" className="hover:text-pink-500 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 relative">
              Services
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-pink-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/venue-hall/marriage-garden" className="hover:text-pink-500 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Wedding Venues
                </Link>
              </li>
              <li>
                <Link to="/venue-hall/corporate-event" className="hover:text-pink-500 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link to="/venue-hall/party-hall" className="hover:text-pink-500 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Birthday Parties
                </Link>
              </li>
              <li>
                <Link to="/venue-hall/banquet-hall" className="hover:text-pink-500 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Conferences
                </Link>
              </li>
              <li>
                <Link to="/venue-hall/hotel" className="hover:text-pink-500 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Anniversaries
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 relative">
              Contact
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-pink-500"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-pink-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">
                  C-7, Santosh Nagar -1, Borkhera<br />
                  Kota, Rajasthan India
                </span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-pink-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:9358656189" className="text-gray-400 hover:text-pink-500 transition-colors">
                  9358656189
                </a>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-pink-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:synilogicteam@gmail.com" className="text-gray-400 hover:text-pink-500 transition-colors break-all">
                  synilogicteam@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © 2025 ShubhVenue. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">Version 1.0.0</p>
            </div>

            {/* Vendor Buttons */}
            <div className="flex gap-3">
              <Link
                to="/vendor/login"
                className="px-6 py-2.5 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Vendor Login
              </Link>
              <Link
                to="/vendor/register"
                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Vendor Register
              </Link>
            </div>

            {/* Policy Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-pink-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-pink-500 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-400 hover:text-pink-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: '📊',
      path: '/admin/dashboard'
    },
    {
      title: 'Users',
      icon: '👥',
      path: '/admin/users'
    },
    {
      title: 'Vendors',
      icon: '🏪',
      path: '/admin/vendors'
    },
    {
      title: 'Vendor Categories',
      icon: '📂',
      path: '/admin/vendor-categories'
    },
    {
      title: 'Venues',
      icon: '🏛️',
      subItems: [
        { title: 'Marriage Gardens', path: '/admin/venues/marriage-gardens' },
        { title: 'Banquet Halls', path: '/admin/venues/banquet-halls' },
        { title: 'Party Halls', path: '/admin/venues/party-halls' },
        { title: 'Community Halls', path: '/admin/venues/community-halls' },
        { title: 'Resorts', path: '/admin/venues/resorts' },
        { title: 'Farmhouses', path: '/admin/venues/farmhouses' }
      ]
    },
    {
      title: 'Categories',
      icon: '🗂️',
      path: '/admin/categories'
    },
    {
      title: 'Menus',
      icon: '📋',
      path: '/admin/menus'
    },
    {
      title: 'Banner Video',
      icon: '🎥',
      path: '/admin/banner-video'
    },
    {
      title: 'Banners',
      icon: '🖼️',
      path: '/admin/banners'
    },
    {
      title: 'Leads',
      icon: '📞',
      path: '/admin/leads'
    },
    {
      title: 'Bookings',
      icon: '📅',
      path: '/admin/bookings'
    },
    {
      title: 'Payouts',
      icon: '💰',
      path: '/admin/payouts'
    },
    {
      title: 'Reviews',
      icon: '⭐',
      path: '/admin/reviews'
    },
    {
      title: 'Verification',
      icon: '✅',
      path: '/admin/verification'
    },
    {
      title: 'Plans',
      icon: '📦',
      path: '/admin/plans'
    },
    {
      title: 'Subscriptions',
      icon: '🔄',
      path: '/admin/subscriptions'
    },
    {
      title: 'Staff',
      icon: '👔',
      subItems: [
        { title: 'Roles', path: '/admin/staff/roles' },
        { title: 'Staff Members', path: '/admin/staff/members' }
      ]
    },
    {
      title: 'Analytics',
      icon: '📈',
      path: '/admin/analytics'
    },
    {
      title: 'Settings',
      icon: '⚙️',
      subItems: [
        { title: 'Testimonials', path: '/admin/settings/testimonials' },
        { title: 'FAQs', path: '/admin/settings/faqs' },
        { title: 'Email Templates', path: '/admin/settings/email-templates' },
        { title: 'Company', path: '/admin/settings/company' },
        { title: 'Contact Us', path: '/admin/settings/contact' },
        { title: 'Homepage Content', path: '/admin/settings/homepage' },
        { title: 'General Settings', path: '/admin/settings/general' }
      ]
    }
  ];

  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (title) => {
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Toggle */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none mr-4"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link to="/admin/dashboard" className="flex items-center">
                <span className="text-2xl font-bold text-indigo-600">ShubhVenue</span>
                <span className="ml-2 text-sm font-medium text-gray-600">Admin Panel</span>
              </Link>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.fullName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{user?.fullName}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-full bg-white shadow-xl transition-all duration-300 z-40 overflow-y-auto ${
          sidebarOpen ? 'w-64' : 'w-0'
        }`}
      >
        <div className={`${sidebarOpen ? 'block' : 'hidden'} py-4`}>
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{item.icon}</span>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <svg
                        className={`h-4 w-4 transition-transform ${expandedMenus[item.title] ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedMenus[item.title] && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm rounded-lg transition ${
                              isActive(subItem.path)
                                ? 'bg-indigo-100 text-indigo-700 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2.5 rounded-lg transition ${
                      isActive(item.path)
                        ? 'bg-indigo-100 text-indigo-700 font-semibold'
                        : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;

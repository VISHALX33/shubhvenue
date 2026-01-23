import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { title: 'Dashboard', path: '/admin', icon: '📊' },
    { title: 'Users', path: '/admin/users', icon: '👥' },
    { title: 'Vendors', path: '/admin/vendors', icon: '🏪' },
    { title: 'Vendor Categories', path: '/admin/vendor-categories', icon: '📂' },
    { 
      title: 'Venues', 
      icon: '🏛️',
      submenu: [
        { title: 'All Venues', path: '/admin/venues' },
        { title: 'Categories', path: '/admin/venue-categories' }
      ]
    },
    { 
      title: 'Menus', 
      icon: '📋',
      submenu: [
        { title: 'Main Menus', path: '/admin/menus' },
        { title: 'Occasion Special', path: '/admin/occasion-menus' }
      ]
    },
    { title: 'Banner Video', path: '/admin/banner-video', icon: '🎥' },
    { title: 'Banners', path: '/admin/banners', icon: '🖼️' },
    { title: 'Leads', path: '/admin/leads', icon: '📞' },
    { title: 'Bookings', path: '/admin/bookings', icon: '📅' },
    { title: 'Payouts', path: '/admin/payouts', icon: '💰' },
    { title: 'Reviews', path: '/admin/reviews', icon: '⭐' },
    { title: 'Verification', path: '/admin/verification', icon: '✅' },
    { title: 'Plans', path: '/admin/plans', icon: '📦' },
    { title: 'Subscriptions', path: '/admin/subscriptions', icon: '💳' },
    { 
      title: 'Staff', 
      icon: '👔',
      submenu: [
        { title: 'Roles', path: '/admin/roles' },
        { title: 'Staff Members', path: '/admin/staff' }
      ]
    },
    { title: 'Analytics', path: '/admin/analytics', icon: '📈' },
    { 
      title: 'Settings', 
      icon: '⚙️',
      submenu: [
        { title: 'Testimonials', path: '/admin/testimonials' },
        { title: 'FAQs', path: '/admin/faqs' },
        { title: 'Email Templates', path: '/admin/email-templates' },
        { title: 'Company', path: '/admin/company' },
        { title: 'Contact Us', path: '/admin/contact' },
        { title: 'Homepage Content', path: '/admin/homepage-content' },
        { title: 'General Settings', path: '/admin/general-settings' }
      ]
    }
  ];

  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (title) => {
    setExpandedMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-indigo-800">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold">ShubhVenue</h1>
                <p className="text-xs text-indigo-300">Admin Panel</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-indigo-800 rounded"
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-indigo-800 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      {sidebarOpen && <span>{item.title}</span>}
                    </div>
                    {sidebarOpen && (
                      <span>{expandedMenus[item.title] ? '▼' : '▶'}</span>
                    )}
                  </button>
                  {expandedMenus[item.title] && sidebarOpen && (
                    <div className="bg-indigo-950">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`block px-8 py-2 hover:bg-indigo-800 transition text-sm ${
                            location.pathname === subItem.path ? 'bg-indigo-800' : ''
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
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-indigo-800 transition ${
                    location.pathname === item.path ? 'bg-indigo-800' : ''
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-indigo-800">
          {sidebarOpen ? (
            <div>
              <p className="text-sm font-medium">{user?.fullName}</p>
              <p className="text-xs text-indigo-300">{user?.email}</p>
              <button
                onClick={handleLogout}
                className="mt-2 w-full bg-red-600 hover:bg-red-700 py-2 rounded text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full p-2 bg-red-600 hover:bg-red-700 rounded text-xl"
              title="Logout"
            >
              🚪
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.path === location.pathname)?.title || 'Admin Dashboard'}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user?.fullName}</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;

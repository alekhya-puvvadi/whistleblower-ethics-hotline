import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: '📊 Dashboard' },
    { to: '/reports', label: '📋 Reports' },
    { to: '/analytics', label: '📈 Analytics' },
    { to: '/audit-log', label: '📜 Audit Log' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-primary text-white flex flex-col
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-blue-700 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">🔒 Ethics Hotline</h2>
            <p className="text-blue-200 text-sm mt-1">Whistleblower Portal</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-blue-200 hover:text-white"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm transition ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-700'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-700">
          <p className="text-blue-200 text-sm font-medium">{user?.username}</p>
          <p className="text-blue-300 text-xs">{user?.role}</p>
          <button
            onClick={handleLogout}
            className="text-blue-200 hover:text-white text-sm mt-2 flex items-center gap-1"
          >
            Logout →
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden bg-primary text-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white text-xl"
          >
            ☰
          </button>
          <h1 className="font-bold">🔒 Ethics Hotline</h1>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
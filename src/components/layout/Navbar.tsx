import React, { useState } from 'react';
import { Sparkles, Menu, X, LogOut, LogIn, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToSection } from '../../utils/scroll';
import { useAuth } from '../../hooks/useAuth';
import AuthModal from '../auth/AuthModal';

interface NavbarProps {
  onBooking: () => void;
}

export default function Navbar({ onBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Don't show regular nav items on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-violet-600" />
              <span className="text-2xl font-light tracking-tight">GLOW</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Gallery', 'Team', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className="text-gray-600 hover:text-violet-600 transition-colors duration-300 text-sm uppercase tracking-wider"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={onBooking}
                className="bg-violet-600 text-white px-6 py-2 rounded-full text-sm uppercase tracking-wider hover:bg-violet-700 transition-all duration-300 transform hover:scale-105"
              >
                Book Now
              </button>
              {user ? (
                <div className="flex items-center gap-4">
                  {user.email === 'admin@gmail.com' && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors duration-300 text-sm uppercase tracking-wider"
                    >
                      <Settings className="h-4 w-4" />
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors duration-300 text-sm uppercase tracking-wider"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors duration-300 text-sm uppercase tracking-wider"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 inset-x-0 bg-white/80 backdrop-blur-md">
            <div className="px-4 py-6 space-y-4">
              {['Services', 'Gallery', 'Team', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className="block w-full text-left text-gray-600 hover:text-violet-600 transition-colors duration-300 text-sm uppercase tracking-wider"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => {
                  onBooking();
                  setIsOpen(false);
                }}
                className="w-full bg-violet-600 text-white px-6 py-2 rounded-full text-sm uppercase tracking-wider hover:bg-violet-700 transition-all duration-300"
              >
                Book Now
              </button>
              {user ? (
                <>
                  {user.email === 'admin@gmail.com' && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-2 w-full text-gray-600 hover:text-violet-600 transition-colors duration-300 text-sm uppercase tracking-wider"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-gray-600 hover:text-violet-600 transition-colors duration-300 text-sm uppercase tracking-wider"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAuth(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-gray-600 hover:text-violet-600 transition-colors duration-300 text-sm uppercase tracking-wider"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={() => setShowAuth(false)}
      />
    </>
  );
}
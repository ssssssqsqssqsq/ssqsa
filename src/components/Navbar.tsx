import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Home, Server, ShoppingBag, Info, Music } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMusic } from '../context/MusicContext';
import { motion } from 'framer-motion';

interface NavbarProps {
  onToggleMusicPlayer: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleMusicPlayer }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { path: '/', label: 'Accueil', icon: <Home size={18} /> },
    { path: '/servers', label: 'Serveurs', icon: <Server size={18} /> },
    { path: '/shop', label: 'Boutique', icon: <ShoppingBag size={18} /> },
    { path: '/about', label: 'À propos', icon: <Info size={18} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#2D1B4E] shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 mb-4 md:mb-0">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ReloadFrance
            </motion.div>
          </Link>

          {/* Centered Navigation */}
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`text-white hover:text-purple-300 transition-colors flex items-center space-x-2 ${
                  isActive(item.path) ? 'font-bold text-purple-300' : ''
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            
            <button
              onClick={onToggleMusicPlayer}
              className="text-white hover:text-purple-300 transition-colors flex items-center space-x-2"
            >
              <Music size={18} />
              <span>Radio</span>
            </button>
          </div>

          {/* User Profile/Login */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img 
                    src={user?.avatar} 
                    alt={user?.name} 
                    className="w-8 h-8 rounded-full object-cover border-2 border-purple-500" 
                  />
                  <span className="text-white text-sm hidden lg:inline">{user?.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="text-white hover:text-purple-300 transition-colors"
                  aria-label="Se déconnecter"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Connexion Discord
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
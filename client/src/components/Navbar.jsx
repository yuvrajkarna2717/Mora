// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold font-heading bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Mora
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/pricing" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} transition-colors`}>
              Pricing
            </Link>
            <Link to="/login" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} transition-colors`}>
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
              Get Started
            </Link>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

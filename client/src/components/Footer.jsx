// src/components/Footer.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`border-t ${theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} py-12 px-4`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              Mora
            </h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Master your time, maximize your productivity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/pricing" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Pricing</Link></li>
              <li><Link to="/dashboard" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Dashboard</Link></li>
              <li><Link to="/dashboard/comparison" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Analytics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>About</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Blog</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Privacy</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Terms</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Security</a></li>
            </ul>
          </div>
        </div>

        <div className={`pt-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>&copy; 2025 Mora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// src/pages/Login.jsx
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call here
    navigate('/dashboard');
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className={`w-full max-w-md p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-xl`}>
        <h1 className="text-3xl font-bold font-heading text-center mb-8">
          Welcome Back
        </h1>

        <button
          onClick={handleGoogleLogin}
          className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-3 mb-6 ${
            theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          } transition-colors`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div className="relative mb-6">
          <div className={`absolute inset-0 flex items-center`}>
            <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-black'
                } border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-black'
                } border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Sign In
          </button>
        </form>

        <p className={`text-center mt-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

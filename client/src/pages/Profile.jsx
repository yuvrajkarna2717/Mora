// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { User, Mail, Calendar, Clock, Edit2, Save } from 'lucide-react';

const Profile = () => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Yuvraj Karna',
    email: 'yuvraj@example.com',
    createdAt: '2025-09-15',
    lastLogin: '2025-11-19'
  });

  const handleSave = () => {
    // API call here
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading mb-2">Profile</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} mb-6`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                {formData.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{formData.name}</h2>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Pro Member</p>
              </div>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              } transition-colors`}
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-black'
                } border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  !isEditing && 'cursor-not-allowed opacity-60'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-black'
                } border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  !isEditing && 'cursor-not-allowed opacity-60'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Member Since
                </label>
                <input
                  type="text"
                  value={formData.createdAt}
                  disabled
                  className={`w-full px-4 py-3 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-black'
                  } border cursor-not-allowed opacity-60`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Clock className="w-4 h-4 inline mr-2" />
                  Last Login
                </label>
                <input
                  type="text"
                  value={formData.lastLogin}
                  disabled
                  className={`w-full px-4 py-3 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-black'
                  } border cursor-not-allowed opacity-60`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className={`w-full px-4 py-3 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-black'
              } border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
            />
            <input
              type="password"
              placeholder="New Password"
              className={`w-full px-4 py-3 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-black'
              } border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className={`w-full px-4 py-3 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-black'
              } border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
            />
            <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

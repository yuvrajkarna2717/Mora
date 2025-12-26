import { useState } from "react";
import {
  User,
  Mail,
  Calendar,
  Clock,
  Edit2,
  Save,
  Shield,
  Trash2,
  Download,
  Settings,
  TrendingUp,
  Target,
  Award,
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Yuvraj Karna",
    email: "yuvraj@example.com",
    createdAt: "September 15, 2025",
    lastLogin: "November 19, 2025",
  });

  // Mock stats data
  const stats = [
    {
      label: "Days Tracked",
      value: "65",
      icon: Calendar,
      color: "from-blue-400 to-blue-600",
    },
    {
      label: "Hours Analyzed",
      value: "487",
      icon: Clock,
      color: "from-purple-400 to-purple-600",
    },
    {
      label: "Productivity Score",
      value: "78%",
      icon: TrendingUp,
      color: "from-green-400 to-green-600",
    },
    {
      label: "Goals Achieved",
      value: "12",
      icon: Target,
      color: "from-amber-400 to-orange-500",
    },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Add API call here
  };

  const handleExportData = () => {
    // Export data logic
    console.log("Exporting data...");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // Delete account logic
      console.log("Deleting account...");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 pt-30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">
            Profile
          </h1>
          <p className="text-lg text-gray-600">
            Manage your account and track your progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border-2 border-gray-900 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 border-2 border-gray-900`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-black text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-semibold text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-900 shadow-lg mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b-2 border-amber-100">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white text-3xl font-black border-2 border-gray-900 shadow-lg">
                {formData.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  {formData.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Award className="w-4 h-4 text-amber-500" />
                  <p className="text-sm font-semibold text-gray-600">
                    Free Member
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 border-2 border-gray-900 shadow-md hover:shadow-lg ${
                isEditing
                  ? "bg-amber-400 hover:bg-amber-500 text-gray-900"
                  : "bg-gray-900 hover:bg-gray-800 text-amber-50"
              }`}
            >
              {isEditing ? (
                <Save className="w-4 h-4" />
              ) : (
                <Edit2 className="w-4 h-4" />
              )}
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-lg border-2 border-gray-900 font-semibold text-gray-900 focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 outline-none transition-all ${
                  !isEditing
                    ? "bg-gray-100 cursor-not-allowed opacity-60"
                    : "bg-white"
                }`}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-lg border-2 border-gray-900 font-semibold text-gray-900 focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 outline-none transition-all ${
                  !isEditing
                    ? "bg-gray-100 cursor-not-allowed opacity-60"
                    : "bg-white"
                }`}
              />
            </div>

            {/* Member Since & Last Login */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Member Since
                </label>
                <input
                  type="text"
                  value={formData.createdAt}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-900 font-semibold text-gray-900 bg-gray-100 cursor-not-allowed opacity-60"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Last Login
                </label>
                <input
                  type="text"
                  value={formData.lastLogin}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-900 font-semibold text-gray-900 bg-gray-100 cursor-not-allowed opacity-60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Preferences Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-900 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
                <Settings className="w-5 h-5 text-gray-900" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Preferences</h3>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  Email Notifications
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-2 border-gray-900 text-amber-400 focus:ring-2 focus:ring-amber-400"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  Weekly Reports
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-2 border-gray-900 text-amber-400 focus:ring-2 focus:ring-amber-400"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  AI Insights
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-2 border-gray-900 text-amber-400 focus:ring-2 focus:ring-amber-400"
                />
              </label>
            </div>
          </div>

          {/* Privacy Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-900 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
                <Shield className="w-5 h-5 text-gray-900" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Privacy</h3>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  Track Browsing
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-2 border-gray-900 text-amber-400 focus:ring-2 focus:ring-amber-400"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  Anonymous Analytics
                </span>
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-2 border-gray-900 text-amber-400 focus:ring-2 focus:ring-amber-400"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  Share Progress
                </span>
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-2 border-gray-900 text-amber-400 focus:ring-2 focus:ring-amber-400"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-900 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
              <Download className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="text-xl font-black text-gray-900">
              Data Management
            </h3>
          </div>

          <p className="text-gray-600 mb-6 font-medium">
            Export your browsing data or permanently delete your account
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleExportData}
              className="flex-1 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-amber-50 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg border-2 border-gray-900 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export My Data
            </button>
            <button
              onClick={handleDeleteAccount}
              className="flex-1 px-6 py-3 bg-white hover:bg-red-50 text-red-600 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg border-2 border-red-600 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../store/authSlice";
import {
  LogOut,
  BarChart3,
  Sparkles,
  Shield,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Zap,
} from "lucide-react";

const SignIn = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Auto-redirect authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get("redirect") || "/dashboard";
      navigate(redirect);
    }
  }, [isAuthenticated, navigate, searchParams]);

  const handleGoogleSignIn = () => {
    const redirect = searchParams.get("redirect") || "/dashboard";
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google?redirect=${encodeURIComponent(
      redirect
    )}`;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center pt-30 px-6 pb-12">
        <div className="max-w-2xl w-full">
          {/* Welcome Card */}
          <div className="bg-white rounded-2xl p-8 sm:p-12 border-2 border-gray-900 shadow-xl mb-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-amber-400 to-orange-400 rounded-full mb-6 border-2 border-gray-900 shadow-lg">
                <span className="text-4xl">👋</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">
                Welcome back, {user?.name || "Yuvraj"}!
              </h2>
              <p className="text-lg text-gray-600 font-semibold">
                You're all set and ready to track your productivity
              </p>
            </div>

            {/* User Info Card */}
            <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl p-6 mb-8 border-2 border-gray-900">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-linear-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white font-black text-2xl border-2 border-gray-900 shadow-md">
                  {user?.name?.charAt(0).toUpperCase() || "Y"}
                </div>
                <div>
                  <p className="text-xl font-black text-gray-900">
                    {user?.name || "Yuvraj Karna"}
                  </p>
                  <p className="text-sm font-semibold text-gray-600">
                    {user?.email || "yuvraj@mora.app"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Verified Account</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Privacy Protected</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="group relative w-full flex items-center justify-center gap-3 py-4 px-6 bg-linear-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-gray-900 rounded-xl font-black text-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-900 hover:scale-105"
              >
                <BarChart3 className="w-5 h-5" />
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleLogout}
                className="group relative w-full flex items-center justify-center gap-3 py-4 px-6 bg-white hover:bg-red-50 text-gray-900 hover:text-red-600 rounded-xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg border-2 border-gray-900"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border-2 border-gray-900 shadow-lg text-center">
              <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-600">Ready to Track</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-gray-900 shadow-lg text-center">
              <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-600">Boost Focus</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-gray-900 shadow-lg text-center">
              <Sparkles className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-600">AI Insights</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center mt-20 px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Main Sign In Card */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border-2 border-gray-900 shadow-xl mb-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-amber-400 to-orange-400 rounded-full mb-6 border-2 border-gray-900 shadow-lg">
              <span className="text-4xl">📊</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">
              Sign in to Mora
            </h2>
            <p className="text-lg text-gray-600 font-semibold max-w-md mx-auto">
              Track your browsing habits, boost productivity, and transform your
              digital life
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-linear-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-gray-900 text-center">
              <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center mx-auto mb-3 border-2 border-gray-900">
                <CheckCircle className="w-5 h-5 text-gray-900" />
              </div>
              <p className="text-sm font-black text-gray-900">Free Forever</p>
              <p className="text-xs text-gray-600 font-semibold">
                No credit card
              </p>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-gray-900 text-center">
              <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center mx-auto mb-3 border-2 border-gray-900">
                <Shield className="w-5 h-5 text-gray-900" />
              </div>
              <p className="text-sm font-black text-gray-900">Privacy First</p>
              <p className="text-xs text-gray-600 font-semibold">
                Your data secured
              </p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-gray-900 text-center">
              <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center mx-auto mb-3 border-2 border-gray-900">
                <Zap className="w-5 h-5 text-gray-900" />
              </div>
              <p className="text-sm font-black text-gray-900">AI Powered</p>
              <p className="text-xs text-gray-600 font-semibold">
                Smart insights
              </p>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="group relative w-full flex items-center justify-center gap-3 py-4 px-6 bg-linear-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-gray-900 rounded-xl font-black text-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-900 hover:scale-105"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-xs text-center text-gray-600 mt-6 font-semibold">
            By signing in, you agree to our{" "}
            <a
              href="/terms"
              className="text-amber-600 hover:text-amber-700 font-bold underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy-policy"
              className="text-amber-600 hover:text-amber-700 font-bold underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-linear-to-br from-amber-400 via-orange-400 to-amber-500 rounded-2xl p-6 border-2 border-gray-900 shadow-xl">
          <h3 className="text-xl font-black text-gray-900 mb-4 text-center">
            What you'll get with Mora
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/90 p-3 rounded-lg border-2 border-gray-900">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <span className="text-sm font-bold text-gray-900">
                Automatic browsing tracking & insights
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/90 p-3 rounded-lg border-2 border-gray-900">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <span className="text-sm font-bold text-gray-900">
                AI-powered productivity recommendations
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/90 p-3 rounded-lg border-2 border-gray-900">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <span className="text-sm font-bold text-gray-900">
                Beautiful analytics dashboard
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/90 p-3 rounded-lg border-2 border-gray-900">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <span className="text-sm font-bold text-gray-900">
                Export your data anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

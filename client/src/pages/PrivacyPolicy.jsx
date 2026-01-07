import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPrivacyPolicyAccepted } from "../store/authSlice";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  Check,
  ArrowRight,
} from "lucide-react";

const PrivacyPolicy = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { privacyPolicyAccepted,isAuthenticated } = useSelector((state) => state.auth);

  const handleAgree = async () => {
    if (!agreed) return;

    try {
      const token = localStorage.getItem("token");
      await fetch("/api/privacy/accept", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(setPrivacyPolicyAccepted(true));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error accepting privacy policy:", error);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 py-30">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-400 rounded-2xl mb-6 border-2 border-gray-900 shadow-lg">
            <Shield className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy matters to us. Here's how we protect and use your data.
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-6 mb-12">
          {/* Information We Collect */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-900 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center border-2 border-gray-900">
                <Database className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Information We Collect
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect browsing data to provide you with insights about
                  your web usage patterns. This includes:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Websites you visit and time spent on each site</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>
                      Basic account information (name, email from Google)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Usage statistics and browsing patterns</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-900 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center border-2 border-gray-900">
                <Eye className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  How We Use Your Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your data is used to generate personalized productivity
                  insights and recommendations:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>AI-powered analysis of your browsing habits</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Personalized focus recommendations</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Productivity reports and statistics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-900 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center border-2 border-gray-900">
                <Lock className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Data Security
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate security measures to protect your
                  personal information:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>End-to-end encryption for data transmission</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Secure storage with industry-standard practices</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>You can export or delete your data anytime</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-900 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center border-2 border-gray-900">
                <Shield className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Your Rights
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have full control over your data:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Access and download your data anytime</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Request deletion of your account and data</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Opt-out of data collection at any time</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-900 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center border-2 border-gray-900">
                <Mail className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Contact Us
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have questions about this privacy policy, please contact us at{" "}
                  <a
                    href="mailto:yuvrajkarna.code@gmail.com"
                    className="text-amber-600 hover:text-amber-700 font-semibold underline"
                  >
                    yuvrajkarna.code@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agreement Section */}
        {privacyPolicyAccepted ? (
          <div className="bg-linear-to-br from-green-400 to-emerald-400 rounded-2xl p-8 border-2 border-gray-900 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <Check className="w-8 h-8 text-gray-900" />
              <span className="text-xl font-bold text-gray-900">
                You have already accepted the Privacy Policy
              </span>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 border-2 border-gray-900 shadow-lg bg-gray-900 hover:bg-gray-800 text-green-50 hover:shadow-xl hover:scale-105 cursor-pointer"
            >
              Continue to Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          isAuthenticated && (
            <div className="bg-linear-to-br from-amber-400 to-orange-400 rounded-2xl p-8 border-2 border-gray-900 shadow-xl">
              <label className="flex items-start gap-4 mb-6 cursor-pointer group">
                <div className="shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-6 h-6 rounded border-2 border-gray-900 text-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer"
                  />
                </div>
                <span className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                  I have read and agree to the Privacy Policy and understand how
                  my data will be used
                </span>
              </label>

              <button
                onClick={handleAgree}
                disabled={!agreed}
                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 border-2 border-gray-900 shadow-lg ${
                  agreed
                    ? "bg-gray-900 hover:bg-gray-800 text-amber-50 hover:shadow-xl hover:scale-105 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                }`}
              >
                Continue to Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>

              {!agreed && (
                <p className="text-sm text-gray-800 mt-3 font-medium">
                  Please read and accept the privacy policy to continue
                </p>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;

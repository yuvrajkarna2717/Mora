// src/pages/Billing.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { CreditCard, Download, CheckCircle } from "lucide-react";

const Billing = () => {
  const { theme } = useTheme();
  const currentPlan = "Pro"; // or 'Free'

  const handleUpgrade = () => {
    // Stripe checkout integration
    window.location.href = `${
      import.meta.env.VITE_API_URL
    }/billing/create-checkout`;
  };

  const handleCancel = () => {
    // Cancel subscription
    console.log("Canceling subscription");
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading mb-2">
            Billing & Subscription
          </h1>
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
            Manage your subscription and billing information
          </p>
        </div>

        {/* Current Plan */}
        <div
          className={`p-8 rounded-xl ${
            theme === "dark"
              ? "bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-gray-700"
              : "bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200"
          } mb-6`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Current Plan: {currentPlan}
              </h2>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
              >
                {currentPlan === "Pro"
                  ? "USD 2.00/month • Next billing: December 19, 2025"
                  : "Limited to today's data only"}
              </p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          {currentPlan === "Free" ? (
            <button
              onClick={handleUpgrade}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
            >
              Upgrade to Pro
            </button>
          ) : (
            <button
              onClick={handleCancel}
              className={`w-full py-3 font-semibold rounded-lg transition-all \${
                theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'
              }`}
            >
              Cancel Subscription
            </button>
          )}
        </div>

        {/* Usage Limits */}
        <div
          className={`p-6 rounded-xl ${
            theme === "dark"
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          } mb-6`}
        >
          <h3 className="text-xl font-semibold mb-4">Usage & Limits</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Data History</span>
                <span className="font-semibold">
                  {currentPlan === "Pro" ? "Unlimited" : "Today Only"}
                </span>
              </div>
              <div
                className={`w-full h-2 rounded-full ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{ width: currentPlan === "Pro" ? "100%" : "10%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>AI Insights</span>
                <span className="font-semibold">
                  {currentPlan === "Pro" ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div
                className={`w-full h-2 rounded-full ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                  style={{ width: currentPlan === "Pro" ? "100%" : "0%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Export Formats</span>
                <span className="font-semibold">
                  {currentPlan === "Pro" ? "4 Formats" : "1 Format"}
                </span>
              </div>
              <div
                className={`w-full h-2 rounded-full ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600"
                  style={{ width: currentPlan === "Pro" ? "100%" : "25%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        {currentPlan === "Pro" && (
          <div
            className={`p-6 rounded-xl ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            } mb-6`}
          >
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5" />
              <h3 className="text-xl font-semibold">Payment Method</h3>
            </div>
            <div
              className={`p-4 rounded-lg flex items-center justify-between ${
                theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-8 rounded ${
                    theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                  } flex items-center justify-center`}
                >
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Expires 12/2027
                  </p>
                </div>
              </div>
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  theme === "dark"
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors`}
              >
                Update
              </button>
            </div>
          </div>
        )}

        {/* Billing History */}
        {currentPlan === "Pro" && (
          <div
            className={`p-6 rounded-xl ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Billing History</h3>
            <div className="space-y-3">
              {[
                {
                  date: "2025-11-19",
                  amount: "2.00",
                  status: "Paid",
                  invoice: "INV-2025-11",
                },
                {
                  date: "2025-10-19",
                  amount: "2.00",
                  status: "Paid",
                  invoice: "INV-2025-10",
                },
                {
                  date: "2025-09-19",
                  amount: "2.00",
                  status: "Paid",
                  invoice: "INV-2025-09",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg flex items-center justify-between ${
                    theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <div>
                    <p className="font-medium">{item.invoice}</p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.date} • USD {item.amount}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-medium">
                      {item.status}
                    </span>
                    <button
                      className={`p-2 rounded-lg ${
                        theme === "dark"
                          ? "hover:bg-gray-600"
                          : "hover:bg-gray-200"
                      } transition-colors`}
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;

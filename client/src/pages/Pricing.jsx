// src/pages/Pricing.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const Pricing = () => {
  const { theme } = useTheme();

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      features: [
        "Today's data only",
        "Basic time tracking",
        "Simple analytics",
        "Browser extension",
      ],
      cta: "Get Started",
      link: "/signup",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "2",
      period: "month",
      yearlyPrice: "20",
      features: [
        "Unlimited history",
        "AI-powered insights",
        "Advanced analytics",
        "Weekly & monthly reports",
        "Comparison tools",
        "Export data (PDF, Excel, CSV)",
        "Priority support",
        "Category breakdown",
      ],
      cta: "Upgrade to Pro",
      link: "/billing",
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6">
            Simple, Transparent Pricing
          </h1>
          <p
            className={`text-xl ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl ${
                plan.highlighted
                  ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white transform scale-105"
                  : theme === "dark"
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              } hover:shadow-2xl transition-all`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">${plan.price}</span>
                <span
                  className={`text-lg ${
                    plan.highlighted
                      ? "text-white/80"
                      : theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  /{plan.period}
                </span>
                {plan.yearlyPrice && (
                  <p
                    className={`text-sm mt-2 ${
                      plan.highlighted
                        ? "text-white/80"
                        : theme === "dark"
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    or ${plan.yearlyPrice}/year (save 17%)
                  </p>
                )}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check
                      className={`w-5 h-5 mr-3 flex-shrink-0 ${
                        plan.highlighted ? "text-white" : "text-green-500"
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={plan.link}
                className={`block w-full py-3 text-center font-semibold rounded-lg transition-all ${
                  plan.highlighted
                    ? "bg-white text-purple-600 hover:bg-gray-100"
                    : theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;

// src/pages/Landing.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { BarChart3, Clock, TrendingUp, Zap } from 'lucide-react';

const Landing = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: <Clock className="w-12 h-12 text-blue-500" />,
      title: 'Time Tracking',
      description: 'Automatically track your time spent on websites and apps'
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-purple-500" />,
      title: 'Smart Analytics',
      description: 'Get detailed insights into your productivity patterns'
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-500" />,
      title: 'AI Insights',
      description: 'Receive personalized recommendations to boost productivity'
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: 'Real-time Data',
      description: 'View your productivity metrics in real-time'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Master Your Time,
            <br />
            Maximize Your Productivity
          </h1>
          <p className={`text-xl md:text-2xl mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Mora helps you understand where your time goes and how to make every moment count with AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Get Started Free
            </Link>
            <Link
              to="/pricing"
              className={`px-8 py-4 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} text-lg font-semibold rounded-lg transition-all`}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-center mb-16">
            Everything You Need to Stay Productive
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:shadow-xl transition-all hover:scale-105`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-center mb-16">
            How Mora Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Install Extension', desc: 'Add Mora to your browser in seconds' },
              { step: '02', title: 'Track Automatically', desc: 'Let Mora monitor your activity in the background' },
              { step: '03', title: 'Get Insights', desc: 'Receive AI-powered recommendations to improve' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className={`max-w-4xl mx-auto text-center p-12 rounded-3xl ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50' : 'bg-gradient-to-r from-blue-50 to-purple-50'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className="text-4xl font-bold font-heading mb-6">
            Ready to Transform Your Productivity?
          </h2>
          <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Join thousands of users who are already mastering their time with Mora
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start Free Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;

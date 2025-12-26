import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Brain,
  LineChart,
  Lock,
  Sparkles,
  BarChart3,
  Target,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-amber-50 text-gray-900 font-sans antialiased">
      {/* Hero Section */}
      <section className="bg-amber-50 px-6 py-32 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-6xl mx-auto text-center mt-16">
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-4 py-2 rounded-full">
              Mora in action
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight">
            Transform your digital habits
            <br />
            <span className="relative inline-block mt-2">
              into productivity wins
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 400 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C80 3 160 2 240 6C320 10 380 8 398 7"
                  stroke="#34D399"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Mora delivers AI-powered insights to help you understand where your
            time goes, eliminate distractions, and make smarter decisions about
            your online focus.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-xl text-lg font-bold transition-all duration-300 shadow-md hover:shadow-xl min-w-[240px]"
            >
              Get Mora →
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-xl text-lg font-bold transition-all duration-300 hover:bg-gray-900 hover:text-amber-50 min-w-[240px]"
            >
              See How It Works
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-medium">
                Pay once, use forever
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-medium">
                1-minute no-code setup
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-medium">
                Privacy-first tracking
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-gradient-to-br from-amber-900 to-amber-800 py-24 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-amber-50 mb-8">
            97% of people don't know
            <br />
            where their time goes
          </h2>
          <p className="text-lg sm:text-xl text-amber-100 mb-16 max-w-3xl mx-auto leading-relaxed">
            Hours spent browsing, switching tabs, and getting distracted.
            Productivity suffers, goals slip away, and you never get that time
            back.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="text-6xl mb-4">😳</div>
              <h3 className="text-xl font-bold text-amber-50 mb-2">
                You're browsing mindlessly
              </h3>
              <p className="text-amber-200">
                Hours disappear without realizing it
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-6xl mb-4">😬</div>
              <h3 className="text-xl font-bold text-amber-50 mb-2">
                You can't pinpoint the problem
              </h3>
              <p className="text-amber-200">No data means no way to improve</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-6xl mb-4">😤</div>
              <h3 className="text-xl font-bold text-amber-50 mb-2">
                Productivity keeps slipping
              </h3>
              <p className="text-amber-200">
                Goals remain out of reach, frustration builds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-amber-50 py-24 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Give yourself a reason
              <br />
              to focus today,{" "}
              <span className="bg-amber-900 text-amber-50 px-4 py-1">
                not tomorrow
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Mora delivers effective insights to remind you of your goals and
              drive you to take action on your digital wellness.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center text-2xl">
                    ✍️
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Track Effortlessly
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Automatically monitor which websites you visit and for how
                    long. No complex setup required—just install and start
                    gaining insights immediately.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center text-2xl">
                    🔗
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Get AI-Powered Insights
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Transform raw browsing data into personalized
                    recommendations. Identify your biggest distractions and
                    receive actionable advice on optimizing your focus.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center text-2xl">
                    🤑
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Reclaim Your Time
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    See exactly where your time goes each day. Make informed
                    decisions about limiting distracting websites and building
                    healthier digital habits.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-md aspect-[4/5] bg-gradient-to-br from-amber-200 to-amber-300 rounded-3xl shadow-2xl border-4 border-gray-900 flex items-center justify-center p-8">
                <div className="bg-white rounded-2xl p-6 w-full shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-400 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-32 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl"></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-20 bg-gray-100 rounded-lg"></div>
                      <div className="h-20 bg-gray-100 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-white py-24 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Use cases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              There are millions of ways to improve your focus and drive action.
              Here are examples of how Mora helps:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-amber-50 p-8 rounded-2xl border-2 border-gray-900 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-3xl">
                  💪
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Habit Tracker
                  </h3>
                  <p className="text-sm text-gray-600">Build consistency</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Remind yourself of the pain of not sticking to your productive
                habits and stay on track with your goals.
              </p>
            </div>

            <div className="bg-amber-50 p-8 rounded-2xl border-2 border-gray-900 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-3xl">
                  📊
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Analytics Tool
                  </h3>
                  <p className="text-sm text-gray-600">Track progress</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Express the impact of wasted time on your productivity and get
                data-driven insights to improve.
              </p>
            </div>

            <div className="bg-amber-50 p-8 rounded-2xl border-2 border-gray-900 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-3xl">
                  🎯
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Focus Reminder
                  </h3>
                  <p className="text-sm text-gray-600">Stay intentional</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Get gentle nudges when you're spending too much time on
                distracting sites and refocus on what matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-amber-50 py-24 px-6 sm:px-8 md:px-12 lg:px-16 border-t-2 border-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Unlock Your Potential with Mora
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Mora is designed to empower you with clarity and control over your
            digital life.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-900 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-amber-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Transform raw browsing data into actionable recommendations for
                better productivity and focus.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-900 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-amber-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Effortless Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically monitor which websites you visit and for how long,
                with no complex setup required.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-900 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-amber-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Privacy First
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is handled with transparency and security, giving you
                full control over your information.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-900 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-amber-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Goal-Oriented
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Set focus goals and get personalized strategies to help you stay
                on track and achieve them.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-900 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-amber-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <LineChart className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Detailed Statistics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                View comprehensive reports on your browsing patterns and track
                your progress over time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-900 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-amber-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Simple Setup
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sign in with Google and start tracking immediately. No credit
                card required, completely free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-24 px-6 sm:px-8 md:px-12 lg:px-16 border-t-2 border-gray-900">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Understand Your Digital World, Make Better Decisions
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Mora turns the often overwhelming task of digital wellness into a
              simple, data-driven process. See exactly where your time goes,
              identify distractions, and get friendly, non-judgmental advice on
              how to optimize your browsing habits for better focus.
            </p>
            <ul className="space-y-4 inline-block lg:block">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg text-gray-700">
                  Personalized suggestions to limit distracting websites
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg text-gray-700">
                  Tools and strategies to help you stay focused
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg text-gray-700">
                  Simple Google sign-in for instant access
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg text-gray-700">
                  Export your data anytime, full transparency
                </span>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md aspect-video bg-gradient-to-br from-amber-200 via-amber-300 to-orange-300 rounded-3xl shadow-2xl border-4 border-gray-900 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-900 text-xl font-bold">
                  Product Screenshot
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  Dashboard & Analytics View
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-amber-50 py-20 px-6 sm:px-8 md:px-12 lg:px-16 border-t-2 border-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-12">
            Join Thousands Taking Control of Their Digital Lives
          </h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex -space-x-3 overflow-hidden">
              <img
                className="inline-block h-12 w-12 rounded-full ring-4 ring-amber-50 border-2 border-gray-900"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba65f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User 1"
              />
              <img
                className="inline-block h-12 w-12 rounded-full ring-4 ring-amber-50 border-2 border-gray-900"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User 2"
              />
              <img
                className="inline-block h-12 w-12 rounded-full ring-4 ring-amber-50 border-2 border-gray-900"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User 3"
              />
              <img
                className="inline-block h-12 w-12 rounded-full ring-4 ring-amber-50 border-2 border-gray-900"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User 4"
              />
            </div>
            <div className="text-left">
              <div className="text-amber-500 text-lg font-bold">★★★★★</div>
              <span className="text-gray-700 text-sm font-semibold">
                4.9/5 from 12,500+ users
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 py-24 px-6 sm:px-8 md:px-12 lg:px-16 text-center border-t-4 border-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Ready to Reclaim Your Focus?
          </h2>
          <p className="text-xl text-gray-800 mb-12 max-w-3xl mx-auto font-medium">
            Join thousands of users who are transforming their digital habits
            with Mora's powerful insights. It's free, fast, and effective.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-12 py-5 bg-gray-900 hover:bg-gray-800 text-amber-50 rounded-xl text-xl font-bold transition-all duration-300 shadow-2xl hover:shadow-xl hover:scale-105"
          >
            Get Started with Mora - It's Free!
            <ArrowRight className="w-6 h-6 ml-3" />
          </Link>
          <p className="text-gray-800 text-sm mt-6 font-medium">
            No credit card required • Sign in with Google • Start in 60 seconds
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

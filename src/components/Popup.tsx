// Main popup component for the Chrome extension
import React, { useState } from 'react';
import { Clock, Target, Settings, BarChart3, Play, Square } from 'lucide-react';
import { useStorage, useFocusMode } from '../hooks/useStorage';
import { formatTime, getTimeGreeting, isToday } from '../utils/time';
import { getCategoryForDomain, calculateProductivityScore } from '../utils/categories';

export default function Popup() {
  const { data, loading } = useStorage();
  const { focusMode, startFocusMode, stopFocusMode } = useFocusMode();
  const [showFocusSetup, setShowFocusSetup] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);

  // Calculate today's stats
  const todayStats = React.useMemo(() => {
    if (!data?.sites) return { totalTime: 0, topSites: [], productivityScore: 0 };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySites = Object.entries(data.sites)
      .filter(([_, siteData]) => isToday(siteData.lastVisit))
      .map(([domain, siteData]) => ({
        domain,
        time: siteData.timeSpent,
        category: getCategoryForDomain(domain)
      }))
      .sort((a, b) => b.time - a.time)
      .slice(0, 5);

    const totalTime = todaySites.reduce((sum, site) => sum + site.time, 0);
    const siteTimeMap = Object.fromEntries(todaySites.map(site => [site.domain, site.time]));
    const productivityScore = calculateProductivityScore(siteTimeMap);

    return {
      totalTime,
      topSites: todaySites.map(site => ({
        ...site,
        percentage: totalTime > 0 ? Math.round((site.time / totalTime) * 100) : 0
      })),
      productivityScore
    };
  }, [data?.sites]);

  const handleStartFocus = async () => {
    const defaultBlocked = data?.settings.focusMode.defaultBlockedSites || [];
    await startFocusMode(focusDuration, defaultBlocked);
    setShowFocusSetup(false);
  };

  const handleStopFocus = async () => {
    await stopFocusMode();
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">🌿 Mora</h1>
            <p className="text-sm opacity-90">{getTimeGreeting()}</p>
          </div>
          <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={18} className="text-blue-600" />
          <h2 className="font-semibold">Today's Activity</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {formatTime(todayStats.totalTime)}
            </div>
            <div className="text-sm text-gray-600">Total Time</div>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {todayStats.productivityScore}%
            </div>
            <div className="text-sm text-gray-600">Productive</div>
          </div>
        </div>

        {/* Top Sites */}
        {todayStats.topSites.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Top Sites</h3>
            <div className="space-y-2">
              {todayStats.topSites.slice(0, 3).map((site) => (
                <div key={site.domain} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{site.domain}</div>
                    <div className="text-xs text-gray-500">{formatTime(site.time)}</div>
                  </div>
                  <div className="text-sm text-gray-400">{site.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Focus Mode */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-3">
          <Target size={18} className="text-purple-600" />
          <h2 className="font-semibold">Focus Mode</h2>
        </div>

        {focusMode?.isActive ? (
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-700">Focus Active</span>
              <div className="flex items-center gap-1 text-purple-600">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                <span className="text-xs">ON</span>
              </div>
            </div>
            
            {focusMode.endTime && (
              <div className="text-xs text-purple-600 mb-3">
                Ends in {formatTime(focusMode.endTime - Date.now())}
              </div>
            )}
            
            <button
              onClick={handleStopFocus}
              className="w-full bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Square size={16} />
              Stop Focus
            </button>
          </div>
        ) : (
          <div>
            {showFocusSetup ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <select
                    value={focusDuration}
                    onChange={(e) => setFocusDuration(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={25}>25 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                  </select>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowFocusSetup(false)}
                    className="flex-1 py-2 px-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStartFocus}
                    className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                  >
                    Start
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowFocusSetup(true)}
                className="w-full bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Play size={16} />
                Start Focus Session
              </button>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 size={20} className="text-gray-600" />
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings size={20} className="text-gray-600" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BarChart3, Filter, Brain, Loader } from 'lucide-react';

const ExtensionDashboard = () => {
  const [extensionData, setExtensionData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    fetchExtensionData();
  }, []);

  const fetchExtensionData = async () => {
    try {
      console.log('Fetching extension data...');
      
      // Try to get data from extension with retry logic
      const response = await new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 3;
        
        const handleMessage = (event) => {
          if (event.data.type === 'EXTENSION_DATA_RESPONSE') {
            console.log('Received extension data:', event.data);
            window.removeEventListener('message', handleMessage);
            resolve(event.data);
          }
        };
        
        const tryFetch = () => {
          attempts++;
          console.log(`Attempt ${attempts} to fetch extension data`);
          
          window.addEventListener('message', handleMessage);
          window.postMessage({ type: 'GET_EXTENSION_DATA' }, '*');
          
          setTimeout(() => {
            window.removeEventListener('message', handleMessage);
            
            if (attempts < maxAttempts) {
              console.log(`Attempt ${attempts} failed, retrying...`);
              setTimeout(tryFetch, 500);
            } else {
              console.log('All attempts failed, using sample data');
              resolve({
                data: {
                  "Thu Dec 25 2025": {
                    "github.com": 3600000,
                    "stackoverflow.com": 1800000,
                    "chatgpt.com": 900000
                  },
                  "Wed Dec 24 2025": {
                    "youtube.com": 2700000,
                    "docs.google.com": 1200000,
                    "linkedin.com": 600000
                  }
                }
              });
            }
          }, 1000);
        };
        
        tryFetch();
      });
      
      if (response.data && Object.keys(response.data).length > 0) {
        console.log('Setting extension data:', response.data);
        setExtensionData(response.data);
        const dates = Object.keys(response.data).sort((a, b) => new Date(b) - new Date(a));
        setAvailableDates(dates);
        if (dates.length > 0) {
          setSelectedDate(dates[0]);
        }
        console.log('Extension data loaded:', Object.keys(response.data).length, 'dates');
      } else {
        console.log('No extension data received, keeping current state');
      }
    } catch (error) {
      console.error('Failed to fetch extension data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const selectedDateData = selectedDate ? extensionData[selectedDate] || {} : {};
  const sortedDomains = Object.entries(selectedDateData)
    .filter(([domain]) => domain && domain !== 'null' && domain !== 'newtab' && domain !== '')
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  const totalTime = Object.values(selectedDateData).reduce((sum, time) => sum + time, 0);

  const getAIInsights = async () => {
    if (!selectedDate || !selectedDateData || Object.keys(selectedDateData).length === 0) return;
    
    setLoadingInsights(true);
    try {
      // Try to get auth token from extension first, then localStorage
      let authToken = localStorage.getItem('authToken');
      
      if (!authToken) {
        const authResponse = await new Promise((resolve) => {
          const handleMessage = (event) => {
            if (event.data.type === 'EXTENSION_AUTH_RESPONSE') {
              window.removeEventListener('message', handleMessage);
              resolve(event.data);
            }
          };
          
          window.addEventListener('message', handleMessage);
          window.postMessage({ type: 'GET_EXTENSION_AUTH' }, '*');
          
          setTimeout(() => {
            window.removeEventListener('message', handleMessage);
            resolve({ token: null });
          }, 1000);
        });
        
        authToken = authResponse.token;
      }
      
      if (!authToken) {
        console.error('No auth token available');
        return;
      }
      
      const response = await fetch('http://localhost:3001/api/insights/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          date: selectedDate,
          data: selectedDateData
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setInsights(data);
      } else {
        console.error('Failed to get insights:', response.status);
      }
    } catch (error) {
      console.error('Failed to get AI insights:', error);
    } finally {
      setLoadingInsights(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Date</option>
              {availableDates.map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
        </div>

        {!selectedDate ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Select a date to view data</h2>
            <p className="text-gray-500">Choose from {availableDates.length} available dates</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Total Time</p>
                    <p className="text-2xl font-bold">{formatTime(totalTime)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Websites Visited</p>
                    <p className="text-2xl font-bold">{Object.keys(selectedDateData).length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Selected Date</p>
                      <p className="text-lg font-semibold">{selectedDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={getAIInsights}
                    disabled={loadingInsights}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  >
                    {loadingInsights ? <Loader className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
                    AI Insights
                  </button>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            {insights && (
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <h2 className="text-xl font-semibold">AI Insights for {insights.date}</h2>
                </div>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700">{insights.insights}</div>
                </div>
              </div>
            )}

            {/* Top Websites */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-6">Top Websites</h2>
              
              {sortedDomains.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No data available for this date</p>
              ) : (
                <div className="space-y-4">
                  {sortedDomains.map(([domain, time], index) => {
                    const percentage = (time / totalTime) * 100;
                    return (
                      <div key={domain} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{domain}</span>
                            <span className="text-sm text-gray-500">{formatTime(time)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {percentage.toFixed(1)}% of total time
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtensionDashboard;
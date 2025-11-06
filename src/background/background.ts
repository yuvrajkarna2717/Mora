// Background script for Chrome extension - handles time tracking and focus mode
import { getStorageData, saveStorageData, updateSiteData } from '../utils/storage';
import type { Session } from '../types';

// Track current active tab and timing
let currentTab: chrome.tabs.Tab | null = null;
let startTime: number = Date.now();
let isIdle: boolean = false;
let currentSession: Session | null = null;

/**
 * Initialize background script
 */
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Mora extension installed');
  
  // Set up idle detection (5 minutes default)
  chrome.idle.setDetectionInterval(300); // 5 minutes
  
  // Create initial session
  await startNewSession();
  
  // Get current active tab on startup
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]) {
      currentTab = tabs[0];
      startTime = Date.now();
    }
  } catch (error) {
    console.error('Error getting initial tab:', error);
  }
});

/**
 * Start a new tracking session
 */
async function startNewSession(): Promise<void> {
  const sessionId = `session_${Date.now()}`;
  currentSession = {
    id: sessionId,
    startTime: Date.now(),
    sites: {},
    totalTime: 0
  };
}

/**
 * End current session and save to storage
 */
async function endCurrentSession(): Promise<void> {
  if (!currentSession) return;
  
  currentSession.endTime = Date.now();
  currentSession.totalTime = currentSession.endTime - currentSession.startTime;
  
  const data = await getStorageData();
  data.sessions.push(currentSession);
  
  // Keep only last 30 days of sessions
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
  data.sessions = data.sessions.filter(session => session.startTime > thirtyDaysAgo);
  
  await saveStorageData({ sessions: data.sessions });
  currentSession = null;
}

/**
 * Track time spent on current tab
 */
async function trackCurrentTab(): Promise<void> {
  if (!currentTab || isIdle || !currentSession) return;
  
  const now = Date.now();
  const timeSpent = now - startTime;
  
  // Only track if spent more than 1 second on the tab
  if (timeSpent < 1000) return;
  
  try {
    const url = new URL(currentTab.url || '');
    const domain = url.hostname;
    
    // Skip chrome:// and extension pages
    if (domain.startsWith('chrome') || url.protocol === 'chrome-extension:') {
      return;
    }
    
    // Update site data
    await updateSiteData(domain, timeSpent);
    
    // Update current session
    currentSession.sites[domain] = (currentSession.sites[domain] || 0) + timeSpent;
    
    console.log(`Tracked ${timeSpent}ms on ${domain}`);
  } catch (error) {
    console.error('Error tracking tab:', error);
  }
}

/**
 * Handle tab activation (user switches tabs)
 */
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  // Track time on previous tab
  await trackCurrentTab();
  
  // Get new active tab
  try {
    currentTab = await chrome.tabs.get(activeInfo.tabId);
    startTime = Date.now();
  } catch (error) {
    console.error('Error getting active tab:', error);
    currentTab = null;
  }
});

/**
 * Handle tab updates (URL changes)
 */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Only handle URL changes on the active tab
  if (changeInfo.url && currentTab && tabId === currentTab.id) {
    // Track time on previous URL
    await trackCurrentTab();
    
    // Update current tab and reset timer
    currentTab = tab;
    startTime = Date.now();
  }
});

/**
 * Handle window focus changes
 */
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // Browser lost focus - track current tab and mark as idle
    await trackCurrentTab();
    isIdle = true;
  } else {
    // Browser gained focus - resume tracking
    isIdle = false;
    startTime = Date.now();
  }
});

/**
 * Handle idle state changes
 */
chrome.idle.onStateChanged.addListener(async (newState) => {
  if (newState === 'idle' || newState === 'locked') {
    // User went idle - track current tab
    await trackCurrentTab();
    isIdle = true;
  } else if (newState === 'active') {
    // User became active - resume tracking
    isIdle = false;
    startTime = Date.now();
  }
});

/**
 * Handle focus mode blocking
 */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, _tab) => {
  if (changeInfo.url) {
    const data = await getStorageData();
    
    // Check if focus mode is active
    if (data.focusMode.isActive) {
      try {
        const url = new URL(changeInfo.url);
        const domain = url.hostname.replace(/^www\./, '');
        
        // Check if site is blocked
        if (data.focusMode.blockedSites.includes(domain)) {
          // Redirect to focus mode page
          chrome.tabs.update(tabId, {
            url: chrome.runtime.getURL('focus-blocked.html')
          });
        }
      } catch (error) {
        console.error('Error checking focus mode:', error);
      }
    }
  }
});

/**
 * Periodic cleanup and session management
 */
chrome.alarms.create('cleanup', { periodInMinutes: 1 }); // Every minute for better accuracy

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'cleanup') {
    // Track current tab periodically
    await trackCurrentTab();
    
    // Reset timer for continuous tracking
    startTime = Date.now();
    
    // Start new session every 4 hours
    if (currentSession && Date.now() - currentSession.startTime > 4 * 60 * 60 * 1000) {
      await endCurrentSession();
      await startNewSession();
    }
  }
});

/**
 * Handle extension messages from popup/content scripts
 */
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  switch (request.action) {
    case 'getCurrentTab':
      sendResponse({ tab: currentTab, isIdle });
      break;
      
    case 'startFocusMode':
      handleStartFocusMode(request.data);
      sendResponse({ success: true });
      break;
      
    case 'stopFocusMode':
      handleStopFocusMode();
      sendResponse({ success: true });
      break;
      
    default:
      sendResponse({ error: 'Unknown action' });
  }
});

/**
 * Start focus mode
 */
async function handleStartFocusMode(data: { duration: number; blockedSites: string[] }): Promise<void> {
  const focusMode = {
    isActive: true,
    blockedSites: data.blockedSites,
    duration: data.duration,
    startTime: Date.now(),
    endTime: Date.now() + (data.duration * 60 * 1000)
  };
  
  await saveStorageData({ focusMode });
  
  // Set alarm to end focus mode
  chrome.alarms.create('endFocusMode', { when: focusMode.endTime });
}

/**
 * Stop focus mode
 */
async function handleStopFocusMode(): Promise<void> {
  const focusMode = {
    isActive: false,
    blockedSites: [],
    duration: 0
  };
  
  await saveStorageData({ focusMode });
  chrome.alarms.clear('endFocusMode');
}

/**
 * Handle focus mode end alarm
 */
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'endFocusMode') {
    await handleStopFocusMode();
  }
});

// Initialize on startup
startNewSession();
// storage.ts

import type { StorageData, UserSettings } from '../types';

const DEFAULT_SETTINGS: UserSettings = {
  trackingEnabled: true,
  idleThreshold: 5,
  categories: {},
  focusMode: {
    defaultDuration: 25,
    defaultBlockedSites: ['facebook.com', 'twitter.com', 'youtube.com', 'instagram.com']
  },
  cloudSync: {
    enabled: false,
    syncData: {
      timeTracking: true,
      focusSettings: true,
      categories: true
    }
  }
};

/**
 * Utility: check if Chrome storage API is available
 */
function isChromeStorageAvailable() {
  return typeof chrome !== 'undefined' && !!chrome.storage?.local;
}

/**
 * Get data from Chrome storage or fallback
 */
export async function getStorageData(): Promise<StorageData> {
  try {
    if (isChromeStorageAvailable()) {
      const result = await chrome.storage.local.get(['sites', 'sessions', 'settings', 'focusMode']);
      return {
        sites: result.sites || {},
        sessions: result.sessions || [],
        settings: { ...DEFAULT_SETTINGS, ...result.settings },
        focusMode: result.focusMode || { isActive: false, blockedSites: [], duration: 25 }
      };
    }

    // fallback: localStorage
    const raw = localStorage.getItem('app_storage');
    return raw ? JSON.parse(raw) : {
      sites: {},
      sessions: [],
      settings: DEFAULT_SETTINGS,
      focusMode: { isActive: false, blockedSites: [], duration: 25 }
    };

  } catch (error) {
    console.error('Error getting storage data:', error);
    return {
      sites: {},
      sessions: [],
      settings: DEFAULT_SETTINGS,
      focusMode: { isActive: false, blockedSites: [], duration: 25 }
    };
  }
}

/**
 * Save data to Chrome storage or fallback
 */
export async function saveStorageData(data: Partial<StorageData>): Promise<void> {
  try {
    if (isChromeStorageAvailable()) {
      await chrome.storage.local.set(data);
      return;
    }

    // fallback: localStorage
    const existing = localStorage.getItem('app_storage');
    const merged = { ...(existing ? JSON.parse(existing) : {}), ...data };
    localStorage.setItem('app_storage', JSON.stringify(merged));

  } catch (error) {
    console.error('Error saving storage data:', error);
    throw error;
  }
}

/**
 * Update site data with new time spent
 */
export async function updateSiteData(domain: string, timeSpent: number): Promise<void> {
  const data = await getStorageData();
  
  if (!data.sites[domain]) {
    data.sites[domain] = {
      domain,
      timeSpent: 0,
      visits: 0,
      category: 'other',
      lastVisit: Date.now()
    };
  }
  
  data.sites[domain].timeSpent += timeSpent;
  data.sites[domain].visits += 1;
  data.sites[domain].lastVisit = Date.now();
  
  await saveStorageData({ sites: data.sites });
}

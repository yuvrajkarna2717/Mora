import { useState, useEffect, useCallback } from 'react';
import { getStorageData, saveStorageData } from '../utils/storage';
import type { StorageData } from '../types';

/**
 * Utility to check if Chrome API is available
 */
function isChromeAPIAvailable() {
  return typeof chrome !== 'undefined' && !!chrome.storage?.local;
}

/**
 * Custom hook for Chrome storage with real-time updates
 */
export function useStorage() {
  const [data, setData] = useState<StorageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load data from storage
   */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const storageData = await getStorageData();
      setData(storageData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('Storage load error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update data in storage
   */
  const updateData = useCallback(async (updates: Partial<StorageData>) => {
    try {
      setError(null);
      await saveStorageData(updates);

      // Update local state immediately
      setData(prevData => (prevData ? { ...prevData, ...updates } : null));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save data');
      console.error('Storage save error:', err);
      throw err;
    }
  }, []);

  /**
   * Listen for storage changes
   */
  useEffect(() => {
    // Initial load
    loadData();

    if (!isChromeAPIAvailable()) {
      console.warn('chrome.storage.onChanged not available in this environment');
      return; // stop here if not extension context
    }

    const handleStorageChange = (_changes: { [key: string]: chrome.storage.StorageChange }) => {
      // Reload data when storage changes
      loadData();
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      if (isChromeAPIAvailable()) {
        chrome.storage.onChanged.removeListener(handleStorageChange);
      }
    };
  }, [loadData]);

  return {
    data,
    loading,
    error,
    updateData,
    reload: loadData,
  };
}

/**
 * Hook for focus mode management
 */
export function useFocusMode() {
  const { data, updateData } = useStorage();

  const startFocusMode = useCallback(
    async (duration: number, blockedSites: string[]) => {
      if (!isChromeAPIAvailable()) {
        console.warn('chrome.runtime not available — skipping focus mode start');
        return;
      }

      await chrome.runtime.sendMessage({
        action: 'startFocusMode',
        data: { duration, blockedSites },
      });

      await updateData({
        focusMode: {
          isActive: true,
          blockedSites,
          duration,
          startTime: Date.now(),
          endTime: Date.now() + duration * 60 * 1000,
        },
      });
    },
    [updateData]
  );

  const stopFocusMode = useCallback(async () => {
    if (!isChromeAPIAvailable()) {
      console.warn('chrome.runtime not available — skipping focus mode stop');
      return;
    }

    await chrome.runtime.sendMessage({ action: 'stopFocusMode' });

    await updateData({
      focusMode: {
        isActive: false,
        blockedSites: [],
        duration: 0,
      },
    });
  }, [updateData]);

  return {
    focusMode: data?.focusMode,
    startFocusMode,
    stopFocusMode,
  };
}

/**
 * Hook for settings management
 */
export function useSettings() {
  const { data, updateData } = useStorage();

  const updateSettings = useCallback(
    async (settings: Partial<StorageData['settings']>) => {
      if (!data) return;
      await updateData({
        settings: { ...data.settings, ...settings },
      });
    },
    [data, updateData]
  );

  return {
    settings: data?.settings,
    updateSettings,
  };
}

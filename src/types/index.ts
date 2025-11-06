// Core data types for Mora extension

export interface SiteData {
  domain: string;
  timeSpent: number; // in milliseconds
  visits: number;
  category: string;
  lastVisit: number; // timestamp
  favicon?: string;
}

export interface Session {
  id: string;
  startTime: number;
  endTime?: number;
  sites: Record<string, number>; // domain -> time spent
  totalTime: number;
}

export interface FocusModeData {
  isActive: boolean;
  blockedSites: string[];
  duration: number; // in minutes
  startTime?: number;
  endTime?: number;
}

export interface UserSettings {
  trackingEnabled: boolean;
  idleThreshold: number; // minutes before considering idle
  categories: Record<string, string>; // domain -> category
  focusMode: {
    defaultDuration: number;
    defaultBlockedSites: string[];
  };
  cloudSync: {
    enabled: boolean;
    syncData: {
      timeTracking: boolean;
      focusSettings: boolean;
      categories: boolean;
    };
  };
}

export interface StorageData {
  sites: Record<string, SiteData>;
  sessions: Session[];
  settings: UserSettings;
  focusMode: FocusModeData;
  lastSync?: number;
}

// Cloud sync types
export interface CloudSyncData {
  userId: string;
  encryptedData: string; // encrypted StorageData
  lastModified: number;
  deviceId: string;
}

export interface SyncConflict {
  local: StorageData;
  remote: StorageData;
  conflictFields: string[];
}

// UI component types
export interface TimeStats {
  today: number;
  week: number;
  topSites: Array<{
    domain: string;
    time: number;
    percentage: number;
  }>;
}

export type CategoryType = 'productive' | 'social' | 'entertainment' | 'news' | 'shopping' | 'other';
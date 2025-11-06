// Mock Chrome APIs for development environment
export {};

declare global {
  interface Window {
    chrome: typeof chrome;
  }
}

// Mock Chrome storage API for development
const mockStorage = {
  local: {
    get: (_keys?: string | string[] | null) => {
      return Promise.resolve({
        sites: {},
        sessions: [],
        settings: {
          trackingEnabled: true,
          idleThreshold: 5,
          categories: {},
          focusMode: {
            defaultDuration: 25,
            defaultBlockedSites: ['facebook.com', 'twitter.com']
          },
          cloudSync: {
            enabled: false,
            syncData: {
              timeTracking: true,
              focusSettings: true,
              categories: true
            }
          }
        },
        focusMode: {
          isActive: false,
          blockedSites: [],
          duration: 25
        }
      });
    },
    set: (_items: Record<string, any>) => Promise.resolve(),
    clear: () => Promise.resolve()
  },
  onChanged: {
    addListener: function(_callback: Function) {},
    removeListener: function(_callback: Function) {}
  }
};

const mockRuntime = {
  sendMessage: (_message: any) => Promise.resolve({ success: true })
};

// Initialize mock Chrome API if not in extension environment
if (typeof window !== 'undefined' && !window.chrome) {
  (window as any).chrome = {
    storage: mockStorage,
    runtime: mockRuntime
  };
}

// Also set global chrome for modules
if (typeof globalThis !== 'undefined' && !(globalThis as any).chrome) {
  (globalThis as any).chrome = {
    storage: mockStorage,
    runtime: mockRuntime
  };
}
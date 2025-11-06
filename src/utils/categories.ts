// Website categorization utilities
import type { CategoryType } from '../types';

/**
 * Default website categories mapping
 */
const DEFAULT_CATEGORIES: Record<string, CategoryType> = {
  // Productive
  'github.com': 'productive',
  'stackoverflow.com': 'productive',
  'docs.google.com': 'productive',
  'notion.so': 'productive',
  'trello.com': 'productive',
  'slack.com': 'productive',
  'zoom.us': 'productive',
  'figma.com': 'productive',
  'canva.com': 'productive',
  
  // Social
  'facebook.com': 'social',
  'twitter.com': 'social',
  'instagram.com': 'social',
  'linkedin.com': 'social',
  'discord.com': 'social',
  'reddit.com': 'social',
  'tiktok.com': 'social',
  'snapchat.com': 'social',
  
  // Entertainment
  'youtube.com': 'entertainment',
  'netflix.com': 'entertainment',
  'twitch.tv': 'entertainment',
  'spotify.com': 'entertainment',
  'hulu.com': 'entertainment',
  'disneyplus.com': 'entertainment',
  'primevideo.com': 'entertainment',
  
  // News
  'cnn.com': 'news',
  'bbc.com': 'news',
  'nytimes.com': 'news',
  'reuters.com': 'news',
  'techcrunch.com': 'news',
  'theverge.com': 'news',
  
  // Shopping
  'amazon.com': 'shopping',
  'ebay.com': 'shopping',
  'etsy.com': 'shopping',
  'walmart.com': 'shopping',
  'target.com': 'shopping',
  'shopify.com': 'shopping'
};

/**
 * Get category for a domain
 */
export function getCategoryForDomain(domain: string): CategoryType {
  // Remove www. prefix if present
  const cleanDomain = domain.replace(/^www\./, '');
  
  // Check exact match first
  if (DEFAULT_CATEGORIES[cleanDomain]) {
    return DEFAULT_CATEGORIES[cleanDomain];
  }
  
  // Check for partial matches (e.g., subdomain.youtube.com)
  for (const [categoryDomain, category] of Object.entries(DEFAULT_CATEGORIES)) {
    if (cleanDomain.includes(categoryDomain)) {
      return category;
    }
  }
  
  return 'other';
}

/**
 * Get category display name
 */
export function getCategoryDisplayName(category: CategoryType): string {
  const names: Record<CategoryType, string> = {
    productive: 'Productive',
    social: 'Social Media',
    entertainment: 'Entertainment',
    news: 'News & Media',
    shopping: 'Shopping',
    other: 'Other'
  };
  
  return names[category];
}

/**
 * Get category color for UI
 */
export function getCategoryColor(category: CategoryType): string {
  const colors: Record<CategoryType, string> = {
    productive: '#10b981', // green
    social: '#3b82f6', // blue
    entertainment: '#f59e0b', // amber
    news: '#8b5cf6', // violet
    shopping: '#ef4444', // red
    other: '#6b7280' // gray
  };
  
  return colors[category];
}

/**
 * Check if domain should be blocked in focus mode
 */
export function isDistractingSite(domain: string): boolean {
  const category = getCategoryForDomain(domain);
  return category === 'social' || category === 'entertainment';
}

/**
 * Get productivity score based on categories
 */
export function calculateProductivityScore(siteData: Record<string, number>): number {
  let productiveTime = 0;
  let totalTime = 0;
  
  Object.entries(siteData).forEach(([domain, time]) => {
    totalTime += time;
    const category = getCategoryForDomain(domain);
    if (category === 'productive') {
      productiveTime += time;
    }
  });
  
  return totalTime > 0 ? Math.round((productiveTime / totalTime) * 100) : 0;
}
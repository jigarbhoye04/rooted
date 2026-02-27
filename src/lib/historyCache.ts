/**
 * Simple client-side cache for word history API responses
 * Used by view pages to avoid refetching on every render
 */

export interface HistoryItem {
  date: string;
  word: string;
  slug: string;
}

const CACHE_PREFIX = 'rooted_history_';
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

interface CachedHistory {
  data: HistoryItem[];
  timestamp: number;
}

export function getCachedHistory(type: 'MAP' | 'TREE' | 'TIMELINE' | 'GRID'): HistoryItem[] | null {
  try {
    const key = `${CACHE_PREFIX}${type}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const cached: CachedHistory = JSON.parse(raw);
    const age = Date.now() - cached.timestamp;

    if (age > CACHE_DURATION_MS) {
      localStorage.removeItem(key);
      return null;
    }

    return cached.data;
  } catch {
    return null;
  }
}

export function setCachedHistory(
  type: 'MAP' | 'TREE' | 'TIMELINE' | 'GRID',
  data: HistoryItem[]
): void {
  try {
    const key = `${CACHE_PREFIX}${type}`;
    const cache: CachedHistory = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(cache));
  } catch {
    // Silently ignore if localStorage full or unavailable
  }
}

export function clearHistoryCache(
  type?: 'MAP' | 'TREE' | 'TIMELINE' | 'GRID'
): void {
  try {
    if (type) {
      localStorage.removeItem(`${CACHE_PREFIX}${type}`);
    } else {
      // Clear all history cache
      for (const t of ['MAP', 'TREE', 'TIMELINE', 'GRID']) {
        localStorage.removeItem(`${CACHE_PREFIX}${t}`);
      }
    }
  } catch {
    // Silently ignore
  }
}

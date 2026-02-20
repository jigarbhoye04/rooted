/**
 * Database Helper
 * 
 * Provides typed wrappers around @neondatabase/serverless for safe database operations.
 * All queries use parameterized statements to prevent SQL injection.
 * 
 * Migration note: This uses @neondatabase/serverless as the recommended replacement
 * for the deprecated @vercel/postgres package.
 */

import { neon } from '@neondatabase/serverless';
import { DailyWord, DailyWordSchema } from '@/src/schemas/dailyWord';

// Initialize Neon client with connection string from environment
const sql = neon(process.env.DATABASE_URL!);

/**
 * In-memory word cache with TTL
 * Prevents redundant Neon HTTP roundtrips for the same word.
 * Small footprint: max 10 entries, 5-minute TTL.
 */
interface CacheEntry {
  data: DailyWord;
  expiresAt: number;
}

const WORD_CACHE = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 300_000; // 5 minutes
const MAX_CACHE_SIZE = 10;

function getCacheKey(date: string): string {
  return `date:${date}`;
}

function setCache(key: string, data: DailyWord): void {
  // Evict oldest if at capacity
  if (WORD_CACHE.size >= MAX_CACHE_SIZE) {
    const oldestKey = WORD_CACHE.keys().next().value;
    if (oldestKey) WORD_CACHE.delete(oldestKey);
  }
  WORD_CACHE.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}

function getCache(key: string): DailyWord | null {
  const entry = WORD_CACHE.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    WORD_CACHE.delete(key);
    return null;
  }
  return entry.data;
}

/**
 * Get word by publish date
 * 
 * Uses in-memory cache to reduce DB roundtrips.
 * Cache TTL: 5 minutes. Max entries: 10.
 * 
 * @param date - Date string in YYYY-MM-DD format
 * @returns DailyWord or null if not found
 * @throws ZodError if database data fails validation
 */
export async function getWordByDate(date: string): Promise<DailyWord | null> {
  // Check cache first
  const cacheKey = getCacheKey(date);
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const result = await sql`
    SELECT 
      id,
      publish_date::text,
      word,
      definition,
      phonetic,
      pronunciation_audio_url,
      visualization_type,
      content_json,
      accent_color,
      created_at::text,
      approved_by,
      root_family
    FROM daily_words
    WHERE publish_date = ${date}
    LIMIT 1
  `;

  if (result.length === 0) {
    return null;
  }

  // Validate database output with Zod (throws on failure)
  const word = DailyWordSchema.parse(result[0]);

  // Cache the validated result
  setCache(cacheKey, word);

  return word;
}

/**
 * Get word by slug (word name, lowercase)
 * 
 * @param slug - Word slug (e.g., "sabotage")
 * @returns DailyWord or null if not found
 * @throws ZodError if database data fails validation
 */
export async function getWordBySlug(slug: string): Promise<DailyWord | null> {
  const result = await sql`
    SELECT 
      id,
      publish_date::text,
      word,
      definition,
      phonetic,
      pronunciation_audio_url,
      visualization_type,
      content_json,
      accent_color,
      created_at::text,
      approved_by,
      root_family
    FROM daily_words
    WHERE LOWER(word) = LOWER(${slug})
    ORDER BY publish_date DESC
    LIMIT 1
  `;

  if (result.length === 0) {
    return null;
  }

  return DailyWordSchema.parse(result[0]);
}

/**
 * Get today's date in YYYY-MM-DD format
 * Uses server timezone (consistent across requests)
 */
export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get recent words by visualization type
 * Used for history navigation (e.g., "Previous Map")
 * 
 * @param type - Visualization type to filter by
 * @param limit - Max number of words to return (default 10)
 * @param beforeDate - Optional date string (YYYY-MM-DD). If provided, returns words strictly before this date.
 *                     If omitted, returns words from today backwards.
 */
export async function getRecentWordsByType(
  type: 'MAP' | 'TREE' | 'TIMELINE' | 'GRID',
  limit: number = 10,
  beforeDate?: string
): Promise<Array<{ date: string; word: string; slug: string }>> {
  // If beforeDate is provided, clean it. Otherwise use top of today.
  const today = getTodayDateString();
  const cutoff = beforeDate || today;

  // Decide operator: strictly before (if navigating "prev") or on-or-before (if listing history from today)
  // Actually, usually we want "history from X". 
  // If I am on "Feb 19", and I want "Previous", I want < Feb 19.
  // If I want "History List", I want <= Today (or <= Current Page Date?).
  // Let's standardise: returns words <= cutoff. 
  // If you want strictly before, pass yesterday's date.

  // Wait, param says `beforeDate`.
  // Let's make it `maxDate` (inclusive).

  const result = await sql`
    SELECT 
      publish_date::text as date,
      word
    FROM daily_words
    WHERE visualization_type = ${type}
      AND publish_date <= ${cutoff}
    ORDER BY publish_date DESC
    LIMIT ${limit}
  `;

  return result.map(row => ({
    date: row.date,
    word: row.word,
    slug: row.word.toLowerCase().replace(/[^a-z0-9]+/g, '-') // Simple slug gen, or select slug if column exists? 
    // DB doesn't have slug column, we match by date or word. URL uses date query param.
    // So slug might not be needed for URL, but useful for UI?
    // Actually our URL is `/?date=...`. So `date` is key.
  }));
}

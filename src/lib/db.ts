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
 * Get word by publish date
 * 
 * @param date - Date string in YYYY-MM-DD format
 * @returns DailyWord or null if not found
 * @throws ZodError if database data fails validation
 */
export async function getWordByDate(date: string): Promise<DailyWord | null> {
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
  return DailyWordSchema.parse(result[0]);
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

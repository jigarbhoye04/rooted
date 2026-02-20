/**
 * Zod schema for DailyWord database table
 * 
 * This file defines the contract between:
 * - Database → API
 * - API → Client
 * 
 * IMPORTANT: This schema MUST match the database table structure.
 * See: docs/context/01_architecture.md for SQL schema
 */

import { z } from 'zod';

/**
 * Main schema for daily_words table
 */
export const DailyWordSchema = z.object({
  // Primary key
  id: z.number().int().positive(),
  
  // Date when this word is scheduled to appear
  // Format: YYYY-MM-DD (ISO 8601 date string)
  publish_date: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    'Date must be in YYYY-MM-DD format'
  ),
  
  // The word itself (e.g., "Sabotage")
  word: z.string().min(1, 'Word cannot be empty').max(100),
  
  // Dictionary definition
  definition: z.string().min(1, 'Definition cannot be empty'),
  
  // Phonetic pronunciation (e.g., "/ˈsæbətɑːʒ/")
  phonetic: z.string().max(100).optional(),
  
  // Optional audio pronunciation URL (e.g., link to Forvo)
  pronunciation_audio_url: z.string().url().optional(),
  
  // Visualization type determines which visualizer component to use
  visualization_type: z.enum(['MAP', 'TREE', 'TIMELINE', 'GRID'], {
    errorMap: () => ({ 
      message: 'Visualization type must be MAP, TREE, TIMELINE, or GRID' 
    })
  }),
  
  // Main content (JSONB field in database)
  // Structure varies based on visualization_type
  // See: docs/context/04_schema_contracts.md for type-specific schemas
  content_json: z.object({
    // One-sentence teaser shown at top of page
    hook: z.string().min(1, 'Hook cannot be empty'),
    
    // "Did you know?" section content
    fun_fact: z.string().min(1, 'Fun fact cannot be empty'),
    
    // Optional deep dive content (unlocked with Nerd Mode)
    nerd_mode: z.object({
      ipa_full: z.string().optional(),
      disputed_origin: z.string().optional(),
      earliest_citation: z.string().optional(),
    }).optional(),
    
    // Type-specific visualization data
    // Validated separately based on visualization_type
    // We use z.any() here because the structure varies
    visual_data: z.any(),
  }),
  
  // Theme color for this word (hex color code)
  // Used for scroll indicators, map routes, tree links
  accent_color: z.string().regex(
    /^#[0-9A-Fa-f]{6}$/,
    'Accent color must be a valid hex code (e.g., #FF5733)'
  ).default('#000000'),
  
  // Timestamp when word was created (ISO 8601 datetime)
  created_at: z.string().datetime().optional(),
  
  // Name of admin who approved this word
  approved_by: z.string().max(50).optional(),
  
  // Root family for Wordception feature
  // e.g., "PIE_kaput" for words derived from Latin "caput"
  // Used to find related words for ghost overlay
  root_family: z.string().max(50).optional(),
});

/**
 * TypeScript type inferred from schema
 * 
 * Usage:
 * ```typescript
 * const word: DailyWord = {
 *   id: 1,
 *   publish_date: '2025-02-07',
 *   word: 'Sabotage',
 *   // ... rest of fields
 * };
 * ```
 */
export type DailyWord = z.infer<typeof DailyWordSchema>;

/**
 * Partial schema for updates (PATCH requests)
 * All fields except 'id' are optional
 */
export const DailyWordUpdateSchema = DailyWordSchema
  .partial()
  .omit({ id: true })
  .strict();

/**
 * Schema for creating new words (POST requests)
 * Omits auto-generated fields (id, created_at)
 */
export const DailyWordCreateSchema = DailyWordSchema
  .omit({ 
    id: true, 
    created_at: true 
  })
  .strict();

/**
 * Lightweight schema for word list responses
 * Only includes essential fields for listing
 */
export const DailyWordListItemSchema = DailyWordSchema.pick({
  id: true,
  publish_date: true,
  word: true,
  visualization_type: true,
});

export type DailyWordListItem = z.infer<typeof DailyWordListItemSchema>;

/**
 * Helper function to validate database query results
 * 
 * Usage:
 * ```typescript
 * const result = await sql`SELECT * FROM daily_words WHERE id = ${id}`;
 * const word = validateDailyWord(result.rows[0]);
 * ```
 * 
 * @param data - Raw data from database
 * @returns Validated DailyWord object
 * @throws {z.ZodError} If validation fails
 */
export function validateDailyWord(data: unknown): DailyWord {
  return DailyWordSchema.parse(data);
}

/**
 * Safe validation that returns result instead of throwing
 * 
 * Usage:
 * ```typescript
 * const result = validateDailyWordSafe(data);
 * if (result.success) {
 *   console.log(result.data.word);
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */
export function validateDailyWordSafe(data: unknown) {
  return DailyWordSchema.safeParse(data);
}

/**
 * Validation for date strings
 * Ensures date is in correct format and is a valid date
 */
export const DateStringSchema = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .refine(
    (date) => {
      const parsed = Date.parse(date);
      return !isNaN(parsed);
    },
    { message: 'Date must be a valid date' }
  );

/**
 * Validation for word slugs (URL-safe word identifiers)
 * e.g., "sabotage", "mother", "algorithm"
 */
export const WordSlugSchema = z.string()
  .min(1)
  .max(100)
  .regex(
    /^[a-z0-9-]+$/,
    'Slug must contain only lowercase letters, numbers, and hyphens'
  );

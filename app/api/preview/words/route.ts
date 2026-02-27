/**
 * GET /api/preview/words
 * 
 * Returns one word per visualization type (MAP, TREE, TIMELINE, GRID),
 * regardless of publish_date. Designed for the /preview dev tool page.
 * 
 * This endpoint ignores the "no future dates" rule intentionally —
 * it picks the most recently created word of each type so developers
 * can preview all page layouts without modifying DB dates.
 * 
 * Response shape:
 *   Record<'MAP'|'TREE'|'TIMELINE'|'GRID', DailyWord | null>
 * 
 * Cache: 12 hours (s-maxage), 24h stale-while-revalidate
 */

import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { DailyWordSchema } from '@/src/schemas/dailyWord';
import { z } from 'zod';

const sql = neon(process.env.DATABASE_URL!);

const TYPES = ['MAP', 'TREE', 'TIMELINE', 'GRID'] as const;

// Response schema: one word per type (or null if none exist)
const PreviewWordsResponseSchema = z.record(
  z.enum(TYPES),
  DailyWordSchema.nullable()
);

export async function GET(request: Request): Promise<NextResponse> {
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    // Single query using DISTINCT ON to get one word per visualization_type,
    // ordered by publish_date DESC so we get the most recently scheduled word.
    const result = await sql`
      SELECT DISTINCT ON (visualization_type)
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
      WHERE visualization_type IN ('MAP', 'TREE', 'TIMELINE', 'GRID')
      ORDER BY visualization_type, publish_date DESC
    `;

    // Build a map: type → DailyWord | null
    const wordsByType: Record<string, z.infer<typeof DailyWordSchema> | null> = {
      MAP: null,
      TREE: null,
      TIMELINE: null,
      GRID: null,
    };

    for (const row of result) {
      const parsed = DailyWordSchema.safeParse(row);
      if (parsed.success) {
        wordsByType[parsed.data.visualization_type] = parsed.data;
      } else {
        console.warn(
          `Preview: Skipping invalid ${row.visualization_type} word (id=${row.id}):`,
          parsed.error.format()
        );
      }
    }

    // Validate full response shape
    const validated = PreviewWordsResponseSchema.parse(wordsByType);

    return NextResponse.json(validated, {
      headers: {
        'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Preview words schema validation failed:', error.issues);
      return NextResponse.json(
        { error: 'Data integrity error' },
        { status: 500 }
      );
    }

    console.error('Unexpected error in /api/preview/words:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

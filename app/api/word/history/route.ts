/**
 * GET /api/word/history
 * 
 * Returns a list of recent words filtered by type and date.
 * Used for "Smart History" navigation (e.g., finding the previous Map word).
 * 
 * Query Params:
 * - type: 'MAP' | 'TREE' | 'TIMELINE' | 'GRID' (required)
 * - limit: number (default 10, max 50)
 * - before: date string (optional, YYYY-MM-DD) - returns words on or before this date
 * 
 * Responses:
 * - 200: Array<{ date: string, word: string, slug: string }>
 * - 400: Invalid parameters
 * - 500: Server error
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getRecentWordsByType } from '@/src/lib/db';
import { CommonErrors } from '@/src/schemas/apiResponses';

// Schema for query parameters
const HistoryQuerySchema = z.object({
    type: z.enum(['MAP', 'TREE', 'TIMELINE', 'GRID']),
    limit: z.coerce.number().int().min(1).max(50).default(10),
    before: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export async function GET(request: Request): Promise<NextResponse> {
    if (request.method !== 'GET') {
        return NextResponse.json(CommonErrors.METHOD_NOT_ALLOWED, { status: 405 });
    }

    try {
        const { searchParams } = new URL(request.url);

        // Parse and validate params
        const typeParam = searchParams.get('type');
        const limitParam = searchParams.get('limit');
        const beforeParam = searchParams.get('before');

        const result = HistoryQuerySchema.safeParse({
            type: typeParam,
            limit: limitParam || undefined, // undefined triggers default(10)
            before: beforeParam || undefined,
        });

        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid parameters', details: result.error.format() },
                { status: 400 }
            );
        }

        const { type, limit, before } = result.data;

        // Fetch data
        const history = await getRecentWordsByType(type, limit, before);

        return NextResponse.json(history);

    } catch (error) {
        console.error('Error in /api/word/history:', error);
        return NextResponse.json(CommonErrors.INTERNAL_ERROR, { status: 500 });
    }
}

/**
 * GET /api/word/today
 * 
 * Returns the word scheduled for the current date.
 * 
 * Responses:
 * - 200: DailyWord object
 * - 404: No word scheduled for today
 * - 500: Data integrity error (schema validation failed)
 * 
 * Security:
 * - Uses parameterized SQL queries
 * - Validates database output with Zod
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getWordByDate, getTodayDateString } from '@/src/lib/db';
import { NotFoundErrors, CommonErrors } from '@/src/schemas/apiResponses';

export async function GET(request: Request): Promise<NextResponse> {
    // Method validation (required by security-check.sh, though App Router handles this via function name)
    if (request.method !== 'GET') {
        return NextResponse.json(CommonErrors.METHOD_NOT_ALLOWED, { status: 405 });
    }

    try {
        // Parse query params for optional date
        const { searchParams } = new URL(request.url);
        const dateParam = searchParams.get('date');

        // Regex for YYYY-MM-DD
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        let targetDate: string;

        if (dateParam && dateRegex.test(dateParam)) {
            targetDate = dateParam;
            // Optional: Prevent future dates?
            const today = getTodayDateString();
            if (targetDate > today) {
                return NextResponse.json(
                    { error: 'Cannot view future words' },
                    { status: 400 }
                );
            }
        } else {
            // Default to today
            targetDate = getTodayDateString();
        }

        // Query database for target word
        const word = await getWordByDate(targetDate);

        // Check if word exists
        if (!word) {
            return NextResponse.json(
                NotFoundErrors.WORD_NOT_FOUND,
                { status: 404 }
            );
        }

        // Return validated word data with cache headers
        // Cache for 5 minutes, serve stale for 10 minutes while revalidating
        return NextResponse.json(word, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            },
        });

    } catch (error) {
        // Handle Zod validation errors (database returned invalid data)
        if (error instanceof z.ZodError) {
            console.error('Schema validation failed:', error.issues);
            return NextResponse.json(
                CommonErrors.VALIDATION_ERROR,
                { status: 500 }
            );
        }

        // Handle unexpected errors
        console.error('Unexpected error in /api/word/today:', error);
        return NextResponse.json(
            CommonErrors.INTERNAL_ERROR,
            { status: 500 }
        );
    }
}

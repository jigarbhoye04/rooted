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
        // Get current date in YYYY-MM-DD format
        const today = getTodayDateString();

        // Query database for today's word
        const word = await getWordByDate(today);

        // Check if word exists for today
        if (!word) {
            return NextResponse.json(
                NotFoundErrors.WORD_NOT_FOUND,
                { status: 404 }
            );
        }

        // Return validated word data
        return NextResponse.json(word);

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

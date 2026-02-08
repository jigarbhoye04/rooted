/**
 * GET /api/word/[slug]
 * 
 * Returns the word data for a specific word slug.
 * 
 * Responses:
 * - 200: DailyWord object
 * - 404: Word not found
 * - 500: Server error or validation failure
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getWordBySlug } from '@/src/lib/db';
import { NotFoundErrors, CommonErrors } from '@/src/schemas/apiResponses';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
    // Method validation
    if (request.method !== 'GET') {
        return NextResponse.json(CommonErrors.METHOD_NOT_ALLOWED, { status: 405 });
    }

    try {
        const { slug } = await params;

        // Validate slug isn't empty
        if (!slug) {
            return NextResponse.json(CommonErrors.VALIDATION_ERROR, { status: 400 });
        }

        // Query database for word by slug
        const word = await getWordBySlug(slug);

        // Check if word exists
        if (!word) {
            return NextResponse.json(
                NotFoundErrors.WORD_NOT_FOUND,
                { status: 404 }
            );
        }

        // Return validated word data
        return NextResponse.json(word);

    } catch (error) {
        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            console.error('Schema validation failed for word slug:', error.issues);
            return NextResponse.json(
                CommonErrors.VALIDATION_ERROR,
                { status: 500 }
            );
        }

        // Handle unexpected errors
        console.error('Unexpected error in /api/word/[slug]:', error);
        return NextResponse.json(
            CommonErrors.INTERNAL_ERROR,
            { status: 500 }
        );
    }
}

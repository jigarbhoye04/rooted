/**
 * GET /api/word/[slug]
 *
 * Returns the word data for a specific word slug.
 *
 * Responses:
 * - 200: DailyWord object
 * - 400: Invalid slug format
 * - 404: Word not found
 * - 500: Data integrity error (schema validation failed)
 *
 * Security:
 * - Validates input slug with Zod (WordSlugSchema)
 * - Uses parameterized SQL queries (via getWordBySlug)
 * - Validates database output with Zod (DailyWordSchema)
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getWordBySlug } from '@/src/lib/db';
import { WordSlugSchema } from '@/src/schemas/dailyWord';
import { NotFoundErrors, CommonErrors } from '@/src/schemas/apiResponses';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

export async function GET(
    request: Request,
    { params }: RouteParams
): Promise<NextResponse> {
    // Method validation (required by security-check.sh, though App Router handles this via function name)
    if (request.method !== 'GET') {
        return NextResponse.json(CommonErrors.METHOD_NOT_ALLOWED, { status: 405 });
    }

    try {
        const { slug } = await params;

        // Validate slug format with Zod schema
        const validatedSlug = WordSlugSchema.parse(slug);

        // Query database for word by slug
        const word = await getWordBySlug(validatedSlug);

        // Check if word exists
        if (!word) {
            return NextResponse.json(
                NotFoundErrors.SLUG_NOT_FOUND,
                { status: 404 }
            );
        }

        // Return validated word data
        return NextResponse.json(word);

    } catch (error) {
        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            // Slug validation errors are input errors (400)
            const isSlugValidation = error.issues.some(
                (issue) => issue.path.length === 0
            );

            if (isSlugValidation) {
                return NextResponse.json(
                    { error: 'Invalid slug format', code: 'INVALID_SLUG', details: error.issues },
                    { status: 400 }
                );
            }

            // Database output validation errors are server errors (500)
            console.error('Schema validation failed:', error.issues);
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

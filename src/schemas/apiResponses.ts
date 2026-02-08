/**
 * API Response Schemas
 * 
 * Defines standardized response formats for all API endpoints.
 * See: docs/context/04_schema_contracts.md
 */

import { z } from 'zod';

/**
 * Standard error response schema
 * Used for all 4xx and 5xx responses
 */
export const ErrorResponseSchema = z.object({
    error: z.string().min(1, 'Error message is required'),
    code: z.string().optional(),
    details: z.any().optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

/**
 * Common error responses (pre-defined for consistency)
 */
export const CommonErrors = {
    NOT_FOUND: { error: 'Resource not found' } satisfies ErrorResponse,
    METHOD_NOT_ALLOWED: { error: 'Method not allowed' } satisfies ErrorResponse,
    INTERNAL_ERROR: { error: 'Internal server error' } satisfies ErrorResponse,
    VALIDATION_ERROR: { error: 'Data integrity error' } satisfies ErrorResponse,
    UNAUTHORIZED: { error: 'Unauthorized' } satisfies ErrorResponse,
} as const;

/**
 * 404 specific errors
 */
export const NotFoundErrors = {
    WORD_NOT_FOUND: { error: 'No word scheduled for today', code: 'WORD_NOT_FOUND' } satisfies ErrorResponse,
    SLUG_NOT_FOUND: { error: 'Word not found', code: 'SLUG_NOT_FOUND' } satisfies ErrorResponse,
} as const;

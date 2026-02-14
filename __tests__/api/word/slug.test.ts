/**
 * Integration tests for GET /api/word/[slug]
 *
 * Tests the slug-based word lookup endpoint.
 * Mocks the database layer (getWordBySlug) to test route logic in isolation.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod';
import { GET } from '@/app/api/word/[slug]/route';

// Mock the database module
vi.mock('@/src/lib/db', () => ({
    getWordBySlug: vi.fn(),
}));

import { getWordBySlug } from '@/src/lib/db';

const mockGetWordBySlug = vi.mocked(getWordBySlug);

/** Factory for a valid DailyWord response */
function createMockWord(overrides?: Record<string, unknown>): Record<string, unknown> {
    return {
        id: 1,
        publish_date: '2026-02-14',
        word: 'sabotage',
        definition: 'Deliberately destroy or damage something.',
        phonetic: '/ˈsæbətɑːʒ/',
        pronunciation_audio_url: null,
        visualization_type: 'TIMELINE',
        content_json: {
            hook: 'From wooden shoes to cyber attacks.',
            fun_fact: 'Workers threw sabots (shoes) into machinery.',
            visual_data: {},
        },
        accent_color: '#FF5733',
        created_at: '2026-02-14T00:00:00.000Z',
        approved_by: 'jigar',
        root_family: null,
        ...overrides,
    };
}

/** Helper to build a mock Request + params for the route handler */
function callRoute(slug: string): Promise<Response> {
    const request = new Request(`http://localhost:3000/api/word/${slug}`, {
        method: 'GET',
    });
    const routeParams = { params: Promise.resolve({ slug }) };
    return GET(request, routeParams);
}

describe('GET /api/word/[slug]', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns 200 with valid word when slug matches', async () => {
        const mockWord = createMockWord();
        mockGetWordBySlug.mockResolvedValue(mockWord as ReturnType<typeof getWordBySlug> extends Promise<infer T> ? T : never);

        const response = await callRoute('sabotage');

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data.word).toBe('sabotage');
        expect(data.definition).toBe('Deliberately destroy or damage something.');
        expect(mockGetWordBySlug).toHaveBeenCalledWith('sabotage');
    });

    it('returns 404 when no word matches the slug', async () => {
        mockGetWordBySlug.mockResolvedValue(null);

        const response = await callRoute('nonexistent');

        expect(response.status).toBe(404);
        const data = await response.json();
        expect(data.error).toBe('Word not found');
        expect(data.code).toBe('SLUG_NOT_FOUND');
    });

    it('returns 400 for invalid slug with uppercase letters', async () => {
        const response = await callRoute('SABOTAGE');

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.code).toBe('INVALID_SLUG');
        expect(mockGetWordBySlug).not.toHaveBeenCalled();
    });

    it('returns 400 for slug with spaces', async () => {
        const response = await callRoute('hello world');

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.code).toBe('INVALID_SLUG');
        expect(mockGetWordBySlug).not.toHaveBeenCalled();
    });

    it('returns 500 when getWordBySlug throws ZodError (data integrity)', async () => {
        const zodError = new z.ZodError([
            {
                code: 'invalid_type',
                expected: 'string',
                path: ['word'],
                message: 'Expected string, received number',
            },
        ]);
        mockGetWordBySlug.mockRejectedValue(zodError);

        const response = await callRoute('sabotage');

        expect(response.status).toBe(500);
        const data = await response.json();
        expect(data.error).toBe('Data integrity error');
    });

    it('returns 500 when getWordBySlug throws unexpected error', async () => {
        mockGetWordBySlug.mockRejectedValue(new Error('Connection refused'));

        const response = await callRoute('sabotage');

        expect(response.status).toBe(500);
        const data = await response.json();
        expect(data.error).toBe('Internal server error');
    });

    it('accepts valid slugs with hyphens and numbers', async () => {
        const mockWord = createMockWord({ word: 'a-1-test' });
        mockGetWordBySlug.mockResolvedValue(mockWord as ReturnType<typeof getWordBySlug> extends Promise<infer T> ? T : never);

        const response = await callRoute('a-1-test');

        expect(response.status).toBe(200);
        expect(mockGetWordBySlug).toHaveBeenCalledWith('a-1-test');
    });
});

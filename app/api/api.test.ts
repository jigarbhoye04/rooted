import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET as getToday } from '@/app/api/word/today/route';
import { GET as getSlug } from '@/app/api/word/[slug]/route';
import * as db from '@/src/lib/db';
import { NextResponse } from 'next/server';

// Mock the DB module
vi.mock('@/src/lib/db', () => ({
    getWordByDate: vi.fn(),
    getWordBySlug: vi.fn(),
    getTodayDateString: vi.fn(() => '2026-02-08'),
}));

const mockWord = {
    id: 1,
    publish_date: '2026-02-08',
    word: 'Coffee',
    definition: 'A dark brown drink...',
    phonetic: '/ˈkɔːfi/',
    visualization_type: 'MAP',
    content_json: {
        hook: 'Brewing...',
        fun_fact: 'Fact',
        visual_data: {}
    },
    accent_color: '#6F4E37',
};

describe('API Integration Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('GET /api/word/today', () => {
        it('should return 200 and the word if found', async () => {
            vi.mocked(db.getWordByDate).mockResolvedValue(mockWord as any);

            const req = new Request('http://localhost:3000/api/word/today');
            const response = await getToday(req);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.word).toBe('Coffee');
        });

        it('should return 404 if no word found', async () => {
            vi.mocked(db.getWordByDate).mockResolvedValue(null);

            const req = new Request('http://localhost:3000/api/word/today');
            const response = await getToday(req);

            expect(response.status).toBe(404);
        });
    });

    describe('GET /api/word/[slug]', () => {
        it('should return 200 and the word if slug matches', async () => {
            vi.mocked(db.getWordBySlug).mockResolvedValue(mockWord as any);

            const req = new Request('http://localhost:3000/api/word/coffee');
            const response = await getSlug(req, { params: Promise.resolve({ slug: 'coffee' }) });
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.word).toBe('Coffee');
            expect(db.getWordBySlug).toHaveBeenCalledWith('coffee');
        });

        it('should return 404 if slug not found', async () => {
            vi.mocked(db.getWordBySlug).mockResolvedValue(null);

            const req = new Request('http://localhost:3000/api/word/unknown');
            const response = await getSlug(req, { params: Promise.resolve({ slug: 'unknown' }) });

            expect(response.status).toBe(404);
        });
    });
});

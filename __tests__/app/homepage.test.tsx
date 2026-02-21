/**
 * Component tests for Homepage (app/page.tsx)
 *
 * Tests the Server Component homepage which calls getWordByDate() directly
 * and dispatches to full-page visualization components.
 *
 * Strategy: Mock the db module to control what getWordByDate returns.
 * Since Home is an async Server Component, we await its rendering.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';

// Mock the db module
vi.mock('@/src/lib/db', () => ({
    getWordByDate: vi.fn(),
    getTodayDateString: vi.fn(() => '2026-02-20'),
}));

// Mock next/navigation hooks used by child pages
vi.mock('next/navigation', () => ({
    useSearchParams: () => new URLSearchParams(),
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
    }),
}));

// Import mocked module for test control
import { getWordByDate, getTodayDateString } from '@/src/lib/db';

/** Factory for a valid DailyWord */
function createMockWord(overrides?: Record<string, unknown>): Record<string, unknown> {
    return {
        id: 1,
        publish_date: '2026-02-14',
        word: 'Sabotage',
        definition: 'Deliberately destroy or damage something.',
        phonetic: '/ˈsæbətɑːʒ/',
        pronunciation_audio_url: null,
        visualization_type: 'TIMELINE',
        content_json: {
            hook: 'From wooden shoes to cyber attacks.',
            fun_fact: 'Workers threw sabots (shoes) into machinery.',
            visual_data: {
                type: 'TIMELINE',
                epochs: [
                    {
                        order: 1,
                        era: '1800s',
                        term: 'Sabot',
                        meaning: 'Wooden shoe.',
                        sentiment: 'neutral',
                    }
                ]
            },
        },
        accent_color: '#FF5733',
        created_at: '2026-02-14T00:00:00.000Z',
        approved_by: 'jigar',
        root_family: null,
        ...overrides,
    };
}

describe('Homepage', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        // Reset mocks to default
        vi.mocked(getTodayDateString).mockReturnValue('2026-02-20');
    });

    it('renders word data after successful DB fetch', async () => {
        const mockWord = createMockWord();
        vi.mocked(getWordByDate).mockResolvedValue(mockWord as never);

        // Home is async — get the JSX and render it
        const jsx = await Home({ searchParams: Promise.resolve({}) });
        render(jsx);

        // The dispatcher routes TIMELINE type to TimelinePage (lazy loaded)
        await waitFor(() => {
            expect(screen.getByTestId('timeline-page')).toBeInTheDocument();
        });

        // TimelinePage renders the word and definition
        expect(screen.getByText('Sabotage')).toBeInTheDocument();
        expect(screen.getByText('Deliberately destroy or damage something.')).toBeInTheDocument();
    });

    it('renders empty state when no word found for today', async () => {
        vi.mocked(getWordByDate).mockResolvedValue(null);

        const jsx = await Home({ searchParams: Promise.resolve({}) });
        render(jsx);

        expect(screen.getByText('No Word Today')).toBeInTheDocument();
        expect(screen.getByText(/planting the seeds/i)).toBeInTheDocument();
    });

    it('renders error state for future date', async () => {
        vi.mocked(getTodayDateString).mockReturnValue('2026-02-20');

        const jsx = await Home({ searchParams: Promise.resolve({ date: '2026-12-31' }) });
        render(jsx);

        expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
        expect(screen.getByText('Cannot view future words.')).toBeInTheDocument();
    });

    it('uses date param when provided', async () => {
        const mockWord = createMockWord({ publish_date: '2026-02-10' });
        vi.mocked(getWordByDate).mockResolvedValue(mockWord as never);

        const jsx = await Home({ searchParams: Promise.resolve({ date: '2026-02-10' }) });
        render(jsx);

        expect(getWordByDate).toHaveBeenCalledWith('2026-02-10');
    });

    it('dispatches MAP type to MapPage', async () => {
        const mockWord = createMockWord({
            visualization_type: 'MAP',
            content_json: {
                hook: 'Test hook',
                fun_fact: 'Test fact',
                visual_data: {
                    type: 'MAP',
                    projection: 'orthographic',
                    points: [
                        {
                            order: 1,
                            location_name: 'Ethiopia',
                            coordinates: [9.145, 40.489],
                            era: '800 CE',
                            context: 'Origin story',
                        },
                        {
                            order: 2,
                            location_name: 'Arabia',
                            coordinates: [23.885, 45.079],
                            era: '900 CE',
                            context: 'Spread through trade',
                        },
                    ],
                    routes: [],
                },
            },
        });
        vi.mocked(getWordByDate).mockResolvedValue(mockWord as never);

        const jsx = await Home({ searchParams: Promise.resolve({}) });
        render(jsx);

        await waitFor(() => {
            expect(screen.getByTestId('map-page')).toBeInTheDocument();
        });
    });

    it('dispatches GRID type to GridPage', async () => {
        const mockWord = createMockWord({ visualization_type: 'GRID' });
        vi.mocked(getWordByDate).mockResolvedValue(mockWord as never);

        const jsx = await Home({ searchParams: Promise.resolve({}) });
        render(jsx);

        await waitFor(() => {
            expect(screen.getByTestId('grid-page')).toBeInTheDocument();
        });
    });

    it('dispatches TREE type to TreePage', async () => {
        const mockWord = createMockWord({ visualization_type: 'TREE' });
        vi.mocked(getWordByDate).mockResolvedValue(mockWord as never);

        const jsx = await Home({ searchParams: Promise.resolve({}) });
        render(jsx);

        await waitFor(() => {
            expect(screen.getByTestId('tree-page')).toBeInTheDocument();
        });
    });
});

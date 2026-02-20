/**
 * Component tests for Homepage (app/page.tsx)
 *
 * Tests the client-side homepage component which fetches from /api/word/today
 * and renders loading, success, 404, and error states.
 *
 * Strategy: Mock global.fetch to control API responses.
 * The new architecture dispatches to full-page components (MapPage, TimelinePage, etc.)
 * so success assertions check for the dispatched page's testid.
 */

import { describe, it, expect, vi, beforeEach, afterAll, type Mock } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '@/app/page';

// Mock next/navigation hooks used by Home and child pages
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

// Store the original fetch
const originalFetch = global.fetch;

/** Factory for a valid DailyWord API response */
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
            visual_data: {},
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
        global.fetch = vi.fn() as Mock;
    });

    afterAll(() => {
        global.fetch = originalFetch;
    });

    it('renders a loading skeleton on initial mount', () => {
        // Never resolve so we stay in loading state
        (global.fetch as Mock).mockReturnValue(new Promise(() => { }));

        render(<Home />);

        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(screen.getByLabelText('Loading today\'s word')).toBeInTheDocument();
    });

    it('renders word data after successful fetch', async () => {
        const mockWord = createMockWord();
        (global.fetch as Mock).mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockWord),
        });

        render(<Home />);

        // The dispatcher routes TIMELINE type to TimelinePage
        await waitFor(() => {
            expect(screen.getByTestId('timeline-page')).toBeInTheDocument();
        });

        // TimelinePage renders the word and definition
        expect(screen.getByText('Sabotage')).toBeInTheDocument();
        expect(screen.getByText('Deliberately destroy or damage something.')).toBeInTheDocument();
    });

    it('renders 404 empty state when API returns not found', async () => {
        (global.fetch as Mock).mockResolvedValue({
            ok: false,
            status: 404,
            json: () => Promise.resolve({ error: 'No word scheduled for today' }),
        });

        render(<Home />);

        await waitFor(() => {
            expect(screen.getByText('No Word Today')).toBeInTheDocument();
        });

        expect(screen.getByText(/planting the seeds/i)).toBeInTheDocument();
    });

    it('renders error state with retry button when API returns 500', async () => {
        (global.fetch as Mock).mockResolvedValue({
            ok: false,
            status: 500,
            json: () => Promise.resolve({ error: 'Internal server error' }),
        });

        render(<Home />);

        await waitFor(() => {
            expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
        });

        expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });

    it('retry button triggers a new fetch', async () => {
        // First call: 500 error
        (global.fetch as Mock).mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: () => Promise.resolve({ error: 'Internal server error' }),
        });

        render(<Home />);

        await waitFor(() => {
            expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
        });

        // Second call: success
        const mockWord = createMockWord();
        (global.fetch as Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockWord),
        });

        fireEvent.click(screen.getByRole('button', { name: /try again/i }));

        await waitFor(() => {
            expect(screen.getByText('Sabotage')).toBeInTheDocument();
        });

        expect(global.fetch).toHaveBeenCalledTimes(2);
    });
});

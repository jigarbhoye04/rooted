/**
 * Homepage — Server Component that fetches today's word
 * and dispatches to the correct full-page visualization.
 *
 * SSR: Data is fetched server-side, eliminating the client-side
 * /api/word/today fetch and the loading skeleton flash.
 *
 * Each visualization type gets its own dedicated page component:
 * MAP → MapPage | TREE → TreePage | TIMELINE → TimelinePage | GRID → GridPage
 */

import { Suspense, lazy } from 'react';
import { getWordByDate, getTodayDateString } from '@/src/lib/db';
import type { DailyWord } from '@/src/schemas/dailyWord';

// Lazy-loaded client components for each visualization type
const LazyMapPage = lazy(() => import('@/src/views/MapPage'));
const LazyTreePage = lazy(() => import('@/src/views/TreePage'));
const LazyTimelinePage = lazy(() => import('@/src/views/TimelinePage'));
const LazyGridPage = lazy(() => import('@/src/views/GridPage'));

interface HomePageProps {
    searchParams: Promise<{ date?: string; preview?: string }>;
}

export default async function Home({ searchParams }: HomePageProps): Promise<React.JSX.Element> {
    const params = await searchParams;
    const dateParam = params.date;
    const isPreview = params.preview === 'true';

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const today = getTodayDateString();

    let targetDate: string;

    if (dateParam && dateRegex.test(dateParam)) {
        // Prevent future dates (bypass when accessed from /preview page)
        if (dateParam > today && !isPreview) {
            return <ErrorState message="Cannot view future words." />;
        }
        targetDate = dateParam;
    } else {
        targetDate = today;
    }

    // Fetch word server-side — no client fetch needed
    const word = await getWordByDate(targetDate);

    if (!word) {
        return <EmptyState />;
    }

    // Dispatch to the correct full-page experience
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <WordPageDispatcher word={word} />
        </Suspense>
    );
}

/* ========================================
   Type Dispatcher
   ======================================== */

function WordPageDispatcher({ word }: { word: DailyWord }): React.JSX.Element {
    switch (word.visualization_type) {
        case 'MAP':
            return <LazyMapPage word={word} />;
        case 'TREE':
            return <LazyTreePage word={word} />;
        case 'TIMELINE':
            return <LazyTimelinePage word={word} />;
        case 'GRID':
            return <LazyGridPage word={word} />;
        default:
            return <FallbackPage word={word} />;
    }
}

/* ========================================
   Fallback Page (unknown type)
   ======================================== */

function FallbackPage({ word }: { word: DailyWord }): React.JSX.Element {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
            <div className="text-center max-w-md">
                <h1 className="text-5xl font-black text-text-primary mb-4">{word.word}</h1>
                {word.phonetic && (
                    <p className="text-lg text-muted italic mb-8">{word.phonetic}</p>
                )}
                <p className="text-xl text-text-secondary leading-relaxed">{word.definition}</p>
            </div>
        </section>
    );
}

/* ========================================
   Loading Skeleton
   ======================================== */

function LoadingSkeleton(): React.JSX.Element {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-6 py-16" role="status" aria-label="Loading today's word">
            <div className="w-full max-w-2xl">
                {/* Title skeleton */}
                <div className="flex justify-center mb-10">
                    <div className="h-4 w-32 rounded-full bg-neutral-100 animate-skeleton" />
                </div>
                <div className="flex flex-col items-center space-y-4 mb-16">
                    <div className="h-16 w-72 rounded-2xl bg-neutral-100 animate-skeleton" style={{ animationDelay: '100ms' }} />
                    <div className="h-5 w-40 rounded-lg bg-neutral-100 animate-skeleton" style={{ animationDelay: '200ms' }} />
                </div>

                {/* Definition card skeleton */}
                <div className="glass-card p-10 sm:p-12">
                    <div className="flex justify-end mb-6">
                        <div className="h-6 w-16 rounded-full bg-neutral-100 animate-skeleton" style={{ animationDelay: '300ms' }} />
                    </div>
                    <div className="space-y-3">
                        <div className="h-6 w-full rounded-lg bg-neutral-100 animate-skeleton" style={{ animationDelay: '400ms' }} />
                        <div className="h-6 w-4/5 rounded-lg bg-neutral-100 animate-skeleton" style={{ animationDelay: '500ms' }} />
                        <div className="h-6 w-3/5 rounded-lg bg-neutral-100 animate-skeleton" style={{ animationDelay: '600ms' }} />
                    </div>
                    <div className="mt-8 pt-8 border-t border-border-subtle">
                        <div className="h-4 w-full rounded-lg bg-neutral-100 animate-skeleton" style={{ animationDelay: '700ms' }} />
                        <div className="h-4 w-2/3 rounded-lg bg-neutral-100 animate-skeleton mt-2" style={{ animationDelay: '800ms' }} />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ========================================
   Empty State (404)
   ======================================== */

function EmptyState(): React.JSX.Element {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
            <div className="text-center max-w-md animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-warm-light flex items-center justify-center">
                    <span className="text-2xl" role="img" aria-label="seedling">🌱</span>
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-3">
                    No Word Today
                </h2>
                <p className="text-base text-muted leading-relaxed">
                    We&apos;re planting the seeds for tomorrow&apos;s word.
                    Check back soon for your daily etymology fix.
                </p>
            </div>
        </section>
    );
}

/* ========================================
   Error State (server-rendered)
   ======================================== */

function ErrorState({ message }: { message: string }): React.JSX.Element {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
            <div className="text-center max-w-md animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-error-light flex items-center justify-center">
                    <span className="text-2xl" role="img" aria-label="warning">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-3">
                    Something Went Wrong
                </h2>
                <p className="text-base text-muted leading-relaxed mb-8">
                    {message}
                </p>
            </div>
        </section>
    );
}

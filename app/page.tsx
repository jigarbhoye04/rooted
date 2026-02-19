'use client';

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import type { DailyWord } from '@/src/schemas/dailyWord';

/**
 * Homepage — fetches today's word and dispatches to the correct full-page experience
 *
 * Each visualization type gets its own dedicated page component:
 * MAP → MapPage | TREE → TreePage | TIMELINE → TimelinePage | GRID → GridPage
 */

const LazyMapPage = lazy(() => import('@/src/pages/MapPage'));
const LazyTreePage = lazy(() => import('@/src/pages/TreePage'));
const LazyTimelinePage = lazy(() => import('@/src/pages/TimelinePage'));
const LazyGridPage = lazy(() => import('@/src/pages/GridPage'));

type PageState =
    | { status: 'loading' }
    | { status: 'success'; word: DailyWord }
    | { status: 'not-found' }
    | { status: 'error'; message: string };

export default function Home(): React.JSX.Element {
    const [state, setState] = useState<PageState>({ status: 'loading' });

    const searchParams = useSearchParams();
    const dateParam = searchParams.get('date');

    const fetchWord = useCallback(async (): Promise<void> => {
        setState({ status: 'loading' });

        try {
            // Build URL with optional date param
            let url = '/api/word/today';
            if (dateParam) {
                url += `?date=${dateParam}`;
            }

            const response = await fetch(url);

            if (response.status === 404) {
                setState({ status: 'not-found' });
                return;
            }

            if (response.status === 400) { // Future date error
                setState({
                    status: 'error',
                    message: 'Cannot view future words.',
                });
                return;
            }

            if (!response.ok) {
                setState({
                    status: 'error',
                    message: 'Something went wrong. Please try again.',
                });
                return;
            }

            const word: DailyWord = await response.json();
            setState({ status: 'success', word });
        } catch {
            setState({
                status: 'error',
                message: 'Unable to connect. Check your internet and try again.',
            });
        }
    }, [dateParam]);

    useEffect(() => {
        void fetchWord();
    }, [fetchWord]);

    if (state.status === 'loading') {
        return <LoadingSkeleton />;
    }

    if (state.status === 'not-found') {
        return <EmptyState />;
    }

    if (state.status === 'error') {
        return <ErrorState message={state.message} onRetry={fetchWord} />;
    }

    // Dispatch to the correct full-page experience based on visualization type
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <WordPageDispatcher word={state.word} />
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
        <section className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
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
   Error State (500 / network)
   ======================================== */

function ErrorState({
    message,
    onRetry,
}: {
    message: string;
    onRetry: () => void;
}): React.JSX.Element {
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
                <button
                    onClick={onRetry}
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent-warm rounded-full hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-md shadow-accent-warm/20"
                >
                    Try Again
                </button>
            </div>
        </section>
    );
}

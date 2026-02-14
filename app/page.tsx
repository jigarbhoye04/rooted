'use client';

import { useState, useEffect, useCallback } from 'react';
import type { DailyWord } from '@/src/schemas/dailyWord';

type PageState =
    | { status: 'loading' }
    | { status: 'success'; word: DailyWord }
    | { status: 'not-found' }
    | { status: 'error'; message: string };

export default function Home(): React.JSX.Element {
    const [state, setState] = useState<PageState>({ status: 'loading' });

    const fetchWord = useCallback(async (): Promise<void> => {
        setState({ status: 'loading' });

        try {
            const response = await fetch('/api/word/today');

            if (response.status === 404) {
                setState({ status: 'not-found' });
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
    }, []);

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

    return <WordDisplay word={state.word} />;
}

/* ========================================
   Word Display
   ======================================== */

function WordDisplay({ word }: { word: DailyWord }): React.JSX.Element {
    const formattedDate = formatDate(word.publish_date);

    return (
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 py-16">
            <div className="w-full max-w-2xl animate-fade-in">
                {/* Date badge */}
                <div className="flex justify-center mb-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase rounded-full bg-accent-warm-light text-accent-warm">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-warm animate-pulse" />
                        {formattedDate}
                    </span>
                </div>

                {/* Word title */}
                <h1
                    className="text-6xl sm:text-7xl md:text-8xl font-black text-center tracking-tight text-text-primary mb-4"
                    style={{ animationDelay: '100ms' }}
                >
                    {word.word}
                </h1>

                {/* Phonetic */}
                {word.phonetic && (
                    <p className="text-center text-lg text-muted italic mb-12 animate-slide-up-subtle" style={{ animationDelay: '200ms' }}>
                        {word.phonetic}
                    </p>
                )}

                {/* Definition card */}
                <div
                    className="glass-card-elevated p-10 sm:p-12 mb-8 relative overflow-hidden opacity-0 animate-slide-up"
                    style={{ animationDelay: '300ms' }}
                >
                    {/* Accent bar */}
                    <div
                        className="absolute top-0 left-0 w-full h-1"
                        style={{ backgroundColor: word.accent_color }}
                    />

                    {/* Viz type badge */}
                    <div className="flex justify-end mb-6">
                        <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border border-border text-muted">
                            {word.visualization_type}
                        </span>
                    </div>

                    <p className="text-xl sm:text-2xl leading-relaxed text-text-secondary font-medium">
                        {word.definition}
                    </p>

                    {/* Hook / Quick Insight */}
                    {word.content_json?.hook && (
                        <div className="mt-8 pt-8 border-t border-border-subtle">
                            <h3 className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-3">
                                Quick Insight
                            </h3>
                            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                                {word.content_json.hook}
                            </p>
                        </div>
                    )}
                </div>

                {/* Fun fact teaser */}
                {word.content_json?.fun_fact && (
                    <div
                        className="glass-card p-8 opacity-0 animate-slide-up"
                        style={{ animationDelay: '500ms' }}
                    >
                        <h3 className="text-[10px] font-bold text-accent-gold uppercase tracking-[0.2em] mb-3">
                            Did You Know?
                        </h3>
                        <p className="text-base text-text-secondary leading-relaxed">
                            {word.content_json.fun_fact}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

/* ========================================
   Loading Skeleton
   ======================================== */

function LoadingSkeleton(): React.JSX.Element {
    return (
        <section
            className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 py-16"
            aria-label="Loading today's word"
            role="status"
        >
            <div className="w-full max-w-2xl">
                {/* Date badge skeleton */}
                <div className="flex justify-center mb-10">
                    <div className="h-7 w-40 rounded-full bg-neutral-200 animate-skeleton" />
                </div>

                {/* Word skeleton */}
                <div className="flex justify-center mb-4">
                    <div className="h-16 sm:h-20 w-72 sm:w-96 rounded-2xl bg-neutral-200 animate-skeleton" />
                </div>

                {/* Phonetic skeleton */}
                <div className="flex justify-center mb-12">
                    <div className="h-5 w-32 rounded-full bg-neutral-100 animate-skeleton" style={{ animationDelay: '200ms' }} />
                </div>

                {/* Card skeleton */}
                <div className="glass-card-elevated p-10 sm:p-12">
                    <div className="flex justify-end mb-6">
                        <div className="h-6 w-20 rounded-full bg-neutral-100 animate-skeleton" style={{ animationDelay: '100ms' }} />
                    </div>
                    <div className="space-y-3">
                        <div className="h-5 w-full rounded-lg bg-neutral-200 animate-skeleton" style={{ animationDelay: '300ms' }} />
                        <div className="h-5 w-5/6 rounded-lg bg-neutral-200 animate-skeleton" style={{ animationDelay: '400ms' }} />
                        <div className="h-5 w-3/4 rounded-lg bg-neutral-200 animate-skeleton" style={{ animationDelay: '500ms' }} />
                    </div>

                    <div className="mt-8 pt-8 border-t border-border-subtle">
                        <div className="h-3 w-24 rounded bg-neutral-100 animate-skeleton mb-3" style={{ animationDelay: '600ms' }} />
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
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 py-16">
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
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 py-16">
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

/* ========================================
   Helpers
   ======================================== */

function formatDate(dateString: string): string {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

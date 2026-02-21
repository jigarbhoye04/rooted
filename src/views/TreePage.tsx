'use client';

/**
 * TreePage — Full-page TREE visualization experience
 *
 * Displays an etymological hierarchy using d3-hierarchy and a split layout.
 */

import { useState, useCallback, lazy, Suspense, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import type { DailyWord } from '@/src/schemas/dailyWord';
import { VisualizationDataSchema } from '@/src/schemas/visualizerData';
import type { TreeVisualizationData } from '@/src/schemas/visualizerData';
import { useTreeTimeline } from '@/src/hooks/useTreeTimeline';

const LazyTreeVisualizer = lazy(() => import('@/src/components/TreeVisualizer'));
const LazyTreePlaybackControls = lazy(() => import('@/src/components/TreePlaybackControls'));
const LazyTreeSidebar = lazy(() => import('@/src/components/TreeSidebar'));

/* ========================================
   Types
   ======================================== */

interface TreePageProps {
    word: DailyWord;
}

/* ========================================
   Component
   ======================================== */

export default function TreePage({ word }: TreePageProps): React.JSX.Element {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [history, setHistory] = useState<Array<{ date: string; word: string }>>([]);
    const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const controller = new AbortController();

        // Fetch recent tree history with abort support
        fetch('/api/word/history?type=TREE&limit=30', { signal: controller.signal })
            .then(res => res.ok ? res.json() : [])
            .then(data => setHistory(data))
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.error('Failed to load history:', err);
                }
            });

        return () => {
            controller.abort();
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        };
    }, []);

    // Dropdown handlers with delay
    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setShowHistoryDropdown(true);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setShowHistoryDropdown(false);
        }, 300);
    };

    // Validate visual_data
    const treeData = useMemo(() => {
        const parsed = VisualizationDataSchema.safeParse(word.content_json?.visual_data);
        return parsed.success && parsed.data.type === 'TREE'
            ? (parsed.data as TreeVisualizationData)
            : null;
    }, [word.content_json?.visual_data]);

    // Generate linear steps from Tree
    const steps = useTreeTimeline(treeData?.root);
    const totalSteps = steps.length;

    const handleStepChange = useCallback((index: number): void => {
        const clamped = Math.max(0, Math.min(index, totalSteps - 1));
        setActiveStepIndex(clamped);
    }, [totalSteps]);

    // Navigation Handlers
    const currentDate = word.publish_date;
    const today = new Date().toISOString().split('T')[0];
    const isToday = currentDate === today;

    const currentIndex = history.findIndex(h => h.date === currentDate);

    const prevTarget = currentIndex !== -1 && currentIndex + 1 < history.length
        ? history[currentIndex + 1]
        : history.find(h => h.date < currentDate);

    const nextTarget = currentIndex !== -1 && currentIndex - 1 >= 0
        ? history[currentIndex - 1]
        : null;

    const handlePrev = () => {
        if (prevTarget) {
            router.push(`/?date=${prevTarget.date}`);
        }
    };

    const handleNext = () => {
        if (nextTarget) {
            router.push(`/?date=${nextTarget.date}`);
        }
    };

    const handleToday = () => {
        router.push('/');
    };

    const headerExtras = mounted ? document.getElementById('header-center-portal') : null;

    if (!treeData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-muted text-sm">Unable to load tree data.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-[#FDFCF9]" data-testid="tree-page">
            {/* Header Portal Content */}
            {headerExtras && createPortal(
                <div className="flex items-center gap-4 animate-in fade-in duration-500 relative pointer-events-auto">
                    <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest text-[#FDFCF9] bg-[#1A1A1A] rounded-sm uppercase">
                        TREE
                    </span>

                    {/* Date Badge with Dropdown */}
                    <div
                        className="relative group"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ paddingBottom: '20px', marginBottom: '-20px' }}
                    >
                        <div className="flex flex-col cursor-pointer">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-[#1A1A1A] uppercase opacity-40 font-mono hover:opacity-100 transition-opacity">
                                {formatDate(word.publish_date)} ▼
                            </span>
                            <span className="text-[8px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity absolute top-full left-0 mt-0.5 whitespace-nowrap" style={{ color: word.accent_color }}>
                                View History
                            </span>
                        </div>

                        {showHistoryDropdown && history.length > 0 && (
                            <div
                                className="absolute top-full left-0 w-56 bg-white border border-[#E9E4D9] shadow-2xl rounded-md z-[9999]"
                                style={{ transform: 'translateX(-10%)' }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="px-3 py-2 border-b border-[#E9E4D9] bg-[#FDFCF9]">
                                    <span className="text-[9px] font-bold tracking-widest text-[#8C8577] uppercase">Recent Trees</span>
                                </div>
                                <div className="max-h-[300px] overflow-y-auto">
                                    {history.map((h) => (
                                        <button
                                            key={h.date}
                                            onClick={() => {
                                                router.push(`/?date=${h.date}`);
                                                setShowHistoryDropdown(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-xs font-mono hover:bg-[#F5F3EE] transition-colors flex justify-between items-center group/item ${h.date === currentDate ? 'bg-[#F5F3EE]' : ''}`}
                                        >
                                            <span className={`${h.date === currentDate ? 'font-bold text-black' : 'text-[#5D5D5D]'}`}>{h.date}</span>
                                            <span className={`truncate ml-2 max-w-[90px] text-[9px] uppercase tracking-wide font-sans ${h.date === currentDate ? 'opacity-100' : 'opacity-60 group-hover/item:opacity-100'}`}>
                                                {h.word}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>,
                headerExtras
            )}

            {/* ---- Header Bar ---- */}
            <header
                className="flex items-center justify-between px-5 py-3 shrink-0 z-20 relative"
                style={{
                    borderBottom: '1px solid #E9E4D9',
                    backgroundColor: '#FDFCF9',
                }}
            >
                <div className="flex items-center gap-4">
                    <div className="flex items-baseline gap-2">
                        <h1
                            className="text-2xl sm:text-3xl font-black tracking-tight leading-none"
                            style={{ color: '#1A1A1A' }}
                        >
                            {word.word}
                        </h1>
                        {word.phonetic && (
                            <span className="text-sm italic font-serif text-muted" style={{ color: '#8C8577' }}>
                                {word.phonetic}
                            </span>
                        )}
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-3 ml-6 border-l border-[#E9E4D9] pl-6 max-w-2xl">
                    <span className="text-[12px] font-bold tracking-widest text-[#8C8577] uppercase shrink-0">
                        CURRENT_MEANING:
                    </span>
                    <p className="text-sm font-medium text-[#1A1A1A] leading-tight">
                        {word.definition}
                    </p>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                    <div className="hidden sm:flex items-center gap-1 mr-4 border-r border-[#E9E4D9] pr-4">
                        <button
                            onClick={handlePrev}
                            disabled={!prevTarget}
                            className={`p-1 rounded-md transition-colors ${!prevTarget ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#E9E4D9] text-[#1A1A1A]'}`}
                            title={prevTarget ? `Previous Tree: ${prevTarget.word}` : 'No earlier trees'}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        </button>

                        {!isToday && (
                            <button
                                onClick={handleToday}
                                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider hover:bg-[#E9E4D9] rounded-sm transition-colors text-[#8C8577]"
                                title="Go to Today"
                            >
                                TODAY
                            </button>
                        )}

                        <button
                            onClick={handleNext}
                            disabled={!nextTarget && isToday}
                            className={`p-1 rounded-md transition-colors ${(!nextTarget && isToday) ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#E9E4D9] text-[#1A1A1A]'}`}
                            title={nextTarget ? `Next Tree: ${nextTarget.word}` : 'No newer trees'}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => setSidebarOpen((prev) => !prev)}
                        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                        className="hover:bg-neutral-100 active:scale-95 transition-all"
                        style={{
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: sidebarOpen ? '#1A1A1A' : 'transparent',
                            color: sidebarOpen ? '#FFFFFF' : '#1A1A1A',
                            border: '1px solid #1A1A1A',
                            borderRadius: 4,
                            cursor: 'pointer',
                        }}
                    >
                        {sidebarOpen ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                        )}
                    </button>
                </div>
            </header>

            {/* ---- Main Content ---- */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Tree + Controls */}
                <div className="flex-1 w-full relative flex flex-col min-w-0">
                    <div className="flex-1 overflow-hidden relative">
                        <Suspense fallback={<TreeLoadingPlaceholder />}>
                            {totalSteps > 0 && (
                                <LazyTreeVisualizer
                                    data={treeData}
                                    steps={steps}
                                    accentColor={word.accent_color}
                                    activeStepIndex={activeStepIndex}
                                />
                            )}
                        </Suspense>
                    </div>

                    {/* Playback Controls */}
                    <div className="absolute top-6 right-6 z-10 flex justify-end pointer-events-none">
                        <div className="pointer-events-auto">
                            <Suspense fallback={null}>
                                {totalSteps > 0 && (
                                    <LazyTreePlaybackControls
                                        totalSteps={totalSteps}
                                        activeStepIndex={activeStepIndex}
                                        onStepChange={handleStepChange}
                                    />
                                )}
                            </Suspense>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div
                    className={`
                        absolute inset-y-0 right-0 z-20 sm:static sm:z-0
                        w-full sm:w-[420px] shrink-0
                        bg-[#FDFCF9] border-l border-[#E9E4D9]
                        transform transition-transform duration-300 ease-in-out
                        ${sidebarOpen ? 'translate-x-0 shadow-xl sm:shadow-none' : 'translate-x-full sm:hidden'} 
                    `}
                    style={{
                        height: '100%',
                        willChange: 'transform',
                    }}
                >
                    <Suspense fallback={null}>
                        <div className="h-full overflow-hidden">
                            {totalSteps > 0 && (
                                <LazyTreeSidebar
                                    steps={steps}
                                    word={word.word}
                                    definition={word.definition}
                                    phonetic={word.phonetic ?? undefined}
                                    accentColor={word.accent_color}
                                    activeStepIndex={activeStepIndex}
                                    hook={word.content_json?.hook}
                                    funFact={word.content_json?.fun_fact}
                                    nerdMode={word.content_json?.nerd_mode}
                                    onClose={() => setSidebarOpen(false)}
                                    onJumpToStep={handleStepChange}
                                />
                            )}
                        </div>
                    </Suspense>
                </div>

                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div
                        className="absolute inset-0 bg-black/20 z-10 sm:hidden backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </div>
        </div >
    );
}

function TreeLoadingPlaceholder(): React.JSX.Element {
    return (
        <div className="flex items-center justify-center h-full w-full" style={{ backgroundColor: '#FDFCF9' }}>
            <div className="text-center">
                <div
                    className="w-8 h-8 mx-auto mb-3 rounded-full animate-pulse"
                    style={{ backgroundColor: '#1A1A1A' }}
                />
                <p
                    className="text-[10px] uppercase tracking-widest font-bold"
                    style={{
                        color: '#1A1A1A',
                        fontFamily: "'Courier New', Courier, monospace",
                    }}
                >
                    LOADING_TREE_DATA...
                </p>
            </div>
        </div>
    );
}

function formatDate(dateString: string): string {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

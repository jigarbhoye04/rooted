import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import type { TimelineVisualizationData } from '@/src/schemas/visualizerData';
import type { DailyWord } from '@/src/schemas/dailyWord';
import { TimelineRail } from './TimelineRail';
import { TimelineCard } from './TimelineCard';
import { NewspaperRail } from './NewspaperRail';
import { NewspaperCard } from './NewspaperCard';
import { Manrope, Playfair_Display, Space_Mono } from 'next/font/google';
import { useTimelineStyle } from '@/src/hooks/useTimelineStyle';
import clsx from 'clsx';

// Scoped Fonts
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-playfair' });
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-spacemono' });

/** Resolved palette — always has all 5 colors */
export interface ResolvedPalette {
    primary: string;
    secondary: string;
    muted: string;
    surface: string;
    text: string;
}

/** Build a full palette from DB data, with sensible fallbacks */
function resolvePalette(word: DailyWord): ResolvedPalette {
    const p = word.content_json?.palette;
    const fallback = word.accent_color ?? '#8E694F';

    if (p?.primary && p?.secondary && p?.muted && p?.surface && p?.text) {
        return p as ResolvedPalette;
    }

    return {
        primary: fallback,
        secondary: `${fallback}CC`,
        muted: '#D5CFC3',
        surface: '#FAF2E8',
        text: '#1A1A1A',
    };
}

interface TimelineVisualizerProps {
    word: DailyWord;
    data: TimelineVisualizationData;
}

export default function TimelineVisualizer({ word, data }: TimelineVisualizerProps): React.JSX.Element {
    const epochs = data.epochs.sort((a, b) => a.order - b.order);
    const palette = resolvePalette(word);

    // Style Toggle Hook
    const [timelineStyle, setTimelineStyle] = useTimelineStyle();
    const isNewspaper = timelineStyle === 'NEWSPAPER';

    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const svgOverlayRef = useRef<SVGSVGElement>(null);
    const curvePathRef = useRef<SVGPathElement>(null);

    // ── Intersection Observer ───────────────────────────────────────
    useEffect(() => {
        const obsOptions = {
            root: scrollContainerRef.current,
            rootMargin: '-30% 0px -30% 0px',
            threshold: 0.1
        };

        const callback: IntersectionObserverCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idxStr = (entry.target as HTMLElement).dataset.index;
                    if (idxStr !== undefined) {
                        setActiveIndex(parseInt(idxStr, 10));
                    }
                }
            });
        };

        const observer = new IntersectionObserver(callback, obsOptions);
        const currentCards = cardsRef.current;
        currentCards.forEach(card => { if (card) observer.observe(card); });

        return () => {
            currentCards.forEach(card => { if (card) observer.unobserve(card); });
            observer.disconnect();
        };
    }, [epochs, timelineStyle]);

    // ── SVG Bezier Curve ────────────────────────────────────────────
    const drawCurve = useCallback(() => {
        if (isNewspaper) return; // No curves in newspaper mode

        const activeDot = dotsRef.current[activeIndex];
        const activeCard = cardsRef.current[activeIndex];
        const svgGroup = svgOverlayRef.current;
        const path = curvePathRef.current;

        if (!activeDot || !activeCard || !svgGroup || !path) return;

        const anchorNode = activeCard.querySelector('.card-anchor');
        if (!anchorNode) return;

        const dotRect = activeDot.getBoundingClientRect();
        const anchorRect = anchorNode.getBoundingClientRect();
        const svgRect = svgGroup.getBoundingClientRect();

        const startX = 0;
        const startY = (dotRect.top + dotRect.height / 2) - svgRect.top;
        const endX = anchorRect.left - svgRect.left;
        const endY = (anchorRect.top + anchorRect.height / 2) - svgRect.top;

        const distanceX = Math.abs(endX - startX);
        const controlX1 = startX + distanceX * 0.4;
        const controlX2 = endX - distanceX * 0.4;

        const d = `M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`;
        path.setAttribute('d', d);
    }, [activeIndex, isNewspaper]);

    useLayoutEffect(() => {
        const container = scrollContainerRef.current;
        const handleUpdate = (): void => { requestAnimationFrame(drawCurve); };

        container?.addEventListener('scroll', handleUpdate, { passive: true });
        window.addEventListener('resize', handleUpdate);
        handleUpdate();

        const timeouts = [50, 200, 500].map(t => setTimeout(handleUpdate, t));
        return () => {
            container?.removeEventListener('scroll', handleUpdate);
            window.removeEventListener('resize', handleUpdate);
            timeouts.forEach(clearTimeout);
        };
    }, [drawCurve, timelineStyle]);

    // ── Render ──────────────────────────────────────────────────────
    return (
        <section
            ref={containerRef}
            className={clsx(
                'text-[#1A1A1A] h-full flex flex-col overflow-hidden w-full relative',
                manrope.variable, playfair.variable, spaceMono.variable, 'font-sans',
                isNewspaper ? 'bg-[#EAE6D9]' : 'bg-[#FDFCF9]'
            )}
        >
            {/* Scoped styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .dash-animate { stroke-dasharray: 6, 6; animation: dash 20s linear infinite; }
                @keyframes dash { to { stroke-dashoffset: -1000; } }

                .papery-bg {
                    background-color: #FDFCF9;
                    background-image:
                        url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
                }
                
                .newspaper-bg {
                    background-color: #EAE6D9;
                    background-image: linear-gradient(to bottom, transparent, rgba(234, 230, 217, 0.8));
                }

                .timeline-scroll::-webkit-scrollbar { width: 4px; }
                .timeline-scroll::-webkit-scrollbar-track { background: transparent; }
                .timeline-scroll::-webkit-scrollbar-thumb { background: ${isNewspaper ? '#8C867B' : palette.muted}; border-radius: 999px; }
                .timeline-scroll::-webkit-scrollbar-thumb:hover { background: ${isNewspaper ? '#4A4740' : palette.secondary}; }
                .timeline-scroll { scrollbar-width: thin; scrollbar-color: ${isNewspaper ? '#8C867B' : palette.muted} transparent; }
            `}} />

            <div className="flex flex-1 overflow-hidden relative w-full h-full">

                {/* Left Rail */}
                {isNewspaper ? (
                    <NewspaperRail
                        epochs={epochs}
                        activeIndex={activeIndex}
                        palette={palette}
                        dotsRef={dotsRef}
                        onDotClick={(idx: number) => {
                            const target = cardsRef.current[idx];
                            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                    />
                ) : (
                    <TimelineRail
                        epochs={epochs}
                        activeIndex={activeIndex}
                        palette={palette}
                        dotsRef={dotsRef}
                        onDotClick={(idx: number) => {
                            const target = cardsRef.current[idx];
                            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                    />
                )}

                {/* SVG Connector (Hidden in Newspaper Mode) */}
                <svg
                    ref={svgOverlayRef}
                    className={clsx(
                        "absolute top-0 bottom-0 left-16 md:left-20 w-[calc(100%-4rem)] md:w-[calc(100%-5rem)] h-full pointer-events-none z-10 transition-opacity duration-300",
                        isNewspaper ? "opacity-0" : "opacity-100"
                    )}
                >
                    <path
                        ref={curvePathRef}
                        id="curve-path"
                        d=""
                        fill="none"
                        className="dash-animate"
                        stroke={palette.secondary}
                        strokeWidth="1.5"
                        opacity="0.6"
                        style={{ transition: 'd 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                </svg>

                {/* Center Stage */}
                <main
                    ref={scrollContainerRef}
                    className={clsx(
                        "flex-1 overflow-y-auto overflow-x-hidden relative h-full scroll-smooth timeline-scroll",
                        isNewspaper ? "newspaper-bg" : "papery-bg"
                    )}
                >
                    {/* Floating Style Toggle — top-right of canvas */}
                    <div className="sticky top-4 z-30 flex justify-end px-4 pointer-events-none">
                        <div className="pointer-events-auto flex bg-[#ECEAE6] rounded-full p-[3px] shadow-sm border border-[#D5CFC3]">
                            <button
                                onClick={() => setTimelineStyle('MUSEUM')}
                                title="Chronology view"
                                aria-label="Switch to Chronology view"
                                className={clsx(
                                    "w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200",
                                    !isNewspaper
                                        ? "bg-white text-[#1A1A1A] shadow-sm"
                                        : "text-[#8C867B] hover:text-[#1A1A1A]"
                                )}
                            >
                                <span className="material-symbols-outlined text-[16px]">timeline</span>
                            </button>
                            <button
                                onClick={() => setTimelineStyle('NEWSPAPER')}
                                title="Newspaper view"
                                aria-label="Switch to Newspaper view"
                                className={clsx(
                                    "w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200",
                                    isNewspaper
                                        ? "bg-white text-[#1A1A1A] shadow-sm"
                                        : "text-[#8C867B] hover:text-[#1A1A1A]"
                                )}
                            >
                                <span className="material-symbols-outlined text-[16px]">newspaper</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Word Header */}
                    <div className="flex flex-col items-center justify-center pt-16 pb-8 px-6 w-full max-w-4xl mx-auto relative z-20">

                        {/* Centered Word Header */}
                        <div className="text-center font-sans mt-4">
                            <span
                                className="inline-block px-5 py-2 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full mb-8 relative z-10"
                                style={{ backgroundColor: palette.surface, color: palette.primary }}
                            >
                                Word of the day
                            </span>
                            <h1 className="text-6xl md:text-[6rem] font-black text-[#1A1A1A] tracking-tighter mb-6 font-sans leading-none uppercase">
                                {word.word}
                            </h1>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[#8C867B] text-[20px] md:text-[22px] mb-10 font-serif lowercase">
                                {word.phonetic && <span className="italic">{word.phonetic}</span>}
                                {word.phonetic && word.content_json?.part_of_speech && <span className="hidden md:inline text-[#D5CFC3]">•</span>}
                                {word.content_json?.part_of_speech && <span className="italic">{word.content_json.part_of_speech}</span>}
                            </div>
                            <p className="text-[18px] md:text-[21px] text-[#4A4740] max-w-2xl mx-auto leading-relaxed font-sans font-medium">
                                {word.definition}
                            </p>
                            {word.content_json?.nerd_mode?.earliest_citation && (
                                <div className="mt-8 pt-6 border-t border-[#D5CFC3] max-w-2xl mx-auto">
                                    <p className="text-[12px] font-mono uppercase tracking-widest text-[#8C867B] mb-2">Earliest Citation</p>
                                    <p className="text-[15px] italic leading-relaxed font-serif" style={{ color: palette.primary }}>
                                        &quot;{word.content_json.nerd_mode.earliest_citation}&quot;
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="max-w-4xl mt-24 mb-64 px-12 md:px-16 flex flex-col gap-28 relative mx-auto w-full">

                        {/* Navigation Arrows Panel — fixed inside canvas centered */}
                        <div className="hidden xl:flex fixed z-30 flex-col gap-1 bg-[#ECEAE6] rounded-full p-[2px] shadow-sm border border-[#D5CFC3]" style={{ right: '19rem', top: '50%', transform: 'translateY(-50%)' }}>
                            <button
                                onClick={() => {
                                    const prevIdx = Math.max(0, activeIndex - 1);
                                    const target = cardsRef.current[prevIdx];
                                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}
                                disabled={activeIndex === 0}
                                title="Previous card"
                                aria-label="Go to previous card"
                                className={clsx(
                                    "w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200",
                                    activeIndex === 0
                                        ? "text-[#D5CFC3] cursor-not-allowed opacity-50"
                                        : "text-[#1A1A1A] hover:bg-white shadow-sm"
                                )}
                            >
                                <span className="material-symbols-outlined text-[14px]">expand_less</span>
                            </button>
                            <button
                                onClick={() => {
                                    const nextIdx = Math.min(epochs.length - 1, activeIndex + 1);
                                    const target = cardsRef.current[nextIdx];
                                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}
                                disabled={activeIndex === epochs.length - 1}
                                title="Next card"
                                aria-label="Go to next card"
                                className={clsx(
                                    "w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200",
                                    activeIndex === epochs.length - 1
                                        ? "text-[#D5CFC3] cursor-not-allowed opacity-50"
                                        : "text-[#1A1A1A] hover:bg-white shadow-sm"
                                )}
                            >
                                <span className="material-symbols-outlined text-[14px]">expand_more</span>
                            </button>
                        </div>

                        {/* Render Timeline Cards */}
                        {epochs.map((epoch, idx: number) => {
                            const isAlt = idx % 2 !== 0;
                            const isFirst = idx === 0;
                            const isLast = idx === epochs.length - 1;

                            if (isNewspaper) {
                                return (
                                    <NewspaperCard
                                        key={epoch.order}
                                        epoch={epoch}
                                        index={idx}
                                        isActive={activeIndex === idx}
                                        isAlternate={isAlt}
                                        isFirst={isFirst}
                                        isLast={isLast}
                                        palette={palette}
                                        ref={(el: HTMLDivElement | null) => { cardsRef.current[idx] = el; }}
                                    />
                                );
                            }

                            return (
                                <TimelineCard
                                    key={epoch.order}
                                    epoch={epoch}
                                    index={idx}
                                    isActive={activeIndex === idx}
                                    isAlternate={isAlt}
                                    isFirst={isFirst}
                                    isLast={isLast}
                                    palette={palette}
                                    ref={(el: HTMLDivElement | null) => { cardsRef.current[idx] = el; }}
                                />
                            );
                        })}
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className={clsx(
                    "hidden xl:flex w-[280px] shrink-0 border-l h-full relative z-20 flex-col font-sans",
                    isNewspaper ? "bg-[#F4F1E8] border-[#8C867B]" : "shadow-inner border-[#e3e0de]"
                )} style={{ backgroundColor: isNewspaper ? '#F4F1E8' : palette.surface }}>
                    <div className={clsx("p-6 border-b", isNewspaper ? "border-[#8C867B]" : "border-[#e3e0de]")}
                        style={{ backgroundColor: isNewspaper ? '#EAE6D9' : `${palette.muted}30` }}>
                        <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-1 text-[#1A1A1A]">
                            Curator&apos;s Notes
                        </h3>
                        {word.publish_date && (
                            <p className="text-[11px] text-[#1A1A1A]">
                                Updated: <span style={{ color: palette.primary }}>{new Date(word.publish_date).toLocaleDateString()}</span>
                            </p>
                        )}
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {word.content_json?.hook && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2" style={{ color: isNewspaper ? '#4A4740' : palette.primary }}>
                                    <span className="material-symbols-outlined text-sm">tips_and_updates</span>
                                    <span className="text-[11px] font-bold uppercase tracking-wider">Historical Hook</span>
                                </div>
                                <div className={clsx("p-4 rounded-md", isNewspaper ? "bg-[#EAE6D9] border-y border-[#8C867B]" : "bg-white shadow-sm border border-[#e3e0de]")}>
                                    <p className="text-[13px] font-serif italic leading-relaxed"
                                        style={{ color: isNewspaper ? '#1D1B19' : palette.text }}>
                                        &quot;{word.content_json.hook}&quot;
                                    </p>
                                </div>
                            </div>
                        )}
                        {word.content_json?.fun_fact && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2" style={{ color: isNewspaper ? '#4A4740' : palette.secondary }}>
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="text-[11px] font-bold uppercase tracking-wider">Fun Fact</span>
                                </div>
                                <div className={clsx("p-4 relative overflow-hidden", isNewspaper ? "border-y border-[#8C867B] bg-[#EAE6D9]" : "bg-white rounded-md shadow-sm border border-[#e3e0de]")}>
                                    {!isNewspaper && <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-full" style={{ backgroundColor: palette.surface }}></div>}
                                    <p className="text-[12px] leading-relaxed font-sans relative z-10 pt-2"
                                        style={{ color: isNewspaper ? '#4A4740' : palette.muted }}>
                                        {word.content_json.fun_fact}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={clsx("p-6 border-t flex justify-center", isNewspaper ? "border-[#8C867B] bg-[#EAE6D9]" : "border-[#e3e0de]")}
                        style={{ backgroundColor: isNewspaper ? '#EAE6D9' : `${palette.muted}30` }}>
                        <button
                            className={clsx(
                                "py-2.5 px-6 font-bold flex items-center justify-center gap-2",
                                isNewspaper
                                    ? "bg-transparent text-[#4A4740] border border-[#4A4740] font-serif uppercase tracking-widest text-[11px] w-full"
                                    : "w-full text-white bg-black rounded-md text-[13px] transition-colors"
                            )}
                            style={{ backgroundColor: isNewspaper ? 'transparent' : palette.primary }}
                        >
                            <span className="material-symbols-outlined text-sm">bookmark</span>
                            Save for Later
                        </button>
                    </div>
                </aside>

            </div>
        </section>
    );
}

'use client';

/**
 * TreeSidebar — Context panel for the tree visualization
 *
 * Displays synced information based on the current step in the tree hierarchy.
 */

import { useEffect, useRef } from 'react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import type { TreeStep } from '@/src/hooks/useTreeTimeline';

/* ========================================
   Types
   ======================================== */

interface TreeSidebarProps {
    steps: TreeStep[];
    word: string;
    definition: string;
    phonetic?: string;
    accentColor: string;
    activeStepIndex: number;
    hook?: string;
    funFact?: string;
    nerdMode?: {
        ipa_full?: string;
        disputed_origin?: string;
        earliest_citation?: string;
    };
    onClose: () => void;
    onJumpToStep?: (index: number) => void;
}

/* ========================================
   Component
   ======================================== */

export default function TreeSidebar({
    steps,
    definition,
    accentColor,
    activeStepIndex,
    hook,
    funFact,
    onClose,
    onJumpToStep,
}: TreeSidebarProps): React.JSX.Element | null {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of log when step changes
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [activeStepIndex]);

    const activeStep = steps[activeStepIndex];
    if (!activeStep) return null;

    // Filter points up to active index for the log
    const visibleSteps = steps.slice(0, activeStepIndex + 1);

    return (
        <div className="flex flex-col h-full bg-[#FDFCF9] text-[#1A1A1A] font-sans relative">
            {/* Header: Current Status */}
            <div className="flex-shrink-0 p-6 border-b border-[#E9E4D9]">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <span className="inline-block px-2 py-0.5 text-[10px] font-bold tracking-widest text-white uppercase bg-[#C0392B] rounded-sm mb-2" style={{ backgroundColor: activeStepIndex === 0 ? '#1A1A1A' : accentColor }}>
                            {activeStepIndex === 0 ? '00_ROOT_ORIGIN' : `0${activeStepIndex}_EVOLUTION_STEP`}
                        </span>
                        <h2 className="text-2xl font-bold leading-tight font-serif italic">
                            {activeStep.node.term}
                        </h2>
                        <div className="flex items-center gap-2 mt-1 text-xs font-mono text-[#8C8577]">
                            <span className="uppercase tracking-wider font-bold text-[#1A1A1A]">{activeStep.node.language}</span>
                            <span>//</span>
                            <span>{activeStep.node.era}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-[#E9E4D9] rounded-sm transition-colors sm:hidden"
                        aria-label="Close sidebar"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg>
                    </button>
                    {/* Desktop Close Button */}
                    <button
                        onClick={onClose}
                        className="hidden sm:block p-1 hover:bg-[#E9E4D9] rounded-sm transition-colors text-muted"
                        aria-label="Close details"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                <p className="text-sm leading-relaxed text-[#4A4A4A]">
                    <span className="font-semibold text-[#1A1A1A] uppercase text-xs mr-2">MEANING:</span>
                    {activeStep.node.meaning}
                </p>
            </div>

            {/* Scrollable Content: Evolution Log */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8" ref={scrollRef}>

                {/* Historical Context (Hook) */}
                {hook && (
                    <div className="space-y-2 pb-6 border-b border-[#E9E4D9] border-dashed">
                        <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-white uppercase rounded-sm" style={{ backgroundColor: accentColor }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                            CONTEXT
                        </span>
                        <p className="text-sm italic font-serif leading-relaxed text-[#5D5D5D]">
                            &ldquo;{hook}&rdquo;
                        </p>
                    </div>
                )}

                {/* Timeline Cards */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#8C8577] uppercase">
                            EVOLUTION_LOG
                        </span>
                        <span className="text-[9px] font-mono border border-[#1A1A1A] px-1 py-0.5 rounded-sm">
                            {visibleSteps.length} NODES
                        </span>
                    </div>

                    <div className="relative pl-4 border-l border-[#E9E4D9]">
                        <LazyMotion features={domAnimation}>
                            <AnimatePresence>
                                {visibleSteps.map((step, index) => (
                                    <TimelineCard
                                        key={step.id}
                                        step={step}
                                        isLast={index === visibleSteps.length - 1}
                                        accentColor={accentColor}
                                        onClick={() => onJumpToStep?.(index)}
                                    />
                                ))}
                            </AnimatePresence>
                        </LazyMotion>
                    </div>
                </div>

                {/* Fun Fact */}
                {funFact && (
                    <div className="p-4 rounded-xl bg-[#F5F3EE] border border-[#E9E4D9] mt-6">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold tracking-widest text-white uppercase bg-[#2980B9] rounded-sm mb-2">
                            💡 FUN FACT
                        </span>
                        <p className="text-sm font-medium leading-relaxed text-[#4A4A4A]">
                            {funFact}
                        </p>
                    </div>
                )}
            </div>

            {/* Footer: Definition Teaser */}
            <div className="flex-shrink-0 p-4 border-t border-[#E9E4D9] bg-[#F5F3EE]">
                <p className="text-[10px] font-bold tracking-widest text-[#8C8577] uppercase mb-1">
                    CURRENT_MEANING
                </p>
                <p className="text-xs font-medium leading-normal line-clamp-2">
                    {definition}
                </p>
            </div>
        </div>
    );
}

/* ========================================
   Timeline Card Subcomponent
   ======================================== */

function TimelineCard({
    step,
    isLast,
    accentColor,
    onClick
}: {
    step: TreeStep;
    isLast: boolean;
    accentColor: string;
    onClick?: () => void;
}): React.JSX.Element {
    return (
        <m.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={onClick}
            className={`
                relative mb-8 last:mb-0 
                ${isLast ? 'opacity-100' : 'opacity-60 hover:opacity-100 cursor-pointer'} 
                transition-opacity duration-200
            `}
        >
            {/* Timeline dot */}
            <div
                className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#FDFCF9] ${isLast ? 'bg-[#1A1A1A]' : 'bg-[#D1D5DB]'}`}
                style={isLast ? { backgroundColor: accentColor } : {}}
            />

            <div className={`p-4 rounded border ${isLast ? 'bg-white border-[#1A1A1A] shadow-sm' : 'bg-transparent border-transparent pl-0 pt-0'}`}>
                <div className="flex items-baseline justify-between mb-1 gap-2">
                    <h3 className={`font-bold font-serif italic ${isLast ? 'text-lg text-[#1A1A1A]' : 'text-sm text-[#8C8577]'}`}>
                        {step.node.term}
                    </h3>
                    <div className="flex text-[10px] font-mono whitespace-nowrap overflow-hidden text-ellipsis text-[#8C8577] gap-1 shrink-0">
                        {step.node.language} <span className="opacity-50">/</span> {step.node.era}
                    </div>
                </div>

                {isLast && (
                    <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        <p className="text-xs text-[#4A4A4A] leading-relaxed mt-2 line-clamp-2">
                            {step.node.meaning}
                        </p>
                    </m.div>
                )}
            </div>
        </m.div>
    );
}

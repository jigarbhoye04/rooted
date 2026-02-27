import React, { forwardRef } from 'react';
import type { Epoch } from '@/src/schemas/visualizerData';
import clsx from 'clsx';
import type { ResolvedPalette } from './TimelineVisualizer';

interface TimelineCardProps {
    epoch: Epoch;
    index: number;
    isActive: boolean;
    isAlternate: boolean;
    isFirst: boolean;
    isLast: boolean;
    palette: ResolvedPalette;
}

export const TimelineCard = forwardRef<HTMLDivElement, TimelineCardProps>(
    ({ epoch, index, isActive, isAlternate, isFirst, isLast, palette }, ref) => {
        const cardClassNames = clsx(
            'card-body w-full bg-white rounded-md shadow-[0_10px_30px_-5px_rgba(26,26,26,0.08),0_0_1px_rgba(0,0,0,0.05)] border-l-[3.5px] p-6 md:p-8 flex flex-col relative group transition-all duration-700',
            isActive
                ? 'opacity-100 blur-none grayscale-0 scale-100'
                : 'opacity-40 blur-[2px] grayscale-[40%] scale-[0.97]'
        );

        const containerClassNames = clsx(
            'flex relative card-wrapper w-full',
            isAlternate ? 'ml-0 md:ml-16 lg:pl-16' : 'ml-0 md:ml-4 lg:pr-24'
        );

        // Dynamic Layout Triggers
        const hasUsageExample = !!epoch.usage_example;
        const isLongText = (epoch.meaning?.length ?? 0) > 120;
        const isNegativeShift = epoch.sentiment === 'negative_shift';

        return (
            <div className={containerClassNames} ref={ref} data-index={index}>
                {/* SVG Bezier Anchor Point */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 size-2 bg-transparent rounded-full card-anchor z-20" />

                <article className={cardClassNames} style={{ borderLeftColor: palette.secondary, paddingBottom: isLongText ? '2.5rem' : '2rem' }}>

                    {/* Sentiment Strip (Visual Hook for negative shift) */}
                    {isNegativeShift && (
                        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-sm" style={{ backgroundColor: '#DC2626' }} />
                    )}

                    {/* Origin Badge */}
                    {isFirst && (
                        <div className="-mt-2 mb-4 flex justify-start">
                            <span className="text-[10px] font-bold font-sans tracking-[0.25em] uppercase opacity-80" style={{ color: palette.secondary }}>
                                Origin
                            </span>
                        </div>
                    )}

                    {/* Header bar / Pill */}
                    <div className="flex justify-between items-center w-full mb-6 relative">

                        <div
                            className="px-3 py-1 rounded-sm text-[10px] font-mono font-bold tracking-[0.15em] uppercase"
                            style={{ backgroundColor: palette.surface, color: palette.primary }}
                        >
                            {epoch.era} • {epoch.sentiment || 'NEUTRAL'}
                        </div>
                        <span className="material-symbols-outlined text-[20px]" style={{ color: palette.secondary }}>
                            {epoch.sentiment === 'positive' ? 'trending_up' : epoch.sentiment === 'negative' ? 'warning' : 'history'}
                        </span>
                    </div>

                    <div className={clsx('grid gap-8', hasUsageExample ? (isAlternate ? 'md:grid-cols-[2.5fr_1.5fr]' : 'md:grid-cols-[1fr_2fr]') : 'grid-cols-1')}>
                        {/* Word Section */}
                        <div className={clsx(
                            'flex flex-col justify-end pb-1 border-b md:border-transparent',
                            hasUsageExample && isAlternate
                                ? 'order-1 md:order-2 items-end border-transparent'
                                : 'border-transparent'
                        )}>
                            <h2 className={clsx(
                                'font-serif italic text-4xl md:text-5xl text-[#1A1A1A] mb-3 tracking-tight leading-[1.1]',
                                (hasUsageExample && isAlternate) ? 'text-right' : 'text-left'
                            )}>
                                {epoch.term}
                            </h2>
                            <span
                                className="text-[11px] font-bold font-sans uppercase tracking-widest mt-auto opacity-80"
                                style={{ color: palette.secondary }}
                            >
                                {(hasUsageExample && isAlternate) ? 'EPOCH INFO' : 'EVOLUTION'}
                            </span>
                        </div>

                        {/* Description Section */}
                        <div className={clsx(
                            'flex flex-col gap-5 pt-2 h-full font-sans',
                            hasUsageExample && isAlternate
                                ? 'order-2 md:order-1 border-r border-[#f3f2f1] pr-6 text-right items-end'
                                : (hasUsageExample ? 'border-l border-[#f3f2f1] pl-6 text-left items-start' : 'text-left mt-2')
                        )}>
                            <p className={clsx("text-[#2A2A2A] leading-relaxed", isLongText ? "text-[15px]" : "text-[16px]")}>
                                {epoch.meaning}
                            </p>

                            {hasUsageExample && (
                                <div className={clsx(
                                    'flex items-center mt-auto pt-4',
                                    isAlternate ? 'justify-end gap-4' : 'gap-4'
                                )}>
                                    {!isAlternate && (
                                        <div
                                            className="px-2.5 py-1 rounded-full text-[10px] font-sans font-extrabold uppercase tracking-widest"
                                            style={{ backgroundColor: palette.surface, color: palette.primary }}
                                        >
                                            CITATION
                                        </div>
                                    )}
                                    <span className={clsx(
                                        'text-[13px] italic text-[#767069] font-serif',
                                        isAlternate ? 'border-r border-[#E3DED1] pr-4' : 'border-l border-[#E3DED1] pl-4'
                                    )}>
                                        &quot;{epoch.usage_example}&quot;
                                    </span>
                                    {isAlternate && (
                                        <div
                                            className="px-2.5 py-1 rounded-full text-[10px] font-sans font-extrabold uppercase tracking-widest"
                                            style={{ backgroundColor: palette.surface, color: palette.primary }}
                                        >
                                            CITATION
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Modern Use Badge */}
                    {isLast && (
                        <div className="mt-6 -mb-2 flex justify-end w-full">
                            <span className="text-[10px] font-bold font-sans tracking-[0.25em] uppercase opacity-80" style={{ color: palette.secondary }}>
                                Modern Use
                            </span>
                        </div>
                    )}
                </article>
            </div>
        );
    }
);

TimelineCard.displayName = 'TimelineCard';

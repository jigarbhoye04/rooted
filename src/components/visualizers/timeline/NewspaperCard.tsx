import React, { forwardRef } from 'react';
import type { Epoch } from '@/src/schemas/visualizerData';
import clsx from 'clsx';
import type { ResolvedPalette } from './TimelineVisualizer';

interface NewspaperCardProps {
    epoch: Epoch;
    index: number;
    isActive: boolean;
    isAlternate: boolean;
    isFirst: boolean;
    isLast: boolean;
    palette: ResolvedPalette;
}

export const NewspaperCard = forwardRef<HTMLDivElement, NewspaperCardProps>(
    ({ epoch, index, isActive, isAlternate, isFirst, isLast, palette }, ref) => {
        // Newspaper styling: sepia tone, sharp borders, no shadow
        const cardClassNames = clsx(
            'card-body w-full bg-[#F4F1E8] border border-[#8C867B] p-6 md:p-8 flex flex-col relative transition-all duration-700 font-serif',
            isActive
                ? 'opacity-100 grayscale-0 scale-100 blur-none'
                : 'opacity-60 grayscale-[80%] scale-[0.98]'
        );

        // Standard newspaper indent alignment (stagger still present but less extreme)
        const containerClassNames = clsx(
            'flex relative card-wrapper w-full px-2',
            isAlternate ? 'md:ml-8 lg:pl-12' : 'md:mr-8 lg:pr-12'
        );

        const hasUsageExample = !!epoch.usage_example;
        const isLongText = (epoch.meaning?.length ?? 0) > 120;
        const isNegativeShift = epoch.sentiment === 'negative_shift';

        return (
            <div className={containerClassNames} ref={ref} data-index={index}>
                {/* SVG Bezier Anchor Point (invisible, for connector) */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 size-2 bg-transparent rounded-full card-anchor z-20" />

                <article className={cardClassNames}>
                    {/* Visual adornments: corner brackets to look like a printed clipping */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#4A4740]" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#4A4740]" />

                    {/* Newspaper headline / dateline */}
                    <header className="flex flex-col items-center justify-center border-b-[3px] border-double border-[#8C867B] pb-4 mb-6 relative">
                        {isNegativeShift && (
                            <div className="absolute -top-6 text-[10px] font-bold text-[#DC2626] uppercase tracking-[0.2em] w-full text-center">
                                ★ Controversy Noted ★
                            </div>
                        )}

                        <div className="text-[11px] font-sans font-black tracking-[0.15em] uppercase text-[#4A4740] mb-2 flex items-center justify-center gap-4 w-full">
                            <span className="w-full h-[1px] bg-[#CFCAC0]"></span>
                            <span className="shrink-0">{epoch.era}</span>
                            <span className="w-full h-[1px] bg-[#CFCAC0]"></span>
                        </div>

                        <h2 className="font-serif font-black text-5xl md:text-6xl text-[#1D1B19] tracking-tighter text-center">
                            {epoch.term}
                        </h2>
                    </header>

                    {/* Content Body: Newspaper Columns style */}
                    <div className={clsx('flex flex-col md:flex-row gap-6 lg:gap-10')}>
                        {/* Definition col */}
                        <div className={clsx("flex-1", hasUsageExample ? "md:border-r border-[#CFCAC0] md:pr-6" : "")}>
                            <p className={clsx(
                                "text-[#2A2A2A] leading-relaxed text-justify",
                                isLongText ? "text-[15px]" : "text-[17px]"
                            )}>
                                {/* Newspaper Drop Cap for first letter */}
                                <span className="float-left text-5xl leading-[0.8] pr-2 pt-1 font-black text-[#1D1B19]">
                                    {epoch.meaning.charAt(0)}
                                </span>
                                {epoch.meaning.slice(1)}
                            </p>
                        </div>

                        {/* Usage Example / Citation pull-quote */}
                        {hasUsageExample && (
                            <div className="flex-1 italic text-[#4A4740] flex flex-col justify-center relative pl-4 md:pl-0 border-l-4 md:border-l-0 border-[#CFCAC0]">
                                <span className="text-4xl absolute -top-4 -left-2 md:-left-6 text-[#CFCAC0] font-serif leading-none opacity-50">&quot;</span>
                                <p className="text-[15px] leading-snug relative z-10 pl-2">
                                    {epoch.usage_example}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer: Sentiment & Badges */}
                    <footer className="mt-8 pt-3 border-t border-[#8C867B] flex justify-between items-center w-full">
                        <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#4A4740]">
                            {epoch.sentiment || 'NEUTRAL'}
                        </span>

                        {isFirst && <span className="text-[10px] font-bold font-sans tracking-[0.2em] text-[#4A4740] px-2 py-0.5 border border-[#8C867B] bg-[#EAE6D9]">ORIGIN</span>}
                        {isLast && <span className="text-[10px] font-bold font-sans tracking-[0.2em] text-[#4A4740] px-2 py-0.5 border border-[#8C867B] bg-[#EAE6D9]">MODERN</span>}
                    </footer>
                </article>
            </div>
        );
    }
);

NewspaperCard.displayName = 'NewspaperCard';

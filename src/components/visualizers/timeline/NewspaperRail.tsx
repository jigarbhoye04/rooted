import React, { MutableRefObject } from 'react';
import type { Epoch } from '@/src/schemas/visualizerData';
import clsx from 'clsx';
import type { ResolvedPalette } from './TimelineVisualizer';

interface NewspaperRailProps {
    epochs: Epoch[];
    activeIndex: number;
    palette: ResolvedPalette;
    dotsRef: MutableRefObject<(HTMLDivElement | null)[]>;
    onDotClick: (index: number) => void;
}

export function NewspaperRail({ epochs, activeIndex, palette, dotsRef, onDotClick }: NewspaperRailProps): React.JSX.Element {
    return (
        <nav className="w-16 md:w-20 shrink-0 border-r-2 border-double border-[#8C867B] bg-[#EAE6D9] flex flex-col items-center pt-8 pb-32 z-20 relative h-full">
            <div className="flex flex-col items-center h-full relative w-full pt-10">
                {/* Vertical "CHRONOLOGY" label (Newspaper style - serifs, bold) */}
                <div
                    className="font-serif text-[12px] font-black tracking-[0.2em] text-[#4A4740] uppercase whitespace-nowrap mb-12"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                >
                    Chronology
                </div>

                <div className="relative flex flex-col items-center justify-center gap-10 w-full">
                    {/* Vertical axis line (thin dark rule) */}
                    <div className="absolute top-0 bottom-0 w-[1px] bg-[#8C867B] -z-10" />

                    {epochs.map((epoch, idx) => {
                        const isActive = idx === activeIndex;

                        return (
                            <div
                                key={epoch.order}
                                ref={(el) => { dotsRef.current[idx] = el; }}
                                data-index={idx}
                                className="group relative flex items-center justify-center cursor-pointer w-full py-2"
                                onClick={() => onDotClick(idx)}
                            >
                                {/* Newspaper active marker: diamond or sharp square */}
                                <div className={clsx(
                                    'rotate-45 transition-all duration-300',
                                    isActive
                                        ? 'size-3 border border-[#4A4740] bg-[#4A4740]'
                                        : 'size-2 border border-[#8C867B] bg-[#EAE6D9]'
                                )} />

                                {/* Era tooltip */}
                                <div
                                    className={clsx(
                                        'absolute left-full ml-3 text-[#1D1B19] bg-[#EAE6D9] text-[15px] font-serif font-bold italic px-2 py-0.5 border-y border-[#8C867B] z-50 whitespace-nowrap transition-all duration-300',
                                        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
                                    )}
                                >
                                    {epoch.era}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

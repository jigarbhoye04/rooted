import React, { MutableRefObject } from 'react';
import type { Epoch } from '@/src/schemas/visualizerData';
import clsx from 'clsx';

import type { ResolvedPalette } from './TimelineVisualizer';

interface TimelineRailProps {
    epochs: Epoch[];
    activeIndex: number;
    palette: ResolvedPalette;
    dotsRef: MutableRefObject<(HTMLDivElement | null)[]>;
    onDotClick: (index: number) => void;
}

export function TimelineRail({ epochs, activeIndex, palette, dotsRef, onDotClick }: TimelineRailProps): React.JSX.Element {
    return (
        <nav className="w-16 md:w-20 shrink-0 border-r border-[#E3DED1]/50 bg-[#F3F2F1] flex flex-col items-center pt-8 pb-32 z-20 relative h-full">
            {/* Soft gradient fade on inner edge */}
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-r from-transparent to-[#E3DED1]/10 pointer-events-none" />

            <div className="flex flex-col items-center h-full relative w-full pt-10">
                {/* Vertical "CHRONOLOGY" label */}
                <div
                    className="font-sans text-[10px] font-semibold tracking-[0.25em] text-[#8C867B] uppercase whitespace-nowrap mb-12"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                >
                    Chronology
                </div>

                <div className="relative flex flex-col items-center justify-center gap-10 w-full">
                    {/* Vertical axis line */}
                    <div className="absolute top-0 bottom-0 w-[2px] bg-[#E3DED1] -z-10" />

                    {epochs.map((epoch, idx) => {
                        const isActive = idx === activeIndex;

                        return (
                            <div
                                key={epoch.order}
                                ref={(el) => { dotsRef.current[idx] = el; }}
                                data-index={idx}
                                className="group relative flex items-center justify-center cursor-pointer w-full"
                                onClick={() => onDotClick(idx)}
                            >
                                {/* Outer enclosing circle for active dot */}
                                <div className={clsx(
                                    'rounded-full flex items-center justify-center transition-all duration-300',
                                    isActive
                                        ? 'size-7 border-[2px] bg-[#F3F2F1]'
                                        : 'size-4 border-none bg-[transparent]'
                                )}
                                    style={{ borderColor: isActive ? palette.muted : 'transparent' }}>
                                    {/* Inner solid dot */}
                                    <div
                                        className={clsx(
                                            'rounded-full transition-all duration-300',
                                            isActive ? 'size-3' : 'size-full'
                                        )}
                                        style={{ backgroundColor: isActive ? palette.primary : palette.muted }}
                                    />
                                </div>

                                {/* Era tooltip — positioned to the RIGHT of the dot, not overlapping */}
                                <div
                                    className={clsx(
                                        'absolute left-full ml-3 text-white text-[14px] font-serif px-4 py-1.5 rounded-md shadow-md z-50 whitespace-nowrap transition-all duration-300 tracking-wide',
                                        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
                                    )}
                                    style={{ backgroundColor: palette.primary }}
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

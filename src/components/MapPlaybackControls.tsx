'use client';

/**
 * MapPlaybackControls — Animation controls for the map visualization
 *
 * Provides play/pause/restart, forward/back, and speed selection.
 * Auto-advances activeStepIndex at configured speed.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/* ========================================
   Types
   ======================================== */

interface MapPlaybackControlsProps {
    totalSteps: number;
    activeStepIndex: number;
    onStepChange: (index: number) => void;
}

type PlaybackSpeed = 0.5 | 1;

const SPEEDS: PlaybackSpeed[] = [0.5, 1];
const BASE_INTERVAL_MS = 2000;

/* ========================================
   Component
   ======================================== */

export default function MapPlaybackControls({
    totalSteps,
    activeStepIndex,
    onStepChange,
}: MapPlaybackControlsProps): React.JSX.Element {
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState<PlaybackSpeed>(0.5);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    /* ---- Auto-advance logic ---- */
    const clearTimer = useCallback((): void => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (!isPlaying) {
            clearTimer();
            return;
        }

        const interval = BASE_INTERVAL_MS / speed;
        timerRef.current = setInterval(() => {
            onStepChange(activeStepIndex + 1);
        }, interval);

        return clearTimer;
    }, [isPlaying, speed, activeStepIndex, onStepChange, clearTimer]);

    // Stop playing when we reach the last step
    useEffect(() => {
        if (activeStepIndex >= totalSteps - 1) {
            setIsPlaying(false);
        }
    }, [activeStepIndex, totalSteps]);

    /* ---- Handlers ---- */
    const handlePlayPause = useCallback((): void => {
        if (activeStepIndex >= totalSteps - 1) {
            // If at end, restart from beginning
            onStepChange(0);
            setIsPlaying(true);
        } else {
            setIsPlaying((prev) => !prev);
        }
    }, [activeStepIndex, totalSteps, onStepChange]);

    const handleRestart = useCallback((): void => {
        setIsPlaying(false);
        onStepChange(0);
    }, [onStepChange]);

    const handleBack = useCallback((): void => {
        if (activeStepIndex > 0) {
            onStepChange(activeStepIndex - 1);
        }
    }, [activeStepIndex, onStepChange]);

    const handleForward = useCallback((): void => {
        if (activeStepIndex < totalSteps - 1) {
            onStepChange(activeStepIndex + 1);
        }
    }, [activeStepIndex, totalSteps, onStepChange]);

    return (
        <div
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-lg"
            data-testid="map-playback-controls"
            style={{
                // Inline styles removed in favor of Tailwind classes for transparency/blur
            }}
        >
            {/* Restart */}
            <ControlButton
                onClick={handleRestart}
                label="Restart"
                testId="map-playback-restart"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74-2.74L3 12" /></svg>
            </ControlButton>

            {/* Back */}
            <ControlButton
                onClick={handleBack}
                label="Previous step"
                disabled={activeStepIndex <= 0}
                testId="map-playback-back"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M11 19V5l-11 7 11 7zM20 19V5l-11 7 11 7z" /></svg>
            </ControlButton>

            {/* Play / Pause */}
            <ControlButton
                onClick={handlePlayPause}
                label={isPlaying ? 'Pause' : 'Play'}
                testId="map-playback-play"
                highlight // Highlighted circle button
            >
                {isPlaying ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M5 3l14 9-14 9V3z" /></svg>
                )}
            </ControlButton>

            {/* Forward */}
            <ControlButton
                onClick={handleForward}
                label="Next step"
                disabled={activeStepIndex >= totalSteps - 1}
                testId="map-playback-forward"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M13 5v14l11-7-11-7zM4 5v14l11-7-11-7z" /></svg>
            </ControlButton>

            {/* Divider */}
            <div
                style={{
                    width: 1,
                    height: 16,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    margin: '0 8px',
                }}
            />

            {/* Speed selector */}
            <div className="flex gap-1">
                {SPEEDS.map((s) => (
                    <button
                        key={s}
                        type="button"
                        onClick={() => setSpeed(s)}
                        data-testid={`map-speed-${s}x`}
                        aria-label={`Speed ${s}x`}
                        style={{
                            padding: '2px 6px',
                            borderRadius: 4,
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 10,
                            fontWeight: 600,
                            fontFamily: "'Courier New', Courier, monospace",
                            letterSpacing: '0.03em',
                            backgroundColor: speed === s ? 'rgba(255,255,255,0.2)' : 'transparent',
                            color: speed === s ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                            transition: 'all 150ms ease',
                        }}
                    >
                        {s}x
                    </button>
                ))}
            </div>

            {/* Step indicator */}
            <div
                style={{
                    marginLeft: 8,
                    fontSize: 10,
                    fontWeight: 600,
                    fontFamily: "'Courier New', Courier, monospace",
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.05em',
                }}
            >
                {activeStepIndex + 1}/{totalSteps}
            </div>
        </div>
    );
}

/* ========================================
   Control Button
   ======================================== */

function ControlButton({
    onClick,
    label,
    children,
    disabled = false,
    highlight = false,
    testId,

}: {
    onClick: () => void;
    label: string;
    children: React.ReactNode;
    disabled?: boolean;
    highlight?: boolean;
    testId?: string;
}): React.JSX.Element {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            data-testid={testId}
            className={`
                flex items-center justify-center transition-all duration-200
                ${highlight ? 'bg-white text-black shadow-md hover:scale-105 active:scale-95' : 'bg-transparent text-white/70 hover:text-white hover:bg-white/10'}
                ${disabled ? 'opacity-30 cursor-not-allowed hover:none' : 'cursor-pointer'}
            `}
            style={{
                width: highlight ? 32 : 28, // Smaller buttons
                height: highlight ? 32 : 28,
                borderRadius: highlight ? '50%' : 6,
                border: 'none',
            }}
        >
            {children}
        </button>
    );
}

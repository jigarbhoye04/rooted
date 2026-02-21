'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { GridVisualizationData, LanguageEntry } from '@/src/schemas/visualizerData';
import type { DailyWord } from '@/src/schemas/dailyWord';

/* ========================================
   Types
   ======================================== */

interface ResolvedPalette {
    primary: string;
    secondary: string;
    muted: string;
    surface: string;
    text: string;
}

interface GridVisualizerProps {
    word: DailyWord;
    data: GridVisualizationData;
}

/* ========================================
   Palette Resolution
   ======================================== */

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

/* ========================================
   Typography Engine — script_type → font-family
   ======================================== */

const SCRIPT_FONT_MAP: Record<LanguageEntry['script_type'], string> = {
    Devanagari: "'Noto Sans Devanagari', 'Mangal', 'Aparajita', sans-serif",
    Arabic: "'Noto Sans Arabic', 'Traditional Arabic', 'Simplified Arabic', sans-serif",
    Cyrillic: "'Noto Sans', 'Segoe UI', 'Arial', sans-serif",
    Greek: "'Noto Sans', 'Segoe UI', 'Arial', sans-serif",
    Latin: 'inherit',
    Other: "'Noto Sans', 'Segoe UI', sans-serif",
};

function getScriptFontFamily(st: LanguageEntry['script_type']): string {
    return SCRIPT_FONT_MAP[st] ?? "'Noto Sans', sans-serif";
}

function getScriptDirection(st: LanguageEntry['script_type']): 'rtl' | 'ltr' {
    return st === 'Arabic' ? 'rtl' : 'ltr';
}

/* ========================================
   Labels
   ======================================== */

const SCRIPT_TYPE_LABEL: Record<LanguageEntry['script_type'], string> = {
    Latin: 'Alphabet',
    Devanagari: 'Abugida',
    Arabic: 'Abjad',
    Cyrillic: 'Alphabet',
    Greek: 'Alphabet',
    Other: 'Script',
};

const PATTERN_META: Record<
    GridVisualizationData['pattern'],
    { label: string; description: string }
> = {
    cognate: { label: 'Cognates', description: 'Words sharing a common ancestor' },
    loanword: { label: 'Loanwords', description: 'Words borrowed across languages' },
    parallel: { label: 'Parallels', description: 'Independent but similar formations' },
};

/* ========================================
   Color Generation — per-tile palette via golden-angle hue rotation
   ======================================== */

function hexToHsl(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    if (max === min) return [0, 0, l];

    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = 0;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;

    return [h * 360, s, l];
}

function hslToHex(hDeg: number, s: number, l: number): string {
    const h = hDeg / 360;
    const hue2rgb = (p: number, q: number, t: number): number => {
        const tt = t < 0 ? t + 1 : t > 1 ? t - 1 : t;
        if (tt < 1 / 6) return p + (q - p) * 6 * tt;
        if (tt < 1 / 2) return q;
        if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
        return p;
    };

    let r: number, g: number, b: number;
    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (x: number): string =>
        Math.round(x * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generateTileColors(primaryHex: string, count: number): string[] {
    const [h, s, l] = hexToHsl(primaryHex);
    const goldenAngle = 137.508;
    const colors: string[] = [];

    for (let i = 0; i < count; i++) {
        const newH = (h + i * goldenAngle) % 360;
        const newS = Math.max(0.38, Math.min(0.65, s + (i % 3 - 1) * 0.04));
        const newL = Math.max(0.42, Math.min(0.56, l + (i % 2 === 0 ? 0.02 : -0.02)));
        colors.push(hslToHex(newH, newS, newL));
    }

    return colors;
}

/* ========================================
   Adaptive Glyph Size — prevents overflow for long scripts
   ======================================== */

function getAdaptiveGlyphSize(script: string): number {
    const len = script.length;
    if (len <= 3) return 76;
    const computed = Math.floor(210 / (len * 0.55));
    return Math.max(20, Math.min(76, computed));
}

/* ========================================
   Animation Variants
   ======================================== */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.2 },
    },
};

const tileVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring' as const,
            stiffness: 300,
            damping: 26,
        },
    },
};

const heroVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    },
};

const rulerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1.0, duration: 0.8 } },
};

const cascadeContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
};

const cascadeItem = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    },
};

/* ========================================
   Corner Mark — L-bracket, inset from tile edge
   Visible by default, fades on hover as StrokeBox takes over
   ======================================== */

function CornerMark({ position, color }: {
    position: 'tl' | 'tr' | 'bl' | 'br';
    color: string;
}): React.JSX.Element {
    const posClasses: Record<string, string> = {
        tl: 'top-4 left-4 border-t-[1.5px] border-l-[1.5px]',
        tr: 'top-4 right-4 border-t-[1.5px] border-r-[1.5px]',
        bl: 'bottom-4 left-4 border-b-[1.5px] border-l-[1.5px]',
        br: 'bottom-4 right-4 border-b-[1.5px] border-r-[1.5px]',
    };

    return (
        <div
            className={`absolute w-4 h-4 pointer-events-none
                        opacity-40 group-hover:opacity-0
                        transition-opacity duration-500
                        ${posClasses[position]}`}
            style={{ borderColor: color }}
        />
    );
}

/* ========================================
   Stroke Box — 4 edge lines that draw on hover
   Creates the "corners expanding into a box" effect
   ======================================== */

function StrokeBox({ color }: { color: string }): React.JSX.Element {
    return (
        <>
            {/* Top: draws left → right */}
            <div
                className="absolute top-4 left-4 right-4 h-[1.5px] pointer-events-none
                           origin-left scale-x-0 opacity-0
                           group-hover:scale-x-100 group-hover:opacity-100
                           transition-all duration-500 ease-out delay-0"
                style={{ backgroundColor: color }}
            />
            {/* Right: draws top → bottom */}
            <div
                className="absolute top-4 right-4 bottom-4 w-[1.5px] pointer-events-none
                           origin-top scale-y-0 opacity-0
                           group-hover:scale-y-100 group-hover:opacity-100
                           transition-all duration-500 ease-out delay-75"
                style={{ backgroundColor: color }}
            />
            {/* Bottom: draws right → left */}
            <div
                className="absolute bottom-4 left-4 right-4 h-[1.5px] pointer-events-none
                           origin-right scale-x-0 opacity-0
                           group-hover:scale-x-100 group-hover:opacity-100
                           transition-all duration-500 ease-out delay-100"
                style={{ backgroundColor: color }}
            />
            {/* Left: draws bottom → top */}
            <div
                className="absolute top-4 left-4 bottom-4 w-[1.5px] pointer-events-none
                           origin-bottom scale-y-0 opacity-0
                           group-hover:scale-y-100 group-hover:opacity-100
                           transition-all duration-500 ease-out delay-150"
                style={{ backgroundColor: color }}
            />
        </>
    );
}

/* ========================================
   Grid Tile — Specimen Blueprint Style
   ======================================== */

interface GridTileProps {
    lang: LanguageEntry;
    tileColor: string;
    palette: ResolvedPalette;
    index: number;
}

function GridTile({ lang, tileColor, palette, index }: GridTileProps): React.JSX.Element {
    const fontFamily = getScriptFontFamily(lang.script_type);
    const direction = getScriptDirection(lang.script_type);
    const scriptLabel = SCRIPT_TYPE_LABEL[lang.script_type];
    const glyphSize = getAdaptiveGlyphSize(lang.script);

    // Alternating subtle tint per tile
    const isOdd = index % 2 !== 0;
    const tileBg = isOdd ? `${tileColor}08` : '#FFFFFF';

    return (
        <motion.div
            variants={tileVariants}
            className="group relative flex flex-col justify-between
                       border-r border-b p-5 sm:p-6 cursor-crosshair
                       transition-colors duration-200
                       h-[260px] sm:h-[300px] lg:h-[340px]
                       overflow-hidden hover:z-10"
            style={{
                backgroundColor: tileBg,
                borderColor: '#E9E4D9',
            }}
        >
            {/* Hover tint overlay */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                           transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: `${tileColor}06` }}
            />

            {/* Corner Marks (visible by default, fade on hover) */}
            <CornerMark position="tl" color={tileColor} />
            <CornerMark position="tr" color={tileColor} />
            <CornerMark position="bl" color={tileColor} />
            <CornerMark position="br" color={tileColor} />

            {/* Stroke Box (draws on hover — corners expand into box) */}
            <StrokeBox color={tileColor} />

            {/* Zone 1 — Top: Language + Script badge */}
            <div className="flex justify-between items-start relative z-10">
                <span
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: palette.muted }}
                >
                    {lang.name}
                </span>
                <span
                    className="inline-flex items-center px-2 py-0.5 border text-[9px]
                               font-medium rounded-sm"
                    style={{
                        borderColor: `${tileColor}30`,
                        color: tileColor,
                        backgroundColor: `${tileColor}08`,
                    }}
                >
                    {scriptLabel}
                </span>
            </div>

            {/* Zone 2 — Center: Transliteration + Glyph */}
            <div className="flex flex-col items-center justify-center flex-1
                           gap-1.5 relative z-10 overflow-hidden min-h-0">
                <span
                    className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em]
                               group-hover:tracking-[0.22em] transition-all duration-300"
                    style={{ color: palette.text }}
                >
                    {lang.word}
                </span>
                <span
                    className="leading-none select-none text-center
                               group-hover:scale-[1.06] transition-transform
                               duration-500 ease-out"
                    style={{
                        fontFamily,
                        direction,
                        color: tileColor,
                        fontSize: `${glyphSize}px`,
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {lang.script}
                </span>
            </div>

            {/* Zone 3 — Bottom: Pronunciation + Meta */}
            <div
                className="border-t pt-3 mt-2 opacity-50 group-hover:opacity-100
                           transition-opacity duration-300 relative z-10"
                style={{ borderColor: `${palette.muted}40` }}
            >
                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-0.5">
                        {lang.pronunciation && (
                            <span
                                className="text-[11px] sm:text-xs font-mono"
                                style={{ color: palette.text }}
                            >
                                {lang.pronunciation}
                            </span>
                        )}
                        <span
                            className="text-[10px] font-mono"
                            style={{ color: palette.muted }}
                        >
                            {lang.script_type}
                        </span>
                    </div>
                    <span
                        className="text-[9px] font-mono opacity-50"
                        style={{ color: palette.muted }}
                    >
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

/* ========================================
   Main GridVisualizer Component
   ======================================== */

export default function GridVisualizer({ word, data }: GridVisualizerProps): React.JSX.Element {
    const palette = resolvePalette(word);
    const patternMeta = PATTERN_META[data.pattern];
    const languageCount = data.languages.length;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const tileColors = generateTileColors(palette.primary, languageCount);

    const gridColClass =
        languageCount >= 10
            ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
            : languageCount >= 7
                ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3'
                : 'grid-cols-2 sm:grid-cols-3';

    return (
        <section
            className="h-full flex flex-col overflow-hidden font-sans"
            style={{ backgroundColor: '#FDFCF9' }}
            data-testid="grid-visualizer"
        >
            {/* Scoped scrollbar styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .grid-scroll::-webkit-scrollbar { width: 4px; }
                .grid-scroll::-webkit-scrollbar-track { background: transparent; }
                .grid-scroll::-webkit-scrollbar-thumb { background: ${palette.muted}; border-radius: 999px; }
                .grid-scroll::-webkit-scrollbar-thumb:hover { background: ${palette.secondary}; }
                .grid-scroll { scrollbar-width: thin; scrollbar-color: ${palette.muted} transparent; }
            `}} />

            <div className="flex flex-1 overflow-hidden relative w-full h-full">

                {/* ───── Left Sidebar (collapsible) — xl+ ───── */}
                <motion.aside
                    initial={false}
                    animate={{
                        width: sidebarOpen ? 280 : 0,
                        opacity: sidebarOpen ? 1 : 0,
                    }}
                    transition={{
                        type: 'spring' as const,
                        stiffness: 400,
                        damping: 35,
                        opacity: { duration: 0.15 },
                    }}
                    className="hidden xl:flex shrink-0 border-r h-full
                               relative z-20 flex-col font-sans overflow-hidden"
                    style={{
                        backgroundColor: palette.surface,
                        borderColor: sidebarOpen ? '#e3e0de' : 'transparent',
                    }}
                >
                    <div className="min-w-[280px] flex flex-col h-full">
                        {/* Sidebar Header */}
                        <div
                            className="p-6 border-b"
                            style={{
                                borderColor: '#e3e0de',
                                backgroundColor: `${palette.muted}30`,
                            }}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span
                                    className="material-symbols-outlined text-base"
                                    style={{ color: palette.primary }}
                                >grid_view</span>
                                <h3
                                    className="font-mono text-xs font-bold uppercase tracking-widest"
                                    style={{ color: palette.text }}
                                >
                                    Specimen Grid
                                </h3>
                            </div>
                            <p className="text-[11px]" style={{ color: palette.muted }}>
                                {patternMeta.label} &middot;{' '}
                                <span style={{ color: palette.primary }}>
                                    {languageCount} entries
                                </span>
                            </p>
                        </div>

                        {/* Sidebar Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 grid-scroll">

                            {/* Language Index */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2" style={{ color: palette.muted }}>
                                    <span className="material-symbols-outlined text-sm">translate</span>
                                    <span className="text-[11px] font-bold uppercase tracking-wider">
                                        Languages
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    {data.languages.map((lang, idx) => (
                                        <div
                                            key={lang.name}
                                            className="flex items-center justify-between py-2 px-2.5
                                                       rounded-md hover:bg-white/60
                                                       transition-colors duration-200"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <span
                                                    className="text-[10px] font-mono w-4 text-center"
                                                    style={{ color: palette.muted }}
                                                >
                                                    {String(idx + 1).padStart(2, '0')}
                                                </span>
                                                <span
                                                    className="text-[12px] font-medium"
                                                    style={{ color: palette.text }}
                                                >
                                                    {lang.name}
                                                </span>
                                            </div>
                                            <span
                                                className="text-[13px]"
                                                style={{
                                                    color: tileColors[idx],
                                                    fontFamily: getScriptFontFamily(lang.script_type),
                                                    direction: getScriptDirection(lang.script_type),
                                                }}
                                            >
                                                {lang.script}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Hook */}
                            {word.content_json?.hook && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2" style={{ color: palette.primary }}>
                                        <span className="material-symbols-outlined text-sm">
                                            tips_and_updates
                                        </span>
                                        <span className="text-[11px] font-bold uppercase tracking-wider">
                                            Historical Hook
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-md bg-white shadow-sm border border-[#e3e0de]">
                                        <p
                                            className="text-[13px] font-serif italic leading-relaxed"
                                            style={{ color: palette.text }}
                                        >
                                            &quot;{word.content_json.hook}&quot;
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Fun Fact */}
                            {word.content_json?.fun_fact && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2"
                                         style={{ color: palette.secondary }}>
                                        <span className="material-symbols-outlined text-sm">star</span>
                                        <span className="text-[11px] font-bold uppercase tracking-wider">
                                            Fun Fact
                                        </span>
                                    </div>
                                    <div className="p-4 relative overflow-hidden bg-white rounded-md
                                                    shadow-sm border border-[#e3e0de]">
                                        <div
                                            className="absolute top-0 right-0 w-8 h-8 rounded-bl-full"
                                            style={{ backgroundColor: palette.surface }}
                                        />
                                        <p
                                            className="text-[12px] leading-relaxed font-sans relative z-10 pt-2"
                                            style={{ color: palette.muted }}
                                        >
                                            {word.content_json.fun_fact}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Earliest Citation */}
                            {word.content_json?.nerd_mode?.earliest_citation && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2"
                                         style={{ color: palette.primary }}>
                                        <span className="material-symbols-outlined text-sm">
                                            auto_stories
                                        </span>
                                        <span className="text-[11px] font-bold uppercase tracking-wider">
                                            Origin
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-md bg-white shadow-sm border border-[#e3e0de]">
                                        <p
                                            className="text-[12px] leading-relaxed font-sans"
                                            style={{ color: palette.text }}
                                        >
                                            {word.content_json.nerd_mode.earliest_citation}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Footer */}
                        <div
                            className="p-6 border-t flex justify-center"
                            style={{
                                borderColor: '#e3e0de',
                                backgroundColor: `${palette.muted}30`,
                            }}
                        >
                            <button
                                className="w-full py-2.5 px-6 font-bold flex items-center justify-center
                                           gap-2 text-white rounded-md text-[13px] transition-colors
                                           hover:opacity-90"
                                style={{ backgroundColor: palette.primary }}
                            >
                                <span className="material-symbols-outlined text-sm">bookmark</span>
                                Save for Later
                            </button>
                        </div>
                    </div>
                </motion.aside>

                {/* Sidebar toggle tab — xl+ only */}
                <div className="hidden xl:flex shrink-0 items-center z-30">
                    <button
                        onClick={() => setSidebarOpen(prev => !prev)}
                        className="flex items-center justify-center w-5 h-14
                                   border border-l-0 rounded-r-md cursor-pointer
                                   hover:bg-white/80 transition-colors duration-200"
                        style={{
                            borderColor: '#e3e0de',
                            backgroundColor: palette.surface,
                        }}
                    >
                        <span
                            className="text-sm select-none transition-transform duration-300"
                            style={{
                                color: palette.muted,
                                transform: sidebarOpen ? 'scaleX(1)' : 'scaleX(-1)',
                            }}
                        >
                            ‹
                        </span>
                    </button>
                </div>

                {/* ───── Main Content Area ───── */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden relative
                                 h-full scroll-smooth grid-scroll">

                    {/* Dot-grid background texture */}
                    <div
                        className="fixed inset-0 pointer-events-none z-0 opacity-40"
                        style={{
                            backgroundImage:
                                `radial-gradient(${palette.muted}80 1px, transparent 1px)`,
                            backgroundSize: '20px 20px',
                        }}
                    />

                    {/* Hero Header */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={heroVariants}
                        className="flex flex-col items-center justify-center
                                   pt-10 sm:pt-14 pb-4 sm:pb-6 px-6
                                   w-full max-w-6xl mx-auto relative z-10"
                    >
                        {/* Pattern badge */}
                        <span
                            className="inline-block px-3 py-1 text-[9px] font-bold tracking-[0.2em]
                                       uppercase rounded-sm mb-4 border"
                            style={{
                                color: palette.primary,
                                borderColor: `${palette.primary}40`,
                                backgroundColor: `${palette.primary}0D`,
                            }}
                        >
                            {patternMeta.label}
                        </span>

                        {/* Word */}
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-black
                                       tracking-tight text-center"
                            style={{ color: palette.text }}
                        >
                            {word.word}
                        </h1>

                        {/* Phonetic */}
                        {word.phonetic && (
                            <p
                                className="text-base sm:text-lg italic mt-2 font-mono"
                                style={{ color: palette.muted }}
                            >
                                {word.phonetic}
                            </p>
                        )}

                        {/* Definition */}
                        <p
                            className="text-sm sm:text-base leading-relaxed text-center mt-3 max-w-xl"
                            style={{ color: `${palette.text}CC` }}
                        >
                            {word.definition}
                        </p>

                        {/* Stats bar */}
                        <div
                            className="flex items-center gap-6 mt-5 text-[10px] font-mono
                                       uppercase tracking-widest"
                            style={{ color: palette.muted }}
                        >
                            <div className="flex flex-col items-center gap-0.5">
                                <span
                                    className="font-bold text-xs"
                                    style={{ color: palette.text }}
                                >
                                    {languageCount}
                                </span>
                                Languages
                            </div>
                            <div
                                className="w-px h-6"
                                style={{ backgroundColor: '#E9E4D9' }}
                            />
                            <div className="flex flex-col items-center gap-0.5">
                                <span
                                    className="font-bold text-xs"
                                    style={{ color: palette.text }}
                                >
                                    {patternMeta.label}
                                </span>
                                Pattern
                            </div>
                            {word.root_family && (
                                <>
                                    <div
                                        className="w-px h-6"
                                        style={{ backgroundColor: '#E9E4D9' }}
                                    />
                                    <div className="flex flex-col items-center gap-0.5">
                                        <span
                                            className="font-bold text-xs"
                                            style={{ color: palette.text }}
                                        >
                                            {word.root_family}
                                        </span>
                                        Root Family
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Decorative divider */}
                        <div className="flex items-center gap-3 mt-5">
                            <div
                                className="w-12 h-px"
                                style={{ backgroundColor: palette.muted }}
                            />
                            <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: palette.primary }}
                            />
                            <div
                                className="w-12 h-px"
                                style={{ backgroundColor: palette.muted }}
                            />
                        </div>
                    </motion.div>

                    {/* Specimen Grid — border-separated, no gaps */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className={`grid ${gridColClass} border-l border-t
                                    w-full max-w-6xl mx-auto relative z-10`}
                        style={{ borderColor: '#E9E4D9' }}
                    >
                        {data.languages.map((lang, idx) => (
                            <GridTile
                                key={lang.name}
                                lang={lang}
                                tileColor={tileColors[idx]}
                                palette={palette}
                                index={idx}
                            />
                        ))}
                    </motion.div>

                    {/* Ruler Footer */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={rulerVariants}
                        className="w-full max-w-6xl mx-auto mt-8 px-0 relative z-10"
                    >
                        <div
                            className="border-t pt-4"
                            style={{ borderColor: '#E9E4D9' }}
                        >
                            <div className="flex items-center justify-between px-1">
                                <span
                                    className="text-[9px] font-mono uppercase tracking-widest"
                                    style={{ color: palette.muted }}
                                >
                                    Scale 1:1
                                </span>
                                <span
                                    className="text-[9px] font-mono uppercase tracking-widest"
                                    style={{ color: palette.muted }}
                                >
                                    Linguistic Analysis // {data.pattern.toUpperCase()}
                                </span>
                                <span
                                    className="text-[9px] font-mono uppercase tracking-widest"
                                    style={{ color: palette.muted }}
                                >
                                    System: IPA
                                </span>
                            </div>
                            {/* Ruler ticks */}
                            <div
                                className="h-3 w-full mt-2 relative"
                                style={{
                                    backgroundImage:
                                        `linear-gradient(to right, ${palette.muted}60 1px, transparent 1px)`,
                                    backgroundSize: '10px 100%',
                                }}
                            >
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage:
                                            `linear-gradient(to right, ${palette.muted} 1px, transparent 1px)`,
                                        backgroundSize: '100px 100%',
                                    }}
                                />
                                <div
                                    className="absolute bottom-0 w-full h-px"
                                    style={{ backgroundColor: palette.muted }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* ───── Cascading Word Meta — smooth reveal on scroll ───── */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={cascadeContainer}
                        className="w-full max-w-3xl mx-auto mt-16 mb-4 px-6 relative z-10"
                    >
                        <div className="flex flex-col items-center text-center">
                            <motion.span
                                variants={cascadeItem}
                                className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3"
                                style={{ color: palette.muted }}
                            >
                                Word of the Day
                            </motion.span>

                            <motion.h2
                                variants={cascadeItem}
                                className="text-3xl sm:text-4xl font-black tracking-tight"
                                style={{ color: palette.text }}
                            >
                                {word.word}
                            </motion.h2>

                            {word.phonetic && (
                                <motion.p
                                    variants={cascadeItem}
                                    className="text-sm italic font-mono mt-2"
                                    style={{ color: palette.muted }}
                                >
                                    {word.phonetic}
                                </motion.p>
                            )}

                            <motion.p
                                variants={cascadeItem}
                                className="text-sm sm:text-base leading-relaxed mt-3 max-w-lg"
                                style={{ color: `${palette.text}BB` }}
                            >
                                {word.definition}
                            </motion.p>

                            {word.content_json?.part_of_speech && (
                                <motion.span
                                    variants={cascadeItem}
                                    className="mt-4 px-4 py-1 text-[10px] font-mono uppercase
                                               tracking-widest border rounded-sm"
                                    style={{
                                        color: palette.primary,
                                        borderColor: `${palette.primary}30`,
                                    }}
                                >
                                    {word.content_json.part_of_speech}
                                </motion.span>
                            )}

                            {/* Cascading hook quote */}
                            {word.content_json?.hook && (
                                <motion.blockquote
                                    variants={cascadeItem}
                                    className="mt-8 italic text-sm sm:text-base leading-relaxed
                                               border-l-2 pl-4 text-left max-w-md"
                                    style={{
                                        color: `${palette.text}BB`,
                                        borderColor: palette.primary,
                                    }}
                                >
                                    &quot;{word.content_json.hook}&quot;
                                </motion.blockquote>
                            )}

                            {/* Fun fact on mobile */}
                            {word.content_json?.fun_fact && (
                                <motion.div
                                    variants={cascadeItem}
                                    className="xl:hidden mt-6 text-center"
                                >
                                    <span
                                        className="text-[10px] font-bold uppercase tracking-widest"
                                        style={{ color: palette.primary }}
                                    >
                                        Fun Fact
                                    </span>
                                    <p
                                        className="mt-2 text-xs sm:text-sm leading-relaxed"
                                        style={{ color: palette.muted }}
                                    >
                                        {word.content_json.fun_fact}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Bottom spacer */}
                    <div className="h-16" />
                </main>
            </div>
        </section>
    );
}

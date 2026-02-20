'use client';

/**
 * TreePage — Full-page TREE visualization experience (placeholder)
 *
 * Will display an interactive etymology tree spanning the full page.
 * Currently shows word info with a "coming soon" placeholder.
 */

import type { DailyWord } from '@/src/schemas/dailyWord';

interface TreePageProps {
    word: DailyWord;
}

export default function TreePage({ word }: TreePageProps): React.JSX.Element {
    return (
        <div className="flex flex-col h-screen overflow-hidden" data-testid="tree-page">
            {/* Header */}
            <header
                className="flex items-center justify-between px-5 py-3 shrink-0"
                style={{
                    borderBottom: '1px solid #E9E4D9',
                    backgroundColor: '#FDFCF9',
                }}
            >
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: '#1A1A1A' }}>
                        {word.word}
                    </h1>
                    {word.phonetic && (
                        <span className="text-sm italic" style={{ color: '#8C8577' }}>{word.phonetic}</span>
                    )}
                </div>
                <span
                    className="px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase"
                    style={{
                        border: '1px solid #1A1A1A',
                        borderRadius: 2,
                        color: '#1A1A1A',
                        fontFamily: "'Courier New', Courier, monospace",
                    }}
                >
                    TREE
                </span>
            </header>

            {/* Placeholder content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
                <span className="text-6xl mb-6" role="img" aria-label="tree">🌳</span>
                <h2 className="text-xl font-bold text-text-primary mb-2">Etymology Tree</h2>
                <p className="text-base text-muted leading-relaxed max-w-md text-center mb-6">
                    {word.definition}
                </p>
                {word.content_json?.hook && (
                    <p className="text-sm text-text-secondary italic max-w-lg text-center">
                        &quot;{word.content_json.hook}&quot;
                    </p>
                )}
                <div className="mt-10 px-4 py-2 rounded-full border border-border">
                    <p
                        className="text-[10px] uppercase tracking-widest font-bold"
                        style={{
                            color: '#8C8577',
                            fontFamily: "'Courier New', Courier, monospace",
                        }}
                    >
                        INTERACTIVE_TREE // COMING_SOON
                    </p>
                </div>
            </div>
        </div>
    );
}

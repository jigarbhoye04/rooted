'use client';

/**
 * TimelinePage — Full-page TIMELINE visualization experience (placeholder)
 *
 * Will display an interactive timeline spanning the full page.
 * Currently shows word info with a "coming soon" placeholder.
 */

import type { DailyWord } from '@/src/schemas/dailyWord';
import { TimelineVisualizationDataSchema } from '@/src/schemas/visualizerData';
import TimelineVisualizer from '@/src/components/visualizers/timeline/TimelineVisualizer';

interface TimelinePageProps {
    word: DailyWord;
}

export default function TimelinePage({ word }: TimelinePageProps): React.JSX.Element {

    // Parse visual data securely
    const parsed = TimelineVisualizationDataSchema.safeParse(word.content_json.visual_data);

    if (!parsed.success) {
        return (
            <div className="flex flex-col h-screen overflow-hidden items-center justify-center p-8 text-center bg-[#FDFCF9]">
                <span className="text-4xl mb-4" role="img" aria-label="warning">⚠️</span>
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Invalid Timeline Data</h2>
                <p className="text-sm text-[#8C8577]">The data format for "{word.word}" is missing or incompatible.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden w-full bg-[#FDFCF9]" data-testid="timeline-page">
            <TimelineVisualizer word={word} data={parsed.data} />
        </div>
    );
}

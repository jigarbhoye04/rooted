'use client';

/**
 * GridPage — Full-page GRID visualization experience
 *
 * Displays an interactive language grid for cognates, loanwords,
 * and parallels. Validates visual_data with GridVisualizationDataSchema
 * before rendering the GridVisualizer.
 */

import type { DailyWord } from '@/src/schemas/dailyWord';
import { GridVisualizationDataSchema } from '@/src/schemas/visualizerData';
import GridVisualizer from '@/src/components/visualizers/grid/GridVisualizer';

interface GridPageProps {
    word: DailyWord;
}

export default function GridPage({ word }: GridPageProps): React.JSX.Element {

    // Parse visual data securely
    const parsed = GridVisualizationDataSchema.safeParse(word.content_json.visual_data);

    if (!parsed.success) {
        return (
            <div className="flex flex-col h-screen overflow-hidden items-center justify-center p-8 text-center bg-[#FDFCF9]">
                <span className="text-4xl mb-4" role="img" aria-label="warning">⚠️</span>
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Invalid Grid Data</h2>
                <p className="text-sm text-[#8C8577]">The data format for &quot;{word.word}&quot; is missing or incompatible.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden w-full bg-[#FDFCF9]" data-testid="grid-page">
            <GridVisualizer word={word} data={parsed.data} />
        </div>
    );
}

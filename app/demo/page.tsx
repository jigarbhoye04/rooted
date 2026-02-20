'use client';

import Visualizer from '@/src/components/Visualizer';
import type { VisualizerProps } from '@/src/schemas/visualizerData';

/* ========================================
   Mock Data
   ======================================== */

const MAP_DATA: VisualizerProps = {
    type: 'MAP',
    data: {
        type: 'MAP',
        projection: 'orthographic',
        points: [
            { order: 1, location_name: 'Ethiopia', coordinates: [9.145, 40.489], era: '800 CE', context: 'Origin of coffee (Coffea arabica)' },
            { order: 2, location_name: 'Yemen', coordinates: [15.552, 48.516], era: '1400 CE', context: 'First cultivation in Sufi monasteries' },
            { order: 3, location_name: 'Istanbul', coordinates: [41.008, 28.978], era: '1550 CE', context: 'First coffeehouses open' },
            { order: 4, location_name: 'Venice', coordinates: [45.440, 12.315], era: '1600 CE', context: 'Coffee enters Europe via trade' },
        ],
        routes: [
            { from: 1, to: 2, method: 'Trade', duration_years: 600 },
            { from: 2, to: 3, method: 'Ottoman Expansion', duration_years: 150 },
            { from: 3, to: 4, method: 'Venetian Merchants', duration_years: 50 },
        ],
    },
    accentColor: '#D97706', // Amber-600
};

const TREE_DATA: VisualizerProps = {
    type: 'TREE',
    data: {
        type: 'TREE',
        layout: 'radial',
        root: {
            term: 'Caput (Latin)',
            language: 'Latin',
            meaning: 'Head',
            era: '100 BCE',
            children: [
                {
                    term: 'Kaput',
                    language: 'German',
                    meaning: 'Broken / Ruined',
                    era: '1600s',
                },
                {
                    term: 'Capitaneum',
                    language: 'Late Latin',
                    meaning: 'Chief / Principal',
                    era: '400 CE',
                    children: [
                        {
                            term: 'Chieftain',
                            language: 'English',
                            meaning: 'Leader of a clan',
                            era: '1300s',
                        },
                        {
                            term: 'Captain',
                            language: 'English',
                            meaning: 'Leader',
                            era: '1300s',
                        },
                        {
                            term: 'Caudillo',
                            language: 'Spanish',
                            meaning: 'Military Leader',
                            era: '1800s',
                        },
                    ],
                },
                {
                    term: 'Chef',
                    language: 'French',
                    meaning: 'Head (of kitchen)',
                    era: '1800s',
                },
            ],
        },
    },
    accentColor: '#16A34A', // Green-600
};

const TIMELINE_DATA: VisualizerProps = {
    type: 'TIMELINE',
    data: {
        type: 'TIMELINE',
        epochs: [
            { order: 1, era: '820 CE', term: 'Algoritmi', meaning: 'Al-Khwarizmi (Persian mathematician)', sentiment: 'neutral' },
            { order: 2, era: '1200s', term: 'Algorisme', meaning: 'The decimal number system', sentiment: 'neutral' },
            { order: 3, era: '1600s', term: 'Algorithm', meaning: 'Step-by-step procedure', sentiment: 'neutral' },
            { order: 4, era: '1930s', term: 'Computer Algorithm', meaning: 'Machine instructions', sentiment: 'positive' },
            { order: 5, era: '2020s', term: 'The Algorithm', meaning: 'Social media recommendation AI', sentiment: 'negative_shift' },
        ],
    },
    accentColor: '#2563EB', // Blue-600
};

const GRID_DATA: VisualizerProps = {
    type: 'GRID',
    data: {
        type: 'GRID',
        pattern: 'cognate',
        languages: [
            { name: 'Sanskrit', word: 'Mātṛ', script: 'मातृ', script_type: 'Devanagari' },
            { name: 'Persian', word: 'Mādar', script: 'مادر', script_type: 'Arabic' },
            { name: 'Greek', word: 'Mḗtēr', script: 'Μήτηρ', script_type: 'Greek' },
            { name: 'Latin', word: 'Māter', script: 'Māter', script_type: 'Latin' },
            { name: 'Russian', word: 'Mat', script: 'Мать', script_type: 'Cyrillic' },
            { name: 'Irish', word: 'Máthair', script: 'Máthair', script_type: 'Latin' },
            { name: 'German', word: 'Mutter', script: 'Mutter', script_type: 'Latin' },
            { name: 'English', word: 'Mother', script: 'Mother', script_type: 'Latin' },
        ],
    },
    accentColor: '#9333EA', // Purple-600
};

/* ========================================
   Demo Page Component
   ======================================== */

export default function DemoPage(): React.JSX.Element {
    return (
        <main className="min-h-screen bg-bg-primary px-6 py-20">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-black text-text-primary mb-4 tracking-tight">
                        Visualizer Gallery
                    </h1>
                    <p className="text-muted text-lg">
                        Previewing all 4 visualization types.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* MAP */}
                    <section className="space-y-4">
                        <h2 className="text-xs font-bold text-muted uppercase tracking-widest text-center">Map Type</h2>
                        <Visualizer {...MAP_DATA} />
                    </section>

                    {/* TREE */}
                    <section className="space-y-4">
                        <h2 className="text-xs font-bold text-muted uppercase tracking-widest text-center">Tree Type</h2>
                        <Visualizer {...TREE_DATA} />
                    </section>

                    {/* TIMELINE */}
                    <section className="space-y-4">
                        <h2 className="text-xs font-bold text-muted uppercase tracking-widest text-center">Timeline Type</h2>
                        <Visualizer {...TIMELINE_DATA} />
                    </section>

                    {/* GRID */}
                    <section className="space-y-4">
                        <h2 className="text-xs font-bold text-muted uppercase tracking-widest text-center">Grid Type</h2>
                        <Visualizer {...GRID_DATA} />
                    </section>
                </div>

                <div className="mt-20 p-8 rounded-2xl bg-surface-secondary/30 text-center">
                    <p className="text-sm text-muted">
                        Note: MAP uses a real D3 visualizer. TREE, TIMELINE, and GRID are still static placeholders.
                    </p>
                </div>
            </div>
        </main>
    );
}

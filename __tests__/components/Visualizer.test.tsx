/**
 * Component tests for Visualizer type switcher
 *
 * Tests that the correct placeholder card renders for each
 * visualization type (MAP, TREE, TIMELINE, GRID).
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Visualizer from '@/src/components/Visualizer';
import type { VisualizerProps } from '@/src/schemas/visualizerData';

/* ========================================
   Test Fixtures
   ======================================== */

const MAP_PROPS: VisualizerProps = {
    type: 'MAP',
    data: {
        type: 'MAP',
        projection: 'orthographic',
        points: [
            { order: 1, location_name: 'Ethiopia', coordinates: [9.145, 40.489], era: '800 CE', context: 'Origin of coffee' },
            { order: 2, location_name: 'Yemen', coordinates: [15.552, 48.516], era: '1400 CE', context: 'First cultivation' },
        ],
        routes: [{ from: 1, to: 2, method: 'Trade routes', duration_years: 600 }],
    },
    accentColor: '#DC2626',
};

const TREE_PROPS: VisualizerProps = {
    type: 'TREE',
    data: {
        type: 'TREE',
        layout: 'radial',
        root: {
            term: 'Caput',
            language: 'Latin',
            meaning: 'Head',
            era: '100 BCE',
            children: [
                { term: 'Captain', language: 'English', meaning: 'Leader', era: '1300s' },
            ],
        },
    },
    accentColor: '#2563EB',
};

const TIMELINE_PROPS: VisualizerProps = {
    type: 'TIMELINE',
    data: {
        type: 'TIMELINE',
        epochs: [
            { order: 1, era: '800 CE', term: 'Algoritmi', meaning: 'Latinized name', sentiment: 'neutral' },
            { order: 2, era: '1600s', term: 'Algorithm', meaning: 'Step-by-step', sentiment: 'positive' },
        ],
    },
    accentColor: '#059669',
};

const GRID_PROPS: VisualizerProps = {
    type: 'GRID',
    data: {
        type: 'GRID',
        pattern: 'cognate',
        languages: [
            { name: 'Sanskrit', word: 'Mātṛ', script: 'मातृ', script_type: 'Devanagari' },
            { name: 'Latin', word: 'Māter', script: 'Māter', script_type: 'Latin' },
            { name: 'Greek', word: 'Mḗtēr', script: 'Μήτηρ', script_type: 'Greek' },
            { name: 'Russian', word: 'Mat', script: 'Мать', script_type: 'Cyrillic' },
        ],
    },
    accentColor: '#7C3AED',
};

/* ========================================
   Tests
   ======================================== */

describe('Visualizer', () => {
    it('renders the visualizer container', () => {
        render(<Visualizer {...MAP_PROPS} />);
        expect(screen.getByTestId('visualizer')).toBeInTheDocument();
    });

    it('does not render "coming soon" footer for MAP type', () => {
        render(<Visualizer {...MAP_PROPS} />);
        expect(screen.queryByText(/interactive visualization coming soon/i)).not.toBeInTheDocument();
    });
});

describe('Visualizer — MAP type', () => {
    it('renders the MAP placeholder', () => {
        render(<Visualizer {...MAP_PROPS} />);
        expect(screen.getByTestId('map-placeholder')).toBeInTheDocument();
    });

    it('shows the Geographic Journey label', () => {
        render(<Visualizer {...MAP_PROPS} />);
        expect(screen.getByText('Geographic Journey')).toBeInTheDocument();
    });

    it('displays location names from map points', () => {
        render(<Visualizer {...MAP_PROPS} />);
        expect(screen.getByText('Ethiopia')).toBeInTheDocument();
        expect(screen.getByText('Yemen')).toBeInTheDocument();
    });

    it('shows point count', () => {
        render(<Visualizer {...MAP_PROPS} />);
        expect(screen.getByText('2 locations')).toBeInTheDocument();
    });
});

describe('Visualizer — TREE type', () => {
    it('renders the TREE placeholder', () => {
        render(<Visualizer {...TREE_PROPS} />);
        expect(screen.getByTestId('tree-placeholder')).toBeInTheDocument();
    });

    it('shows the Etymology Tree label', () => {
        render(<Visualizer {...TREE_PROPS} />);
        expect(screen.getByText('Etymology Tree')).toBeInTheDocument();
    });

    it('displays the root term', () => {
        render(<Visualizer {...TREE_PROPS} />);
        expect(screen.getByText('Caput')).toBeInTheDocument();
    });

    it('displays child terms', () => {
        render(<Visualizer {...TREE_PROPS} />);
        expect(screen.getByText('Captain')).toBeInTheDocument();
    });

    it('shows node count', () => {
        render(<Visualizer {...TREE_PROPS} />);
        expect(screen.getByText('2 nodes')).toBeInTheDocument();
    });
});

describe('Visualizer — TIMELINE type', () => {
    it('renders the TIMELINE placeholder', () => {
        render(<Visualizer {...TIMELINE_PROPS} />);
        expect(screen.getByTestId('timeline-placeholder')).toBeInTheDocument();
    });

    it('shows the Timeline label', () => {
        render(<Visualizer {...TIMELINE_PROPS} />);
        expect(screen.getByText('Timeline')).toBeInTheDocument();
    });

    it('displays epoch terms', () => {
        render(<Visualizer {...TIMELINE_PROPS} />);
        expect(screen.getByText('Algoritmi')).toBeInTheDocument();
        expect(screen.getByText('Algorithm')).toBeInTheDocument();
    });

    it('shows epoch count', () => {
        render(<Visualizer {...TIMELINE_PROPS} />);
        expect(screen.getByText('2 epochs')).toBeInTheDocument();
    });
});

describe('Visualizer — GRID type', () => {
    it('renders the GRID placeholder', () => {
        render(<Visualizer {...GRID_PROPS} />);
        expect(screen.getByTestId('grid-placeholder')).toBeInTheDocument();
    });

    it('shows the Language Grid label', () => {
        render(<Visualizer {...GRID_PROPS} />);
        expect(screen.getByText('Language Grid')).toBeInTheDocument();
    });

    it('displays language scripts', () => {
        render(<Visualizer {...GRID_PROPS} />);
        expect(screen.getByText('मातृ')).toBeInTheDocument();
        expect(screen.getByText('Μήτηρ')).toBeInTheDocument();
    });

    it('shows language count', () => {
        render(<Visualizer {...GRID_PROPS} />);
        expect(screen.getByText('4 languages')).toBeInTheDocument();
    });
});

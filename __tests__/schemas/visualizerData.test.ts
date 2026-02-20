/**
 * Unit tests for visualization data schemas
 *
 * Tests valid/invalid inputs for MapVisualizationDataSchema,
 * TreeVisualizationDataSchema, TimelineVisualizationDataSchema,
 * and GridVisualizationDataSchema.
 */

import { describe, it, expect } from 'vitest';
import {
    MapVisualizationDataSchema,
    TreeVisualizationDataSchema,
    TimelineVisualizationDataSchema,
    GridVisualizationDataSchema,
    VisualizationDataSchema,
} from '@/src/schemas/visualizerData';

/* ========================================
   Test Fixtures
   ======================================== */

const VALID_MAP_DATA = {
    type: 'MAP' as const,
    projection: 'orthographic' as const,
    points: [
        {
            order: 1,
            location_name: 'Ethiopia',
            coordinates: [9.145, 40.489] as [number, number],
            era: '800 CE',
            context: 'Origin of the coffee plant',
            influence_radius_km: 500,
        },
        {
            order: 2,
            location_name: 'Yemen',
            coordinates: [15.552, 48.516] as [number, number],
            era: '1400 CE',
            context: 'First cultivation',
        },
    ],
    routes: [
        { from: 1, to: 2, method: 'Trade routes', duration_years: 600 },
    ],
};

const VALID_TREE_DATA = {
    type: 'TREE' as const,
    layout: 'radial' as const,
    root: {
        term: 'Caput',
        language: 'Latin',
        meaning: 'Head',
        era: '100 BCE',
        children: [
            {
                term: 'Captain',
                language: 'English',
                meaning: 'Leader',
                era: '1300s',
            },
            {
                term: 'Capital',
                language: 'English',
                meaning: 'Chief city',
                era: '1200s',
                children: [
                    {
                        term: 'Capitalism',
                        language: 'English',
                        meaning: 'Economic system',
                        era: '1800s',
                    },
                ],
            },
        ],
    },
};

const VALID_TIMELINE_DATA = {
    type: 'TIMELINE' as const,
    epochs: [
        {
            order: 1,
            era: '800 CE',
            term: 'Algoritmi',
            meaning: 'Latinized name of al-Khwarizmi',
            usage_example: 'The works of Algoritmi...',
            sentiment: 'neutral' as const,
        },
        {
            order: 2,
            era: '1600s',
            term: 'Algorithm',
            meaning: 'Step-by-step procedure',
            sentiment: 'positive' as const,
        },
    ],
};

const VALID_GRID_DATA = {
    type: 'GRID' as const,
    pattern: 'cognate' as const,
    languages: [
        { name: 'Sanskrit', word: 'Mātṛ', script: 'मातृ', script_type: 'Devanagari' as const, pronunciation: '/maːtɹ̩/' },
        { name: 'Latin', word: 'Māter', script: 'Māter', script_type: 'Latin' as const },
        { name: 'Greek', word: 'Mḗtēr', script: 'Μήτηρ', script_type: 'Greek' as const },
        { name: 'Russian', word: 'Mat', script: 'Мать', script_type: 'Cyrillic' as const },
    ],
};

/* ========================================
   MAP Schema Tests
   ======================================== */

describe('MapVisualizationDataSchema', () => {
    it('accepts valid MAP data', () => {
        expect(() => MapVisualizationDataSchema.parse(VALID_MAP_DATA)).not.toThrow();
    });

    it('accepts MAP data without optional routes', () => {
        const { routes: _routes, ...withoutRoutes } = VALID_MAP_DATA;
        expect(() => MapVisualizationDataSchema.parse(withoutRoutes)).not.toThrow();
    });

    it('rejects MAP with fewer than 2 points', () => {
        const invalid = { ...VALID_MAP_DATA, points: [VALID_MAP_DATA.points[0]] };
        expect(() => MapVisualizationDataSchema.parse(invalid)).toThrow();
    });

    it('rejects MAP with invalid projection', () => {
        const invalid = { ...VALID_MAP_DATA, projection: 'flatEarth' };
        expect(() => MapVisualizationDataSchema.parse(invalid)).toThrow();
    });

    it('rejects MAP with out-of-range latitude', () => {
        const invalid = {
            ...VALID_MAP_DATA,
            points: [
                { ...VALID_MAP_DATA.points[0], coordinates: [91, 40] },
                VALID_MAP_DATA.points[1],
            ],
        };
        expect(() => MapVisualizationDataSchema.parse(invalid)).toThrow();
    });

    it('rejects MAP with out-of-range longitude', () => {
        const invalid = {
            ...VALID_MAP_DATA,
            points: [
                { ...VALID_MAP_DATA.points[0], coordinates: [9, 181] },
                VALID_MAP_DATA.points[1],
            ],
        };
        expect(() => MapVisualizationDataSchema.parse(invalid)).toThrow();
    });

    it('rejects MAP with wrong type literal', () => {
        const invalid = { ...VALID_MAP_DATA, type: 'TREE' };
        expect(() => MapVisualizationDataSchema.parse(invalid)).toThrow();
    });
});

/* ========================================
   TREE Schema Tests
   ======================================== */

describe('TreeVisualizationDataSchema', () => {
    it('accepts valid TREE data with nested children', () => {
        expect(() => TreeVisualizationDataSchema.parse(VALID_TREE_DATA)).not.toThrow();
    });

    it('accepts TREE data without children (leaf node)', () => {
        const leaf = {
            type: 'TREE' as const,
            layout: 'dendrogram' as const,
            root: { term: 'Root', language: 'Latin', meaning: 'Origin', era: '100 BCE' },
        };
        expect(() => TreeVisualizationDataSchema.parse(leaf)).not.toThrow();
    });

    it('rejects TREE with missing root term', () => {
        const invalid = {
            type: 'TREE',
            layout: 'radial',
            root: { language: 'Latin', meaning: 'Head', era: '100 BCE' },
        };
        expect(() => TreeVisualizationDataSchema.parse(invalid)).toThrow();
    });

    it('rejects TREE with invalid layout', () => {
        const invalid = { ...VALID_TREE_DATA, layout: 'spiral' };
        expect(() => TreeVisualizationDataSchema.parse(invalid)).toThrow();
    });
});

/* ========================================
   TIMELINE Schema Tests
   ======================================== */

describe('TimelineVisualizationDataSchema', () => {
    it('accepts valid TIMELINE data', () => {
        expect(() => TimelineVisualizationDataSchema.parse(VALID_TIMELINE_DATA)).not.toThrow();
    });

    it('rejects TIMELINE with fewer than 2 epochs', () => {
        const invalid = { ...VALID_TIMELINE_DATA, epochs: [VALID_TIMELINE_DATA.epochs[0]] };
        expect(() => TimelineVisualizationDataSchema.parse(invalid)).toThrow();
    });

    it('rejects TIMELINE with invalid sentiment value', () => {
        const invalid = {
            ...VALID_TIMELINE_DATA,
            epochs: [
                { ...VALID_TIMELINE_DATA.epochs[0], sentiment: 'happy' },
                VALID_TIMELINE_DATA.epochs[1],
            ],
        };
        expect(() => TimelineVisualizationDataSchema.parse(invalid)).toThrow();
    });

    it('accepts TIMELINE epoch without optional usage_example', () => {
        const data = {
            ...VALID_TIMELINE_DATA,
            epochs: [
                { order: 1, era: '800 CE', term: 'Test', meaning: 'A test', sentiment: 'neutral' },
                { order: 2, era: '1200 CE', term: 'Test2', meaning: 'Another test', sentiment: 'positive' },
            ],
        };
        expect(() => TimelineVisualizationDataSchema.parse(data)).not.toThrow();
    });
});

/* ========================================
   GRID Schema Tests
   ======================================== */

describe('GridVisualizationDataSchema', () => {
    it('accepts valid GRID data', () => {
        expect(() => GridVisualizationDataSchema.parse(VALID_GRID_DATA)).not.toThrow();
    });

    it('rejects GRID with fewer than 4 languages', () => {
        const invalid = { ...VALID_GRID_DATA, languages: VALID_GRID_DATA.languages.slice(0, 3) };
        expect(() => GridVisualizationDataSchema.parse(invalid)).toThrow();
    });

    it('rejects GRID with invalid pattern', () => {
        const invalid = { ...VALID_GRID_DATA, pattern: 'random' };
        expect(() => GridVisualizationDataSchema.parse(invalid)).toThrow();
    });

    it('rejects GRID with invalid script_type', () => {
        const invalid = {
            ...VALID_GRID_DATA,
            languages: VALID_GRID_DATA.languages.map((l, i) =>
                i === 0 ? { ...l, script_type: 'Klingon' } : l
            ),
        };
        expect(() => GridVisualizationDataSchema.parse(invalid)).toThrow();
    });
});

/* ========================================
   Discriminated Union Tests
   ======================================== */

describe('VisualizationDataSchema (discriminated union)', () => {
    it('correctly parses MAP data', () => {
        const result = VisualizationDataSchema.parse(VALID_MAP_DATA);
        expect(result.type).toBe('MAP');
    });

    it('correctly parses TREE data', () => {
        const result = VisualizationDataSchema.parse(VALID_TREE_DATA);
        expect(result.type).toBe('TREE');
    });

    it('correctly parses TIMELINE data', () => {
        const result = VisualizationDataSchema.parse(VALID_TIMELINE_DATA);
        expect(result.type).toBe('TIMELINE');
    });

    it('correctly parses GRID data', () => {
        const result = VisualizationDataSchema.parse(VALID_GRID_DATA);
        expect(result.type).toBe('GRID');
    });

    it('rejects data with unknown type', () => {
        const invalid = { type: 'BUBBLE', data: {} };
        expect(() => VisualizationDataSchema.parse(invalid)).toThrow();
    });
});

/**
 * Component tests for MapVisualizer v2 (WanderWord-style)
 *
 * Tests that the MapVisualizer renders an SVG, plots the correct number of
 * points based on activeStepIndex, and handles missing routes gracefully.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import MapVisualizer from '@/src/components/MapVisualizer';
import type { MapVisualizationData } from '@/src/schemas/visualizerData';

/* ========================================
   Minimal TopoJSON mock (single polygon)
   ======================================== */

const MOCK_TOPOJSON = {
    type: 'Topology',
    objects: {
        countries: {
            type: 'GeometryCollection',
            geometries: [
                {
                    type: 'Polygon',
                    arcs: [[0]],
                    id: '999',
                    properties: { name: 'TestCountry' },
                },
            ],
        },
    },
    arcs: [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]],
    transform: {
        scale: [0.036003600360036005, 0.017361589674592462],
        translate: [-180, -89.99892578124998],
    },
};

/* ========================================
   Test Data Fixtures
   ======================================== */

const MAP_DATA_WITH_ROUTES: MapVisualizationData = {
    type: 'MAP',
    projection: 'naturalEarth',
    points: [
        { order: 1, location_name: 'Ethiopia', coordinates: [9.145, 40.489], era: '800 CE', context: 'Origin' },
        { order: 2, location_name: 'Yemen', coordinates: [15.552, 48.516], era: '1400 CE', context: 'Cultivation' },
        { order: 3, location_name: 'Istanbul', coordinates: [41.008, 28.978], era: '1550 CE', context: 'Coffeehouses' },
    ],
    routes: [
        { from: 1, to: 2, method: 'Trade', duration_years: 600 },
        { from: 2, to: 3, method: 'Ottoman Expansion', duration_years: 150 },
    ],
};

const MAP_DATA_NO_ROUTES: MapVisualizationData = {
    type: 'MAP',
    projection: 'mercator',
    points: [
        { order: 1, location_name: 'PointA', coordinates: [10, 20], era: '500 CE', context: 'Test A' },
        { order: 2, location_name: 'PointB', coordinates: [30, 40], era: '900 CE', context: 'Test B' },
    ],
};

/* ========================================
   Setup — mock fetch for TopoJSON
   ======================================== */

beforeEach(() => {
    vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue(MOCK_TOPOJSON),
        }),
    );
    // Mock clientWidth for responsive container
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 800 });

    // Mock SVG methods that JSDOM doesn't implement
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = globalThis as any;
    if (typeof w.SVGPathElement !== 'undefined' && !w.SVGPathElement.prototype.getTotalLength) {
        w.SVGPathElement.prototype.getTotalLength = () => 1000;
    }
    if (typeof w.SVGElement !== 'undefined' && !w.SVGElement.prototype.getScreenCTM) {
        w.SVGElement.prototype.getScreenCTM = () => ({
            a: 1, b: 0, c: 0, d: 1, e: 0, f: 0,
            inverse: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }),
            multiply: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }),
            translate: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }),
        });
    }
    if (typeof w.SVGElement !== 'undefined' && !w.SVGElement.prototype.getBBox) {
        w.SVGElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 100, height: 100 });
    }
    if (typeof w.SVGSVGElement !== 'undefined' && !w.SVGSVGElement.prototype.createSVGPoint) {
        w.SVGSVGElement.prototype.createSVGPoint = () => ({ x: 0, y: 0, matrixTransform: () => ({ x: 0, y: 0 }) });
    }
});

afterEach(() => {
    vi.restoreAllMocks();
});

/* ========================================
   Tests
   ======================================== */

describe('MapVisualizer', () => {
    it('renders the map container with data-testid', (): void => {
        render(<MapVisualizer data={MAP_DATA_WITH_ROUTES} accentColor="#D97706" activeStepIndex={0} />);
        expect(screen.getByTestId('map-visualizer')).toBeInTheDocument();
    });

    it('renders an SVG element', (): void => {
        const { container } = render(
            <MapVisualizer data={MAP_DATA_WITH_ROUTES} accentColor="#D97706" activeStepIndex={0} />,
        );
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('plots visible points up to activeStepIndex', async (): Promise<void> => {
        render(<MapVisualizer data={MAP_DATA_WITH_ROUTES} accentColor="#D97706" activeStepIndex={2} />);

        await waitFor(() => {
            expect(screen.getByTestId('map-point-1')).toBeInTheDocument();
            expect(screen.getByTestId('map-point-2')).toBeInTheDocument();
            expect(screen.getByTestId('map-point-3')).toBeInTheDocument();
        });
    });

    it('only shows first point when activeStepIndex is 0', async (): Promise<void> => {
        render(<MapVisualizer data={MAP_DATA_WITH_ROUTES} accentColor="#D97706" activeStepIndex={0} />);

        await waitFor(() => {
            expect(screen.getByTestId('map-point-1')).toBeInTheDocument();
        });

        // Points 2 and 3 should not be rendered yet
        expect(screen.queryByTestId('map-point-2')).not.toBeInTheDocument();
        expect(screen.queryByTestId('map-point-3')).not.toBeInTheDocument();
    });

    it('displays label for active point', async (): Promise<void> => {
        render(<MapVisualizer data={MAP_DATA_WITH_ROUTES} accentColor="#D97706" activeStepIndex={0} />);

        await waitFor(() => {
            const label = screen.getByTestId('map-label-1');
            expect(label).toBeInTheDocument();
            // Active label should contain the country code and full name
            expect(label.textContent).toContain('Ethiopia');
        });
    });

    it('handles missing routes gracefully (routes undefined)', (): void => {
        expect(() => {
            render(<MapVisualizer data={MAP_DATA_NO_ROUTES} accentColor="#2563EB" activeStepIndex={0} />);
        }).not.toThrow();
        expect(screen.getByTestId('map-visualizer')).toBeInTheDocument();
    });

    it('handles empty routes array gracefully', (): void => {
        const dataWithEmptyRoutes: MapVisualizationData = {
            ...MAP_DATA_WITH_ROUTES,
            routes: [],
        };
        expect(() => {
            render(<MapVisualizer data={dataWithEmptyRoutes} accentColor="#2563EB" activeStepIndex={0} />);
        }).not.toThrow();
    });

    it('renders with naturalEarth projection regardless of data projection', (): void => {
        const projections: MapVisualizationData['projection'][] = [
            'orthographic',
            'mercator',
            'naturalEarth',
        ];

        for (const projection of projections) {
            const { unmount } = render(
                <MapVisualizer
                    data={{ ...MAP_DATA_WITH_ROUTES, projection }}
                    accentColor="#D97706"
                    activeStepIndex={0}
                />,
            );
            expect(screen.getByTestId('map-visualizer')).toBeInTheDocument();
            unmount();
        }
    });

    it('fetches the TopoJSON world map', async (): Promise<void> => {
        render(<MapVisualizer data={MAP_DATA_WITH_ROUTES} accentColor="#D97706" activeStepIndex={0} />);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/topojson/world-110m.json');
        });
    });
});

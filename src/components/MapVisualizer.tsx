'use client';

/**
 * MapVisualizer — Static D3 world map for geographic word journeys
 *
 * Renders an SVG world map using D3 geo projections (orthographic/mercator/naturalEarth),
 * plots numbered point markers at coordinates, draws bezier route curves between
 * connected points, and shows labels with location_name + era.
 *
 * Static rendering only — scroll animations will be added in Phase 3.
 */

import { useRef, useEffect, useState, useCallback } from 'react';
import { select } from 'd3-selection';
import type { Selection } from 'd3-selection';
import { line, curveBasis } from 'd3-shape';
import {
    geoOrthographic,
    geoMercator,
    geoNaturalEarth1,
    geoPath,
} from 'd3-geo';
import type { GeoProjection, GeoPermissibleObjects } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { MapVisualizationData, MapPoint } from '@/src/schemas/visualizerData';

/* ========================================
   Types
   ======================================== */

interface MapVisualizerProps {
    data: MapVisualizationData;
    accentColor: string;
}

/* ========================================
   Helpers
   ======================================== */

/** Build a D3 projection from the schema's projection name */
function createProjection(
    projectionType: MapVisualizationData['projection'],
    width: number,
    height: number,
): GeoProjection {
    switch (projectionType) {
        case 'orthographic':
            return geoOrthographic()
                .scale(Math.min(width, height) * 0.38)
                .translate([width / 2, height / 2])
                .clipAngle(90);
        case 'mercator':
            return geoMercator()
                .scale(Math.min(width, height) * 0.2)
                .translate([width / 2, height / 2 + 40]);
        case 'naturalEarth':
            return geoNaturalEarth1()
                .scale(Math.min(width, height) * 0.26)
                .translate([width / 2, height / 2]);
    }
}

/** Convert [lat, lng] (schema format) → [lng, lat] (D3 format) */
function toD3Coords(point: MapPoint): [number, number] {
    return [point.coordinates[1], point.coordinates[0]];
}

/* ========================================
   Component
   ======================================== */

export default function MapVisualizer({
    data,
    accentColor,
}: MapVisualizerProps): React.JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

    /* ---- Responsive size ---- */
    const updateDimensions = useCallback((): void => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        if (w === 0) return; // Skip zero-width (e.g. jsdom default)
        const h = Math.min(w * 0.625, 500); // 16:10 aspect, max 500px
        setDimensions((prev) => {
            if (prev.width === w && prev.height === h) return prev;
            return { width: w, height: h };
        });
    }, []);

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return (): void => window.removeEventListener('resize', updateDimensions);
    }, [updateDimensions]);

    /* ---- D3 rendering ---- */
    useEffect(() => {
        if (!svgRef.current) return;

        let aborted = false;
        const { width, height } = dimensions;
        const svg = select(svgRef.current);
        svg.selectAll('*').remove();

        const projection = createProjection(data.projection, width, height);

        // Center projection on the midpoint of all points
        if (data.points.length > 0) {
            const lngs = data.points.map((p) => p.coordinates[1]);
            const lats = data.points.map((p) => p.coordinates[0]);
            const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
            const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
            projection.center([0, 0]).rotate([-centerLng, -centerLat, 0]);
        }

        const pathGenerator = geoPath().projection(projection);

        // Background sphere (ocean)
        const defs = svg.append('defs');
        const gradient = defs
            .append('radialGradient')
            .attr('id', 'ocean-gradient')
            .attr('cx', '50%')
            .attr('cy', '50%')
            .attr('r', '50%');
        gradient.append('stop').attr('offset', '0%').attr('stop-color', '#EEF2FF');
        gradient.append('stop').attr('offset', '100%').attr('stop-color', '#E0E7FF');

        svg.append('path')
            .datum({ type: 'Sphere' } as GeoPermissibleObjects)
            .attr('d', pathGenerator)
            .attr('fill', 'url(#ocean-gradient)')
            .attr('stroke', '#C7D2FE')
            .attr('stroke-width', 0.5);

        // Load TopoJSON and render countries
        fetch('/topojson/world-110m.json')
            .then((response) => response.json())
            .then((world: Topology) => {
                if (aborted) return;
                const countries = feature(world, world.objects.countries);

                // Draw countries
                svg.append('g')
                    .attr('class', 'countries')
                    .selectAll('path')
                    .data('features' in countries ? countries.features : [])
                    .join('path')
                    .attr('d', pathGenerator as never)
                    .attr('fill', '#E5E7EB')
                    .attr('stroke', '#D1D5DB')
                    .attr('stroke-width', 0.4);

                // Draw routes
                renderRoutes(svg, data, projection, accentColor);

                // Draw points + labels
                renderPoints(svg, data, projection, accentColor);
            })
            .catch(() => {
                if (aborted) return;
                // Graceful fallback: render points without countries
                renderRoutes(svg, data, projection, accentColor);
                renderPoints(svg, data, projection, accentColor);
            });

        return (): void => {
            aborted = true;
        };
    }, [data, accentColor, dimensions]);

    return (
        <div ref={containerRef} style={{ width: '100%' }} data-testid="map-visualizer">
            <svg
                ref={svgRef}
                width={dimensions.width}
                height={dimensions.height}
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    overflow: 'hidden',
                }}
            />
        </div>
    );
}

/* ========================================
   Route Rendering
   ======================================== */

function renderRoutes(
    svg: Selection<SVGSVGElement, unknown, null, undefined>,
    data: MapVisualizationData,
    projection: GeoProjection,
    accentColor: string,
): void {
    if (!data.routes || data.routes.length === 0) return;

    const routesGroup = svg.append('g').attr('class', 'routes');

    for (const route of data.routes) {
        const fromPoint = data.points.find((p) => p.order === route.from);
        const toPoint = data.points.find((p) => p.order === route.to);
        if (!fromPoint || !toPoint) continue;

        const from = projection(toD3Coords(fromPoint));
        const to = projection(toD3Coords(toPoint));
        if (!from || !to) continue;

        // Bezier curve — arc upward proportional to distance
        const dx = to[0] - from[0];
        const dy = to[1] - from[1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        const midX = (from[0] + to[0]) / 2;
        const midY = (from[1] + to[1]) / 2 - dist * 0.25;

        const lineGenerator = line<[number, number]>().curve(curveBasis);
        const pathData = lineGenerator([from, [midX, midY], to]);
        if (!pathData) continue;

        routesGroup
            .append('path')
            .attr('d', pathData)
            .attr('fill', 'none')
            .attr('stroke', accentColor)
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '6,4')
            .attr('stroke-opacity', 0.5);
    }
}

/* ========================================
   Point + Label Rendering
   ======================================== */

function renderPoints(
    svg: Selection<SVGSVGElement, unknown, null, undefined>,
    data: MapVisualizationData,
    projection: GeoProjection,
    accentColor: string,
): void {
    const pointsGroup = svg.append('g').attr('class', 'points');

    for (const point of data.points) {
        const coords = projection(toD3Coords(point));
        if (!coords) continue;

        // Influence halo
        pointsGroup
            .append('circle')
            .attr('cx', coords[0])
            .attr('cy', coords[1])
            .attr('r', 18)
            .attr('fill', accentColor)
            .attr('opacity', 0.1);

        // Outer ring
        pointsGroup
            .append('circle')
            .attr('cx', coords[0])
            .attr('cy', coords[1])
            .attr('r', 10)
            .attr('fill', 'white')
            .attr('stroke', accentColor)
            .attr('stroke-width', 2);

        // Inner numbered marker
        pointsGroup
            .append('circle')
            .attr('cx', coords[0])
            .attr('cy', coords[1])
            .attr('r', 7)
            .attr('fill', accentColor)
            .attr('data-testid', `map-point-${point.order}`);

        // Order number
        pointsGroup
            .append('text')
            .attr('x', coords[0])
            .attr('y', coords[1] + 1)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('fill', 'white')
            .attr('font-size', '9px')
            .attr('font-weight', '700')
            .attr('font-family', 'Inter, system-ui, sans-serif')
            .text(point.order);

        // Location label
        pointsGroup
            .append('text')
            .attr('x', coords[0])
            .attr('y', coords[1] - 18)
            .attr('text-anchor', 'middle')
            .attr('fill', '#1A1A1A')
            .attr('font-size', '11px')
            .attr('font-weight', '600')
            .attr('font-family', 'Inter, system-ui, sans-serif')
            .attr('data-testid', `map-label-${point.order}`)
            .text(point.location_name);

        // Era sub-label
        pointsGroup
            .append('text')
            .attr('x', coords[0])
            .attr('y', coords[1] - 6)
            .attr('text-anchor', 'middle')
            .attr('fill', '#6B7280')
            .attr('font-size', '9px')
            .attr('font-weight', '400')
            .attr('font-family', 'Inter, system-ui, sans-serif')
            .text(point.era);
    }
}

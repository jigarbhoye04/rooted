'use client';

/**
 * MapVisualizer v3.1 — Interactive Archival Map
 *
 * Features:
 * - Zoom & Pan support (d3-zoom)
 * - Persistent base map (no re-renders on step change)
 * - Smooth travel animations (moving marker along route)
 * - Enhanced destination cards (white, shadowed) with Era/Context
 * - Step-based progression with dimming of past steps
 * - Auto-Focus Camera: Zooms to fit active route + destination (adjusted zoom level)
 */

import { useRef, useEffect, useMemo, useState } from 'react';
import { select } from 'd3-selection';
import type { Selection } from 'd3-selection';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3-geo';
import type { GeoProjection } from 'd3-geo';
import { zoom as d3Zoom, zoomIdentity } from 'd3-zoom';
import type { ZoomBehavior } from 'd3-zoom';
import { line, curveBasis } from 'd3-shape';
import { easeCubicOut } from 'd3-ease';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { MapVisualizationData } from '@/src/schemas/visualizerData';

/* ========================================
   Types
   ======================================== */

interface MapVisualizerProps {
    data: MapVisualizationData;
    accentColor: string;
    activeStepIndex: number;
}

/* ========================================
   Component
   ======================================== */

export default function MapVisualizer({
    data,
    accentColor,
    activeStepIndex,
}: MapVisualizerProps): React.JSX.Element {
    const svgRef = useRef<SVGSVGElement>(null);
    const contentGroupRef = useRef<Selection<SVGGElement, unknown, null, undefined> | null>(null);
    const zoomBehaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);
    const [projection] = useState(() => geoNaturalEarth1());

    // Fixed dimensions for internal coordinate system
    const BASE_WIDTH = 960;
    const BASE_HEIGHT = 500;

    // Colors
    const bgColor = useMemo(() => {
        // Desaturated paper background
        return '#EBE9E4'; // Slightly warmer/darker than pure white for archival feel
    }, []);

    /* ---- Effect 1: Initialize Map & Zoom (Runs once) ---- */
    useEffect(() => {
        if (!svgRef.current) return;

        const svg = select(svgRef.current);
        svg.selectAll('*').remove(); // Clear mostly for HMR or fresh mount

        // Create a wrapper group for zoom/pan
        const contentGroup = svg.append('g').attr('class', 'map-content');
        contentGroupRef.current = contentGroup;

        // Setup Projection
        projection
            .scale(160)
            .translate([BASE_WIDTH / 2, BASE_HEIGHT / 2]);

        // Center map if points exist
        if (data.points.length > 0) {
            const lngs = data.points.map((p) => p.coordinates[1]); // assuming data is [lat, lng]
            const lats = data.points.map((p) => p.coordinates[0]);
            const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
            const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
            projection.rotate([-centerLng, -centerLat * 0.2, 0]);
        }

        const pathGenerator = geoPath().projection(projection);

        // 2. Graticule
        const graticule = geoGraticule().step([15, 15]);
        contentGroup.append('path')
            .datum(graticule())
            .attr('class', 'graticule')
            .attr('d', pathGenerator)
            .attr('fill', 'none')
            .attr('stroke', '#A8A29E') // Warm gray
            .attr('stroke-width', 0.5)
            .attr('stroke-opacity', 0.3);

        // 3. Countries
        fetch('/topojson/world-110m.json')
            .then((res) => res.json())
            .then((world: Topology) => {
                const countries = feature(world, world.objects.countries);
                contentGroup.append('g')
                    .attr('class', 'countries')
                    .selectAll('path')
                    .data('features' in countries ? countries.features : [])
                    .join('path')
                    .attr('d', pathGenerator as never)
                    .attr('fill', '#F5F5F0') // Very light fill for land
                    .attr('stroke', '#1A1A1A') // Dark stroke
                    .attr('stroke-width', 0.5)
                    .attr('stroke-opacity', 0.6);

                // Trigger overlay update after map loads
                updateOverlays(contentGroup, data, projection, activeStepIndex, accentColor);

                // Initial camera position
                updateCamera(svg, zoom, projection, data, activeStepIndex, BASE_WIDTH, BASE_HEIGHT);
            });

        // 4. Zoom Behavior
        const zoom = d3Zoom<SVGSVGElement, unknown>()
            .scaleExtent([1, 8]) // Min zoom 1x, Max 8x
            .translateExtent([[0, 0], [BASE_WIDTH, BASE_HEIGHT]])
            .on('zoom', (event) => {
                contentGroup.attr('transform', event.transform);
            });

        zoomBehaviorRef.current = zoom;
        svg.call(zoom);

    }, [data.points, projection, BASE_WIDTH, BASE_HEIGHT]); // Only run on mount or data change

    /* ---- Effect 2: Update Overlays & Camera (Runs on step change) ---- */
    useEffect(() => {
        if (!contentGroupRef.current || !svgRef.current || !zoomBehaviorRef.current) return;

        updateOverlays(contentGroupRef.current, data, projection, activeStepIndex, accentColor);

        // Update Camera Position
        const svg = select(svgRef.current);
        updateCamera(svg, zoomBehaviorRef.current, projection, data, activeStepIndex, BASE_WIDTH, BASE_HEIGHT);

    }, [activeStepIndex, data, projection, accentColor, BASE_WIDTH, BASE_HEIGHT]);

    return (
        <div className="w-full h-full bg-[#EBE9E4] overflow-hidden relative">
            <svg
                ref={svgRef}
                viewBox={`0 0 ${BASE_WIDTH} ${BASE_HEIGHT}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ width: '100%', height: '100%', cursor: 'grab' }}
                data-testid="map-visualizer"
            />
        </div>
    );
}

/* ========================================
   Overlay Rendering Logic
   ======================================== */

function updateOverlays(
    container: any, // Use any to bypass strict D3 selection typing issues
    data: MapVisualizationData,
    projection: GeoProjection,
    activeStepIndex: number,
    accentColor: string
) {
    // We maintain persistent groups to avoiding clearing animations
    let routesGroup = container.select('.routes-layer');
    if (routesGroup.empty()) routesGroup = container.append('g').attr('class', 'routes-layer');

    let pointsGroup = container.select('.points-layer');
    if (pointsGroup.empty()) pointsGroup = container.append('g').attr('class', 'points-layer');

    let travelerGroup = container.select('.traveler-layer');
    if (travelerGroup.empty()) travelerGroup = container.append('g').attr('class', 'traveler-layer');

    // Ensure layering order: Land (base) -> Routes -> Points -> Traveler (on top)
    // "countries" layer is rendered first in useEffect.
    // So removing .lower() keeps routes on top of land if appended after.
    // But `svg.append('g')` might append to end.
    // If we want guaranteed order:
    // We can select '.countries' and insert routes before/after.
    // Or just rely on append order if groups are persistent.
    // But `useEffect` appends `countries` asynchronously.
    // safer to use .raise() or precise ordering.

    container.select('.countries').lower(); // Push land to bottom
    container.select('.graticule').lower(); // Push graticule to bottom (or above land?)
    // Actually graticule usually above land for archival look? Or below?
    // Let's keep land -> graticule -> routes -> points.

    routesGroup.raise();
    pointsGroup.raise(); // Keep points above routes
    travelerGroup.raise(); // Keep traveler above points

    const pointsByOrder = new Map(data.points.map((p) => [p.order, p]));

    /* ---- 1. Routes & Moving Traveler ---- */
    // Find the active route (leading to current step)
    const activeRouteIndex = data.routes?.findIndex(r => r.to === activeStepIndex + 1);
    // const activeRoute = activeRouteIndex !== undefined && activeRouteIndex !== -1 ? data.routes![activeRouteIndex] : null;

    // Render all visible routes
    if (data.routes) {
        data.routes.forEach(route => {
            if (route.to > activeStepIndex + 1) return; // Future route

            const fromPoint = pointsByOrder.get(route.from);
            const toPoint = pointsByOrder.get(route.to);
            if (!fromPoint || !toPoint) return;

            const from = projection([fromPoint.coordinates[1], fromPoint.coordinates[0]]);
            const to = projection([toPoint.coordinates[1], toPoint.coordinates[0]]);
            if (!from || !to) return;

            // Generate Path
            const dx = to[0] - from[0];
            const dy = to[1] - from[1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            const midX = (from[0] + to[0]) / 2;
            const midY = (from[1] + to[1]) / 2 - dist * 0.2;
            const lineGen = line().curve(curveBasis);
            const d = lineGen([from, [midX, midY], to]);
            if (!d) return;

            // Unique ID for route
            const routeId = `route-${route.from}-${route.to}`;

            // Check if exists
            let path = routesGroup.select(`#${routeId}`) as Selection<SVGPathElement, unknown, null, undefined>;
            if (path.empty()) {
                path = routesGroup.append('path')
                    .attr('id', routeId)
                    .attr('d', d)
                    .attr('fill', 'none')
                    .attr('stroke', '#1A1A1A')
                    .attr('stroke-width', 1.5)
                    .attr('stroke-dasharray', '0,0') // Start invisible or solid? 
                    .attr('stroke-linecap', 'round')
                    .attr('stroke-opacity', 0.8) as Selection<SVGPathElement, unknown, null, undefined>;

                const pathNode = path.node();
                const len = (pathNode && typeof pathNode.getTotalLength === 'function')
                    ? pathNode.getTotalLength()
                    : 0;
                path.attr('stroke-dasharray', len)
                    .attr('stroke-dashoffset', len)
                    .transition()
                    .duration(1500)
                    .ease(easeCubicOut)
                    .attr('stroke-dashoffset', 0);
            } else {
                // Ensure visible if already drawn
                path.attr('stroke-dashoffset', 0);
            }

            // Animate Traveler if this is the active route being traversed
            const isJustBecameActive = (route.to === activeStepIndex + 1);

            if (isJustBecameActive) {
                // Moving Arrow/Dot
                const travelerId = `traveler-${route.from}-${route.to}`;
                let traveler = travelerGroup.select(`#${travelerId}`);

                // Clear old travelers
                travelerGroup.selectAll('*').remove();

                traveler = travelerGroup.append('g')
                    .attr('id', travelerId)
                    .attr('transform', `translate(${from[0]}, ${from[1]})`);

                // Icon: Plane or Arrow
                traveler.append('circle')
                    .attr('r', 4)
                    .attr('fill', accentColor)
                    .attr('stroke', '#FFF')
                    .attr('stroke-width', 1.5);

                const pathNode = path.node();
                if (pathNode && typeof pathNode.getTotalLength === 'function' && typeof pathNode.getPointAtLength === 'function') {
                    traveler.transition()
                        .delay(200) // Slight delay to sync with route drawing start
                        .duration(1500)
                        .ease(easeCubicOut)
                        .attrTween('transform', () => {
                            return (t: number) => {
                                const p = pathNode.getPointAtLength(pathNode.getTotalLength() * t);
                                return `translate(${p.x}, ${p.y})`;
                            };
                        });
                }
            }
        });
    }

    /* ---- 2. Points & Cards ---- */
    const sortedPoints = [...data.points].sort((a, b) => a.order - b.order);

    sortedPoints.forEach((point, index) => {
        if (index > activeStepIndex) return;

        // Data is [lat, lng], D3 expects [lng, lat]
        const [lat, lng] = point.coordinates;
        const coords = projection([lng, lat]);
        if (!coords) return;

        const pointId = `point-${point.order}`;
        let g = pointsGroup.select(`#${pointId}`) as Selection<SVGGElement, unknown, null, undefined>;
        const isActive = index === activeStepIndex;

        if (g.empty()) {
            g = pointsGroup.append('g')
                .attr('id', pointId)
                .attr('data-testid', `map-point-${point.order}`)
                .attr('transform', `translate(${coords[0]}, ${coords[1]})`)
                .attr('opacity', 0) as Selection<SVGGElement, unknown, null, undefined>;

            g.transition().delay(isActive ? 1000 : 0).duration(500).attr('opacity', 1);
        }

        // Update content
        g.selectAll('*').remove();

        if (isActive) {
            // == Active Card (Expanded) ==
            // Use foreignObject to allow HTML text wrapping
            const cardW = 220; // Slightly wider
            const cardH = 80;  // Taller for multiline

            const fo = g.append('foreignObject')
                .attr('x', -cardW / 2)
                .attr('y', -cardH - 12)
                .attr('width', cardW)
                .attr('height', cardH);

            const div = fo.append('xhtml:div')
                .attr('data-testid', `map-label-${point.order}`)
                .style('width', '100%')
                .style('height', '100%')
                .style('background-color', 'white')
                .style('border', '1px solid #E5E7EB')
                .style('border-radius', '6px')
                .style('box-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)')
                .style('display', 'flex')
                .style('flex-direction', 'column')
                .style('align-items', 'center')
                .style('justify-content', 'center')
                .style('padding', '8px')
                .style('text-align', 'center')
                .style('font-family', 'var(--font-satoshi), ui-sans-serif, system-ui, sans-serif');

            // Title
            div.append('div')
                .style('font-weight', 'bold')
                .style('font-size', '12px')
                .style('color', '#111827')
                .style('line-height', '1.2')
                .style('margin-bottom', '2px')
                .text(point.location_name);

            // Era
            div.append('div')
                .style('font-size', '10px')
                .style('color', '#6B7280')
                .style('font-weight', '500')
                .style('margin-bottom', '4px')
                .text(point.era);

            // Context (HTML allows wrapping!)
            div.append('div')
                .style('font-family', 'serif')
                .style('font-style', 'italic')
                .style('font-size', '10px')
                .style('color', '#4B5563')
                .style('line-height', '1.3')
                .style('display', '-webkit-box')
                .style('-webkit-line-clamp', '2') // Limit to 2 lines
                .style('-webkit-box-orient', 'vertical')
                .style('overflow', 'hidden')
                .text(point.context);

            // Pin (Active)
            g.append('circle')
                .attr('r', 5)
                .attr('fill', accentColor)
                .attr('stroke', '#FFFFFF')
                .attr('stroke-width', 2);

        } else {
            // == Inactive Point (Dimmed) ==
            // User requested: "little dim"
            g.append('circle')
                .attr('r', 3)
                .attr('fill', '#9CA3AF') // Light gray
                .attr('stroke', '#FFFFFF')
                .attr('stroke-width', 1);

            g.append('text')
                .attr('y', 12)
                .attr('text-anchor', 'middle')
                .attr('fill', '#9CA3AF') // Dimmed text color
                .attr('font-family', 'sans-serif')
                .attr('font-size', '9px')
                .attr('font-weight', '500')
                .attr('opacity', 0.8) // Extra opacity
                .text(point.location_name);
        }
    });

    // Remove future points if we stepped back
    const validIds = new Set(
        sortedPoints.slice(0, activeStepIndex + 1).map(p => `point-${p.order}`)
    );
    pointsGroup.selectAll('g').each(function (this: SVGGElement) {
        const el = select(this);
        if (!validIds.has(el.attr('id'))) {
            el.transition().duration(300).attr('opacity', 0).remove();
        }
    });
}

/* ========================================
   Camera Logic (Auto-Zoom)
   ======================================== */

function updateCamera(
    svg: Selection<SVGSVGElement, unknown, null, undefined>,
    zoom: ZoomBehavior<SVGSVGElement, unknown>,
    projection: GeoProjection,
    data: MapVisualizationData,
    activeStepIndex: number,
    baseWidth: number,
    baseHeight: number
) {
    const sortedPoints = [...data.points].sort((a, b) => a.order - b.order);
    const activePoint = sortedPoints[activeStepIndex];
    if (!activePoint) return;

    // Determine focus area
    // Step 0: Just the point
    // Step >0: Include previous point (route) + current point

    let bounds: [[number, number], [number, number]] | null = null;

    // Get [lat, lng] -> [lng, lat] for D3
    const [pLat, pLng] = activePoint.coordinates;
    const pCoords = projection([pLng, pLat]);

    if (!pCoords) return;

    if (activeStepIndex === 0) {
        // Focus on single point with reasonable zoom
        const size = 120; // Slightly larger box -> less zoomed
        bounds = [
            [pCoords[0] - size, pCoords[1] - size],
            [pCoords[0] + size, pCoords[1] + size]
        ];
    } else {
        // Include previous point to show the path
        const prevPoint = sortedPoints[activeStepIndex - 1];
        if (prevPoint) {
            const [prevLat, prevLng] = prevPoint.coordinates;
            const prevCoords = projection([prevLng, prevLat]);

            if (prevCoords) {
                // Bounding box of both points
                const x0 = Math.min(prevCoords[0], pCoords[0]);
                const y0 = Math.min(prevCoords[1], pCoords[1]);
                const x1 = Math.max(prevCoords[0], pCoords[0]);
                const y1 = Math.max(prevCoords[1], pCoords[1]);

                bounds = [[x0, y0], [x1, y1]];
            }
        }
    }

    if (!bounds) return;

    // Calculate Zoom Transform
    const [[x0, y0], [x1, y1]] = bounds;
    const width = x1 - x0;
    const height = y1 - y0;

    // Add padding (User request: "little less zoomed")
    const padding = 150; // Increased padding

    // Calculate scale
    const scaleX = (baseWidth - padding * 2) / Math.max(width, 1);
    const scaleY = (baseHeight - padding * 2) / Math.max(height, 1);
    let k = Math.min(scaleX, scaleY);

    // Clamp zoom level (User request: "little less zoomed")
    k = Math.max(1, Math.min(k, 2.5)); // Cap at 2.5x (was 4x)

    const tx = baseWidth / 2 - k * (x0 + x1) / 2;
    const ty = baseHeight / 2 - k * (y0 + y1) / 2;

    // Transition the SVG transform
    svg.transition()
        .duration(1500)
        .call(zoom.transform, zoomIdentity.translate(tx, ty).scale(k));
}

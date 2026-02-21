'use client';

/**
 * TreeVisualizer v1.0 — Interactive D3 Tree
 *
 * Renders a horizontal dendrogram of a word's etymology.
 */

import { useRef, useEffect, useMemo } from 'react';
import { select } from 'd3-selection';
import { hierarchy, cluster } from 'd3-hierarchy';
import { linkHorizontal } from 'd3-shape';
import { zoom as d3Zoom, zoomIdentity } from 'd3-zoom';
import { easeCubicOut } from 'd3-ease';
import type { TreeStep } from '@/src/hooks/useTreeTimeline';
import type { TreeVisualizationData, TreeNode } from '@/src/schemas/visualizerData';

/* ========================================
   Types
   ======================================== */

interface TreeVisualizerProps {
    data: TreeVisualizationData;
    steps: TreeStep[];
    accentColor: string;
    activeStepIndex: number;
}

// Extends d3 HierarchyNode with an explicit step index for syncing
interface EnrichedHierarchyNode extends d3.HierarchyNode<TreeNode> {
    stepIndex: number; // The order in which this node was unveiled via useTreeTimeline
}

// For paths in D3
interface EnrichedHierarchyLink {
    source: EnrichedHierarchyNode & { x: number; y: number };
    target: EnrichedHierarchyNode & { x: number; y: number };
}

/* ========================================
   Component
   ======================================== */

export default function TreeVisualizer({
    data,
    steps,
    accentColor,
    activeStepIndex,
}: TreeVisualizerProps): React.JSX.Element {
    const svgRef = useRef<SVGSVGElement>(null);
    const contentGroupRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
    const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

    // Dimensions
    const BASE_WIDTH = 1000;
    const BASE_HEIGHT = 800;
    const MARGIN = { top: 50, right: 150, bottom: 50, left: 100 };

    /* ---- Derive Hierarchy Data with Step Indexes ---- */
    const { d3Nodes, d3Links } = useMemo(() => {
        // Build the D3 Hierarchy from data.root
        // It requires mapping children correctly
        const rootNode = hierarchy<TreeNode>(data.root, d => d.children);

        // Map `steps` array indexes so we can easily show/hide them in sequence
        // We assigned a pseudo-unique ID to `steps` inside `useTreeTimeline`,
        // but since `steps` is produced via DFS and `d3Root.descendants()` is ALSO DFS,
        // we can typically just zip them or match them by node reference/term+depth.
        // It's safer to map by reference or by matching properties since data.root is immutable here.

        const stepIndexMap = new Map<TreeNode, number>();
        steps.forEach((step, i) => {
            stepIndexMap.set(step.node, i);
        });

        // Enqueue nodes and assign step indexes
        const descendants = rootNode.descendants() as (EnrichedHierarchyNode & { x: number; y: number })[];
        descendants.forEach(d => {
            // Find its corresponding step index
            // If reference matching fails due to cloning, match by term+language+era
            let index = stepIndexMap.get(d.data);
            if (index === undefined) {
                // fallback matching
                const matchedStep = steps.findIndex(s => s.node.term === d.data.term && s.node.language === d.data.language && s.node.meaning === d.data.meaning);
                index = Math.max(0, matchedStep);
            }
            d.stepIndex = index;
        });

        // Layout: cluster gives dendrogram (leaf nodes align right)
        // while `tree` spaces them out more evenly.
        // Using `cluster` based on user requirement: "horizontal dendrogram"
        // In D3 trees (horizontal), x is vertical position, y is horizontal position.
        const d3Cluster = cluster<TreeNode>().size([BASE_HEIGHT - MARGIN.top - MARGIN.bottom, BASE_WIDTH - MARGIN.left - MARGIN.right]);
        d3Cluster(rootNode);

        // Get links
        const links = rootNode.links() as unknown as EnrichedHierarchyLink[];

        return { d3Nodes: descendants, d3Links: links };
    }, [data.root, steps, BASE_WIDTH, BASE_HEIGHT, MARGIN]);


    /* ---- Effect 1: Initialize Base SVG (Runs Once) ---- */
    useEffect(() => {
        if (!svgRef.current) return;

        const svg = select(svgRef.current);
        svg.selectAll('*').remove();

        const contentGroup = svg.append('g').attr('class', 'tree-content');
        contentGroupRef.current = contentGroup;

        // Setup layers
        contentGroup.append('g').attr('class', 'links-layer').attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);
        contentGroup.append('g').attr('class', 'nodes-layer').attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

        // Draw the full tree but hide future elements initially
        const linkGen = linkHorizontal<EnrichedHierarchyLink, { x: number; y: number }>()
            .x(d => d.y)
            .y(d => d.x);

        // Links
        const linksLayer = contentGroup.select('.links-layer');
        linksLayer.selectAll('path')
            .data(d3Links)
            .join('path')
            .attr('id', d => `link-${d.source.stepIndex}-${d.target.stepIndex}`)
            .attr('d', d => linkGen(d) ?? '')
            .attr('fill', 'none')
            .attr('stroke', accentColor)
            .attr('stroke-width', 2)
            .attr('stroke-opacity', 0.15)
            // Stroke dash config for animation
            .each(function () {
                const node = this as SVGPathElement;
                if (node && typeof node.getTotalLength === 'function') {
                    const len = node.getTotalLength();
                    select<SVGPathElement, unknown>(node)
                        .attr('stroke-dasharray', len)
                        .attr('stroke-dashoffset', len);
                }
            });

        // Nodes
        const nodesLayer = contentGroup.select('.nodes-layer');
        const nodeGroups = nodesLayer.selectAll('g')
            .data(d3Nodes)
            .join('g')
            .attr('id', d => `node-${d.stepIndex}`)
            .attr('transform', d => `translate(${d.y},${d.x})`)
            .attr('opacity', 0); // Hide all initially

        // Circle
        nodeGroups.append('circle')
            .attr('r', 5)
            .attr('fill', '#1A1A1A')
            .attr('stroke', '#FDFCF9')
            .attr('stroke-width', 2);

        // Label
        nodeGroups.append('text')
            .attr('dy', '0.31em')
            .attr('x', d => d.children ? -10 : 10)
            .attr('text-anchor', d => d.children ? 'end' : 'start')
            .attr('fill', '#1A1A1A')
            .attr('font-family', 'var(--font-playfair), serif')
            .attr('font-size', '16px')
            .attr('font-style', 'italic')
            .text(d => d.data.term)
            .clone(true).lower() // Outline for legibility
            .attr('stroke', '#FDFCF9')
            .attr('stroke-width', 3)
            .attr('stroke-linejoin', 'round');

        // Sub-label (Language/Era)
        nodeGroups.append('text')
            .attr('dy', '1.6em')
            .attr('x', d => d.children ? -10 : 10)
            .attr('text-anchor', d => d.children ? 'end' : 'start')
            .attr('fill', '#8C8577')
            .attr('font-family', 'ui-monospace, Consolas, monospace')
            .attr('font-size', '10px')
            .attr('text-transform', 'uppercase')
            .text(d => `${d.data.language} • ${d.data.era}`);

        // Set up panning & zooming
        const zoom = d3Zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 4])
            .on('zoom', (event) => {
                contentGroup.attr('transform', event.transform);
            });

        zoomBehaviorRef.current = zoom;
        svg.call(zoom);

        // Initial Layout Trigger
        updateTreeState(svgRef.current, d3Nodes, d3Links, activeStepIndex, BASE_WIDTH, BASE_HEIGHT, MARGIN, zoom);

    }, [d3Nodes, d3Links, accentColor, BASE_WIDTH, BASE_HEIGHT, MARGIN]);

    /* ---- Effect 2: Animate on Step Change ---- */
    useEffect(() => {
        if (!svgRef.current || !zoomBehaviorRef.current) return;
        updateTreeState(svgRef.current, d3Nodes, d3Links, activeStepIndex, BASE_WIDTH, BASE_HEIGHT, MARGIN, zoomBehaviorRef.current);
    }, [activeStepIndex, d3Nodes, d3Links, BASE_WIDTH, BASE_HEIGHT, MARGIN]);

    return (
        <div className="w-full h-full bg-[#FDFCF9] overflow-hidden relative cursor-grab active:cursor-grabbing">
            <svg
                ref={svgRef}
                viewBox={`0 0 ${BASE_WIDTH} ${BASE_HEIGHT}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ width: '100%', height: '100%', outline: 'none' }}
                data-testid="tree-visualizer"
            />
        </div>
    );
}

/* ========================================
   Update Visual State & Camera
   ======================================== */

function updateTreeState(
    svgEl: SVGSVGElement,
    nodes: (EnrichedHierarchyNode & { x: number; y: number })[],
    links: EnrichedHierarchyLink[],
    activeStepIndex: number,
    baseW: number,
    baseH: number,
    margin: { top: number, right: number, bottom: number, left: number },
    zoomBehav: d3.ZoomBehavior<SVGSVGElement, unknown>
) {
    const svg = select(svgEl);

    // Fade in Nodes up to activeStepIndex
    svg.selectAll('.nodes-layer g')
        .each(function (d: unknown) {
            const nodeData = d as EnrichedHierarchyNode;
            const isVisible = nodeData.stepIndex <= activeStepIndex;
            const nodeEl = select(this);
            const currentOpacity = Number(nodeEl.attr('opacity'));

            if (isVisible && currentOpacity === 0) {
                nodeEl.transition().duration(600).attr('opacity', 1);
            } else if (!isVisible && currentOpacity > 0) {
                nodeEl.transition().duration(300).attr('opacity', 0);
            }
        });

    // Draw Links up to activeStepIndex
    svg.selectAll('.links-layer path')
        .each(function (d: unknown) {
            const linkData = d as EnrichedHierarchyLink;
            const isVisible = linkData.target.stepIndex <= activeStepIndex;
            const pathEl = select(this);
            const offset = Number(pathEl.attr('stroke-dashoffset'));

            if (isVisible && offset > 0) {
                pathEl.transition()
                    .duration(800)
                    .ease(easeCubicOut)
                    .attr('stroke-dashoffset', 0)
                    .attr('stroke-opacity', 0.6);
            } else if (!isVisible && offset === 0) {
                const len = Number(pathEl.attr('stroke-dasharray'));
                pathEl.transition()
                    .duration(300)
                    .attr('stroke-dashoffset', len)
                    .attr('stroke-opacity', 0.15);
            }
        });

    // Auto-Focus Camera
    const visibleNodes = nodes.filter(n => n.stepIndex <= activeStepIndex);
    if (visibleNodes.length === 0) return;

    // Get bounds of visible nodes
    const xMin = Math.min(...visibleNodes.map(n => n.y)); // Note: in horizontal tree, x/y are swapped
    const xMax = Math.max(...visibleNodes.map(n => n.y));
    const yMin = Math.min(...visibleNodes.map(n => n.x));
    const yMax = Math.max(...visibleNodes.map(n => n.x));

    const w = Math.max(xMax - xMin, 1);
    const h = Math.max(yMax - yMin, 1);

    // Padding parameters
    const paddingX = 250;
    const paddingY = 200;

    const scaleX = (baseW - paddingX) / w;
    const scaleY = (baseH - paddingY) / h;
    let k = Math.min(scaleX, scaleY);
    k = Math.max(0.8, Math.min(k, 1.5)); // Clamp zoom

    // Center the bounding box:
    const cx = margin.left + (xMin + xMax) / 2;
    const cy = margin.top + (yMin + yMax) / 2;

    // Instead of centering just the active node, let's smoothly move to include all visible tree.
    const tx = baseW / 2 - k * cx;
    const ty = baseH / 2 - k * cy;

    svg.transition()
        .duration(1200)
        .ease(easeCubicOut)
        .call(zoomBehav.transform, zoomIdentity.translate(tx, ty).scale(k));
}

'use client';

import { lazy, Suspense } from 'react';

/**
 * Visualizer — Type switcher component
 *
 * Renders a placeholder card for each visualization type (MAP, TREE, TIMELINE, GRID).
 * Actual D3 visualizations will replace these placeholders in later tasks.
 *
 * Props are validated with VisualizerPropsSchema in dev mode.
 */

import type {
    MapVisualizationData,
    TreeVisualizationData,
    TimelineVisualizationData,
    GridVisualizationData,
    TreeNode,
} from '@/src/schemas/visualizerData';
import { VisualizationDataSchema } from '@/src/schemas/visualizerData';

const LazyMapVisualizer = lazy(() => import('@/src/components/MapVisualizer'));

/* ========================================
   Types
   ======================================== */

interface VisualizerComponentProps {
    type: 'MAP' | 'TREE' | 'TIMELINE' | 'GRID';
    data: unknown;
    accentColor?: string;
}

/* ========================================
   Icon Map
   ======================================== */

const VIZ_META: Record<string, { icon: string; label: string }> = {
    MAP: { icon: '🗺️', label: 'Geographic Journey' },
    TREE: { icon: '🌳', label: 'Etymology Tree' },
    TIMELINE: { icon: '⏳', label: 'Timeline' },
    GRID: { icon: '🔤', label: 'Language Grid' },
};

/* ========================================
   Main Visualizer
   ======================================== */

export default function Visualizer({
    type,
    data,
    accentColor = '#000000',
}: VisualizerComponentProps): React.JSX.Element | null {
    const meta = VIZ_META[type] ?? { icon: '📊', label: 'Visualization' };

    // Validate data at runtime — gracefully skip if invalid
    const parsed = VisualizationDataSchema.safeParse(data);
    if (!parsed.success) {
        return null;
    }

    const validData = parsed.data;

    return (
        <div
            className="glass-card p-8 sm:p-10 opacity-0 animate-slide-up relative overflow-hidden"
            style={{ animationDelay: '400ms' }}
            data-testid="visualizer"
        >
            {/* Accent bar */}
            <div
                className="absolute top-0 left-0 w-full h-0.5"
                style={{ backgroundColor: accentColor }}
            />

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl" role="img" aria-label={meta.label}>
                    {meta.icon}
                </span>
                <div>
                    <h3 className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
                        {meta.label}
                    </h3>
                    <p className="text-[10px] text-muted/60 uppercase tracking-wider mt-0.5">
                        Visualization Preview
                    </p>
                </div>
            </div>

            {/* Type-specific content */}
            {validData.type === 'MAP' && (
                <Suspense fallback={<MapPlaceholder data={validData as MapVisualizationData} accentColor={accentColor} />}>
                    <LazyMapVisualizer data={validData as MapVisualizationData} accentColor={accentColor} />
                </Suspense>
            )}
            {validData.type === 'TREE' && <TreePlaceholder data={validData as TreeVisualizationData} accentColor={accentColor} />}
            {validData.type === 'TIMELINE' && <TimelinePlaceholder data={validData as TimelineVisualizationData} accentColor={accentColor} />}
            {validData.type === 'GRID' && <GridPlaceholder data={validData as GridVisualizationData} />}

            {/* Footer — hidden for MAP (which has a real visualizer now) */}
            {validData.type !== 'MAP' && (
                <div className="mt-6 pt-4 border-t border-border-subtle">
                    <p className="text-[10px] text-muted/50 text-center tracking-wider uppercase">
                        Interactive visualization coming soon
                    </p>
                </div>
            )}
        </div>
    );
}

/* ========================================
   MAP Placeholder
   ======================================== */

function MapPlaceholder({
    data,
    accentColor,
}: {
    data: MapVisualizationData;
    accentColor: string;
}): React.JSX.Element {
    return (
        <div className="space-y-3" data-testid="map-placeholder">
            <div className="flex items-center gap-2 text-xs text-muted mb-2">
                <span className="px-2 py-0.5 rounded-full bg-surface-secondary text-[10px] font-semibold uppercase tracking-wider">
                    {data.projection}
                </span>
                <span>•</span>
                <span>{data.points.length} locations</span>
                {data.routes && <><span>•</span><span>{data.routes.length} routes</span></>}
            </div>

            {data.points.map((point) => (
                <div
                    key={point.order}
                    className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary/50"
                >
                    <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5"
                        style={{ backgroundColor: accentColor }}
                    >
                        {point.order}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-primary">
                            {point.location_name}
                        </p>
                        <p className="text-xs text-muted mt-0.5">{point.era}</p>
                        <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                            {point.context}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ========================================
   TREE Placeholder
   ======================================== */

function countTreeNodes(node: TreeNode): number {
    let count = 1;
    if (node.children) {
        for (const child of node.children) {
            count += countTreeNodes(child);
        }
    }
    return count;
}

function TreePlaceholder({
    data,
    accentColor,
}: {
    data: TreeVisualizationData;
    accentColor: string;
}): React.JSX.Element {
    const totalNodes = countTreeNodes(data.root);

    return (
        <div data-testid="tree-placeholder">
            <div className="flex items-center gap-2 text-xs text-muted mb-4">
                <span className="px-2 py-0.5 rounded-full bg-surface-secondary text-[10px] font-semibold uppercase tracking-wider">
                    {data.layout}
                </span>
                <span>•</span>
                <span>{totalNodes} nodes</span>
            </div>

            {/* Root */}
            <div
                className="p-4 rounded-xl border-2 mb-3"
                style={{ borderColor: accentColor }}
            >
                <p className="text-base font-bold text-text-primary">{data.root.term}</p>
                <p className="text-xs text-muted mt-0.5">
                    {data.root.language} • {data.root.era}
                </p>
                <p className="text-sm text-text-secondary mt-1">{data.root.meaning}</p>
            </div>

            {/* Direct children */}
            {data.root.children && data.root.children.length > 0 && (
                <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-border-subtle ml-4">
                    {data.root.children.map((child) => (
                        <div
                            key={child.term}
                            className="px-3 py-2 rounded-lg bg-surface-secondary/50 text-sm"
                        >
                            <span className="font-semibold text-text-primary">{child.term}</span>
                            <span className="text-muted ml-1 text-xs">({child.language})</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ========================================
   TIMELINE Placeholder
   ======================================== */

const SENTIMENT_COLORS: Record<string, string> = {
    positive: '#22C55E',
    negative: '#EF4444',
    neutral: '#6B7280',
    negative_shift: '#F59E0B',
};

function TimelinePlaceholder({
    data,
    accentColor,
}: {
    data: TimelineVisualizationData;
    accentColor: string;
}): React.JSX.Element {
    return (
        <div className="space-y-0" data-testid="timeline-placeholder">
            <p className="text-xs text-muted mb-3">{data.epochs.length} epochs</p>

            {data.epochs.map((epoch, idx) => (
                <div key={epoch.order} className="flex gap-3">
                    {/* Timeline rail */}
                    <div className="flex flex-col items-center">
                        <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: accentColor }}
                        />
                        {idx < data.epochs.length - 1 && (
                            <div className="w-px flex-1 bg-border-subtle min-h-[32px]" />
                        )}
                    </div>

                    {/* Content */}
                    <div className="pb-4 min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-text-primary">
                                {epoch.term}
                            </p>
                            <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: SENTIMENT_COLORS[epoch.sentiment] ?? '#6B7280' }}
                                title={epoch.sentiment}
                            />
                        </div>
                        <p className="text-[10px] text-muted uppercase tracking-wider mt-0.5">
                            {epoch.era}
                        </p>
                        <p className="text-xs text-text-secondary mt-1">{epoch.meaning}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ========================================
   GRID Placeholder
   ======================================== */

function GridPlaceholder({
    data,
}: {
    data: GridVisualizationData;
}): React.JSX.Element {
    return (
        <div data-testid="grid-placeholder">
            <div className="flex items-center gap-2 text-xs text-muted mb-4">
                <span className="px-2 py-0.5 rounded-full bg-surface-secondary text-[10px] font-semibold uppercase tracking-wider">
                    {data.pattern}
                </span>
                <span>•</span>
                <span>{data.languages.length} languages</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {data.languages.map((lang) => (
                    <div
                        key={lang.name}
                        className="p-3 rounded-xl bg-surface-secondary/50 text-center"
                    >
                        <p className="text-lg font-semibold text-text-primary leading-tight">
                            {lang.script}
                        </p>
                        <p className="text-xs text-muted mt-1">{lang.name}</p>
                        <p className="text-[10px] text-text-secondary mt-0.5">{lang.word}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

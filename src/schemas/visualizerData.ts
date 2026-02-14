/**
 * Zod schemas for visualization data contracts
 *
 * Defines the shape of `content_json.visual_data` for each visualization type:
 *   MAP      — geographic word journey
 *   TREE     — etymology tree (recursive)
 *   TIMELINE — chronological epochs
 *   GRID     — cross-linguistic comparison
 *
 * See: docs/context/04_schema_contracts.md
 */

import { z } from 'zod';

/* ========================================
   MAP Visualization
   ======================================== */

const MapPointSchema = z.object({
    order: z.number().int().positive(),
    location_name: z.string().min(1).max(100),
    coordinates: z.tuple([
        z.number().min(-90).max(90),   // Latitude
        z.number().min(-180).max(180), // Longitude
    ]),
    era: z.string().max(50),
    context: z.string().min(1),
    influence_radius_km: z.number().positive().optional(),
});

const MapRouteSchema = z.object({
    from: z.number().int().positive(),
    to: z.number().int().positive(),
    method: z.string().max(100),
    duration_years: z.number().int().positive().optional(),
});

export const MapVisualizationDataSchema = z.object({
    type: z.literal('MAP'),
    projection: z.enum(['orthographic', 'mercator', 'naturalEarth']),
    points: z.array(MapPointSchema).min(2).max(10),
    routes: z.array(MapRouteSchema).optional(),
});

export type MapVisualizationData = z.infer<typeof MapVisualizationDataSchema>;
export type MapPoint = z.infer<typeof MapPointSchema>;
export type MapRoute = z.infer<typeof MapRouteSchema>;

/* ========================================
   TREE Visualization
   ======================================== */

interface TreeNodeType {
    term: string;
    language: string;
    meaning: string;
    era: string;
    children?: TreeNodeType[];
}

const TreeNodeSchema: z.ZodType<TreeNodeType> = z.lazy(() =>
    z.object({
        term: z.string().min(1).max(100),
        language: z.string().max(100),
        meaning: z.string().min(1),
        era: z.string().max(50),
        children: z.array(TreeNodeSchema).optional(),
    })
);

export const TreeVisualizationDataSchema = z.object({
    type: z.literal('TREE'),
    layout: z.enum(['radial', 'dendrogram', 'force']),
    root: TreeNodeSchema,
});

export type TreeVisualizationData = z.infer<typeof TreeVisualizationDataSchema>;
export type TreeNode = TreeNodeType;

/* ========================================
   TIMELINE Visualization
   ======================================== */

const EpochSchema = z.object({
    order: z.number().int().positive(),
    era: z.string().max(50),
    term: z.string().min(1).max(100),
    meaning: z.string().min(1),
    usage_example: z.string().optional(),
    sentiment: z.enum(['positive', 'negative', 'neutral', 'negative_shift']),
});

export const TimelineVisualizationDataSchema = z.object({
    type: z.literal('TIMELINE'),
    epochs: z.array(EpochSchema).min(2).max(10),
});

export type TimelineVisualizationData = z.infer<typeof TimelineVisualizationDataSchema>;
export type Epoch = z.infer<typeof EpochSchema>;

/* ========================================
   GRID Visualization
   ======================================== */

const LanguageEntrySchema = z.object({
    name: z.string().min(1).max(50),
    word: z.string().min(1).max(50),
    script: z.string().min(1).max(50),
    script_type: z.enum(['Latin', 'Devanagari', 'Arabic', 'Cyrillic', 'Greek', 'Other']),
    pronunciation: z.string().max(100).optional(),
});

export const GridVisualizationDataSchema = z.object({
    type: z.literal('GRID'),
    pattern: z.enum(['cognate', 'loanword', 'parallel']),
    languages: z.array(LanguageEntrySchema).min(4).max(12),
});

export type GridVisualizationData = z.infer<typeof GridVisualizationDataSchema>;
export type LanguageEntry = z.infer<typeof LanguageEntrySchema>;

/* ========================================
   Visualizer Props (discriminated union)
   ======================================== */

export const VisualizationDataSchema = z.discriminatedUnion('type', [
    MapVisualizationDataSchema,
    TreeVisualizationDataSchema,
    TimelineVisualizationDataSchema,
    GridVisualizationDataSchema,
]);

export type VisualizationData = z.infer<typeof VisualizationDataSchema>;

export const VisualizerPropsSchema = z.object({
    type: z.enum(['MAP', 'TREE', 'TIMELINE', 'GRID']),
    data: VisualizationDataSchema,
    accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

export type VisualizerProps = z.infer<typeof VisualizerPropsSchema>;

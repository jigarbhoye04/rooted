# 04 - Schema Contracts

**Project:** Rooted  
**Purpose:** Single source of truth for all Zod schemas and TypeScript types.

---

## Overview

This file documents all data schemas used in Rooted. Each schema serves as a **contract** between:
- Database ↔ API
- API ↔ Client
- Component ↔ Props

**Rule:** All data crossing a boundary MUST be validated with its corresponding schema.

---

## Database Schemas

### DailyWord (Full)

**Location:** `src/schemas/dailyWord.ts`

```typescript
import { z } from 'zod';

export const DailyWordSchema = z.object({
  id: z.number().int().positive(),
  publish_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  word: z.string().min(1).max(100),
  definition: z.string().min(1),
  phonetic: z.string().max(100).optional(),
  pronunciation_audio_url: z.string().url().optional(),
  
  visualization_type: z.enum(['MAP', 'TREE', 'TIMELINE', 'GRID']),
  
  content_json: z.object({
    hook: z.string().min(1),
    fun_fact: z.string().min(1),
    part_of_speech: z.string().optional(),
    nerd_mode: z.object({
      ipa_full: z.string().optional(),
      disputed_origin: z.string().optional(),
      earliest_citation: z.string().optional(),
    }).optional(),
    palette: z.object({
      primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      muted: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      surface: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      text: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    }).optional(),
    visual_data: z.any(), // Validated separately based on type
  }),
  
  accent_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  created_at: z.string().datetime().optional(),
  approved_by: z.string().max(50).optional(),
  root_family: z.string().max(50).optional(),
});

export type DailyWord = z.infer<typeof DailyWordSchema>;
```

**Usage:**
```typescript
// In API route
const dbResult = await sql`SELECT * FROM daily_words WHERE id = ${id}`;
const validated = DailyWordSchema.parse(dbResult.rows[0]);
```

---

## Visualization Data Schemas

### MapVisualizationData

**Location:** `src/schemas/visualizerData.ts`

```typescript
import { z } from 'zod';

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
  from: z.number().int().positive(), // References point.order
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
```

**Validation Example:**
```typescript
// Before rendering MapVisualizer
const mapData = MapVisualizationDataSchema.parse(word.content_json.visual_data);
```

---

### TreeVisualizationData

**Location:** `src/schemas/visualizerData.ts`

```typescript
const TreeNodeSchema: z.ZodType<any> = z.lazy(() =>
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
export type TreeNode = {
  term: string;
  language: string;
  meaning: string;
  era: string;
  children?: TreeNode[];
};
```

**Note:** Uses `z.lazy()` for recursive schema (tree can have infinite depth).

---

### TimelineVisualizationData

**Location:** `src/schemas/visualizerData.ts`

```typescript
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
```

---

### GridVisualizationData

**Location:** `src/schemas/visualizerData.ts`

```typescript
const LanguageEntrySchema = z.object({
  name: z.string().min(1).max(50), // e.g., "Sanskrit"
  word: z.string().min(1).max(50), // e.g., "Mātṛ"
  script: z.string().min(1).max(50), // e.g., "मातृ"
  script_type: z.enum(['Latin', 'Devanagari', 'Arabic', 'Cyrillic', 'Greek', 'Other']),
  pronunciation: z.string().max(100).optional(), // e.g., "/maːtɹ̩/"
});

export const GridVisualizationDataSchema = z.object({
  type: z.literal('GRID'),
  pattern: z.enum(['cognate', 'loanword', 'parallel']),
  languages: z.array(LanguageEntrySchema).min(4).max(12),
});

export type GridVisualizationData = z.infer<typeof GridVisualizationDataSchema>;
export type LanguageEntry = z.infer<typeof LanguageEntrySchema>;
```

---

## API Response Schemas

### Success Response

**Location:** `src/schemas/apiResponses.ts`

```typescript
import { z } from 'zod';

// Generic success response (returns data directly)
export const SuccessResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  dataSchema;

// Example usage:
// const response = SuccessResponseSchema(DailyWordSchema);
// Type: DailyWord
```

**Note:** We return validated data **directly**, not wrapped in `{ data: ... }`.

---

### Error Response

**Location:** `src/schemas/apiResponses.ts`

```typescript
export const ErrorResponseSchema = z.object({
  error: z.string().min(1), // Human-readable error message
  code: z.string().optional(), // Optional error code (e.g., "WORD_NOT_FOUND")
  details: z.any().optional(), // Optional additional details
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
```

**Usage:**
```typescript
// In API route
return NextResponse.json(
  { error: 'Word not found' },
  { status: 404 }
);
```

---

## Component Prop Schemas

### Visualizer Props

**Location:** `src/schemas/visualizerData.ts`

```typescript
export const VisualizerPropsSchema = z.object({
  type: z.enum(['MAP', 'TREE', 'TIMELINE', 'GRID']),
  data: z.union([
    MapVisualizationDataSchema,
    TreeVisualizationDataSchema,
    TimelineVisualizationDataSchema,
    GridVisualizationDataSchema,
  ]),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  onInteraction: z.function().optional(),
});

export type VisualizerProps = z.infer<typeof VisualizerPropsSchema>;
```

**Usage:**
```typescript
// In component
export default function Visualizer(props: VisualizerProps) {
  if (process.env.NODE_ENV === 'development') {
    VisualizerPropsSchema.parse(props); // Validate in dev mode
  }
  // ... component logic
}
```

---

### StoryCard Props

**Location:** `src/schemas/componentProps.ts`

```typescript
export const StoryCardPropsSchema = z.object({
  content: z.string().min(1),
  threshold: z.number().min(0).max(1), // Scroll progress threshold (0-1)
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export type StoryCardProps = z.infer<typeof StoryCardPropsSchema>;
```

---

## Input Validation Schemas

### Word Slug

**Location:** `src/schemas/inputs.ts`

```typescript
export const WordSlugSchema = z.string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only');

// Example: "sabotage", "mother", "algorithm"
```

**Usage:**
```typescript
// In API route
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = WordSlugSchema.parse(params.slug);
  // Now safe to use in database query
}
```

---

### Date String

**Location:** `src/schemas/inputs.ts`

```typescript
export const DateStringSchema = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .refine(
    (date) => !isNaN(Date.parse(date)),
    'Date must be a valid date'
  );

// Example: "2025-02-07"
```

---

## Custom Validators

### Coordinate Validation

**Location:** `src/lib/validators.ts`

```typescript
import { z } from 'zod';

export const coordinateSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

// Stricter version: exclude poles and international date line
export const strictCoordinateSchema = z.object({
  latitude: z.number().min(-85).max(85), // Mercator limits
  longitude: z.number().min(-179.9).max(179.9),
});
```

---

### Hex Color Validation

**Location:** `src/lib/validators.ts`

```typescript
export const hexColorSchema = z.string()
  .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color (e.g., #FF5733)')
  .transform((val) => val.toUpperCase()); // Normalize to uppercase

// Example: "#ff5733" → "#FF5733"
```

---

## Schema Composition Patterns

### Partial Schemas (For Updates)

```typescript
// Full schema
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// Partial schema (for PATCH requests)
const UserUpdateSchema = UserSchema.partial().omit({ id: true });

// Now all fields are optional except id (which is omitted)
```

---

### Extending Schemas

```typescript
const BaseWordSchema = z.object({
  word: z.string(),
  definition: z.string(),
});

const ExtendedWordSchema = BaseWordSchema.extend({
  etymology: z.string(),
  usage_examples: z.array(z.string()),
});
```

---

## Testing Schemas

### Example Test

**Location:** `src/schemas/__tests__/dailyWord.test.ts`

```typescript
import { describe, it, expect } from '@jest/globals';
import { DailyWordSchema } from '../dailyWord';

describe('DailyWordSchema', () => {
  it('validates a valid word object', () => {
    const validWord = {
      id: 1,
      publish_date: '2025-02-07',
      word: 'Sabotage',
      definition: 'Deliberate destruction',
      visualization_type: 'MAP',
      content_json: {
        hook: 'It started with a shoe.',
        fun_fact: 'French workers threw shoes.',
        visual_data: { type: 'MAP', points: [] },
      },
      accent_color: '#DC2626',
    };

    expect(() => DailyWordSchema.parse(validWord)).not.toThrow();
  });

  it('rejects invalid date format', () => {
    const invalidWord = {
      publish_date: '07-02-2025', // Wrong format
      // ... other fields
    };

    expect(() => DailyWordSchema.parse(invalidWord)).toThrow();
  });

  it('rejects invalid hex color', () => {
    const invalidWord = {
      accent_color: 'red', // Not a hex color
      // ... other fields
    };

    expect(() => DailyWordSchema.parse(invalidWord)).toThrow();
  });
});
```

---

## Quick Reference

### Common Validations

```typescript
// String with length constraints
z.string().min(1).max(100)

// Email
z.string().email()

// URL
z.string().url()

// UUID
z.string().uuid()

// Enum (specific values only)
z.enum(['MAP', 'TREE', 'TIMELINE', 'GRID'])

// Number (positive integers only)
z.number().int().positive()

// Array (min/max length)
z.array(z.string()).min(1).max(10)

// Optional field
z.string().optional()

// Nullable field
z.string().nullable()

// Optional OR null
z.string().nullish()

// Union (one of multiple types)
z.union([z.string(), z.number()])

// Datetime (ISO 8601)
z.string().datetime()

// Custom validation
z.string().refine((val) => val.includes('@'), {
  message: 'Must contain @',
})
```

---

## Schema Locations Summary

| Schema | Location | Purpose |
|--------|----------|---------|
| `DailyWordSchema` | `src/schemas/dailyWord.ts` | Database daily_words table |
| `MapVisualizationDataSchema` | `src/schemas/visualizerData.ts` | MAP type visual_data |
| `TreeVisualizationDataSchema` | `src/schemas/visualizerData.ts` | TREE type visual_data |
| `TimelineVisualizationDataSchema` | `src/schemas/visualizerData.ts` | TIMELINE type visual_data |
| `GridVisualizationDataSchema` | `src/schemas/visualizerData.ts` | GRID type visual_data |
| `ErrorResponseSchema` | `src/schemas/apiResponses.ts` | API error responses |
| `VisualizerPropsSchema` | `src/schemas/visualizerData.ts` | Visualizer component props |
| `StoryCardPropsSchema` | `src/schemas/componentProps.ts` | StoryCard component props |
| `WordSlugSchema` | `src/schemas/inputs.ts` | URL slug validation |
| `DateStringSchema` | `src/schemas/inputs.ts` | Date string validation |

---

**Last Updated:** 2025-02-07  
**Next Review:** When adding new visualization types or API endpoints

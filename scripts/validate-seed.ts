/**
 * Validate seed words JSON against Rooted Zod schemas
 *
 * Reads scripts/content/seed-words.json and validates every word object
 * against the DailyWord and VisualizationData schemas.
 *
 * Usage:
 *   npx tsx scripts/validate-seed.ts
 *   npx tsx scripts/validate-seed.ts --file path/to/custom.json
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { z } from 'zod';
import {
    MapVisualizationDataSchema,
    TreeVisualizationDataSchema,
    TimelineVisualizationDataSchema,
    GridVisualizationDataSchema,
} from '../src/schemas/visualizerData';

/* ========================================
   Schema Definitions (matches DB contract)
   ======================================== */

const NerdModeSchema = z.object({
    ipa_full: z.string().optional(),
    disputed_origin: z.string().nullable().optional(),
    earliest_citation: z.string().optional(),
});

const ContentJsonSchema = z.object({
    hook: z.string().min(1, 'Hook cannot be empty'),
    fun_fact: z.string().min(1, 'Fun fact cannot be empty'),
    nerd_mode: NerdModeSchema.optional(),
    visual_data: z.any(),
});

const SeedWordSchema = z.object({
    word: z.string().min(1).max(100),
    definition: z.string().min(1),
    phonetic: z.string().max(100).nullable().optional(),
    visualization_type: z.enum(['MAP', 'TREE', 'TIMELINE', 'GRID']),
    content_json: ContentJsonSchema,
    accent_color: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be valid hex color (#RRGGBB)'),
    root_family: z.string().max(50).nullable().optional(),
});

type SeedWord = z.infer<typeof SeedWordSchema>;

/* ========================================
   Visualization-Specific Validation
   ======================================== */

function validateVisualData(
    word: string,
    vizType: string,
    visualData: unknown
): string[] {
    const errors: string[] = [];

    const schemaMap: Record<string, z.ZodSchema> = {
        MAP: MapVisualizationDataSchema,
        TREE: TreeVisualizationDataSchema,
        TIMELINE: TimelineVisualizationDataSchema,
        GRID: GridVisualizationDataSchema,
    };

    const schema = schemaMap[vizType];
    if (!schema) {
        errors.push(`Unknown visualization_type: "${vizType}"`);
        return errors;
    }

    const result = schema.safeParse(visualData);
    if (!result.success) {
        for (const issue of result.error.issues) {
            const path = issue.path.join('.');
            errors.push(`  visual_data.${path}: ${issue.message}`);
        }
    }

    // Extra validations for MAP coordinates
    if (vizType === 'MAP' && result.success) {
        const data = result.data as { points: Array<{ coordinates: [number, number]; location_name: string }> };
        for (const point of data.points) {
            const [lat, lng] = point.coordinates;
            if (lat === 0 && lng === 0) {
                errors.push(
                    `  Suspicious coordinates [0, 0] for "${point.location_name}" — likely incorrect`
                );
            }
        }
    }

    return errors;
}

/* ========================================
   Quality Checks
   ======================================== */

function qualityCheck(word: SeedWord, index: number): string[] {
    const warnings: string[] = [];
    const hook = word.content_json.hook;

    // Hook length check (5-15 words ideal)
    const hookWords = hook.split(/\s+/).length;
    if (hookWords < 5) {
        warnings.push(`  ⚠️  Hook too short (${hookWords} words, min 5)`);
    }
    if (hookWords > 20) {
        warnings.push(`  ⚠️  Hook too long (${hookWords} words, aim for 5-15)`);
    }

    // Generic hook detection
    const genericStarters = [
        'this word',
        'the word',
        'it has',
        'it is',
        'interesting',
        'fascinating',
    ];
    const hookLower = hook.toLowerCase();
    for (const starter of genericStarters) {
        if (hookLower.startsWith(starter)) {
            warnings.push(`  ⚠️  Hook starts with generic "${starter}..." — make it punchier`);
        }
    }

    // Missing nerd_mode fields
    if (!word.content_json.nerd_mode?.ipa_full) {
        warnings.push('  ⚠️  Missing nerd_mode.ipa_full');
    }
    if (!word.content_json.nerd_mode?.earliest_citation) {
        warnings.push('  ⚠️  Missing nerd_mode.earliest_citation');
    }

    return warnings;
}

/* ========================================
   Main Validation
   ======================================== */

function main(): void {
    const args = process.argv.slice(2);
    let filePath = resolve(__dirname, 'content', 'seed-words.json');

    const fileArgIndex = args.indexOf('--file');
    if (fileArgIndex !== -1 && args[fileArgIndex + 1]) {
        filePath = resolve(args[fileArgIndex + 1]);
    }

    console.log(`\n📄 Reading: ${filePath}\n`);

    let rawData: string;
    try {
        rawData = readFileSync(filePath, 'utf-8');
    } catch {
        console.error(`❌ Could not read file: ${filePath}`);
        process.exit(1);
    }

    let words: unknown[];
    try {
        words = JSON.parse(rawData);
    } catch (e) {
        console.error('❌ Invalid JSON:', (e as Error).message);
        process.exit(1);
    }

    if (!Array.isArray(words)) {
        console.error('❌ Expected a JSON array of word objects');
        process.exit(1);
    }

    console.log(`📊 Found ${words.length} words\n`);

    let valid = 0;
    let failed = 0;
    let warningCount = 0;
    const duplicateWords = new Set<string>();
    const allWords: string[] = [];
    const vizTypeCounts: Record<string, number> = { MAP: 0, TREE: 0, TIMELINE: 0, GRID: 0 };

    for (let i = 0; i < words.length; i++) {
        const raw = words[i];
        const wordName = (raw as Record<string, unknown>)?.word ?? `[index ${i}]`;

        // Schema validation
        const result = SeedWordSchema.safeParse(raw);
        if (!result.success) {
            failed++;
            console.log(`❌ #${i + 1} "${wordName}"`);
            for (const issue of result.error.issues) {
                const path = issue.path.join('.');
                console.log(`  ${path}: ${issue.message}`);
            }
            console.log('');
            continue;
        }

        const word = result.data;

        // Visual data validation
        const vizErrors = validateVisualData(
            word.word,
            word.visualization_type,
            word.content_json.visual_data
        );

        if (vizErrors.length > 0) {
            failed++;
            console.log(`❌ #${i + 1} "${word.word}" (visual_data)`);
            for (const err of vizErrors) {
                console.log(err);
            }
            console.log('');
            continue;
        }

        // Duplicate check
        const wordLower = word.word.toLowerCase();
        if (duplicateWords.has(wordLower)) {
            failed++;
            console.log(`❌ #${i + 1} "${word.word}" — DUPLICATE word`);
            console.log('');
            continue;
        }
        duplicateWords.add(wordLower);
        allWords.push(word.word);

        // Track viz type distribution
        vizTypeCounts[word.visualization_type]++;

        // Quality warnings
        const warnings = qualityCheck(word, i);
        if (warnings.length > 0) {
            warningCount += warnings.length;
            console.log(`⚠️  #${i + 1} "${word.word}" — ${warnings.length} warning(s)`);
            for (const w of warnings) {
                console.log(w);
            }
        }

        valid++;
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 VALIDATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`  Total words:   ${words.length}`);
    console.log(`  ✅ Valid:       ${valid}`);
    console.log(`  ❌ Failed:      ${failed}`);
    console.log(`  ⚠️  Warnings:   ${warningCount}`);
    console.log('');
    console.log('📈 Visualization Distribution:');
    for (const [type, count] of Object.entries(vizTypeCounts)) {
        const bar = '█'.repeat(count) + '░'.repeat(25 - count);
        console.log(`  ${type.padEnd(10)} ${bar} ${count}`);
    }
    console.log('');

    if (failed > 0) {
        console.log('💡 Fix the failed words and re-run this script.');
        process.exit(1);
    }

    if (warningCount > 0) {
        console.log('💡 Warnings are non-blocking but worth reviewing for quality.');
    }

    console.log('✅ All words are valid! Ready to seed with:');
    console.log('   npx tsx scripts/seed-batch.ts --start-date 2026-02-20\n');
}

main();

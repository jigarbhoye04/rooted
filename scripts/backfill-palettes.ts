/**
 * backfill-palettes.ts
 *
 * One-time script to generate a 5-color complementary palette
 * for every word in the database, derived from its existing accent_color.
 *
 * Usage:
 *   npx tsx scripts/backfill-palettes.ts
 *
 * HOW IT WORKS:
 *   1. Reads accent_color for each word
 *   2. Converts hex → HSL
 *   3. Generates 5 harmonious colors via HSL rotation/shift
 *   4. Writes palette into content_json.palette (JSONB merge)
 */

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL not set in .env.local');
    process.exit(1);
}

const sql = neon(DATABASE_URL);

// ─── Color Utilities ────────────────────────────────────────────────

function hexToHsl(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    if (max === min) return [0, 0, l];

    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    let h = 0;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
    const sNorm = s / 100;
    const lNorm = l / 100;

    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = lNorm - c / 2;

    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }

    const toHex = (v: number): string => {
        const hex = Math.round((v + m) * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

interface Palette {
    primary: string;
    secondary: string;
    muted: string;
    surface: string;
    text: string;
}

function generatePalette(accentHex: string): Palette {
    const [h, s, l] = hexToHsl(accentHex);

    // Ensure reasonable saturation/lightness for the primary
    const primary = hslToHex(h, Math.max(s, 35), Math.min(Math.max(l, 30), 50));

    // Secondary: analogous hue shift (+30°), slightly lighter
    const secondary = hslToHex((h + 30) % 360, Math.max(s - 10, 25), Math.min(l + 10, 55));

    // Muted: desaturated, light
    const muted = hslToHex(h, Math.max(s - 30, 10), 78);

    // Surface: very light tint of the primary
    const surface = hslToHex(h, Math.max(s - 40, 8), 94);

    // Text: dark version of the hue
    const text = hslToHex(h, Math.min(s, 20), 15);

    return { primary, secondary, muted, surface, text };
}

// ─── Main ───────────────────────────────────────────────────────────

async function main(): Promise<void> {
    console.log('🎨 Backfilling palettes for all words...\n');

    const words = await sql`
    SELECT id, word, accent_color, content_json
    FROM daily_words
    ORDER BY id
  `;

    console.log(`Found ${words.length} words.\n`);

    let updated = 0;
    let skipped = 0;

    for (const row of words) {
        const existing = row.content_json as Record<string, unknown>;

        // Skip if palette already exists
        if (existing.palette) {
            skipped++;
            continue;
        }

        const accent = (row.accent_color as string) || '#000000';
        const palette = generatePalette(accent);

        const newContentJson = { ...existing, palette };

        await sql`
      UPDATE daily_words
      SET content_json = ${JSON.stringify(newContentJson)}::jsonb
      WHERE id = ${row.id}
    `;

        updated++;
        console.log(`  ✅ ${row.word} (${accent}) → primary:${palette.primary} secondary:${palette.secondary}`);
    }

    console.log(`\n🎉 Done! Updated: ${updated}, Skipped: ${skipped}`);
}

main().catch((err: unknown) => {
    console.error('❌ Fatal error:', err);
    process.exit(1);
});

/**
 * Batch seed script: Insert validated words into Neon database
 *
 * Reads scripts/content/seed-words.json and inserts all words
 * with sequential publish_date starting from the given date.
 *
 * Usage:
 *   npx tsx scripts/seed-batch.ts --start-date 2026-02-20
 *   npx tsx scripts/seed-batch.ts --start-date 2026-02-20 --dry-run
 *   npx tsx scripts/seed-batch.ts --start-date 2026-02-20 --file path/to/words.json
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

/* ========================================
   Types
   ======================================== */

interface SeedWord {
    word: string;
    definition: string;
    phonetic: string | null;
    visualization_type: string;
    content_json: Record<string, unknown>;
    accent_color: string;
    root_family: string | null;
}

/* ========================================
   Date Helpers
   ======================================== */

function addDays(dateStr: string, days: number): string {
    const date = new Date(dateStr + 'T00:00:00Z');
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().split('T')[0];
}

function parseArgs(): { startDate: string; dryRun: boolean; filePath: string } {
    const args = process.argv.slice(2);
    let startDate = '';
    let dryRun = false;
    let filePath = resolve(__dirname, 'content', 'seed-words.json');

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--start-date' && args[i + 1]) {
            startDate = args[i + 1];
            i++;
        } else if (args[i] === '--dry-run') {
            dryRun = true;
        } else if (args[i] === '--file' && args[i + 1]) {
            filePath = resolve(args[i + 1]);
            i++;
        }
    }

    if (!startDate) {
        console.error('❌ Missing --start-date argument');
        console.error('   Usage: npx tsx scripts/seed-batch.ts --start-date 2026-02-20');
        process.exit(1);
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate)) {
        console.error('❌ Invalid date format. Use YYYY-MM-DD');
        process.exit(1);
    }

    return { startDate, dryRun, filePath };
}

/* ========================================
   Main
   ======================================== */

async function main(): Promise<void> {
    const { startDate, dryRun, filePath } = parseArgs();

    // Read words
    console.log(`\n📄 Reading: ${filePath}`);
    let rawData: string;
    try {
        rawData = readFileSync(filePath, 'utf-8');
    } catch {
        console.error(`❌ Could not read file: ${filePath}`);
        process.exit(1);
    }

    let words: SeedWord[];
    try {
        words = JSON.parse(rawData);
    } catch (e) {
        console.error('❌ Invalid JSON:', (e as Error).message);
        process.exit(1);
    }

    if (!Array.isArray(words) || words.length === 0) {
        console.error('❌ Expected a non-empty JSON array');
        process.exit(1);
    }

    const endDate = addDays(startDate, words.length - 1);
    console.log(`📊 ${words.length} words, dates: ${startDate} → ${endDate}`);

    if (dryRun) {
        console.log('\n🔍 DRY RUN — no database changes\n');
        console.log('Preview:');
        console.log('─'.repeat(65));
        console.log(
            '  #'.padEnd(6) +
            'Date'.padEnd(14) +
            'Word'.padEnd(20) +
            'Type'.padEnd(12) +
            'Color'
        );
        console.log('─'.repeat(65));

        for (let i = 0; i < words.length; i++) {
            const date = addDays(startDate, i);
            const w = words[i];
            console.log(
                `  ${(i + 1).toString().padEnd(4)}` +
                `${date.padEnd(14)}` +
                `${w.word.padEnd(20)}` +
                `${w.visualization_type.padEnd(12)}` +
                `${w.accent_color}`
            );
        }
        console.log('─'.repeat(65));
        console.log(`\n✅ Dry run complete. Run without --dry-run to insert.\n`);
        return;
    }

    // Connect to database
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
        console.error('❌ DATABASE_URL not set in .env.local');
        process.exit(1);
    }

    const sql = neon(DATABASE_URL);

    console.log('\n🌱 Seeding words...\n');

    let inserted = 0;
    let skipped = 0;
    let errored = 0;

    for (let i = 0; i < words.length; i++) {
        const w = words[i];
        const publishDate = addDays(startDate, i);
        const contentJsonStr = JSON.stringify(w.content_json);

        try {
            const result = await sql`
                INSERT INTO daily_words (
                    publish_date, word, definition, phonetic,
                    visualization_type, content_json, accent_color,
                    approved_by, root_family
                ) VALUES (
                    ${publishDate}, ${w.word}, ${w.definition}, ${w.phonetic},
                    ${w.visualization_type}, ${contentJsonStr}::jsonb, ${w.accent_color},
                    ${'jigar'}, ${w.root_family}
                )
                ON CONFLICT (publish_date) DO UPDATE SET
                    word = EXCLUDED.word,
                    definition = EXCLUDED.definition,
                    phonetic = EXCLUDED.phonetic,
                    visualization_type = EXCLUDED.visualization_type,
                    content_json = EXCLUDED.content_json,
                    accent_color = EXCLUDED.accent_color,
                    approved_by = EXCLUDED.approved_by,
                    root_family = EXCLUDED.root_family
            `;

            const action = result.length === 0 ? 'inserted' : 'upserted';
            inserted++;

            // Progress indicator
            const progress = Math.round(((i + 1) / words.length) * 100);
            const bar = '█'.repeat(Math.floor(progress / 2)) + '░'.repeat(50 - Math.floor(progress / 2));
            process.stdout.write(
                `\r  ${bar} ${progress}% | ${i + 1}/${words.length} | ${w.word}`
                    .padEnd(90)
            );
        } catch (error) {
            errored++;
            console.log(`\n  ❌ ${publishDate} → ${w.word}: ${(error as Error).message}`);
        }
    }

    console.log('\n');

    // Summary
    console.log('='.repeat(50));
    console.log('📊 SEED SUMMARY');
    console.log('='.repeat(50));
    console.log(`  ✅ Inserted/Updated: ${inserted}`);
    if (skipped > 0) console.log(`  ⏭️  Skipped:          ${skipped}`);
    if (errored > 0) console.log(`  ❌ Errors:            ${errored}`);
    console.log(`  📅 Date range:       ${startDate} → ${endDate}`);
    console.log('');

    // Show all words in DB
    try {
        const allWords = await sql`
            SELECT id, word, visualization_type, publish_date::text
            FROM daily_words
            ORDER BY publish_date
        `;
        console.log(`📋 Total words in database: ${allWords.length}`);
        if (allWords.length <= 20) {
            console.table(allWords);
        } else {
            console.log('   (showing first 10 and last 10)');
            console.table(allWords.slice(0, 10));
            console.log('   ...');
            console.table(allWords.slice(-10));
        }
    } catch {
        console.log('   (could not query database for summary)');
    }

    console.log('\n🎉 Seeding complete!\n');
}

main().catch(console.error);

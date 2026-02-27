/**
 * Generate seed-words.json from embedded word data
 * Run: npx tsx scripts/content/generate-seed.ts
 */
import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Import word batches
import { mapWords } from './words-map';
import { treeWords } from './words-tree';
import { timelineWords } from './words-timeline';
import { gridWords } from './words-grid';

const allWords = [...mapWords, ...treeWords, ...timelineWords, ...gridWords];

// Fisher-Yates shuffle to mix visualization types
for (let i = allWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
}

console.log(`📊 Generated ${allWords.length} words`);
console.log(`  MAP: ${mapWords.length}`);
console.log(`  TREE: ${treeWords.length}`);
console.log(`  TIMELINE: ${timelineWords.length}`);
console.log(`  GRID: ${gridWords.length}`);

const outPath = resolve(__dirname, 'seed-words.json');
writeFileSync(outPath, JSON.stringify(allWords, null, 2), 'utf-8');
console.log(`\n✅ Written to: ${outPath}`);

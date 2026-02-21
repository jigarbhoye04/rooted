import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Add days to a date string
function addDays(dateStr: string, days: number): string {
    const date = new Date(dateStr + 'T00:00:00Z');
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().split('T')[0];
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

async function main() {
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
        console.error('❌ DATABASE_URL not set in .env.local');
        process.exit(1);
    }

    const sql = neon(DATABASE_URL);

    console.log('Fetching existing words to shuffle their dates...');

    // Fetch all words
    const words = await sql`SELECT id, publish_date::text as publish_date, word, visualization_type FROM daily_words ORDER BY publish_date`;

    console.log(`Found ${words.length} words.`);
    if (words.length === 0) return;

    // We want to start from today: 2026-02-20
    const startDate = '2026-02-20';

    // Generate sequential dates for the next N days
    const sequenceDates = [];
    for (let i = 0; i < words.length; i++) {
        sequenceDates.push(addDays(startDate, i));
    }

    // Shuffle the sequential dates
    const shuffledDates = shuffleArray(sequenceDates);

    console.log('Temporarily shifting dates to avoid unique constraint violations...');
    // Shift all currently fetched dates to 10 years in the future to clear the unique dates
    // Assuming we don't have existing words in 2036
    await sql`UPDATE daily_words SET publish_date = (publish_date::date + interval '10 years')`;

    console.log('Shuffling dates and updating database with new dates...');

    let updated = 0;
    for (let i = 0; i < words.length; i++) {
        const wordId = words[i].id;
        const newDate = shuffledDates[i];

        await sql`UPDATE daily_words SET publish_date = ${newDate} WHERE id = ${wordId}`;

        updated++;
        process.stdout.write(`\rUpdated ${updated}/${words.length} words`);
    }

    console.log('\n✅ All dates shuffled and assigned successfully from today onwards!');

    // Show a sample of the new sequence
    const newOrder = await sql`SELECT publish_date::text as date, word, visualization_type FROM daily_words ORDER BY publish_date LIMIT 15`;
    console.log('\nNew beginning sequence:');
    console.table(newOrder);
}

main().catch(console.error);

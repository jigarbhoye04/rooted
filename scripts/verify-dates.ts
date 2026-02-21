import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function main() {
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
        console.error('❌ DATABASE_URL not set in .env.local');
        process.exit(1);
    }

    const sql = neon(DATABASE_URL);

    // Show a sample of the new sequence
    const newOrder = await sql`SELECT publish_date::text as date, word, visualization_type FROM daily_words ORDER BY publish_date LIMIT 20`;
    console.log('\nNew beginning sequence:');
    console.table(newOrder);

    // Get stats
    const stats = await sql`SELECT visualization_type, COUNT(*) FROM daily_words GROUP BY visualization_type`;
    console.log('\nCounts:');
    console.table(stats);
}

main().catch(console.error);

/**
 * Seed script: Insert 4 words for upcoming dates
 * Run with: npx tsx scripts/seed-upcoming.ts
 *
 * Dates:
 *  - 2026-02-14 (today, Valentine's Day) → "Valentine" (TIMELINE)
 *  - 2026-02-15 (tomorrow)               → "Sabotage" (MAP)
 *  - 2026-02-21 (next Saturday)           → "Muscle" (TREE)
 *  - 2026-02-22 (next Sunday)             → "Salary" (TIMELINE)
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

interface SeedWord {
    publish_date: string;
    word: string;
    definition: string;
    phonetic: string;
    visualization_type: string;
    content_json: string;
    accent_color: string;
    approved_by: string;
    root_family: string | null;
}

const words: SeedWord[] = [
    {
        publish_date: '2026-02-14',
        word: 'Valentine',
        definition: 'A card or gift sent to a loved one on Saint Valentine\'s Day, February 14th.',
        phonetic: '/ˈvæl.ən.taɪn/',
        visualization_type: 'TIMELINE',
        content_json: JSON.stringify({
            hook: 'A beheaded saint, a Roman fertility festival, and Geoffrey Chaucer made February 14th about love.',
            fun_fact: 'The first known written Valentine was a poem sent by Charles, Duke of Orléans, to his wife in 1415 while he was imprisoned in the Tower of London.',
            nerd_mode: {
                ipa_full: '/ˈvæl.ən.taɪn/',
                disputed_origin: 'There were at least three Saint Valentines recognized by the Catholic Church, and scholars still debate which one the holiday honors.',
                earliest_citation: 'Chaucer\'s 1382 poem "Parlement of Foules" is the earliest known link between Valentine\'s Day and romantic love.',
            },
            visual_data: {
                type: 'TIMELINE',
                epochs: [
                    {
                        order: 1,
                        era: '269 CE',
                        term: 'Valentinus',
                        meaning: 'A Roman priest martyred under Emperor Claudius II',
                        usage_example: 'Saint Valentine allegedly performed secret marriages for soldiers forbidden to marry.',
                        sentiment: 'neutral',
                    },
                    {
                        order: 2,
                        era: '496 CE',
                        term: 'Saint Valentine\'s Day',
                        meaning: 'Feast day declared by Pope Gelasius I',
                        usage_example: 'The Pope placed it on February 14th, possibly to replace the Roman festival of Lupercalia.',
                        sentiment: 'neutral',
                    },
                    {
                        order: 3,
                        era: '1382',
                        term: 'Valentine',
                        meaning: 'Associated with romantic love',
                        usage_example: 'Chaucer wrote "For this was on seynt Valentynes day, whan every foul cometh ther to chese his make."',
                        sentiment: 'positive',
                    },
                    {
                        order: 4,
                        era: '1415',
                        term: 'Valentine letter',
                        meaning: 'A love note sent on Feb 14th',
                        usage_example: 'The Duke of Orléans sent what may be the earliest surviving Valentine from prison.',
                        sentiment: 'positive',
                    },
                    {
                        order: 5,
                        era: '1840s',
                        term: 'Valentine card',
                        meaning: 'Mass-produced greeting cards',
                        usage_example: 'Esther Howland began mass-producing elaborate cards in the US, earning the title "Mother of the American Valentine."',
                        sentiment: 'positive',
                    },
                    {
                        order: 6,
                        era: '2020s',
                        term: 'Valentine',
                        meaning: 'Both a person you love and the card/gift itself',
                        usage_example: '"Will you be my Valentine?" — the word now means both the celebration and the beloved.',
                        sentiment: 'positive',
                    },
                ],
            },
        }),
        accent_color: '#E11D48',
        approved_by: 'jigar',
        root_family: 'LATIN_valens',
    },
    {
        publish_date: '2026-02-15',
        word: 'Sabotage',
        definition: 'The deliberate destruction of or damage to something, especially to hinder an enemy or opponent.',
        phonetic: '/ˈsæbətɑːʒ/',
        visualization_type: 'MAP',
        content_json: JSON.stringify({
            hook: 'Did angry workers really throw their wooden shoes into machines? The truth is even better.',
            fun_fact: 'The French word "sabot" means wooden shoe, but sabotage more likely comes from "saboter" — to walk noisily or clumsily, then to bungle.',
            nerd_mode: {
                ipa_full: '/ˈsæbətɑːʒ/',
                disputed_origin: 'The "throwing shoes into machinery" story is likely a myth. The word more probably evolved from the idea of working clumsily, like someone in wooden shoes.',
                earliest_citation: 'First used in its modern sense during the French railway strikes of 1910.',
            },
            visual_data: {
                type: 'MAP',
                projection: 'orthographic',
                points: [
                    {
                        order: 1,
                        location_name: 'France (Rural)',
                        coordinates: [46.6, 2.2],
                        era: '1600s',
                        context: 'French peasants wore sabots (wooden shoes). "Saboter" meant to walk noisily or work clumsily.',
                        influence_radius_km: 400,
                    },
                    {
                        order: 2,
                        location_name: 'France (Industrial Cities)',
                        coordinates: [48.9, 2.3],
                        era: '1897',
                        context: 'French anarchist Émile Pouget popularized "sabotage" as a labor tactic — deliberate slowdowns and disruptions.',
                        influence_radius_km: 300,
                    },
                    {
                        order: 3,
                        location_name: 'United States (IWW)',
                        coordinates: [41.9, -87.6],
                        era: '1910',
                        context: 'The Industrial Workers of the World adopted sabotage as a union tactic. The word entered English.',
                        influence_radius_km: 500,
                    },
                    {
                        order: 4,
                        location_name: 'England (Wartime)',
                        coordinates: [51.5, -0.1],
                        era: '1940s',
                        context: 'During WWII, sabotage became associated with espionage and resistance movements across Europe.',
                        influence_radius_km: 300,
                    },
                ],
                routes: [
                    { from: 1, to: 2, method: 'Industrial Revolution & labor movements', duration_years: 250 },
                    { from: 2, to: 3, method: 'Anarchist and socialist networks', duration_years: 13 },
                    { from: 2, to: 4, method: 'World War II resistance', duration_years: 43 },
                ],
            },
        }),
        accent_color: '#DC2626',
        approved_by: 'jigar',
        root_family: 'FRENCH_sabot',
    },
    {
        publish_date: '2026-02-21',
        word: 'Muscle',
        definition: 'A band of fibrous tissue in the body that contracts to produce movement.',
        phonetic: '/ˈmʌs.əl/',
        visualization_type: 'TREE',
        content_json: JSON.stringify({
            hook: 'The Romans thought a flexing bicep looked like a little mouse running under the skin.',
            fun_fact: 'The Latin word "musculus" literally means "little mouse" — the same root gives us "mussel" (the shellfish that also looks like a tiny mouse).',
            nerd_mode: {
                ipa_full: '/ˈmʌs.əl/ (American), /ˈmʌs.l̩/ (British)',
                earliest_citation: 'First recorded in English around 1533, borrowed from Latin musculus.',
            },
            visual_data: {
                type: 'TREE',
                layout: 'radial',
                root: {
                    term: 'Mūs',
                    language: 'Latin',
                    meaning: 'Mouse',
                    era: '200 BCE',
                    children: [
                        {
                            term: 'Musculus',
                            language: 'Latin',
                            meaning: 'Little mouse',
                            era: '100 CE',
                            children: [
                                {
                                    term: 'Muscle',
                                    language: 'English',
                                    meaning: 'Body tissue that contracts',
                                    era: '1533',
                                },
                                {
                                    term: 'Mussel',
                                    language: 'English',
                                    meaning: 'Edible bivalve shellfish',
                                    era: '1000s',
                                },
                                {
                                    term: 'Musculaire',
                                    language: 'French',
                                    meaning: 'Muscular',
                                    era: '1300s',
                                    children: [
                                        {
                                            term: 'Muscular',
                                            language: 'English',
                                            meaning: 'Having strong muscles',
                                            era: '1681',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            term: 'Mouse',
                            language: 'English',
                            meaning: 'Small rodent (from same PIE root *mūs)',
                            era: 'Old English',
                        },
                    ],
                },
            },
        }),
        accent_color: '#7C3AED',
        approved_by: 'jigar',
        root_family: 'PIE_mus',
    },
    {
        publish_date: '2026-02-22',
        word: 'Salary',
        definition: 'A fixed regular payment made by an employer to an employee, typically monthly.',
        phonetic: '/ˈsæl.ər.i/',
        visualization_type: 'TIMELINE',
        content_json: JSON.stringify({
            hook: 'Your paycheck was once literally measured in salt.',
            fun_fact: 'Roman soldiers received a "salarium" — an allowance to buy salt, which was as valuable as gold in the ancient world. This is where we get "salary."',
            nerd_mode: {
                ipa_full: '/ˈsæl.ər.i/',
                disputed_origin: 'Some historians dispute whether soldiers were actually paid in salt or if salarium was simply a monetary allowance. The salt connection may be more metaphorical.',
                earliest_citation: 'First recorded in English around 1280, from Anglo-Norman salarie.',
            },
            visual_data: {
                type: 'TIMELINE',
                epochs: [
                    {
                        order: 1,
                        era: '3000 BCE',
                        term: 'Sal',
                        meaning: 'Salt (Latin)',
                        usage_example: 'Salt was one of the most traded commodities in the ancient world, used for preserving food and as currency.',
                        sentiment: 'neutral',
                    },
                    {
                        order: 2,
                        era: '300 BCE',
                        term: 'Salārium',
                        meaning: 'Salt money — an allowance for Roman soldiers',
                        usage_example: 'Roman legionaries received a salarium to purchase salt rations on long campaigns.',
                        sentiment: 'neutral',
                    },
                    {
                        order: 3,
                        era: '1280',
                        term: 'Salarie',
                        meaning: 'Payment for services (Anglo-Norman)',
                        usage_example: 'The word entered English through Norman French, losing its literal salt connection.',
                        sentiment: 'neutral',
                    },
                    {
                        order: 4,
                        era: '1500s',
                        term: 'Salary',
                        meaning: 'Fixed periodic payment',
                        usage_example: 'By the Renaissance, salary meant any regular compensation, no salt required.',
                        sentiment: 'positive',
                    },
                    {
                        order: 5,
                        era: '2020s',
                        term: 'Salary',
                        meaning: 'Annual compensation package',
                        usage_example: '"What\'s your salary expectation?" — now the most anxiety-inducing question in job interviews.',
                        sentiment: 'neutral',
                    },
                ],
            },
        }),
        accent_color: '#D97706',
        approved_by: 'jigar',
        root_family: 'LATIN_sal',
    },
];

async function seed(): Promise<void> {
    console.log('🌱 Seeding words...\n');

    for (const word of words) {
        try {
            await sql`
                INSERT INTO daily_words (
                    publish_date, word, definition, phonetic,
                    visualization_type, content_json, accent_color,
                    approved_by, root_family
                ) VALUES (
                    ${word.publish_date}, ${word.word}, ${word.definition}, ${word.phonetic},
                    ${word.visualization_type}, ${word.content_json}::jsonb, ${word.accent_color},
                    ${word.approved_by}, ${word.root_family}
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
            console.log(`  ✅ ${word.publish_date} → ${word.word} (${word.visualization_type})`);
        } catch (error) {
            console.error(`  ❌ ${word.publish_date} → ${word.word}:`, error);
        }
    }

    console.log('\n🎉 Seeding complete!');

    const results = await sql`
        SELECT id, word, visualization_type, publish_date::text
        FROM daily_words
        ORDER BY publish_date
    `;
    console.log('\n📊 All words in database:');
    console.table(results);
}

seed().catch(console.error);

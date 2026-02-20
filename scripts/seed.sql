-- Rooted Seed Data
-- 3 sample words: MAP, TREE, TIMELINE types
-- Run after 001_initial_schema.sql

-- ============================================
-- Word 1: Coffee (MAP type - Geographic journey)
-- ============================================
INSERT INTO daily_words (
  publish_date,
  word,
  definition,
  phonetic,
  visualization_type,
  content_json,
  accent_color,
  approved_by,
  root_family
) VALUES (
  '2026-02-08',
  'Coffee',
  'A dark brown drink made from roasted coffee beans, typically served hot.',
  '/ˈkɔːfi/',
  'MAP',
  '{
    "hook": "Your morning brew traveled 6,000 miles and 500 years to reach your cup.",
    "fun_fact": "The word coffee comes from the Ethiopian region of Kaffa, where the plant was first discovered.",
    "nerd_mode": {
      "ipa_full": "/ˈkɒfi/ (British), /ˈkɔːfi/ (American)",
      "disputed_origin": "Some scholars dispute the Kaffa origin, suggesting Arabic qahwa meaning \"wine\" or \"stimulating drink\".",
      "earliest_citation": "First recorded in English in 1598 as \"chaona\" or \"cahveh\"."
    },
    "visual_data": {
      "type": "MAP",
      "projection": "orthographic",
      "points": [
        {
          "order": 1,
          "location_name": "Ethiopia (Kaffa)",
          "coordinates": [7.0, 36.0],
          "era": "800 CE",
          "context": "Legend says a goat herder named Kaldi noticed his goats dancing after eating berries from a certain plant.",
          "influence_radius_km": 500
        },
        {
          "order": 2,
          "location_name": "Yemen (Mocha)",
          "coordinates": [13.3, 43.3],
          "era": "1400s",
          "context": "Sufi monks brewed the drink to stay awake during nighttime prayers. They called it qahwa.",
          "influence_radius_km": 300
        },
        {
          "order": 3,
          "location_name": "Turkey (Constantinople)",
          "coordinates": [41.0, 29.0],
          "era": "1550s",
          "context": "The Ottoman Empire opened the first coffeehouses, called kahvehane. The drink became kahve.",
          "influence_radius_km": 400
        },
        {
          "order": 4,
          "location_name": "Italy (Venice)",
          "coordinates": [45.4, 12.3],
          "era": "1600s",
          "context": "Italian merchants brought coffee to Europe. Pope Clement VIII blessed it despite calls to ban the \"Muslim drink\".",
          "influence_radius_km": 300
        },
        {
          "order": 5,
          "location_name": "England (London)",
          "coordinates": [51.5, -0.1],
          "era": "1650s",
          "context": "London coffeehouses became hubs of commerce and ideas. The word settled into its modern English form: coffee.",
          "influence_radius_km": 200
        }
      ],
      "routes": [
        { "from": 1, "to": 2, "method": "Trade routes across Red Sea", "duration_years": 600 },
        { "from": 2, "to": 3, "method": "Ottoman expansion", "duration_years": 150 },
        { "from": 3, "to": 4, "method": "Venetian merchants", "duration_years": 50 },
        { "from": 4, "to": 5, "method": "European trade networks", "duration_years": 50 }
      ]
    }
  }',
  '#6F4E37',
  'jigar',
  'SEMITIC_qahwa'
);

-- ============================================
-- Word 2: Captain (TREE type - Etymology tree)
-- ============================================
INSERT INTO daily_words (
  publish_date,
  word,
  definition,
  phonetic,
  visualization_type,
  content_json,
  accent_color,
  approved_by,
  root_family
) VALUES (
  '2026-02-09',
  'Captain',
  'A person in command of a ship, aircraft, sports team, or military unit.',
  '/ˈkæptɪn/',
  'TREE',
  '{
    "hook": "From ancient heads to modern leaders: how one Latin root spawned 40+ English words.",
    "fun_fact": "The words captain, capital, decapitate, and chapter all share the same root: Latin caput meaning head.",
    "nerd_mode": {
      "ipa_full": "/ˈkæptɪn/ (both British and American)",
      "earliest_citation": "First recorded in English around 1375 from Old French capitain."
    },
    "visual_data": {
      "type": "TREE",
      "layout": "radial",
      "root": {
        "term": "Caput",
        "language": "Latin",
        "meaning": "Head",
        "era": "100 BCE",
        "children": [
          {
            "term": "Capitaneus",
            "language": "Late Latin",
            "meaning": "Chief, leader (head person)",
            "era": "300 CE",
            "children": [
              {
                "term": "Capitain",
                "language": "Old French",
                "meaning": "Military leader",
                "era": "1200s",
                "children": [
                  {
                    "term": "Captain",
                    "language": "English",
                    "meaning": "Commander",
                    "era": "1375"
                  }
                ]
              }
            ]
          },
          {
            "term": "Capitalis",
            "language": "Latin",
            "meaning": "Of the head, chief",
            "era": "100 CE",
            "children": [
              {
                "term": "Capital",
                "language": "English",
                "meaning": "Chief city, wealth, uppercase letter",
                "era": "1200s"
              },
              {
                "term": "Capitol",
                "language": "English",
                "meaning": "Government building",
                "era": "1699"
              }
            ]
          },
          {
            "term": "Decapitare",
            "language": "Latin",
            "meaning": "To cut off the head",
            "era": "200 CE",
            "children": [
              {
                "term": "Decapitate",
                "language": "English",
                "meaning": "To behead",
                "era": "1611"
              }
            ]
          }
        ]
      }
    }
  }',
  '#1E40AF',
  'jigar',
  'PIE_kaput'
);

-- ============================================
-- Word 3: Algorithm (TIMELINE type - Meaning evolution)
-- ============================================
INSERT INTO daily_words (
  publish_date,
  word,
  definition,
  phonetic,
  visualization_type,
  content_json,
  accent_color,
  approved_by,
  root_family
) VALUES (
  '2026-02-10',
  'Algorithm',
  'A process or set of rules to be followed in calculations or other problem-solving operations.',
  '/ˈælɡəˌrɪðəm/',
  'TIMELINE',
  '{
    "hook": "The word algorithm is a 1,200-year-old typo of a Persian mathematician name.",
    "fun_fact": "Al-Khwarizmi, whose name inspired the word algorithm, also gave us the word algebra from his book title al-jabr.",
    "nerd_mode": {
      "ipa_full": "/ˈælɡəˌrɪðəm/",
      "disputed_origin": "The spelling was influenced by confusion with the Greek word arithmos (number).",
      "earliest_citation": "First appeared in English mathematical texts around 1690."
    },
    "visual_data": {
      "type": "TIMELINE",
      "epochs": [
        {
          "order": 1,
          "era": "780 CE",
          "term": "Muḥammad ibn Mūsā al-Khwārizmī",
          "meaning": "Muhammad, son of Moses, from Khwarezm",
          "usage_example": "The Persian scholar whose name would echo through a millennium of mathematics.",
          "sentiment": "neutral"
        },
        {
          "order": 2,
          "era": "820 CE",
          "term": "Algoritmi",
          "meaning": "Latinized form of al-Khwarizmi",
          "usage_example": "His book on Hindu-Arabic numerals was translated and titled \"Algoritmi de numero Indorum\".",
          "sentiment": "neutral"
        },
        {
          "order": 3,
          "era": "1200s",
          "term": "Algorism",
          "meaning": "The system of Arabic numerals",
          "usage_example": "Medieval scholars used algorism to mean doing arithmetic with the new number system.",
          "sentiment": "positive"
        },
        {
          "order": 4,
          "era": "1690",
          "term": "Algorithm",
          "meaning": "Any systematic calculation method",
          "usage_example": "The spelling shifted due to confusion with Greek arithmos (number).",
          "sentiment": "neutral"
        },
        {
          "order": 5,
          "era": "1950s",
          "term": "Algorithm",
          "meaning": "A precise computational procedure",
          "usage_example": "Computer scientists adopted the term for step-by-step instructions a machine could follow.",
          "sentiment": "positive"
        },
        {
          "order": 6,
          "era": "2020s",
          "term": "The Algorithm",
          "meaning": "Opaque systems that control digital feeds",
          "usage_example": "\"The algorithm keeps showing me cat videos\" - a term now laden with distrust.",
          "sentiment": "negative_shift"
        }
      ]
    }
  }',
  '#059669',
  'jigar',
  'PERSIAN_khwarizm'
);

-- Verify inserts
SELECT id, word, visualization_type, publish_date FROM daily_words ORDER BY publish_date;

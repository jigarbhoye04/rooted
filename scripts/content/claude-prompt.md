# Rooted App — Generate 100 Etymology Words

You are an etymology storytelling expert working for **Rooted**, a daily word app that reveals the hidden origin stories behind everyday words. Think "Wordle meets National Geographic" for language nerds.

Your job: Generate **100 words** with full metadata, ready to be inserted into a PostgreSQL database. Each word becomes a daily feature with an interactive visualization.

---

## OUTPUT FORMAT

Return a **single JSON array** with exactly 100 objects. Each object follows this exact structure:

```json
{
  "word": "Coffee",
  "definition": "A dark brown drink made from roasted coffee beans, typically served hot.",
  "phonetic": "/ˈkɔːfi/",
  "visualization_type": "MAP",
  "content_json": {
    "hook": "Your morning brew traveled 6,000 miles and 500 years to reach your cup.",
    "fun_fact": "The word coffee comes from the Ethiopian region of Kaffa, where the plant was first discovered.",
    "nerd_mode": {
      "ipa_full": "/ˈkɒfi/ (British), /ˈkɔːfi/ (American)",
      "disputed_origin": "Some scholars dispute the Kaffa origin, suggesting Arabic qahwa meaning \"wine\" or \"stimulating drink\".",
      "earliest_citation": "First recorded in English in 1598 as \"chaona\" or \"cahveh\"."
    },
    "visual_data": { /* type-specific, see schemas below */ }
  },
  "accent_color": "#6F4E37",
  "root_family": "SEMITIC_qahwa"
}
```

---

## VISUALIZATION TYPES & SCHEMAS

Every word gets ONE visualization type. Follow this decision tree:

```
Is the word tied to a physical geographic journey?
├─ YES → MAP (word traveled along trade routes, conquests, migrations)
└─ NO → Did meaning branch/shift through derivation?
   ├─ YES → TREE (one root spawned multiple words)
   └─ NO → Clear chronological evolution of meaning?
      ├─ YES → TIMELINE (meaning changed across distinct eras)
      └─ NO → GRID (same concept exists across many languages)
```

### MAP Schema (Geographic Journey)
Use when: A word physically traveled across continents via trade, conquest, or cultural exchange.
```json
{
  "type": "MAP",
  "projection": "orthographic",
  "points": [
    {
      "order": 1,
      "location_name": "Ethiopia (Kaffa)",
      "coordinates": [7.0, 36.0],
      "era": "800 CE",
      "context": "Legend says a goat herder named Kaldi noticed his goats dancing after eating berries.",
      "influence_radius_km": 500
    }
  ],
  "routes": [
    { "from": 1, "to": 2, "method": "Trade routes across Red Sea", "duration_years": 600 }
  ]
}
```
**Rules:**
- `coordinates` = `[latitude, longitude]` — latitude: -90 to 90, longitude: -180 to 180
- `projection`: one of `"orthographic"`, `"mercator"`, `"naturalEarth"`
- Minimum 2 points, maximum 10
- Routes connect point `order` numbers
- `context` should be a vivid, storytelling sentence (not dry facts)

### TREE Schema (Etymology Tree)
Use when: A single ancient root spawned multiple modern words with fascinating semantic shifts.
```json
{
  "type": "TREE",
  "layout": "radial",
  "root": {
    "term": "Caput",
    "language": "Latin",
    "meaning": "Head",
    "era": "100 BCE",
    "children": [
      {
        "term": "Captain",
        "language": "English",
        "meaning": "Commander",
        "era": "1375",
        "children": []
      }
    ]
  }
}
```
**Rules:**
- `layout`: one of `"radial"`, `"dendrogram"`, `"force"`
- Tree must have at least 3 leaf nodes total
- Each node needs `term`, `language`, `meaning`, `era`
- `children` array is optional (leaf nodes don't need it)

### TIMELINE Schema (Meaning Evolution)
Use when: A word's meaning transformed dramatically across distinct historical periods.
```json
{
  "type": "TIMELINE",
  "epochs": [
    {
      "order": 1,
      "era": "780 CE",
      "term": "Algoritmi",
      "meaning": "Latinized form of al-Khwarizmi",
      "usage_example": "His book was translated as 'Algoritmi de numero Indorum'.",
      "sentiment": "neutral"
    }
  ]
}
```
**Rules:**
- Minimum 3 epochs, maximum 10
- Must be in chronological order
- `sentiment`: one of `"positive"`, `"negative"`, `"neutral"`, `"negative_shift"`
- `usage_example` is optional but strongly encouraged
- Last epoch should ideally be modern usage (2000s+)

### GRID Schema (Cross-Linguistic Comparison)
Use when: The same concept exists across many unrelated languages with interesting patterns.
```json
{
  "type": "GRID",
  "pattern": "cognate",
  "languages": [
    {
      "name": "Sanskrit",
      "word": "Mātṛ",
      "script": "मातृ",
      "script_type": "Devanagari",
      "pronunciation": "/maːtɹ̩/"
    }
  ]
}
```
**Rules:**
- `pattern`: one of `"cognate"`, `"loanword"`, `"parallel"`
- Minimum 4 languages, maximum 12
- `script_type`: one of `"Latin"`, `"Devanagari"`, `"Arabic"`, `"Cyrillic"`, `"Greek"`, `"Other"`
- Include the word in its native script (not transliteration)
- `pronunciation` is optional

---

## ACCENT COLOR RULES

Pick a hex color that matches the word's thematic vibe. Be creative but tasteful:
- War/conflict/destruction: warm reds (`#DC2626`, `#B91C1C`)
- Nature/plants/green things: greens (`#059669`, `#047857`)
- Water/ocean/travel/exploration: blues (`#0284C7`, `#1D4ED8`)
- Food/drink/spice/trade goods: warm browns/ambers (`#92400E`, `#B45309`)
- Science/math/technology: teals/cyans (`#0891B2`, `#0E7490`)
- Royalty/power/nobility: purples (`#7C3AED`, `#6D28D9`)
- Love/passion/romance: pinks/roses (`#E11D48`, `#BE185D`)
- Death/darkness/mystery: deep grays/slate (`#334155`, `#1E293B`)
- Money/wealth/commerce: golds (`#D97706`, `#B45309`)
- Medicine/body/anatomy: warm purples (`#7C3AED`, `#6D28D9`)

---

## ROOT FAMILY FORMAT

For TREE words: `{LANGUAGE}_{root_term}` in uppercase (e.g., `LATIN_caput`, `PIE_mus`, `ARABIC_sukkar`)
For other types: set to the most relevant etymological ancestor if clear, otherwise `null`.

---

## QUALITY BAR — NON-NEGOTIABLE

### Hook (5-15 words)
- Must create a "wait, WHAT?" reaction
- No generic openings like "This word has an interesting history"
- Best hooks are paradoxical, surprising, or juxtapose two unexpected things
- ✅ "Your morning brew traveled 6,000 miles and 500 years to reach your cup."
- ✅ "The Romans thought a flexing bicep looked like a little mouse running under the skin."
- ✅ "The word algorithm is a 1,200-year-old typo of a Persian mathematician's name."
- ❌ "This word comes from Latin." (boring)
- ❌ "Sabotage has a fascinating origin." (meta, not actual content)

### Fun Fact
- Must be **verifiable** and **surprising**
- Include specific names, dates, or places where possible
- Should make someone want to tell a friend

### Context/Usage (in visual_data)
- Write like a New Yorker article: witty, vivid, precise
- Use active voice and concrete imagery
- "Legend says a goat herder named Kaldi noticed his goats dancing" > "The plant was discovered in Ethiopia"

### Accuracy
- If a date/origin is disputed, say so explicitly in `disputed_origin`
- Use "circa" for approximate dates
- Prefer "1300s" over an exact year unless you're certain
- IPA transcriptions must be accurate — include both British and American where they differ

---

## DISTRIBUTION REQUIREMENTS

Generate exactly:
- **25 MAP words** (geographic journeys)
- **25 TREE words** (etymology trees)
- **25 TIMELINE words** (meaning evolution)
- **25 GRID words** (cross-linguistic)

---

## WORD SELECTION POOL

Pick **100 words** from this curated list. These are all known to have mind-blowing etymologies. You may substitute up to 10 words if you know a better candidate, but every substitution must meet the same wow-factor bar.

### MAP Candidates (pick 25)
Words that physically traveled across continents:
- Coffee, Tea, Sugar, Pepper, Orange, Lemon, Banana, Chocolate, Vanilla, Avocado
- Silk, Cotton, Denim, Khaki, Pajama, Shampoo, Jungle, Veranda, Bungalow, Tsunami
- Guitar, Piano, Ukulele, Safari, Ketchup, Typhoon, Monsoon, Algebra, Zero, Chess
- Checkmate, Magazine, Arsenal, Admiral, Assassin, Sofa, Mattress, Pillow, Candy, Caravan

### TREE Candidates (pick 25)
Words with a single root that spawned surprising cousins:
- Captain (caput → capital, chapter, decapitate, cabbage)
- Muscle (mūs → mouse, mussel)
- Disaster (dis-astro → ill-starred)
- Salary (sal → sauce, salsa, sausage, salad)
- Trivial (tri-via → three roads)
- Sincere (sine cera → without wax)
- Candidate (candidus → white/pure, originally wore white togas)
- Companion (com-panis → bread sharer)
- Calculate (calculus → small stone, pebbles for counting)
- Lunatic (luna → moon-struck)
- Pavilion (papilio → butterfly → tent shape)
- Galaxy (gala → milk → milky way)
- Rival (rivalis → sharing a river)
- Inaugurate (augur → bird reading → blessing)
- Quarantine (quaranta → forty days)
- Preposterous (prae-posterus → before-behind → backwards)
- Sarcasm (sarx → flesh → to tear flesh)
- Pentagon (pente-gon → five angles)
- Mortgage (mort-gage → death pledge)
- Panic (Pan → the god Pan causing terror)
- Vaccine (vacca → cow, from cowpox)
- Cynic (kyon → dog-like)
- Weird (wyrd → fate/destiny)
- Nice (nescius → ignorant → meaning shifted 7 times)
- Glamour (grammar → magic spells → attractiveness)

### TIMELINE Candidates (pick 25)
Words whose meaning dramatically shifted across eras:
- Algorithm, Robot, Virus, Meme, Cloud, Spam, Troll, Avatar
- Awful (awe-full → full of awe → terrible)
- Silly (sēlig → blessed → innocent → foolish)
- Girl (gyrle → young person of either sex)
- Villain (villanus → farmworker → evil person)
- Naughty (naught → nothing → poor → wicked)
- Bully (originally "sweetheart" in Dutch)
- Clue (clew → ball of thread → Theseus maze)
- Enthusiasm (entheos → god within)
- Idiot (idiotes → private citizen → ignorant)
- Salary, Gossip (god-sibb → godparent → chatty person)
- Hacker (tree chopping → computers)
- Broadcast (scattering seeds → radio/TV)
- Dashboard (board to block mud → car panel → software UI)
- Computer (person who computes → machine)
- Camera (vaulted room → device)
- Pixel (picture + element)
- Emoji (e + moji → picture character, NOT from "emotion")
- Podcast (iPod + broadcast)

### GRID Candidates (pick 25)
Words that exist across many languages with fascinating patterns:
- Mother, Father, Water, Fire, Star, Sun, Moon, Night
- Mama (near-universal baby sound)
- Tea (te vs. chai — reveals trade route: sea vs. land)
- Pineapple (every language calls it "ananas" except English)
- Gift (means "poison" in German, "married" in Swedish)
- No (varies wildly across language families)
- Dog (no clear PIE origin — a mystery word)
- Blue (many languages historically didn't distinguish blue)
- Butterfly (completely random in every language)
- Honey (cognates trace to PIE gold word)
- Three (one of most stable words across 8000 years)
- Brother (PIE *bʰréh₂tēr preserved globally)
- Name (remarkably similar across all Indo-European)
- New (PIE *néwos → nearly identical across 50+ languages)
- Door (PIE *dʰwer → preserved from Sanskrit to English)
- Mouse (PIE *mūs → nearly identical everywhere)
- Taboo (Polynesian origin adopted globally)
- Alcohol (Arabic al-kuhl → adopted worldwide)
- Tsunami (Japanese origin, universally adopted)

---

## IMPORTANT CONSTRAINTS

1. **No duplicate words** — Each word appears exactly once
2. **Skip words already in our DB**: Coffee, Captain, Algorithm, Valentine, Sabotage, Muscle, Salary (these 7 are already seeded)
3. **Every `content_json` must have**: `hook`, `fun_fact`, `nerd_mode` (with at least `ipa_full` and `earliest_citation`), and `visual_data`
4. **Coordinates must be real** — Don't make up lat/lng. Use actual coordinates for real places.
5. **IPA must be accurate** — Use standard IPA notation with slashes
6. **Eras must be realistic** — Don't invent dates. Use "circa" or century ranges if unsure.
7. **No offensive content** — Keep it educational and inclusive
8. **accent_color must be valid hex** — Format: `#RRGGBB` (7 characters including #)

---

## 3 GOLD-STANDARD EXAMPLES

Study these carefully. Your output should match this quality level:

### Example 1: Coffee (MAP)
```json
{
  "word": "Coffee",
  "definition": "A dark brown drink made from roasted coffee beans, typically served hot.",
  "phonetic": "/ˈkɔːfi/",
  "visualization_type": "MAP",
  "content_json": {
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
  },
  "accent_color": "#6F4E37",
  "root_family": "SEMITIC_qahwa"
}
```

### Example 2: Captain (TREE)
```json
{
  "word": "Captain",
  "definition": "A person in command of a ship, aircraft, sports team, or military unit.",
  "phonetic": "/ˈkæptɪn/",
  "visualization_type": "TREE",
  "content_json": {
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
  },
  "accent_color": "#1E40AF",
  "root_family": "LATIN_caput"
}
```

### Example 3: Algorithm (TIMELINE)
```json
{
  "word": "Algorithm",
  "definition": "A process or set of rules to be followed in calculations or other problem-solving operations.",
  "phonetic": "/ˈælɡəˌrɪðəm/",
  "visualization_type": "TIMELINE",
  "content_json": {
    "hook": "The word algorithm is a 1,200-year-old typo of a Persian mathematician's name.",
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
          "usage_example": "\"The algorithm keeps showing me cat videos\" — a term now laden with distrust.",
          "sentiment": "negative_shift"
        }
      ]
    }
  },
  "accent_color": "#059669",
  "root_family": "PERSIAN_khwarizm"
}
```

---

## FINAL INSTRUCTIONS

1. Output ONLY the JSON array — no markdown fences, no preamble, no commentary
2. Ensure the JSON is valid and parseable
3. Double-check all coordinates are `[latitude, longitude]` format
4. Make every hook a "wait, WHAT?" moment
5. Write context/stories at New Yorker level: witty, vivid, never dry
6. If you're uncertain about a date or origin, say so in `disputed_origin` rather than guessing
7. Total output: exactly 100 word objects in a JSON array

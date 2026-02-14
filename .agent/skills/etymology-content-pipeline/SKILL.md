---
name: etymology-content-pipeline
description: Automate etymology content generation for Rooted app. Use when ingesting new words, transforming Wiktionary data into Rooted JSON schema, validating content structure, or determining visualization types (MAP/TREE/TIMELINE/GRID). Handles word research, coordinate validation, and database operations.
---

# Etymology Content Pipeline

This skill automates the complete content creation workflow for the Rooted daily etymology app, from raw word input to database-ready JSON.

## Quick Start

For a single word:
```bash
# Full pipeline
python3 /path/to/scripts/pipeline.py --word "sabotage" --publish-date "2025-03-01"
```

For batch processing:
```bash
# Process multiple words
python3 /path/to/scripts/batch_pipeline.py --file wordlist.txt
```

## Pipeline Stages

### Stage 1: Ingestion (Wiktionary → Raw JSON)

**Goal:** Fetch etymology data from Wiktionary API

**Process:**
1. Query Wiktionary API for the word
2. Extract etymology section
3. Extract definitions and part of speech
4. Save raw JSON to `data/raw/{word}.json`

**Example raw output:**
```json
{
  "word": "sabotage",
  "raw_etymology": "From French sabot (wooden shoe)...",
  "definitions": [
    {
      "definition": "Deliberate destruction...",
      "partOfSpeech": "noun"
    }
  ]
}
```

**Error handling:**
- If word not found: Check for spelling variations
- If etymology missing: Flag for manual research
- If multiple etymologies: Select the primary one

### Stage 2: Visualization Type Selection

**Critical decision:** Choose the best storytelling format based on the word's history.

**Decision tree:**

```
Is the word tied to a physical journey?
├─ YES → Use MAP
│  Examples: Coffee (Ethiopia→Yemen→Venice), Silk, Marathon, Orange
│  Required: Geographic coordinates, trade routes, conquest paths
│
└─ NO → Did meaning shift over time?
   ├─ YES → Use TREE
   │  Examples: Captain (caput→chief), Muscle (little mouse), Sabotage
   │  Required: Root etymology, language branches, derivatives
   │
   └─ NO → Clear temporal epochs?
      ├─ YES → Use TIMELINE
      │  Examples: Algorithm (Baghdad→Europe→Silicon Valley), Robot, Awful
      │  Required: Chronological progression, era markers
      │
      └─ NO → Use GRID
         Examples: Mother (cross-linguistic), Hello, Yes
         Required: Multiple language variants, scripts

```

**Validation criteria:**

**For MAP words:**
- ✓ Must have 2+ geographic locations
- ✓ Locations must have lat/lng coordinates
- ✓ Must describe movement/trade/conquest
- ✗ Avoid if purely linguistic evolution

**For TREE words:**
- ✓ Must have clear root etymology (Latin, PIE, etc.)
- ✓ Should have 3+ derivatives or branches
- ✓ Meaning transformation is key element
- ✗ Avoid if no interesting semantic shifts

**For TIMELINE words:**
- ✓ Must have 3+ distinct time periods
- ✓ Each period should have context/usage shift
- ✓ Works when geography is secondary
- ✗ Avoid if no clear temporal narrative

**For GRID words:**
- ✓ Use as fallback for structurally boring words
- ✓ Requires 5+ language cognates
- ✓ Cross-linguistic patterns are interesting
- ✗ Last resort if other types don't fit

### Stage 3: LLM Transformation (Raw → Rooted Schema)

**Goal:** Convert raw etymology into storytelling JSON

**System prompt template:**
```
You are an etymology storytelling expert for the Rooted app. Convert raw etymology data into engaging, accurate JSON following the Rooted schema.

VISUALIZATION TYPE: {selected_type}

RULES:
1. Be accurate. If uncertain about dates/locations, use "circa" or "disputed"
2. Write at New Yorker level: witty but not juvenile
3. Hook sentence must create intrigue (max 15 words)
4. Fun fact must be surprising and verifiable
5. For MAP: Coordinates must be [lat, lng] format
6. For TREE: Nest children chronologically or by language family
7. For TIMELINE: Include sentiment markers (positive/negative/neutral)
8. For GRID: Include proper script types (Devanagari, Cyrillic, etc.)

OUTPUT: Valid JSON matching Rooted schema. No markdown fences, no preamble.
```

**LLM input example:**
```
Word: sabotage
Raw Etymology: From French sabot (wooden shoe). Workers threw shoes into machinery during labor disputes in 19th century France.
Visualization Type: MAP
Definitions: Deliberate destruction or obstruction

Generate the content_json for this word.
```

**Expected output structure:**
```json
{
  "hook": "It all started with a wooden shoe.",
  "fun_fact": "French factory workers threw their wooden clogs (*sabots*) into machinery to protest harsh working conditions in the 1800s.",
  "nerd_mode": {
    "ipa_full": "/ˈsæ.bə.tɑːʒ/",
    "earliest_citation": "First recorded in English in 1910 (labor disputes).",
    "disputed_origin": null
  },
  "visual_data": {
    "type": "MAP",
    "projection": "mercator",
    "points": [...],
    "routes": [...]
  }
}
```

### Stage 4: Validation

**JSON Schema Validation:**
```python
from jsonschema import validate, ValidationError

# Load schema from resources/rooted-schema.json
schema = load_schema()

try:
    validate(instance=generated_json, schema=schema)
except ValidationError as e:
    # Attempt repair with LLM
    repaired = repair_json(generated_json, error=str(e))
    # Validate again (max 3 retries)
```

**Content Quality Checks:**

1. **Coordinate validation** (for MAP):
   ```python
   def validate_coordinates(lat, lng):
       assert -90 <= lat <= 90, "Invalid latitude"
       assert -180 <= lng <= 180, "Invalid longitude"
       # Check against geographic database
       verify_location_exists(lat, lng)
   ```

2. **Date validation** (for TIMELINE):
   ```python
   def validate_timeline(epochs):
       dates = [parse_era(e['era']) for e in epochs]
       assert dates == sorted(dates), "Timeline not chronological"
       assert len(dates) >= 3, "Timeline needs 3+ epochs"
   ```

3. **Etymology accuracy**:
   - Cross-reference with academic sources
   - Flag disputed etymologies
   - Verify IPA transcriptions

4. **Content quality**:
   - Hook is 5-15 words
   - Fun fact is verifiable (not anecdotal)
   - No offensive or insensitive content

### Stage 5: Database Insertion

**Prepare final record:**
```python
record = {
    'publish_date': args.publish_date,
    'word': word,
    'definition': definitions[0]['definition'],
    'phonetic': generate_phonetic(word),
    'visualization_type': selected_type,
    'content_json': generated_json,
    'accent_color': select_accent_color(word, selected_type),
    'root_family': extract_root_family(generated_json),
    'approved_by': None,  # Pending human review
    'created_at': datetime.now()
}
```

**SQL insertion:**
```sql
INSERT INTO daily_words (
  publish_date, word, definition, phonetic,
  visualization_type, content_json, accent_color,
  root_family, created_at
) VALUES (
  %(publish_date)s, %(word)s, %(definition)s, %(phonetic)s,
  %(visualization_type)s, %(content_json)s::jsonb, %(accent_color)s,
  %(root_family)s, %(created_at)s
)
ON CONFLICT (publish_date) DO NOTHING;
```

**Output:**
- Draft saved to database with `approved_by = NULL`
- Admin review required before publication
- Notify: "✓ Word '{word}' drafted for {publish_date}. Pending review."

## Accent Color Selection

Each word gets a thematic accent color:

```python
def select_accent_color(word, viz_type, content):
    # Keyword-based color mapping
    if any(kw in content.lower() for kw in ['war', 'conflict', 'sabotage', 'violence']):
        return '#DC2626'  # Red-600
    elif any(kw in content.lower() for kw in ['nature', 'forest', 'plant', 'green']):
        return '#059669'  # Green-600
    elif any(kw in content.lower() for kw in ['water', 'ocean', 'sea', 'travel']):
        return '#0284C7'  # Blue-600
    elif any(kw in content.lower() for kw in ['food', 'coffee', 'spice']):
        return '#92400E'  # Amber-800
    else:
        return '#000000'  # Default black
```

## Root Family Extraction (for Wordception)

**Goal:** Identify shared etymological roots for the ghost overlay feature.

```python
def extract_root_family(content_json):
    if content_json['visual_data']['type'] == 'TREE':
        root = content_json['visual_data']['root']
        # Normalize root name
        root_family = f"{root['language']}_{normalize(root['term'])}"
        # Example: "Latin_caput" for Captain, Cape, Cabbage
        return root_family
    return None
```

**Database query for Wordception:**
```sql
SELECT publish_date, word, content_json 
FROM daily_words
WHERE root_family = 'Latin_caput'
  AND publish_date < CURRENT_DATE
ORDER BY publish_date DESC 
LIMIT 1;
```

## Error Handling & Recovery

### Common Issues:

**1. Wiktionary API timeout**
```python
try:
    response = requests.get(url, timeout=10)
except requests.Timeout:
    # Retry with backoff
    retry_with_backoff(fetch_etymology, word, max_retries=3)
```

**2. LLM generates invalid JSON**
```python
def repair_json(bad_json, error_msg):
    repair_prompt = f"""
    The previous JSON was invalid. Error: {error_msg}
    
    Invalid JSON:
    {bad_json}
    
    Fix the error and return valid JSON only.
    """
    return llm.generate(repair_prompt)
```

**3. Coordinates not found**
```python
def geocode_location(location_name):
    # Use Nominatim (free, no API key)
    url = f"https://nominatim.openstreetmap.org/search?q={location_name}&format=json"
    response = requests.get(url, headers={'User-Agent': 'Rooted/1.0'})
    data = response.json()
    if data:
        return [float(data[0]['lat']), float(data[0]['lon'])]
    else:
        raise ValueError(f"Location '{location_name}' not found")
```

**4. Duplicate publish_date**
```python
# Check before processing
existing = db.query("SELECT word FROM daily_words WHERE publish_date = ?", publish_date)
if existing:
    print(f"⚠️  {publish_date} already has word '{existing[0]}'. Choose different date.")
    sys.exit(1)
```

## Batch Processing

**For queuing multiple words:**

```python
# wordlist.txt format:
# sabotage,2025-03-01
# captain,2025-03-02
# algorithm,2025-03-03

with open('wordlist.txt') as f:
    for line in f:
        word, date = line.strip().split(',')
        try:
            process_word(word, date)
            print(f"✓ {word} → {date}")
        except Exception as e:
            print(f"✗ {word} failed: {e}")
            # Log to errors.txt for review
            log_error(word, date, e)
```

**Parallel processing** (for speed):
```python
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=5) as executor:
    futures = [executor.submit(process_word, w, d) for w, d in word_list]
    for future in futures:
        future.result()  # Wait for completion
```

## Geographic Data Resources

**For MAP visualizations, use these coordinate databases:**

- **World cities**: `resources/world-cities.json` (40k cities with lat/lng)
- **Historical locations**: `resources/historical-places.json` (ancient cities, empires)
- **Trade routes**: `resources/silk-road.json`, `resources/spice-routes.json`

**Geocoding fallback:**
```python
# If location not in database, use Nominatim
from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="rooted-app")
location = geolocator.geocode("Venice, Italy")
coords = [location.latitude, location.longitude]
```

## Quality Checklist (Before Human Review)

Before flagging a word as "ready for review", ensure:

- [ ] Hook is 5-15 words and intriguing
- [ ] Fun fact is verifiable (has source)
- [ ] JSON validates against schema
- [ ] Visualization type makes sense for story
- [ ] Coordinates are valid (if MAP)
- [ ] Timeline is chronological (if TIMELINE)
- [ ] Tree structure is logical (if TREE)
- [ ] Language scripts are correct (if GRID)
- [ ] No offensive content
- [ ] IPA transcription is accurate
- [ ] Accent color matches theme
- [ ] Root family is set (if applicable)

## Usage Examples

### Example 1: Process a single MAP word
```bash
python3 scripts/pipeline.py --word "coffee" --publish-date "2025-03-15"

# Output:
# → Fetching from Wiktionary...
# → Raw data saved to data/raw/coffee.json
# → Analysis: Geographic journey detected
# → Selected visualization: MAP
# → Generating content with LLM...
# → Validating coordinates...
# → ✓ Ethiopia [9.145, 40.489]
# → ✓ Yemen [15.552, 48.516]
# → ✓ Venice [45.440, 12.315]
# → JSON schema validation passed
# → Accent color: #92400E (food theme)
# → Inserted into database (pending review)
# ✓ Coffee drafted for 2025-03-15
```

### Example 2: Process a TREE word
```bash
python3 scripts/pipeline.py --word "captain" --publish-date "2025-03-20"

# Output:
# → Fetching from Wiktionary...
# → Analysis: Latin root with multiple derivatives
# → Selected visualization: TREE
# → Root family: Latin_caput
# → Wordception check: Found related word "Cabbage" (2025-03-10)
# → Note: Ghost overlay will appear for users
# ✓ Captain drafted for 2025-03-20
```

### Example 3: Batch processing
```bash
python3 scripts/batch_pipeline.py --file march-words.txt --parallel 5

# Output:
# → Processing 30 words with 5 parallel workers...
# ✓ sabotage → 2025-03-01
# ✓ captain → 2025-03-02
# ✓ algorithm → 2025-03-03
# ✗ xyz → 2025-03-04 (failed: Word not found in Wiktionary)
# ...
# → Summary: 28/30 successful, 2 failed
# → Failed words logged to errors.txt
```

## Admin Review Integration

After pipeline completes, the word appears in the admin dashboard at `admin/review.html`.

**Review workflow:**
1. Admin opens dashboard
2. Sees drafted word with:
   - Full JSON preview
   - Visualization type badge
   - Quality checklist status
3. Options:
   - **Approve**: Sets `approved_by = 'jigar'`, enables publication
   - **Edit**: Opens JSON editor for manual tweaks
   - **Reject**: Deletes draft, logs reason

**API endpoint for approval:**
```typescript
POST /api/admin/approve
{
  "word": "sabotage",
  "publish_date": "2025-03-01",
  "approved_by": "jigar"
}
```

## Performance Optimization

**Caching strategy:**
```python
# Cache Wiktionary responses (expire after 30 days)
@lru_cache(maxsize=1000)
def fetch_etymology_cached(word):
    return fetch_etymology(word)

# Cache geocoding results
geocode_cache = shelve.open('geocode.db')
def geocode_cached(location):
    if location in geocode_cache:
        return geocode_cache[location]
    coords = geocode_location(location)
    geocode_cache[location] = coords
    return coords
```

**Rate limiting:**
```python
# Respect Wiktionary API rate limits (max 200 req/sec)
import time
from functools import wraps

def rate_limit(calls_per_second=10):
    min_interval = 1.0 / calls_per_second
    def decorator(func):
        last_called = [0.0]
        @wraps(func)
        def wrapper(*args, **kwargs):
            elapsed = time.time() - last_called[0]
            left_to_wait = min_interval - elapsed
            if left_to_wait > 0:
                time.sleep(left_to_wait)
            result = func(*args, **kwargs)
            last_called[0] = time.time()
            return result
        return wrapper
    return decorator

@rate_limit(calls_per_second=5)
def fetch_etymology(word):
    # Implementation
```

## Debugging Tips

**Enable verbose mode:**
```bash
python3 scripts/pipeline.py --word "test" --verbose
```

**Check intermediate outputs:**
```bash
# View raw Wiktionary data
cat data/raw/sabotage.json | jq

# View generated JSON
cat data/drafts/sabotage.json | jq

# Validate against schema
jsonschema -i data/drafts/sabotage.json resources/rooted-schema.json
```

**Test visualization type selection:**
```python
from pipeline import determine_viz_type

# Test the decision logic
test_words = {
    'coffee': 'MAP',      # Geographic journey
    'captain': 'TREE',    # Root + derivatives
    'algorithm': 'TIMELINE',  # Temporal progression
    'mother': 'GRID'      # Cross-linguistic
}

for word, expected in test_words.items():
    actual = determine_viz_type(word)
    assert actual == expected, f"{word}: expected {expected}, got {actual}"
```

## Next Steps

After running the content pipeline:
1. Review generated word in admin dashboard
2. Verify visualization preview
3. Approve or request edits
4. Word becomes available at `/api/word/today` on publish_date
5. Vercel Cron rotates word at midnight UTC

For visualization implementation, use the **etymology-visualizations** skill.

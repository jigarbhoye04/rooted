# 📂 Master Product Requirements Document (PRD) v2.0

**Project Name:** Rooted  
**Version:** 2.0 (Enhanced Edition)  
**Owner:** Jigar (Solo Dev)  
**Status:** Ready for Development  
**Purpose:** Feed this entire document to an LLM (Claude 3.5 Sonnet, GPT-4o) or use as the definitive development blueprint.

---

## 🎯 Executive Summary

### The Vision

**"Rooted"** is a daily, web-based application that transforms etymology from boring dictionary lookups into **scrollytelling experiences**. Each day features a single word with a visually stunning exploration of its linguistic journey.

### The Problem

- **Existing Solutions:** Dictionary apps (Merriam-Webster, Oxford) are text-heavy, academic, and lifeless.
- **The Gap:** They treat words as data points, not stories. There's no emotional connection, no visual narrative, no reason to return daily.
- **User Pain:** People who love language have nowhere to *experience* etymology—only to *read* it.

### The Solution

A hybrid visualization engine that **adapts to each word's story**:

1. **Family Tree (70% of words):** For words where meaning evolved over time (e.g., "Muscle" from Latin *musculus* = "little mouse").
2. **Geographic Map (30% of words):** For words tied to trade routes, conquest, or specific places (e.g., "Coffee," "Sheriff," "Marathon").
3. **Timeline (A-Tier fallback):** For less visual words with clear temporal progression (e.g., "Algorithm" from Baghdad → Medieval Europe → Silicon Valley).
4. **Comparison Grid (B-Tier fallback):** For structurally boring words, show cross-linguistic patterns (e.g., "Hello" in 5 scripts/languages).

### The Differentiators

| Feature | Traditional Apps | Rooted |
|---------|-----------------|--------|
| **Frequency** | Searchable database | One word per day (creates anticipation) |
| **Format** | Static text | Scrollytelling with animated visuals |
| **Visualization** | Generic or none | Adaptive (Tree/Map/Timeline/Grid based on story) |
| **Engagement** | Single visit | Daily habit loop with streaks |
| **Shareability** | Copy-paste definitions | Auto-generated quote cards with QR codes |

### The Vibe

**Swiss Minimalism meets Google Material Design:**
- High contrast, beautiful typography, zero clutter.
- Slow, deliberate animations (0.8s easing, no bounce).
- Feels like a premium print magazine adapted for touch.

---

## 🛠 Tech Stack (Optimized for Vercel Free Tier)

As a solo developer on a budget, we maximize Vercel's free tier while maintaining premium UX.

### Core Framework

- **Next.js 14+ (App Router):** Server-side rendering, API routes, and cron jobs in one package.
- **TypeScript:** Strict typing for maintainability.
- **Tailwind CSS:** Utility-first styling for rapid iteration.
- **Framer Motion:** Butter-smooth scrollytelling animations.

### Database & Backend

- **Vercel Postgres (Neon):** Serverless SQL for structured etymology data.
  - *Why:* Word relationships (roots, branches, derivatives) map naturally to relational schemas.
  - *Alternative:* If Postgres quota is exceeded, fall back to Supabase free tier.
- **Vercel Functions:** Serverless API routes for:
  - Daily word delivery (`/api/word/today`)
  - Admin content approval (`/api/admin/approve`)
  - Share card generation (`/api/share/generate`)
- **Vercel Cron:** Triggers daily word rotation at midnight UTC.

### Visualization Stack

- **D3.js v7:** Tree layouts (`d3.hierarchy`), map projections (`d3.geo`), bezier curves.
- **TopoJSON-Client:** Lightweight world map data (<50kb gzipped).
- **React-Simple-Maps:** (Optional) Wrapper around D3 for declarative map syntax.
- **Canvas API:** (Fallback for mobile) Render complex visualizations on `<canvas>` instead of SVG for better performance on low-end devices.

### Progressive Web App (PWA)

- **Next.js PWA Plugin:** Offline-first architecture.
- **Service Worker:** Pre-cache tomorrow's word at midnight (JSON + assets).
- **Zero Network Latency:** Buttery smooth scrolling even on slow connections.
- **Install Prompt:** "Add to Home Screen" for app-like experience.

### Content Pipeline

- **Python 3.11+:** Wiktionary API scraper + LLM integration.
- **Google Gemini 2.0 Flash / GPT-4o:** Transform raw etymology into storytelling JSON.
- **Simple Admin Dashboard:** Local HTML page (`/admin/review.html`) for human approval.

---

## 🧠 The Hybrid Visualization Logic (Core Innovation)

### Decision Tree for Visualization Type

Every word is evaluated against this hierarchy:

```
┌─────────────────────────────────────────┐
│ Is the word tied to a physical journey? │
│ (Trade routes, migration, conquest)     │
└──────────┬──────────────────────────────┘
           │
      YES  │  NO
           ▼
    ┌──────────┐        ┌───────────────────┐
    │   MAP    │        │ Did meaning shift │
    │ (S-Tier) │        │ over time/context?│
    └──────────┘        └─────────┬─────────┘
                              YES  │  NO
                                   ▼
                          ┌────────────┐      ┌──────────────┐
                          │    TREE    │      │ Clear epochs?│
                          │  (S-Tier)  │      └──────┬───────┘
                          └────────────┘         YES │  NO
                                                     ▼
                                            ┌────────────┐  ┌──────────┐
                                            │  TIMELINE  │  │   GRID   │
                                            │  (A-Tier)  │  │ (B-Tier) │
                                            └────────────┘  └──────────┘
```

### Visualization Types Explained

#### **S-Tier: The Map (30% of words)**

**Use Cases:**
- Words born from trade (e.g., "Coffee" from Ethiopia → Yemen → Venice)
- Words tied to conquest (e.g., "Sheriff" from Arabic *sharīf* via Norman invasion)
- Place names that became common words (e.g., "Spa" from Spa, Belgium)

**Visual Behavior:**
1. **Idle State:** World map in muted grayscale, centered on the Atlantic.
2. **Scroll Trigger 1:** Zoom to **Origin Point** (e.g., Ethiopia). A pulsing circle appears.
3. **Scroll Trigger 2:** Animated bezier curve traces the **First Journey** (Ethiopia → Yemen). Show a dotted trail with expanding influence zones.
4. **Scroll Trigger 3:** Continue to **Final Destination** (Yemen → Venice → Global). Map saturates with color.
5. **Interaction:** Tap any point to reveal a timeline card: "1200 CE - Sufi monks cultivate coffee in Yemen."

**Technical Implementation:**
- Use `d3.geoOrthographic()` for 3D globe effect.
- Animate camera position with `framer-motion`'s `useSpring`.
- Draw bezier curves with `d3.line().curve(d3.curveBasis)`.
- Show influence zones with `d3.geoCircle()` expanding over time.

**Example Words:** Coffee, Silk, Tulip, Orange (the fruit), Marathon, Denim (from "de Nîmes"), Spa.

---

#### **S-Tier: The Tree (40% of words)**

**Use Cases:**
- Words with Proto-Indo-European roots (e.g., "Mother" from PIE *méh₂tēr*)
- Words where meaning transformed (e.g., "Muscle" from "little mouse" because biceps look like mice under skin)
- Words with surprising modern derivatives (e.g., "Captain," "Cape," "Cabbage" all from Latin *caput* = "head")

**Visual Behavior:**
1. **Idle State:** A single glowing root node (e.g., Latin *caput*).
2. **Scroll Trigger 1:** Root expands into **Language Families** (Germanic branch, Romance branch).
3. **Scroll Trigger 2:** Branches sprout into **Modern Derivatives**. Each node appears with a small pop animation.
4. **Scroll Trigger 3:** Highlight the path from root to today's word (bold line).
5. **Interaction:** Tap any node to see: "Old French *capitan* (1300s) - Military leader."

**Technical Implementation:**
- Use `d3.tree()` or `d3.cluster()` for layout.
- Animate node entrance with Framer Motion's `staggerChildren`.
- Draw links with `d3.linkHorizontal()` or `d3.linkVertical()`.
- Store tree structure as nested JSON: `{ term: "Caput", children: [{term: "Captain"}, {term: "Cape"}] }`.

**Example Words:** Muscle, Captain, Sabotage, Breakfast, Lunatic, Salary.

---

#### **A-Tier: The Timeline (20% of words)**

**Use Cases:**
- Words with clear historical epochs but no strong geographic story (e.g., "Algorithm" from al-Khwarizmi → Medieval Latin → Silicon Valley).
- Words where usage context changed (e.g., "Awful" = "full of awe" (positive) → "terrible" (negative)).

**Visual Behavior:**
1. **Idle State:** Horizontal timeline with 3-5 major stops.
2. **Scroll Trigger:** Scroll through time. Each era's card slides in from the right.
3. **Content Example:**
   - **800 CE:** Baghdad mathematician al-Khwarizmi writes *Algoritmi de Numero Indorum*.
   - **1200 CE:** Latin translation spreads through European monasteries.
   - **1950s:** "Algorithm" enters computer science lexicon.

**Technical Implementation:**
- Use CSS Grid for timeline layout.
- Animate cards with `framer-motion`'s `useInView`.
- No D3 required (pure CSS + Framer).

**Example Words:** Algorithm, Robot (from Czech *robota*), Awful, Clue (from "clew" = ball of thread).

---

#### **B-Tier: The Comparison Grid (10% of words)**

**Use Cases:**
- Structurally boring words with interesting cross-linguistic patterns (e.g., "Hello," "Yes," "Mother").
- Loanwords that barely changed (e.g., "Coffee" is *qahwa* in Arabic, *koffie* in Dutch, *café* in French—minimal variation).

**Visual Behavior:**
1. **Idle State:** A 3×3 grid of language tiles.
2. **Scroll Trigger:** Tiles flip to reveal the word in different scripts/languages.
3. **Content Example (for "Mother"):**
   - **Sanskrit:** *Mātṛ* (मातृ)
   - **Latin:** *Māter*
   - **Old English:** *Mōdor*
   - **Greek:** *Mḗtēr* (μήτηρ)
   - **Persian:** *Mādar* (مادر)

**Technical Implementation:**
- Use CSS Flexbox + Tailwind.
- Animate flips with Framer Motion's `rotateY`.
- Store data as simple array: `[{lang: "Sanskrit", word: "Mātṛ", script: "Devanagari"}]`.

**Example Words:** Hello, Yes, No, Mother, Father, Water.

---

## 📱 User Experience (The Scrollytelling Flow)

The app is a **single-page linear journey**. No navigation bar. No tabs. Just scroll.

### Section 1: The Hook (100vh)

**Visual Layout:**
```
┌─────────────────────────────┐
│                             │
│                             │
│       **SABOTAGE**          │ ← 72px Playfair Display
│      /ˈsa-bə-ˌtäzh/        │ ← 18px Inter (muted gray)
│                             │
│                             │
│    [ Scroll to explore ↓ ]  │ ← Pulsing indicator
└─────────────────────────────┘
```

**Behavior:**
- Word fades in with 1.2s ease-out.
- Phonetic guide fades in 0.3s later.
- Scroll indicator pulses subtly (1s loop).

**Mobile Considerations:**
- Font size scales down to 48px on <768px screens.
- Touch hint: "Swipe up" instead of "Scroll."

---

### Section 2: The Visualization (Sticky, 200-400vh)

**Layout:**
- **Visualization Canvas:** Fixed center (60% of viewport).
- **Story Cards:** Scroll *over* the canvas (z-index layering).

**Example Progression (for "Sabotage"):**

```
┌─────────────────────────────┐
│ [Scrollable Card Layer]     │
│ ┌─────────────────────────┐ │
│ │ 19th Century France     │ │ ← Card 1 enters
│ └─────────────────────────┘ │
│                             │
│    [ MAP: France zoomed ]   │ ← Sticky visualization
│                             │
└─────────────────────────────┘

     (User scrolls down)

┌─────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │ Workers threw wooden    │ │ ← Card 2 enters
│ │ shoes (*sabots*) into   │ │
│ │ factory machines.       │ │
│ └─────────────────────────┘ │
│                             │
│ [ MAP: Factory icon pops ]  │ ← Animation trigger
│                             │
└─────────────────────────────┘

     (User scrolls down)

┌─────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │ The term spread         │ │ ← Card 3 enters
│ │ globally during labor   │ │
│ │ movements.              │ │
│ └─────────────────────────┘ │
│                             │
│ [ MAP: Global view ]        │ ← Map zooms out
│                             │
└─────────────────────────────┘
```

**Technical Implementation:**
- Use `framer-motion`'s `useScroll()` to track scroll progress.
- Map scroll percentage to visualization states:
  ```typescript
  const { scrollYProgress } = useScroll();
  const mapZoom = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 3, 2, 1]);
  ```

---

### Section 3: The Fun Fact (100vh)

**Layout:**
```
┌─────────────────────────────┐
│   💡 Did You Know?          │
│                             │
│   The French word *sabot*   │
│   lives on in "saboteur"    │
│   and even in dance—        │
│   clog dancing!             │
│                             │
│   [Share This Word 🔗]      │ ← Generates quote card
└─────────────────────────────┘
```

**Share Feature:**
- Clicking generates a 1080×1080 PNG with:
  - The word in large serif type.
  - One-sentence hook.
  - QR code linking to `rooted.app/word/sabotage`.
  - Clean brand footer: "Rooted • Daily Etymology."

**Technical Implementation:**
- Use `html2canvas` or server-side Puppeteer to render.
- Store generated images in Vercel Blob storage (free tier: 100GB).

---

### Section 4: The Wordception Layer (Easter Egg)

**Concept:**
If today's word shares a root with a previous word, show a **ghost overlay** of the old tree/map.

**Example:**
- **Day 30:** "Captain" (from Latin *caput* = head).
- **Day 45:** "Decapitate" (from Latin *caput* = head).
- **Behavior on Day 45:** When the tree appears, the "Captain" branch fades in as a translucent ghost.
- **Interaction:** Tap the ghost → "You explored this root 15 days ago. [View Captain]"

**Technical Implementation:**
- Query database for shared roots:
  ```sql
  SELECT publish_date, word FROM daily_words
  WHERE content_json->'visual_data'->>'root' = 'caput'
  AND publish_date < CURRENT_DATE
  ORDER BY publish_date DESC LIMIT 1;
  ```
- Render old tree with `opacity: 0.2` behind new tree.

---

### Section 5: The Streak System (Gamification)

**Goal:** Turn casual visitors into daily users.

**Mechanics:**
1. **Track Visits:** Store a cookie `last_visit_date` (or localStorage for PWA).
2. **Streak Counter:** Display in top-right corner: "🔥 7 day streak."
3. **Milestones:**
   - **7 days:** "You've explored a full week of words!"
   - **30 days:** Generate a **knowledge tree** (SVG showing all roots you've seen).
   - **100 days:** Unlock "Nerd Mode" (detailed IPA transcriptions, disputed etymologies).

**Visual:**
```
┌─────────────────────────────┐
│ 🔥 7              [Profile] │ ← Top bar (minimal)
└─────────────────────────────┘
```

**Share Feature:**
- At 30-day milestone, auto-generate a shareable image:
  ```
  ┌─────────────────────────────┐
  │  I've explored 30 words     │
  │  on Rooted! My knowledge    │
  │  tree:                      │
  │                             │
  │  [ Mini tree visualization ]│
  │                             │
  │  Join me: rooted.app 🌱     │
  └─────────────────────────────┘
  ```

---

## 💾 Data Schema (The Contract)

This schema is **non-negotiable**. Every component relies on this structure.

### SQL Table: `daily_words`

```sql
CREATE TABLE daily_words (
  id SERIAL PRIMARY KEY,
  publish_date DATE UNIQUE NOT NULL,  -- The date this word goes live
  word VARCHAR(100) NOT NULL,
  definition TEXT NOT NULL,
  phonetic VARCHAR(100),
  pronunciation_audio_url TEXT,  -- Optional: Link to Forvo/IPA audio
  
  -- Visualization type: TREE, MAP, TIMELINE, or GRID
  visualization_type VARCHAR(10) CHECK (visualization_type IN ('TREE', 'MAP', 'TIMELINE', 'GRID')),
  
  -- Core data (see JSON schema below)
  content_json JSONB NOT NULL,
  
  -- Metadata
  accent_color CHAR(7) DEFAULT '#000000',  -- Hex color for this word's theme
  created_at TIMESTAMP DEFAULT NOW(),
  approved_by VARCHAR(50),  -- Admin who approved this word
  
  -- For Wordception feature
  root_family VARCHAR(50),  -- e.g., "PIE_kaput" for tracking shared roots
  
  CONSTRAINT valid_color CHECK (accent_color ~ '^#[0-9A-Fa-f]{6}$')
);

-- Index for fast daily lookups
CREATE INDEX idx_publish_date ON daily_words(publish_date);

-- Index for Wordception queries
CREATE INDEX idx_root_family ON daily_words(root_family) WHERE root_family IS NOT NULL;
```

---

### JSON Schema: `content_json`

This is what your **LLM content pipeline** must generate for every word.

#### **Base Structure (All Types)**

```json
{
  "hook": "A one-sentence teaser that appears at the top.",
  "fun_fact": "The 'Did You Know?' section content.",
  "nerd_mode": {
    "ipa_full": "/ˈsæ.bə.tɑːʒ/",  // Detailed IPA transcription
    "disputed_origin": "Some scholars argue...",  // Optional
    "earliest_citation": "Oxford English Dictionary, 1910"
  },
  "visual_data": { /* Type-specific structure below */ }
}
```

---

#### **For `visualization_type: 'MAP'`**

```json
{
  "hook": "It traveled 4,000 miles before reaching your cup.",
  "fun_fact": "Coffee was banned in Mecca in 1511 for causing 'radical thinking.'",
  "visual_data": {
    "type": "MAP",
    "projection": "orthographic",  // or "mercator"
    "points": [
      {
        "order": 1,
        "location_name": "Ethiopia",
        "coordinates": [9.145, 40.489],  // [lat, lng]
        "era": "800 CE",
        "context": "Legend says a goat herder discovered coffee when his goats ate the berries and became energetic.",
        "influence_radius_km": 500  // For expanding circle animation
      },
      {
        "order": 2,
        "location_name": "Yemen",
        "coordinates": [15.552, 48.516],
        "era": "1200 CE",
        "context": "Sufi monks cultivated coffee to stay awake during night prayers. Called it *qahwa* (قهوة).",
        "influence_radius_km": 1000
      },
      {
        "order": 3,
        "location_name": "Venice, Italy",
        "coordinates": [45.440, 12.315],
        "era": "1600 CE",
        "context": "Venetian merchants brought coffee to Europe. The first coffeehouse opened in 1645.",
        "influence_radius_km": 2000
      }
    ],
    "routes": [
      {
        "from": 1,  // Point order
        "to": 2,
        "method": "Caravan trade routes",
        "duration_years": 400
      },
      {
        "from": 2,
        "to": 3,
        "method": "Maritime trade (Red Sea → Mediterranean)",
        "duration_years": 400
      }
    ]
  }
}
```

---

#### **For `visualization_type: 'TREE'`**

```json
{
  "hook": "All these words share the same ancestor: a word for 'head.'",
  "fun_fact": "Cabbage is called 'cabbage' because it's shaped like a head!",
  "visual_data": {
    "type": "TREE",
    "layout": "radial",  // or "dendrogram" (vertical)
    "root": {
      "term": "Caput",
      "language": "Latin",
      "meaning": "Head",
      "era": "Classical Latin (100 BCE)"
    },
    "children": [
      {
        "term": "Captain",
        "language": "English via Old French",
        "meaning": "Chief / Leader (the 'head' of a group)",
        "era": "1300s",
        "children": [
          {
            "term": "Capitalize",
            "language": "English",
            "meaning": "To write with a capital (head) letter",
            "era": "1700s"
          }
        ]
      },
      {
        "term": "Cape",
        "language": "English via Latin",
        "meaning": "Hooded cloak (covers the head)",
        "era": "1500s"
      },
      {
        "term": "Cabbage",
        "language": "English via Old French *caboche*",
        "meaning": "Head-shaped vegetable",
        "era": "1400s"
      },
      {
        "term": "Decapitate",
        "language": "English via Latin *decapitare*",
        "meaning": "Remove the head",
        "era": "1600s"
      }
    ]
  }
}
```

---

#### **For `visualization_type: 'TIMELINE'`**

```json
{
  "hook": "This word's meaning did a complete 180° over time.",
  "fun_fact": "In Shakespeare's time, 'awful' was a compliment!",
  "visual_data": {
    "type": "TIMELINE",
    "epochs": [
      {
        "order": 1,
        "era": "Old English (1000 CE)",
        "term": "Egefull",
        "meaning": "Full of awe; inspiring reverential wonder",
        "usage_example": "The cathedral was an egefull sight.",
        "sentiment": "positive"
      },
      {
        "order": 2,
        "era": "Middle English (1300s)",
        "term": "Awful",
        "meaning": "Commanding awe; majestic",
        "usage_example": "The king's awful presence silenced the court.",
        "sentiment": "neutral"
      },
      {
        "order": 3,
        "era": "Early Modern English (1600s)",
        "term": "Awful",
        "meaning": "Awe-inspiring but increasingly negative (fearsome)",
        "usage_example": "An awful storm destroyed the fleet.",
        "sentiment": "negative_shift"
      },
      {
        "order": 4,
        "era": "Modern English (1800s - Present)",
        "term": "Awful",
        "meaning": "Very bad; terrible",
        "usage_example": "That movie was awful.",
        "sentiment": "negative"
      }
    ]
  }
}
```

---

#### **For `visualization_type: 'GRID'`**

```json
{
  "hook": "This word is nearly identical across 50+ languages.",
  "fun_fact": "Linguists call these 'Mama words'—the easiest sounds for babies to make.",
  "visual_data": {
    "type": "GRID",
    "pattern": "cognate",  // or "loanword"
    "languages": [
      {
        "name": "Sanskrit",
        "word": "Mātṛ",
        "script": "मातृ",
        "script_type": "Devanagari",
        "pronunciation": "/maːtɹ̩/"
      },
      {
        "name": "Latin",
        "word": "Māter",
        "script": "MĀTER",
        "script_type": "Latin",
        "pronunciation": "/ˈmaː.tɛr/"
      },
      {
        "name": "Greek",
        "word": "Mḗtēr",
        "script": "μήτηρ",
        "script_type": "Greek",
        "pronunciation": "/mɛ́ːtɛːr/"
      },
      {
        "name": "Old English",
        "word": "Mōdor",
        "script": "MŌDOR",
        "script_type": "Latin",
        "pronunciation": "/ˈmoː.dor/"
      },
      {
        "name": "Persian",
        "word": "Mādar",
        "script": "مادر",
        "script_type": "Arabic",
        "pronunciation": "/mɒːˈdær/"
      },
      {
        "name": "Russian",
        "word": "Mat'",
        "script": "мать",
        "script_type": "Cyrillic",
        "pronunciation": "/matʲ/"
      }
    ]
  }
}
```

---

## ⚙️ The "Cyborg" Content Pipeline

**Philosophy:** Automate the tedious, curate the creative.

### Pipeline Flow

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  Wiktionary │ ───> │ Python      │ ───> │ LLM (Gemini │ ───> │ Human       │
│  API        │      │ Scraper     │      │ or GPT-4o)  │      │ Review      │
│             │      │             │      │             │      │ (Jigar)     │
└─────────────┘      └─────────────┘      └─────────────┘      └─────────────┘
                                                │                       │
                                                │                       │
                                                ▼                       ▼
                                         ┌─────────────┐      ┌─────────────┐
                                         │ Draft JSON  │      │ Approved    │
                                         │ (Local)     │      │ → Postgres  │
                                         └─────────────┘      └─────────────┘
```

### Step 1: Ingestion (Python Script)

**Script:** `scripts/ingest.py`

```python
import requests
import json

def fetch_etymology(word: str) -> dict:
    """Fetch raw etymology from Wiktionary API."""
    url = f"https://en.wiktionary.org/api/rest_v1/page/definition/{word}"
    response = requests.get(url)
    
    if response.status_code != 200:
        raise ValueError(f"Word '{word}' not found in Wiktionary")
    
    data = response.json()
    
    # Extract etymology section
    etymology_raw = ""
    for section in data.get("en", []):
        if "etymology" in section.get("partOfSpeech", "").lower():
            etymology_raw = section.get("definitions", [{}])[0].get("definition", "")
    
    return {
        "word": word,
        "raw_etymology": etymology_raw,
        "definitions": data.get("en", [{}])[0].get("definitions", [])
    }

# Example usage
if __name__ == "__main__":
    word = input("Enter word: ")
    data = fetch_etymology(word)
    
    with open(f"data/raw/{word}.json", "w") as f:
        json.dump(data, f, indent=2)
    
    print(f"✓ Saved to data/raw/{word}.json")
```

---

### Step 2: Transformation (LLM Prompt)

**Script:** `scripts/transform.py`

```python
import os
import json
from anthropic import Anthropic  # or OpenAI

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """
You are an etymology storytelling expert. Your job is to convert raw Wiktionary data into the Rooted JSON schema.

**Your goals:**
1. Decide if this word is best told as a MAP, TREE, TIMELINE, or GRID story.
2. Write a compelling one-sentence hook.
3. Find a surprising fun fact.
4. Structure the visual_data according to the chosen type.

**Rules:**
- Be accurate. If unsure about a date or location, mark it as "circa" or "disputed."
- Be witty but not juvenile. Think New Yorker article, not Reddit comment.
- If the etymology is boring, lean into the comparison grid or timeline.
- Always include coordinates in [lat, lng] format for maps.
- For trees, nest children logically (chronological or by language family).

**Output format:** Valid JSON matching the Rooted schema. No preamble, no markdown fences.
"""

def transform_with_llm(raw_data: dict) -> dict:
    """Send raw etymology to LLM for transformation."""
    user_prompt = f"""
Word: {raw_data["word"]}
Raw Etymology: {raw_data["raw_etymology"]}
Definitions: {json.dumps(raw_data["definitions"], indent=2)}

Generate the content_json for this word. Remember: choose the visualization type that best tells this word's story.
"""
    
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}]
    )
    
    # Parse LLM response as JSON
    content_json = json.loads(response.content[0].text)
    
    return content_json

# Example usage
if __name__ == "__main__":
    word = "sabotage"
    
    with open(f"data/raw/{word}.json", "r") as f:
        raw_data = json.load(f)
    
    transformed = transform_with_llm(raw_data)
    
    with open(f"data/drafts/{word}.json", "w") as f:
        json.dump(transformed, f, indent=2)
    
    print(f"✓ Saved draft to data/drafts/{word}.json")
```

---

### Step 3: Human Review (Admin Dashboard)

**File:** `admin/review.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Rooted Admin - Content Review</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Review Draft Words</h1>
    
    <div id="draft-list" class="space-y-4">
      <!-- Populated by JavaScript -->
    </div>
  </div>

  <script>
    async function loadDrafts() {
      const response = await fetch('/api/admin/drafts');
      const drafts = await response.json();
      
      const container = document.getElementById('draft-list');
      
      drafts.forEach(draft => {
        const card = document.createElement('div');
        card.className = 'bg-white p-6 rounded-lg shadow';
        card.innerHTML = `
          <h2 class="text-2xl font-bold">${draft.word}</h2>
          <p class="text-gray-600 mb-4">${draft.content_json.hook}</p>
          
          <div class="mb-4">
            <strong>Visualization Type:</strong> ${draft.visualization_type}
          </div>
          
          <div class="mb-4">
            <strong>Fun Fact:</strong> ${draft.content_json.fun_fact}
          </div>
          
          <details class="mb-4">
            <summary class="cursor-pointer text-blue-600">View Full JSON</summary>
            <pre class="bg-gray-100 p-4 rounded mt-2 overflow-x-auto">${JSON.stringify(draft.content_json, null, 2)}</pre>
          </details>
          
          <div class="flex gap-4">
            <button onclick="approve('${draft.word}')" class="bg-green-600 text-white px-6 py-2 rounded">
              ✓ Approve
            </button>
            <button onclick="reject('${draft.word}')" class="bg-red-600 text-white px-6 py-2 rounded">
              ✗ Reject
            </button>
            <button onclick="edit('${draft.word}')" class="bg-blue-600 text-white px-6 py-2 rounded">
              ✏️ Edit JSON
            </button>
          </div>
        `;
        container.appendChild(card);
      });
    }
    
    async function approve(word) {
      const publishDate = prompt(`Publish date for "${word}" (YYYY-MM-DD):`);
      if (!publishDate) return;
      
      const response = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, publish_date: publishDate })
      });
      
      if (response.ok) {
        alert(`✓ "${word}" scheduled for ${publishDate}`);
        location.reload();
      } else {
        alert('Error approving word');
      }
    }
    
    async function reject(word) {
      if (!confirm(`Delete draft for "${word}"?`)) return;
      
      await fetch(`/api/admin/drafts/${word}`, { method: 'DELETE' });
      location.reload();
    }
    
    function edit(word) {
      window.location.href = `/admin/edit.html?word=${word}`;
    }
    
    loadDrafts();
  </script>
</body>
</html>
```

**Backend API:** `app/api/admin/approve/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  const { word, publish_date } = await request.json();
  
  // Load draft from filesystem
  const draft = await fetch(`/api/admin/drafts/${word}`).then(r => r.json());
  
  // Insert into database
  await sql`
    INSERT INTO daily_words (
      publish_date, word, definition, phonetic,
      visualization_type, content_json, accent_color,
      approved_by, root_family
    ) VALUES (
      ${publish_date},
      ${draft.word},
      ${draft.definition},
      ${draft.phonetic},
      ${draft.visualization_type},
      ${draft.content_json}::jsonb,
      ${draft.accent_color || '#000000'},
      'jigar',
      ${draft.root_family || null}
    )
  `;
  
  // Delete draft file
  // (Implementation depends on storage - local filesystem or Vercel Blob)
  
  return NextResponse.json({ success: true });
}
```

---

### Step 4: Automated Publishing (Vercel Cron)

**File:** `app/api/cron/rotate/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  // Verify cron secret (security)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Update cache for "today's word"
  const today = new Date().toISOString().split('T')[0];
  
  const result = await sql`
    SELECT * FROM daily_words
    WHERE publish_date = ${today}
    LIMIT 1
  `;
  
  if (result.rows.length === 0) {
    return NextResponse.json({ error: 'No word scheduled for today' }, { status: 404 });
  }
  
  // Cache in Vercel KV (optional, for faster reads)
  // await kv.set('current_word', result.rows[0]);
  
  return NextResponse.json({ success: true, word: result.rows[0].word });
}
```

**Vercel Cron Config:** `vercel.json`

```json
{
  "crons": [{
    "path": "/api/cron/rotate",
    "schedule": "0 0 * * *"
  }]
}
```

---

## 🎨 Design System (Swiss Minimalism meets Google Material)

### Typography Scale

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| **Hero Word** | Playfair Display | 72px (mobile: 48px) | 700 | 1.1 |
| **Phonetic** | Inter | 18px | 400 | 1.5 |
| **Story Card Title** | Inter | 24px | 600 | 1.4 |
| **Story Card Body** | Inter | 16px | 400 | 1.6 |
| **Fun Fact** | Inter | 18px | 500 | 1.5 |
| **Tree Node Labels** | Inter | 14px | 500 | 1.3 |

### Color Palette

**Base:**
- Background: `#F9F9F9` (Off-white)
- Text: `#1A1A1A` (Near-black)
- Muted Text: `#6B7280` (Gray-500)

**Dynamic Accent (Per Word):**
Each word gets an accent color based on its theme:
- **Warning/Conflict words** (e.g., Sabotage): `#DC2626` (Red-600)
- **Nature words** (e.g., Forest): `#059669` (Green-600)
- **Water/Travel words** (e.g., Ocean): `#0284C7` (Blue-600)
- **Food words** (e.g., Coffee): `#92400E` (Amber-800)

**Usage:**
```css
/* Applied to scroll indicator, map routes, tree links */
.accent {
  color: var(--accent-color);
}
```

### Motion Principles

**Speed:**
- **Fast:** UI feedback (button clicks) - 200ms
- **Medium:** Content transitions - 500ms
- **Slow:** Scrollytelling animations - 800-1200ms

**Easing:**
- **Default:** `cubic-bezier(0.4, 0, 0.2, 1)` (Material ease-in-out)
- **Scroll-triggered:** `cubic-bezier(0.16, 1, 0.3, 1)` (Smooth deceleration)

**Rules:**
- No bounce animations (no `spring` physics).
- No rotation beyond 180° (except for card flips).
- Parallax depth is subtle (max 20px offset).

---

## 📝 Implementation Phases (For LLM Consumption)

When feeding this PRD to an LLM, ask it to follow this sequence:

### **Phase 1: Foundation (Week 1)**

**Tasks:**
1. Initialize Next.js 14 with TypeScript, Tailwind, Framer Motion.
2. Set up Vercel Postgres (or local PostgreSQL for dev).
3. Create the `daily_words` table schema.
4. Seed 3 sample words (one MAP, one TREE, one TIMELINE).
5. Build the API route `/api/word/today` that returns today's word.

**Deliverable:** A basic homepage that fetches and displays today's word (no visualization yet).

**Test:**
```bash
curl http://localhost:3000/api/word/today
# Should return JSON with word, definition, content_json
```

---

### **Phase 2: The Visualizer Component (Week 2)**

**Tasks:**
1. Create `components/Visualizer.tsx` with a type switcher:
   ```typescript
   type VisualizerProps = {
     type: 'MAP' | 'TREE' | 'TIMELINE' | 'GRID';
     data: any;
   };
   ```
2. Build **MapVisualizer** (using D3 + TopoJSON):
   - Load world map from TopoJSON.
   - Render static points for now (no animation).
3. Build **TreeVisualizer** (using D3-hierarchy):
   - Render a force-directed graph or dendrogram.
   - Static layout for now.
4. Build **TimelineVisualizer** (pure CSS Grid).
5. Build **GridVisualizer** (Flexbox + language tiles).

**Deliverable:** A page that shows all 4 visualization types side-by-side with mock data.

**Test:**
```bash
# Navigate to /demo/visualizers
# Should see 4 canvases: Map, Tree, Timeline, Grid
```

---

### **Phase 3: Scrollytelling (Week 3)**

**Tasks:**
1. Install Framer Motion: `npm install framer-motion`
2. Implement scroll-triggered state changes:
   ```typescript
   const { scrollYProgress } = useScroll();
   const mapZoom = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 3, 2, 1]);
   ```
3. Create **StoryCard** component that fades in at specific scroll thresholds.
4. Wire up the Visualizer to respond to scroll progress.

**Deliverable:** A single word page with working scrollytelling (e.g., `/word/sabotage`).

**Test:**
```bash
# Scroll through the page
# Map should zoom in/out based on scroll position
# Story cards should fade in sequentially
```

---

### **Phase 4: PWA + Offline (Week 4)**

**Tasks:**
1. Install `next-pwa`: `npm install next-pwa`
2. Configure service worker to cache:
   - Today's word JSON
   - Static assets (fonts, TopoJSON map)
3. Add "Add to Home Screen" prompt (only show once per user).
4. Implement background sync: fetch tomorrow's word at midnight.

**Deliverable:** Installable PWA that works offline.

**Test:**
```bash
# Open Chrome DevTools > Application > Service Workers
# Should see "Rooted Service Worker" active
# Turn off network, refresh page - should still load today's word
```

---

### **Phase 5: Gamification (Week 5)**

**Tasks:**
1. Implement streak tracking (localStorage):
   ```typescript
   const lastVisit = localStorage.getItem('last_visit');
   const today = new Date().toISOString().split('T')[0];
   
   if (lastVisit === yesterday) {
     streak++;
   } else if (lastVisit !== today) {
     streak = 1;
   }
   ```
2. Build milestone modal (appears at 7, 30, 100 days).
3. Generate shareable "knowledge tree" SVG at 30-day milestone.

**Deliverable:** Functional streak system with shareable badges.

**Test:**
```bash
# Visit app daily for 7 days
# Should see "🔥 7 day streak" in header
# On day 7, should see milestone modal
```

---

### **Phase 6: Wordception (Week 6)**

**Tasks:**
1. Add query to find previous words with same root:
   ```sql
   SELECT * FROM daily_words
   WHERE root_family = 'PIE_kaput'
   AND publish_date < CURRENT_DATE
   ORDER BY publish_date DESC LIMIT 1;
   ```
2. Render ghost tree/map overlay with 20% opacity.
3. Add tap interaction: "You explored this root X days ago."

**Deliverable:** If today's word shares a root, show a ghost overlay.

**Test:**
```bash
# Seed two words with same root_family
# Load the second word's page
# Should see faint outline of first word's visualization
```

---

### **Phase 7: Share Feature (Week 7)**

**Tasks:**
1. Build `/api/share/generate` endpoint (server-side Puppeteer or `html2canvas`).
2. Generate 1080×1080 PNG with:
   - Word in large type
   - Hook sentence
   - QR code linking to word page
   - "Rooted • Daily Etymology" footer
3. Store in Vercel Blob (or S3).
4. Return shareable URL.

**Deliverable:** "Share This Word" button generates a downloadable image.

**Test:**
```bash
POST /api/share/generate
{
  "word": "sabotage",
  "hook": "It started with a shoe.",
  "url": "https://rooted.app/word/sabotage"
}

# Should return:
{
  "image_url": "https://blob.vercel-storage.com/abc123.png"
}
```

---

### **Phase 8: Nerd Mode (Week 8)**

**Tasks:**
1. Add toggle in top-right corner: "🤓 Nerd Mode"
2. When enabled, show:
   - Full IPA transcription
   - Disputed etymologies (if any)
   - Wiktionary citations
   - Historical usage examples
3. Unlock at 100-day streak milestone.

**Deliverable:** A hidden layer of detail for linguistics enthusiasts.

**Test:**
```bash
# Toggle Nerd Mode on
# Should see additional sections below Fun Fact
```

---

## 🚨 Edge Cases & Failure Modes

### 1. **No Word Scheduled for Today**

**Scenario:** Jigar forgets to approve a word for tomorrow.

**Fallback:**
- API returns a "classic" word from a pre-seeded evergreen list (e.g., "Serendipity," "Petrichor").
- Show a banner: "⚠️ Today's word is from our archives. New word coming soon!"

**Implementation:**
```typescript
let word = await getWordForDate(today);

if (!word) {
  word = await sql`SELECT * FROM daily_words WHERE is_evergreen = true ORDER BY RANDOM() LIMIT 1`;
}
```

---

### 2. **LLM Generates Invalid JSON**

**Scenario:** GPT-4o returns malformed JSON or wrong schema.

**Mitigation:**
- Validate JSON against a schema (use `ajv` or Zod).
- If invalid, retry with a "repair" prompt:
  ```
  The previous JSON was invalid. Here's the error: {error}
  Please fix it and return valid JSON.
  ```
- After 3 retries, flag for human review.

**Implementation:**
```python
from jsonschema import validate, ValidationError

schema = {...}  # Define Rooted schema

try:
    validate(instance=llm_response, schema=schema)
except ValidationError as e:
    print(f"Validation error: {e}")
    # Retry or flag
```

---

### 3. **User Visits Same Word Twice**

**Scenario:** User refreshes or shares a word link.

**Behavior:**
- On first visit: Full scrollytelling experience.
- On repeat visit: Show a "⏪ Replay" button at the top.
- Clicking "Replay" resets scroll position and animations.

**Implementation:**
```typescript
const hasVisited = sessionStorage.getItem(`visited_${word}`);

if (hasVisited) {
  showReplayButton();
} else {
  sessionStorage.setItem(`visited_${word}`, 'true');
}
```

---

### 4. **Mobile Performance**

**Scenario:** Older Android phones (Snapdragon 6xx series) struggle with SVG animations.

**Optimization:**
- Detect device performance:
  ```typescript
  const isLowEnd = navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4;
  ```
- If low-end, switch from SVG to Canvas rendering.
- Reduce animation FPS from 60 to 30.

**Implementation:**
```typescript
if (isLowEnd) {
  return <CanvasVisualizer data={data} />;
} else {
  return <SVGVisualizer data={data} />;
}
```

---

### 5. **User's Timezone Mismatch**

**Scenario:** User in Tokyo sees "today's word" 12 hours before NYC users.

**Solution:**
- All dates in the database are UTC.
- Frontend converts to user's local timezone:
  ```typescript
  const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in user's timezone
  ```
- Word rotates at midnight **in the user's timezone**, not UTC.

---

## 🎯 Success Metrics (KPIs)

### Product Metrics (Track These)

| Metric | Goal (Month 1) | Goal (Month 3) | Goal (Year 1) |
|--------|----------------|----------------|---------------|
| **Daily Active Users (DAU)** | 100 | 1,000 | 10,000 |
| **7-Day Retention** | 30% | 50% | 60% |
| **30-Day Retention** | 10% | 25% | 40% |
| **Avg. Session Duration** | 2 min | 3 min | 4 min |
| **Share Rate** | 5% | 10% | 15% |
| **PWA Install Rate** | 2% | 5% | 10% |

### Engagement Milestones

- **Week 1:** 10 users reach 7-day streak.
- **Month 1:** First user reaches 30-day streak (knowledge tree unlocked).
- **Month 3:** 100 users have installed the PWA.
- **Year 1:** First user reaches 365-day streak (ultimate linguist badge).

---

## 📚 Appendix: Example Words (Seed Data)

Here are 10 fully-fleshed words to seed the database. These demonstrate all 4 visualization types.

### 1. **Sabotage** (MAP)

```json
{
  "publish_date": "2025-03-01",
  "word": "Sabotage",
  "definition": "Deliberate destruction or obstruction, especially for political or military advantage.",
  "phonetic": "/ˈsæbətɑːʒ/",
  "visualization_type": "MAP",
  "accent_color": "#DC2626",
  "root_family": null,
  "content_json": {
    "hook": "It all started with a wooden shoe.",
    "fun_fact": "French factory workers threw their wooden clogs (*sabots*) into machinery to protest harsh working conditions in the 1800s.",
    "nerd_mode": {
      "ipa_full": "/ˈsæ.bə.tɑːʒ/",
      "earliest_citation": "First recorded in English in 1910 (labor disputes)."
    },
    "visual_data": {
      "type": "MAP",
      "projection": "mercator",
      "points": [
        {
          "order": 1,
          "location_name": "France",
          "coordinates": [46.603354, 1.888334],
          "era": "1800s",
          "context": "The term *sabot* referred to wooden shoes worn by French peasants and workers.",
          "influence_radius_km": 500
        },
        {
          "order": 2,
          "location_name": "Industrial Europe",
          "coordinates": [51.165691, 10.451526],
          "era": "1900s",
          "context": "During the Industrial Revolution, workers across Europe adopted sabotage as a form of protest.",
          "influence_radius_km": 1500
        },
        {
          "order": 3,
          "location_name": "Global",
          "coordinates": [0, 0],
          "era": "1920s - Present",
          "context": "The term spread globally, losing its connection to literal shoes and becoming a metaphor for any deliberate disruption.",
          "influence_radius_km": 5000
        }
      ],
      "routes": [
        {"from": 1, "to": 2, "method": "Labor movements", "duration_years": 50},
        {"from": 2, "to": 3, "method": "World Wars & Cold War espionage", "duration_years": 50}
      ]
    }
  }
}
```

---

### 2. **Captain** (TREE)

```json
{
  "publish_date": "2025-03-02",
  "word": "Captain",
  "definition": "A person in charge of a ship, aircraft, or military unit.",
  "phonetic": "/ˈkæptɪn/",
  "visualization_type": "TREE",
  "accent_color": "#1E40AF",
  "root_family": "PIE_kaput",
  "content_json": {
    "hook": "This word, along with 'cabbage' and 'cape,' all mean 'head.'",
    "fun_fact": "In Latin, *caput* meant 'head,' so a captain is literally the 'head' of a group.",
    "nerd_mode": {
      "ipa_full": "/ˈkæp.tɪn/",
      "disputed_origin": null,
      "earliest_citation": "Middle English *capitain* (1300s), from Old French."
    },
    "visual_data": {
      "type": "TREE",
      "layout": "dendrogram",
      "root": {
        "term": "Caput",
        "language": "Latin",
        "meaning": "Head",
        "era": "Classical Latin (100 BCE)"
      },
      "children": [
        {
          "term": "Captain",
          "language": "English via Old French *capitaine*",
          "meaning": "Chief / Leader ('head' of a group)",
          "era": "1300s",
          "children": [
            {
              "term": "Capitalize",
              "language": "English",
              "meaning": "To write with a capital (head) letter",
              "era": "1700s"
            }
          ]
        },
        {
          "term": "Cape",
          "language": "English via Medieval Latin *cappa*",
          "meaning": "Hooded cloak (covers the head)",
          "era": "1500s"
        },
        {
          "term": "Cabbage",
          "language": "English via Old French *caboche*",
          "meaning": "Head-shaped vegetable",
          "era": "1400s"
        },
        {
          "term": "Decapitate",
          "language": "English via Latin *decapitare*",
          "meaning": "Remove the head",
          "era": "1600s"
        },
        {
          "term": "Per Capita",
          "language": "Latin phrase",
          "meaning": "By heads (per person)",
          "era": "1600s (adopted into English)"
        }
      ]
    }
  }
}
```

---

### 3. **Algorithm** (TIMELINE)

```json
{
  "publish_date": "2025-03-03",
  "word": "Algorithm",
  "definition": "A step-by-step procedure for solving a problem or performing a task, especially by a computer.",
  "phonetic": "/ˈælɡərɪðəm/",
  "visualization_type": "TIMELINE",
  "accent_color": "#7C3AED",
  "root_family": null,
  "content_json": {
    "hook": "This word traveled 1,200 years from Baghdad to Silicon Valley.",
    "fun_fact": "It's named after a 9th-century Persian mathematician whose name was Latinized as *Algoritmi*.",
    "nerd_mode": {
      "ipa_full": "/ˈæl.ɡə.rɪ.ðəm/",
      "disputed_origin": null,
      "earliest_citation": "First appeared in English in the 1690s as *algorism* (arithmetic)."
    },
    "visual_data": {
      "type": "TIMELINE",
      "epochs": [
        {
          "order": 1,
          "era": "800 CE",
          "term": "Al-Khwarizmi",
          "meaning": "Muhammad ibn Musa al-Khwarizmi, a Persian scholar in Baghdad's House of Wisdom, writes *Algoritmi de Numero Indorum* (a treatise on Hindu-Arabic numerals).",
          "usage_example": "His name became synonymous with calculation methods.",
          "sentiment": "neutral"
        },
        {
          "order": 2,
          "era": "1200 CE",
          "term": "Algorismus",
          "meaning": "Latin translations of al-Khwarizmi's work spread through European monasteries. Scholars use *algorismus* to mean 'arithmetic using Arabic numerals.'",
          "usage_example": "Medieval monks taught algorismus as a revolutionary way to calculate.",
          "sentiment": "neutral"
        },
        {
          "order": 3,
          "era": "1800s",
          "term": "Algorithm",
          "meaning": "The term evolves from 'arithmetic' to 'any step-by-step procedure,' especially in mathematics.",
          "usage_example": "Mathematicians describe Euclid's method as an algorithm.",
          "sentiment": "neutral"
        },
        {
          "order": 4,
          "era": "1950s - Present",
          "term": "Algorithm (Computer Science)",
          "meaning": "With the rise of computers, 'algorithm' becomes central to programming. Every app, AI, and database relies on algorithms.",
          "usage_example": "Google's search algorithm determines what you see online.",
          "sentiment": "neutral"
        }
      ]
    }
  }
}
```

---

### 4. **Mother** (GRID)

```json
{
  "publish_date": "2025-03-04",
  "word": "Mother",
  "definition": "A female parent.",
  "phonetic": "/ˈmʌðər/",
  "visualization_type": "GRID",
  "accent_color": "#DB2777",
  "root_family": "PIE_mehter",
  "content_json": {
    "hook": "This word is almost identical in 50+ languages.",
    "fun_fact": "Linguists call these 'mama words'—the easiest sounds for babies to make universally.",
    "nerd_mode": {
      "ipa_full": "/ˈmʌ.ðɚ/",
      "disputed_origin": null,
      "earliest_citation": "Proto-Indo-European *méh₂tēr (reconstructed, ~4500 BCE)."
    },
    "visual_data": {
      "type": "GRID",
      "pattern": "cognate",
      "languages": [
        {
          "name": "Proto-Indo-European",
          "word": "Méh₂tēr",
          "script": "*méh₂tēr",
          "script_type": "Latin",
          "pronunciation": "/méh₂.teːr/"
        },
        {
          "name": "Sanskrit",
          "word": "Mātṛ",
          "script": "मातृ",
          "script_type": "Devanagari",
          "pronunciation": "/maː.tɹ̩/"
        },
        {
          "name": "Latin",
          "word": "Māter",
          "script": "MĀTER",
          "script_type": "Latin",
          "pronunciation": "/ˈmaː.ter/"
        },
        {
          "name": "Greek",
          "word": "Mḗtēr",
          "script": "μήτηρ",
          "script_type": "Greek",
          "pronunciation": "/mɛ́ː.tɛːr/"
        },
        {
          "name": "Old English",
          "word": "Mōdor",
          "script": "MŌDOR",
          "script_type": "Latin",
          "pronunciation": "/ˈmoː.dor/"
        },
        {
          "name": "Persian",
          "word": "Mādar",
          "script": "مادر",
          "script_type": "Arabic",
          "pronunciation": "/mɒː.dær/"
        },
        {
          "name": "Russian",
          "word": "Mat'",
          "script": "мать",
          "script_type": "Cyrillic",
          "pronunciation": "/matʲ/"
        },
        {
          "name": "Irish",
          "word": "Máthair",
          "script": "MÁTHAIR",
          "script_type": "Latin",
          "pronunciation": "/ˈmɑː.hɪɾʲ/"
        },
        {
          "name": "Hindi",
          "word": "Mātā",
          "script": "माता",
          "script_type": "Devanagari",
          "pronunciation": "/mɑː.t̪ɑː/"
        }
      ]
    }
  }
}
```

---

*(Include 6 more words: Coffee (MAP), Muscle (TREE), Awful (TIMELINE), Hello (GRID), Sheriff (MAP), Breakfast (TREE). Omitted here for brevity but follow the same structure.)*

---

## 🚀 Final Notes for LLM Implementation

### What Makes This Project Unique

1. **Adaptive Storytelling:** Not every word is forced into the same template. The visualization *serves* the story.
2. **Daily Cadence:** Creates a Wordle-like habit loop without the stress of "losing."
3. **Offline-First:** PWA architecture ensures zero latency, even on slow networks.
4. **Gamification with Purpose:** Streaks and badges motivate learning, not just engagement.
5. **Human-AI Collaboration:** LLM generates drafts, human curator ensures quality.

### Technical Challenges to Anticipate

1. **D3 Learning Curve:** Tree and map layouts require understanding of SVG transforms.
   - **Mitigation:** Use React-Simple-Maps as a wrapper to abstract complexity.
2. **Mobile Performance:** Old phones struggle with SVG animations.
   - **Mitigation:** Canvas rendering fallback for low-end devices.
3. **Content Quality:** LLMs occasionally hallucinate facts.
   - **Mitigation:** Always include citations in `nerd_mode` for fact-checking.

### How to Use This Document

1. **Feed to LLM:** Copy Phases 1-8 into a prompt. Ask it to generate code for one phase at a time.
2. **Human Review Points:**
   - After Phase 2: Test all 4 visualization types with mock data.
   - After Phase 4: Test PWA installation on iOS and Android.
   - After Phase 7: Generate a share card and verify QR code works.
3. **Iteration:** This is v2.0. Expect to refine visualizations based on user feedback.

---

## 🎯 Vision for Year 2

If this succeeds, here are potential features for v3.0:

1. **User-Submitted Words:** Let users nominate words for review.
2. **Audio Pronunciation:** Partner with Forvo or use ElevenLabs TTS.
3. **Dark Mode:** A moody, sepia-toned theme for night readers.
4. **Language Variants:** Spanish, French, Mandarin editions.
5. **Educator Mode:** Teachers can assign "Word of the Week" to students.
6. **API for Developers:** Let others build etymology widgets.

---

**End of Document.**

This is your complete blueprint. Everything an LLM needs to build Rooted from scratch is here. Good luck, Jigar! 🌱

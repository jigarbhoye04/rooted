# 01 - System Architecture

**Project:** Rooted - Daily Etymology App  
**Last Updated:** 2025-02-07  
**Status:** Foundation Phase  
**Source:** Distilled from `rooted_master_prd_v2.md`

---

## 🎯 What We're Building

A daily web app that presents **one word per day** with an interactive visualization of its etymology. Think "Wordle meets National Geographic" for language nerds.

**Core Differentiator:** Adaptive visualization engine that chooses the best visual format (Map, Tree, Timeline, or Grid) based on each word's unique story.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Visualization:** D3.js v7 + TopoJSON-Client

### Backend
- **Database:** Vercel Postgres (Neon serverless)
- **API:** Next.js API Routes (serverless functions)
- **Cron:** Vercel Cron (daily word rotation)

### Progressive Web App
- **Service Worker:** Next-PWA plugin
- **Caching:** Pre-fetch tomorrow's word at midnight
- **Offline:** Full offline support for current word

### Content Pipeline
- **Scraper:** Python 3.11+ (Wiktionary API)
- **LLM:** Google Gemini 2.0 Flash or GPT-4o
- **Admin:** Simple HTML dashboard for human review

---

## 📊 Database Schema

### Table: `daily_words`

```sql
CREATE TABLE daily_words (
  id SERIAL PRIMARY KEY,
  publish_date DATE UNIQUE NOT NULL,
  word VARCHAR(100) NOT NULL,
  definition TEXT NOT NULL,
  phonetic VARCHAR(100),
  pronunciation_audio_url TEXT,
  
  -- Visualization type: MAP, TREE, TIMELINE, or GRID
  visualization_type VARCHAR(10) CHECK (
    visualization_type IN ('MAP', 'TREE', 'TIMELINE', 'GRID')
  ),
  
  -- Core data (JSONB for flexibility)
  content_json JSONB NOT NULL,
  
  -- Metadata
  accent_color CHAR(7) DEFAULT '#000000',
  created_at TIMESTAMP DEFAULT NOW(),
  approved_by VARCHAR(50),
  
  -- For Wordception feature (shared root tracking)
  root_family VARCHAR(50),
  
  CONSTRAINT valid_color CHECK (accent_color ~ '^#[0-9A-Fa-f]{6}$')
);

-- Indexes
CREATE INDEX idx_publish_date ON daily_words(publish_date);
CREATE INDEX idx_root_family ON daily_words(root_family) 
  WHERE root_family IS NOT NULL;
```

### JSONB Schema (`content_json` structure)

**Base fields (all types):**
```json
{
  "hook": "One-sentence teaser",
  "fun_fact": "Did you know section",
  "nerd_mode": {
    "ipa_full": "Full IPA transcription",
    "disputed_origin": "Optional controversy note",
    "earliest_citation": "OED citation"
  },
  "visual_data": { /* Type-specific structure */ }
}
```

**For MAP type:**
```json
{
  "type": "MAP",
  "projection": "orthographic",
  "points": [
    {
      "order": 1,
      "location_name": "Ethiopia",
      "coordinates": [9.145, 40.489],
      "era": "800 CE",
      "context": "Story text",
      "influence_radius_km": 500
    }
  ],
  "routes": [
    {
      "from": 1,
      "to": 2,
      "method": "Trade routes",
      "duration_years": 400
    }
  ]
}
```

**For TREE type:**
```json
{
  "type": "TREE",
  "layout": "radial",
  "root": {
    "term": "Caput",
    "language": "Latin",
    "meaning": "Head",
    "era": "100 BCE"
  },
  "children": [
    {
      "term": "Captain",
      "language": "English",
      "meaning": "Leader",
      "era": "1300s",
      "children": [...]
    }
  ]
}
```

**For TIMELINE type:**
```json
{
  "type": "TIMELINE",
  "epochs": [
    {
      "order": 1,
      "era": "800 CE",
      "term": "Algoritmi",
      "meaning": "...",
      "usage_example": "...",
      "sentiment": "neutral"
    }
  ]
}
```

**For GRID type:**
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

---

## 🗺 File Structure

```
rooted/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API Routes
│   │   ├── word/
│   │   │   └── today/
│   │   │       └── route.ts      # GET today's word
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts      # POST login
│   │   │   └── logout/
│   │   │       └── route.ts      # POST logout
│   │   ├── admin/
│   │   │   ├── approve/
│   │   │   │   └── route.ts      # POST approve draft
│   │   │   └── drafts/
│   │   │       └── route.ts      # GET list drafts
│   │   ├── share/
│   │   │   └── generate/
│   │   │       └── route.ts      # POST generate share card
│   │   └── cron/
│   │       └── rotate/
│   │           └── route.ts      # GET daily word rotation
│   │
│   ├── word/
│   │   └── [slug]/
│   │       └── page.tsx          # Individual word page
│   │
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage (today's word)
│   └── globals.css               # Tailwind imports
│
├── src/
│   ├── components/               # React components
│   │   ├── Visualizer.tsx        # Main visualizer (type switcher)
│   │   ├── MapVisualizer.tsx     # Geographic map viz
│   │   ├── TreeVisualizer.tsx    # Etymology tree viz
│   │   ├── TimelineVisualizer.tsx # Timeline viz
│   │   ├── GridVisualizer.tsx    # Comparison grid viz
│   │   ├── StoryCard.tsx         # Scrollytelling cards
│   │   ├── StreakCounter.tsx     # Gamification
│   │   └── ShareButton.tsx       # Share card generator
│   │
│   ├── schemas/                  # Zod validation schemas
│   │   ├── dailyWord.ts          # DailyWord schema
│   │   ├── visualizerData.ts     # MAP/TREE/TIMELINE/GRID schemas
│   │   ├── apiResponses.ts       # API response schemas
│   │   └── index.ts              # Re-exports
│   │
│   ├── lib/                      # Utilities
│   │   ├── security.ts           # Auth helpers, JWT validation
│   │   ├── validators.ts         # Custom Zod validators
│   │   └── db.ts                 # Database helpers
│   │
│   └── types/                    # TypeScript types
│       └── index.ts              # Global types
│
├── scripts/                      # Automation scripts
│   ├── ingest.py                 # Wiktionary scraper
│   ├── transform.py              # LLM transformation
│   ├── security-check.sh         # Security audit
│   ├── code-review.sh            # Code review helper
│   └── sync-progress.sh          # Auto-update progress.md
│
├── public/                       # Static assets
│   ├── topojson/
│   │   └── world-110m.json       # Lightweight world map
│   └── fonts/                    # Playfair Display, Inter
│
├── docs/
│   └── context/                  # Living documentation
│       ├── 01_architecture.md    # This file
│       ├── 02_progress.md        # Task checklist
│       ├── 03_decisions.md       # ADRs
│       └── 04_schema_contracts.md # All Zod schemas
│
├── .github/
│   └── copilot-instructions.md   # Copilot agent rules
│
├── RULES.md                      # Engineering rules
├── current_task.md               # Current micro-task
├── rooted_master_prd_v2.md       # Full product spec
└── package.json
```

---

## 🔐 Security Model

### Authentication
- **Admin only:** JWT tokens (httpOnly cookies)
- **Users:** No auth required (public read access)

### Authorization
- **Public routes:** `/`, `/word/[slug]`, `/api/word/today`
- **Protected routes:** `/api/admin/*` (requires valid JWT)

### Data Validation
- **All API inputs:** Validated with Zod schemas
- **All database outputs:** Validated with Zod schemas
- **All component props:** Validated with Zod schemas (dev mode)

### SQL Injection Prevention
- **Required:** Parameterized queries using `sql` tagged template
- **Forbidden:** String concatenation in SQL

### XSS Prevention
- **React default:** JSX escapes by default
- **Dangerous HTML:** Never use `dangerouslySetInnerHTML` with user content
- **Sanitization:** User-generated content (if any) sanitized with DOMPurify

---

## 🎨 Design System

### Typography
- **Headings:** Playfair Display (serif, variable weight)
- **Body:** Inter (sans-serif)
- **Sizes:** 16px base, 1.5 line height

### Colors
- **Background:** `#F9F9F9` (off-white)
- **Text:** `#1A1A1A` (near-black)
- **Muted:** `#6B7280` (gray-500)
- **Accent:** Dynamic per word (stored in `accent_color` field)

### Animation
- **Speed:** 800-1200ms for scrollytelling
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (smooth deceleration)
- **Principle:** No bounce, no rotation >180°

---

## 🔄 Data Flow

### User Visits Homepage
```
1. Browser requests /
2. Next.js SSR renders page
3. Client calls /api/word/today
4. API queries database for today's date
5. API validates with DailyWordSchema
6. API returns JSON
7. Client renders Visualizer component
8. User scrolls → Framer Motion triggers animations
```

### Daily Word Rotation (Automated)
```
1. Vercel Cron triggers /api/cron/rotate at midnight UTC
2. API updates cache for "current word"
3. Next morning, users see new word
```

### Content Pipeline (Manual + Automated)
```
1. [Python] Scrape Wiktionary for word etymology
2. [LLM] Transform raw data into Rooted JSON schema
3. [Human] Review draft in admin dashboard
4. [Human] Approve → Insert into daily_words table
5. [Vercel Cron] Publish on scheduled date
```

---

## 📏 Constraints

### Performance
- **Initial Load:** < 2s on 3G
- **Time to Interactive:** < 3s
- **Lighthouse Score:** > 90 (Performance, Accessibility)

### Browser Support
- **Modern:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile:** iOS Safari 14+, Chrome Android 90+

### Data Limits
- **Database:** Vercel Postgres free tier (256 MB)
- **Blob Storage:** Vercel Blob free tier (100 GB)
- **Function Execution:** 10s timeout (Vercel free tier)

---

## 🧪 Testing Strategy

### Unit Tests
- **All Zod schemas:** Test valid/invalid inputs
- **All utility functions:** Test edge cases

### Integration Tests
- **All API routes:** Test 200, 404, 500 responses
- **All components:** Test rendering with valid/invalid props

### E2E Tests (Future)
- **Critical path:** Homepage → Scroll → Share
- **PWA:** Install → Offline → Reload

---

## 🚀 Deployment

### Environments
- **Development:** Local (`npm run dev`)
- **Preview:** Vercel preview deploys (PR-based)
- **Production:** Vercel production (`main` branch)

### CI/CD Pipeline
```
1. Push to GitHub
2. Vercel builds Next.js app
3. Run type checks (`tsc --noEmit`)
4. Run security checks (`./scripts/security-check.sh`)
5. Run tests (`npm test`)
6. Deploy if all pass
```

---

## 📖 Key Concepts

### Visualization Decision Logic
```
Is word tied to geographic journey?
  YES → MAP
  NO → Did meaning shift over time?
    YES → TREE
    NO → Clear temporal epochs?
      YES → TIMELINE
      NO → GRID (cross-linguistic comparison)
```

### Scrollytelling Pattern
```
1. Hero section (100vh): Word + phonetic
2. Visualization section (sticky): 
   - Visual canvas (center, fixed position)
   - Story cards (scroll over canvas)
   - Scroll progress → Trigger animations
3. Fun fact section (100vh): Did you know + share button
4. Footer: Wordception ghost overlay (if applicable)
```

### Gamification Loop
```
1. Track visits with localStorage
2. Calculate streak (consecutive days)
3. Show milestones:
   - 7 days → Modal
   - 30 days → Knowledge tree badge
   - 100 days → Nerd mode unlocked
4. Generate shareable images
```

---

## 🎯 Success Criteria

### Phase 1: Foundation (Week 1-2)
- [ ] Database schema created
- [ ] `/api/word/today` endpoint working
- [ ] 3 sample words seeded

### Phase 2: Visualizers (Week 3-4)
- [ ] MAP visualizer renders static
- [ ] TREE visualizer renders static
- [ ] TIMELINE visualizer renders
- [ ] GRID visualizer renders

### Phase 3: Scrollytelling (Week 5-6)
- [ ] Scroll-triggered animations working
- [ ] Story cards fade in sequentially
- [ ] Mobile performance > 60 FPS

### Phase 4: PWA (Week 7)
- [ ] Service worker caching
- [ ] Offline mode working
- [ ] Install prompt appears

### Phase 5: Gamification (Week 8)
- [ ] Streak tracking working
- [ ] Milestone modals appear
- [ ] Share cards generate correctly

---

## 📚 References

- **Full PRD:** `rooted_master_prd_v2.md`
- **API Documentation:** `docs/context/04_schema_contracts.md`
- **Progress Tracking:** `docs/context/02_progress.md`
- **Design Decisions:** `docs/context/03_decisions.md`

---

**Last Updated:** 2025-02-07  
**Next Review:** After Phase 1 completion

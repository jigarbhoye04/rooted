# 02 - Progress Tracker

**Project:** Rooted  
**Last Updated: 2026-02-08
**Current Phase:** Phase 0 - Setup

---

## 📊 Overall Progress

```
Phase 0: Setup               [██████████] 100% ✅
Phase 1: Foundation          [░░░░░░░░░░]   0%
Phase 2: Visualizers         [░░░░░░░░░░]   0%
Phase 3: Scrollytelling      [░░░░░░░░░░]   0%
Phase 4: PWA                 [░░░░░░░░░░]   0%
Phase 5: Gamification        [░░░░░░░░░░]   0%
Phase 6: Wordception         [░░░░░░░░░░]   0%
Phase 7: Share Feature       [░░░░░░░░░░]   0%
Phase 8: Nerd Mode           [░░░░░░░░░░]   0%
```

**Overall:** 12.5% (1/8 phases complete)

---

## ✅ Phase 0: Setup (Week 0)

**Goal:** Initialize project with proper orchestration system.

### Environment Setup
- [x] Create Next.js 16 project with TypeScript
- [x] Install dependencies (Tailwind, Framer Motion, Zod, D3)
- [x] Configure Vercel Postgres (local dev)
- [x] Set up folder structure (`docs/context`, `src/schemas`, etc.)

### Documentation
- [x] Create `docs/context/01_architecture.md`
- [x] Create `docs/context/02_progress.md` (this file)
- [x] Create `docs/context/03_decisions.md`
- [x] Create `docs/context/04_schema_contracts.md`
- [x] Create `.github/copilot-instructions.md`
- [x] Create `RULES.md`
- [x] Create `current_task.md` template

### Scripts
- [x] Create `scripts/security-check.sh`
- [x] Create `scripts/code-review.sh`
- [x] Create `scripts/sync-progress.sh`

### Developer Onboarding
- [x] Create comprehensive developer guide

**Status:** ✅ Complete (2025-02-07)

---

## 🔲 Phase 1: Foundation (Week 1-2)

**Goal:** Database + API basics working.

### Database
- [x] Create `daily_words` table in Neon Postgres
- [x] Create indexes (`idx_publish_date`, `idx_root_family`)
- [x] Seed 3 sample words (one each: MAP, TREE, TIMELINE)
- [x] Verify schema with Neon SQL Editor

### API Routes
  - [x] Implement `/api/word/today` (GET)
    - [x] Query database for today's date
    - [x] Validate with `DailyWordSchema`
    - [x] Return 404 if no word found
    - [x] Return 500 on schema validation failure
  - [x] Implement `/api/word/[slug]` (GET)
    - [x] Query by word slug
    - [x] Same validation as `/today`
  - [x] Write integration tests for API routes

### Schemas
- [x] Create `src/schemas/dailyWord.ts`
  - [x] Define `DailyWordSchema`
  - [x] Export TypeScript type
  - [x] Write unit tests (valid/invalid inputs)
- [x] Create `src/schemas/apiResponses.ts`
  - [x] Define error response schema
  - [x] Define success response schema

### Basic UI
- [x] Create `app/page.tsx` (homepage)
  - [x] Fetch from `/api/word/today`
  - [x] Display word + definition (no viz yet)
  - [x] Handle loading state
  - [x] Handle error state (404, 500)
- [x] Create `app/layout.tsx`
  - [x] Import global styles
  - [x] Set up fonts (Playfair Display, Inter)
  - [x] Add meta tags

### Testing
- [x] Set up testing framework (Vitest)
- [x] Write unit tests for schemas
- [x] Write integration tests for API routes
- [x] Reach 80%+ coverage on core logicng

**Estimated Duration:** 5-7 days  
**Started:** TBD  
**Completed:** TBD

---

## 🔲 Phase 2: Visualizers (Week 3-4)

**Goal:** All 4 visualization types render (static, no animations yet).

### Schemas
- [ ] Create `src/schemas/visualizerData.ts`
  - [ ] Define `MapVisualizationDataSchema`
  - [ ] Define `TreeVisualizationDataSchema`
  - [ ] Define `TimelineVisualizationDataSchema`
  - [ ] Define `GridVisualizationDataSchema`
  - [ ] Write tests for each

### Components
- [ ] Create `src/components/Visualizer.tsx` (type switcher)
  - [ ] Accept `type` and `data` props
  - [ ] Render correct sub-component based on type
  - [ ] Validate props with Zod
  - [ ] Write tests

#### MapVisualizer
- [ ] Create `src/components/MapVisualizer.tsx`
  - [ ] Load TopoJSON world map
  - [ ] Render map with D3/react-simple-maps
  - [ ] Plot points from `visual_data.points`
  - [ ] Static rendering (no animations)
  - [ ] Write tests

#### TreeVisualizer
- [ ] Create `src/components/TreeVisualizer.tsx`
  - [ ] Use D3 tree layout (dendrogram or radial)
  - [ ] Render nodes from `visual_data.root` and `children`
  - [ ] Static rendering
  - [ ] Write tests

#### TimelineVisualizer
- [ ] Create `src/components/TimelineVisualizer.tsx`
  - [ ] Horizontal timeline with CSS Grid
  - [ ] Render epochs from `visual_data.epochs`
  - [ ] Static cards (no scroll trigger yet)
  - [ ] Write tests

#### GridVisualizer
- [ ] Create `src/components/GridVisualizer.tsx`
  - [ ] 3x3 grid with Flexbox
  - [ ] Render languages from `visual_data.languages`
  - [ ] Show script in correct font
  - [ ] Write tests

### Demo Page
- [ ] Create `app/demo/page.tsx`
  - [ ] Show all 4 visualizers side-by-side
  - [ ] Use mock data for each type
  - [ ] Use for manual testing

**Estimated Duration:** 7-10 days  
**Started:** TBD  
**Completed:** TBD

---

## 🔲 Phase 3: Scrollytelling (Week 5-6)

**Goal:** Scroll-triggered animations working on individual word pages.

### Scroll Mechanics
- [ ] Install Framer Motion (if not already installed)
- [ ] Create `src/hooks/useScrollProgress.ts`
  - [ ] Wrap Framer Motion's `useScroll`
  - [ ] Map scroll % to visualization states
  - [ ] Export `scrollYProgress` value

### Word Page
- [ ] Create `app/word/[slug]/page.tsx`
  - [ ] Fetch word data from `/api/word/[slug]`
  - [ ] Section 1: Hero (word + phonetic)
  - [ ] Section 2: Sticky visualizer + scrolling story cards
  - [ ] Section 3: Fun fact + share button
  - [ ] Wire up scroll progress to visualizer

### Story Cards
- [ ] Create `src/components/StoryCard.tsx`
  - [ ] Fade in based on scroll threshold
  - [ ] Accept `content` and `threshold` props
  - [ ] Use Framer Motion's `useInView`
  - [ ] Write tests

### Visualizer Animations
- [ ] Update `MapVisualizer` with scroll triggers
  - [ ] Zoom to points based on scroll progress
  - [ ] Animate bezier curves between points
  - [ ] Show influence zones expanding
- [ ] Update `TreeVisualizer` with scroll triggers
  - [ ] Nodes appear with stagger animation
  - [ ] Highlight path from root to modern word
- [ ] Update `TimelineVisualizer` with scroll triggers
  - [ ] Cards slide in from right as you scroll
- [ ] Update `GridVisualizer` with scroll triggers
  - [ ] Tiles flip to reveal words

### Performance
- [ ] Test on mid-tier Android device
- [ ] Ensure > 60 FPS during scroll
- [ ] If laggy, implement Canvas fallback for low-end devices

**Estimated Duration:** 7-10 days  
**Started:** TBD  
**Completed:** TBD

---

## 🔲 Phase 4: PWA (Week 7)

**Goal:** Installable progressive web app with offline support.

### PWA Setup
- [ ] Install `next-pwa` plugin
- [ ] Configure `next.config.js` for PWA
- [ ] Generate `manifest.json`
  - [ ] App name, icons, theme color
  - [ ] Display mode: standalone
- [ ] Create app icons (512x512, 192x192)

### Service Worker
- [ ] Configure service worker to cache:
  - [ ] Static assets (JS, CSS, fonts)
  - [ ] Today's word JSON
  - [ ] TopoJSON map data
- [ ] Implement background sync
  - [ ] Fetch tomorrow's word at midnight
  - [ ] Store in IndexedDB or Cache API

### Offline Mode
- [ ] Test offline functionality
  - [ ] Turn off network in DevTools
  - [ ] Verify today's word still loads
  - [ ] Verify visualizer still renders
- [ ] Add offline indicator UI (if network lost)

### Install Prompt
- [ ] Detect if app is installable
- [ ] Show "Add to Home Screen" banner (once per user)
- [ ] Track install events with analytics

**Estimated Duration:** 4-5 days  
**Started:** TBD  
**Completed:** TBD

---

## 🔲 Phase 5: Gamification (Week 8)

**Goal:** Streak tracking, milestones, and shareable badges.

### Streak System
- [ ] Create `src/lib/streak.ts`
  - [ ] Track last visit date in localStorage
  - [ ] Calculate current streak
  - [ ] Reset if > 1 day gap
  - [ ] Export `getStreak()` and `updateStreak()`

### UI Components
- [ ] Create `src/components/StreakCounter.tsx`
  - [ ] Display "🔥 X day streak" in header
  - [ ] Animate on streak increase
  - [ ] Write tests

### Milestones
- [ ] Create `src/components/MilestoneModal.tsx`
  - [ ] Show at 7, 30, 100 days
  - [ ] Celebrate with animation
  - [ ] Offer share option
  - [ ] Write tests

### Knowledge Tree Badge
- [ ] Create API route `/api/user/knowledge-tree`
  - [ ] Query all words user has seen (from localStorage)
  - [ ] Generate SVG showing root families
  - [ ] Return as downloadable image
- [ ] Trigger at 30-day milestone

**Estimated Duration:** 5-7 days  
**Started:** TBD  
**Completed:** TBD

---

## 🔲 Phase 6: Wordception (Week 9)

**Goal:** Ghost overlays for words sharing the same root.

### Database Query
- [ ] Update `/api/word/[slug]` to include:
  - [ ] Query for previous words with same `root_family`
  - [ ] Return as `related_words` field
  - [ ] Limit to 1 most recent

### UI Component
- [ ] Create `src/components/GhostOverlay.tsx`
  - [ ] Render previous word's viz with 20% opacity
  - [ ] Layer behind current viz
  - [ ] Add tap interaction: "You explored this X days ago"
  - [ ] Link to previous word

### Integration
- [ ] Update `Visualizer.tsx` to accept `ghostData` prop
- [ ] Render ghost overlay if `related_words` exists
- [ ] Test with words sharing same root (e.g., Captain + Decapitate)

**Estimated Duration:** 3-4 days  
**Started:** TBD  
**Completed:** TBD

---

## 🔲 Phase 7: Share Feature (Week 10)

**Goal:** Auto-generate shareable quote cards with QR codes.

### API Route
- [ ] Create `/api/share/generate`
  - [ ] Accept `word`, `hook`, `url` as input
  - [ ] Generate 1080x1080 PNG with:
    - [ ] Word in large Playfair Display
    - [ ] Hook sentence
    - [ ] QR code linking to word page
    - [ ] "Rooted • Daily Etymology" footer
  - [ ] Use Puppeteer or `html2canvas`
  - [ ] Store in Vercel Blob
  - [ ] Return image URL

### UI Component
- [ ] Create `src/components/ShareButton.tsx`
  - [ ] "Share This Word" button
  - [ ] On click → call `/api/share/generate`
  - [ ] Show loading spinner
  - [ ] Download or copy image URL
  - [ ] Write tests

### Integration
- [ ] Add ShareButton to fun fact section
- [ ] Test image generation on mobile + desktop

**Estimated Duration:** 4-5 days  
**Started:** TBD  
**Completed:** TBD

---

## 🔲 Phase 8: Nerd Mode (Week 11)

**Goal:** Unlockable deep dive for linguistics enthusiasts.

### UI Toggle
- [ ] Add "🤓 Nerd Mode" toggle in top-right corner
- [ ] Only visible if user has 100+ day streak
- [ ] Toggle state stored in localStorage

### Additional Content
- [ ] Update word page to show when Nerd Mode active:
  - [ ] Full IPA transcription (`nerd_mode.ipa_full`)
  - [ ] Disputed etymologies (`nerd_mode.disputed_origin`)
  - [ ] Earliest citations (`nerd_mode.earliest_citation`)
  - [ ] Link to Wiktionary source

### Styling
- [ ] Nerd Mode section has subtle border
- [ ] Use monospace font for IPA
- [ ] Add "Expert Level" badge next to content

**Estimated Duration:** 2-3 days  
**Started:** TBD  
**Completed:** TBD

---

## 🚀 Post-Launch (Beyond Week 11)

### Content Pipeline
- [ ] Create Python script `scripts/ingest.py`
- [ ] Create Python script `scripts/transform.py`
- [ ] Create admin dashboard `admin/review.html`
- [ ] Set up Vercel Cron for daily rotation

### Performance Optimization
- [ ] Lighthouse audit (target > 90 score)
- [ ] Optimize images (WebP format)
- [ ] Code splitting for visualizers
- [ ] Lazy load non-critical components

### Analytics (Optional)
- [ ] Add privacy-friendly analytics (Plausible or Vercel Analytics)
- [ ] Track: DAU, streak milestones, share rate
- [ ] Never track PII

### Accessibility
- [ ] Keyboard navigation for all interactions
- [ ] Screen reader labels for visualizations
- [ ] ARIA attributes for dynamic content
- [ ] Color contrast check (WCAG AA)

---

## 📝 How to Update This File

After completing a task:

1. **Mark as complete:** Change `[ ]` to `[x]`
2. **Update progress bar:** Recalculate percentage
3. **Add completion date:** Note when task was finished
4. **Commit:** Run `./scripts/sync-progress.sh` to auto-commit

**Example:**
```bash
# After completing /api/word/today
# 1. Edit this file manually OR run:
./scripts/sync-progress.sh "Completed /api/word/today endpoint"

# 2. Script auto-updates progress percentages
# 3. Script auto-commits to git
```

---

## 🎯 Current Focus

**Current Task:** See `current_task.md`  
**Next Task:** TBD (will be defined after current task completes)

---

**Last Updated: 2026-02-08
**Next Review:** After each phase completion

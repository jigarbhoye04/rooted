# 03 - Architecture Decision Records (ADRs)

**Project:** Rooted  
**Purpose:** Log all significant architectural and design decisions with rationale.

---

## How to Use This File

When you make a decision that affects the architecture, add an entry here using this template:

```markdown
## ADR-XXX: [Decision Title]

**Date:** YYYY-MM-DD  
**Status:** Proposed | Accepted | Rejected | Superseded  
**Decider:** [Your name or "Team"]

### Context
What is the issue we're trying to solve? What are the constraints?

### Decision
What did we decide to do?

### Consequences
What are the positive and negative outcomes of this decision?

### Alternatives Considered
What other options did we evaluate? Why were they rejected?
```

---

## ADR-001: Use Next.js 16 App Router (Not Pages Router)

**Date:** 2025-02-07  
**Status:** Accepted  
**Decider:** Jigar

### Context
Next.js offers two routing systems:
- **Pages Router** (legacy, stable, widely documented)
- **App Router** (new in v13+, React Server Components, better performance)

We need to choose one for the entire project. Mixing both is not recommended.

### Decision
Use **App Router** exclusively.

### Consequences
**Positive:**
- Better performance (React Server Components reduce client bundle)
- Built-in streaming and Suspense support
- Cleaner data fetching patterns (no `getServerSideProps`)
- Future-proof (Next.js is focusing development here)

**Negative:**
- Less Stack Overflow content (newer, fewer tutorials)
- Some third-party libraries may have compatibility issues
- Learning curve for developers familiar with Pages Router

### Alternatives Considered
- **Pages Router:** Rejected because it's being deprecated in favor of App Router.
- **Remix:** Rejected because Next.js + Vercel integration is simpler for solo dev.

---

## ADR-002: Use Vercel Postgres (Not Supabase)

**Date:** 2025-02-07  
**Status:** ~~Accepted~~ → Superseded by ADR-009  
**Decider:** Jigar

### Context
Need a serverless PostgreSQL database. Options:
- **Vercel Postgres** (Neon under the hood, tight Vercel integration)
- **Supabase** (more features: auth, storage, realtime)
- **PlanetScale** (MySQL, not Postgres)

### Decision
Use **Vercel Postgres**.

### Consequences
**Positive:**
- Seamless Vercel integration (same dashboard, same CLI)
- No extra auth setup (can use Vercel's built-in auth if needed)
- Free tier is sufficient for MVP (256 MB storage)
- Uses standard PostgreSQL (no vendor lock-in syntax)

**Negative:**
- Less feature-rich than Supabase (no built-in auth, storage, realtime)
- Smaller community than Supabase

### Alternatives Considered
- **Supabase:** Rejected because we don't need auth/storage/realtime features yet. If we scale, we can migrate later.
- **PlanetScale:** Rejected because it's MySQL, and our schema uses PostgreSQL-specific features (JSONB).

---

## ADR-003: Use Zod for All Validation (Not JSON Schema or Yup)

**Date:** 2025-02-07  
**Status:** Accepted  
**Decider:** Jigar

### Context
Need runtime validation for:
- API request/response bodies
- Database query results
- React component props

Options:
- **Zod** (TypeScript-first, infers types)
- **Yup** (older, more popular in form validation)
- **JSON Schema** (standard, but verbose)

### Decision
Use **Zod** for all validation.

### Consequences
**Positive:**
- Type inference: `z.infer<typeof Schema>` generates TypeScript types
- Single source of truth (schema defines both runtime + compile-time types)
- Excellent error messages
- Works seamlessly with Next.js API routes

**Negative:**
- Smaller ecosystem than Yup
- Slightly larger bundle size than JSON Schema

### Alternatives Considered
- **Yup:** Rejected because it doesn't infer TypeScript types as cleanly.
- **JSON Schema:** Rejected because it's too verbose and doesn't integrate well with TypeScript.

---

## ADR-004: Use D3.js for Visualizations (Not Chart.js or Recharts)

**Date:** 2025-02-07  
**Status:** Accepted  
**Decider:** Jigar

### Context
Need to create custom visualizations:
- Interactive world map with custom projections
- Force-directed etymology tree
- Timeline with custom animations

Options:
- **D3.js** (low-level, maximum flexibility)
- **Chart.js** (simple, but limited customization)
- **Recharts** (React wrapper, declarative, but less control)

### Decision
Use **D3.js** for core visualization logic.

### Consequences
**Positive:**
- Total control over rendering (SVG or Canvas)
- Can create unique, custom visualizations (not generic charts)
- Large community and documentation

**Negative:**
- Steep learning curve (especially for tree layouts and geo projections)
- More code to write compared to high-level libraries
- Requires understanding of SVG transforms and D3 scales

### Alternatives Considered
- **Chart.js:** Rejected because it's designed for standard charts (bar, line, pie), not custom maps or trees.
- **Recharts:** Rejected because it's a React wrapper around D3 but limits access to low-level APIs we need.

---

## ADR-005: Store Etymology Data as JSONB (Not Normalized Tables)

**Date:** 2025-02-07  
**Status:** Accepted  
**Decider:** Jigar

### Context
Etymology data is complex and varies by word:
- MAP words have points, routes, influence zones
- TREE words have nested children with arbitrary depth
- TIMELINE words have epochs
- GRID words have language arrays

Options:
- **JSONB field** (flexible, schemaless)
- **Normalized tables** (separate tables for points, routes, nodes, etc.)

### Decision
Store visual data in a **JSONB column** (`content_json`).

### Consequences
**Positive:**
- Flexible schema (each word can have unique structure)
- Easy to evolve (add new fields without migrations)
- Matches the JSON format generated by LLM content pipeline
- PostgreSQL's JSONB is queryable and indexed

**Negative:**
- Harder to query specific fields (e.g., "find all words with points in Europe")
- No foreign key constraints (data integrity relies on Zod validation)

### Alternatives Considered
- **Normalized tables:** Rejected because:
  - Would require 10+ tables (points, routes, nodes, epochs, languages...)
  - Schema would be rigid (hard to add new visualization types)
  - Over-engineering for a solo dev project

---

## ADR-006: Use Framer Motion for Animations (Not CSS Animations or GSAP)

**Date:** 2025-02-07  
**Status:** Accepted  
**Decider:** Jigar

### Context
Need scroll-triggered animations for scrollytelling experience. Options:
- **Framer Motion** (React-first, declarative)
- **GSAP** (powerful, imperative, large bundle)
- **CSS Animations** (simple, but hard to sync with scroll)

### Decision
Use **Framer Motion**.

### Consequences
**Positive:**
- Built-in scroll hooks (`useScroll`, `useTransform`)
- Declarative syntax (easier to reason about)
- Works seamlessly with React components
- Smaller bundle than GSAP

**Negative:**
- Less powerful than GSAP for complex timelines
- Performance can degrade with too many animated elements

### Alternatives Considered
- **GSAP:** Rejected because it's overkill for our use case and adds ~50kb to bundle.
- **CSS Animations:** Rejected because syncing with scroll progress is painful without JS.

---

## ADR-007: Use localStorage for Streak Tracking (Not Database)

**Date:** 2025-02-07  
**Status:** Accepted  
**Decider:** Jigar

### Context
Need to track user's daily visit streak. Options:
- **localStorage** (client-side, no server required)
- **Database** (server-side, requires user accounts)
- **Cookies** (can persist, but harder to manage)

### Decision
Use **localStorage** for streak tracking (no user accounts).

### Consequences
**Positive:**
- No auth required (users stay anonymous)
- No database writes (saves costs)
- Works offline (PWA compatible)
- Simple implementation

**Negative:**
- Data lost if user clears browser data
- No cross-device sync (streak resets on new device)
- Users can cheat by manipulating localStorage (but no competitive advantage)

### Alternatives Considered
- **Database with accounts:** Rejected because:
  - Adds complexity (auth, GDPR compliance)
  - Not necessary for MVP
  - Can add later if users request it
- **Cookies:** Rejected because localStorage is easier to work with in React.

---

## ADR-008: Use Server-Side Image Generation for Share Cards (Not Client-Side Canvas)

**Date:** 2025-02-07  
**Status:** Accepted  
**Decider:** Jigar

### Context
Need to generate 1080x1080 PNG images for sharing. Options:
- **Server-side (Puppeteer):** Render HTML → screenshot
- **Client-side (html2canvas):** Render in browser → download
- **Pre-rendered templates:** Static images with dynamic text overlay

### Decision
Use **server-side image generation** with Puppeteer or similar.

### Consequences
**Positive:**
- Consistent rendering (no browser differences)
- Can generate QR codes server-side
- Images can be cached and reused
- Better for SEO (Open Graph images)

**Negative:**
- Slower than client-side (requires serverless function execution)
- Costs more (Vercel function execution time)
- More complex implementation

### Alternatives Considered
- **Client-side (html2canvas):** Rejected because:
  - Inconsistent rendering across browsers
  - Can't generate images for Open Graph tags (need server-side)
  - User must download manually (not auto-shareable)
- **Pre-rendered templates:** Rejected because it limits design flexibility.

---

## Template for Future Decisions

Copy this when adding a new ADR:

```markdown
## ADR-XXX: [Decision Title]

**Date:** YYYY-MM-DD  
**Status:** Proposed | Accepted | Rejected | Superseded  
**Decider:** [Your name]

### Context
[What problem are we solving? What are the constraints?]

### Decision
[What did we decide to do?]

### Consequences
**Positive:**
- [Benefit 1]
- [Benefit 2]

**Negative:**
- [Tradeoff 1]
- [Tradeoff 2]

### Alternatives Considered
- **[Option A]:** Rejected because [reason]
- **[Option B]:** Rejected because [reason]
```

---

## Superseded Decisions

If a decision is later overturned, move it here and link to the new ADR.

### ADR-002: Vercel Postgres → Superseded by ADR-009 (Neon)

---

## ADR-009: Switch to Neon Serverless (From Vercel Postgres)

**Date:** 2026-02-08  
**Status:** Accepted  
**Decider:** Jigar + Agent

### Context
When implementing Phase 1, we discovered that `@vercel/postgres` has been **deprecated** (last version 0.10.0, ~1 year old). Vercel has migrated all Postgres databases to Neon and recommends using the native Neon driver.

### Decision
Switch from `@vercel/postgres` to `@neondatabase/serverless`.

### Consequences
**Positive:**
- Actively maintained driver (Neon's official package)
- Same underlying technology (Vercel Postgres was Neon under the hood)
- Supports HTTP and WebSocket connections
- Full `node-postgres` compatibility
- Better documentation and support

**Negative:**
- Required updating import statements and connection setup
- Slightly different API (uses `neon()` function instead of `sql` tagged template)
- Environment variable changed from `POSTGRES_URL` to `DATABASE_URL`

### Alternatives Considered
- **@neondatabase/vercel-postgres-compat:** A drop-in replacement package. Rejected because we preferred using the native driver for long-term maintainability.
- **Keep using @vercel/postgres:** Rejected because it's deprecated and no longer maintained.

### Migration Notes
- Changed `import { sql } from '@vercel/postgres'` to `import { neon } from '@neondatabase/serverless'`
- Updated `src/lib/db.ts` with new connection pattern
- Changed `.env.local` to use `DATABASE_URL` instead of `POSTGRES_URL`

---

## ADR-010: Store Multi-color Palettes in JSONB instead of Schema Migration

**Date:** 2026-02-21  
**Status:** Accepted  
**Decider:** Jigar + Agent

### Context
We wanted to upgrade from a single `accent_color` to a rich 5-color palette (primary, secondary, muted, surface, text) for the TimelineVisualizer to allow complex styling, particularly for Newspaper mode vs Museum mode. We needed to decide where this newly structured data should live.

### Decision
Store the extended `palette` object inside the existing `content_json` JSONB column rather than creating 5 new schema columns or physically altering the database table structure. We back-filled existing DB rows using a script that algorithmically derives the 5 colors from the single `accent_color`.

### Consequences
**Positive:**
- Zero database migrations required
- Retains compatibility with existing `accent_color` field (used as a fallback)
- Flexible allowing easy additions like "dark_mode_palette" later

**Negative:**
- Palettes are not easily queryable via standard SQL columns

### Alternatives Considered
- **Add columns to daily_words:** Rejected because it clutters the schema with purely aesthetic visual data.

---

**Last Updated:** 2026-02-21  
**Next Review:** After each major decision

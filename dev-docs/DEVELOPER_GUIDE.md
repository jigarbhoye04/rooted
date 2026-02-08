# 🚀 Rooted - Developer Onboarding Guide

**Welcome, Developer!** This guide will get you from zero to shipping features in under 30 minutes.

**Last Updated:** 2025-02-07  
**Version:** 1.0

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Quick Start (5 Minutes)](#quick-start)
4. [Understanding the System Architecture](#understanding-the-system-architecture)
5. [The Multi-Agent Development Workflow](#the-multi-agent-development-workflow)
6. [Day-to-Day Development](#day-to-day-development)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)
10. [FAQ](#faq)

---

## Prerequisites

### Required

- **Node.js:** v18.17.0 or higher
- **npm:** v9.0.0 or higher
- **Git:** Any recent version
- **VS Code:** Latest version (recommended)
- **PostgreSQL:** via Vercel Postgres or local installation

### Optional but Recommended

- **GitHub Copilot:** Extension for VS Code (Builder Agent)
- **Claude Account:** For Architect and Reviewer agents
- **Vercel Account:** For deployment

### Knowledge Requirements

- ✅ **TypeScript:** Intermediate level
- ✅ **React:** Intermediate level
- ✅ **Next.js:** Basic familiarity (will learn more)
- ✅ **SQL:** Basic queries (SELECT, INSERT, UPDATE)
- ⚠️ **D3.js:** Not required (will learn as you build)

---

## Project Overview

### What is Rooted?

Rooted is a daily web app that presents **one word per day** with an interactive visualization of its etymology. Think "Wordle meets National Geographic" for language nerds.

**Core Innovation:** Adaptive visualization engine that chooses the best visual format (Map, Tree, Timeline, or Grid) based on each word's unique story.

### Tech Stack Summary

```
Frontend: Next.js 14 + TypeScript + Tailwind + Framer Motion
Backend: Next.js API Routes + Vercel Postgres
Visualization: D3.js + TopoJSON
Validation: Zod (runtime type safety)
Testing: Jest + React Testing Library
Deployment: Vercel (free tier)
```

### Key Documents

You have **5 essential documents** in your repo:

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **rooted_master_prd_v2.md** | Full product vision & requirements | Once (before starting) |
| **docs/context/01_architecture.md** | Technical architecture | Reference often |
| **docs/context/02_progress.md** | Task checklist | Update after each task |
| **docs/context/04_schema_contracts.md** | All Zod schemas | When working with data |
| **RULES.md** | Security & code quality rules | Memorize these! |

---

## Quick Start

### Step 1: Clone and Setup (2 minutes)

```bash
# 1. Navigate to where you unzipped the starter kit
cd rooted-starter-kit

# 2. Install dependencies
npm install

# 3. Install additional dev tools (optional but recommended)
npm install -D @types/d3 @types/topojson-client

# 4. Create environment file
cp .env.example .env.local

# 5. Add your database URL to .env.local
# POSTGRES_URL="postgres://user:password@host:5432/database"
# (Get this from Vercel Postgres dashboard)
```

### Step 2: Database Setup (3 minutes)

```bash
# Option A: Using Vercel Postgres (Recommended)
# 1. Go to vercel.com/dashboard
# 2. Create new project (link to your Git repo)
# 3. Add Vercel Postgres database
# 4. Copy connection string to .env.local

# Option B: Local PostgreSQL
# 1. Install PostgreSQL locally
# 2. Create database: createdb rooted
# 3. Update .env.local with local connection string

# 3. Run migrations (create tables)
npm run db:migrate

# 4. Seed database with sample data
npm run db:seed
```

### Step 3: Start Development Server (1 minute)

```bash
# Start Next.js dev server
npm run dev

# Open browser
# Navigate to: http://localhost:3000

# You should see: "No word scheduled for today" (404)
# This is expected - we'll fix it by implementing our first feature!
```

---

## Understanding the System Architecture

### The Three-Layer Mental Model

```
┌─────────────────────────────────────┐
│  LAYER 1: The Vision (PRD)         │  ← What we're building
│  - Product requirements            │
│  - User experience                 │
│  - Business logic                  │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  LAYER 2: The Memory (Context)     │  ← How we stay aligned
│  - architecture.md                 │
│  - progress.md                     │
│  - decisions.md                    │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  LAYER 3: The Guardrails (Zod)    │  ← How we prevent bugs
│  - Schemas validate everything    │
│  - Security checks automate       │
│  - Tests verify correctness       │
└─────────────────────────────────────┘
```

### File Structure at a Glance

```
rooted/
├── 📄 rooted_master_prd_v2.md       ← The Bible (read once)
├── 📁 docs/context/                 ← Living documentation
│   ├── 01_architecture.md           ← Technical design
│   ├── 02_progress.md               ← Task checklist
│   ├── 03_decisions.md              ← Why we chose X
│   └── 04_schema_contracts.md       ← All Zod schemas
│
├── 📁 app/                          ← Next.js 14 App Router
│   ├── api/                         ← API routes (serverless)
│   ├── word/[slug]/                 ← Individual word pages
│   ├── page.tsx                     ← Homepage
│   └── layout.tsx                   ← Root layout
│
├── 📁 src/
│   ├── components/                  ← React components
│   ├── schemas/                     ← Zod validation
│   ├── lib/                         ← Utilities
│   └── types/                       ← TypeScript types
│
├── 📁 scripts/                      ← Automation
│   ├── security-check.sh            ← Pre-commit security audit
│   ├── code-review.sh               ← Generate review request
│   └── sync-progress.sh             ← Update progress.md
│
├── 📁 .github/
│   └── copilot-instructions.md      ← Copilot agent rules
│
├── 📄 RULES.md                      ← Engineering rules (critical!)
└── 📄 current_task.md               ← Your current micro-task
```

### The Database Schema (Simplified)

```sql
daily_words
├── id (PRIMARY KEY)
├── publish_date (UNIQUE) ← When word appears
├── word                   ← e.g., "Sabotage"
├── definition
├── phonetic              ← e.g., "/ˈsæbətɑːʒ/"
├── visualization_type    ← MAP | TREE | TIMELINE | GRID
├── content_json (JSONB)  ← Story + visual data
├── accent_color          ← Hex color for theme
└── root_family           ← For Wordception feature
```

**Key insight:** All visual data lives in `content_json` (JSONB field). This gives us maximum flexibility without complex joins.

---

## The Multi-Agent Development Workflow

You're not working alone. You have **3 AI agents** helping you:

### Agent 1: The Architect (Claude - Manual)

**When to use:** Before writing any code.

**Input:** Your idea or feature request  
**Output:** Technical spec for `current_task.md`

**Example:**
```
You: "I need to build the MAP visualizer"

Architect (Claude):
[Creates detailed spec with:
 - TypeScript interfaces
 - Zod schemas
 - 5 micro-tasks
 - Security considerations]

You: [Save spec to current_task.md]
```

**Where to run:** Claude web interface or API

---

### Agent 2: The Builder (Copilot - Automatic)

**When to use:** Writing implementation code.

**Input:** `current_task.md` + context files  
**Output:** TypeScript/React code

**How it works:**
1. You open a file in VS Code
2. You write a comment: `// Implement MapVisualizer according to current_task.md`
3. Copilot reads `.github/copilot-instructions.md` (automatically)
4. Copilot suggests code following all your rules
5. You accept/reject each suggestion

**Key files Copilot reads:**
- `.github/copilot-instructions.md` (your constraints)
- `current_task.md` (what to build)
- `docs/context/01_architecture.md` (system context)

---

### Agent 3: The Reviewer (Claude - Manual)

**When to use:** Before committing code.

**Input:** Git diff + context + rules  
**Output:** ✅ APPROVED or ❌ REJECTED with issues

**How to trigger:**
```bash
# 1. Stage your changes
git add app/api/word/today/route.ts

# 2. Generate review request
./scripts/code-review.sh

# 3. Copy output to Claude
# 4. Claude reviews and responds

# 5. If approved:
git commit -m "feat: Add /api/word/today endpoint"

# 6. If rejected:
# Fix issues and repeat
```

---

## Day-to-Day Development

Here's your **actual daily workflow** as a solo dev:

### Morning Ritual (5 minutes)

```bash
# 1. Pull latest changes (if working across devices)
git pull

# 2. Check current progress
cat docs/context/02_progress.md | grep "Current Phase"

# 3. Read current task
cat current_task.md

# 4. Open VS Code
code .
```

---

### The Main Loop (Repeat Until Task Complete)

#### Step 1: Architect Defines Task (10 minutes)

**You do:**
1. Open Claude (web or API)
2. Paste this prompt:

```
Context: [paste docs/context/01_architecture.md]

Current Progress: [paste relevant section from 02_progress.md]

Task: Create a technical spec for [FEATURE NAME].

Include:
- TypeScript interfaces
- Zod schemas
- 3-5 micro-tasks to implement this
- Security considerations
- Testing requirements

Output format: Follow the template in current_task.md
```

3. Copy Claude's output to `current_task.md`

**Example output:** See the existing `current_task.md` in your starter kit.

---

#### Step 2: Builder Implements (30-120 minutes)

**You do:**

1. **Read current task:**
   ```bash
   cat current_task.md
   ```

2. **Create the file:**
   ```bash
   # Example: Creating an API route
   mkdir -p app/api/word/today
   touch app/api/word/today/route.ts
   code app/api/word/today/route.ts
   ```

3. **Start with a comment:**
   ```typescript
   // Implement GET /api/word/today according to current_task.md
   // This endpoint returns the word scheduled for today's date
   ```

4. **Let Copilot suggest:**
   - Copilot reads `.github/copilot-instructions.md`
   - It suggests code following all rules
   - You review each suggestion carefully

5. **Manual coding:**
   - If Copilot's suggestion is wrong, reject it
   - Write the code yourself following `current_task.md`
   - Use the template in `current_task.md` as reference

6. **Run frequently:**
   ```bash
   # Type check (every 5-10 minutes)
   npm run type-check
   
   # Test endpoint (after basic implementation)
   curl http://localhost:3000/api/word/today
   ```

---

#### Step 3: Reviewer Audits (5 minutes)

**You do:**

1. **Stage your changes:**
   ```bash
   git add app/api/word/today/route.ts
   ```

2. **Generate review request:**
   ```bash
   ./scripts/code-review.sh
   ```

3. **Review output file:**
   - Script creates `/tmp/rooted-code-review-XXXXX.md`
   - Copy entire contents

4. **Paste into Claude:**
   - Open Claude web interface
   - Paste the review request
   - Wait for response

5. **Act on response:**
   - **If ✅ APPROVED:** Proceed to Step 4
   - **If ❌ REJECTED:** Fix issues and re-review

---

#### Step 4: Integration (2 minutes)

**You do:**

1. **Commit:**
   ```bash
   git commit -m "feat: Add /api/word/today endpoint
   
   - Validates with DailyWordSchema
   - Returns 404 if no word found
   - Handles schema validation errors
   
   Resolves TASK-001"
   ```

2. **Update progress:**
   ```bash
   # Edit docs/context/02_progress.md
   # Change [ ] to [x] for completed task
   
   # Or use auto-script (if implemented):
   ./scripts/sync-progress.sh "Completed /api/word/today"
   ```

3. **Clean up:**
   ```bash
   # Archive current task
   mv current_task.md completed_tasks/TASK-001.md
   
   # Or simply delete if you don't want to keep history
   rm current_task.md
   ```

4. **Define next task:**
   - Go back to Step 1 (Architect)
   - Define the next task in a new `current_task.md`

---

### Evening Wrap-Up (5 minutes)

```bash
# 1. Run full security check
./scripts/security-check.sh

# 2. Run all tests
npm test

# 3. Push changes
git push origin main

# 4. Update personal notes (optional)
# What worked today? What blockers did you hit?
```

---

## Common Tasks

### Task: Add a New API Endpoint

**Example:** `GET /api/word/[slug]`

```bash
# 1. Architect defines task
# [Use Claude to create current_task.md]

# 2. Create file structure
mkdir -p app/api/word/[slug]
touch app/api/word/[slug]/route.ts

# 3. Implement (with Copilot or manually)
code app/api/word/[slug]/route.ts

# 4. Test manually
curl http://localhost:3000/api/word/sabotage

# 5. Write tests
touch __tests__/api/word/slug.test.ts

# 6. Review with Claude
git add app/api/word/[slug]/route.ts
./scripts/code-review.sh

# 7. Commit
git commit -m "feat: Add /api/word/[slug] endpoint"
```

---

### Task: Create a New React Component

**Example:** `MapVisualizer.tsx`

```bash
# 1. Architect defines task (Claude)
# [Get spec for component props, Zod schema, etc.]

# 2. Create schema first
touch src/schemas/mapVisualizer.ts
code src/schemas/mapVisualizer.ts

# [Define MapVisualizerPropsSchema]

# 3. Create component
touch src/components/MapVisualizer.tsx
code src/components/MapVisualizer.tsx

# 4. Implement (follow template in copilot-instructions.md)

# 5. Create test
touch src/components/__tests__/MapVisualizer.test.tsx

# 6. Test rendering
npm run dev
# Navigate to /demo/map

# 7. Review and commit
git add src/schemas/mapVisualizer.ts src/components/MapVisualizer.tsx
./scripts/code-review.sh
git commit -m "feat: Add MapVisualizer component"
```

---

### Task: Fix a Bug

```bash
# 1. Reproduce the bug
npm run dev
# Navigate to page with bug

# 2. Write a failing test (if possible)
# This ensures the bug doesn't come back

# 3. Fix the code

# 4. Verify test passes
npm test

# 5. Review and commit
git add [fixed file]
./scripts/code-review.sh
git commit -m "fix: Correct coordinate validation in MapVisualizer"
```

---

### Task: Update Context Documentation

**When:** After making an architectural decision

```bash
# 1. Open decision log
code docs/context/03_decisions.md

# 2. Add new entry (follow template in file)

## ADR-XXX: [Your Decision]
**Date:** YYYY-MM-DD
**Status:** Accepted
**Decider:** [Your name]

### Context
[What problem were you solving?]

### Decision
[What did you decide?]

### Consequences
[What are the tradeoffs?]

### Alternatives Considered
[What else did you consider?]

# 3. Commit
git add docs/context/03_decisions.md
git commit -m "docs: Add ADR for [decision]"
```

---

## Troubleshooting

### Problem: "TypeScript errors everywhere!"

**Cause:** Missing dependencies or wrong Node version

**Fix:**
```bash
# 1. Check Node version
node --version  # Should be 18.17.0+

# 2. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# 3. Verify TypeScript is installed
npm list typescript
```

---

### Problem: "Copilot isn't following my rules!"

**Cause:** Copilot hasn't read `.github/copilot-instructions.md`

**Fix:**
```bash
# 1. Verify file exists
cat .github/copilot-instructions.md

# 2. Reload VS Code window
# CMD+Shift+P (Mac) or CTRL+Shift+P (Windows)
# Type: "Reload Window"

# 3. Try adding explicit comments in your code
// IMPORTANT: Follow patterns in .github/copilot-instructions.md
// CRITICAL: Use Zod validation for all inputs
```

---

### Problem: "Database connection failed!"

**Cause:** Invalid `POSTGRES_URL` in `.env.local`

**Fix:**
```bash
# 1. Check environment file
cat .env.local

# 2. Verify connection string format
# Should look like:
# postgres://username:password@host:5432/database

# 3. Test connection
npm run db:test-connection

# 4. If using Vercel Postgres, get fresh URL from dashboard
```

---

### Problem: "Security check is failing!"

**Cause:** Code violates security rules

**Fix:**
```bash
# 1. Run security check to see specific issues
./scripts/security-check.sh

# 2. Read error messages carefully
# Example: "SQL injection detected in line 42"

# 3. Fix the specific issue
# Change: sql(`SELECT * FROM users WHERE id = '${id}'`)
# To:     sql`SELECT * FROM users WHERE id = ${id}`

# 4. Re-run check
./scripts/security-check.sh
```

---

### Problem: "Code review keeps rejecting my code!"

**Cause:** Not following patterns in `RULES.md` or `current_task.md`

**Fix:**
```bash
# 1. Read the rejection reasons carefully
# Claude will list specific line numbers and issues

# 2. Re-read relevant sections
cat RULES.md | grep -A 10 "Security Rules"
cat current_task.md | grep -A 20 "Implementation Details"

# 3. Fix each issue one by one

# 4. Re-submit for review
./scripts/code-review.sh
```

---

## Best Practices

### DO ✅

1. **Read `current_task.md` before writing ANY code**
   - It contains the spec, security considerations, and test requirements

2. **Run `./scripts/security-check.sh` frequently**
   - Catches common mistakes early
   - Much faster than waiting for code review

3. **Write tests BEFORE implementing (TDD)**
   - Ensures you understand the requirements
   - Makes debugging easier

4. **Commit small, focused changes**
   - Easier to review
   - Easier to rollback if needed

5. **Update `docs/context/02_progress.md` after each task**
   - Prevents confusion about what's done

6. **Use Zod validation for EVERYTHING**
   - API inputs
   - Database outputs
   - Component props

7. **Ask Claude for help when stuck**
   - Don't waste hours debugging alone
   - Paste error message + context → Get solution

---

### DON'T ❌

1. **Don't skip the Reviewer Agent**
   - It catches bugs you'll miss
   - Takes 5 minutes, saves hours of debugging

2. **Don't use `any` type**
   - Use `unknown` and validate with Zod

3. **Don't commit code with `// TODO` comments**
   - Implement immediately or create GitHub issue

4. **Don't hardcode secrets**
   - Use environment variables

5. **Don't trust user input**
   - Always validate with Zod

6. **Don't skip tests**
   - "I'll add tests later" → Tests never get added

7. **Don't work on multiple tasks simultaneously**
   - Finish `current_task.md` before starting next

---

## FAQ

### Q: How long should each task take?

**A:** Aim for **30-120 minutes per task**. If a task takes longer, it's too big. Break it into smaller tasks.

---

### Q: What if Copilot generates wrong code?

**A:** 
1. **Don't blindly accept** — Review every suggestion
2. **Reject and write manually** — You're still the senior dev
3. **Update `.github/copilot-instructions.md`** — Add specific rules to prevent repeat mistakes

---

### Q: When should I update `docs/context/03_decisions.md`?

**A:** Whenever you make a choice that affects:
- Architecture (e.g., "Why Next.js over Remix?")
- Security (e.g., "Why bcrypt with 12 rounds?")
- Data modeling (e.g., "Why JSONB over normalized tables?")

**Rule of thumb:** If you had to think for >10 minutes about the decision, document it.

---

### Q: How do I handle conflicting guidance between files?

**A:** **Priority order:**

1. **RULES.md** (Immutable - NEVER violate)
2. **current_task.md** (Task-specific requirements)
3. **docs/context/01_architecture.md** (General architecture)
4. **.github/copilot-instructions.md** (AI agent constraints)

If there's a conflict, RULES.md always wins.

---

### Q: Can I skip the multi-agent workflow and just code?

**A:** You *can*, but **you'll regret it**. The workflow prevents:
- Context drift (forgetting what you decided yesterday)
- Security holes (missing Zod validation)
- Scope creep (building features not in the PRD)

**Compromise:** For tiny changes (<10 lines), skip Architect and Reviewer. For anything larger, use the full workflow.

---

### Q: What if I disagree with an ADR (Architecture Decision Record)?

**A:** 
1. **Don't just change it** — Create a new ADR that supersedes the old one
2. **Document your reasoning** — Explain why the original decision no longer makes sense
3. **Update all affected files** — Change code, update `01_architecture.md`, etc.

---

### Q: How do I know if a feature should be a MAP, TREE, TIMELINE, or GRID visualization?

**A:** Follow the decision tree in `docs/context/01_architecture.md`:

```
Is word tied to geographic journey? → MAP
Did meaning shift over time? → TREE
Clear temporal epochs? → TIMELINE
Otherwise → GRID
```

When in doubt, ask the Architect Agent (Claude).

---

### Q: What's the deployment process?

**A:** (Phase 1 doesn't include deployment, but here's the future process)

```bash
# 1. Ensure all tests pass
npm test

# 2. Run production build
npm run build

# 3. Push to main branch
git push origin main

# 4. Vercel auto-deploys
# Check: vercel.com/your-project/deployments
```

---

## Next Steps

### Your First Task: Implement `/api/word/today`

**Now that you've read this guide, you're ready to build your first feature!**

1. **Read `current_task.md`** (already created for you)
2. **Follow the Day-to-Day Development workflow** (Step 1-4)
3. **Complete the task** (should take ~1 hour for first-timers)

**After completing your first task:**
- ✅ You'll understand the workflow
- ✅ You'll have working code
- ✅ You'll have passed security checks
- ✅ You'll have committed to git

Then move to **Phase 1, Task 2** (see `docs/context/02_progress.md`).

---

## Additional Resources

### Internal Documentation
- **Full PRD:** `rooted_master_prd_v2.md` (read once, reference as needed)
- **Architecture:** `docs/context/01_architecture.md` (reference frequently)
- **Schemas:** `docs/context/04_schema_contracts.md` (reference when working with data)
- **Rules:** `RULES.md` (memorize security rules)

### External Documentation
- **Next.js 14:** https://nextjs.org/docs
- **Zod:** https://zod.dev
- **D3.js:** https://d3js.org
- **Framer Motion:** https://www.framer.com/motion/
- **Vercel Postgres:** https://vercel.com/docs/storage/vercel-postgres

### Getting Help
- **Stuck on a task?** Ask Claude (paste error + context)
- **Security question?** Re-read `RULES.md` security section
- **Type issue?** Check `docs/context/04_schema_contracts.md`

---

## 🎉 You're Ready!

Take a deep breath. You've got:
- ✅ A clear architecture
- ✅ AI agents to help you
- ✅ Automated security checks
- ✅ A proven workflow
- ✅ Complete documentation

**Now go build something amazing!** 🚀

---

**Questions?** Create an issue in the repo or ask Claude.

**Happy coding!**  
— The Rooted Team

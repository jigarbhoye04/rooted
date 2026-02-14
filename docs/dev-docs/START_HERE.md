# 🚀 START HERE

**Welcome to Rooted Development!**

This is your **single source of truth** for getting started. Follow these steps **in order**.

---

## ⏱️ TIME COMMITMENT

- **Setup:** 20 minutes
- **First Task:** 30 minutes
- **First Commit:** 15 minutes
- **Total to First Working Feature:** ~1 hour

---

## 📋 PHASE 0: PRE-FLIGHT (10 minutes)

### Step 1: Verify You Have Everything

```bash
# Navigate to the starter kit
cd rooted-starter-kit

# Check file count (should be 15 files)
find . -type f | wc -l

# Expected: 15
```

**If you see 15, proceed. If not, re-download.**

---

### Step 2: Read These 3 Files (10 min total)

**MUST READ (in order):**

1. **README.md** (2 min) - Project overview
2. **QUICK_START.md** (3 min) - Workflow summary  
3. **RULES.md** → Security section ONLY (5 min) - **MEMORIZE THIS**

**Optional (reference later):**
- `rooted_master_prd_v2.md` - Full product spec (read when you need product context)
- `DEVELOPER_GUIDE.md` - Comprehensive tutorial (read if you get stuck)

---

### Step 3: Mental Model Check ✓

Before proceeding, answer these:

- [ ] **Q:** What are the 3 agents in the system?  
  **A:** Architect (Claude), Builder (Copilot), Reviewer (Claude)

- [ ] **Q:** What file defines the current task?  
  **A:** `current_task.md`

- [ ] **Q:** What's the #1 security rule?  
  **A:** NEVER use string concatenation in SQL queries - always use parameterized queries

- [ ] **Q:** What validates all data?  
  **A:** Zod schemas

**If you got all 4 correct, proceed. If not, re-read RULES.md.**

---

## 📦 PHASE 1: PROJECT INITIALIZATION (10 minutes)

### Step 1: Create Your Repo

```bash
# Option A: Start fresh
mkdir rooted
cd rooted
git init

# Copy starter kit files into repo
cp -r ../rooted-starter-kit/* .
cp -r ../rooted-starter-kit/.github .

# Option B: Clone existing repo
git clone <your-repo-url> rooted
cd rooted
cp -r ../rooted-starter-kit/* .
cp -r ../rooted-starter-kit/.github .
```

---

### Step 2: Initialize Next.js

```bash
# Create Next.js 14 app
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Answer prompts:
# ✓ TypeScript: Yes
# ✓ ESLint: Yes  
# ✓ Tailwind CSS: Yes
# ✓ App Router: Yes
# ✓ Import alias: Yes (@/*)
# ✓ Customize default import alias: No

# This creates: app/, public/, package.json, tsconfig.json, etc.
```

---

### Step 3: Install Dependencies

```bash
# Core dependencies
npm install zod @neondatabase/serverless framer-motion

# Development dependencies
npm install -D @types/node

# Visualization libraries (install later when needed)
# npm install d3 @types/d3 react-simple-maps topojson-client
```

---

### Step 4: Set Up Environment

```bash
# Create environment file
cat > .env.local << 'EOF'
# Database (Vercel Postgres)
POSTGRES_URL="your-connection-string-here"
POSTGRES_PRISMA_URL="your-prisma-connection-string-here"
POSTGRES_URL_NON_POOLING="your-non-pooling-connection-string-here"
POSTGRES_USER="default"
POSTGRES_HOST="your-host.postgres.vercel-storage.com"
POSTGRES_PASSWORD="your-password"
POSTGRES_DATABASE="verceldb"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Security
CRON_SECRET="generate-random-string-here"
EOF

# Add to .gitignore
echo ".env.local" >> .gitignore
```

**⚠️ IMPORTANT:** Replace `your-connection-string-here` with your actual Vercel Postgres credentials.

**Don't have Vercel Postgres yet?**
```bash
# Option A: Create on Vercel dashboard
# 1. Go to https://vercel.com/dashboard
# 2. Select your project → Storage → Create Database → Postgres
# 3. Copy connection strings to .env.local

# Option B: Use local PostgreSQL for now
# Install Docker, then:
docker run --name rooted-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
# Use: POSTGRES_URL="postgresql://postgres:password@localhost:5432/rooted"
```

---

### Step 5: Create Database Schema

```bash
# Create migration file
mkdir -p migrations
cat > migrations/001_initial_schema.sql << 'EOF'
-- See docs/context/01_architecture.md for full schema

CREATE TABLE daily_words (
  id SERIAL PRIMARY KEY,
  publish_date DATE UNIQUE NOT NULL,
  word VARCHAR(100) NOT NULL,
  definition TEXT NOT NULL,
  phonetic VARCHAR(100),
  visualization_type VARCHAR(10) CHECK (visualization_type IN ('TREE', 'MAP', 'TIMELINE', 'GRID')),
  content_json JSONB NOT NULL,
  accent_color CHAR(7) DEFAULT '#000000',
  root_family VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  approved_by VARCHAR(50),
  
  CONSTRAINT valid_color CHECK (accent_color ~ '^#[0-9A-Fa-f]{6}$')
);

CREATE INDEX idx_publish_date ON daily_words(publish_date);
CREATE INDEX idx_root_family ON daily_words(root_family) WHERE root_family IS NOT NULL;
EOF

# Run migration (if using Vercel Postgres)
npx vercel-postgres migrate

# OR run manually via Vercel dashboard SQL editor
```

---

### Step 6: Make Scripts Executable

```bash
chmod +x scripts/*.sh
```

---

### Step 7: First Commit

```bash
git add .
git commit -m "chore: Initialize Rooted project

- Next.js 14 with TypeScript & Tailwind
- Zod for validation
- Database schema created
- Starter kit files integrated
"
```

✅ **PHASE 1 COMPLETE**

---

## 🎯 PHASE 2: YOUR FIRST TASK (30 minutes)

### Step 1: Read Current Task

```bash
cat current_task.md
```

**You'll see:** "Implement GET /api/word/today endpoint"

This is your **ARCHITECT-DEFINED TASK**. Read it completely.

---

### Step 2: Open VS Code with Copilot

```bash
# Open VS Code
code .

# Verify Copilot is active:
# 1. Bottom right corner should show "Copilot" icon
# 2. Open any .ts file and type a comment - should see suggestions
```

---

### Step 3: Implement the Task (Builder Agent)

**Follow the template in `current_task.md`:**

1. **Create file:**
   ```bash
   mkdir -p app/api/word/today
   touch app/api/word/today/route.ts
   ```

2. **Open in VS Code:**
   ```bash
   code app/api/word/today/route.ts
   ```

3. **Start typing** (Copilot will autocomplete):
   ```typescript
   // Implement GET /api/word/today according to current_task.md
   // This endpoint returns today's word from the database
   
   import { NextResponse } from 'next/server';
   import { neon } from '@neondatabase/serverless';
   import { DailyWordSchema } from '@/src/schemas/dailyWord';
   ```

4. **Let Copilot suggest** the implementation. **Review each line:**
   - ✅ Using `sql` tagged template? (Good)
   - ✅ Validating with `DailyWordSchema.parse()`? (Good)
   - ✅ Checking `request.method`? (Good)
   - ❌ Using `any` type? (Reject, ask for explicit type)
   - ❌ No error handling? (Reject, add try/catch)

5. **Manual test:**
   ```bash
   npm run dev
   # Open browser: http://localhost:3000/api/word/today
   # Should return 404 (no word in DB yet) or 200 with word data
   ```

---

### Step 4: Review Before Commit (Reviewer Agent)

```bash
# Stage your changes
git add app/api/word/today/route.ts

# Run security check
./scripts/security-check.sh

# If it passes, run code review
./scripts/code-review.sh
```

**This generates a file:** `/tmp/code-review-request.md`

**Copy its contents** and paste into Claude (web or API):

```
[Open Claude.ai]
[Paste the entire code-review-request.md]
[Wait for review]
```

**Claude will respond with either:**
- ✅ **APPROVED** → Proceed to commit
- ❌ **REJECTED: {issues}** → Fix issues and re-run review

---

### Step 5: Commit & Sync

```bash
# If approved, commit
git commit -m "feat: Add /api/word/today endpoint

- Validates with DailyWordSchema
- Returns 404 if no word found  
- Handles schema validation errors
- Follows security rules (parameterized SQL)

Resolves task in current_task.md
"

# Auto-update progress
./scripts/sync-progress.sh
```

---

### Step 6: Move to Next Task

```bash
# Archive completed task
mv current_task.md completed_tasks/task_001_word_today.md

# Create next task (use Architect Agent - Claude)
# Paste this to Claude:

---
Context: {paste docs/context/01_architecture.md}
Progress: {paste docs/context/02_progress.md}

Task: Create technical spec for the next unchecked task in progress.md

Format: Follow the template in current_task.md
---

# Save Claude's output as new current_task.md
```

✅ **FIRST TASK COMPLETE!** You just shipped your first feature with the multi-agent system.

---

## 🔁 PHASE 3: THE DAILY LOOP (Repeat Forever)

```
┌─────────────────────────────────────┐
│ 1. MORNING: Read current_task.md   │
│    (Architect defined this)         │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ 2. CODE: Implement in VS Code      │
│    (Builder - Copilot assists)     │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ 3. REVIEW: ./scripts/code-review.sh │
│    (Reviewer - Claude approves)     │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ 4. COMMIT: git commit + sync        │
│    (Integration - You decide)       │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ 5. NEXT: Create new current_task.md│
│    (Back to Architect - Claude)     │
└──────────────┬──────────────────────┘
               ↓
           (Repeat)
```

---

## 📊 PROGRESS TRACKING

Check your progress anytime:

```bash
# See completed tasks
cat docs/context/02_progress.md | grep "\[x\]"

# See remaining tasks  
cat docs/context/02_progress.md | grep "\[ \]"

# See current phase
head -20 docs/context/02_progress.md
```

---

## 🆘 TROUBLESHOOTING

### Copilot Not Suggesting Code
```bash
# 1. Check Copilot is enabled (bottom right VS Code icon)
# 2. Reload VS Code: Cmd/Ctrl + Shift + P → "Reload Window"
# 3. Verify .github/copilot-instructions.md exists
# 4. Try typing a comment like: // Create a function that...
```

### Security Check Failing
```bash
# Read the error message carefully
./scripts/security-check.sh

# Common issues:
# - SQL injection: Use sql`...${param}` not "..." + param
# - Hardcoded secret: Move to .env.local
# - Missing method check: Add if (request.method !== 'GET')
```

### Code Review Rejecting
```bash
# 1. Read rejection reasons
# 2. Fix specific issues
# 3. Re-run: ./scripts/code-review.sh
# 4. Re-submit to Claude

# If stuck, ask Claude:
# "I got this rejection: {paste}. How do I fix it while following RULES.md?"
```

### Database Connection Failed
```bash
# 1. Verify .env.local has correct DATABASE_URL
# 2. Check Neon dashboard for connection string at https://console.neon.tech
# 3. Ensure database is not paused (free tier auto-pauses)
```

---

## 📚 QUICK REFERENCE

**Files You'll Use Daily:**
- `current_task.md` - What to build now
- `docs/context/02_progress.md` - Track completion
- `RULES.md` - Security & quality rules

**Files You'll Reference:**
- `docs/context/01_architecture.md` - Technical design
- `docs/context/04_schema_contracts.md` - Zod schemas
- `rooted_master_prd_v2.md` - Product vision

**Scripts You'll Run:**
- `./scripts/security-check.sh` - Before every commit
- `./scripts/code-review.sh` - Before every commit
- `./scripts/sync-progress.sh` - After every commit

---

## 🎓 LEARNING PATH

**Week 1: Foundation**
- Complete Phase 1 (Database + API routes)
- Get comfortable with multi-agent workflow
- Memorize security rules

**Week 2-3: Visualizers**
- Build all 4 visualization types
- Learn D3.js basics
- Master scrollytelling

**Week 4+: Features**
- PWA setup
- Gamification (streaks)
- Share functionality

---

## 🚀 YOU ARE READY

**Your next steps:**

1. ✅ **Run Phase 1 Setup** (above)
2. ✅ **Complete First Task** (/api/word/today)
3. ✅ **Commit & Sync**
4. ✅ **Repeat Daily Loop**

**Remember:**
- Architect (Claude) **plans**
- Builder (Copilot) **implements**  
- Reviewer (Claude) **approves**
- You **integrate**

---

## 💬 NEED HELP?

**Stuck on something?**

1. Check `DEVELOPER_GUIDE.md` (comprehensive troubleshooting)
2. Ask Claude with full context:
   ```
   Context: {paste docs/context/01_architecture.md}
   Problem: {describe your issue}
   Error: {paste error message}
   
   Help me debug this following RULES.md
   ```

3. Review relevant section in `rooted_master_prd_v2.md`

---

**NOW GO BUILD.** 🌱

You have everything you need. The multi-agent system will keep you on track. Trust the process.

**First command:**
```bash
cd rooted-starter-kit
cat README.md
```

**Then follow Phase 1 above.** ⬆️

Good luck, Jigar! 🚀

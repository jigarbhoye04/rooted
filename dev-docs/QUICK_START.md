# ⚡ Quick Start (For Experienced Devs)

**Time to first commit:** 15 minutes

---

## Setup (5 minutes)

```bash
cd rooted-starter-kit
npm install
cp .env.example .env.local
# Add POSTGRES_URL="postgres://..." to .env.local
npm run db:migrate && npm run db:seed
npm run dev
```

---

## The Workflow (10 minutes per task)

```
1. ARCHITECT (Claude): Define task → current_task.md
2. BUILDER (Copilot): Write code → follow current_task.md
3. REVIEWER (Claude): Code review → ./scripts/code-review.sh
4. COMMIT: git commit -m "feat: ..."
```

---

## Daily Loop

```bash
# Morning
cat current_task.md

# Coding
code app/api/word/today/route.ts
# Let Copilot suggest (reads .github/copilot-instructions.md)

# Before commit
./scripts/security-check.sh
git add .
./scripts/code-review.sh
# Copy output to Claude → get approval

# Commit
git commit -m "feat: Add /api/word/today"
```

---

## Key Files

| File | Purpose |
|------|---------|
| `rooted_master_prd_v2.md` | Full product spec |
| `RULES.md` | Security rules (MEMORIZE) |
| `current_task.md` | Current micro-task |
| `docs/context/01_architecture.md` | Tech architecture |
| `docs/context/04_schema_contracts.md` | All Zod schemas |
| `.github/copilot-instructions.md` | Copilot constraints |

---

## Rules Summary

```typescript
// ✅ ALWAYS
- Parameterized SQL: sql`... ${param}`
- Validate with Zod: Schema.parse(data)
- Check method: if (request.method !== 'GET')
- Explicit types: function foo(): ReturnType

// ❌ NEVER
- String concat SQL: "SELECT * WHERE id = " + id
- `any` type: Use `unknown` + validate
- TODO comments: Implement or create issue
- Hardcoded secrets: Use process.env
```

---

## Security Checklist

```bash
# Run before every commit
./scripts/security-check.sh

# Checks:
# - SQL injection
# - Hardcoded secrets
# - Method validation
# - Weak hashing
# - XSS vulnerabilities
```

---

## Your First Task

```bash
# 1. Read task
cat current_task.md  # Implement /api/word/today

# 2. Create file
mkdir -p app/api/word/today
code app/api/word/today/route.ts

# 3. Copy template from current_task.md

# 4. Test
curl http://localhost:3000/api/word/today

# 5. Review & commit
./scripts/code-review.sh
git commit -m "feat: Add /api/word/today endpoint"
```

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run type-check       # TypeScript check
npm test                 # Run tests
npm run lint             # ESLint

# Security
./scripts/security-check.sh   # Security audit
./scripts/code-review.sh      # Generate review

# Database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed data
npm run db:reset         # Drop & recreate
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Copilot not following rules | Reload VS Code, add `// CRITICAL:` comments |
| DB connection failed | Check `POSTGRES_URL` in `.env.local` |
| Security check failing | Read error messages, fix specific lines |
| Code review rejecting | Re-read `RULES.md` and `current_task.md` |

---

## Architecture at a Glance

```typescript
// Database
daily_words {
  id, publish_date, word, definition,
  visualization_type: 'MAP' | 'TREE' | 'TIMELINE' | 'GRID',
  content_json: JSONB,
  accent_color, root_family
}

// API Routes
GET /api/word/today      → Today's word
GET /api/word/[slug]     → Word by slug

// Components
<Visualizer type="MAP" data={...} />
<MapVisualizer data={...} />
<TreeVisualizer data={...} />
<TimelineVisualizer data={...} />
<GridVisualizer data={...} />

// Validation (ALWAYS)
import { DailyWordSchema } from '@/schemas/dailyWord';
const validated = DailyWordSchema.parse(data);
```

---

## Multi-Agent System

```
ARCHITECT (Claude)
  ↓ Creates current_task.md
BUILDER (Copilot)
  ↓ Implements code
REVIEWER (Claude)
  ↓ Reviews via ./scripts/code-review.sh
YOU
  ↓ Commit & repeat
```

---

## Need More Details?

- **Full guide:** `DEVELOPER_GUIDE.md`
- **Product spec:** `rooted_master_prd_v2.md`
- **Tech architecture:** `docs/context/01_architecture.md`
- **All schemas:** `docs/context/04_schema_contracts.md`

---

**That's it. Now ship.** 🚀

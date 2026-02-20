# 🌱 Rooted - Starter Kit

**A multi-agent development system for building a daily etymology app**

This starter kit contains everything you need to build Rooted using an orchestrated workflow with AI agents (Architect, Builder, Reviewer).

---

## 📦 What's Included

### Core Documentation (10 Files)

1. **`rooted_master_prd_v2.md`** — Complete product requirements (read once)
2. **`DEVELOPER_GUIDE.md`** — **START HERE** — Complete onboarding guide
3. **`RULES.md`** — Non-negotiable engineering rules
4. **`current_task.md`** — Template for micro-tasks

### Context Files (`docs/context/`)

5. **`01_architecture.md`** — Technical architecture
6. **`02_progress.md`** — Phase-by-phase checklist
7. **`03_decisions.md`** — Architecture decision records
8. **`04_schema_contracts.md`** — All Zod schemas

### Automation Scripts (`scripts/`)

9. **`security-check.sh`** — Automated security audit
10. **`code-review.sh`** — Generate review requests

### Agent Configuration

11. **`.github/copilot-instructions.md`** — Copilot (Builder Agent) rules

### Example Code

12. **`src/schemas/dailyWord.ts`** — Example Zod schema implementation

---

## 🚀 Quick Start (3 Steps)

### Step 1: Read the Guide (10 minutes)

```bash
# Open the comprehensive developer guide
open DEVELOPER_GUIDE.md  # Mac
# or
xdg-open DEVELOPER_GUIDE.md  # Linux
# or just open it in VS Code
```

**This guide contains:**
- Prerequisites
- Quick setup instructions
- Day-to-day workflow
- Common tasks
- Troubleshooting

### Step 2: Setup Project (5 minutes)

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your Vercel Postgres URL to .env.local
# (See DEVELOPER_GUIDE.md for details)

# Initialize database
npm run db:migrate
npm run db:seed
```

### Step 3: Start Building (30 minutes)

```bash
# 1. Read your first task
cat current_task.md

# 2. Start dev server
npm run dev

# 3. Follow the workflow in DEVELOPER_GUIDE.md

# 4. Implement /api/word/today endpoint
# (Full instructions in current_task.md)
```

---

## 📚 File Structure

```
rooted-starter-kit/
├── 📖 README.md                     ← You are here
├── 📖 DEVELOPER_GUIDE.md            ← START HERE (comprehensive guide)
├── 📖 rooted_master_prd_v2.md       ← Full product spec
├── 📖 RULES.md                      ← Engineering rules
├── 📖 current_task.md               ← Your current task
│
├── 📁 docs/context/                 ← Living documentation
│   ├── 01_architecture.md
│   ├── 02_progress.md
│   ├── 03_decisions.md
│   └── 04_schema_contracts.md
│
├── 📁 scripts/                      ← Automation
│   ├── security-check.sh
│   └── code-review.sh
│
├── 📁 .github/
│   └── copilot-instructions.md      ← Copilot agent config
│
└── 📁 src/schemas/
    └── dailyWord.ts                 ← Example schema
```

---

## 🤖 The Multi-Agent System

This starter kit uses **3 AI agents** to help you ship faster:

### 1. Architect Agent (Claude)
- **Role:** Defines technical specs before coding
- **Input:** Feature request
- **Output:** Detailed `current_task.md` with schemas, tests, security rules
- **When:** Before every new feature

### 2. Builder Agent (GitHub Copilot)
- **Role:** Writes implementation code
- **Input:** `current_task.md` + context files
- **Output:** TypeScript/React code following all rules
- **When:** During implementation

### 3. Reviewer Agent (Claude)
- **Role:** Code review before commit
- **Input:** Git diff + security rules + tests
- **Output:** ✅ APPROVED or ❌ REJECTED with issues
- **When:** Before every commit

**See `DEVELOPER_GUIDE.md` for complete workflow.**

---

## 🎯 What You're Building

**Rooted** is a daily web app that presents one word per day with an interactive visualization of its etymology.

### Core Features

1. **Adaptive Visualizations** (4 types)
   - 🗺️ MAP — Geographic journey of words
   - 🌳 TREE — Etymology family tree
   - 📅 TIMELINE — Meaning evolution over time
   - 🔤 GRID — Cross-linguistic comparison

2. **Scrollytelling** — Scroll-triggered animations

3. **Gamification** — Streak tracking, badges, milestones

4. **PWA** — Installable, offline-first

5. **Wordception** — Ghost overlays for related words

**Full details in `rooted_master_prd_v2.md`**

---

## 🛠 Tech Stack

```
Frontend:  Next.js 14 + TypeScript + Tailwind + Framer Motion
Backend:   Next.js API Routes + Vercel Postgres
Viz:       D3.js + TopoJSON
Validation: Zod (runtime type safety)
Testing:   Jest + React Testing Library
Deploy:    Vercel (free tier)
```

---

## 📈 Development Phases

Check `docs/context/02_progress.md` for detailed task breakdown.

### Phase 0: Setup ✅ (Complete)
- Starter kit initialized
- Documentation complete
- Scripts ready

### Phase 1: Foundation (Week 1-2)
- Database schema
- `/api/word/today` endpoint
- Basic UI

### Phase 2: Visualizers (Week 3-4)
- MAP, TREE, TIMELINE, GRID components
- Static rendering

### Phase 3: Scrollytelling (Week 5-6)
- Scroll-triggered animations
- Story cards

### Phase 4-8: See `02_progress.md`

---

## 🔒 Security First

This kit includes automated security checks:

```bash
# Run before every commit
./scripts/security-check.sh

# Checks for:
# - SQL injection vulnerabilities
# - Hardcoded secrets
# - Missing method validation
# - Weak password hashing
# - XSS vulnerabilities
# - Type safety issues
```

**See `RULES.md` for all security rules.**

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Type check
npm run type-check

# Lint
npm run lint
```

**Rule:** Every API route and component MUST have tests.

---

## 📖 Key Documents to Read

### Read Once (Before Starting)
1. ✅ `README.md` (you are here)
2. ✅ `DEVELOPER_GUIDE.md` (comprehensive onboarding)
3. ✅ `rooted_master_prd_v2.md` (full product vision)

### Reference Frequently
4. 📖 `docs/context/01_architecture.md` (technical design)
5. 📖 `docs/context/04_schema_contracts.md` (Zod schemas)
6. 📖 `RULES.md` (especially security rules)

### Update After Each Task
7. ✏️ `docs/context/02_progress.md` (mark tasks complete)
8. ✏️ `current_task.md` (define next task)

---

## 🎓 Learning Resources

### Internal Docs
- **Full workflow:** `DEVELOPER_GUIDE.md` → "Day-to-Day Development"
- **Security rules:** `RULES.md` → "Security Rules"
- **Data schemas:** `docs/context/04_schema_contracts.md`

### External Docs
- **Next.js 14:** https://nextjs.org/docs
- **Zod:** https://zod.dev
- **D3.js:** https://d3js.org
- **Framer Motion:** https://www.framer.com/motion/

---

## 🐛 Troubleshooting

### "Copilot isn't following my rules!"
→ Reload VS Code window, add explicit comments

### "Database connection failed!"
→ Check `POSTGRES_URL` in `.env.local`

### "Security check failing!"
→ Read error messages, fix specific issues

### "Code review keeps rejecting!"
→ Re-read `RULES.md` and `current_task.md`

**Full troubleshooting guide in `DEVELOPER_GUIDE.md`**

---

## 🤝 Contributing

This is a solo dev project, but if you want to contribute:

1. **Follow the workflow** in `DEVELOPER_GUIDE.md`
2. **Run security checks** before committing
3. **Update context files** after changes
4. **Write tests** for all new features

---

## 📝 License

[Your license here]

---

## 🙏 Acknowledgments

- **Claude (Anthropic)** — Architect & Reviewer agents
- **GitHub Copilot** — Builder agent
- **Next.js Team** — Amazing framework
- **Vercel** — Free tier hosting

---

## 🚀 Ready to Start?

```bash
# 1. Read the guide
open DEVELOPER_GUIDE.md

# 2. Setup project
npm install
cp .env.example .env.local
# [Add your POSTGRES_URL]

# 3. Initialize database
npm run db:migrate
npm run db:seed

# 4. Start coding
npm run dev

# 5. Implement your first task
cat current_task.md
```

**Happy coding!** 🌱

---

**Questions?** See `DEVELOPER_GUIDE.md` → FAQ section

# 📋 Rooted Starter Kit - File Index

**Complete list of all files included in this package.**

---

## 📖 Core Documentation (5 files)

### 1. README.md
- **Purpose:** Main entry point, project overview
- **Read:** First (5 minutes)
- **Type:** Reference

### 2. DEVELOPER_GUIDE.md ⭐
- **Purpose:** Comprehensive onboarding guide with workflows, tutorials, troubleshooting
- **Read:** After README (30 minutes)
- **Type:** Tutorial + Reference
- **Sections:**
  - Prerequisites
  - Quick Start
  - System Architecture
  - Multi-Agent Workflow
  - Day-to-Day Development
  - Common Tasks
  - Troubleshooting
  - Best Practices
  - FAQ

### 3. QUICK_START.md
- **Purpose:** Ultra-condensed guide for experienced developers
- **Read:** Alternative to DEVELOPER_GUIDE if you're in a hurry (5 minutes)
- **Type:** Quick Reference

### 4. rooted_master_prd_v2.md ⭐
- **Purpose:** Complete product requirements document
- **Read:** Before starting development (1 hour)
- **Type:** Specification
- **Contents:**
  - Full product vision
  - All 4 visualization types explained
  - Data schemas (JSONB structure)
  - 8 development phases
  - 10 example words with complete JSON
  - Design system
  - Success metrics

### 5. RULES.md ⭐
- **Purpose:** Non-negotiable engineering and security rules
- **Read:** Memorize security section, reference for code quality rules
- **Type:** Reference
- **Critical Sections:**
  - Security Rules (SQL injection, XSS, auth, etc.)
  - Type Safety Rules (no `any`, explicit returns)
  - Code Quality Rules (DRY, SRP, naming)
  - Anti-Patterns (what NOT to do)

---

## 📁 Context Files (4 files)

Located in `docs/context/`

### 6. docs/context/01_architecture.md ⭐
- **Purpose:** Technical architecture distilled from PRD
- **Read:** Reference frequently during development
- **Type:** Technical Specification
- **Contents:**
  - Tech stack
  - Database schema (SQL + JSONB structure)
  - File structure
  - Security model
  - Data flow diagrams
  - Performance constraints

### 7. docs/context/02_progress.md
- **Purpose:** Phase-by-phase task checklist
- **Read:** Daily to check what's done and what's next
- **Type:** Living Document (update after each task)
- **Contents:**
  - 8 phases with detailed task breakdowns
  - Progress bars
  - Completion dates
  - Current focus indicator

### 8. docs/context/03_decisions.md
- **Purpose:** Architecture Decision Records (ADRs)
- **Read:** When you need to understand WHY a decision was made
- **Type:** Living Document (add entries when making architectural decisions)
- **Contents:**
  - 8 example ADRs (Next.js, Vercel Postgres, Zod, D3.js, etc.)
  - Template for adding new ADRs

### 9. docs/context/04_schema_contracts.md ⭐
- **Purpose:** All Zod schemas and TypeScript types in one place
- **Read:** Reference when working with data validation
- **Type:** Reference
- **Contents:**
  - DailyWordSchema (full)
  - MapVisualizationDataSchema
  - TreeVisualizationDataSchema
  - TimelineVisualizationDataSchema
  - GridVisualizationDataSchema
  - API response schemas
  - Component prop schemas
  - Custom validators

---

## 🤖 Agent Configuration (1 file)

### 10. .github/copilot-instructions.md ⭐
- **Purpose:** Constraints for GitHub Copilot (Builder Agent)
- **Read:** Copilot reads this automatically; you should read once to understand what Copilot knows
- **Type:** AI Agent Configuration
- **Contents:**
  - Security rules (what Copilot must enforce)
  - Code patterns (how Copilot should structure code)
  - Forbidden patterns (what Copilot must avoid)
  - Testing requirements
  - Documentation rules
  - Quality checklist

---

## 🔧 Automation Scripts (2 files)

Located in `scripts/`

### 11. scripts/security-check.sh ⭐
- **Purpose:** Automated security audit
- **Run:** Before every commit
- **Type:** Executable Script
- **Checks:**
  - SQL injection vulnerabilities
  - Hardcoded secrets
  - Missing method validation
  - Environment variable leaks
  - Weak password hashing
  - XSS vulnerabilities (dangerouslySetInnerHTML)
  - TODO comments
  - console.log statements
  - `any` types
  - Missing return types

### 12. scripts/code-review.sh ⭐
- **Purpose:** Generate code review request for Reviewer Agent
- **Run:** After staging changes, before commit
- **Type:** Executable Script
- **Generates:**
  - Markdown file with full context
  - Git diff
  - Architecture summary
  - Security rules
  - Current task
  - Automated security check results
  - TypeScript type check results
  - Review checklist

---

## 📝 Task Management (1 file)

### 13. current_task.md ⭐
- **Purpose:** Current micro-task definition
- **Read:** Before starting ANY coding
- **Type:** Living Document (replace after completing each task)
- **Contents:**
  - Objective
  - Requirements (functional + non-functional)
  - Implementation details
  - Code template
  - Testing requirements
  - Security checklist
  - Definition of Done

---

## 💻 Example Code (1 file)

Located in `src/schemas/`

### 14. src/schemas/dailyWord.ts
- **Purpose:** Complete example of Zod schema implementation
- **Read:** Reference when creating new schemas
- **Type:** Source Code (Example)
- **Contains:**
  - Main DailyWordSchema
  - Helper schemas (Update, Create, ListItem)
  - Utility functions (validate, validateSafe)
  - Custom validators (DateString, WordSlug)
  - JSDoc comments

---

## 📊 Summary

### Total Files: 14

**Must Read Before Starting (Priority 1):**
1. README.md
2. DEVELOPER_GUIDE.md (or QUICK_START.md)
3. rooted_master_prd_v2.md
4. RULES.md (security section)

**Reference Frequently (Priority 2):**
5. docs/context/01_architecture.md
6. docs/context/04_schema_contracts.md
7. current_task.md

**Update After Tasks (Priority 3):**
8. docs/context/02_progress.md
9. current_task.md

**Auto-Read by Tools (Priority 4):**
10. .github/copilot-instructions.md (Copilot)
11. scripts/security-check.sh (Git hooks)
12. scripts/code-review.sh (Manual trigger)

**Reference When Needed:**
13. docs/context/03_decisions.md (when making architectural decisions)
14. src/schemas/dailyWord.ts (when creating new schemas)

---

## 🎯 Recommended Reading Order

### For New Developers (Full Path)

**Day 0:**
1. README.md (5 min)
2. DEVELOPER_GUIDE.md (30 min)
3. rooted_master_prd_v2.md (60 min)

**Day 1:**
4. RULES.md → Security section (15 min)
5. docs/context/01_architecture.md (20 min)
6. current_task.md (10 min)
7. Start coding!

### For Experienced Developers (Fast Path)

**Immediate:**
1. README.md (5 min)
2. QUICK_START.md (5 min)
3. RULES.md → Security section (10 min)
4. current_task.md (5 min)
5. Start coding!

**Reference as needed:**
- rooted_master_prd_v2.md (for product context)
- docs/context/01_architecture.md (for tech details)
- docs/context/04_schema_contracts.md (for data schemas)

---

## 📥 What's NOT Included (Yet)

These will be created during development:

### App Code (Phase 1+)
- `app/` directory (Next.js app)
- `src/components/` (React components)
- `src/lib/` (utilities)
- `public/` (static assets)

### Tests (Phase 1+)
- `__tests__/` directory
- `*.test.ts` files

### Configuration (Phase 1+)
- `package.json` (created during npm init)
- `tsconfig.json` (Next.js auto-generates)
- `next.config.js`
- `.env.local` (you create from .env.example)

### Database (Phase 1+)
- Actual Vercel Postgres database
- Migrations (you write these)
- Seed data (you create this)

---

## 🔄 Files You'll Modify

**Frequently:**
- current_task.md (replace after each task)
- docs/context/02_progress.md (mark tasks complete)

**Occasionally:**
- docs/context/03_decisions.md (add ADRs when making decisions)
- docs/context/04_schema_contracts.md (add new schemas)

**Rarely:**
- .github/copilot-instructions.md (if Copilot makes repeated mistakes)
- RULES.md (only via ADR process)
- docs/context/01_architecture.md (only via ADR process)

**Never:**
- README.md
- DEVELOPER_GUIDE.md
- QUICK_START.md
- rooted_master_prd_v2.md

---

## 📦 Package Contents Verification

Check that you have all these files:

```bash
# Run this command to verify
ls -1

# Expected output:
# .github/
# docs/
# scripts/
# src/
# DEVELOPER_GUIDE.md
# FILE_INDEX.md
# QUICK_START.md
# README.md
# RULES.md
# current_task.md
# rooted_master_prd_v2.md
```

If anything is missing, re-download the package.

---

**Questions about any file?** See the corresponding entry above for its purpose and usage.

**Ready to start?** Begin with `README.md` → `DEVELOPER_GUIDE.md` → `current_task.md`

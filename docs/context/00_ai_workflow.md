# 00 - AI Model Workflow & Rules (STRICT)

**Project:** Rooted  
**Purpose:** This file is the **Constitution** for all AI models working on this repository.  
**Enforcement:** STRICT. Violations are considered critical failures.

---

## 🛑 MANDATORY: Pre-Work Checklist (READ FIRST)

Before writing a single line of code or answering a complex question, you **MUST** read these files to ground yourself in the current context:

1.  **`current_task.md`**: What are we doing *right now*? (This is your North Star).
2.  **`docs/context/02_progress.md`**: Where does this fit in the big picture?
3.  **`docs/context/01_architecture.md`**: How does the system work? (Don't hallucinate new patterns).
4.  **`docs/context/03_decisions.md`**: Why did we make past choices? (Don't suggest things we already rejected).
5.  **`dev-docs/RULES.md`**: What are the engineering standards? (Security, Types, etc.).

---

## ⚡ Execution Rules (DURING WORK)

1.  **Follow `dev-docs/RULES.md`**: No exceptions.
    - No SQL injection (Parameterize queries).
    - No `any` type (Use specific types or `unknown` + validation).
    - No secrets in client code.
    - No `dangerouslySetInnerHTML`.

2.  **Follow the Plan**:
    - Stick to the requirements in `current_task.md`.
    - Do not "scope creep" unless explicitly asked.

3.  **Atomic Changes**:
    - Focus on one task at a time.
    - Verify each step before moving to the next.

---

## ✅ MANDATORY: Post-Work Checklist (DEFINITION OF DONE)

**You are NOT done until you have performed these updates.**  
*If you skip these, you leave the repo in a broken state for the next session.*

### 1. Update Tracking
- [ ] **Update `current_task.md`**:
    - Mark completed items with `[x]`.
    - If the entire task is done, mark status as `✅ Complete`.
    - **CRITICAL:** clearly define the *next* task in the "Next Task" section.
- [ ] **Update `docs/context/02_progress.md`**:
    - check off completed high-level items.
    - Update progress bars (e.g., `[██░░░░░░░░] 20%`).
    - Run `./scripts/sync-progress.sh` to commit these changes (if applicable).

### 2. Update Documentation (If Applicable)
- [ ] **Did you change the Database Schema?**
    - Update `docs/context/01_architecture.md` (Schema section).
    - Update `docs/context/04_schema_contracts.md` (Zod schemas).
- [ ] **Did you add a new API Endpoint?**
    - Update `docs/context/01_architecture.md` (File Structure).
    - Update `docs/context/04_schema_contracts.md` (API responses).
- [ ] **Did you make an Architectural Decision?** (e.g., choosing a library, changing a pattern)
    - Create a new entry in `docs/context/03_decisions.md`.
    - Use the template provided in that file.

### 3. Verify Integrity
- [ ] **Run Type Check:** `npm run type-check` (or `tsc --noEmit`).
- [ ] **Run Tests:** `npm test` (if you touched code).
- [ ] **Run Lint:** `npm run lint`.

---

## 🧠 Memory Protocol (For Long-Term Context)

When summarising your work at the end of a session:
1.  **Be specific:** "Implemented /api/word/today" is better than "Worked on API".
2.  **Mention blockers:** "Blocked by missing X" helps the next session start faster.
3.  **Reference files:** "See ADR-009 for reasoning" is better than explaining it again.

---

**Last Updated:** 2026-02-14  
**Status:** ACTIVE & ENFORCED

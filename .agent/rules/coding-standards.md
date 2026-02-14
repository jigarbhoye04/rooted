---
trigger: always_on
---

# Coding Standards & AI Workflow Rules

This file defines the strict standards and workflow that **MUST** be followed by all AI models and developers working in this workspace.

---

## 🛑 AI Workflow: Mandatory Checklists

### Pre-Work Checklist (READ FIRST)
Before writing code or answering complex questions, you **MUST** read these files:
1.  **`current_task.md`**: The current objective.
2.  **`docs/context/02_progress.md`**: Overall project status.
3.  **`docs/context/01_architecture.md`**: System architecture.
4.  **`docs/context/03_decisions.md`**: Past architectural decisions.

### Post-Work Checklist (DEFINITION OF DONE)
**You are NOT done until you have performed these updates.**
1.  **Update `current_task.md`**: Mark items specific to your task as complete. Define the clear next step.
2.  **Update `docs/context/02_progress.md`**: Update progress bars and check off high-level items.
3.  **Update Documentation**: If you changed schema, API, or architecture, update the corresponding files in `docs/context/`.
4.  **Verify Integrity**: Run type checks, tests, and linting.
5.  **Run Scripts**: Run essential scripts in /scripts/* folder: security-check -> sync progress.
---

## 🔐 Engineering Rules (Non-Negotiable)

### Security
1.  **SQL Injection Prevention**: ALL database queries MUST use parameterized syntax (e.g., `sql` template literal with parameters).
2.  **Input Validation**: ALL external data MUST be validated with Zod before use.
3.  **No Secrets in Client**: NEVER expose server secrets (API keys, etc.) in client-side code.
4.  **XSS Prevention**: NEVER use `dangerouslySetInnerHTML` with user-generated content.
5.  **HTTPS Only**: All production traffic must use HTTPS.

### Type Safety (TypeScript)
1.  **No `any`**: Use `unknown` or specific types. Strictly enforced.
2.  **Explicit Return Types**: All functions must have explicit return types.
3.  **Strict Null Checks**: Must be enabled.

### Code Quality
1.  **No TODO Comments**: Implement immediately or create a GitHub issue. Do not leave `// TODO` in code.
2.  **Single Responsibility**: Functions should do one thing. Break up large functions.
3.  **Meaningful Names**: Use descriptive variable and function names.
4.  **DRY (Don't Repeat Yourself)**: Extract repeated logic into functions.

### Testing
1.  **Coverage**: Every API route and component must have tests.
2.  **Test Data**: Tests must use isolated test data, never production data.

### Architecture
1.  **File Naming**: 
    - Components: `PascalCase.tsx`
    - Utilities: `camelCase.ts`
    - API Routes: `route.ts`
2.  **Import Order**: External libs -> Internal utils -> Components -> Relative imports.
3.  **Component Structure**: Imports -> Types -> Component Definition (Validation -> Hooks -> Handlers -> Render).

### Performance
1.  **Lazy Loading**: Lazy load heavy components (>100kb).
2.  **Image Optimization**: Use Next.js `<Image />` component.

---

## 🚫 Anti-Patterns
- **Magic Numbers**: Use named constants.
- **Nested Ternaries**: Use `if/else` or helper functions for clarity.
- **Mutable Exports**: Use `const` for exports.
- **Side Effects in Render**: Use `useEffect`.

---

**Enforcement:** Strict. Violations are considered critical failures.

---
trigger: model_decision
description: Apply when: writing code, reviewing PRs, debugging, refactoring, adding features, or fixing bugs. Always run checklist before committing. Essential for all AI agents and developers touching the codebase.
---

# AI Agent Engineering Rules

**Philosophy**: Ship fast, sleep well, scale forever. Code is a liability—solve problems with minimum code.

---

## 🤖 Workflow

### Before Coding
**Read context files** (only what's relevant):
- `current_task.md` - always
- `docs/context/architecture.md` - always
- `docs/context/progress.md` - if multi-week project
- `docs/context/decisions.md` - if touching core systems
- `docs/context/api_contracts.md` - if API work
- `docs/context/data_models.md` - if DB work

**Answer these**:
1. What files will I modify?
2. What's my rollback plan?
3. How do I prove it works?
4. What docs need updating?

### Definition of Done
**Not done until ALL checked**:
```
Code:
[ ] npm run type-check (no errors)
[ ] npm run lint (no errors)  
[ ] No console.log, debugger, commented code

Security:
[ ] No hardcoded secrets
[ ] All inputs validated (Zod)
[ ] All queries parameterized
[ ] No eval(), dangerouslySetInnerHTML with user data

Docs:
[ ] current_task.md updated (status + next step)
[ ] docs/context/progress.md updated
[ ] API/schema changes documented
```

---

## 🔐 Security (CRITICAL)

### Input Validation
```typescript
// ❌ NEVER
const id = req.query.id;

// ✅ ALWAYS
const id = z.string().uuid().parse(req.query.id);
```
Validate: query params, body, headers, file uploads, env vars.

### SQL Injection
```typescript
// ❌ NEVER concatenate
db.query(`SELECT * FROM users WHERE id = ${id}`)

// ✅ ALWAYS parameterize
db.query(sql`SELECT * FROM users WHERE id = ${id}`)
```

### XSS Prevention
```typescript
// ❌ DANGEROUS
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ SAFE
<div>{userInput}</div>
```

### Auth Check Both
```typescript
// Must check BOTH authentication + authorization
if (req.user?.role === 'admin') { /* allowed */ }
```

### Secrets
- Never in git (use `.env` + `.gitignore`)
- Never in client bundle
- Use `process.env.VAR_NAME`
- Throw if missing: `if (!API_KEY) throw new Error(...)`

---

## 📘 Type Safety

### No `any` Without Comment
```typescript
// ❌ LAZY
function process(data: any) {}

// ✅ SPECIFIC
function process(data: User) {}

// ⚠️ OK (with reason)
function legacy(x: any) { // TODO: Type when API docs arrive
```

### Explicit Returns
```typescript
function calc(items: Item[]): number {
  return items.reduce((sum, i) => sum + i.price, 0);
}
```

### Strict Null Checks
Enable in `tsconfig.json`. Always handle null/undefined:
```typescript
return user?.name?.toUpperCase() ?? 'Anonymous';
```

---

## 🎨 Code Quality

### Single Responsibility
One function = one thing. If >50 lines or >4 indent levels, split it.

### DRY (Don't Repeat Yourself)
Copy-paste code = wrong. Extract to utility after 3rd use.

### Naming
| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `userProfile`, `isActive` |
| Constants | UPPER_SNAKE | `MAX_RETRIES` |
| Functions | camelCase + verb | `getUserById` |
| Components/Classes | PascalCase | `UserProfile` |
| Files (React) | PascalCase | `UserProfile.tsx` |
| Files (utils) | camelCase | `dateHelpers.ts` |

### Comment WHY Not WHAT
```typescript
// ❌ Useless
counter++; // Increment counter

// ✅ Useful
counter++; // Stripe webhooks arrive out of order, need idempotency
```

---

## 🧪 Testing

**Coverage targets**:
- Auth/payments: 95%+
- Business logic: 80%+
- API routes: 70%+
- Utils: 90%+

**Naming**: `describe [what] > it [should do] [when condition]`

**Isolated data**: Never use production data. Use test factories.

**Independent tests**: Each test must pass alone, in any order.

---

## ⚡ Performance

### No N+1 Queries
```typescript
// ❌ 101 queries
const users = await db.users.findMany();
for (const user of users) {
  user.posts = await db.posts.findMany({ where: { authorId: user.id }});
}

// ✅ 1 query
const users = await db.users.findMany({ include: { posts: true }});
```

### Optimization Checklist
- [ ] Index foreign keys + filter columns
- [ ] SELECT specific columns, not *
- [ ] Paginate (max 100/page)
- [ ] Lazy load heavy components (>100kb)
- [ ] Use Next.js `<Image />` component
- [ ] Memoize expensive calculations (useMemo)
- [ ] Cache frequently accessed data (Redis, 1-60min TTL)

---

## 🏗️ Architecture

### File Structure
```
src/
├── app/                    # Routes
│   └── api/users/route.ts
├── components/
│   ├── ui/                 # Generic (Button, Input)
│   └── features/           # Specific (UserProfile)
├── lib/                    # Utils, DB, auth
├── types/                  # Shared types
└── config/                 # Constants
```

### Import Order
```typescript
// 1. External
import { useState } from 'react';

// 2. Internal  
import { db } from '@/lib/db';

// 3. Types
import type { User } from '@/types';

// 4. Relative
import { helper } from './utils';
```

### Component Structure
```typescript
// 1. Imports
// 2. Types/interfaces
// 3. Constants
// 4. Component:
//    a. Validation
//    b. State hooks
//    c. Effect hooks  
//    d. Handlers
//    e. Render
```

### API Route Structure
```typescript
// 1. Schema (Zod)
// 2. GET handler (try/catch)
// 3. POST handler (validate → process → respond)
// Always: auth check, input validation, error handling
```

---

## 🚫 Anti-Patterns

- **Magic numbers**: Use named constants
- **Nested ternaries**: Use if/else or helper functions
- **God objects**: Separate concerns
- **Boolean blindness**: Use objects `{ isActive: true }` not `true, false`
- **TODO comments**: Do it now or create issue

---

## 📝 Error Handling

### API Errors
```typescript
try {
  // logic
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
  }
  if (error instanceof AuthError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  console.error('Unexpected error:', error);
  return NextResponse.json({ error: 'Internal error' }, { status: 500 });
}
```

### Client Errors
```typescript
// Show user-friendly messages
// Log technical details
// Never expose stack traces to users
```

---

## 🔄 Breaking Changes

**If your change breaks existing APIs/contracts**:
1. Version the API (`/api/v2/...`)
2. Document migration path
3. Set deprecation timeline
4. Update `docs/context/decisions.md`

---

## 📊 Performance Budgets

- **Page load**: <3s (first contentful paint)
- **API response**: <500ms (p95)
- **Database query**: <100ms (simple), <1s (complex)
- **Bundle size**: <200kb (initial JS)

---

**Token-efficient summary**: Read context → Code with security/types/quality → Test → Document → Done checklist. No shortcuts on security. Questions? Check docs first.
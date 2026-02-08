# RULES.md - Immutable Engineering Principles

**Project:** Rooted  
**Purpose:** Non-negotiable rules that MUST be followed by all developers (human and AI).

---

## 🔐 Security Rules (CRITICAL - NEVER VIOLATE)

### 1. SQL Injection Prevention

**Rule:** ALL database queries MUST use parameterized syntax.

```typescript
// ✅ CORRECT
const result = await sql`SELECT * FROM users WHERE email = ${email}`;

// ❌ FORBIDDEN (SQL injection vulnerability)
const query = `SELECT * FROM users WHERE email = '${email}'`;
const result = await sql(query);
```

**Why:** Prevents SQL injection attacks. A malicious user could input `' OR '1'='1` and access all records.

---

### 2. Input Validation

**Rule:** ALL external data MUST be validated with Zod before use.

```typescript
// ✅ CORRECT
export async function POST(request: Request) {
  const body = await request.json();
  const validated = InputSchema.parse(body); // Throws if invalid
  // Now safe to use validated data
}

// ❌ FORBIDDEN (trusting client input)
export async function POST(request: Request) {
  const body = await request.json();
  const result = await saveToDatabase(body); // What if body has extra/malicious fields?
}
```

**Why:** Prevents injection attacks, data corruption, and unexpected behavior.

---

### 3. Method Validation

**Rule:** ALL API routes MUST explicitly check the HTTP method.

```typescript
// ✅ CORRECT
export async function GET(request: Request) {
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }
  // ... handle GET
}

// ❌ FORBIDDEN (assuming method is correct)
export async function GET(request: Request) {
  // No check - what if someone sends POST to this endpoint?
}
```

**Why:** Prevents CSRF attacks and method confusion attacks.

---

### 4. Environment Variables

**Rule:** NEVER expose server secrets in client-side code.

```typescript
// ✅ CORRECT (server-side only)
// app/api/auth/route.ts
const secret = process.env.JWT_SECRET;

// ❌ FORBIDDEN (client-side)
// src/components/Login.tsx
const apiKey = process.env.API_KEY; // Exposed in browser bundle!
```

**Why:** Secrets exposed in client bundle can be extracted by anyone viewing the source.

**Exception:** Only `NEXT_PUBLIC_*` variables can be used in client components (and these should never contain secrets).

---

### 5. Password Hashing

**Rule:** Passwords MUST be hashed with bcrypt, minimum 12 rounds.

```typescript
// ✅ CORRECT
import bcrypt from 'bcryptjs';
const hash = await bcrypt.hash(password, 12);

// ❌ FORBIDDEN
const hash = password; // Storing plaintext
const hash = crypto.createHash('md5').update(password).digest('hex'); // MD5 is broken
const hash = await bcrypt.hash(password, 8); // Too few rounds (weak)
```

**Why:** bcrypt is designed to be slow (resistant to brute-force attacks). 12 rounds is the current recommended minimum.

---

### 6. XSS Prevention

**Rule:** NEVER use `dangerouslySetInnerHTML` with user-generated content.

```typescript
// ✅ CORRECT
<div>{userContent}</div> // React automatically escapes

// ❌ FORBIDDEN
<div dangerouslySetInnerHTML={{ __html: userContent }} /> // XSS vulnerability
```

**Why:** Allows attackers to inject malicious scripts (steal cookies, redirect users, etc.).

**Exception:** If you absolutely must render HTML, sanitize it first with DOMPurify.

---

### 7. HTTPS Only

**Rule:** ALL production traffic MUST use HTTPS (enforced by Vercel by default).

**Why:** Prevents man-in-the-middle attacks, session hijacking, and credential theft.

---

### 8. Rate Limiting (Future)

**Rule:** Public API endpoints SHOULD be rate-limited (not implemented in MVP, but design with this in mind).

**Why:** Prevents DDoS attacks and abuse.

---

## 🎯 Type Safety Rules

### 9. No `any` Type

**Rule:** NEVER use `any` type. Use `unknown` and validate.

```typescript
// ✅ CORRECT
function processData(data: unknown) {
  const validated = DataSchema.parse(data);
  return validated.field;
}

// ❌ FORBIDDEN
function processData(data: any) {
  return data.field; // No type checking!
}
```

**Why:** `any` disables TypeScript's type checking, defeating the purpose of using TypeScript.

---

### 10. Explicit Return Types

**Rule:** ALL functions MUST have explicit return types.

```typescript
// ✅ CORRECT
async function getUser(id: number): Promise<User | null> {
  const result = await sql`SELECT * FROM users WHERE id = ${id}`;
  return result.rows[0] ?? null;
}

// ❌ FORBIDDEN (implicit return type)
async function getUser(id: number) {
  const result = await sql`SELECT * FROM users WHERE id = ${id}`;
  return result.rows[0] ?? null; // What type is this?
}
```

**Why:** Explicit return types catch bugs at compile time and make code self-documenting.

---

### 11. Strict Null Checks

**Rule:** TypeScript strict mode MUST be enabled (`"strict": true` in tsconfig.json).

**Why:** Catches null/undefined errors at compile time instead of runtime.

---

## 📋 Code Quality Rules

### 12. No TODO Comments

**Rule:** NEVER commit code with `// TODO` comments.

```typescript
// ❌ FORBIDDEN
function authenticateUser() {
  // TODO: Add JWT validation
  return true;
}

// ✅ CORRECT (implement immediately)
function authenticateUser() {
  const token = getTokenFromCookie();
  return verifyJWT(token);
}

// ✅ ACCEPTABLE (create GitHub issue)
function authenticateUser() {
  // Not implemented yet - see issue #42
  throw new Error('Authentication not implemented');
}
```

**Why:** TODOs accumulate and are rarely addressed. Either implement immediately or create an issue.

---

### 13. Single Responsibility Principle

**Rule:** Functions SHOULD do one thing. If a function is > 50 lines, consider breaking it up.

```typescript
// ❌ BAD (does too much)
async function handleUserLogin(email: string, password: string) {
  const user = await findUser(email);
  const valid = await bcrypt.compare(password, user.hash);
  const token = jwt.sign({ id: user.id }, secret);
  await logLoginEvent(user.id);
  await sendWelcomeEmail(user.email);
  return token;
}

// ✅ GOOD (broken into smaller functions)
async function handleUserLogin(email: string, password: string) {
  const user = await authenticateUser(email, password);
  const token = await generateToken(user);
  await recordLoginEvent(user);
  return token;
}
```

---

### 14. Meaningful Names

**Rule:** Variable names MUST be descriptive. Avoid abbreviations.

```typescript
// ❌ BAD
const dt = new Date();
const usr = await getUsr(id);
const res = await fetch(url);

// ✅ GOOD
const currentDate = new Date();
const user = await getUser(id);
const response = await fetch(url);
```

---

### 15. DRY (Don't Repeat Yourself)

**Rule:** If you copy-paste code 3+ times, extract it into a function.

```typescript
// ❌ BAD (repeated validation)
const word1 = DailyWordSchema.parse(data1);
const word2 = DailyWordSchema.parse(data2);
const word3 = DailyWordSchema.parse(data3);

// ✅ GOOD (extracted function)
function validateWord(data: unknown): DailyWord {
  return DailyWordSchema.parse(data);
}

const word1 = validateWord(data1);
const word2 = validateWord(data2);
const word3 = validateWord(data3);
```

---

## 🧪 Testing Rules

### 16. Test Coverage

**Rule:** Every API route and component MUST have tests.

**Minimum coverage:**
- API routes: 1 test for 200 response, 1 test for 404, 1 test for 500
- Components: 1 test for successful render, 1 test for error state

---

### 17. Test Data

**Rule:** Tests MUST use isolated test data (not production data).

```typescript
// ✅ CORRECT
beforeEach(async () => {
  await seedTestDatabase();
});

afterEach(async () => {
  await clearTestDatabase();
});

// ❌ FORBIDDEN (using production database)
test('gets user', async () => {
  const user = await getUser(1); // What if prod user 1 doesn't exist?
});
```

---

## 📐 Architecture Rules

### 18. File Naming Conventions

**Rule:** Follow these naming patterns:

- **Components:** `PascalCase.tsx` (e.g., `MapVisualizer.tsx`)
- **Utilities:** `camelCase.ts` (e.g., `validators.ts`)
- **API routes:** `route.ts` (Next.js convention)
- **Tests:** `*.test.ts` or `*.test.tsx`
- **Schemas:** `camelCase.ts` (e.g., `dailyWord.ts`)

---

### 19. Import Order

**Rule:** Organize imports in this order:

1. External libraries (React, Next.js, etc.)
2. Internal utilities and types
3. Component imports
4. Relative imports

```typescript
// ✅ CORRECT
import { NextResponse } from 'next/server'; // External
import { neon } from '@neondatabase/serverless'; // External
import { DailyWordSchema } from '@/schemas/dailyWord'; // Internal
import { validateDate } from '@/lib/validators'; // Internal
import './styles.css'; // Relative
```

---

### 20. Component Structure

**Rule:** React components MUST follow this pattern:

```typescript
// 1. Imports
import { z } from 'zod';
import { ComponentPropsSchema } from '@/schemas/componentProps';

// 2. Types
type ComponentProps = z.infer<typeof ComponentPropsSchema>;

// 3. Component
export default function Component(props: ComponentProps) {
  // 3a. Validation (dev mode)
  if (process.env.NODE_ENV === 'development') {
    ComponentPropsSchema.parse(props);
  }
  
  // 3b. Hooks
  const [state, setState] = useState();
  
  // 3c. Handlers
  const handleClick = () => {};
  
  // 3d. Render
  return <div>{/* JSX */}</div>;
}
```

---

## 🚫 Anti-Patterns (FORBIDDEN)

### 21. Magic Numbers

```typescript
// ❌ FORBIDDEN
if (user.age > 18) { ... }

// ✅ CORRECT
const LEGAL_AGE = 18;
if (user.age > LEGAL_AGE) { ... }
```

---

### 22. Nested Ternaries

```typescript
// ❌ FORBIDDEN (unreadable)
const status = isActive ? isVerified ? 'active' : 'pending' : 'inactive';

// ✅ CORRECT
const status = getStatus(isActive, isVerified);

function getStatus(isActive: boolean, isVerified: boolean): string {
  if (!isActive) return 'inactive';
  if (!isVerified) return 'pending';
  return 'active';
}
```

---

### 23. Mutable Exports

```typescript
// ❌ FORBIDDEN
export let config = { apiKey: 'abc' };

// ✅ CORRECT
export const config = { apiKey: 'abc' } as const;
```

---

### 24. Side Effects in Rendering

```typescript
// ❌ FORBIDDEN (side effect in render)
function Component() {
  localStorage.setItem('rendered', 'true'); // Side effect!
  return <div>Hello</div>;
}

// ✅ CORRECT (use useEffect)
function Component() {
  useEffect(() => {
    localStorage.setItem('rendered', 'true');
  }, []);
  return <div>Hello</div>;
}
```

---

## 📚 Documentation Rules

### 25. Function Comments

**Rule:** Complex functions SHOULD have JSDoc comments.

```typescript
/**
 * Validates and returns the word scheduled for a given date.
 * 
 * @param date - Date in YYYY-MM-DD format
 * @returns The word object, or null if not found
 * @throws {ZodError} If the database returned invalid data
 */
async function getWordForDate(date: string): Promise<DailyWord | null> {
  // Implementation
}
```

---

### 26. Update Context After Changes

**Rule:** After completing a task, update `docs/context/02_progress.md`.

**Rule:** If you make an architectural decision, log it in `docs/context/03_decisions.md`.

---

## 🎯 Performance Rules

### 27. Lazy Loading

**Rule:** Components > 100kb SHOULD be lazy-loaded.

```typescript
// ✅ CORRECT
import dynamic from 'next/dynamic';
const HeavyVisualizer = dynamic(() => import('@/components/HeavyVisualizer'));
```

---

### 28. Image Optimization

**Rule:** ALL images MUST use Next.js Image component (not `<img>`).

```typescript
// ✅ CORRECT
import Image from 'next/image';
<Image src="/logo.png" width={100} height={100} alt="Logo" />

// ❌ FORBIDDEN
<img src="/logo.png" />
```

---

## 🔄 Git Rules

### 29. Commit Messages

**Rule:** Follow Conventional Commits format.

```
feat: Add MapVisualizer component
fix: Correct coordinate validation
docs: Update architecture decision records
chore: Update dependencies
test: Add tests for /api/word/today
```

---

### 30. Branch Names

**Rule:** Use descriptive branch names with prefixes.

```
feature/map-visualizer
bugfix/coordinate-validation
docs/architecture-updates
```

---

## ✅ Pre-Commit Checklist

Before every commit, verify:

- [ ] TypeScript compiles with no errors (`npm run type-check`)
- [ ] All tests pass (`npm test`)
- [ ] Security check passes (`./scripts/security-check.sh`)
- [ ] No `console.log` statements (except in error handlers)
- [ ] No `// TODO` comments
- [ ] Context files updated if necessary

---

## 🚨 When to Break Rules

**Short answer:** Almost never.

**Exceptions:**
- Security rules: NEVER break
- Type safety rules: Only in rare cases with explicit `// @ts-expect-error` comment and justification
- Code quality rules: Can be relaxed for prototypes (but must be fixed before production)

**If you must break a rule:**
1. Add a comment explaining why
2. Create a GitHub issue to fix it later
3. Document in `docs/context/03_decisions.md`

---

**Last Updated:** 2025-02-07  
**These rules are immutable unless explicitly updated in an ADR.**

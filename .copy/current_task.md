# Current Task

**Task ID:** TASK-001  
**Phase:** Phase 1 - Foundation  
**Created:** 2025-02-07  
**Status:** Not Started

---

## 🎯 Objective

Create the `/api/word/today` API endpoint that returns the word scheduled for the current date.

---

## 📋 Requirements

### Functional Requirements

1. **Endpoint:** `GET /api/word/today`
2. **Input:** None (uses current date automatically)
3. **Output:** 
   - **Success (200):** DailyWord object (validated with DailyWordSchema)
   - **Not Found (404):** `{ error: "No word scheduled for today" }`
   - **Server Error (500):** `{ error: "Data integrity error" }` (if schema validation fails)

### Non-Functional Requirements

1. **Security:** 
   - Validate HTTP method is GET
   - Use parameterized SQL queries
   - Validate database output with Zod
2. **Performance:** 
   - Should respond in < 100ms (database query is simple)
3. **Error Handling:** 
   - Catch Zod validation errors separately
   - Log errors to console (for debugging)

---

## 🔧 Implementation Details

### File to Create

**Path:** `app/api/word/today/route.ts`

### Database Query

```sql
SELECT * FROM daily_words 
WHERE publish_date = $1 
LIMIT 1
```

**Note:** Use `sql` tagged template, not string concatenation.

### Zod Schema to Use

Import from: `src/schemas/dailyWord.ts`

```typescript
import { DailyWordSchema } from '@/schemas/dailyWord';
```

### Expected Logic Flow

```
1. Validate request method === 'GET'
2. Get current date in YYYY-MM-DD format
3. Query database for that date
4. If no rows found → return 404
5. Validate row with DailyWordSchema.parse()
6. If validation fails → return 500
7. Return validated data as JSON
```

---

## 📝 Code Template (Starter)

```typescript
// app/api/word/today/route.ts

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { DailyWordSchema } from '@/schemas/dailyWord';

export async function GET(request: Request): Promise<NextResponse> {
  // Step 1: Validate HTTP method
  if (request.method !== 'GET') {
    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    );
  }

  try {
    // Step 2: Get current date
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Step 3: Query database
    const result = await sql`
      SELECT * FROM daily_words
      WHERE publish_date = ${today}
      LIMIT 1
    `;

    // Step 4: Check if word exists
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'No word scheduled for today' },
        { status: 404 }
      );
    }

    // Step 5: Validate with Zod
    const validated = DailyWordSchema.parse(result.rows[0]);

    // Step 6: Return validated data
    return NextResponse.json(validated);

  } catch (error) {
    // Step 7: Handle errors
    if (error instanceof z.ZodError) {
      console.error('Schema validation failed:', error.errors);
      return NextResponse.json(
        { error: 'Data integrity error' },
        { status: 500 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 🧪 Testing Requirements

### Manual Testing

1. **Seed database** with a word for today's date
2. **Start dev server:** `npm run dev`
3. **Test with curl:**
   ```bash
   curl http://localhost:3000/api/word/today
   ```
4. **Verify response** is valid JSON matching DailyWordSchema

### Unit Tests to Write

**File:** `__tests__/api/word/today.test.ts`

```typescript
import { describe, it, expect } from '@jest/globals';

describe('GET /api/word/today', () => {
  it('returns 200 with valid word when one is scheduled', async () => {
    // Seed test database
    await seedTestWord({ date: '2025-02-07', word: 'Test' });
    
    const response = await fetch('http://localhost:3000/api/word/today');
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.word).toBe('Test');
  });

  it('returns 404 when no word is scheduled', async () => {
    // Clear test database
    await clearTestDatabase();
    
    const response = await fetch('http://localhost:3000/api/word/today');
    expect(response.status).toBe(404);
    
    const data = await response.json();
    expect(data.error).toBe('No word scheduled for today');
  });

  it('returns 500 when database data fails schema validation', async () => {
    // Seed invalid data (missing required field)
    await seedInvalidWord({ date: '2025-02-07' });
    
    const response = await fetch('http://localhost:3000/api/word/today');
    expect(response.status).toBe(500);
  });
});
```

---

## 🔒 Security Checklist

- [x] HTTP method validated?
- [x] SQL query parameterized?
- [x] Output validated with Zod?
- [x] Error messages don't leak sensitive info?
- [ ] (N/A) User input sanitized? (No user input in this endpoint)

---

## 📊 Definition of Done

- [x] Code written following template above
- [ ] TypeScript compiles with no errors
- [ ] Manual test passes (returns valid word)
- [ ] Unit tests written and passing
- [ ] Security checklist complete
- [ ] `docs/context/02_progress.md` updated (mark task as complete)
- [ ] Code committed to git with message: `feat: Add /api/word/today endpoint`

---

## 🔗 Related Files

**Must Read Before Starting:**
- `docs/context/01_architecture.md` - Database schema
- `docs/context/04_schema_contracts.md` - DailyWordSchema definition
- `RULES.md` - Security and code quality rules

**Will Create:**
- `app/api/word/today/route.ts`
- `__tests__/api/word/today.test.ts`

**Will Modify:**
- `docs/context/02_progress.md` (mark Phase 1 task as complete)

---

## 💡 Hints for Builder Agent (Copilot)

1. Start by copying the code template above
2. Make sure to import all required dependencies
3. Don't skip error handling (even if it seems verbose)
4. The date format MUST be `YYYY-MM-DD` (ISO 8601)
5. Use `DailyWordSchema.parse()`, not `.safeParse()` (we want it to throw)

---

## ❓ Questions / Uncertainties

**Q:** Should we use the user's timezone or UTC for "today"?  
**A:** Use user's local timezone (convert on client if needed). For MVP, use server timezone.

**Q:** What if there are multiple words scheduled for the same date?  
**A:** Should never happen (publish_date is UNIQUE). Query adds `LIMIT 1` as safety.

**Q:** Should we cache the response?  
**A:** Not in MVP. Can add caching later if needed.

---

## 🚀 Next Task (After This One)

After completing this task, the next task will be:

**TASK-002:** Create `/api/word/[slug]` endpoint (fetch word by slug instead of date)

---

**Last Updated:** 2025-02-07  
**Status:** Ready for implementation

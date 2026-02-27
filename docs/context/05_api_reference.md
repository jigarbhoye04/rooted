# Rooted API Reference

This document provides a detailed reference for all public-facing API routes in the Rooted application. All endpoints return JSON and are secured via Next.js Proxy (`proxy.ts`), featuring rate limiting and standard security headers.

## Global Headers & Security

**Security Headers (All Responses):**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

**Rate Limiting:**
- **Public API:** 60 requests / minute per IP.
- **Admin API:** 20 requests / minute per IP.
- Exceeding limits returns a `429 Too Many Requests` with a `Retry-After` header indicating when limits reset. Rate limit state is exposed via `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers.

---

## Endpoints

### 1. Get Today's Word
Retrieves the full word data scheduled for the current date (or a specific historical date).

**Endpoint:** `GET /api/word/today`

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `date` | `string` | No | Server's Current Date | Fetch a word for a specific date. Must be in `YYYY-MM-DD` format. Future dates return a `400` error. |

**Caching:** 
- `Cache-Control: public, s-maxage=300, stale-while-revalidate=600` (5 minutes)
- Backed by an in-memory DB caching layer (LRU cache, 5-minute TTL, max 10 entries) to prevent redundant database queries during traffic bursts.

**Responses:**
- `200 OK`: Returns a `DailyWord` JSON object.
- `400 Bad Request`: Invalid date format or request for a future date.
- `404 Not Found`: No word scheduled for the requested date.
- `500 Internal Server Error`: Structural anomaly found (DB payload failed Zod validation).

---

### 2. Get Word History
Retrieves a lightweight list of recent words filtered by visualization type. Used primarily for "Smart History" navigation (e.g., "See previous Map").

**Endpoint:** `GET /api/word/history`

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `type` | `string` | **Yes** | - | Filters by visualization type: `MAP`, `TREE`, `TIMELINE`, `GRID`. |
| `limit` | `number` | No | `10` | Number of records to return. Max: `50`. |
| `before` | `string` | No | Server's Current Date | Only return words published on or before this date (`YYYY-MM-DD`). |

**Caching:** 
- `Cache-Control: public, s-maxage=3600, stale-while-revalidate=7200` (1 hour)

**Responses:**
- `200 OK`: Returns an array of historical summaries.
  ```json
  [
    {
      "date": "2026-02-19",
      "word": "Sabotage",
      "slug": "sabotage"
    }
  ]
  ```
- `400 Bad Request`: Missing or invalid parameters (e.g., incorrect `type` or malformed `before` date).

---

### 3. Get Word by Slug
Retrieves the full word data by searching for a specific URL-safe word slug (e.g., `sabotage`).

**Endpoint:** `GET /api/word/[slug]`

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `slug` | `string` | **Yes** | The URL-safe slug of the word. Must contain only lowercase letters, numbers, and hyphens. |

**Caching:** 
- `Cache-Control: public, s-maxage=86400, stale-while-revalidate=172800` (24 hours)
- Historical word endpoints are aggressively cached as past records are largely immutable.

**Responses:**
- `200 OK`: Returns a `DailyWord` JSON object.
- `400 Bad Request`: Invalid slug format (failed Zod check).
- `404 Not Found`: No word matches the provided slug.

---

## Data Models

### `DailyWord` Object
The core data structure representing a daily word, returned by both the `today` and `[slug]` endpoints.

```typescript
{
  "id": number,
  "publish_date": string,             // Scheduled appearance date (YYYY-MM-DD)
  "word": string,                     // The string matching the word (e.g., "Sabotage")
  "definition": string,               // Dictionary definition
  "phonetic": string | null,          // Text pronunciation (e.g., "/ˈsæbətɑːʒ/")
  "pronunciation_audio_url": string | null,
  "visualization_type": "MAP" | "TREE" | "TIMELINE" | "GRID",
  "content_json": {
    "hook": string,                   // One-sentence teaser snippet
    "fun_fact": string,               // "Did you know?" text
    "nerd_mode"?: {                   // Optional deep dive content (unlocked UI)
      "ipa_full"?: string,
      "disputed_origin"?: string,
      "earliest_citation"?: string
    },
    "visual_data": object             // Strongly typed structure matching visualization_type
  },
  "accent_color": string,             // Hex theme color (e.g., "#FF5733")
  "created_at": string | null,        // ISO 8601 datetime
  "approved_by": string | null,       // Editor stamp
  "root_family": string | null        // Wordception index entry
}
```

### Error Responses
All API error responses follow a standard `{ error, code }` schema output:

```json
{
  "error": "Human readable, user-facing error message",
  "code": "RATE_LIMITED" // Optional specific internal code mapping
}
```

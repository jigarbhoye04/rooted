/**
 * Next.js Proxy — Security Headers & Rate Limiting
 *
 * Runs on every matched request before it hits the route handler.
 * Adds security headers and implements basic rate limiting for API routes.
 */

import { NextResponse, type NextRequest } from 'next/server';

/* ========================================
   Rate Limiter (In-Memory Token Bucket)
   ======================================== */

interface RateLimitEntry {
    tokens: number;
    lastRefill: number;
}

const RATE_LIMIT_MAP = new Map<string, RateLimitEntry>();

interface RateLimitConfig {
    maxTokens: number;
    refillRate: number;
    windowMs: number;
}

const RATE_LIMITS: Record<'public' | 'admin', RateLimitConfig> = {
    public: { maxTokens: 60, refillRate: 60, windowMs: 60_000 },
    admin: { maxTokens: 20, refillRate: 20, windowMs: 60_000 },
};

// Cleanup stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 300_000;
let lastCleanup = Date.now();

function cleanupStaleEntries(): void {
    const now = Date.now();
    if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
    lastCleanup = now;

    const cutoff = now - 120_000; // Remove entries older than 2 minutes
    for (const [key, entry] of RATE_LIMIT_MAP) {
        if (entry.lastRefill < cutoff) {
            RATE_LIMIT_MAP.delete(key);
        }
    }
}

function checkRateLimit(
    key: string,
    config: RateLimitConfig
): { allowed: boolean; remaining: number; resetMs: number } {
    cleanupStaleEntries();

    const now = Date.now();
    const entry = RATE_LIMIT_MAP.get(key);

    if (!entry) {
        RATE_LIMIT_MAP.set(key, { tokens: config.maxTokens - 1, lastRefill: now });
        return { allowed: true, remaining: config.maxTokens - 1, resetMs: config.windowMs };
    }

    // Refill tokens based on elapsed time
    const elapsed = now - entry.lastRefill;
    const refill = Math.floor((elapsed / config.windowMs) * config.refillRate);

    if (refill > 0) {
        entry.tokens = Math.min(config.maxTokens, entry.tokens + refill);
        entry.lastRefill = now;
    }

    if (entry.tokens <= 0) {
        const resetMs = Math.ceil(
            ((1 / config.refillRate) * config.windowMs) - (now - entry.lastRefill)
        );
        return { allowed: false, remaining: 0, resetMs: Math.max(resetMs, 1000) };
    }

    entry.tokens -= 1;
    return { allowed: true, remaining: entry.tokens, resetMs: config.windowMs };
}

/* ========================================
   Security Headers
   ======================================== */

const SECURITY_HEADERS: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
};

/* ========================================
   Proxy
   ======================================== */

export function proxy(request: NextRequest): NextResponse {
    const { pathname } = request.nextUrl;
    const response = NextResponse.next();

    // Apply security headers to all responses
    for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
        response.headers.set(header, value);
    }

    // Rate limiting for API routes only
    if (pathname.startsWith('/api/')) {
        // Get client IP (Vercel provides x-forwarded-for, fallback to 'anonymous')
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            ?? request.headers.get('x-real-ip')
            ?? 'anonymous';

        const isAdmin = pathname.startsWith('/api/admin');
        const config = isAdmin ? RATE_LIMITS.admin : RATE_LIMITS.public;
        const rateLimitKey = `${ip}:${isAdmin ? 'admin' : 'public'}`;

        const { allowed, remaining, resetMs } = checkRateLimit(rateLimitKey, config);

        // Add standard rate limit headers
        response.headers.set('X-RateLimit-Limit', String(config.maxTokens));
        response.headers.set('X-RateLimit-Remaining', String(remaining));
        response.headers.set('X-RateLimit-Reset', String(Math.ceil(resetMs / 1000)));

        if (!allowed) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.', code: 'RATE_LIMITED' },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(Math.ceil(resetMs / 1000)),
                        ...SECURITY_HEADERS,
                        'X-RateLimit-Limit': String(config.maxTokens),
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset': String(Math.ceil(resetMs / 1000)),
                    },
                }
            );
        }
    }

    return response;
}

/* ========================================
   Route Matcher — skip static assets, _next internals, and fonts
   ======================================== */

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico (favicon)
         * - public folder assets (fonts, topojson, etc.)
         */
        '/((?!_next/static|_next/image|favicon\\.ico|fonts/|topojson/).*)',
    ],
};

module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/schemas/dailyWord.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DailyWordCreateSchema",
    ()=>DailyWordCreateSchema,
    "DailyWordListItemSchema",
    ()=>DailyWordListItemSchema,
    "DailyWordSchema",
    ()=>DailyWordSchema,
    "DailyWordUpdateSchema",
    ()=>DailyWordUpdateSchema,
    "DateStringSchema",
    ()=>DateStringSchema,
    "WordSlugSchema",
    ()=>WordSlugSchema,
    "validateDailyWord",
    ()=>validateDailyWord,
    "validateDailyWordSafe",
    ()=>validateDailyWordSafe
]);
/**
 * Zod schema for DailyWord database table
 * 
 * This file defines the contract between:
 * - Database → API
 * - API → Client
 * 
 * IMPORTANT: This schema MUST match the database table structure.
 * See: docs/context/01_architecture.md for SQL schema
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
;
const DailyWordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    // Primary key
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive(),
    // Date when this word is scheduled to appear
    // Format: YYYY-MM-DD (ISO 8601 date string)
    publish_date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    // The word itself (e.g., "Sabotage")
    word: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Word cannot be empty').max(100),
    // Dictionary definition
    definition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Definition cannot be empty'),
    // Phonetic pronunciation (e.g., "/ˈsæbətɑːʒ/")
    phonetic: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(100).nullable().optional(),
    // Optional audio pronunciation URL (e.g., link to Forvo)
    pronunciation_audio_url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().nullable().optional(),
    // Visualization type determines which visualizer component to use
    visualization_type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'MAP',
        'TREE',
        'TIMELINE',
        'GRID'
    ]),
    // Main content (JSONB field in database)
    // Structure varies based on visualization_type
    // See: docs/context/04_schema_contracts.md for type-specific schemas
    content_json: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        // One-sentence teaser shown at top of page
        hook: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Hook cannot be empty'),
        // "Did you know?" section content
        fun_fact: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Fun fact cannot be empty'),
        // Optional deep dive content (unlocked with Nerd Mode)
        nerd_mode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            ipa_full: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
            disputed_origin: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
            earliest_citation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
        }).optional(),
        // Type-specific visualization data
        // Validated separately based on visualization_type
        // We use z.any() here because the structure varies
        visual_data: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()
    }),
    // Theme color for this word (hex color code)
    // Used for scroll indicators, map routes, tree links
    accent_color: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^#[0-9A-Fa-f]{6}$/, 'Accent color must be a valid hex code (e.g., #FF5733)').default('#000000'),
    // Timestamp when word was created (ISO 8601 datetime)
    created_at: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable().optional(),
    // Name of admin who approved this word
    approved_by: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50).nullable().optional(),
    // Root family for Wordception feature
    // e.g., "PIE_kaput" for words derived from Latin "caput"
    // Used to find related words for ghost overlay
    root_family: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50).nullable().optional()
});
const DailyWordUpdateSchema = DailyWordSchema.partial().omit({
    id: true
}).strict();
const DailyWordCreateSchema = DailyWordSchema.omit({
    id: true,
    created_at: true
}).strict();
const DailyWordListItemSchema = DailyWordSchema.pick({
    id: true,
    publish_date: true,
    word: true,
    visualization_type: true
});
function validateDailyWord(data) {
    return DailyWordSchema.parse(data);
}
function validateDailyWordSafe(data) {
    return DailyWordSchema.safeParse(data);
}
const DateStringSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format').refine((date)=>{
    const parsed = Date.parse(date);
    return !isNaN(parsed);
}, {
    message: 'Date must be a valid date'
});
const WordSlugSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(100).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens');
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTodayDateString",
    ()=>getTodayDateString,
    "getWordByDate",
    ()=>getWordByDate,
    "getWordBySlug",
    ()=>getWordBySlug
]);
/**
 * Database Helper
 * 
 * Provides typed wrappers around @neondatabase/serverless for safe database operations.
 * All queries use parameterized statements to prevent SQL injection.
 * 
 * Migration note: This uses @neondatabase/serverless as the recommended replacement
 * for the deprecated @vercel/postgres package.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/serverless/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$schemas$2f$dailyWord$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/schemas/dailyWord.ts [app-route] (ecmascript)");
;
;
// Initialize Neon client with connection string from environment
const sql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(process.env.DATABASE_URL);
async function getWordByDate(date) {
    const result = await sql`
    SELECT 
      id,
      publish_date::text,
      word,
      definition,
      phonetic,
      pronunciation_audio_url,
      visualization_type,
      content_json,
      accent_color,
      created_at::text,
      approved_by,
      root_family
    FROM daily_words
    WHERE publish_date = ${date}
    LIMIT 1
  `;
    if (result.length === 0) {
        return null;
    }
    // Validate database output with Zod (throws on failure)
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$schemas$2f$dailyWord$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DailyWordSchema"].parse(result[0]);
}
async function getWordBySlug(slug) {
    const result = await sql`
    SELECT 
      id,
      publish_date::text,
      word,
      definition,
      phonetic,
      pronunciation_audio_url,
      visualization_type,
      content_json,
      accent_color,
      created_at::text,
      approved_by,
      root_family
    FROM daily_words
    WHERE LOWER(word) = LOWER(${slug})
    ORDER BY publish_date DESC
    LIMIT 1
  `;
    if (result.length === 0) {
        return null;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$schemas$2f$dailyWord$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DailyWordSchema"].parse(result[0]);
}
function getTodayDateString() {
    return new Date().toISOString().split('T')[0];
}
}),
"[project]/src/schemas/apiResponses.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommonErrors",
    ()=>CommonErrors,
    "ErrorResponseSchema",
    ()=>ErrorResponseSchema,
    "NotFoundErrors",
    ()=>NotFoundErrors
]);
/**
 * API Response Schemas
 * 
 * Defines standardized response formats for all API endpoints.
 * See: docs/context/04_schema_contracts.md
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
;
const ErrorResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Error message is required'),
    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    details: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any().optional()
});
const CommonErrors = {
    NOT_FOUND: {
        error: 'Resource not found'
    },
    METHOD_NOT_ALLOWED: {
        error: 'Method not allowed'
    },
    INTERNAL_ERROR: {
        error: 'Internal server error'
    },
    VALIDATION_ERROR: {
        error: 'Data integrity error'
    },
    UNAUTHORIZED: {
        error: 'Unauthorized'
    }
};
const NotFoundErrors = {
    WORD_NOT_FOUND: {
        error: 'No word scheduled for today',
        code: 'WORD_NOT_FOUND'
    },
    SLUG_NOT_FOUND: {
        error: 'Word not found',
        code: 'SLUG_NOT_FOUND'
    }
};
}),
"[project]/app/api/word/today/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
/**
 * GET /api/word/today
 * 
 * Returns the word scheduled for the current date.
 * 
 * Responses:
 * - 200: DailyWord object
 * - 404: No word scheduled for today
 * - 500: Data integrity error (schema validation failed)
 * 
 * Security:
 * - Uses parameterized SQL queries
 * - Validates database output with Zod
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$schemas$2f$apiResponses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/schemas/apiResponses.ts [app-route] (ecmascript)");
;
;
;
;
async function GET() {
    try {
        // Get current date in YYYY-MM-DD format
        const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTodayDateString"])();
        // Query database for today's word
        const word = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWordByDate"])(today);
        // Check if word exists for today
        if (!word) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$schemas$2f$apiResponses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NotFoundErrors"].WORD_NOT_FOUND, {
                status: 404
            });
        }
        // Return validated word data
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(word);
    } catch (error) {
        // Handle Zod validation errors (database returned invalid data)
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            console.error('Schema validation failed:', error.issues);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$schemas$2f$apiResponses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CommonErrors"].VALIDATION_ERROR, {
                status: 500
            });
        }
        // Handle unexpected errors
        console.error('Unexpected error in /api/word/today:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$schemas$2f$apiResponses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CommonErrors"].INTERNAL_ERROR, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8880307e._.js.map
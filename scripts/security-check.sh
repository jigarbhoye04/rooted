#!/bin/bash

# scripts/security-check.sh
# Automated security audit for Rooted project
# Run this before every commit

set -e  # Exit on first error

echo "🔒 Running Security Audit..."
echo ""

ERRORS=0
WARNINGS=0

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Helper functions
error() {
    echo -e "${RED}❌ FAIL:${NC} $1"
    ERRORS=$((ERRORS + 1))
}

warning() {
    echo -e "${YELLOW}⚠️  WARN:${NC} $1"
    WARNINGS=$((WARNINGS + 1))
}

success() {
    echo -e "${GREEN}✅ PASS:${NC} $1"
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "CHECK 1: SQL Injection Prevention"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for string concatenation in SQL queries
if grep -rn --include="*.ts" --include="*.tsx" \
    -E "(sql\`.*\\\$\{[^}]*\}.*\`)|(\`SELECT.*\+)|(\`INSERT.*\+)|(\`UPDATE.*\+)|(\`DELETE.*\+)" \
    app/ src/ 2>/dev/null | grep -v "sql\\\`.*\\\$\{sql" | grep -v "//"; then
    error "Potential SQL injection detected (string concatenation in query)"
else
    success "No SQL injection vulnerabilities detected"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "CHECK 2: Hardcoded Secrets"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for hardcoded passwords, API keys, etc.
if grep -rn --include="*.ts" --include="*.tsx" \
    -iE "(password|api_key|secret|token)\s*=\s*['\"][^'\"]+['\"]" \
    app/ src/ 2>/dev/null | \
    grep -v "process.env" | \
    grep -v "// " | \
    grep -v "type " | \
    grep -v "interface " | \
    grep -v "\.test\." | \
    grep -v "PASSWORD_MIN_LENGTH" | \
    grep -v "example" | \
    grep -v "placeholder"; then
    error "Hardcoded secrets detected"
else
    success "No hardcoded secrets found"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "CHECK 3: Method Validation in API Routes"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if API routes validate request method
API_ROUTES=$(find app/api -name "route.ts" 2>/dev/null)
ROUTES_WITHOUT_METHOD_CHECK=""

for route in $API_ROUTES; do
    if ! grep -q "request.method" "$route"; then
        ROUTES_WITHOUT_METHOD_CHECK="$ROUTES_WITHOUT_METHOD_CHECK\n  - $route"
    fi
done

if [ -n "$ROUTES_WITHOUT_METHOD_CHECK" ]; then
    error "API routes missing method validation:$ROUTES_WITHOUT_METHOD_CHECK"
else
    success "All API routes validate request method"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "CHECK 4: Environment Variables in Client"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for process.env in client components
if grep -rn --include="*.tsx" \
    "process.env" \
    src/components/ 2>/dev/null | \
    grep -v "NEXT_PUBLIC_" | \
    grep -v "// " | \
    grep -v "NODE_ENV"; then
    error "Server environment variables used in client components"
else
    success "No server env vars leaked to client"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "CHECK 5: Weak Password Hashing"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for weak hashing (MD5, SHA1, or bcrypt with <12 rounds)
if grep -rn --include="*.ts" --include="*.tsx" \
    -E "(createHash\(['\"]md5|createHash\(['\"]sha1|bcrypt\.hash\(.*,\s*[0-9]\))" \
    app/ src/ 2>/dev/null | grep -v "// "; then
    error "Weak password hashing detected (use bcrypt with 12+ rounds)"
else
    success "No weak password hashing detected"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "CHECK 6: Dangerous HTML Rendering"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for dangerouslySetInnerHTML usage
if grep -rn --include="*.tsx" \
    "dangerouslySetInnerHTML" \
    src/components/ app/ 2>/dev/null | grep -v "// "; then
    warning "dangerouslySetInnerHTML detected (ensure content is sanitized)"
else
    success "No dangerous HTML rendering detected"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "CHECK 7: TODO Comments"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for TODO comments (code quality issue)
if grep -rn --include="*.ts" --include="*.tsx" \
    "// TODO" \
    app/ src/ 2>/dev/null; then
    warning "TODO comments found (should be GitHub issues)"
else
    success "No TODO comments found"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "CHECK 8: Console.log Statements"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for console.log (should use console.error for errors only)
if grep -rn --include="*.ts" --include="*.tsx" \
    "console\.log" \
    app/ src/ 2>/dev/null | \
    grep -v "\.test\." | \
    grep -v "// "; then
    warning "console.log statements found (use console.error for errors only)"
else
    success "No console.log statements found"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "CHECK 9: TypeScript 'any' Type"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for 'any' type usage (type safety issue)
if grep -rn --include="*.ts" --include="*.tsx" \
    ": any" \
    app/ src/ 2>/dev/null | \
    grep -v "\.test\." | \
    grep -v "// @ts-expect-error" | \
    grep -v "z.any()" | \
    grep -v "// "; then
    warning "'any' type usage detected (use 'unknown' and validate)"
else
    success "No 'any' types detected"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "CHECK 10: Missing Return Types"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for functions without explicit return types
# (This is a simplified check - TypeScript compiler is more accurate)
if grep -rn --include="*.ts" \
    -E "^(export )?(async )?function [a-zA-Z_][a-zA-Z0-9_]*\([^)]*\)\s*\{" \
    app/ src/ 2>/dev/null | \
    grep -v ": " | \
    grep -v "\.test\."; then
    warning "Functions without explicit return types detected"
else
    success "All functions have explicit return types"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}❌ FAILED${NC} - $ERRORS critical error(s) found"
    echo ""
    echo "Fix these errors before committing!"
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️  PASSED WITH WARNINGS${NC} - $WARNINGS warning(s) found"
    echo ""
    echo "Consider fixing these warnings before committing."
    exit 0
else
    echo -e "${GREEN}✅ ALL CHECKS PASSED${NC}"
    echo ""
    echo "Your code is secure and ready to commit!"
    exit 0
fi

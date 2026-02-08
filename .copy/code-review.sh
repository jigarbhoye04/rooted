#!/bin/bash

# scripts/code-review.sh
# Generates a code review request for the Reviewer Agent (Claude)
# Run this after staging changes and before committing

set -e

echo "📝 Generating Code Review Request..."
echo ""

# Check if there are staged changes
if ! git diff --cached --quiet 2>/dev/null; then
    HAS_CHANGES=true
else
    HAS_CHANGES=false
fi

if [ "$HAS_CHANGES" = false ]; then
    echo "❌ No staged changes found."
    echo ""
    echo "Usage:"
    echo "  1. Make your changes"
    echo "  2. git add <files>"
    echo "  3. ./scripts/code-review.sh"
    exit 1
fi

# Create temporary review request file
REVIEW_FILE="/tmp/rooted-code-review-$(date +%s).md"

cat > "$REVIEW_FILE" << 'EOF'
# Code Review Request

**Project:** Rooted - Daily Etymology App  
**Review Type:** Pre-Commit Code Review  
**Reviewer:** Reviewer Agent (Claude)

---

## 📋 Your Task

Review the code changes below for:

1. ✅ **Correctness:** Does it match the spec in `current_task.md`?
2. 🔒 **Security:** Does it follow all rules in `RULES.md`?
3. 🎯 **Type Safety:** Are there any type issues?
4. 🐛 **Logic Bugs:** Are there any obvious bugs?
5. 🛡️ **Error Handling:** Is error handling complete?
6. 📐 **Code Quality:** Is it readable and maintainable?

**Respond with ONLY:**
- `✅ APPROVED` (if all checks pass)
- `❌ REJECTED: {list of issues}` (if any issues found)

---

## 📚 Context Files

EOF

# Append architecture context
echo "### System Architecture" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"
echo '```markdown' >> "$REVIEW_FILE"
if [ -f "docs/context/01_architecture.md" ]; then
    head -100 docs/context/01_architecture.md >> "$REVIEW_FILE"
    echo "" >> "$REVIEW_FILE"
    echo "(Truncated - see full file for details)" >> "$REVIEW_FILE"
else
    echo "Architecture file not found" >> "$REVIEW_FILE"
fi
echo '```' >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"

# Append security rules
echo "### Security Rules (from RULES.md)" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"
echo '```markdown' >> "$REVIEW_FILE"
if [ -f "RULES.md" ]; then
    grep -A 10 "^## 🔐 Security Rules" RULES.md | head -50 >> "$REVIEW_FILE"
    echo "" >> "$REVIEW_FILE"
    echo "(Truncated - see full RULES.md for all rules)" >> "$REVIEW_FILE"
else
    echo "RULES.md not found" >> "$REVIEW_FILE"
fi
echo '```' >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"

# Append current task
echo "### Current Task" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"
echo '```markdown' >> "$REVIEW_FILE"
if [ -f "current_task.md" ]; then
    head -50 current_task.md >> "$REVIEW_FILE"
    echo "" >> "$REVIEW_FILE"
    echo "(Truncated - see full current_task.md for details)" >> "$REVIEW_FILE"
else
    echo "No current task defined" >> "$REVIEW_FILE"
fi
echo '```' >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"

# Append the diff
echo "---" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"
echo "## 📝 Code Changes" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"
echo '```diff' >> "$REVIEW_FILE"
git diff --cached >> "$REVIEW_FILE"
echo '```' >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"

# Append file stats
echo "---" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"
echo "## 📊 Change Statistics" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"
git diff --cached --stat >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"

# Append security check results
echo "---" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"
echo "## 🔒 Automated Security Check Results" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"
echo '```' >> "$REVIEW_FILE"
if [ -f "scripts/security-check.sh" ]; then
    ./scripts/security-check.sh 2>&1 || true
fi >> "$REVIEW_FILE"
echo '```' >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"

# Append type check results
echo "---" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"
echo "## 🎯 TypeScript Type Check Results" >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"
echo '```' >> "$REVIEW_FILE"
if [ -f "package.json" ]; then
    npm run type-check 2>&1 || echo "Type check failed - see errors above"
else
    echo "package.json not found"
fi >> "$REVIEW_FILE"
echo '```' >> "$REVIEW_FILE"
echo "" >> "$REVIEW_FILE"

# Final instructions
cat >> "$REVIEW_FILE" << 'EOF'
---

## ✅ Review Checklist

Use this checklist when reviewing:

### Security
- [ ] SQL queries use parameterized syntax (`sql`...``, not string concatenation)
- [ ] All inputs validated with Zod schemas
- [ ] HTTP methods explicitly validated
- [ ] No secrets hardcoded
- [ ] No environment variables leaked to client

### Type Safety
- [ ] No `any` types (use `unknown` and validate)
- [ ] All functions have explicit return types
- [ ] Props validated with Zod (in dev mode)

### Error Handling
- [ ] All try/catch blocks present
- [ ] Zod errors caught separately
- [ ] Errors logged to console
- [ ] User-facing error messages don't leak sensitive info

### Code Quality
- [ ] Functions < 50 lines
- [ ] Meaningful variable names
- [ ] No TODO comments
- [ ] No console.log (use console.error for errors only)
- [ ] Follows patterns from existing code

### Testing
- [ ] Tests written for new functionality
- [ ] Tests pass (if applicable)

---

## 📤 Your Response Format

**If all checks pass:**
```
✅ APPROVED

All checks passed. Code is ready to commit.
```

**If issues found:**
```
❌ REJECTED

Issues found:
1. Line 23: Missing Zod validation for `data` parameter
2. Line 45: Using string concatenation in SQL query (SQL injection risk)
3. Line 67: Function missing explicit return type
```

---

**Ready for your review!**
EOF

echo "✅ Review request generated!"
echo ""
echo "📄 File saved to: $REVIEW_FILE"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "NEXT STEPS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Option 1: Copy to Claude (Manual)"
echo "  1. Open: $REVIEW_FILE"
echo "  2. Copy entire contents"
echo "  3. Paste into Claude web interface"
echo "  4. Wait for review response"
echo ""
echo "Option 2: Use Claude API (Automated)"
echo "  Run: ./scripts/review-with-api.sh $REVIEW_FILE"
echo "  (Note: Requires ANTHROPIC_API_KEY environment variable)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Open file in default editor (optional)
if command -v code &> /dev/null; then
    echo ""
    echo "💡 Opening in VS Code..."
    code "$REVIEW_FILE"
elif command -v nano &> /dev/null; then
    echo ""
    echo "💡 Tip: Run 'nano $REVIEW_FILE' to view"
fi

echo ""
echo "🔍 Review completed. Waiting for your decision..."

#!/bin/bash

################################################################################
# sync-progress.sh
# 
# Auto-updates docs/context/02_progress.md based on git commits
# Run this after every commit to keep progress tracking in sync
#
# Usage:
#   ./scripts/sync-progress.sh
#   
# Or set as git post-commit hook:
#   ln -s ../../scripts/sync-progress.sh .git/hooks/post-commit
################################################################################

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROGRESS_FILE="docs/context/02_progress.md"

# Check if progress file exists
if [ ! -f "$PROGRESS_FILE" ]; then
  echo "❌ Error: $PROGRESS_FILE not found"
  exit 1
fi

echo "🔄 Syncing progress..."

# Get the latest commit message
LAST_COMMIT=$(git log -1 --pretty=%B)

# Extract task info from commit message
# Expected format: "feat: Implement /api/word/today" or "feat(api): ..."
TASK_PATTERN="(feat|fix|docs|refactor|test|chore|style|perf)"

if [[ $LAST_COMMIT =~ ^($TASK_PATTERN) ]]; then
  # Extract the task description
  TASK_DESC=$(echo "$LAST_COMMIT" | sed -E 's/^(feat|fix|docs|refactor|test|chore|style|perf)(\([^)]+\))?: //')
  
  # Update timestamp
  TODAY=$(date +"%Y-%m-%d")
  
  # Function to mark task as complete
  mark_task_complete() {
    local task_keyword="$1"
    
    # Search for the task in progress.md and mark it complete
    # Pattern: - [ ] Task description
    # Replace with: - [x] Task description (completed YYYY-MM-DD)
    
    if grep -q "- \[ \].*$task_keyword" "$PROGRESS_FILE"; then
      # Use perl for cross-platform sed compatibility
      if command -v perl &> /dev/null; then
        perl -i -pe "s/- \[ \](.*$task_keyword.*)/- [x]\$1 (✓ $TODAY)/" "$PROGRESS_FILE"
        echo -e "${GREEN}✓ Marked task complete: $task_keyword${NC}"
      else
        # Fallback to sed (macOS/Linux compatible)
        sed -i.bak "s/- \[ \]\(.*$task_keyword.*\)/- [x]\1 (✓ $TODAY)/" "$PROGRESS_FILE"
        rm -f "${PROGRESS_FILE}.bak"
        echo -e "${GREEN}✓ Marked task complete: $task_keyword${NC}"
      fi
    else
      echo -e "${YELLOW}⚠ Task not found in progress.md: $task_keyword${NC}"
      echo -e "${YELLOW}  You may need to manually update $PROGRESS_FILE${NC}"
    fi
  }
  
  # Auto-detect and mark tasks based on commit message keywords
  case "$LAST_COMMIT" in
    *"/api/word/today"*)
      mark_task_complete "/api/word/today"
      ;;
    *"/api/auth"*|*"authentication"*)
      mark_task_complete "authentication"
      ;;
    *"database"*|*"schema"*)
      mark_task_complete "Database schema"
      ;;
    *"MapVisualizer"*)
      mark_task_complete "MapVisualizer"
      ;;
    *"TreeVisualizer"*)
      mark_task_complete "TreeVisualizer"
      ;;
    *"TimelineVisualizer"*)
      mark_task_complete "TimelineVisualizer"
      ;;
    *"GridVisualizer"*)
      mark_task_complete "GridVisualizer"
      ;;
    *"scrollytelling"*|*"scroll"*)
      mark_task_complete "scrollytelling"
      ;;
    *"PWA"*|*"service worker"*)
      mark_task_complete "PWA"
      ;;
    *"streak"*|*"gamification"*)
      mark_task_complete "streak"
      ;;
    *"Wordception"*)
      mark_task_complete "Wordception"
      ;;
    *"share"*|*"quote card"*)
      mark_task_complete "share"
      ;;
    *)
      echo -e "${YELLOW}⚠ No specific task matched. Consider manually updating $PROGRESS_FILE${NC}"
      ;;
  esac
  
  # Update "Last Updated" timestamp at bottom of file
  if grep -q "Last Updated:" "$PROGRESS_FILE"; then
    if command -v perl &> /dev/null; then
      perl -i -pe "s/Last Updated:.*/Last Updated: $TODAY/" "$PROGRESS_FILE"
    else
      sed -i.bak "s/Last Updated:.*/Last Updated: $TODAY/" "$PROGRESS_FILE"
      rm -f "${PROGRESS_FILE}.bak"
    fi
  fi
  
  echo -e "${GREEN}✓ Progress synced${NC}"
  
else
  echo -e "${YELLOW}⚠ Commit message doesn't match conventional format${NC}"
  echo -e "${YELLOW}  Expected: feat|fix|docs|...: Description${NC}"
  echo -e "${YELLOW}  Got: $LAST_COMMIT${NC}"
fi

# Show current phase progress
echo ""
echo "📊 Current Progress:"
grep "Phase" "$PROGRESS_FILE" | grep -E "\[[ x]\]" | head -10

echo ""
echo "Next steps:"
echo "  1. Review updated progress: cat $PROGRESS_FILE"
echo "  2. Continue to next task: cat current_task.md"
echo ""

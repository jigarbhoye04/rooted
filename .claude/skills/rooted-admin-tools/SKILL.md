---
name: rooted-admin-tools
description: Manage Rooted content approval workflow and database operations. Use when reviewing draft words, scheduling publications, validating JSON schemas, performing bulk operations, or checking content quality. Handles PostgreSQL queries, content approval, and admin dashboard functionality.
---

# Rooted Admin Tools

Streamline the content approval workflow and database management for the Rooted etymology app.

## Quick Start

**Review pending words:**
```bash
node scripts/admin-review.js
```

**Approve a word:**
```bash
node scripts/approve-word.js --word "sabotage" --date "2025-03-01"
```

**Bulk schedule:**
```bash
node scripts/bulk-schedule.js --file schedule.csv
```

## Admin Dashboard

The admin dashboard (`admin/review.html`) provides a visual interface for content management.

### Dashboard Features

1. **Draft Queue**: View all pending words awaiting approval
2. **Calendar View**: See scheduled words for the next 30 days
3. **Quality Checks**: Automated validation status for each word
4. **Preview Mode**: See exactly how the word will appear on the site
5. **Batch Operations**: Approve/reject multiple words at once

### API Endpoints

#### GET `/api/admin/drafts`
Fetch all pending draft words.

**Response:**
```json
[
  {
    "word": "sabotage",
    "definition": "Deliberate destruction...",
    "visualization_type": "MAP",
    "content_json": { ... },
    "created_at": "2025-02-08T10:30:00Z",
    "quality_score": 0.95,
    "validation_issues": []
  }
]
```

#### POST `/api/admin/approve`
Approve a word for publication.

**Request:**
```json
{
  "word": "sabotage",
  "publish_date": "2025-03-01",
  "approved_by": "jigar"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Word 'sabotage' scheduled for 2025-03-01"
}
```

#### POST `/api/admin/reject`
Reject and delete a draft word.

**Request:**
```json
{
  "word": "xyz",
  "reason": "Etymology unclear, needs more research"
}
```

#### GET `/api/admin/calendar`
Get publication calendar for next 30 days.

**Response:**
```json
{
  "2025-03-01": {
    "word": "sabotage",
    "visualization_type": "MAP",
    "approved": true
  },
  "2025-03-02": {
    "word": "captain",
    "visualization_type": "TREE",
    "approved": true
  },
  "2025-03-03": null  // No word scheduled
}
```

## Database Operations

### Schema Reference

```sql
CREATE TABLE daily_words (
  id SERIAL PRIMARY KEY,
  publish_date DATE UNIQUE NOT NULL,
  word VARCHAR(100) NOT NULL,
  definition TEXT NOT NULL,
  phonetic VARCHAR(100),
  pronunciation_audio_url TEXT,
  visualization_type VARCHAR(10) CHECK (visualization_type IN ('TREE', 'MAP', 'TIMELINE', 'GRID')),
  content_json JSONB NOT NULL,
  accent_color CHAR(7) DEFAULT '#000000',
  created_at TIMESTAMP DEFAULT NOW(),
  approved_by VARCHAR(50),
  root_family VARCHAR(50),
  
  CONSTRAINT valid_color CHECK (accent_color ~ '^#[0-9A-Fa-f]{6}$')
);

CREATE INDEX idx_publish_date ON daily_words(publish_date);
CREATE INDEX idx_root_family ON daily_words(root_family) WHERE root_family IS NOT NULL;
CREATE INDEX idx_approved_by ON daily_words(approved_by) WHERE approved_by IS NULL;  -- For draft queue
```

### Common Queries

#### Get all pending drafts
```sql
SELECT 
  word,
  visualization_type,
  created_at,
  content_json->>'hook' as hook
FROM daily_words
WHERE approved_by IS NULL
ORDER BY created_at DESC;
```

#### Get scheduled words for date range
```sql
SELECT 
  publish_date,
  word,
  visualization_type,
  approved_by IS NOT NULL as approved
FROM daily_words
WHERE publish_date BETWEEN $1 AND $2
ORDER BY publish_date ASC;
```

#### Find gaps in schedule
```sql
WITH date_range AS (
  SELECT generate_series(
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '30 days',
    '1 day'::interval
  )::date AS date
)
SELECT dr.date
FROM date_range dr
LEFT JOIN daily_words dw ON dr.date = dw.publish_date
WHERE dw.id IS NULL
ORDER BY dr.date;
```

#### Approve a word
```sql
UPDATE daily_words
SET approved_by = $1
WHERE word = $2 AND publish_date = $3
RETURNING *;
```

#### Find words by root family (Wordception)
```sql
SELECT 
  publish_date,
  word,
  content_json->'visual_data'->'root'->>'term' as root_term
FROM daily_words
WHERE root_family = $1
  AND approved_by IS NOT NULL
ORDER BY publish_date;
```

#### Check for duplicate publish dates
```sql
SELECT publish_date, COUNT(*) as count
FROM daily_words
GROUP BY publish_date
HAVING COUNT(*) > 1;
```

## Content Validation

### Validation Pipeline

Every word goes through these checks before approval:

```javascript
async function validateWord(wordData) {
  const issues = [];

  // 1. JSON Schema Validation
  const schemaValid = validateSchema(wordData.content_json);
  if (!schemaValid) {
    issues.push({
      severity: 'critical',
      type: 'schema',
      message: 'JSON does not match Rooted schema'
    });
  }

  // 2. Content Quality Checks
  const hookLength = wordData.content_json.hook.split(' ').length;
  if (hookLength < 5 || hookLength > 15) {
    issues.push({
      severity: 'warning',
      type: 'hook',
      message: `Hook should be 5-15 words (currently ${hookLength})`
    });
  }

  // 3. Visualization-specific validation
  if (wordData.visualization_type === 'MAP') {
    const mapIssues = validateMapData(wordData.content_json.visual_data);
    issues.push(...mapIssues);
  } else if (wordData.visualization_type === 'TREE') {
    const treeIssues = validateTreeData(wordData.content_json.visual_data);
    issues.push(...treeIssues);
  }

  // 4. Coordinate validation (for MAP)
  if (wordData.visualization_type === 'MAP') {
    for (const point of wordData.content_json.visual_data.points) {
      if (!isValidCoordinate(point.coordinates)) {
        issues.push({
          severity: 'critical',
          type: 'coordinates',
          message: `Invalid coordinates for ${point.location_name}: ${point.coordinates}`
        });
      }
    }
  }

  // 5. Timeline chronology check
  if (wordData.visualization_type === 'TIMELINE') {
    const epochs = wordData.content_json.visual_data.epochs;
    for (let i = 1; i < epochs.length; i++) {
      if (epochs[i].order <= epochs[i-1].order) {
        issues.push({
          severity: 'warning',
          type: 'chronology',
          message: 'Timeline epochs not in chronological order'
        });
      }
    }
  }

  // 6. Content profanity/sensitivity check
  const sensitivityIssues = checkSensitivity(
    wordData.definition,
    wordData.content_json.hook,
    wordData.content_json.fun_fact
  );
  issues.push(...sensitivityIssues);

  return {
    valid: issues.filter(i => i.severity === 'critical').length === 0,
    issues,
    quality_score: calculateQualityScore(issues)
  };
}
```

### Validation Functions

#### Schema Validation
```javascript
import Ajv from 'ajv';

const ajv = new Ajv();
const schema = require('./rooted-schema.json');

function validateSchema(contentJson) {
  const validate = ajv.compile(schema);
  const valid = validate(contentJson);
  if (!valid) {
    console.error('Schema validation errors:', validate.errors);
  }
  return valid;
}
```

#### Coordinate Validation
```javascript
function isValidCoordinate([lat, lng]) {
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return false;
  }
  
  if (lat < -90 || lat > 90) {
    return false;
  }
  
  if (lng < -180 || lng > 180) {
    return false;
  }

  // Check if coordinate is in water (optional, uses reverse geocoding)
  // This can be expensive, so use sparingly
  return true;
}
```

#### MAP Data Validation
```javascript
function validateMapData(visualData) {
  const issues = [];

  // Must have at least 2 points
  if (visualData.points.length < 2) {
    issues.push({
      severity: 'critical',
      type: 'map_points',
      message: 'MAP requires at least 2 geographic points'
    });
  }

  // Each point must have valid coordinates
  visualData.points.forEach(point => {
    if (!point.coordinates || point.coordinates.length !== 2) {
      issues.push({
        severity: 'critical',
        type: 'coordinates',
        message: `Point '${point.location_name}' missing coordinates`
      });
    }
  });

  // Routes must reference valid point orders
  visualData.routes.forEach(route => {
    const fromExists = visualData.points.some(p => p.order === route.from);
    const toExists = visualData.points.some(p => p.order === route.to);
    
    if (!fromExists || !toExists) {
      issues.push({
        severity: 'critical',
        type: 'routes',
        message: `Route references non-existent point: ${route.from} → ${route.to}`
      });
    }
  });

  return issues;
}
```

#### TREE Data Validation
```javascript
function validateTreeData(visualData) {
  const issues = [];

  // Must have root
  if (!visualData.root || !visualData.root.term) {
    issues.push({
      severity: 'critical',
      type: 'tree_root',
      message: 'TREE requires a root node'
    });
  }

  // Must have at least 2 children
  if (!visualData.children || visualData.children.length < 2) {
    issues.push({
      severity: 'warning',
      type: 'tree_children',
      message: 'TREE should have at least 2 children for interesting visualization'
    });
  }

  // Check for circular references (tree should be acyclic)
  function hasCircularRef(node, visited = new Set()) {
    if (visited.has(node.term)) return true;
    visited.add(node.term);
    
    if (node.children) {
      for (const child of node.children) {
        if (hasCircularRef(child, new Set(visited))) return true;
      }
    }
    return false;
  }

  if (hasCircularRef({ term: 'root', children: visualData.children })) {
    issues.push({
      severity: 'critical',
      type: 'tree_structure',
      message: 'TREE contains circular references'
    });
  }

  return issues;
}
```

#### Quality Score Calculation
```javascript
function calculateQualityScore(issues) {
  let score = 100;

  issues.forEach(issue => {
    if (issue.severity === 'critical') {
      score -= 30;
    } else if (issue.severity === 'warning') {
      score -= 10;
    } else {
      score -= 5;
    }
  });

  return Math.max(0, score) / 100;
}
```

## Bulk Operations

### Bulk Scheduling

**Format: `schedule.csv`**
```csv
word,publish_date,visualization_type
sabotage,2025-03-01,MAP
captain,2025-03-02,TREE
algorithm,2025-03-03,TIMELINE
mother,2025-03-04,GRID
```

**Script: `scripts/bulk-schedule.js`**
```javascript
import fs from 'fs';
import csv from 'csv-parser';
import { sql } from '@vercel/postgres';

async function bulkSchedule(filePath) {
  const words = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => words.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  const results = {
    success: 0,
    failed: 0,
    errors: []
  };

  for (const word of words) {
    try {
      // Check if date already has a word
      const existing = await sql`
        SELECT word FROM daily_words WHERE publish_date = ${word.publish_date}
      `;

      if (existing.rows.length > 0) {
        throw new Error(`Date ${word.publish_date} already has word: ${existing.rows[0].word}`);
      }

      // Approve the word (assume it's already drafted)
      await sql`
        UPDATE daily_words
        SET publish_date = ${word.publish_date},
            approved_by = 'jigar'
        WHERE word = ${word.word}
      `;

      results.success++;
      console.log(`✓ Scheduled ${word.word} for ${word.publish_date}`);

    } catch (error) {
      results.failed++;
      results.errors.push({
        word: word.word,
        date: word.publish_date,
        error: error.message
      });
      console.error(`✗ Failed to schedule ${word.word}: ${error.message}`);
    }
  }

  return results;
}

// Usage
if (require.main === module) {
  const filePath = process.argv[2] || 'schedule.csv';
  bulkSchedule(filePath)
    .then(results => {
      console.log(`\nBulk Schedule Complete:`);
      console.log(`  Success: ${results.success}`);
      console.log(`  Failed: ${results.failed}`);
      if (results.errors.length > 0) {
        console.log('\nErrors:');
        results.errors.forEach(e => {
          console.log(`  - ${e.word} (${e.date}): ${e.error}`);
        });
      }
    })
    .catch(console.error);
}
```

### Bulk Root Family Update

For Wordception feature, batch update root families:

```javascript
async function updateRootFamilies() {
  // Get all TREE words
  const treeWords = await sql`
    SELECT id, word, content_json
    FROM daily_words
    WHERE visualization_type = 'TREE'
      AND root_family IS NULL
  `;

  for (const word of treeWords.rows) {
    const root = word.content_json.visual_data.root;
    const rootFamily = `${root.language}_${normalizeRootTerm(root.term)}`;

    await sql`
      UPDATE daily_words
      SET root_family = ${rootFamily}
      WHERE id = ${word.id}
    `;

    console.log(`✓ Updated ${word.word} → root_family: ${rootFamily}`);
  }
}

function normalizeRootTerm(term) {
  // Remove diacritics and special characters
  return term
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // Remove diacritics
    .replace(/[^a-z0-9]/g, '');       // Keep only alphanumeric
}
```

## Schedule Management

### Find Available Dates

```javascript
async function findAvailableDates(startDate, endDate) {
  const result = await sql`
    WITH date_range AS (
      SELECT generate_series(
        ${startDate}::date,
        ${endDate}::date,
        '1 day'::interval
      )::date AS date
    )
    SELECT dr.date
    FROM date_range dr
    LEFT JOIN daily_words dw ON dr.date = dw.publish_date
    WHERE dw.id IS NULL
    ORDER BY dr.date
  `;

  return result.rows.map(r => r.date);
}

// Usage
const available = await findAvailableDates('2025-03-01', '2025-03-31');
console.log('Available dates in March 2025:', available);
```

### Auto-fill Schedule

Automatically assign pending drafts to available dates:

```javascript
async function autoFillSchedule(startDate, days = 30) {
  // Get available dates
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + days);
  
  const availableDates = await findAvailableDates(
    startDate.toISOString().split('T')[0],
    endDate.toISOString().split('T')[0]
  );

  if (availableDates.length === 0) {
    console.log('No available dates in range');
    return;
  }

  // Get pending drafts
  const drafts = await sql`
    SELECT word, visualization_type
    FROM daily_words
    WHERE approved_by IS NULL
    ORDER BY created_at ASC
    LIMIT ${availableDates.length}
  `;

  // Assign drafts to dates
  for (let i = 0; i < drafts.rows.length; i++) {
    const draft = drafts.rows[i];
    const date = availableDates[i];

    await sql`
      UPDATE daily_words
      SET publish_date = ${date},
          approved_by = 'auto'
      WHERE word = ${draft.word}
    `;

    console.log(`✓ Auto-scheduled ${draft.word} for ${date}`);
  }

  return {
    scheduled: drafts.rows.length,
    remaining_dates: availableDates.length - drafts.rows.length
  };
}
```

## Quality Reports

### Generate Quality Report

```javascript
async function generateQualityReport() {
  const words = await sql`
    SELECT word, visualization_type, content_json, approved_by
    FROM daily_words
    WHERE created_at > NOW() - INTERVAL '30 days'
  `;

  const report = {
    total: words.rows.length,
    by_type: {},
    quality_distribution: {
      excellent: 0,  // score >= 0.9
      good: 0,       // score >= 0.7
      fair: 0,       // score >= 0.5
      poor: 0        // score < 0.5
    },
    common_issues: {}
  };

  for (const word of words.rows) {
    // Count by type
    report.by_type[word.visualization_type] = 
      (report.by_type[word.visualization_type] || 0) + 1;

    // Validate and score
    const validation = await validateWord(word);
    
    if (validation.quality_score >= 0.9) {
      report.quality_distribution.excellent++;
    } else if (validation.quality_score >= 0.7) {
      report.quality_distribution.good++;
    } else if (validation.quality_score >= 0.5) {
      report.quality_distribution.fair++;
    } else {
      report.quality_distribution.poor++;
    }

    // Track common issues
    validation.issues.forEach(issue => {
      report.common_issues[issue.type] = 
        (report.common_issues[issue.type] || 0) + 1;
    });
  }

  return report;
}

// Print formatted report
const report = await generateQualityReport();
console.log('\n📊 Quality Report (Last 30 days)\n');
console.log(`Total words: ${report.total}\n`);
console.log('By visualization type:');
Object.entries(report.by_type).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`);
});
console.log('\nQuality distribution:');
Object.entries(report.quality_distribution).forEach(([level, count]) => {
  console.log(`  ${level}: ${count}`);
});
console.log('\nCommon issues:');
Object.entries(report.common_issues)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .forEach(([issue, count]) => {
    console.log(`  ${issue}: ${count}`);
  });
```

## Admin CLI Tool

```javascript
#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';

const program = new Command();

program
  .name('rooted-admin')
  .description('Rooted admin CLI tool')
  .version('1.0.0');

// List pending drafts
program
  .command('list')
  .description('List pending draft words')
  .action(async () => {
    const drafts = await sql`
      SELECT word, visualization_type, created_at
      FROM daily_words
      WHERE approved_by IS NULL
      ORDER BY created_at DESC
    `;

    console.table(drafts.rows);
  });

// Approve word interactively
program
  .command('approve')
  .description('Approve a word for publication')
  .action(async () => {
    const drafts = await sql`
      SELECT word FROM daily_words WHERE approved_by IS NULL
    `;

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'word',
        message: 'Select word to approve:',
        choices: drafts.rows.map(r => r.word)
      },
      {
        type: 'input',
        name: 'date',
        message: 'Publish date (YYYY-MM-DD):',
        default: new Date().toISOString().split('T')[0]
      }
    ]);

    await sql`
      UPDATE daily_words
      SET publish_date = ${answers.date},
          approved_by = 'jigar'
      WHERE word = ${answers.word}
    `;

    console.log(`✓ Approved ${answers.word} for ${answers.date}`);
  });

// Check schedule
program
  .command('schedule')
  .description('View publication schedule')
  .option('-d, --days <number>', 'Number of days to show', '30')
  .action(async (options) => {
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(options.days));

    const schedule = await sql`
      SELECT publish_date, word, visualization_type
      FROM daily_words
      WHERE publish_date BETWEEN ${startDate} AND ${endDate.toISOString().split('T')[0]}
      ORDER BY publish_date
    `;

    console.table(schedule.rows);

    // Show gaps
    const available = await findAvailableDates(startDate, endDate.toISOString().split('T')[0]);
    if (available.length > 0) {
      console.log(`\n⚠️  ${available.length} dates without scheduled words`);
    }
  });

// Validate word
program
  .command('validate <word>')
  .description('Validate a word')
  .action(async (word) => {
    const result = await sql`
      SELECT * FROM daily_words WHERE word = ${word}
    `;

    if (result.rows.length === 0) {
      console.error(`Word '${word}' not found`);
      process.exit(1);
    }

    const validation = await validateWord(result.rows[0]);

    console.log(`\nValidation results for '${word}':`);
    console.log(`Quality score: ${(validation.quality_score * 100).toFixed(0)}%`);
    
    if (validation.issues.length === 0) {
      console.log('✓ No issues found');
    } else {
      console.log(`\nIssues (${validation.issues.length}):`);
      validation.issues.forEach(issue => {
        const icon = issue.severity === 'critical' ? '✗' : '⚠';
        console.log(`  ${icon} [${issue.severity}] ${issue.type}: ${issue.message}`);
      });
    }
  });

program.parse();
```

## Database Backup & Restore

### Backup
```bash
#!/bin/bash
# backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backups/rooted_$DATE.sql"

# Backup from Vercel Postgres
pg_dump $DATABASE_URL > $BACKUP_FILE

echo "✓ Database backed up to $BACKUP_FILE"

# Upload to S3 (optional)
aws s3 cp $BACKUP_FILE s3://rooted-backups/
```

### Restore
```bash
#!/bin/bash
# restore-db.sh

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: ./restore-db.sh <backup_file>"
  exit 1
fi

# Restore to Vercel Postgres
psql $DATABASE_URL < $BACKUP_FILE

echo "✓ Database restored from $BACKUP_FILE"
```

## Monitoring & Alerts

### Set up alerts for:

1. **No word scheduled for today**
   ```javascript
   async function checkTodayWord() {
     const today = new Date().toISOString().split('T')[0];
     const result = await sql`
       SELECT word FROM daily_words WHERE publish_date = ${today}
     `;

     if (result.rows.length === 0) {
       // Send alert (email, Slack, etc.)
       await sendAlert('No word scheduled for today!');
     }
   }
   ```

2. **Low draft inventory** (less than 7 days ahead)
   ```javascript
   async function checkDraftInventory() {
     const sevenDaysOut = new Date();
     sevenDaysOut.setDate(sevenDaysOut.getDate() + 7);

     const gaps = await findAvailableDates(
       new Date().toISOString().split('T')[0],
       sevenDaysOut.toISOString().split('T')[0]
     );

     if (gaps.length > 2) {
       await sendAlert(`Low inventory: ${gaps.length} missing words in next 7 days`);
     }
   }
   ```

3. **Failed quality checks**
   ```javascript
   async function checkQuality() {
     const recentWords = await sql`
       SELECT word, content_json
       FROM daily_words
       WHERE created_at > NOW() - INTERVAL '1 day'
     `;

     for (const word of recentWords.rows) {
       const validation = await validateWord(word);
       if (validation.quality_score < 0.7) {
         await sendAlert(`Low quality word: ${word.word} (score: ${validation.quality_score})`);
       }
     }
   }
   ```

## Next Steps

1. Set up the admin dashboard at `admin/review.html`
2. Configure Vercel Postgres connection
3. Run initial quality audit: `node scripts/quality-report.js`
4. Set up automated alerts (email or Slack)
5. Schedule a daily backup job

For content generation, use the **etymology-content-pipeline** skill.
For visualization implementation, use the **etymology-visualizations** skill.

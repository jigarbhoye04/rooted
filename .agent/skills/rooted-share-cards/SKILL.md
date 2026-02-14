---
name: rooted-share-cards
description: Generate shareable social media cards for Rooted words and user milestones. Use when creating quote cards with QR codes, streak badges, knowledge tree visualizations, or any shareable images. Handles image generation, typography layout, and QR code integration for 1080x1080 Instagram/Twitter formats.
---

# Rooted Share Cards

Generate beautiful, shareable social media cards for etymology words and user milestones.

## Quick Start

**Generate word card:**
```bash
node scripts/generate-share-card.js --word "sabotage" --type "daily"
```

**Generate streak badge:**
```bash
node scripts/generate-share-card.js --user "jigar" --type "streak" --days 30
```

## Card Types

### 1. Daily Word Card

**Use case:** Share today's word on social media

**Dimensions:** 1080x1080px (Instagram square)

**Design:**
```
┌─────────────────────────────────────┐
│                                     │
│         [Accent color bar]          │
│                                     │
│           SABOTAGE                  │  ← 72px Playfair Display
│         /ˈsæbətɑːʒ/                 │  ← 24px Inter
│                                     │
│    "It all started with a           │  ← 36px Inter Medium
│      wooden shoe."                  │
│                                     │
│         [QR Code]                   │  ← 200x200px
│                                     │
│      Rooted • Daily Etymology       │  ← 18px Inter
│         rooted.app                  │
│                                     │
└─────────────────────────────────────┘
```

**Template:**
```typescript
interface DailyWordCard {
  word: string;
  phonetic: string;
  hook: string;
  accentColor: string;
  qrCodeData: string;  // URL to word page
}

async function generateDailyWordCard(data: DailyWordCard): Promise<Buffer> {
  const canvas = createCanvas(1080, 1080);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#F9F9F9';
  ctx.fillRect(0, 0, 1080, 1080);

  // Accent color bar
  ctx.fillStyle = data.accentColor;
  ctx.fillRect(0, 80, 1080, 8);

  // Word (centered)
  ctx.fillStyle = '#1A1A1A';
  ctx.font = 'bold 72px Playfair Display';
  ctx.textAlign = 'center';
  ctx.fillText(data.word.toUpperCase(), 540, 300);

  // Phonetic
  ctx.fillStyle = '#6B7280';
  ctx.font = '24px Inter';
  ctx.fillText(data.phonetic, 540, 350);

  // Hook (word-wrapped)
  ctx.fillStyle = '#1A1A1A';
  ctx.font = '500 36px Inter';
  wrapText(ctx, data.hook, 540, 480, 800, 50);

  // QR Code
  const qrCode = await generateQRCode(data.qrCodeData);
  ctx.drawImage(qrCode, 440, 600, 200, 200);

  // Footer
  ctx.fillStyle = '#6B7280';
  ctx.font = '18px Inter';
  ctx.fillText('Rooted • Daily Etymology', 540, 880);
  ctx.fillText('rooted.app', 540, 920);

  return canvas.toBuffer('image/png');
}
```

### 2. Streak Badge

**Use case:** Celebrate user's daily visit streak

**Variations:**
- 7 days: "Week Warrior"
- 30 days: "Monthly Master"
- 100 days: "Century Scholar"
- 365 days: "Annual Expert"

**Design:**
```
┌─────────────────────────────────────┐
│                                     │
│            🔥                       │  ← 120px emoji
│                                     │
│            30                       │  ← 144px Inter Black
│         DAY STREAK                  │  ← 36px Inter
│                                     │
│    "I've explored 30 words on       │  ← 28px Inter
│      Rooted! Join me."              │
│                                     │
│      [Mini knowledge tree]          │  ← Visual of roots explored
│                                     │
│         [QR Code]                   │
│                                     │
│      Rooted • Daily Etymology       │
│         rooted.app                  │
│                                     │
└─────────────────────────────────────┘
```

**Template:**
```typescript
interface StreakBadge {
  days: number;
  userName?: string;
  rootsExplored: string[];  // e.g., ['Latin_caput', 'PIE_mehter']
  qrCodeData: string;
}

async function generateStreakBadge(data: StreakBadge): Promise<Buffer> {
  const canvas = createCanvas(1080, 1080);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, 1080);
  gradient.addColorStop(0, '#FEF3C7');  // Amber-50
  gradient.addColorStop(1, '#FDE68A');  // Amber-200
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1080, 1080);

  // Flame emoji
  ctx.font = '120px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('🔥', 540, 240);

  // Streak number
  ctx.fillStyle = '#92400E';  // Amber-800
  ctx.font = 'black 144px Inter';
  ctx.fillText(data.days.toString(), 540, 400);

  // "DAY STREAK"
  ctx.font = '36px Inter';
  ctx.fillText('DAY STREAK', 540, 450);

  // Message
  ctx.fillStyle = '#1A1A1A';
  ctx.font = '28px Inter';
  const message = data.userName 
    ? `${data.userName} explored ${data.days} words on Rooted!`
    : `I've explored ${data.days} words on Rooted! Join me.`;
  wrapText(ctx, message, 540, 530, 800, 40);

  // Mini knowledge tree visualization
  if (data.rootsExplored.length > 0) {
    drawMiniKnowledgeTree(ctx, data.rootsExplored, 540, 650);
  }

  // QR Code
  const qrCode = await generateQRCode(data.qrCodeData);
  ctx.drawImage(qrCode, 440, 800, 150, 150);

  // Footer
  ctx.fillStyle = '#92400E';
  ctx.font = '18px Inter';
  ctx.fillText('Rooted • Daily Etymology', 540, 1000);
  ctx.fillText('rooted.app', 540, 1030);

  return canvas.toBuffer('image/png');
}
```

### 3. Knowledge Tree (30-day milestone)

**Use case:** Show all etymological roots user has explored

**Design:**
```
┌─────────────────────────────────────┐
│                                     │
│       MY KNOWLEDGE TREE             │  ← Title
│                                     │
│         [SVG tree diagram]          │  ← All roots as nodes
│        PIE_mehter  Latin_caput      │
│            │          │             │
│         Mother     Captain          │
│                    Cape             │
│                                     │
│    30 words explored                │
│    8 root families                  │
│                                     │
│         [QR Code]                   │
│                                     │
│      Rooted • Daily Etymology       │
│         rooted.app                  │
│                                     │
└─────────────────────────────────────┘
```

**Template:**
```typescript
interface KnowledgeTree {
  totalWords: number;
  rootFamilies: RootFamily[];
  userName?: string;
  qrCodeData: string;
}

interface RootFamily {
  name: string;
  words: string[];
}

async function generateKnowledgeTree(data: KnowledgeTree): Promise<Buffer> {
  const canvas = createCanvas(1080, 1080);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#ECFDF5';  // Green-50
  ctx.fillRect(0, 0, 1080, 1080);

  // Title
  ctx.fillStyle = '#1A1A1A';
  ctx.font = 'bold 48px Inter';
  ctx.textAlign = 'center';
  ctx.fillText('MY KNOWLEDGE TREE', 540, 120);

  // Draw tree visualization
  drawKnowledgeTreeDiagram(ctx, data.rootFamilies);

  // Stats
  ctx.fillStyle = '#065F46';  // Green-800
  ctx.font = '600 28px Inter';
  ctx.fillText(`${data.totalWords} words explored`, 540, 850);
  ctx.fillText(`${data.rootFamilies.length} root families`, 540, 890);

  // QR Code
  const qrCode = await generateQRCode(data.qrCodeData);
  ctx.drawImage(qrCode, 440, 950, 120, 120);

  // Footer
  ctx.fillStyle = '#065F46';
  ctx.font = '16px Inter';
  ctx.fillText('Rooted • Daily Etymology', 720, 1000);
  ctx.fillText('rooted.app', 720, 1025);

  return canvas.toBuffer('image/png');
}
```

### 4. Fun Fact Highlight

**Use case:** Share an interesting etymology fact

**Design:**
```
┌─────────────────────────────────────┐
│                                     │
│              💡                     │
│         DID YOU KNOW?               │
│                                     │
│    "French factory workers          │
│     threw their wooden clogs        │
│     (*sabots*) into machinery       │
│     to protest harsh working        │
│     conditions in the 1800s."       │
│                                     │
│          — Sabotage                 │
│                                     │
│         [QR Code]                   │
│                                     │
│      Rooted • Daily Etymology       │
│         rooted.app                  │
│                                     │
└─────────────────────────────────────┘
```

**Template:**
```typescript
interface FunFactCard {
  fact: string;
  word: string;
  accentColor: string;
  qrCodeData: string;
}

async function generateFunFactCard(data: FunFactCard): Promise<Buffer> {
  const canvas = createCanvas(1080, 1080);
  const ctx = canvas.getContext('2d');

  // Background with subtle gradient
  const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
  gradient.addColorStop(0, '#F9FAFB');
  gradient.addColorStop(1, '#E5E7EB');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1080, 1080);

  // Light bulb emoji
  ctx.font = '80px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('💡', 540, 200);

  // "DID YOU KNOW?"
  ctx.fillStyle = data.accentColor;
  ctx.font = 'bold 32px Inter';
  ctx.fillText('DID YOU KNOW?', 540, 280);

  // Fun fact (word-wrapped, quoted)
  ctx.fillStyle = '#1A1A1A';
  ctx.font = '32px Inter';
  wrapText(ctx, `"${data.fact}"`, 540, 380, 900, 48);

  // Word attribution
  ctx.fillStyle = '#6B7280';
  ctx.font = 'italic 24px Inter';
  ctx.fillText(`— ${data.word}`, 540, 700);

  // QR Code
  const qrCode = await generateQRCode(data.qrCodeData);
  ctx.drawImage(qrCode, 440, 800, 150, 150);

  // Footer
  ctx.fillStyle = '#6B7280';
  ctx.font = '18px Inter';
  ctx.fillText('Rooted • Daily Etymology', 540, 1000);
  ctx.fillText('rooted.app', 540, 1030);

  return canvas.toBuffer('image/png');
}
```

## Utility Functions

### Text Wrapping

```typescript
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): void {
  const words = text.split(' ');
  let line = '';
  let lines: string[] = [];

  for (const word of words) {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && line !== '') {
      lines.push(line.trim());
      line = word + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());

  // Draw centered lines
  lines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * lineHeight);
  });
}
```

### QR Code Generation

```typescript
import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';

async function generateQRCode(data: string, size: number = 200): Promise<Canvas> {
  // Generate QR code as data URL
  const qrDataURL = await QRCode.toDataURL(data, {
    width: size,
    margin: 1,
    color: {
      dark: '#1A1A1A',
      light: '#FFFFFF'
    }
  });

  // Load into canvas
  const img = await loadImage(qrDataURL);
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  return canvas;
}
```

### Mini Knowledge Tree Diagram

```typescript
function drawMiniKnowledgeTree(
  ctx: CanvasRenderingContext2D,
  rootFamilies: string[],
  centerX: number,
  centerY: number
): void {
  const radius = 150;
  const nodeRadius = 20;
  const uniqueRoots = [...new Set(rootFamilies)];

  // Draw connecting lines
  ctx.strokeStyle = '#D1D5DB';
  ctx.lineWidth = 2;

  uniqueRoots.forEach((root, i) => {
    const angle = (i / uniqueRoots.length) * 2 * Math.PI;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
  });

  // Draw center node
  ctx.fillStyle = '#059669';  // Green-600
  ctx.beginPath();
  ctx.arc(centerX, centerY, nodeRadius * 1.5, 0, 2 * Math.PI);
  ctx.fill();

  // Draw root nodes
  ctx.fillStyle = '#10B981';  // Green-500
  uniqueRoots.forEach((root, i) => {
    const angle = (i / uniqueRoots.length) * 2 * Math.PI;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
    ctx.fill();

    // Label
    ctx.fillStyle = '#065F46';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    const label = root.split('_')[1] || root;
    ctx.fillText(label, x, y + radius / 3);
  });
}
```

### Full Knowledge Tree Diagram

```typescript
function drawKnowledgeTreeDiagram(
  ctx: CanvasRenderingContext2D,
  rootFamilies: RootFamily[]
): void {
  const startY = 200;
  const spacing = 100;
  const maxRootsPerRow = 3;

  rootFamilies.slice(0, 9).forEach((family, i) => {
    const row = Math.floor(i / maxRootsPerRow);
    const col = i % maxRootsPerRow;
    
    const x = 200 + col * 280;
    const y = startY + row * 200;

    // Root node
    ctx.fillStyle = '#059669';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.fill();

    // Root label
    ctx.fillStyle = '#1A1A1A';
    ctx.font = 'bold 16px Inter';
    ctx.textAlign = 'center';
    const rootLabel = family.name.split('_')[1] || family.name;
    ctx.fillText(rootLabel, x, y - 50);

    // Child words
    family.words.slice(0, 3).forEach((word, j) => {
      const childY = y + 70 + j * 30;

      // Line to child
      ctx.strokeStyle = '#D1D5DB';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y + 30);
      ctx.lineTo(x, childY);
      ctx.stroke();

      // Child node
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(x, childY, 15, 0, 2 * Math.PI);
      ctx.fill();

      // Child label
      ctx.fillStyle = '#374151';
      ctx.font = '14px Inter';
      ctx.fillText(word, x + 25, childY + 5);
    });
  });
}
```

## API Integration

### Server-side generation endpoint

**File:** `app/api/share/generate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createCanvas, registerFont } from 'canvas';

// Register fonts
registerFont('public/fonts/PlayfairDisplay-Bold.ttf', { family: 'Playfair Display', weight: 'bold' });
registerFont('public/fonts/Inter-Regular.ttf', { family: 'Inter' });
registerFont('public/fonts/Inter-Medium.ttf', { family: 'Inter', weight: '500' });
registerFont('public/fonts/Inter-Bold.ttf', { family: 'Inter', weight: 'bold' });

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, data } = body;

  let imageBuffer: Buffer;

  try {
    switch (type) {
      case 'daily':
        imageBuffer = await generateDailyWordCard(data);
        break;
      case 'streak':
        imageBuffer = await generateStreakBadge(data);
        break;
      case 'knowledge-tree':
        imageBuffer = await generateKnowledgeTree(data);
        break;
      case 'fun-fact':
        imageBuffer = await generateFunFactCard(data);
        break;
      default:
        return NextResponse.json({ error: 'Invalid card type' }, { status: 400 });
    }

    // Upload to Vercel Blob
    const { put } = await import('@vercel/blob');
    const blob = await put(`share-cards/${Date.now()}.png`, imageBuffer, {
      access: 'public',
      contentType: 'image/png'
    });

    return NextResponse.json({ 
      success: true,
      url: blob.url 
    });

  } catch (error) {
    console.error('Error generating share card:', error);
    return NextResponse.json({ 
      error: 'Failed to generate share card' 
    }, { status: 500 });
  }
}
```

### Client-side usage

```typescript
async function shareWord(word: DailyWord) {
  const response = await fetch('/api/share/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'daily',
      data: {
        word: word.word,
        phonetic: word.phonetic,
        hook: word.content_json.hook,
        accentColor: word.accent_color,
        qrCodeData: `https://rooted.app/word/${word.word}`
      }
    })
  });

  const result = await response.json();
  
  if (result.success) {
    // Open share dialog
    if (navigator.share) {
      await navigator.share({
        title: `${word.word} - Rooted`,
        text: word.content_json.hook,
        url: result.url
      });
    } else {
      // Fallback: copy URL to clipboard
      await navigator.clipboard.writeText(result.url);
      alert('Share link copied to clipboard!');
    }
  }
}
```

## Milestone Triggers

### Automatic badge generation

```typescript
async function checkMilestones(userId: string, streak: number) {
  const milestones = [7, 30, 100, 365];
  
  if (milestones.includes(streak)) {
    // Fetch user's explored roots
    const roots = await sql`
      SELECT DISTINCT root_family
      FROM user_visits
      JOIN daily_words ON user_visits.word_id = daily_words.id
      WHERE user_visits.user_id = ${userId}
        AND daily_words.root_family IS NOT NULL
    `;

    // Generate badge
    const badge = await generateStreakBadge({
      days: streak,
      userName: getUserName(userId),
      rootsExplored: roots.rows.map(r => r.root_family),
      qrCodeData: `https://rooted.app?ref=${userId}`
    });

    // Store badge
    const { put } = await import('@vercel/blob');
    const blob = await put(`badges/${userId}-${streak}day.png`, badge, {
      access: 'public',
      contentType: 'image/png'
    });

    // Notify user
    await notifyUser(userId, {
      title: `${streak}-Day Streak! 🔥`,
      message: 'You earned a new badge!',
      badgeUrl: blob.url
    });

    return blob.url;
  }

  return null;
}
```

## Performance Optimization

### Image caching

```typescript
import { kv } from '@vercel/kv';

async function getCachedShareCard(cacheKey: string, generator: () => Promise<Buffer>): Promise<string> {
  // Check cache
  const cached = await kv.get(`share-card:${cacheKey}`);
  if (cached) {
    return cached as string;
  }

  // Generate new
  const imageBuffer = await generator();
  
  // Upload
  const { put } = await import('@vercel/blob');
  const blob = await put(`share-cards/${cacheKey}.png`, imageBuffer, {
    access: 'public',
    contentType: 'image/png'
  });

  // Cache for 7 days
  await kv.set(`share-card:${cacheKey}`, blob.url, { ex: 604800 });

  return blob.url;
}

// Usage
const dailyCardUrl = await getCachedShareCard(
  `daily-${word.word}`,
  () => generateDailyWordCard(wordData)
);
```

### Pre-generate cards

```typescript
// Pre-generate share cards for next 7 days during cron job
async function preGenerateShareCards() {
  const nextWeek = await sql`
    SELECT word, phonetic, content_json, accent_color
    FROM daily_words
    WHERE publish_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
      AND approved_by IS NOT NULL
  `;

  for (const word of nextWeek.rows) {
    await getCachedShareCard(
      `daily-${word.word}`,
      () => generateDailyWordCard({
        word: word.word,
        phonetic: word.phonetic,
        hook: word.content_json.hook,
        accentColor: word.accent_color,
        qrCodeData: `https://rooted.app/word/${word.word}`
      })
    );

    console.log(`✓ Pre-generated share card for ${word.word}`);
  }
}
```

## Social Media Integration

### Open Graph meta tags

```typescript
export function generateMetaTags(word: DailyWord, shareCardUrl: string) {
  return {
    title: `${word.word} - Rooted`,
    description: word.content_json.hook,
    openGraph: {
      title: `${word.word} - Rooted`,
      description: word.content_json.hook,
      images: [
        {
          url: shareCardUrl,
          width: 1080,
          height: 1080,
          alt: `Etymology of ${word.word}`
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${word.word} - Rooted`,
      description: word.content_json.hook,
      images: [shareCardUrl]
    }
  };
}
```

### Native share API

```typescript
async function shareNative(word: DailyWord, imageUrl: string) {
  if (!navigator.share) {
    // Fallback for browsers without Web Share API
    return shareFallback(word, imageUrl);
  }

  try {
    // Fetch image as blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], `${word.word}-rooted.png`, { type: 'image/png' });

    await navigator.share({
      title: `${word.word} - Rooted`,
      text: word.content_json.hook,
      files: [file]
    });

    // Track share
    await trackEvent('share', { word: word.word, method: 'native' });

  } catch (error) {
    console.error('Share failed:', error);
  }
}

function shareFallback(word: DailyWord, imageUrl: string) {
  // Show share modal with platform-specific links
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(word.content_json.hook)}&url=${encodeURIComponent(`https://rooted.app/word/${word.word}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://rooted.app/word/${word.word}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://rooted.app/word/${word.word}`)}`,
    copy: imageUrl
  };

  // Display modal with these links
  openShareModal(shareLinks);
}
```

## Testing

```typescript
// Test all card types
async function testShareCards() {
  console.log('Testing share card generation...\n');

  // Test daily word card
  const dailyCard = await generateDailyWordCard({
    word: 'Sabotage',
    phonetic: '/ˈsæbətɑːʒ/',
    hook: 'It all started with a wooden shoe.',
    accentColor: '#DC2626',
    qrCodeData: 'https://rooted.app/word/sabotage'
  });
  console.log('✓ Daily word card:', dailyCard.length, 'bytes');

  // Test streak badge
  const streakBadge = await generateStreakBadge({
    days: 30,
    userName: 'Jigar',
    rootsExplored: ['Latin_caput', 'PIE_mehter'],
    qrCodeData: 'https://rooted.app'
  });
  console.log('✓ Streak badge:', streakBadge.length, 'bytes');

  // Test knowledge tree
  const knowledgeTree = await generateKnowledgeTree({
    totalWords: 30,
    rootFamilies: [
      { name: 'Latin_caput', words: ['Captain', 'Cape', 'Cabbage'] },
      { name: 'PIE_mehter', words: ['Mother', 'MÄter'] }
    ],
    userName: 'Jigar',
    qrCodeData: 'https://rooted.app'
  });
  console.log('✓ Knowledge tree:', knowledgeTree.length, 'bytes');

  // Test fun fact card
  const funFactCard = await generateFunFactCard({
    fact: 'French factory workers threw their wooden clogs (*sabots*) into machinery to protest harsh working conditions in the 1800s.',
    word: 'Sabotage',
    accentColor: '#DC2626',
    qrCodeData: 'https://rooted.app/word/sabotage'
  });
  console.log('✓ Fun fact card:', funFactCard.length, 'bytes');

  console.log('\n✅ All card types generated successfully!');
}
```

## Next Steps

1. Install dependencies: `npm install canvas qrcode @vercel/blob`
2. Add font files to `/public/fonts/`
3. Set up Vercel Blob storage
4. Test card generation locally
5. Deploy and verify Open Graph previews

For content data, use the **etymology-content-pipeline** skill.
For admin approval, use the **rooted-admin-tools** skill.

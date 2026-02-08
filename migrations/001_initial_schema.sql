-- Rooted Database Schema
-- Migration 001: Initial Schema
-- 
-- Run this migration in your Vercel Postgres dashboard or local PostgreSQL.
-- See docs/context/01_architecture.md for full documentation.

-- ============================================
-- Table: daily_words
-- Stores all word entries for the daily etymology app
-- ============================================

CREATE TABLE IF NOT EXISTS daily_words (
  -- Primary key
  id SERIAL PRIMARY KEY,
  
  -- Date when this word is scheduled to appear (must be unique)
  publish_date DATE UNIQUE NOT NULL,
  
  -- The word itself (e.g., "Sabotage")
  word VARCHAR(100) NOT NULL,
  
  -- Dictionary definition
  definition TEXT NOT NULL,
  
  -- Phonetic pronunciation (e.g., "/ˈsæbətɑːʒ/")
  phonetic VARCHAR(100),
  
  -- Optional audio pronunciation URL
  pronunciation_audio_url TEXT,
  
  -- Visualization type: MAP, TREE, TIMELINE, or GRID
  visualization_type VARCHAR(10) CHECK (
    visualization_type IN ('MAP', 'TREE', 'TIMELINE', 'GRID')
  ),
  
  -- Main content (JSONB for flexibility)
  -- Structure: { hook, fun_fact, nerd_mode?, visual_data }
  content_json JSONB NOT NULL,
  
  -- Theme color for this word (hex color code)
  accent_color CHAR(7) DEFAULT '#000000',
  
  -- Timestamp when word was created
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Name of admin who approved this word
  approved_by VARCHAR(50),
  
  -- Root family for Wordception feature (e.g., "PIE_kaput")
  root_family VARCHAR(50),
  
  -- Constraint: accent_color must be valid hex
  CONSTRAINT valid_color CHECK (accent_color ~ '^#[0-9A-Fa-f]{6}$')
);

-- ============================================
-- Indexes
-- ============================================

-- Fast lookup by publish date (primary query pattern)
CREATE INDEX IF NOT EXISTS idx_publish_date ON daily_words(publish_date);

-- For Wordception feature: find related words by root family
CREATE INDEX IF NOT EXISTS idx_root_family ON daily_words(root_family) 
  WHERE root_family IS NOT NULL;

-- ============================================
-- Comments (for documentation)
-- ============================================

COMMENT ON TABLE daily_words IS 'Stores daily etymology words with visualization data';
COMMENT ON COLUMN daily_words.visualization_type IS 'Determines which visualizer component to render: MAP, TREE, TIMELINE, or GRID';
COMMENT ON COLUMN daily_words.content_json IS 'JSONB with keys: hook, fun_fact, nerd_mode (optional), visual_data (type-specific)';
COMMENT ON COLUMN daily_words.root_family IS 'Used for Wordception ghost overlay feature - groups words with shared etymology';

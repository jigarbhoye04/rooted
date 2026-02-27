'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { DailyWord } from '@/src/schemas/dailyWord';

/* ========================================
   Types
   ======================================== */

type VisualizationType = 'MAP' | 'TREE' | 'TIMELINE' | 'GRID';

type PreviewWordsCache = {
  data: Record<VisualizationType, DailyWord | null>;
  timestamp: number;
};

/* ========================================
   Constants
   ======================================== */

const VIZ_TYPES: Array<{ value: VisualizationType; label: string; icon: string }> = [
  { value: 'MAP', label: 'Map', icon: 'public' },
  { value: 'TREE', label: 'Tree', icon: 'account_tree' },
  { value: 'TIMELINE', label: 'Timeline', icon: 'timeline' },
  { value: 'GRID', label: 'Grid', icon: 'grid_view' },
];

const SCALE = 0.90;
const CACHE_KEY = 'rooted_preview_words';
const CACHE_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours

/* ========================================
   Cache Helpers
   ======================================== */

function getCachedWords(): PreviewWordsCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const cached: PreviewWordsCache = JSON.parse(raw);
    const age = Date.now() - cached.timestamp;

    if (age > CACHE_DURATION_MS) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return cached;
  } catch {
    return null;
  }
}

function setCachedWords(data: Record<VisualizationType, DailyWord | null>): void {
  try {
    const cache: PreviewWordsCache = { data, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

/* ========================================
   Preview Page Component
   ======================================== */

export default function PreviewPage(): React.JSX.Element {
  const [selectedType, setSelectedType] = useState<VisualizationType>('MAP');
  const [allWords, setAllWords] = useState<Record<VisualizationType, DailyWord | null> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Fetch all word types in a single call, with cache
  const fetchAllWords = useCallback(async (): Promise<void> => {
    // Check cache first
    const cached = getCachedWords();
    if (cached) {
      setAllWords(cached.data);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/preview/words');

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data: unknown = await response.json();

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response shape');
      }

      const words = data as Record<VisualizationType, DailyWord | null>;
      setCachedWords(words);
      setAllWords(words);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to fetch preview words: ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch once on mount
  useEffect(() => {
    fetchAllWords();
  }, [fetchAllWords]);

  // Reset iframe loading state when type changes
  useEffect(() => {
    setIframeLoading(true);
  }, [selectedType]);

  const currentWord = allWords?.[selectedType] ?? null;
  const hasWord = currentWord !== null;

  const handleTypeChange = (type: VisualizationType): void => {
    if (type === selectedType) return;
    setSelectedType(type);
  };

  const handleIframeLoad = (): void => {
    setIframeLoading(false);
  };

  const openFullPage = (): void => {
    if (currentWord) {
      window.open(`/?date=${currentWord.publish_date}&preview=true`, '_blank');
    }
  };

  const clearCacheAndRefresh = (): void => {
    localStorage.removeItem(CACHE_KEY);
    setAllWords(null);
    setError(null);
    fetchAllWords();
  };

  const iframeSrc = currentWord
    ? `/?date=${currentWord.publish_date}&preview=true`
    : null;

  // Count available types
  const availableCount = allWords
    ? Object.values(allWords).filter(Boolean).length
    : 0;

  return (
    <div className="min-h-[calc(100vh-130px)] bg-bg-primary flex flex-col">
      {/* ── Toolbar ── */}
      <div className="sticky top-0 z-50 bg-surface border-b border-border px-4 py-3
                      flex flex-wrap items-center justify-between gap-3">
        {/* Left: Title */}
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-accent-warm"
            style={{ fontSize: 22 }}
          >
            preview
          </span>
          <h1 className="text-base font-bold text-text-primary tracking-tight">
            Page Preview
          </h1>
          {allWords && !loading && (
            <span className="text-xs text-muted ml-1">
              ({availableCount}/4 types)
            </span>
          )}
        </div>

        {/* Center: Type Selector */}
        <div className="flex items-center gap-1 bg-background rounded-lg p-1
                        border border-border-subtle">
          {VIZ_TYPES.map(({ value, label, icon }) => {
            const wordExists = allWords?.[value] !== null && allWords?.[value] !== undefined;
            return (
              <button
                key={value}
                onClick={() => handleTypeChange(value)}
                disabled={loading}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                  transition-all duration-200 cursor-pointer
                  ${selectedType === value
                    ? 'bg-accent-warm text-white shadow-sm'
                    : wordExists
                      ? 'text-muted hover:text-text-primary hover:bg-surface-elevated'
                      : 'text-muted/40 cursor-not-allowed'
                  }
                `}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16 }}
                >
                  {icon}
                </span>
                {label}
                {!loading && !wordExists && (
                  <span className="w-1.5 h-1.5 rounded-full bg-error/60" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Word info + actions */}
        <div className="flex items-center gap-3">
          {currentWord && !loading && (
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-text-primary leading-tight">
                {currentWord.word}
              </p>
              <p className="text-xs text-muted">{currentWord.publish_date}</p>
            </div>
          )}
          {currentWord && (
            <button
              onClick={openFullPage}
              title="Open full page in new tab"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs
                         font-medium text-accent-warm border border-accent-warm/30
                         hover:bg-accent-warm-light transition-colors cursor-pointer"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 14 }}
              >
                open_in_new
              </span>
              Full Page
            </button>
          )}
          <button
            onClick={clearCacheAndRefresh}
            title="Clear cache and refresh"
            className="flex items-center gap-1 px-2 py-1.5 rounded-md text-xs
                       font-medium text-muted hover:text-text-primary
                       hover:bg-surface-elevated transition-colors cursor-pointer"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 14 }}
            >
              refresh
            </span>
          </button>
        </div>
      </div>

      {/* ── Preview Area ── */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={clearCacheAndRefresh} />
        ) : !hasWord ? (
          <EmptyTypeState type={selectedType} />
        ) : iframeSrc ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Scaled iframe container */}
            <div
              className="relative rounded-xl overflow-hidden border border-border
                         shadow-lg bg-white"
              style={{
                width: `${100 / SCALE}%`,
                height: `${100 / SCALE}%`,
                maxWidth: `${100 / SCALE}%`,
                maxHeight: `${100 / SCALE}%`,
                transform: `scale(${SCALE})`,
                transformOrigin: 'center center',
              }}
            >
              {/* iframe loading overlay */}
              {iframeLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center
                                bg-background/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-accent-warm/30
                                    border-t-accent-warm rounded-full animate-spin" />
                    <p className="text-sm text-muted">
                      Rendering {currentWord?.word} ({selectedType})...
                    </p>
                  </div>
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={iframeSrc}
                onLoad={handleIframeLoad}
                title={`Preview: ${currentWord?.word ?? selectedType} (${selectedType})`}
                className="w-full h-full border-none"
                style={{ minHeight: '100vh' }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ========================================
   Sub-components
   ======================================== */

function LoadingState(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-4 animate-fade-in">
      <div className="w-10 h-10 border-2 border-accent-warm/30 border-t-accent-warm
                      rounded-full animate-spin" />
      <p className="text-sm text-muted">Loading preview words...</p>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-4 max-w-sm text-center animate-fade-in">
      <div className="w-14 h-14 rounded-full bg-error-light flex items-center justify-center">
        <span
          className="material-symbols-outlined text-error"
          style={{ fontSize: 28 }}
        >
          error_outline
        </span>
      </div>
      <p className="text-sm text-muted leading-relaxed">{message}</p>
      <p className="text-xs text-muted/60">
        Make sure you have seeded words in the database.
      </p>
      <button
        onClick={onRetry}
        className="mt-2 px-4 py-2 rounded-lg text-sm font-medium text-white
                   bg-accent-warm hover:bg-accent-warm/90 transition-colors cursor-pointer"
      >
        Retry
      </button>
    </div>
  );
}

function EmptyTypeState({ type }: { type: string }): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-4 max-w-sm text-center animate-fade-in">
      <div className="w-14 h-14 rounded-full bg-accent-warm-light
                      flex items-center justify-center">
        <span
          className="material-symbols-outlined text-accent-warm"
          style={{ fontSize: 28 }}
        >
          search_off
        </span>
      </div>
      <p className="text-sm text-muted leading-relaxed">
        No <span className="font-semibold text-text-secondary">{type}</span> words
        found in the database.
      </p>
      <p className="text-xs text-muted/60">
        Run the seed script to add {type} words.
      </p>
    </div>
  );
}

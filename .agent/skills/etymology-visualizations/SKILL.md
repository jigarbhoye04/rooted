---
name: etymology-visualizations
description: Generate React visualization components for Rooted etymology stories. Use when creating Tree, Map, Timeline, or Grid visualizations, implementing D3.js layouts, Framer Motion scrollytelling animations, or optimizing for mobile performance. Handles SVG/Canvas rendering, scroll-triggered state changes, and responsive design.
---

# Etymology Visualizations

Generate production-ready React components for the 4 Rooted visualization types: Tree, Map, Timeline, and Grid. Includes D3.js layouts, Framer Motion animations, and mobile optimization.

## Design System Tokens

**Typography:**
```typescript
const typography = {
  heroWord: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '72px',      // 48px on mobile
    fontWeight: 700,
    lineHeight: 1.1
  },
  phonetic: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '18px',
    fontWeight: 400,
    color: '#6B7280'       // Gray-500
  },
  storyCardTitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: 1.4
  },
  storyCardBody: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.6
  },
  nodeLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.3
  }
};
```

**Colors:**
```typescript
const colors = {
  background: '#F9F9F9',    // Off-white
  text: '#1A1A1A',          // Near-black
  mutedText: '#6B7280',     // Gray-500
  // Dynamic accent (per word, passed as prop)
  accent: 'var(--accent-color)'
};
```

**Animation Timing:**
```typescript
const timing = {
  fast: 200,      // UI feedback (button clicks)
  medium: 500,    // Content transitions
  slow: 800,      // Scrollytelling (up to 1200ms)
  easing: {
    default: [0.4, 0, 0.2, 1],         // Material ease-in-out
    scroll: [0.16, 1, 0.3, 1]          // Smooth deceleration
  }
};
```

## Component Architecture

All visualizations follow this structure:

```typescript
interface VisualizerProps {
  data: VisualData;           // From content_json.visual_data
  accentColor: string;        // From daily_words.accent_color
  scrollProgress?: number;    // Optional scroll control
}

const Visualizer = ({ data, accentColor, scrollProgress }: VisualizerProps) => {
  // 1. Parse data
  // 2. Set up scroll listeners (if scrollytelling)
  // 3. Render visualization
  // 4. Handle animations
}
```

## Visualization Type 1: Tree

**Use for:** Words with root etymology and derivatives (e.g., Captain, Muscle)

### Basic Tree Component

```typescript
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

interface TreeData {
  type: 'TREE';
  layout: 'radial' | 'dendrogram';
  root: {
    term: string;
    language: string;
    meaning: string;
    era: string;
  };
  children: TreeNode[];
}

interface TreeNode {
  term: string;
  language: string;
  meaning: string;
  era: string;
  children?: TreeNode[];
}

export const TreeVisualizer = ({ data, accentColor }: { data: TreeData; accentColor: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    // Clear previous render
    svg.selectAll('*').remove();

    // Create D3 hierarchy
    const root = d3.hierarchy({
      name: data.root.term,
      ...data.root,
      children: data.children
    });

    // Choose layout
    let tree;
    if (data.layout === 'radial') {
      tree = d3.tree<typeof root>()
        .size([2 * Math.PI, Math.min(width, height) / 2 - 100])
        .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);
    } else {
      tree = d3.tree<typeof root>()
        .size([height - 100, width - 200]);
    }

    const treeData = tree(root);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Draw links (with animation)
    const link = data.layout === 'radial'
      ? d3.linkRadial<any, any>()
          .angle((d: any) => d.x)
          .radius((d: any) => d.y)
      : d3.linkHorizontal<any, any>()
          .x((d: any) => d.y)
          .y((d: any) => d.x);

    g.selectAll('.link')
      .data(treeData.links())
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', accentColor)
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.3)
      .attr('d', link as any)
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .style('opacity', 1);

    // Draw nodes
    const node = g.selectAll('.node')
      .data(treeData.descendants())
      .join('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => {
        if (data.layout === 'radial') {
          return `rotate(${(d.x * 180 / Math.PI - 90)}) translate(${d.y},0)`;
        } else {
          return `translate(${d.y},${d.x})`;
        }
      })
      .style('opacity', 0);

    // Node circles
    node.append('circle')
      .attr('r', 8)
      .attr('fill', accentColor)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Node labels
    node.append('text')
      .attr('dy', '.31em')
      .attr('x', (d: any) => data.layout === 'radial' ? (d.x < Math.PI ? 12 : -12) : 12)
      .attr('text-anchor', (d: any) => data.layout === 'radial' ? (d.x < Math.PI ? 'start' : 'end') : 'start')
      .text((d: any) => d.data.term || d.data.name)
      .style('font-family', 'Inter, sans-serif')
      .style('font-size', '14px')
      .style('font-weight', 500)
      .style('fill', '#1A1A1A');

    // Animate nodes
    node.transition()
      .duration(500)
      .delay((d, i) => i * 150)
      .style('opacity', 1);

  }, [data, accentColor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="600"
      viewBox="0 0 800 600"
      style={{ maxWidth: '100%' }}
    />
  );
};
```

### Scrollytelling Tree

For scroll-triggered animations:

```typescript
import { useScroll, useTransform } from 'framer-motion';

export const ScrollTreeVisualizer = ({ data, accentColor }: { data: TreeData; accentColor: string }) => {
  const { scrollYProgress } = useScroll();
  
  // Map scroll to reveal stages
  // 0-0.3: Show root only
  // 0.3-0.6: Show first-level children
  // 0.6-1.0: Show all descendants
  
  const visibleDepth = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 2, 3]);

  return (
    <motion.div
      style={{
        position: 'sticky',
        top: '20vh',
        height: '60vh'
      }}
    >
      {/* Render tree with depth filtering based on scroll */}
      <TreeVisualizer data={data} accentColor={accentColor} maxDepth={visibleDepth} />
    </motion.div>
  );
};
```

## Visualization Type 2: Map

**Use for:** Words with geographic journeys (e.g., Coffee, Sabotage, Silk)

### Basic Map Component

```typescript
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';

interface MapData {
  type: 'MAP';
  projection: 'orthographic' | 'mercator';
  points: MapPoint[];
  routes: MapRoute[];
}

interface MapPoint {
  order: number;
  location_name: string;
  coordinates: [number, number];  // [lat, lng]
  era: string;
  context: string;
  influence_radius_km: number;
}

interface MapRoute {
  from: number;  // Point order
  to: number;
  method: string;
  duration_years: number;
}

export const MapVisualizer = ({ data, accentColor }: { data: MapData; accentColor: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;
    const svg = d3.select(svgRef.current);
    
    svg.selectAll('*').remove();

    // Set up projection
    let projection;
    if (data.projection === 'orthographic') {
      projection = d3.geoOrthographic()
        .scale(250)
        .translate([width / 2, height / 2])
        .clipAngle(90);
    } else {
      projection = d3.geoMercator()
        .scale(130)
        .translate([width / 2, height / 2]);
    }

    const path = d3.geoPath().projection(projection);

    // Load and render world map (assume topojson data is available)
    // In production, load from /public/world-110m.json
    fetch('/world-110m.json')
      .then(response => response.json())
      .then(world => {
        const countries = feature(world, world.objects.countries);

        // Draw countries
        svg.append('g')
          .selectAll('path')
          .data(countries.features)
          .join('path')
          .attr('d', path as any)
          .attr('fill', '#E5E7EB')
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.5);

        // Draw routes (bezier curves)
        const routesGroup = svg.append('g').attr('class', 'routes');

        data.routes.forEach((route, i) => {
          const fromPoint = data.points.find(p => p.order === route.from);
          const toPoint = data.points.find(p => p.order === route.to);
          
          if (!fromPoint || !toPoint) return;

          const from = projection(fromPoint.coordinates.reverse()) as [number, number];
          const to = projection(toPoint.coordinates.reverse()) as [number, number];

          // Create curved path
          const midX = (from[0] + to[0]) / 2;
          const midY = (from[1] + to[1]) / 2 - 50; // Curve upward

          const lineGenerator = d3.line().curve(d3.curveBasis);
          const pathData = lineGenerator([from, [midX, midY], to]);

          routesGroup.append('path')
            .attr('d', pathData!)
            .attr('fill', 'none')
            .attr('stroke', accentColor)
            .attr('stroke-width', 3)
            .attr('stroke-dasharray', '5,5')
            .attr('stroke-opacity', 0)
            .transition()
            .delay(i * 1000)
            .duration(1200)
            .attr('stroke-opacity', 0.6);
        });

        // Draw points
        const pointsGroup = svg.append('g').attr('class', 'points');

        data.points.forEach((point, i) => {
          const coords = projection(point.coordinates.reverse()) as [number, number];

          // Influence circle (expands over time)
          pointsGroup.append('circle')
            .attr('cx', coords[0])
            .attr('cy', coords[1])
            .attr('r', 0)
            .attr('fill', accentColor)
            .attr('opacity', 0.1)
            .transition()
            .delay(i * 1000)
            .duration(1500)
            .attr('r', 30);

          // Point marker
          pointsGroup.append('circle')
            .attr('cx', coords[0])
            .attr('cy', coords[1])
            .attr('r', 0)
            .attr('fill', accentColor)
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .transition()
            .delay(i * 1000)
            .duration(500)
            .attr('r', 8);

          // Label
          pointsGroup.append('text')
            .attr('x', coords[0])
            .attr('y', coords[1] - 15)
            .attr('text-anchor', 'middle')
            .text(point.location_name)
            .style('font-family', 'Inter, sans-serif')
            .style('font-size', '12px')
            .style('font-weight', 600)
            .style('fill', '#1A1A1A')
            .style('opacity', 0)
            .transition()
            .delay(i * 1000 + 500)
            .duration(500)
            .style('opacity', 1);
        });
      });

  }, [data, accentColor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="600"
      viewBox="0 0 800 600"
      style={{ maxWidth: '100%' }}
    />
  );
};
```

### Scrollytelling Map

```typescript
export const ScrollMapVisualizer = ({ data, accentColor }: { data: MapData; accentColor: string }) => {
  const { scrollYProgress } = useScroll();
  
  // Map scroll to zoom states
  const zoom = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 3, 2, 1]);
  const centerIndex = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 0, 1, 2]);

  return (
    <motion.div
      style={{
        position: 'sticky',
        top: '20vh',
        height: '60vh',
        scale: zoom
      }}
    >
      <MapVisualizer data={data} accentColor={accentColor} />
    </motion.div>
  );
};
```

## Visualization Type 3: Timeline

**Use for:** Words with temporal progression (e.g., Algorithm, Awful)

### Timeline Component

```typescript
interface TimelineData {
  type: 'TIMELINE';
  epochs: TimelineEpoch[];
}

interface TimelineEpoch {
  order: number;
  era: string;
  term: string;
  meaning: string;
  usage_example: string;
  sentiment: 'positive' | 'negative' | 'neutral' | 'negative_shift';
}

export const TimelineVisualizer = ({ data, accentColor }: { data: TimelineData; accentColor: string }) => {
  return (
    <div className="timeline-container" style={{ padding: '2rem' }}>
      <div className="timeline-line" style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: '2px',
        background: accentColor,
        opacity: 0.3
      }} />

      {data.epochs.map((epoch, i) => (
        <motion.div
          key={epoch.order}
          className="timeline-epoch"
          initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: 'flex',
            justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start',
            marginBottom: '3rem',
            paddingLeft: i % 2 === 0 ? 0 : '52%',
            paddingRight: i % 2 === 0 ? '52%' : 0
          }}
        >
          <div style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            position: 'relative'
          }}>
            {/* Era badge */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '1rem',
              background: accentColor,
              color: '#fff',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 600
            }}>
              {epoch.era}
            </div>

            {/* Term */}
            <h3 style={{
              marginTop: '1rem',
              fontFamily: 'Playfair Display, serif',
              fontSize: '24px',
              fontWeight: 700,
              color: '#1A1A1A'
            }}>
              {epoch.term}
            </h3>

            {/* Meaning */}
            <p style={{
              marginTop: '0.5rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              lineHeight: 1.6,
              color: '#1A1A1A'
            }}>
              {epoch.meaning}
            </p>

            {/* Usage example */}
            <p style={{
              marginTop: '1rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontStyle: 'italic',
              color: '#6B7280',
              borderLeft: `3px solid ${accentColor}`,
              paddingLeft: '1rem'
            }}>
              "{epoch.usage_example}"
            </p>

            {/* Sentiment indicator */}
            <div style={{
              marginTop: '1rem',
              fontSize: '12px',
              color: epoch.sentiment === 'positive' ? '#059669' : 
                     epoch.sentiment === 'negative' ? '#DC2626' : '#6B7280'
            }}>
              {epoch.sentiment === 'positive' ? '↑ Positive' : 
               epoch.sentiment === 'negative' ? '↓ Negative' :
               epoch.sentiment === 'negative_shift' ? '↓ Shifting negative' : 
               '→ Neutral'}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
```

## Visualization Type 4: Grid

**Use for:** Cross-linguistic patterns (e.g., Mother, Hello)

### Grid Component

```typescript
interface GridData {
  type: 'GRID';
  pattern: 'cognate' | 'loanword';
  languages: GridLanguage[];
}

interface GridLanguage {
  name: string;
  word: string;
  script: string;
  script_type: string;
  pronunciation: string;
}

export const GridVisualizer = ({ data, accentColor }: { data: GridData; accentColor: string }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      padding: '2rem'
    }}>
      {data.languages.map((lang, i) => (
        <motion.div
          key={lang.name}
          initial={{ opacity: 0, rotateY: -90 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            border: `2px solid transparent`,
            transition: 'border-color 0.3s'
          }}
          onHoverStart={(e: any) => {
            e.currentTarget.style.borderColor = accentColor;
          }}
          onHoverEnd={(e: any) => {
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          {/* Language name */}
          <div style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem'
          }}>
            {lang.name}
          </div>

          {/* Word in native script */}
          <div style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#1A1A1A',
            marginBottom: '0.5rem',
            fontFamily: getScriptFont(lang.script_type)
          }}>
            {lang.script}
          </div>

          {/* Romanization */}
          <div style={{
            fontSize: '14px',
            color: '#6B7280',
            marginBottom: '0.25rem'
          }}>
            {lang.word}
          </div>

          {/* Pronunciation */}
          <div style={{
            fontSize: '12px',
            color: '#9CA3AF',
            fontStyle: 'italic'
          }}>
            {lang.pronunciation}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Helper to select appropriate font for script
function getScriptFont(scriptType: string): string {
  const fonts: Record<string, string> = {
    'Devanagari': "'Noto Sans Devanagari', sans-serif",
    'Arabic': "'Noto Naskh Arabic', serif",
    'Cyrillic': "'Inter', sans-serif",
    'Greek': "'Noto Serif', serif",
    'Latin': "'Playfair Display', serif"
  };
  return fonts[scriptType] || "'Inter', sans-serif";
}
```

## Mobile Optimization

### Performance Detection

```typescript
const isLowEndDevice = () => {
  // Check hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true;
  }
  
  // Check device memory (if available)
  if ('deviceMemory' in navigator && (navigator as any).deviceMemory < 4) {
    return true;
  }
  
  return false;
};
```

### Canvas Fallback for Complex Visualizations

```typescript
export const OptimizedTreeVisualizer = ({ data, accentColor }: { data: TreeData; accentColor: string }) => {
  const [useCanvas, setUseCanvas] = useState(false);

  useEffect(() => {
    setUseCanvas(isLowEndDevice());
  }, []);

  if (useCanvas) {
    return <CanvasTreeVisualizer data={data} accentColor={accentColor} />;
  }

  return <TreeVisualizer data={data} accentColor={accentColor} />;
};

// Canvas-based renderer (more performant on low-end devices)
const CanvasTreeVisualizer = ({ data, accentColor }: { data: TreeData; accentColor: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Render tree to canvas instead of SVG
    // (Implementation similar to SVG but using Canvas API)
    // This reduces DOM nodes and improves performance

  }, [data, accentColor]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};
```

### Responsive Sizing

```typescript
const useResponsiveSize = () => {
  const [size, setSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSize({ width: width - 32, height: 400 });
      } else if (width < 1024) {
        setSize({ width: 700, height: 500 });
      } else {
        setSize({ width: 800, height: 600 });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};
```

## Story Cards (Scrollytelling Overlays)

```typescript
interface StoryCard {
  content: string;
  scrollTrigger: number;  // 0-1 (scroll progress)
}

export const StoryCardOverlay = ({ cards }: { cards: StoryCard[] }) => {
  const { scrollYProgress } = useScroll();

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      {cards.map((card, i) => {
        const opacity = useTransform(
          scrollYProgress,
          [card.scrollTrigger - 0.1, card.scrollTrigger, card.scrollTrigger + 0.2, card.scrollTrigger + 0.3],
          [0, 1, 1, 0]
        );

        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '400px',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              opacity
            }}
          >
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '18px',
              lineHeight: 1.6,
              color: '#1A1A1A'
            }}>
              {card.content}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};
```

## Complete Page Example

```typescript
import { useScroll } from 'framer-motion';

export const WordPage = ({ wordData }: { wordData: DailyWord }) => {
  const { scrollYProgress } = useScroll();

  return (
    <div>
      {/* Section 1: The Hook */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center' }}
        >
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '72px',
            fontWeight: 700,
            color: '#1A1A1A'
          }}>
            {wordData.word}
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px',
            color: '#6B7280',
            marginTop: '1rem'
          }}>
            {wordData.phonetic}
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ marginTop: '3rem', color: '#6B7280' }}
          >
            Scroll to explore ↓
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2: The Visualization */}
      <section style={{ position: 'relative', height: '400vh' }}>
        {/* Sticky visualization */}
        <div style={{ position: 'sticky', top: '20vh', height: '60vh' }}>
          <VisualizerSelector data={wordData.content_json.visual_data} accentColor={wordData.accent_color} />
        </div>

        {/* Story cards */}
        <StoryCardOverlay cards={getStoryCards(wordData)} />
      </section>

      {/* Section 3: Fun Fact */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F9F9' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ maxWidth: '600px', padding: '2rem', textAlign: 'center' }}
        >
          <div style={{ fontSize: '48px', marginBottom: '1rem' }}>💡</div>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '24px',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            Did You Know?
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#1A1A1A'
          }}>
            {wordData.content_json.fun_fact}
          </p>
        </motion.div>
      </section>
    </div>
  );
};
```

## Component Selector

```typescript
const VisualizerSelector = ({ data, accentColor }: { data: VisualData; accentColor: string }) => {
  switch (data.type) {
    case 'TREE':
      return <TreeVisualizer data={data} accentColor={accentColor} />;
    case 'MAP':
      return <MapVisualizer data={data} accentColor={accentColor} />;
    case 'TIMELINE':
      return <TimelineVisualizer data={data} accentColor={accentColor} />;
    case 'GRID':
      return <GridVisualizer data={data} accentColor={accentColor} />;
    default:
      return null;
  }
};
```

## Testing & Debugging

```typescript
// Test component with mock data
export const VisualizerDemo = () => {
  const mockTreeData: TreeData = {
    type: 'TREE',
    layout: 'dendrogram',
    root: {
      term: 'Caput',
      language: 'Latin',
      meaning: 'Head',
      era: 'Classical Latin (100 BCE)'
    },
    children: [
      {
        term: 'Captain',
        language: 'English via Old French',
        meaning: 'Chief / Leader',
        era: '1300s',
        children: [
          {
            term: 'Capitalize',
            language: 'English',
            meaning: 'To write with a capital letter',
            era: '1700s'
          }
        ]
      },
      {
        term: 'Cape',
        language: 'English via Latin',
        meaning: 'Hooded cloak',
        era: '1500s'
      }
    ]
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Tree Visualization Test</h2>
      <TreeVisualizer data={mockTreeData} accentColor="#1E40AF" />
    </div>
  );
};
```

## Next Steps

1. **Install dependencies:**
   ```bash
   npm install d3 topojson-client framer-motion
   npm install --save-dev @types/d3 @types/topojson-client
   ```

2. **Add TopoJSON map data** to `/public/world-110m.json`

3. **Set up CSS custom properties** for accent colors:
   ```css
   :root {
     --accent-color: #000000;
   }
   ```

4. **Test each visualization type** with your seed words

5. **Optimize for production:**
   - Enable tree shaking for D3 (import only needed modules)
   - Lazy load visualization components
   - Compress TopoJSON data
   - Add loading states

For content generation, use the **etymology-content-pipeline** skill.

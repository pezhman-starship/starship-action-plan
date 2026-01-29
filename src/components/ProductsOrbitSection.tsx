import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { products, orbitRings, personas, touchpoints, type Product } from '@/data/planContent';
import { useFilters } from './FilterContext';

type LucideIconName = keyof typeof LucideIcons;

const getIcon = (iconName: string) => {
  const Icon = LucideIcons[iconName as LucideIconName];
  if (Icon && typeof Icon === 'function') {
    return Icon as React.ComponentType<{ className?: string }>;
  }
  return LucideIcons.Circle;
};

const orbitColors: Record<string, string> = {
  demand: 'hsl(185 80% 50%)',
  merchant: 'hsl(35 90% 55%)',
  fulfillment: 'hsl(145 70% 50%)',
  control: 'hsl(280 70% 60%)',
  enablers: 'hsl(350 75% 55%)',
  adjacent: 'hsl(210 70% 60%)',
};

const orbitBgColors: Record<string, string> = {
  demand: 'hsl(185 80% 50% / 0.15)',
  merchant: 'hsl(35 90% 55% / 0.15)',
  fulfillment: 'hsl(145 70% 50% / 0.15)',
  control: 'hsl(280 70% 60% / 0.15)',
  enablers: 'hsl(350 75% 55% / 0.15)',
  adjacent: 'hsl(210 70% 60% / 0.15)',
};

export const ProductsOrbitSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { matchesFilter } = useFilters();
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const [orbitSize, setOrbitSize] = useState({ width: 0, height: 0 });

  const filteredProducts = products.filter(p => 
    matchesFilter(p.personas, p.touchpoints)
  );

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      setOrbitSize({ width: rect.width, height: rect.height });
    };

    updateSize();

    // Keep ring radii responsive to container size changes.
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const orderedProducts = filteredProducts
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id) || a.name.localeCompare(b.name));

  const nonCenterProducts = orderedProducts.filter(p => p.id !== 'starship-360');

  const layout = useMemo(() => {
    const width = orbitSize.width || 760;
    const height = orbitSize.height || 640;

    const size = Math.min(width, height);
    const base = size / 2;

    const isMd = width >= 768;
    const centerSize = isMd ? 96 : 80;
    const centerRadius = centerSize / 2;

    let nodeSize = isMd ? 56 : 48;
    const minNodeSize = 40;

    const safePadding = isMd ? 24 : 20;
    const labelPad = isMd ? 26 : 22; // extra space so text doesn't collide
    const hoverFactor = 1.2;

    // Deterministic hash in [0,1)
    const hash01 = (s: string) => {
      let h = 2166136261;
      for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return (h >>> 0) / 4294967296;
    };

    const solve = (nodeSizeLocal: number) => {
      const nodeRadius = nodeSizeLocal / 2;

      const effectiveDiameter = nodeSizeLocal * hoverFactor;
      const gap = isMd ? 18 : 16;
      const minSep = effectiveDiameter + gap; // circle-to-circle separation

      const maxR = base - nodeRadius - safePadding - labelPad;
      const minR = centerRadius + (isMd ? 96 : 84);

      if (maxR <= minR + 8) {
        return { ok: false as const, positioned: [], rings: [] as number[] };
      }

      const n = nonCenterProducts.length;
      if (n === 0) {
        return { ok: true as const, positioned: [], rings: [minR, (minR + maxR) / 2, maxR] };
      }

      // Golden angle distribution in annulus
      const golden = Math.PI * (3 - Math.sqrt(5));
      const points = nonCenterProducts.map((p, i) => {
        const t = (i + 0.5) / n; // 0..1
        const baseR = minR + (maxR - minR) * Math.sqrt(t);

        const j = hash01(p.id);
        const jitterA = (j - 0.5) * 0.45; // radians, small
        const jitterR = (hash01(p.id + ':r') - 0.5) * (isMd ? 18 : 14);

        const angle = i * golden - Math.PI / 2 + jitterA;
        const r = Math.min(maxR, Math.max(minR, baseR + jitterR));

        return {
          product: p,
          x: Math.cos(angle) * r,
          y: Math.sin(angle) * r,
        };
      });

      // Relaxation: push apart if too close
      const iters = 14;
      for (let k = 0; k < iters; k++) {
        for (let a = 0; a < points.length; a++) {
          for (let b = a + 1; b < points.length; b++) {
            const dx = points[b].x - points[a].x;
            const dy = points[b].y - points[a].y;
            const d = Math.hypot(dx, dy) || 0.0001;

            const target = minSep;
            if (d < target) {
              const push = (target - d) * 0.5;
              const ux = dx / d;
              const uy = dy / d;

              points[a].x -= ux * push;
              points[a].y -= uy * push;
              points[b].x += ux * push;
              points[b].y += uy * push;
            }
          }

          // Clamp back into annulus
          const rr = Math.hypot(points[a].x, points[a].y) || 0.0001;
          const clamped = Math.min(maxR, Math.max(minR, rr));
          points[a].x = (points[a].x / rr) * clamped;
          points[a].y = (points[a].y / rr) * clamped;
        }
      }

      // Final validation: if still overlapping badly, fail so caller can shrink node size
      for (let a = 0; a < points.length; a++) {
        for (let b = a + 1; b < points.length; b++) {
          const d = Math.hypot(points[b].x - points[a].x, points[b].y - points[a].y);
          if (d < minSep * 0.92) {
            return { ok: false as const, positioned: [], rings: [minR, (minR + maxR) / 2, maxR] };
          }
        }
      }

      return {
        ok: true as const,
        positioned: points.map(({ product, x, y }) => ({ product, x, y })),
        rings: [minR, (minR + maxR) / 2, maxR],
      };
    };

    let res = solve(nodeSize);
    while (!res.ok && nodeSize > minNodeSize) {
      nodeSize -= 4;
      res = solve(nodeSize);
    }

    return {
      positioned: res.positioned,
      rings: res.rings,
      nodeSize,
    };
  }, [orbitSize, nonCenterProducts]);

  return (
    <section id="products" className="py-14">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-header text-center">
            <span className="text-gradient">Products & Services</span>
          </h2>
          <p className="section-subheader text-center max-w-2xl mx-auto">
            The Starship 360 campus suite — click any product for details
          </p>

          {/* Orbit Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {orbitRings.map((ring) => (
              <div key={ring.id} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ background: orbitColors[ring.id] }}
                />
                <span className="text-muted-foreground">{ring.name}</span>
              </div>
            ))}
          </div>

          {/* Orbit Visualization */}
          <div className="relative w-full">
            <div
              ref={orbitRef}
              className="relative mx-auto aspect-square w-full max-w-[760px]"
              style={{ maxHeight: '72vh' }}
            >
            {/* Center Node */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg animate-pulse-glow">
                <div className="text-center">
                  <LucideIcons.Orbit className="h-6 w-6 md:h-7 md:w-7 text-primary-foreground mx-auto mb-1" />
                  <span className="text-[9px] md:text-[10px] font-bold text-primary-foreground">Starship 360</span>
                </div>
              </div>
            </motion.div>

            {/* Orbit Rings */}
            {layout.rings.map((radius, index) => (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-muted/30 pointer-events-none"
                style={{ 
                  width: radius * 2, 
                  height: radius * 2,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}

            {/* Products by Ring */}
            {layout.positioned.map(({ product, x, y }) => {
              const Icon = getIcon(product.icon);

              return (
                <motion.button
                  key={product.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 }}
                  whileHover={{ scale: 1.2, zIndex: 30 }}
                  onClick={() => setSelectedProduct(product)}
                  className="absolute focus-ring rounded-full"
                  style={{ 
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 5,
                  }}
                  aria-label={`View details for ${product.name}`}
                >
                  <div 
                    className="rounded-full flex items-center justify-center cursor-pointer transition-all hover:shadow-lg"
                    style={{ 
                      width: layout.nodeSize,
                      height: layout.nodeSize,
                      background: orbitBgColors[product.orbitRing],
                      border: `2px solid ${orbitColors[product.orbitRing]}`,
                    }}
                  >
                    <Icon className="h-5 w-5 md:h-6 md:w-6" style={{ color: orbitColors[product.orbitRing] }} />
                  </div>
                  <span 
                    className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] whitespace-nowrap text-muted-foreground max-w-[100px] md:max-w-[120px] truncate text-center font-medium"
                  >
                    {product.name.replace('Starship ', '').replace('Campus ', '')}
                  </span>
                </motion.button>
              );
            })}
          </div>
          </div>

          {/* Product List (Fallback / Alternative View) */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => {
              const Icon = getIcon(product.icon);
              return (
                <motion.button
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedProduct(product)}
                  className="card-glass p-4 rounded-xl text-left transition-all focus-ring hover:border-primary/30"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ 
                        background: orbitBgColors[product.orbitRing],
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: orbitColors[product.orbitRing] }} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm truncate">{product.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Product Detail Panel */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-card border-l border-border z-50 overflow-y-auto"
              role="dialog"
              aria-labelledby="product-title"
              aria-modal="true"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = getIcon(selectedProduct.icon);
                      return (
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ 
                            background: orbitBgColors[selectedProduct.orbitRing],
                          }}
                        >
                          <Icon className="h-6 w-6" style={{ color: orbitColors[selectedProduct.orbitRing] }} />
                        </div>
                      );
                    })()}
                    <div>
                      <h3 id="product-title" className="font-display text-xl font-bold">{selectedProduct.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {orbitRings.find(r => r.id === selectedProduct.orbitRing)?.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 hover:bg-muted rounded-lg focus-ring"
                    aria-label="Close panel"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Aliases */}
                {selectedProduct.aliases.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Also known as</h4>
                    <p className="text-sm">{selectedProduct.aliases.join(', ')}</p>
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Description</h4>
                  <p className="text-foreground/90 leading-relaxed">{selectedProduct.description}</p>
                </div>

                {/* Touchpoints */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Related Touchpoints</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.touchpoints.map(t => {
                      const touchpoint = touchpoints.find(tp => tp.id === t);
                      return touchpoint ? (
                        <span key={t} className="touchpoint-tag">{touchpoint.name}</span>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Personas */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Personas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.personas.map(p => {
                      const persona = personas.find(pe => pe.id === p);
                      return persona ? (
                        <span key={p} className={`persona-tag ${persona.color}`}>{persona.name}</span>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Pain Tags */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Related Pains</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.painTags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded bg-destructive/10 text-destructive text-xs">
                        {tag.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

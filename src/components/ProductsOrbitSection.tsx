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

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

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
    const width = orbitSize.width || 400;
    const height = orbitSize.height || 400;
    const size = Math.min(width, height);
    
    // Scale everything relative to container size
    const scale = size / 400; // Base design is 400px
    
    const isMd = width >= 768;
    const centerRadius = (isMd ? 48 : 40) * Math.min(scale, 1);
    
    // Node size scales with container but has min/max bounds
    const baseNodeSize = isMd ? 44 : 36;
    const nodeSize = Math.max(32, Math.min(56, baseNodeSize * scale));
    
    // Calculate safe radii that keep nodes inside container
    const padding = nodeSize + 30; // Space for node + label
    const maxRadius = (size / 2) - padding;
    const minRadius = centerRadius + nodeSize + 20;
    
    // If not enough space, reduce radii proportionally
    const availableSpace = maxRadius - minRadius;
    
    const n = nonCenterProducts.length;
    if (n === 0 || availableSpace < 40) {
      return {
        positioned: [],
        rings: [minRadius, (minRadius + maxRadius) / 2, maxRadius],
        nodeSize,
      };
    }
    
    // Distribute products evenly in a single ring or multiple rings based on count
    const ringCount = n <= 8 ? 1 : n <= 16 ? 2 : 3;
    const ringSpacing = availableSpace / (ringCount + 1);
    
    const positioned = nonCenterProducts.map((product, i) => {
      // Determine which ring this product goes on
      const ringIndex = Math.floor((i / n) * ringCount);
      const radius = minRadius + ringSpacing * (ringIndex + 1);
      
      // Calculate angle with offset per ring to avoid alignment
      const productsInRing = Math.ceil(n / ringCount);
      const indexInRing = i % productsInRing;
      const angleStep = (2 * Math.PI) / productsInRing;
      const ringOffset = ringIndex * (Math.PI / ringCount);
      const angle = indexInRing * angleStep + ringOffset - Math.PI / 2;
      
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      return {
        product,
        x,
        y,
        angle,
      };
    });
    
    return {
      positioned,
      rings: Array.from({ length: ringCount }, (_, i) => minRadius + ringSpacing * (i + 1)),
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
          <div className="relative w-full flex justify-center">
            <div
              ref={orbitRef}
              className="relative mx-auto aspect-square w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px]"
              style={{ minHeight: '320px' }}
            >
            {/* Center Node */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="pointer-events-auto"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg animate-pulse-glow">
                  <div className="text-center">
                    <LucideIcons.Orbit className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground mx-auto mb-0.5" />
                    <span className="text-[8px] md:text-[9px] font-bold text-primary-foreground">Starship 360</span>
                  </div>
                </div>
              </motion.div>
            </div>

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
            {layout.positioned.map((pos) => {
              const { product, x, y, angle } = pos;
              const Icon = getIcon(product.icon);

              // Position label outside the node, pointing outward from center
              const labelDistance = layout.nodeSize / 2 + 18;
              const labelX = Math.cos(angle) * labelDistance;
              const labelY = Math.sin(angle) * labelDistance;
              
              // Determine text alignment based on angle
              const isRightSide = angle > -Math.PI / 2 && angle < Math.PI / 2;

              return (
                <motion.button
                  key={product.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 }}
                  whileHover={{ scale: 1.15, zIndex: 30 }}
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
                    <Icon className="h-4 w-4 md:h-5 md:w-5" style={{ color: orbitColors[product.orbitRing] }} />
                  </div>
                  <span
                    className="absolute text-[10px] md:text-xs text-muted-foreground whitespace-nowrap pointer-events-none"
                    style={{
                      left: `calc(50% + ${labelX}px)`,
                      top: `calc(50% + ${labelY}px)`,
                      transform: isRightSide ? 'translateY(-50%)' : 'translate(-100%, -50%)',
                    }}
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

import { useState } from 'react';
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

  const filteredProducts = products.filter(p => 
    matchesFilter(p.personas, p.touchpoints)
  );

  const productsByRing = orbitRings.map(ring => ({
    ...ring,
    products: filteredProducts.filter(p => p.orbitRing === ring.id)
  }));

  return (
    <section id="products" className="py-20">
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
          <div className="flex flex-wrap justify-center gap-4 mb-12">
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
          <div className="relative min-h-[600px] md:min-h-[700px]">
            {/* Center Node */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg animate-pulse-glow">
                <div className="text-center">
                  <LucideIcons.Orbit className="h-8 w-8 md:h-10 md:w-10 text-primary-foreground mx-auto mb-1" />
                  <span className="text-xs md:text-sm font-bold text-primary-foreground">Starship 360</span>
                </div>
              </div>
            </motion.div>

            {/* Orbit Rings */}
            {[120, 180, 240, 300].map((radius, i) => (
              <div
                key={i}
                className="orbit-ring pointer-events-none"
                style={{ width: radius * 2, height: radius * 2 }}
              />
            ))}

            {/* Products by Ring */}
            {productsByRing.map((ring) => {
              const baseRadius = ring.id === 'demand' ? 100 : 
                               ring.id === 'merchant' ? 140 :
                               ring.id === 'fulfillment' ? 180 :
                               ring.id === 'control' ? 220 :
                               ring.id === 'enablers' ? 260 : 300;
              
              return ring.products.map((product, index) => {
                const angle = (index / Math.max(ring.products.length, 1)) * 2 * Math.PI - Math.PI / 2;
                const x = Math.cos(angle) * baseRadius;
                const y = Math.sin(angle) * baseRadius;
                const Icon = getIcon(product.icon);

                return (
                  <motion.button
                    key={product.id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedProduct(product)}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 focus-ring rounded-full"
                    style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                    aria-label={`View details for ${product.name}`}
                  >
                    <div 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all hover:shadow-lg"
                      style={{ 
                        background: orbitBgColors[ring.id],
                        border: `2px solid ${orbitColors[ring.id]}`,
                      }}
                    >
                      <Icon className="h-5 w-5 md:h-6 md:w-6" style={{ color: orbitColors[ring.id] }} />
                    </div>
                    <span 
                      className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-muted-foreground max-w-[100px] truncate"
                    >
                      {product.name.replace('Starship ', '')}
                    </span>
                  </motion.button>
                );
              });
            })}
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

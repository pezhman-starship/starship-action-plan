import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, X, Info } from 'lucide-react';
import { metrics, metricCategories, personas, touchpoints, type Metric } from '@/data/planContent';
import { useFilters } from './FilterContext';

const categoryColors: Record<string, string> = {
  'Reliability': 'hsl(185 80% 50%)',
  'Marketplace Balance': 'hsl(145 70% 50%)',
  'Merchant Ops': 'hsl(35 90% 55%)',
  'Handoff': 'hsl(280 70% 60%)',
  'Support': 'hsl(350 75% 55%)',
  'Accessibility': 'hsl(210 70% 60%)',
  'Fleet/Infra': 'hsl(170 70% 50%)',
};

export const MetricsSection = () => {
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);
  const { matchesFilter } = useFilters();

  const filteredMetrics = metrics.filter(m => 
    matchesFilter(m.personas, m.touchpointsInfluencing)
  );

  const metricsByCategory = metricCategories.map(category => ({
    category,
    metrics: filteredMetrics.filter(m => m.category === category),
    color: categoryColors[category] || 'hsl(210 70% 60%)',
  })).filter(c => c.metrics.length > 0);

  return (
    <section id="metrics" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-header text-center">
            <span className="text-gradient">Metrics Dashboard</span>
          </h2>
          <p className="section-subheader text-center max-w-2xl mx-auto">
            KPIs that matter — click any tile for details
          </p>

          {/* Metrics by Category */}
          <div className="space-y-8 max-w-6xl mx-auto">
            {metricsByCategory.map(({ category, metrics: categoryMetrics, color }) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 
                  className="text-lg font-semibold mb-4 flex items-center gap-2"
                  style={{ color }}
                >
                  <TrendingUp className="h-5 w-5" />
                  {category}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryMetrics.map((metric, index) => (
                    <motion.button
                      key={metric.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedMetric(metric)}
                      className="kpi-tile text-left focus-ring"
                      style={{ borderLeft: `3px solid ${color}` }}
                    >
                      <h4 className="font-semibold mb-2">{metric.name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {metric.definition}
                      </p>
                      <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                        <Info className="h-3 w-3" />
                        <span>Click for details</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredMetrics.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              No metrics match the current filters.
            </div>
          )}
        </motion.div>
      </div>

      {/* Metric Detail Modal */}
      <AnimatePresence>
        {selectedMetric && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMetric(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 py-6 overflow-y-auto"
              role="dialog"
              aria-labelledby="metric-title"
              aria-modal="true"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[720px] max-h-[calc(100vh-3rem)] bg-card border border-border rounded-2xl overflow-hidden min-w-0"
              >
                <div className="flex flex-col max-h-[calc(100vh-3rem)]">
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span 
                          className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{ 
                            background: `${categoryColors[selectedMetric.category]}20`,
                            color: categoryColors[selectedMetric.category],
                          }}
                        >
                          {selectedMetric.category}
                        </span>
                        <h3 id="metric-title" className="font-display text-xl font-bold mt-2">
                          {selectedMetric.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedMetric(null)}
                        className="p-2 hover:bg-muted rounded-lg focus-ring"
                        aria-label="Close"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="px-6 pb-6 overflow-y-auto">
                    <div className="space-y-4">
                      {/* Definition */}
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-1">Definition</h4>
                        <p className="text-foreground/90">{selectedMetric.definition}</p>
                      </div>

                      {/* Why It Matters */}
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-1">Why it matters</h4>
                        <p className="text-foreground/90">{selectedMetric.whyItMatters}</p>
                      </div>

                      {/* Pains Addressed */}
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Pains addressed</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMetric.painsAddressed.map(pain => (
                            <span key={pain} className="px-2 py-1 rounded bg-destructive/10 text-destructive text-xs">
                              {pain.replace(/-/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Touchpoints */}
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Touchpoints influencing</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMetric.touchpointsInfluencing.map(t => {
                            const touchpoint = touchpoints.find(tp => tp.id === t);
                            return touchpoint ? (
                              <span key={t} className="touchpoint-tag">{touchpoint.name}</span>
                            ) : null;
                          })}
                        </div>
                      </div>

                      {/* Personas */}
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Personas</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMetric.personas.map(p => {
                            const persona = personas.find(pe => pe.id === p);
                            return persona ? (
                              <span key={p} className={`persona-tag ${persona.color}`}>{persona.name}</span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

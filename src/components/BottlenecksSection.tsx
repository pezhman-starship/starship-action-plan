import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, TrendingUp, Wrench, Link2 } from 'lucide-react';
import { bottlenecks, personas, touchpoints, experiments, roadmapPhases, type Bottleneck } from '@/data/planContent';
import { useFilters } from './FilterContext';

export const BottlenecksSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { matchesFilter } = useFilters();

  const filteredBottlenecks = bottlenecks.filter(b => 
    matchesFilter(b.personas, b.touchpoints)
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="bottlenecks" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-header text-center">
            <span className="text-gradient">Bottlenecks</span>
          </h2>
          <p className="section-subheader text-center max-w-2xl mx-auto">
            Pain → Metric → Lever — Real scenarios that need solving
          </p>

          <div className="max-w-4xl mx-auto space-y-4">
            {filteredBottlenecks.map((bottleneck, index) => (
              <BottleneckCard
                key={bottleneck.id}
                bottleneck={bottleneck}
                index={index}
                isExpanded={expandedId === bottleneck.id}
                onToggle={() => toggleExpand(bottleneck.id)}
              />
            ))}
          </div>

          {filteredBottlenecks.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              No bottlenecks match the current filters.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

interface BottleneckCardProps {
  bottleneck: Bottleneck;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const BottleneckCard = ({ bottleneck, index, isExpanded, onToggle }: BottleneckCardProps) => {
  const relatedExps = experiments.filter(e => 
    bottleneck.relatedExperiments.some(re => e.id.includes(re.replace('-', '')))
  );
  const relatedPhases = roadmapPhases.filter(p => 
    bottleneck.roadmapPhases.includes(p.id)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="card-glass rounded-xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-start gap-4 text-left focus-ring"
        aria-expanded={isExpanded}
        aria-controls={`bottleneck-${bottleneck.id}`}
      >
        <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-1">{bottleneck.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {bottleneck.painScenario.slice(0, 150)}...
          </p>
          
          {/* Tags preview */}
          <div className="flex flex-wrap gap-2 mt-3">
            {bottleneck.personas.slice(0, 3).map(p => {
              const persona = personas.find(pe => pe.id === p);
              return persona ? (
                <span key={p} className={`persona-tag ${persona.color}`}>{persona.name}</span>
              ) : null;
            })}
            {bottleneck.touchpoints.slice(0, 2).map(t => {
              const touchpoint = touchpoints.find(tp => tp.id === t);
              return touchpoint ? (
                <span key={t} className="touchpoint-tag">{touchpoint.name}</span>
              ) : null;
            })}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`bottleneck-${bottleneck.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border"
          >
            <div className="p-5 space-y-6">
              {/* Pain Scenario */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-destructive mb-2">
                  <AlertTriangle className="h-4 w-4" /> Concrete Pain Scenario
                </h4>
                <p className="text-foreground/90 leading-relaxed bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                  {bottleneck.painScenario}
                </p>
              </div>

              {/* Metrics Impacted */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                  <TrendingUp className="h-4 w-4" /> Metrics Impacted
                </h4>
                <ul className="grid md:grid-cols-2 gap-2">
                  {bottleneck.metricsImpacted.map((metric, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Proposed Levers */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-accent mb-2">
                  <Wrench className="h-4 w-4" /> Proposed Levers
                </h4>
                <ul className="space-y-2">
                  {bottleneck.proposedLevers.map((lever, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {lever}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Products & Touchpoints */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Products Involved</h4>
                  <div className="flex flex-wrap gap-2">
                    {bottleneck.products.map(p => (
                      <span key={p} className="px-2 py-1 rounded bg-muted text-xs">{p}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Personas</h4>
                  <div className="flex flex-wrap gap-2">
                    {bottleneck.personas.map(p => {
                      const persona = personas.find(pe => pe.id === p);
                      return persona ? (
                        <span key={p} className={`persona-tag ${persona.color}`}>{persona.name}</span>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>

              {/* Related Phases & Experiments */}
              <div className="pt-4 border-t border-border">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-3">
                  <Link2 className="h-4 w-4" /> Related
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block mb-2">Roadmap Phases</span>
                    <div className="flex flex-wrap gap-2">
                      {relatedPhases.map(phase => (
                        <span key={phase.id} className={`phase-badge phase-${phase.id}`}>
                          {phase.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  {relatedExps.length > 0 && (
                    <div>
                      <span className="text-xs font-medium text-muted-foreground block mb-2">Related Experiments</span>
                      <div className="flex flex-wrap gap-2">
                        {relatedExps.slice(0, 3).map(exp => (
                          <span key={exp.id} className="px-2 py-1 rounded bg-primary/10 text-primary text-xs">
                            {exp.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

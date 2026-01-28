import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, ChevronDown, AlertTriangle, Target, Database, TrendingUp } from 'lucide-react';
import { experiments, experimentCategories, personas, touchpoints, type Experiment } from '@/data/planContent';
import { useFilters } from './FilterContext';

const categoryColors: Record<string, string> = {
  'Pricing & Incentives': 'hsl(35 90% 55%)',
  'ETA Modeling': 'hsl(185 80% 50%)',
  'Handoff UX': 'hsl(145 70% 50%)',
  'Merchant Ops / Capacity': 'hsl(280 70% 60%)',
  'Kiosk / Pickup Ops': 'hsl(350 75% 55%)',
  'Accessibility Routing': 'hsl(210 70% 60%)',
  'Partner Channel Support Loop': 'hsl(170 70% 50%)',
  'Fleet / Charging Utilization': 'hsl(320 70% 55%)',
};

export const ExperimentsSection = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedExperiment, setExpandedExperiment] = useState<string | null>(null);
  const { matchesFilter } = useFilters();

  const filteredExperiments = experiments.filter(e => 
    matchesFilter(e.personas, e.primaryTouchpoints)
  );

  const experimentsByCategory = experimentCategories.map(category => ({
    category,
    experiments: filteredExperiments.filter(e => e.category === category),
    color: categoryColors[category] || 'hsl(210 70% 60%)',
  })).filter(c => c.experiments.length > 0);

  return (
    <section id="experiments" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-header text-center">
            <span className="text-gradient">Experiments Backlog</span>
          </h2>
          <p className="section-subheader text-center max-w-2xl mx-auto">
            Hypotheses to test, organized by theme
          </p>

          <div className="max-w-4xl mx-auto space-y-4">
            {experimentsByCategory.map(({ category, experiments: catExperiments, color }) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-glass rounded-xl overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                  className="w-full p-5 flex items-center justify-between focus-ring"
                  aria-expanded={expandedCategory === category}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${color}20` }}
                    >
                      <Beaker className="h-5 w-5" style={{ color }} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold" style={{ color }}>{category}</h3>
                      <p className="text-sm text-muted-foreground">
                        {catExperiments.length} experiment{catExperiments.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedCategory === category ? 180 : 0 }}
                  >
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                </button>

                {/* Experiments List */}
                <AnimatePresence>
                  {expandedCategory === category && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="border-t border-border overflow-hidden"
                    >
                      <div className="p-4 space-y-3">
                        {catExperiments.map((experiment) => (
                          <ExperimentCard
                            key={experiment.id}
                            experiment={experiment}
                            color={color}
                            isExpanded={expandedExperiment === experiment.id}
                            onToggle={() => setExpandedExperiment(
                              expandedExperiment === experiment.id ? null : experiment.id
                            )}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filteredExperiments.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              No experiments match the current filters.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

interface ExperimentCardProps {
  experiment: Experiment;
  color: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const ExperimentCard = ({ experiment, color, isExpanded, onToggle }: ExperimentCardProps) => {
  return (
    <div className="bg-muted/30 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-start justify-between text-left focus-ring"
        aria-expanded={isExpanded}
      >
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold mb-1">{experiment.name}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">{experiment.hypothesis}</p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="ml-3 flex-shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="border-t border-border/50 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Hypothesis */}
              <div>
                <h5 className="text-sm font-semibold mb-1">Hypothesis</h5>
                <p className="text-sm text-foreground/90">{experiment.hypothesis}</p>
              </div>

              {/* Expected Impact */}
              <div>
                <h5 className="flex items-center gap-1 text-sm font-semibold mb-1">
                  <TrendingUp className="h-3 w-3" style={{ color }} /> Expected Impact
                </h5>
                <p className="text-sm text-muted-foreground">{experiment.expectedImpact}</p>
              </div>

              {/* Risks */}
              <div>
                <h5 className="flex items-center gap-1 text-sm font-semibold text-destructive mb-1">
                  <AlertTriangle className="h-3 w-3" /> Risks
                </h5>
                <ul className="space-y-1">
                  {experiment.risks.map((risk, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-destructive mt-2" />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Data */}
              <div>
                <h5 className="flex items-center gap-1 text-sm font-semibold mb-1">
                  <Database className="h-3 w-3" style={{ color }} /> Required Data
                </h5>
                <ul className="space-y-1">
                  {experiment.requiredData.map((data, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full mt-2" style={{ background: color }} />
                      {data}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Success Metric */}
              <div>
                <h5 className="flex items-center gap-1 text-sm font-semibold mb-1">
                  <Target className="h-3 w-3" style={{ color }} /> Success Metric
                </h5>
                <p className="text-sm text-muted-foreground">{experiment.successMetric}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {experiment.primaryTouchpoints.map(t => {
                  const touchpoint = touchpoints.find(tp => tp.id === t);
                  return touchpoint ? (
                    <span key={t} className="touchpoint-tag">{touchpoint.name}</span>
                  ) : null;
                })}
                {experiment.personas.map(p => {
                  const persona = personas.find(pe => pe.id === p);
                  return persona ? (
                    <span key={p} className={`persona-tag ${persona.color}`}>{persona.name}</span>
                  ) : null;
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Target, Package, BookOpen, TrendingUp } from 'lucide-react';
import { roadmapPhases, touchpoints } from '@/data/planContent';

const phaseColors: Record<string, { bg: string; border: string; text: string }> = {
  '0-30': { bg: 'hsl(185 80% 50% / 0.1)', border: 'hsl(185 80% 50%)', text: 'hsl(185 80% 60%)' },
  '31-60': { bg: 'hsl(145 70% 50% / 0.1)', border: 'hsl(145 70% 50%)', text: 'hsl(145 70% 60%)' },
  '61-90': { bg: 'hsl(35 90% 55% / 0.1)', border: 'hsl(35 90% 55%)', text: 'hsl(35 90% 65%)' },
  '3-6': { bg: 'hsl(280 70% 60% / 0.1)', border: 'hsl(280 70% 60%)', text: 'hsl(280 70% 70%)' },
};

export const RoadmapSection = () => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  return (
    <section id="roadmap" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-header text-center">
            <span className="text-gradient">Roadmap</span>
          </h2>
          <p className="section-subheader text-center max-w-2xl mx-auto">
            A phased approach from listening to scaling
          </p>

          {/* Horizontal Timeline */}
          <div className="relative mb-8 overflow-x-auto">
            <div className="flex gap-4 min-w-max px-4 py-2">
              {/* Timeline Connector */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-phase-3-6 -z-10 mt-8" />
              
              {roadmapPhases.map((phase, index) => {
                const colors = phaseColors[phase.id];
                const isExpanded = expandedPhase === phase.id;
                
                return (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-1 min-w-[280px]"
                  >
                    <button
                      onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                      className="w-full text-left focus-ring rounded-xl"
                      aria-expanded={isExpanded}
                    >
                      <div 
                        className="rounded-xl p-5 transition-all hover:shadow-lg"
                        style={{ 
                          background: colors.bg,
                          border: `1px solid ${colors.border}`,
                        }}
                      >
                        {/* Phase Dot */}
                        <div 
                          className="w-4 h-4 rounded-full mx-auto mb-4 shadow-lg"
                          style={{ background: colors.border }}
                        />
                        
                        <h3 
                          className="font-display text-xl font-bold text-center mb-1"
                          style={{ color: colors.text }}
                        >
                          {phase.label}
                        </h3>
                        <p className="text-sm text-muted-foreground text-center mb-4">
                          {phase.dateRange}
                        </p>

                        {/* Goals Preview */}
                        <ul className="space-y-1 mb-4">
                          {phase.goals.slice(0, 2).map((goal, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Target className="h-3 w-3 mt-1 flex-shrink-0" style={{ color: colors.border }} />
                              <span className="line-clamp-1">{goal}</span>
                            </li>
                          ))}
                          {phase.goals.length > 2 && (
                            <li className="text-xs text-muted-foreground/70 pl-5">
                              +{phase.goals.length - 2} more goals
                            </li>
                          )}
                        </ul>

                        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                          <span>View details</span>
                          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Expanded Phase Details */}
          <AnimatePresence mode="wait">
            {expandedPhase && (
              <motion.div
                key={expandedPhase}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                {(() => {
                  const phase = roadmapPhases.find(p => p.id === expandedPhase);
                  if (!phase) return null;
                  const colors = phaseColors[phase.id];

                  return (
                    <div 
                      className="card-glass rounded-xl p-6 space-y-6"
                      style={{ borderTop: `3px solid ${colors.border}` }}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-2xl font-bold" style={{ color: colors.text }}>
                          {phase.label} — {phase.dateRange}
                        </h3>
                        <button
                          onClick={() => setExpandedPhase(null)}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          Close
                        </button>
                      </div>

                      {/* Goals */}
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
                          <Target className="h-4 w-4" style={{ color: colors.border }} /> Goals
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {phase.goals.map((goal, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: colors.border }} />
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
                          <Package className="h-4 w-4" style={{ color: colors.border }} /> Deliverables
                        </h4>
                        <ul className="space-y-2">
                          {phase.deliverables.map((del, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: colors.border }} />
                              {del}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Example Scenarios */}
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
                          <BookOpen className="h-4 w-4" style={{ color: colors.border }} /> Example Scenarios
                        </h4>
                        <div className="space-y-2">
                          {phase.exampleScenarios.map((scenario, i) => (
                            <p key={i} className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                              {scenario}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* KPIs Watched */}
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
                          <TrendingUp className="h-4 w-4" style={{ color: colors.border }} /> KPIs Watched
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.kpisWatched.map((kpi, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                            >
                              {kpi}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Touchpoints */}
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Touchpoints Affected</h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.touchpointsAffected.map(t => {
                            const touchpoint = touchpoints.find(tp => tp.id === t);
                            return touchpoint ? (
                              <span key={t} className="touchpoint-tag">{touchpoint.name}</span>
                            ) : null;
                          })}
                        </div>
                      </div>

                      {/* Full Content */}
                      <div className="pt-4 border-t border-border">
                        <h4 className="text-sm font-semibold mb-3">Full Phase Details</h4>
                        <div className="prose prose-sm prose-invert max-w-none">
                          {phase.fullContent.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="text-sm text-muted-foreground whitespace-pre-wrap">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

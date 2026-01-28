import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Search } from 'lucide-react';
import { assumptions } from '@/data/planContent';

const priorityColors: Record<string, { bg: string; border: string; text: string }> = {
  high: { bg: 'hsl(0 70% 50% / 0.1)', border: 'hsl(0 70% 50%)', text: 'hsl(0 70% 60%)' },
  medium: { bg: 'hsl(35 90% 55% / 0.1)', border: 'hsl(35 90% 55%)', text: 'hsl(35 90% 65%)' },
  low: { bg: 'hsl(145 70% 50% / 0.1)', border: 'hsl(145 70% 50%)', text: 'hsl(145 70% 60%)' },
};

export const AssumptionsSection = () => {
  const highPriority = assumptions.filter(a => a.priority === 'high');
  const mediumPriority = assumptions.filter(a => a.priority === 'medium');

  return (
    <section id="assumptions" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-header text-center">
            <span className="text-gradient">Assumptions & Risks</span>
          </h2>
          <p className="section-subheader text-center max-w-2xl mx-auto">
            What I'm assuming, what could go wrong, and how I'll validate
          </p>

          {/* Important Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="card-glass rounded-xl p-5 border-l-4 border-l-accent">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">A note on framing</h3>
                  <p className="text-muted-foreground">
                    These assumptions are based on publicly available signals and my understanding of the space.
                    I avoid any speculation about why previous team members may have left or internal organizational dynamics.
                    My focus is on validating these assumptions early through direct observation and stakeholder conversations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* High Priority */}
          <div className="max-w-4xl mx-auto mb-8">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4" style={{ color: priorityColors.high.text }}>
              <AlertTriangle className="h-5 w-5" />
              High Priority Validation
            </h3>
            <div className="space-y-4">
              {highPriority.map((assumption, index) => (
                <AssumptionCard key={assumption.id} assumption={assumption} index={index} />
              ))}
            </div>
          </div>

          {/* Medium Priority */}
          <div className="max-w-4xl mx-auto">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4" style={{ color: priorityColors.medium.text }}>
              <Search className="h-5 w-5" />
              Medium Priority Validation
            </h3>
            <div className="space-y-4">
              {mediumPriority.map((assumption, index) => (
                <AssumptionCard key={assumption.id} assumption={assumption} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface AssumptionCardProps {
  assumption: typeof assumptions[0];
  index: number;
}

const AssumptionCard = ({ assumption, index }: AssumptionCardProps) => {
  const colors = priorityColors[assumption.priority];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="card-glass rounded-xl p-5"
      style={{ borderLeft: `3px solid ${colors.border}` }}
    >
      <div className="space-y-4">
        {/* Assumption */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-1">Assumption</h4>
          <p className="text-foreground font-medium">{assumption.assumption}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Risk If Wrong */}
          <div className="bg-destructive/5 rounded-lg p-3 border border-destructive/20">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-destructive mb-2">
              <AlertTriangle className="h-4 w-4" /> Risk if wrong
            </h4>
            <p className="text-sm text-muted-foreground">{assumption.riskIfWrong}</p>
          </div>

          {/* Validation Approach */}
          <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
              <Search className="h-4 w-4" /> Validation approach
            </h4>
            <p className="text-sm text-muted-foreground">{assumption.validationApproach}</p>
          </div>
        </div>

        {/* Priority Badge */}
        <div className="flex justify-end">
          <span 
            className="px-3 py-1 rounded-full text-xs font-semibold capitalize"
            style={{ 
              background: colors.bg, 
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          >
            {assumption.priority} priority
          </span>
        </div>
      </div>
    </motion.div>
  );
};

import { motion } from 'framer-motion';
import { Database, HelpCircle, Lightbulb } from 'lucide-react';
import { dataNeeds } from '@/data/planContent';

export const DataNeedsSection = () => {
  return (
    <section id="data-needs" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-header text-center">
            <span className="text-gradient">Data I Need</span>
          </h2>
          <p className="section-subheader text-center max-w-2xl mx-auto">
            What data would accelerate my work — and what I can do without it
          </p>

          <div className="max-w-4xl mx-auto space-y-4">
            {dataNeeds.map((need, index) => (
              <motion.div
                key={need.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card-glass rounded-xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-3">{need.item}</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Why I Need It */}
                      <div className="bg-muted/30 rounded-lg p-3">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                          <HelpCircle className="h-4 w-4" /> Why I need it
                        </h4>
                        <p className="text-sm text-muted-foreground">{need.whyNeeded}</p>
                      </div>

                      {/* What I Can Do Without It */}
                      <div className="bg-muted/30 rounded-lg p-3">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-accent mb-2">
                          <Lightbulb className="h-4 w-4" /> What I can do without it
                        </h4>
                        <p className="text-sm text-muted-foreground">{need.whatWithoutIt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { overviewContent } from '@/data/planContent';

const systemMapNodes = [
  { id: 'demand', label: 'Demand Surfaces', items: ['Customer App', 'Kiosk', 'Mobile Pickup'], color: 'orbit-demand' },
  { id: 'merchant', label: 'Merchant Ops', items: ['Kitchen App', 'Merchant Tools'], color: 'orbit-merchant' },
  { id: 'fulfillment', label: 'Fulfillment', items: ['Robot Delivery', 'Pickup/Lockers'], color: 'orbit-fulfillment' },
  { id: 'control', label: 'Control Plane', items: ['Partner Dashboard', 'Portal', 'Integrations'], color: 'orbit-control' },
  { id: 'enablers', label: 'Enablers', items: ['Wireless Charging', 'Reusable Packaging'], color: 'orbit-enablers' },
  { id: 'adjacent', label: 'Adjacent', items: ['24/7 Support', 'Sendit'], color: 'orbit-adjacent' },
];

const colorMap: Record<string, string> = {
  'orbit-demand': 'hsl(185 80% 50%)',
  'orbit-merchant': 'hsl(35 90% 55%)',
  'orbit-fulfillment': 'hsl(145 70% 50%)',
  'orbit-control': 'hsl(280 70% 60%)',
  'orbit-enablers': 'hsl(350 75% 55%)',
  'orbit-adjacent': 'hsl(210 70% 60%)',
};

export const OverviewSection = () => {
  return (
    <section id="overview" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="section-header text-center">
            <span className="text-gradient">System Overview</span>
          </h2>
          <p className="section-subheader text-center max-w-2xl mx-auto">
            How Starship 360 components connect across the campus dining journey
          </p>

          {/* System Map */}
          <div className="relative mb-16">
            {/* Flow Diagram */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {systemMapNodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div 
                    className="card-glass rounded-xl p-4 h-full border-l-4"
                    style={{ borderLeftColor: colorMap[node.color] }}
                  >
                    <h3 
                      className="font-semibold text-sm mb-2"
                      style={{ color: colorMap[node.color] }}
                    >
                      {node.label}
                    </h3>
                    <ul className="space-y-1">
                      {node.items.map((item) => (
                        <li key={item} className="text-xs text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Arrow connector (not on last item) */}
                  {index < systemMapNodes.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                      <ChevronDown className="h-4 w-4 text-muted-foreground rotate-[-90deg]" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-px bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 -z-10" />
          </div>

          {/* Mental Model */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="card-glass rounded-xl p-6">
              <h3 className="font-display text-xl font-semibold mb-4">My mental model</h3>
              <p className="text-muted-foreground leading-relaxed">
                {overviewContent.mentalModel}
              </p>
            </div>
          </motion.div>

          {/* Definitions Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Accordion type="single" collapsible className="card-glass rounded-xl overflow-hidden">
              <AccordionItem value="definitions" className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 focus-ring">
                  <span className="font-display font-semibold">Key Definitions</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {overviewContent.definitions.map((def, index) => (
                      <div 
                        key={index} 
                        className="p-4 rounded-lg bg-muted/30 border border-border/50"
                      >
                        <dt className="font-semibold text-primary mb-1">{def.term}</dt>
                        <dd className="text-sm text-muted-foreground">{def.definition}</dd>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

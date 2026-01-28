import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { fullPlanText } from '@/data/planContent';

export const FullPlanSection = () => {
  // Parse the full plan text into sections
  const sections = parseFullPlan(fullPlanText);

  return (
    <section id="full-plan" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-header text-center">
            <span className="text-gradient">Full Plan (Verbatim)</span>
          </h2>
          <p className="section-subheader text-center max-w-2xl mx-auto">
            The complete action plan text, unedited and unshortened
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="card-glass rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-semibold">Complete 3–6 Month Action Plan</span>
              </div>
              
              <Accordion type="multiple" className="divide-y divide-border">
                {sections.map((section, index) => (
                  <AccordionItem key={index} value={`section-${index}`} className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30 focus-ring">
                      <span className="text-left font-semibold">{section.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4">
                        {section.subsections.map((subsection, subIndex) => (
                          <div key={subIndex}>
                            {subsection.title && (
                              <h4 className="font-semibold text-primary mb-2">{subsection.title}</h4>
                            )}
                            <div className="text-muted-foreground whitespace-pre-wrap text-sm leading-relaxed">
                              {subsection.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface Section {
  title: string;
  subsections: { title?: string; content: string }[];
}

function parseFullPlan(text: string): Section[] {
  const lines = text.split('\n');
  const sections: Section[] = [];
  let currentSection: Section | null = null;
  let currentSubsection: { title?: string; content: string } | null = null;

  for (const line of lines) {
    // Main section (## heading)
    if (line.startsWith('## ')) {
      if (currentSection && currentSubsection) {
        currentSection.subsections.push(currentSubsection);
      }
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = { title: line.replace('## ', ''), subsections: [] };
      currentSubsection = null;
    }
    // Subsection (### heading)
    else if (line.startsWith('### ')) {
      if (currentSection && currentSubsection) {
        currentSection.subsections.push(currentSubsection);
      }
      currentSubsection = { title: line.replace('### ', ''), content: '' };
    }
    // Main title (# heading) - skip or use as first section
    else if (line.startsWith('# ')) {
      if (!currentSection) {
        currentSection = { title: line.replace('# ', ''), subsections: [] };
      }
    }
    // Regular content
    else {
      if (currentSubsection) {
        currentSubsection.content += (currentSubsection.content ? '\n' : '') + line;
      } else if (currentSection) {
        if (!currentSection.subsections.length) {
          currentSection.subsections.push({ content: line });
        } else {
          const lastSub = currentSection.subsections[currentSection.subsections.length - 1];
          lastSub.content += '\n' + line;
        }
      }
    }
  }

  // Push final items
  if (currentSection && currentSubsection) {
    currentSection.subsections.push(currentSubsection);
  }
  if (currentSection) {
    sections.push(currentSection);
  }

  // Clean up empty content
  return sections.map(section => ({
    ...section,
    subsections: section.subsections
      .map(sub => ({ ...sub, content: sub.content.trim() }))
      .filter(sub => sub.content || sub.title),
  })).filter(section => section.subsections.length > 0);
}

import { motion } from 'framer-motion';
import { Linkedin, Copy, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { introContent } from '@/data/planContent';
import { toast } from '@/hooks/use-toast';

export const HeroSection = () => {
  const handleCopyPitch = async () => {
    try {
      await navigator.clipboard.writeText(introContent.summaryPitch);
      toast({
        title: 'Copied to clipboard',
        description: 'Summary pitch has been copied.',
      });
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section id="intro" className="min-h-screen pt-44 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
              <span className="text-gradient">{introContent.title}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {introContent.subtitle}
            </p>
          </motion.div>

          {/* Photo + Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col md:flex-row gap-8 items-start mb-12"
          >
            {/* Photo Placeholder */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-32 h-32 rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden">
                <User className="w-16 h-16 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">Photo placeholder</p>
            </div>

            {/* Intro Paragraph */}
            <div className="flex-1">
              <p className="text-lg leading-relaxed text-foreground/90">
                {introContent.introParagraph}
              </p>
            </div>
          </motion.div>

          {/* Resume Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="font-display text-xl font-semibold mb-4">Quick Background</h2>
            <ul className="space-y-2">
              {introContent.resumePoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* LinkedIn */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8"
          >
            <Button variant="outline" className="gap-2 focus-ring" asChild>
              <a 
                href={`https://linkedin.com/in/${introContent.linkedIn}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn: Pezhman Shafeiee ({introContent.linkedIn})
              </a>
            </Button>
          </motion.div>

          {/* How to Read */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-8"
          >
            <div className="card-glass rounded-xl p-4 border border-border/50">
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">How to read this page</h3>
              <p className="text-sm text-muted-foreground">{introContent.howToRead}</p>
            </div>
          </motion.div>

          {/* Summary Pitch Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Card className="card-glass card-glow p-6 border-primary/20">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-display text-lg font-semibold">Summary pitch (copy/paste)</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyPitch}
                  className="flex-shrink-0 focus-ring"
                >
                  <Copy className="h-4 w-4 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-foreground/90 leading-relaxed">
                {introContent.summaryPitch}
              </p>
            </Card>
          </motion.div>

          {/* Glow Effect */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none opacity-30" 
            style={{ background: 'var(--gradient-glow)' }} 
          />
        </div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { Linkedin, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { introContent } from '@/data/planContent';
import { toast } from '@/hooks/use-toast';
import pejPhoto from '@/pic/pej.jpg';

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
    <section id="intro" className="pt-20 pb-0">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 starship-gradient-text">
              {introContent.title}
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
            className="flex flex-col md:flex-row gap-8 items-start md:items-end mb-12"
          >
            {/* Photo + LinkedIn */}
            <div className="flex-shrink-0 mx-auto md:mx-0 w-32">
              <div className="w-32 h-32 rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden">
                <img
                  src={pejPhoto}
                  alt="Pezhman portrait"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">Pezhman Shafiei</p>
              <Button variant="outline" className="gap-2 focus-ring w-full mt-3" asChild>
                <a 
                  href={`https://linkedin.com/in/${introContent.linkedIn}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            </div>

            {/* Intro Paragraph */}
            <div className="flex-1">
              <p className="text-lg leading-relaxed text-foreground/90">
                {introContent.introParagraph}
              </p>
            </div>
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
                <h3 className="font-display text-lg font-semibold starship-gradient-text">Plan Summary (My Approach)</h3>
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
              {introContent.businessUpsideBullets?.length ? (
                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="text-sm font-semibold text-white/90">
                    {introContent.businessUpsideTitle}
                  </div>
                  <ul className="mt-2 space-y-2 text-sm text-white/70 list-disc pl-5">
                    {introContent.businessUpsideBullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
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

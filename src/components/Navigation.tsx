import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Printer, Share2, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const navItems = [
  { id: 'intro', label: 'Intro' },
  { id: 'overview', label: 'Overview' },
  { id: 'products', label: 'Products' },
  { id: 'bottlenecks', label: 'Bottlenecks' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'data-needs', label: 'Data I Need' },
  { id: 'assumptions', label: 'Assumptions & Risks' },
  { id: 'full-plan', label: 'Full Plan' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 500);

      // Determine active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const currentSection = sections.find((section, index) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        const nextSection = sections[index + 1];
        const nextTop = nextSection ? nextSection.getBoundingClientRect().top : Infinity;
        return rect.top <= 100 && nextTop > 100;
      });
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareText = `Pezhman action plan — Senior Product Manager — Starship 360 full-service suite

My first 3–6 months would focus on reliability across the full Starship 360 suite: customer app, kitchen tools, kiosks, pickup, delivery, and the partner control plane.`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: 'Copied to clipboard',
        description: 'Share text has been copied.',
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
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator no-print" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* Main Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border no-print">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Title */}
            <button 
              onClick={() => scrollToSection('intro')}
              className="font-display font-bold text-lg text-gradient focus-ring rounded"
            >
              Pezhman Action Plan
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link px-3 py-2 rounded-lg transition-all focus-ring ${
                    activeSection === item.id ? 'nav-link-active bg-muted' : ''
                  }`}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="focus-ring"
                aria-label="Copy share text"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrint}
                className="focus-ring"
                aria-label="Print or export to PDF"
              >
                <Printer className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden focus-ring"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border bg-background"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left px-4 py-3 rounded-lg transition-all focus-ring ${
                        activeSection === item.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all focus-ring no-print"
            aria-label="Back to top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

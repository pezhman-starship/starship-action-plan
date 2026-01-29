import { useEffect, useRef, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { FilterProvider, GlobalFilterBar } from '@/components/FilterContext';
import { HeroSection } from '@/components/HeroSection';
import { OverviewSection } from '@/components/OverviewSection';
import { ProductsOrbitSection } from '@/components/ProductsOrbitSection';
import { BottlenecksSection } from '@/components/BottlenecksSection';
import { RoadmapSection } from '@/components/RoadmapSection';
import { MetricsSection } from '@/components/MetricsSection';
import { ExperimentsSection } from '@/components/ExperimentsSection';
import { DataNeedsSection } from '@/components/DataNeedsSection';
import { AssumptionsSection } from '@/components/AssumptionsSection';
import { FullPlanSection } from '@/components/FullPlanSection';

const Index = () => {
  const productsRangeRef = useRef<HTMLDivElement | null>(null);
  const bottlenecksRangeRef = useRef<HTMLDivElement | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let rafId = 0;
    const headerOffset = 96;

    const updateVisibility = () => {
      rafId = 0;
      const productsEl = productsRangeRef.current;
      const bottlenecksEl = bottlenecksRangeRef.current;
      if (!productsEl || !bottlenecksEl) return;

      const startY = productsEl.getBoundingClientRect().top + window.scrollY - headerOffset;
      const endY = bottlenecksEl.getBoundingClientRect().bottom + window.scrollY - headerOffset;
      const y = window.scrollY;

      setShowFilters(y >= startY && y < endY);
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <FilterProvider>
      <div className="min-h-screen bg-background relative">
        <Navigation />
        <GlobalFilterBar isVisible={showFilters} />
        
        <main className="pt-16">
          <HeroSection />
          <div className="glow-line w-full max-w-2xl mx-auto" />
          <OverviewSection />
          <div className="glow-line w-full max-w-2xl mx-auto" />
          <div ref={productsRangeRef}>
            <ProductsOrbitSection />
          </div>
          <div className="glow-line w-full max-w-2xl mx-auto" />
          <div ref={bottlenecksRangeRef}>
            <BottlenecksSection />
          </div>
          <div className="glow-line w-full max-w-2xl mx-auto" />
          <RoadmapSection />
          <div className="glow-line w-full max-w-2xl mx-auto" />
          <MetricsSection />
          <div className="glow-line w-full max-w-2xl mx-auto" />
          <ExperimentsSection />
          <div className="glow-line w-full max-w-2xl mx-auto" />
          <DataNeedsSection />
          <div className="glow-line w-full max-w-2xl mx-auto" />
          <AssumptionsSection />
          <div className="glow-line w-full max-w-2xl mx-auto" />
          <FullPlanSection />
          
          {/* Footer */}
          <footer className="py-12 border-t border-border">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground text-sm">
                Pezhman Action Plan — Senior Product Manager — Starship 360 Full-Service Suite
              </p>
              <p className="text-muted-foreground/60 text-xs mt-2">
                Built with focus on reliability, accessibility, and thoughtful product craft.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </FilterProvider>
  );
};

export default Index;

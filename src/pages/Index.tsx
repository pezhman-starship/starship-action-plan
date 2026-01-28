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
  return (
    <FilterProvider>
      <div className="min-h-screen bg-background relative">
        <Navigation />
        <GlobalFilterBar />
        
        <main className="pt-16">
          <HeroSection />
          <div className="glow-line w-full max-w-2xl mx-auto" />
          <OverviewSection />
          <div className="glow-line w-full max-w-2xl mx-auto" />
          <ProductsOrbitSection />
          <div className="glow-line w-full max-w-2xl mx-auto" />
          <BottlenecksSection />
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

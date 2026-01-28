import { createContext, useContext, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { personas, touchpoints } from '@/data/planContent';

interface FilterContextType {
  selectedPersonas: string[];
  selectedTouchpoints: string[];
  togglePersona: (id: string) => void;
  toggleTouchpoint: (id: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  matchesFilter: (itemPersonas: string[], itemTouchpoints: string[]) => boolean;
}

const FilterContext = createContext<FilterContextType | null>(null);

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilters must be used within FilterProvider');
  return context;
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  const [selectedTouchpoints, setSelectedTouchpoints] = useState<string[]>([]);

  const togglePersona = (id: string) => {
    setSelectedPersonas(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleTouchpoint = (id: string) => {
    setSelectedTouchpoints(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedPersonas([]);
    setSelectedTouchpoints([]);
  };

  const hasActiveFilters = selectedPersonas.length > 0 || selectedTouchpoints.length > 0;

  const matchesFilter = (itemPersonas: string[], itemTouchpoints: string[]) => {
    if (!hasActiveFilters) return true;
    
    const personaMatch = selectedPersonas.length === 0 || 
      selectedPersonas.some(p => itemPersonas.includes(p));
    const touchpointMatch = selectedTouchpoints.length === 0 || 
      selectedTouchpoints.some(t => itemTouchpoints.includes(t));
    
    return personaMatch && touchpointMatch;
  };

  return (
    <FilterContext.Provider value={{
      selectedPersonas,
      selectedTouchpoints,
      togglePersona,
      toggleTouchpoint,
      clearFilters,
      hasActiveFilters,
      matchesFilter,
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const GlobalFilterBar = () => {
  const { 
    selectedPersonas, 
    selectedTouchpoints, 
    togglePersona, 
    toggleTouchpoint, 
    clearFilters,
    hasActiveFilters 
  } = useFilters();

  return (
    <div className="fixed top-16 left-0 right-0 z-30 bg-background/90 backdrop-blur-lg border-b border-border no-print">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-3">
          {/* Personas */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Filter className="h-3 w-3" /> Personas:
            </span>
            {personas.map((persona) => (
              <motion.button
                key={persona.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => togglePersona(persona.id)}
                className={`persona-tag transition-all focus-ring ${persona.color} ${
                  selectedPersonas.includes(persona.id) ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                }`}
                aria-pressed={selectedPersonas.includes(persona.id)}
              >
                {persona.name}
              </motion.button>
            ))}
          </div>

          {/* Touchpoints */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Touchpoints:</span>
            {touchpoints.map((touchpoint) => (
              <motion.button
                key={touchpoint.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleTouchpoint(touchpoint.id)}
                className={`touchpoint-tag transition-all focus-ring ${
                  selectedTouchpoints.includes(touchpoint.id) ? 'ring-2 ring-primary bg-muted' : 'opacity-70 hover:opacity-100'
                }`}
                aria-pressed={selectedTouchpoints.includes(touchpoint.id)}
              >
                {touchpoint.name}
              </motion.button>
            ))}
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" /> Clear all filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

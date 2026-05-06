import { useState, useEffect, useMemo } from 'react';
import { Search, BookOpen, Terminal, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CourseCard } from '../components/CourseCard';
import { LEARNING_PATHS } from '../data/learningPaths';
import { SEO } from '@/components/layout/SEO';
import { cn } from '@/lib/utils';

export function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derive categories directly from data so filters always match what's available.
  const CATEGORIES = useMemo(() => {
    const unique = Array.from(new Set(LEARNING_PATHS.map((p) => p.category))).sort();
    return ['All', ...unique];
  }, []);
  
  const [progressData, setProgressData] = useState<Record<string, number>>(() => {
    const data: Record<string, number> = {};
    LEARNING_PATHS.forEach(path => {
      const saved = localStorage.getItem(`progress_${path.id}`);
      if (saved) {
        try {
          data[path.id] = JSON.parse(saved).length;
        } catch {
          data[path.id] = 0;
        }
      } else {
        data[path.id] = 0;
      }
    });
    return data;
  });

  useEffect(() => {
    const updateProgress = () => {
      const data: Record<string, number> = {};
      LEARNING_PATHS.forEach(path => {
        const saved = localStorage.getItem(`progress_${path.id}`);
        if (saved) {
          try {
            data[path.id] = JSON.parse(saved).length;
          } catch {
            data[path.id] = 0;
          }
        } else {
          data[path.id] = 0;
        }
      });
      setProgressData(data);
    };

    window.addEventListener('storage', updateProgress);
    window.addEventListener('focus', updateProgress);
    return () => {
      window.removeEventListener('storage', updateProgress);
      window.removeEventListener('focus', updateProgress);
    };
  }, []);

  const filteredPaths = LEARNING_PATHS.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         path.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || path.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pb-32 overflow-x-hidden relative">
      <SEO title="Archive" description="Access hand-curated learning paths." />
      
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="pt-16 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                <BookOpen size={24} strokeWidth={2} />
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text">
                The <span className="text-primary">Archive</span>
              </h1>
            </div>
            <p className="text-sm font-medium text-text-muted">
              Technical Repository • Accessing curated sectors of excellence
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-[320px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search modules..."
              className="w-full bg-surface border border-border h-12 pl-12 pr-4 text-sm font-medium rounded-xl text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300",
                selectedCategory === category
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'bg-surface text-text-muted hover:text-text hover:bg-surface-hover border border-transparent hover:border-border'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Section */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPaths.map((path, index) => (
              <motion.div
                key={path.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <CourseCard
                  {...path}
                  duration={`${path.totalHours}h`}
                  lessonsCount={path.levels.length}
                  progress={progressData[path.id] || 0}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPaths.length === 0 && (
          <div className="text-center py-24 glass-panel border-dashed rounded-3xl mt-8">
            <div className="w-16 h-16 rounded-2xl bg-surface-hover flex items-center justify-center mx-auto mb-6 text-text-muted border border-border shadow-inner">
              <Search size={28} />
            </div>
            <h3 className="text-2xl font-semibold text-text mb-2 tracking-tight">No Modules Found</h3>
            <p className="text-sm font-medium text-text-muted">Adjust your search or category filters to discover more content.</p>
          </div>
        )}

        {/* Big Premium Stat Block */}
        <div className="mt-20 glass-panel p-1 relative overflow-hidden rounded-3xl shadow-xl">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
           <div className="bg-surface rounded-[22px] border border-border relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-hover/50">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-text">Archive Telemetry</span>
                </div>
                <span className="text-xs font-medium text-text-muted hidden sm:block">
                  Global Sector • Realtime
                </span>
              </div>

              {/* Body */}
              <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_auto] gap-8 md:gap-12 items-center relative z-10 bg-gradient-to-b from-transparent to-surface-hover/30">
                
                {/* Stat 1 */}
                <div className="space-y-3 text-center md:text-left">
                  <div className="text-5xl md:text-7xl font-semibold tracking-tight text-text leading-none flex items-center justify-center md:justify-start gap-1">
                    {LEARNING_PATHS.length}
                    <span className="text-primary">+</span>
                  </div>
                  <p className="text-sm font-medium text-text-muted flex items-center justify-center md:justify-start gap-2">
                    <BookOpen size={16} className="text-primary" />
                    Curated Paths
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full md:w-px h-px md:h-24 bg-border" />

                {/* Stat 2 */}
                <div className="space-y-3 text-center md:text-left">
                  <div className="text-5xl md:text-7xl font-semibold tracking-tight text-text leading-none flex items-center justify-center md:justify-start gap-1">
                    100<span className="text-emerald-500">%</span>
                  </div>
                  <p className="text-sm font-medium text-text-muted flex items-center justify-center md:justify-start gap-2">
                    <Sparkles size={16} className="text-emerald-500" />
                    Open Source
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full md:w-px h-px md:h-24 bg-border" />

                {/* CTA Block */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-8 py-4 bg-text text-bg rounded-xl font-medium text-sm hover:bg-text/90 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-3"
                  >
                    Initialize Training
                    <Terminal size={18} strokeWidth={2.5} />
                  </button>
                  <span className="text-xs font-medium text-text-muted flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    System Ready
                  </span>
                </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Search, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CourseCard } from '../components/CourseCard';
import { LEARNING_PATHS } from '../data/learningPaths';
import { SEO } from '@/components/layout/SEO';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'DevOps', 'Mobile', 'AI/ML', 'Systems', 'CS Fundamentals', 'Web3', 'Workflow'];

export function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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
    <div className="min-h-screen bg-neo-bg text-slate-200 pb-32">
      <SEO title="Learning Intelligence Archive" description="20 premium, hand-curated learning paths for developer growth." />
      
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {/* Compact Industrial Header */}
        <div className="pt-12 md:pt-20 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/[0.03]">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 neo-icon text-neo-accent-blue">
                  <LayoutGrid size={20} strokeWidth={2.5} />
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-200">Archive <span className="text-neo-accent-blue">Vault</span></h1>
              </div>
              <p className="text-slate-500 font-bold text-[10px] tracking-[0.4em] uppercase opacity-70">
                Synchronized Intelligence Repository // 20 Curated Sectors
              </p>
            </div>

            {/* Surgical Search */}
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-neo-accent-blue transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search Archive..."
                className="w-full neo-pressed h-12 pl-12 pr-6 rounded-xl bg-transparent border-none text-slate-200 placeholder:text-slate-700 focus:outline-none text-[10px] font-black uppercase tracking-widest"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Categories - More balanced */}
        <div className="flex items-center gap-3 overflow-x-auto pb-16 no-scrollbar scroll-smooth">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] whitespace-nowrap transition-all border border-white/[0.01]",
                selectedCategory === category
                ? 'neo-pressed text-neo-accent-blue bg-neo-accent-blue/5'
                : 'neo-flat text-slate-600 hover:text-slate-200'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Section - Balanced Aspect Ratio */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredPaths.map((path, index) => (
              <motion.div
                key={path.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
              >
                <CourseCard
                  {...path}
                  progress={progressData[path.id] || 0}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPaths.length === 0 && (
          <div className="text-center py-40">
            <div className="w-20 h-20 neo-icon flex items-center justify-center mx-auto mb-8 text-slate-800">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-200 mb-2">Signal Lost</h3>
            <p className="text-slate-600 font-bold text-[10px] uppercase tracking-widest">No archives matching your query</p>
          </div>
        )}

        {/* Stats Section - Minimalist & Balanced */}
        <div className="mt-32">
          <div className="neo-flat rounded-[3rem] p-12 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center border border-white/[0.01]">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-black text-slate-200 tracking-tighter italic">200+</div>
              <p className="text-neo-accent-blue font-black text-[8px] tracking-[0.4em] uppercase opacity-60">Modules</p>
            </div>
            <div className="space-y-2 border-y md:border-y-0 md:border-x border-white/[0.03] py-8 md:py-0">
              <div className="text-4xl md:text-5xl font-black text-slate-200 tracking-tighter italic">20</div>
              <p className="text-neo-accent-orange font-black text-[8px] tracking-[0.4em] uppercase opacity-60">Archive Sectors</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-black text-slate-200 tracking-tighter italic">100%</div>
              <p className="text-neo-accent-emerald font-black text-[8px] tracking-[0.4em] uppercase opacity-60">Open Source</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

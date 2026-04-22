import { useState, useEffect } from 'react';
import { Search, Database } from 'lucide-react';
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
      
      {/* Immersive Header Bar */}
      <div className="relative z-20 px-4 md:px-0 mb-16">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="neo-flat px-6 md:px-12 py-8 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center gap-8 border border-white/[0.01]"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 neo-icon text-neo-accent-blue">
               <Database size={24} strokeWidth={2.5} />
            </div>
            <div>
               <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic text-slate-200">Archives</h1>
               <p className="text-[10px] text-neo-accent-blue font-black tracking-[0.4em] uppercase opacity-70">Intelligence Repository // v1.0</p>
            </div>
          </div>

          {/* Search Integrated into Header */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-neo-accent-blue transition-colors" size={18} />
            <input
              type="text"
              placeholder="Query Repository..."
              className="w-full neo-pressed h-14 pl-16 pr-6 rounded-2xl bg-transparent border-none text-slate-200 placeholder:text-slate-600 focus:outline-none text-xs font-bold tracking-widest uppercase"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {/* Category Filter - Surgical Design */}
        <div className="flex items-center gap-4 overflow-x-auto pb-12 no-scrollbar scroll-smooth">
          {CATEGORIES.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] whitespace-nowrap transition-all border border-white/[0.01]",
                selectedCategory === category
                ? 'neo-pressed text-neo-accent-blue bg-neo-accent-blue/5'
                : 'neo-flat text-slate-500 hover:text-slate-200'
              )}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Hero Headline Overlay */}
        <div className="relative mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-9xl font-black leading-tight tracking-tighter italic text-slate-200 mb-8"
          >
            Growth.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-accent-blue via-purple-500 to-indigo-600 non-italic underline decoration-neo-accent-blue/10 underline-offset-8">
              Systemized.
            </span>
          </motion.h2>
          <p className="text-slate-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto italic leading-relaxed opacity-70">
            Select a sector to begin deep-sync. 20 high-fidelity technical archives waiting for your signal.
          </p>
        </div>

        {/* Grid Section */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12"
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
            <div className="w-24 h-24 neo-icon flex items-center justify-center mx-auto mb-10 text-slate-800">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-200 mb-4">Signal Lost</h3>
            <p className="text-slate-500 font-medium italic">No archives found in the current sector query.</p>
          </div>
        )}

        {/* Stats Section - Bento Node Style */}
        <div className="mt-32">
          <div className="neo-flat rounded-[3.5rem] md:rounded-[4.5rem] p-10 md:p-20 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 border border-white/[0.01]">
            <div className="space-y-4">
              <div className="text-5xl md:text-7xl font-black text-slate-200 tracking-tighter italic">200+</div>
              <p className="text-neo-accent-blue font-black text-[10px] tracking-[0.4em] uppercase opacity-70">Knowledge Nodes</p>
            </div>
            <div className="space-y-4 border-y md:border-y-0 md:border-x border-white/[0.03] py-12 md:py-0 md:px-12">
              <div className="text-5xl md:text-7xl font-black text-slate-200 tracking-tighter italic">20</div>
              <p className="text-neo-accent-orange font-black text-[10px] tracking-[0.4em] uppercase opacity-70">Active Archives</p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl md:text-7xl font-black text-slate-200 tracking-tighter italic">100%</div>
              <p className="text-neo-accent-emerald font-black text-[10px] tracking-[0.4em] uppercase opacity-70">Open Source</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

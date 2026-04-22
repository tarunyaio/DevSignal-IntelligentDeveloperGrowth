import { useState, useEffect } from 'react';
import { Search, Award, BookOpen, Clock, ChevronRight, Terminal } from 'lucide-react';
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
    <div className="min-h-screen bg-white text-black pb-40 overflow-x-hidden industrial-grid">
      <SEO title="Archive" description="Surgical access to hand-curated learning paths." />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="pt-24 pb-16 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-4 border-black mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center">
                <BookOpen size={32} strokeWidth={3} />
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none italic">
                The <span className="text-accent-indigo not-italic">Archive.</span>
              </h1>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
              Technical Repository • Accessing 20 Sectors of Excellence
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-[400px] group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-black transition-colors" size={20} />
            <input
              type="text"
              placeholder="Query Module ID..."
              className="w-full bg-white border-4 border-black h-20 pl-16 pr-8 text-lg font-black uppercase tracking-tighter placeholder:text-zinc-200 focus:outline-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-[3px] focus:translate-y-[3px] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-4 overflow-x-auto pb-16 no-scrollbar scroll-smooth">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-8 py-4 border-2 border-black font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all",
                selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-white text-zinc-400 hover:bg-zinc-100'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Section */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredPaths.map((path, index) => (
              <motion.div
                key={path.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
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
          <div className="text-center py-48 border-4 border-dashed border-zinc-200">
            <div className="w-24 h-24 bg-zinc-50 flex items-center justify-center mx-auto mb-10 text-zinc-200 border-2 border-zinc-100">
              <Terminal size={48} />
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Module_Not_Found</h3>
            <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.3em]">Redefine Search Parameters</p>
          </div>
        )}

        {/* Big Industrial Stat */}
        <div className="mt-40 border-4 border-black p-20 flex flex-col md:flex-row items-center justify-between gap-20 bg-zinc-50 relative overflow-hidden">
           <div className="industrial-grid absolute inset-0 opacity-20" />
           <div className="relative z-10 space-y-4">
              <div className="text-8xl font-black tracking-tighter leading-none">200+</div>
              <p className="text-xl font-black uppercase tracking-widest text-zinc-400">Intelligence_Units</p>
           </div>
           <div className="w-full md:w-px h-px md:h-32 bg-black relative z-10" />
           <div className="relative z-10 space-y-4">
              <div className="text-8xl font-black tracking-tighter leading-none text-accent-indigo">100%</div>
              <p className="text-xl font-black uppercase tracking-widest text-zinc-400">Open_Source_Logic</p>
           </div>
           <button className="relative z-10 px-12 py-6 bg-black text-white font-black text-sm uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(67,56,202,0.5)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
              Initialize Training
           </button>
        </div>
      </div>
    </div>
  );
}

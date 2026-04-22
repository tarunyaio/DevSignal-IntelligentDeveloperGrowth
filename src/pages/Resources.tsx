import { useState, useEffect } from 'react';
import { Search, Zap } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { LEARNING_PATHS } from '../data/learningPaths';
import { SEO } from '@/components/layout/SEO';

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
    <div className="min-h-screen bg-[#0f172a] pb-20">
      <SEO title="Learning Intelligence Archive" description="20 premium, hand-curated learning paths for developer growth." />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neo-flat mb-6 text-blue-400 font-bold text-sm">
              <Zap size={16} />
              <span>Learning Intelligence Archive</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Modern Stack</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              20 premium, hand-curated learning paths designed to take you from foundational concepts to advanced systems engineering.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 mb-20">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
              <input
                type="text"
                placeholder="Search for an archive..."
                className="w-full h-16 pl-12 pr-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${
                    selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20 scale-105'
                    : 'bg-white/[0.03] text-white/40 border border-white/5 hover:text-white hover:border-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPaths.map(path => (
              <CourseCard
                key={path.id}
                {...path}
                progress={progressData[path.id] || 0}
              />
            ))}
          </div>

          {filteredPaths.length === 0 && (
            <div className="text-center py-40">
              <div className="w-20 h-20 rounded-full neo-flat flex items-center justify-center mx-auto mb-6 text-white/20">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No archives found</h3>
              <p className="text-white/40">Try searching for a different keyword or category.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="p-12 rounded-[40px] neo-flat grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-4xl font-black text-white mb-2">200+</div>
            <div className="text-white/40 text-sm font-bold uppercase tracking-widest">Levels of Mastery</div>
          </div>
          <div className="border-x border-white/5">
            <div className="text-4xl font-black text-white mb-2">20</div>
            <div className="text-white/40 text-sm font-bold uppercase tracking-widest">Curated Archives</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-2">100%</div>
            <div className="text-white/40 text-sm font-bold uppercase tracking-widest">Free Resources</div>
          </div>
        </div>
      </div>
    </div>
  );
}

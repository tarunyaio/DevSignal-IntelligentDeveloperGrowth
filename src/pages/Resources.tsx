import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Terminal, Shield, Cpu, Layout } from 'lucide-react';
import { ResourceCard, type ResourceType } from '@/components/resources/ResourceCard';
import { useResources } from '@/hooks/queries';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/layout/SEO';

const CATEGORIES = [
  { id: 'all', name: 'All Resources', icon: Layout },
  { id: 'performance', name: 'Performance', icon: Terminal },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'ai', name: 'AI & ML', icon: Cpu },
  { id: 'architecture', name: 'Architecture', icon: BookOpen },
];

interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  category: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  url: string;
  rating: number;
}

const FALLBACK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Advanced React Performance',
    description: 'Master the art of high-performance rendering and virtualization in modern React apps.',
    type: 'video',
    category: 'performance',
    duration: '45 mins',
    difficulty: 'Advanced',
    url: 'https://react.dev',
    rating: 4.9
  },
  {
    id: '2',
    title: 'Zero Trust Security Guide',
    description: 'A guide on building modern SaaS apps to meet security standards.',
    type: 'article',
    category: 'security',
    duration: '15 mins',
    difficulty: 'Intermediate',
    url: 'https://owasp.org',
    rating: 4.7
  },
  {
    id: '3',
    title: 'Next.js Boilerplate: Deep Space',
    description: 'A premium starter kit with perfect lighthouse scores and glassmorphic UI integrated.',
    type: 'repo',
    category: 'architecture',
    duration: 'N/A',
    difficulty: 'Beginner',
    url: 'https://github.com',
    rating: 5.0
  },
  {
    id: '4',
    title: 'LLM Fine-tuning Masterclass',
    description: 'Understanding the fundamentals of training open-source models for custom enterprise logic.',
    type: 'course',
    category: 'ai',
    duration: '12 hours',
    difficulty: 'Advanced',
    url: 'https://huggingface.co',
    rating: 4.8
  },
  {
    id: '5',
    title: 'Microservices with Fastify',
    description: 'Building ultra-low latency backend systems using the Fastify ecosystem.',
    type: 'article',
    category: 'performance',
    duration: '25 mins',
    difficulty: 'Intermediate',
    url: 'https://fastify.io',
    rating: 4.6
  }
];

export function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: apiResources } = useResources();

  const resources = (apiResources && apiResources.length > 0 ? apiResources : FALLBACK_RESOURCES) as Resource[];

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           res.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, resources]);

  return (
    <div className="relative min-h-screen space-y-10 md:space-y-16 pb-28 md:pb-32">
      <SEO title="Resource Archive" description="Curated intelligence modules and architectural guides for modern developers." />
      {/* Header Section - Title aur Search Bar */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-slate-200">
            Resource <span className="text-neo-accent-blue not-italic underline decoration-neo-accent-blue/30 underline-offset-4 md:underline-offset-8">Archive</span>
          </h2>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mt-3">Curated intelligence modules for developer growth.</p>
        </div>

        <div className="relative w-full md:w-[450px]">
          <div className="absolute inset-0 neo-pressed rounded-3xl" />
          <div className="relative flex items-center px-6 py-5">
            <Search className="text-neo-accent-blue" size={20} strokeWidth={3} />
            <input 
              type="text"
              placeholder="Query archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-4 focus:outline-none placeholder:text-slate-700 font-bold text-sm tracking-wide text-slate-200"
            />
          </div>
        </div>
      </header>

      {/* Category Tabs - Tactile Navigation */}
      <div className="flex items-center gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "flex items-center gap-4 px-8 py-4 rounded-2xl transition-all whitespace-nowrap text-xs font-black uppercase tracking-widest border border-white/[0.01]",
                isActive 
                ? "neo-pressed text-neo-accent-blue shadow-[inset_0_0_15px_rgba(99,102,241,0.15)]" 
                : "neo-flat text-slate-500 hover:text-slate-300 hover:neo-pressed"
              )}
            >
              <div className={cn("w-6 h-6 flex items-center justify-center rounded-lg", isActive ? "text-neo-accent-blue" : "text-slate-600")}>
                <Icon size={16} strokeWidth={2.5} />
              </div>
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Resource Grid - Filtered resources card layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
        <AnimatePresence mode="popLayout">
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ResourceCard {...resource} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredResources.length === 0 && (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-6 rounded-full bg-white/5 border border-dashed border-white/10 text-slate-600">
              <Filter size={48} />
            </div>
            <p className="text-xl font-bold text-slate-500 italic">"No intelligence found for this search/filter."</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}
              className="text-purple-400 font-bold underline underline-offset-8 decoration-purple-500/30 hover:text-purple-300"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

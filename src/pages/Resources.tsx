import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Terminal, Shield, Cpu, Layout } from 'lucide-react';
import { ResourceCard, type ResourceType } from '@/components/resources/ResourceCard';

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

const MOCK_RESOURCES: Resource[] = [
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
    description: 'Yeh guide apko batayegi ki kaise modern SaaS apps ko security standards par build karein.',
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

// Yeh "Library" page resources ko search aur filter karne ki logic handle karega
export function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredResources = useMemo(() => {
    return MOCK_RESOURCES.filter(res => {
      const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           res.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="relative min-h-screen space-y-12 pb-32">
      {/* Header Section - Title aur Search Bar */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight uppercase">Resource <span className="italic font-serif text-purple-400">Library</span></h2>
          <p className="text-slate-400 font-medium">Curated intelligence to accelerate your developer growth.</p>
        </div>

        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text"
            placeholder="Search for intelligence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none transition-all placeholder:text-slate-600 font-bold text-sm shadow-xl backdrop-blur-md"
          />
        </div>
      </header>

      {/* Category Tabs - Navigation for different resource types */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all whitespace-nowrap font-bold text-sm ${
                isActive 
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.1)]' 
                : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300'
              }`}
            >
              <Icon size={16} /> {cat.name}
            </button>
          );
        })}
      </div>

      {/* Resource Grid - Filtered resources card layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
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

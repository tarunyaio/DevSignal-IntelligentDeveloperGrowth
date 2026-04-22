import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RepoCardProps {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  lastUpdated?: string;
  url?: string;
}

export function RepoCard({ id, name, description, stars, forks, language, url }: RepoCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div 
      onClick={() => navigate(`/repo/${id}`)}
      className="surgical-card p-10 cursor-pointer flex flex-col justify-between group h-full bg-white relative"
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b-2 border-black pb-6">
          <div className="w-12 h-12 bg-black flex items-center justify-center text-white">
            <Code size={24} strokeWidth={3} />
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); window.open(url, '_blank'); }}
            className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
          >
            <ExternalLink size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <h4 className="text-2xl font-black tracking-tighter uppercase group-hover:text-accent-indigo transition-colors">{name}</h4>
          <p className="text-sm text-zinc-500 font-bold italic line-clamp-3 leading-relaxed border-l-4 border-black/5 pl-4">
            {description || 'System description unavailable for this repository.'}
          </p>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest">
            <Star size={16} strokeWidth={3} className="text-yellow-600 fill-yellow-600" />
            {stars}
          </div>
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-zinc-600">
            <GitFork size={16} strokeWidth={3} />
            {forks}
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-black font-black text-[9px] uppercase tracking-widest">
          {language}
        </div>
      </div>
    </motion.div>
  );
}

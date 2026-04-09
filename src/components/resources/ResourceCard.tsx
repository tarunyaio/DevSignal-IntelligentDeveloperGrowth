import { motion } from 'framer-motion';
import { ExternalLink, Play, BookOpen, Star, Clock, Trophy } from 'lucide-react';

export type ResourceType = 'video' | 'article' | 'repo' | 'course';

interface ResourceCardProps {
  title: string;
  description: string;
  type: ResourceType;
  category: string;
  duration?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  url: string;
  rating: number;
}

const typeConfig = {
  video: { icon: Play, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  article: { icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  repo: { icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  course: { icon: Trophy, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
};

// Yeh ResourceCard ek individual learning resource ko glassmorphic style mein dikhata hai
export function ResourceCard({ title, description, type, category, duration, difficulty, url, rating }: ResourceCardProps) {
  const { icon: Icon, color, bg } = typeConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      className="group relative p-6 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl flex flex-col h-full"
    >
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-current opacity-[0.03] blur-3xl pointer-events-none group-hover:opacity-[0.08] transition-opacity" style={{ color: color.split('-')[1] }} />

      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl border ${bg} ${color}`}>
          <Icon size={20} />
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Clock size={10} /> {duration || 'Self-paced'}
        </div>
      </div>

      <div className="space-y-2 mb-4 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-tighter text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
            {category}
          </span>
          <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">
            • {difficulty}
          </span>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed italic">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={10} className={i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-700'} />
          ))}
          <span className="text-[10px] font-bold text-slate-500 ml-1">{rating}</span>
        </div>
        
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 py-2 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase transition-all"
        >
          Explore <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
}

import { Star, GitFork, Book, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface RepoCardProps {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  lastUpdated: string;
}

export function RepoCard({ id, name, description, stars, forks, language, lastUpdated }: RepoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="neo-flat rounded-[2.5rem] p-7 group relative border border-white/[0.01] flex flex-col gap-5 h-full"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 neo-icon text-neo-accent-blue">
            <Book size={22} strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight text-slate-200 group-hover:text-neo-accent-blue transition-colors truncate max-w-[150px]">
              {name.includes('/') ? name.split('/')[1] : name}
            </h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{lastUpdated}</p>
          </div>
        </div>
        
        <div className="neo-pressed px-3 py-1.5 rounded-xl border border-white/[0.01] text-[10px] font-black tracking-tighter text-slate-400 uppercase">
          {language}
        </div>
      </div>

      <p className="text-sm text-slate-400 font-medium leading-relaxed line-clamp-2">
        {description || "Autonomous neural agent repository synchronized for deep signal analysis."}
      </p>

      <div className="flex items-center gap-6 mt-auto">
        <div className="flex items-center gap-2 group-hover:text-neo-accent-blue transition-colors">
          <div className="neo-icon w-8 h-8 scale-75">
            <Star size={14} className="fill-current" />
          </div>
          <span className="text-xs font-black text-slate-300">{stars}</span>
        </div>
        
        <div className="flex items-center gap-2 group-hover:text-neo-accent-blue transition-colors">
          <div className="neo-icon w-8 h-8 scale-75">
            <GitFork size={14} />
          </div>
          <span className="text-xs font-black text-slate-300">{forks}</span>
        </div>

        <Link 
          to={`/repo/${id}`} 
          className="ml-auto w-10 h-10 neo-icon hover:neo-icon-pressed text-slate-500 hover:text-neo-accent-blue transition-all"
        >
          <ArrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
}

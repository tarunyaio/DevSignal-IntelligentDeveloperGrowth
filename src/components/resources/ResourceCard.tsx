import { motion } from 'framer-motion';
import { ExternalLink, Play, BookOpen, Star, Clock, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  video: { icon: Play, color: 'text-rose-500 bg-rose-500/10' },
  article: { icon: BookOpen, color: 'text-blue-500 bg-blue-500/10' },
  repo: { icon: Star, color: 'text-emerald-500 bg-emerald-500/10' },
  course: { icon: Trophy, color: 'text-amber-500 bg-amber-500/10' },
};

export function ResourceCard({ title, description, type, category, duration, difficulty, url, rating }: ResourceCardProps) {
  const { icon: Icon, color } = typeConfig[type];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-panel p-6 flex flex-col justify-between h-full relative group transition-all duration-300 hover:shadow-lg hover:border-primary/30"
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all", color)}>
              <Icon size={18} strokeWidth={2} />
            </div>
            <span className="px-2.5 py-1 rounded-md bg-surface border border-border font-semibold text-xs text-text-muted uppercase tracking-wider">
              {category}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 text-text-muted font-semibold text-xs uppercase tracking-wider">
            <Clock size={14} />
            {duration || 'Self-paced'}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold tracking-tight text-text group-hover:text-primary transition-colors leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-xs font-medium text-text-muted uppercase tracking-wider">
             <span className={cn(
               "px-2 py-0.5 rounded-sm",
               difficulty === 'Beginner' ? "bg-emerald-500/10 text-emerald-500" :
               difficulty === 'Intermediate' ? "bg-amber-500/10 text-amber-500" :
               "bg-rose-500/10 text-rose-500"
             )}>
               {difficulty}
             </span>
          </div>
          <p className="text-sm text-text-muted font-medium line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < Math.floor(rating) ? 'text-amber-500 fill-amber-500' : 'text-surface-hover fill-surface-hover'} 
              strokeWidth={1}
            />
          ))}
          <span className="text-xs font-semibold text-text-muted ml-1.5">{rating.toFixed(1)}</span>
        </div>
        
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary hover:bg-surface-hover transition-all shadow-sm group-hover:shadow-md"
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </motion.div>
  );
}

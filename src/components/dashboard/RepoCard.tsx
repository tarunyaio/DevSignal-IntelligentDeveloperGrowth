import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RepoCardProps {
  id: string;
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  lastUpdated?: string;
  url?: string;
}

export function RepoCard({ id, name, description, stars, forks, language, url }: RepoCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div 
      onClick={() => navigate(`/repo/${id}`)}
      className="glass-panel p-5 cursor-pointer flex flex-col justify-between group h-full"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Code size={16} strokeWidth={2} />
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); window.open(url, '_blank'); }}
            className="w-8 h-8 rounded-lg text-text-muted hover:bg-surface hover:text-text transition-all flex items-center justify-center"
            aria-label={`Open ${name} on GitHub`}
          >
            <ExternalLink size={16} />
          </button>
        </div>

        <div className="space-y-2">
          <h4 className="text-base font-semibold text-text group-hover:text-primary transition-colors leading-tight line-clamp-1" title={name}>
            {name}
          </h4>
          <p className="text-sm text-text-muted line-clamp-2 leading-relaxed">
            {description || 'No description provided.'}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4 text-text-muted">
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <Star size={14} className="text-amber-500" />
            {stars}
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <GitFork size={14} />
            {forks}
          </div>
        </div>
        
        {language && (
          <div className="px-2.5 py-1 rounded-full bg-surface border border-border text-xs font-medium text-text-muted">
            {language}
          </div>
        )}
      </div>
    </motion.div>
  );
}

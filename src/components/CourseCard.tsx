import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  tagline: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessonsCount: number;
  progress: number;
}

export function CourseCard({ id, title, tagline, category, difficulty, duration, lessonsCount, progress }: CourseCardProps) {
  const completionPercentage = Math.round((progress / lessonsCount) * 100);

  return (
    <motion.div 
      className="glass-panel p-6 flex flex-col justify-between h-full relative group hover:-translate-y-1 transition-all duration-300"
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="px-2.5 py-1 rounded-md bg-surface border border-border font-semibold text-xs text-text-muted uppercase tracking-wider">
            {difficulty}
          </span>
          <div className="flex items-center gap-1.5 text-text-muted font-semibold text-xs uppercase tracking-wider">
            <Clock size={14} />
            {duration}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xl font-semibold tracking-tight text-text group-hover:text-primary transition-colors leading-tight">
            {title}
          </h4>
          <p className="text-sm text-text-muted font-medium line-clamp-3 leading-relaxed">
            {tagline}
          </p>
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20">
          {category}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
            <span className="text-text-muted">Integrity</span>
            <span className="text-primary">{completionPercentage}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-surface-hover overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
               className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(222,219,200,0.4)]"
            />
          </div>
        </div>

        <Link 
          to={`/learning-path/${id}`}
          className="w-full py-3 px-4 rounded-xl bg-surface border border-border font-semibold text-sm text-text flex items-center justify-center gap-2 hover:bg-surface-hover hover:border-primary/30 transition-all shadow-sm group-hover:shadow-md"
        >
          {progress > 0 ? 'Resume Module' : 'Init Module'}
          <ChevronRight size={16} className="text-text-muted group-hover:text-primary transition-colors" />
        </Link>
      </div>
    </motion.div>
  );
}

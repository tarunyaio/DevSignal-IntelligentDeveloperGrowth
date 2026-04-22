import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Star } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  tagline: string;
  category: string;
  difficulty: string;
  totalHours: number;
  accentColor: string;
  icon: any;
  progress: number; // 0 to 10
}

export const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  tagline,
  category,
  difficulty,
  totalHours,
  accentColor,
  icon: Icon,
  progress
}) => {
  const navigate = useNavigate();
  const progressPercentage = (progress / 10) * 100;

  return (
    <div 
      onClick={() => navigate(`/resources/${id}`)}
      className="neo-flat rounded-2xl p-6 cursor-pointer group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
    >
      {/* Accent Gradient Background */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ 
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` 
        }}
      />

      <div className="flex items-start justify-between mb-4">
        <div 
          className="p-3 rounded-xl neo-icon bg-white/5"
          style={{ color: accentColor }}
        >
          <Icon size={24} />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
            {category}
          </span>
          <div className="flex items-center gap-2">
             <Star size={12} className={difficulty === 'Advanced' ? 'text-orange-400' : 'text-blue-400'} />
             <span className="text-xs font-medium text-white/60">{difficulty}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-white/50 line-clamp-2">
          {tagline}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-white/40">
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{totalHours}h estimated</span>
          </div>
          <span>{progress}/10 Levels</span>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${progressPercentage}%`,
              backgroundColor: accentColor,
              boxShadow: `0 0 10px ${accentColor}40`
            }}
          />
        </div>

        <button className="w-full py-3 rounded-xl neo-flat flex items-center justify-center gap-2 text-sm font-bold text-white group-hover:neo-pressed transition-all">
          {progress > 0 ? 'Continue Path' : 'Begin Journey'}
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

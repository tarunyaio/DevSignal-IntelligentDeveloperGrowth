import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Star, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  id: string;
  title: string;
  tagline: string;
  category: string;
  difficulty: string;
  totalHours: number;
  accentColor: string;
  icon: any;
  progress: number;
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

  // Reduced tilt for stability
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/resources/${id}`)}
      className="group relative"
    >
      <div className="neo-flat rounded-[2rem] p-6 cursor-pointer border border-white/[0.01] transition-all duration-500 hover:neo-pressed flex flex-col min-h-[380px]">
        {/* Header Metadata */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{category}</span>
          </div>
          <ArrowUpRight size={14} className="text-slate-600 group-hover:text-neo-accent-blue transition-colors" />
        </div>

        {/* Content Node */}
        <div className="mb-6 space-y-4">
          <div 
            className="w-12 h-12 neo-icon"
            style={{ color: accentColor }}
          >
            <Icon size={20} strokeWidth={2.5} />
          </div>
          <h3 className="text-xl font-black italic tracking-tighter text-slate-200 leading-tight group-hover:text-neo-accent-blue transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed opacity-60 line-clamp-2 italic">
            {tagline}
          </p>
        </div>

        {/* Bottom Metadata - Fixed at bottom */}
        <div className="mt-auto pt-6 border-t border-white/[0.03] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={12} className="text-slate-600" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{totalHours}H</span>
            </div>
            <div className="flex items-center gap-2">
               <Star size={10} className={cn("fill-current", difficulty === 'Advanced' ? 'text-neo-accent-orange' : 'text-neo-accent-blue')} />
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{difficulty}</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="h-[4px] w-full neo-pressed rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  backgroundColor: accentColor,
                  boxShadow: `0 0 10px ${accentColor}40`
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-600">
               <span>Sync</span>
               <span>{progress}/10</span>
            </div>
          </div>

          <button className="w-full py-4 rounded-xl neo-flat flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-slate-200 hover:neo-pressed transition-all group/btn">
            {progress > 0 ? 'Resume' : 'Start'}
            <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

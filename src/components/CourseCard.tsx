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

  // Tilt Animation Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      <div className="neo-flat rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 cursor-pointer border border-white/[0.01] transition-all duration-500 hover:neo-pressed h-full flex flex-col">
        {/* Category Badge - Surgical Style */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2">Sector</span>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
              <span className="text-xs font-black uppercase tracking-widest text-slate-300">{category}</span>
            </div>
          </div>
          
          <div className="w-10 h-10 neo-icon group-hover:neo-icon-pressed transition-all">
            <ArrowUpRight size={16} className="text-slate-500 group-hover:text-neo-accent-blue transition-colors" />
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-10 space-y-4 flex-grow">
          <div 
            className="w-12 h-12 md:w-14 md:h-14 neo-icon mb-6"
            style={{ color: accentColor }}
          >
            <Icon size={20} className="md:size-[24px]" strokeWidth={2.5} />
          </div>
          <h3 className="text-2xl font-black italic tracking-tighter text-slate-200 leading-tight group-hover:text-neo-accent-blue transition-colors">
            {title}
          </h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-loose opacity-60 line-clamp-2 italic">
            {tagline}
          </p>
        </div>

        {/* Technical Metadata */}
        <div className="space-y-6 pt-6 border-t border-white/[0.03]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock size={14} className="text-slate-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{totalHours}h Est.</span>
            </div>
            <div className="flex items-center gap-2">
               <Star size={12} className={cn("fill-current", difficulty === 'Advanced' ? 'text-neo-accent-orange' : 'text-neo-accent-blue')} />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{difficulty}</span>
            </div>
          </div>

          {/* Surgical Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">Sync Status</span>
              <span className="text-[11px] font-black italic text-slate-300">{progress}/10</span>
            </div>
            <div className="h-[6px] w-full neo-pressed rounded-full overflow-hidden p-[1px]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                style={{ 
                  backgroundColor: accentColor,
                  boxShadow: `0 0 15px ${accentColor}30`
                }}
              />
            </div>
          </div>

          <button className="w-full py-5 rounded-[1.5rem] neo-flat flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-200 hover:neo-pressed transition-all group/btn">
            {progress > 0 ? 'Initialize Continue' : 'Initialize Journey'}
            <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

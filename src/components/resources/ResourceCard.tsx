import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Play, BookOpen, Star, Clock, Trophy } from 'lucide-react';
import React from 'react';
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
  video: { icon: Play, color: 'text-red-400' },
  article: { icon: BookOpen, color: 'text-neo-accent-blue' },
  repo: { icon: Star, color: 'text-neo-accent-emerald' },
  course: { icon: Trophy, color: 'text-neo-accent-orange' },
};

export function ResourceCard({ title, description, type, category, duration, difficulty, url, rating }: ResourceCardProps) {
  const { icon: Icon, color } = typeConfig[type];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-1000 h-full"
    >
      <div 
        className="neo-flat rounded-[3rem] p-9 group relative border border-white/[0.01] flex flex-col gap-8 h-full transition-shadow duration-500 hover:shadow-2xl"
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Header: Type Icon aur Duration */}
        <div className="flex justify-between items-start" style={{ transform: "translateZ(40px)" }}>
          <div className={cn("w-14 h-14 neo-icon", color)}>
            <Icon size={24} strokeWidth={2.5} />
          </div>
          
          <div className="neo-pressed px-4 py-2 rounded-xl border border-white/[0.01] flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-500 uppercase" style={{ transform: "translateZ(50px)" }}>
            <Clock size={12} strokeWidth={3} /> {duration || 'Self-paced'}
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4 flex-1" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center gap-4">
            <span className="neo-pressed px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest text-neo-accent-blue border border-white/[0.01]">
              {category}
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">
              • {difficulty}
            </span>
          </div>
          
          <h3 className="text-2xl font-black tracking-tighter text-slate-200 group-hover:text-neo-accent-blue transition-colors leading-tight italic">
            {title}
          </h3>
          <p className="text-sm text-slate-500 font-medium leading-[1.6] italic opacity-80 group-hover:opacity-100 transition-opacity">
            {description}
          </p>
        </div>

        {/* Footer: Rating aur Explore CTA */}
        <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/[0.03]" style={{ transform: "translateZ(45px)" }}>
          <div className="flex items-center gap-1.5 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < Math.floor(rating) ? 'text-neo-accent-orange fill-neo-accent-orange' : 'text-slate-800'} 
                strokeWidth={3}
              />
            ))}
            <span className="text-[10px] font-black text-slate-400 ml-2 tracking-tighter">{rating}</span>
          </div>
          
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 neo-icon hover:neo-icon-pressed text-slate-500 hover:text-neo-accent-blue transition-all border border-white/[0.01]"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

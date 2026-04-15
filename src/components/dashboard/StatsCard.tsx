import type { LucideIcon } from 'lucide-react';
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'blue' | 'orange' | 'purple' | 'emerald';
}

const colorMap = {
  blue: 'text-neo-accent-blue',
  orange: 'text-neo-accent-orange',
  purple: 'text-purple-400',
  emerald: 'text-emerald-400',
};

export function StatsCard({ title, value, suffix, icon: Icon, trend, color }: StatsCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const cleanTitle = title === "Repositories" ? "Total Repos" : 
                     title === "Signal Stars" ? "Total Stars" : title;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-1000"
    >
      <div 
        className="neo-flat rounded-[3rem] p-8 group relative border border-white/[0.01] transition-shadow duration-500 hover:shadow-2xl"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="flex justify-between items-start mb-8" style={{ transform: "translateZ(40px)" }}>
          <div className={cn("w-16 h-16 neo-icon", colorMap[color])}>
            <Icon size={26} strokeWidth={2.5} />
          </div>
          
          {trend && (
            <div className={cn(
              "neo-pressed px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border border-white/[0.02] uppercase",
              trend.isPositive ? 'text-neo-accent-blue' : 'text-neo-accent-orange'
            )}>
              {trend.isPositive ? '+' : '-'}{trend.value}%
            </div>
          )}
        </div>

        <div className="space-y-2" style={{ transform: "translateZ(50px)" }}>
          <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">{cleanTitle}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-5xl font-black tracking-tighter text-slate-200">{value}</h3>
            {suffix && <span className="text-xs text-slate-600 font-bold uppercase">{suffix}</span>}
          </div>
        </div>

        {/* Subtle Glow Layer */}
        <div className={cn(
          "absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-[2px] blur-md transition-opacity duration-700 opacity-20 group-hover:opacity-100",
          color === 'blue' || color === 'emerald' ? "bg-neo-accent-blue" : "bg-neo-accent-orange"
        )} />
      </div>
    </motion.div>
  );
}

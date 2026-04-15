import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
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
  blue: 'text-neo-accent-blue shadow-neo-accent-blue/5',
  orange: 'text-neo-accent-orange shadow-neo-accent-orange/5',
  purple: 'text-purple-400 shadow-purple-400/5',
  emerald: 'text-emerald-400 shadow-emerald-400/5',
};

export function StatsCard({ title, value, suffix, icon: Icon, trend, color }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="neo-flat rounded-[2.5rem] p-7 group relative border border-white/[0.01]"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={cn("w-14 h-14 neo-icon transition-shadow duration-500", colorMap[color])}>
          <Icon size={24} strokeWidth={2} />
        </div>
        
        {trend && (
          <div className={cn(
            "neo-pressed px-3 py-1 rounded-full text-[10px] font-black tracking-widest border border-white/[0.02] uppercase",
            trend.isPositive ? 'text-neo-accent-blue' : 'text-neo-accent-orange'
          )}>
            {trend.isPositive ? '+' : '-'}{trend.value}%
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-4xl font-black tracking-tighter text-slate-200">{value}</h3>
          {suffix && <span className="text-xs text-slate-600 font-bold uppercase">{suffix}</span>}
        </div>
      </div>

      {/* Subtle Glow */}
      <div className={cn(
        "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-[1px] blur-sm transition-opacity duration-500",
        color === 'blue' ? "bg-neo-accent-blue/30" : "bg-neo-accent-orange/30"
      )} />
    </motion.div>
  );
}

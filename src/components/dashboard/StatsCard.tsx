import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

const COLOR_MAP: Record<string, string> = {
  blue: 'text-blue-500 bg-blue-500/10',
  amber: 'text-amber-500 bg-amber-500/10',
  violet: 'text-violet-500 bg-violet-500/10',
  orange: 'text-orange-500 bg-orange-500/10',
  rose: 'text-rose-500 bg-rose-500/10',
  emerald: 'text-emerald-500 bg-emerald-500/10',
  indigo: 'text-indigo-500 bg-indigo-500/10',
};

export function StatsCard({ title, value, icon: Icon, trend, color }: StatsCardProps) {
  const colorClasses = color && COLOR_MAP[color] ? COLOR_MAP[color] : 'text-primary bg-primary/10';
  
  return (
    <motion.div 
      className="glass-panel p-5 flex flex-col justify-between h-full relative overflow-hidden"
    >
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", colorClasses)}>
          <Icon size={18} strokeWidth={2} />
        </div>
        {trend && (
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1",
            trend.isPositive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>

      <div className="mt-6 space-y-1">
        <p className="text-sm font-medium text-text-muted">{title}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-3xl font-semibold tracking-tight text-text leading-none">{value}</h4>
        </div>
      </div>
    </motion.div>
  );
}

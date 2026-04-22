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
  blue: 'text-blue-500',
  amber: 'text-amber-500',
  violet: 'text-violet-500',
  orange: 'text-orange-500',
  rose: 'text-rose-500',
  emerald: 'text-emerald-500',
  indigo: 'text-indigo-500',
};

export function StatsCard({ title, value, icon: Icon, trend, color }: StatsCardProps) {
  const iconColor = color && COLOR_MAP[color] ? COLOR_MAP[color] : 'text-black';
  return (
    <motion.div 
      className="surgical-card p-10 flex flex-col justify-between h-full bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-2 h-full bg-black opacity-5" />
      
      <div className="flex items-start justify-between">
        <div className={cn("w-16 h-16 border-4 border-black flex items-center justify-center transition-colors group-hover:bg-black group-hover:text-white", iconColor)}>
          <Icon size={32} strokeWidth={3} />
        </div>
        {trend && (
          <div className={cn(
            "px-2 py-1 border-2 border-black font-black text-[10px] uppercase tracking-widest",
            trend.isPositive ? "bg-green-400" : "bg-red-400"
          )}>
            {trend.value}%
          </div>
        )}
      </div>

      <div className="mt-12 space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">{title}</p>
        <div className="flex items-baseline gap-4">
          <h4 className="text-5xl font-black tracking-tighter leading-none">{value}</h4>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">_UNIT</span>
        </div>
      </div>
    </motion.div>
  );
}

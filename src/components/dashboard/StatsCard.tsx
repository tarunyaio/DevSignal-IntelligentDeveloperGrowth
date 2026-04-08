import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'purple' | 'blue' | 'pink' | 'cyan';
}

const colorMap = {
  purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/20 text-purple-400',
  blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-400',
  pink: 'from-pink-500/20 to-pink-600/5 border-pink-500/20 text-pink-400',
  cyan: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 text-cyan-400',
};

// Yeh StatsCard component stats ko ek premium glassmorphic box mein dikhayega
export function StatsCard({ title, value, suffix, icon: Icon, trend, color }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
      className={`relative group overflow-hidden rounded-[2rem] border p-6 bg-gradient-to-br ${colorMap[color]} backdrop-blur-xl`}
    >
      {/* Background Glow Effect - Light shadow jaisa feel dene ke liye */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-current opacity-10 blur-3xl group-hover:opacity-20 transition-opacity" />
      
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-white/5 border border-white/10`}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
            trend.isPositive ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            {trend.isPositive ? '+' : '-'}{trend.value}%
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          {suffix && <span className="text-sm text-slate-500 font-medium">{suffix}</span>}
        </div>
      </div>

      {/* Subtle bottom line for that "alive" look */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
    </motion.div>
  );
}

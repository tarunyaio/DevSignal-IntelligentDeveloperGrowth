import React from 'react';
import { motion } from 'framer-motion';

interface ActivityChartProps {
  data?: {
    total: number;
    week: number;
    days: number[];
  }[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  // Check if data is missing or empty (GitHub returns 202 during computation)
  const isComputing = !data || (Array.isArray(data) && data.length === 0);

  if (isComputing) {
    return (
      <div className="h-48 flex flex-col items-center justify-center text-slate-500 space-y-3">
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              className="w-2 h-2 rounded-full bg-emerald-500"
            />
          ))}
        </div>
        <p className="text-sm italic animate-pulse">GitHub is computing activity stats...</p>
      </div>
    );
  }

  const maxCommits = Math.max(...data.map(w => w.total), 1);
  const width = 800;
  const height = 120;
  const padding = 20;

  // Generate points for the sparkline
  const points = data.map((week, i) => {
    const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
    const y = height - (week.total / maxCommits) * (height - 2 * padding) - padding;
    return { x, y, total: week.total };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div className="relative group">
      <div className="absolute top-0 right-0 flex items-center gap-2 text-[10px] text-emerald-500/80 font-mono">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        LIVE PULSE
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-48 drop-shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area Fill */}
        <motion.path
          d={areaPath}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Sparkline Path */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Hover Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            className="fill-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ transitionDelay: `${i * 20}ms` }}
          />
        ))}
      </svg>

      <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500/60 border-t border-white/5 pt-4">
        <span>12 Weeks Ago</span>
        <span>Recent Pulse</span>
      </div>
    </div>
  );
}

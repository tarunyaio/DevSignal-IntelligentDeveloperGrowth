import React from 'react';
import { motion } from 'framer-motion';

interface LanguageStatsProps {
  languages?: Record<string, number>;
}

export function LanguageStats({ languages }: LanguageStatsProps) {
  if (!languages || Object.keys(languages).length === 0) {
    return (
      <div className="text-slate-500 text-sm italic">
        No language data available.
      </div>
    );
  }

  const total = Object.values(languages).reduce((acc, val) => acc + val, 0);
  const sortedLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5); // Top 5

  const colors: Record<string, string> = {
    TypeScript: 'bg-blue-400',
    JavaScript: 'bg-yellow-400',
    HTML: 'bg-orange-500',
    CSS: 'bg-indigo-500',
    Python: 'bg-blue-600',
    Go: 'bg-cyan-500',
    Rust: 'bg-orange-700',
    Java: 'bg-red-600',
  };

  const getLanguageColor = (lang: string) => colors[lang] || 'bg-slate-400';

  return (
    <div className="space-y-6">
      <div className="h-4 w-full flex rounded-full overflow-hidden bg-white/5 border border-white/5">
        {sortedLanguages.map(([lang, count], idx) => {
          const percentage = (count / total) * 100;
          return (
            <motion.div
              key={lang}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: idx * 0.1, duration: 1, ease: "easeOut" }}
              className={`${getLanguageColor(lang)} h-full relative group`}
            >
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-slate-800 border border-white/10 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {lang}: {percentage.toFixed(1)}%
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-y-3 gap-x-6">
        {sortedLanguages.map(([lang, count]) => (
          <div key={lang} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${getLanguageColor(lang)}`} />
            <div className="flex-1 flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{lang}</span>
              <span className="text-[10px] font-bold text-slate-500">{((count / total) * 100).toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

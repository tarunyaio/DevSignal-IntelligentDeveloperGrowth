import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LanguageStatsProps {
  languages?: Record<string, number>;
}

export function LanguageStats({ languages }: LanguageStatsProps) {
  if (!languages || Object.keys(languages).length === 0) {
    return (
      <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic opacity-50">
        No signal detected.
      </div>
    );
  }

  const total = Object.values(languages).reduce((acc, val) => acc + val, 0);
  const sortedLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const colors: Record<string, string> = {
    TypeScript: 'bg-neo-accent-blue',
    JavaScript: 'bg-yellow-500',
    HTML: 'bg-neo-accent-orange',
    CSS: 'bg-purple-500',
    Python: 'bg-blue-500',
    Go: 'bg-neo-accent-blue',
    Rust: 'bg-orange-700',
    Java: 'bg-red-600',
    Shell: 'bg-neo-accent-emerald',
  };

  const getLanguageColor = (lang: string) => colors[lang] || 'bg-slate-400';

  return (
    <div className="space-y-8">
      <div className="h-4 w-full neo-pressed rounded-full p-1 overflow-hidden border border-white/[0.01]">
        <div className="h-full flex rounded-full overflow-hidden">
          {sortedLanguages.map(([lang, count], idx) => {
            const percentage = (count / total) * 100;
            return (
              <motion.div
                key={lang}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: idx * 0.1, duration: 1, ease: "easeOut" }}
                className={cn(getLanguageColor(lang), "h-full relative group")}
              />
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {sortedLanguages.map(([lang, count]) => {
          const pct = (count / total) * 100;
          return (
            <div key={lang} className="flex items-center gap-4">
              <div className={cn("w-3 h-3 rounded-full neo-flat", getLanguageColor(lang))} />
              <div className="flex-1 flex justify-between items-center group">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">
                  {lang}
                </span>
                <span className="text-[11px] font-black text-slate-400 group-hover:text-neo-accent-blue transition-colors">
                  {pct.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LanguageStatsProps {
  languages?: Record<string, number>;
}

const COLORS: Record<string, string> = {
  TypeScript: 'bg-accent-indigo',
  JavaScript: 'bg-yellow-400',
  HTML: 'bg-orange-500',
  CSS: 'bg-violet-500',
  Python: 'bg-blue-500',
  Go: 'bg-sky-500',
  Rust: 'bg-orange-700',
  Java: 'bg-red-600',
  Shell: 'bg-green-500',
};

export function LanguageStats({ languages }: LanguageStatsProps) {
  if (!languages || Object.keys(languages).length === 0) {
    return (
      <div className="text-zinc-400 text-[10px] font-black uppercase tracking-widest italic border-2 border-black border-dashed p-6 text-center">
        SIGNAL_LOST: No data detected.
      </div>
    );
  }

  const total = Object.values(languages).reduce((acc, val) => acc + val, 0);
  const sortedLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const getLanguageColor = (lang: string) => COLORS[lang] || 'bg-zinc-300';

  return (
    <div className="space-y-10">
      <div className="h-6 w-full border-2 border-black p-1 bg-zinc-50 overflow-hidden">
        <div className="h-full flex overflow-hidden">
          {sortedLanguages.map(([lang, count], idx) => {
            const percentage = (count / total) * 100;
            return (
              <motion.div
                key={lang}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: idx * 0.1, duration: 1, ease: "circOut" }}
                className={cn(getLanguageColor(lang), "h-full border-r border-black/20")}
              />
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {sortedLanguages.map(([lang, count]) => {
          const pct = (count / total) * 100;
          return (
            <div key={lang} className="flex items-center gap-6 group">
              <div className={cn("w-4 h-4 border-2 border-black", getLanguageColor(lang))} />
              <div className="flex-1 flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-black">
                  {lang}
                </span>
                <span className="text-xs font-black text-zinc-400 group-hover:text-black transition-colors">
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

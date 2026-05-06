import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LanguageStatsProps {
  languages?: Record<string, number>;
}

const COLORS: Record<string, string> = {
  TypeScript: 'bg-teal-500',
  JavaScript: 'bg-amber-400',
  HTML: 'bg-orange-500',
  CSS: 'bg-cyan-500',
  Python: 'bg-blue-500',
  Go: 'bg-sky-500',
  Rust: 'bg-orange-600',
  Java: 'bg-rose-500',
  Shell: 'bg-emerald-500',
};

export function LanguageStats({ languages }: LanguageStatsProps) {
  if (!languages || Object.keys(languages).length === 0) {
    return (
      <div className="text-text-muted text-xs font-medium uppercase tracking-wider italic border border-border border-dashed rounded-xl p-8 text-center bg-surface-hover/30">
        No language data detected.
      </div>
    );
  }

  const total = Object.values(languages).reduce((acc, val) => acc + val, 0);
  const sortedLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const getLanguageColor = (lang: string) => COLORS[lang] || 'bg-primary';

  return (
    <div className="space-y-8">
      <div className="h-3 w-full rounded-full bg-surface-hover overflow-hidden shadow-inner">
        <div className="h-full flex overflow-hidden">
          {sortedLanguages.map(([lang, count], idx) => {
            const percentage = (count / total) * 100;
            return (
              <motion.div
                key={lang}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: idx * 0.1, duration: 1, ease: "easeOut" }}
                className={cn(getLanguageColor(lang), "h-full border-r border-bg/20")}
              />
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {sortedLanguages.map(([lang, count]) => {
          const pct = (count / total) * 100;
          return (
            <div key={lang} className="flex items-center gap-4 group">
              <div className={cn("w-3 h-3 rounded-full shadow-sm", getLanguageColor(lang))} />
              <div className="flex-1 flex justify-between items-center">
                <span className="text-sm font-semibold text-text">
                  {lang}
                </span>
                <span className="text-sm font-medium text-text-muted group-hover:text-primary transition-colors">
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

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface LanguageData {
  name: string;
  percentage: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#6366f1',
  JavaScript: '#eab308',
  Python: '#3b82f6',
  Rust: '#f97316',
  Go: '#0ea5e9',
  Java: '#c026d3',
  'C++': '#f43f5e',
  'C#': '#10b981',
  Ruby: '#ef4444',
  Swift: '#f97316',
  Kotlin: '#8b5cf6',
  PHP: '#6366f1',
  HTML: '#f97316',
  CSS: '#3b82f6',
  Shell: '#10b981',
};

const DEFAULT_LANGUAGES: LanguageData[] = [
  { name: 'JavaScript', percentage: 47 },
  { name: 'HTML', percentage: 21 },
  { name: 'TypeScript', percentage: 21 },
  { name: 'CSS', percentage: 8 },
  { name: 'Python', percentage: 3 },
];

interface LanguageChartProps {
  languages?: LanguageData[];
}

export function LanguageChart({ languages }: LanguageChartProps) {
  const data = languages && languages.length > 0 ? languages : DEFAULT_LANGUAGES;
  return (
    <div className="glass-panel p-6 relative overflow-hidden group">
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-text leading-none flex items-center gap-2">
            Language <span className="text-primary">Distribution</span>
          </h3>
          <p className="text-xs text-text-muted uppercase tracking-wider font-medium mt-2">Architectural Composition</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border">
          <Terminal size={16} className="text-text-muted group-hover:text-primary transition-colors" />
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {data.map((lang, index) => (
          <div key={lang.name} className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-xs font-semibold text-text uppercase tracking-wider">{lang.name}</span>
              <span className="text-xs font-medium text-text-muted">{lang.percentage}%</span>
            </div>
            
            <div className="h-2 w-full rounded-full bg-surface-hover overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.percentage}%` }}
                transition={{ duration: 1.2, delay: index * 0.08, ease: "easeOut" }}
                className="h-full relative rounded-full"
                style={{ backgroundColor: LANGUAGE_COLORS[lang.name] || '#4f46e5', boxShadow: `0 0 8px ${LANGUAGE_COLORS[lang.name] || '#4f46e5'}40` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-surface border border-border relative overflow-hidden">
        <div className="relative z-10 text-xs text-text-muted leading-relaxed font-medium">
          Stack focused on <span className="text-text font-semibold">Modern Standards</span> &amp; <span className="text-text font-semibold">Scalability</span>.
        </div>
      </div>
    </div>
  );
}

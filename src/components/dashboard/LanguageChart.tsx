import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  { name: 'TypeScript', percentage: 45 },
  { name: 'JavaScript', percentage: 25 },
  { name: 'Python', percentage: 20 },
  { name: 'Other', percentage: 10 },
];

interface LanguageChartProps {
  languages?: LanguageData[];
}

export function LanguageChart({ languages }: LanguageChartProps) {
  const data = languages && languages.length > 0 ? languages : DEFAULT_LANGUAGES;
  return (
    <div className="neo-flat p-10 rounded-[3rem] h-full relative border border-white/[0.01]">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-black tracking-tighter text-slate-200 uppercase">Language <span className="italic font-serif text-neo-accent-orange underline decoration-neo-accent-orange/30 underline-offset-8">Distribution</span></h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] font-black mt-3">Architectural Composition</p>
        </div>
      </div>

      <div className="space-y-10">
        {data.map((lang, index) => (
          <div key={lang.name} className="space-y-4">
            <div className="flex justify-between items-end px-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{lang.name}</span>
              <span className="text-xs font-black text-slate-200 tracking-tighter">{lang.percentage}%</span>
            </div>
            
            <div className="h-3 w-full neo-pressed rounded-full p-[3px] overflow-hidden border border-white/[0.01]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.percentage}%` }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                className="h-full rounded-full relative"
                style={{ backgroundColor: LANGUAGE_COLORS[lang.name] || '#a97bff' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Polish "Intelligence" Overlay */}
      <div className="mt-12 p-6 neo-pressed rounded-[2.5rem] border border-white/[0.01] text-[11px] text-slate-400 leading-relaxed font-bold italic tracking-wide">
        "Your stack is balanced with a focus on <span className="text-neo-accent-blue font-black not-italic px-1">Modern Standards</span> and <span className="text-neo-accent-orange font-black not-italic px-1">System Scalability</span>."
      </div>
    </div>
  );
}

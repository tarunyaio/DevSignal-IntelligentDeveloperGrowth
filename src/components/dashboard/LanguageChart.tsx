import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LanguageData {
  name: string;
  percentage: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#00aced',
  JavaScript: '#f7df1e',
  Python: '#3776ab',
  Rust: '#dea584',
  Go: '#00add8',
  Java: '#b07219',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#cc342d',
  Swift: '#fa7343',
  Kotlin: '#a97bff',
  PHP: '#4f5d95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
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
    <div className="neo-flat p-8 rounded-[3rem] h-full relative border border-white/[0.01]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-200">Code <span className="italic font-serif font-black text-neo-accent-orange underline decoration-neo-accent-orange/30 underline-offset-8">Atmosphere</span></h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mt-2">Language Distribution</p>
        </div>
      </div>

      <div className="space-y-8">
        {data.map((lang, index) => (
          <div key={lang.name} className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{lang.name}</span>
              <span className="text-[11px] font-black text-slate-300 tracking-tighter">{lang.percentage}%</span>
            </div>
            
            <div className="h-2.5 w-full neo-pressed rounded-full p-[2px] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.percentage}%` }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-full rounded-full relative"
                style={{ backgroundColor: LANGUAGE_COLORS[lang.name] || '#a97bff' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative "Intelligence" Overlay */}
      <div className="mt-10 p-5 neo-pressed rounded-[2rem] border border-white/[0.01] text-[11px] text-slate-500 leading-relaxed font-bold italic tracking-wide">
        "Your stack is heavily leaning towards <span className="text-neo-accent-blue font-black not-italic px-1">Type Safety</span> and <span className="text-neo-accent-orange font-black not-italic px-1">Modular Architecture</span>."
      </div>
    </div>
  );
}

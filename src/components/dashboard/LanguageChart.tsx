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
    <div className="surgical-card p-10 bg-white relative overflow-hidden group">
      <div className="flex justify-between items-center mb-12 border-b-2 border-black pb-6">
        <div>
          <h3 className="text-3xl font-black tracking-tighter text-black uppercase leading-none">Language <br /><span className="text-accent-indigo italic">Distribution</span></h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-black mt-4">Architectural_Composition</p>
        </div>
        <Terminal size={32} strokeWidth={3} className="text-zinc-200 group-hover:text-black transition-colors" />
      </div>

      <div className="space-y-12 relative z-10">
        {data.map((lang, index) => (
          <div key={lang.name} className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs font-black text-black uppercase tracking-widest">{lang.name}</span>
              <span className="text-sm font-black text-zinc-400 tracking-tighter">{lang.percentage}%</span>
            </div>
            
            <div className="h-4 w-full border-2 border-black p-[2px] bg-zinc-50">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.percentage}%` }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: "circOut" }}
                className="h-full relative"
                style={{ backgroundColor: LANGUAGE_COLORS[lang.name] || '#000000' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 border-4 border-black bg-zinc-50 relative overflow-hidden">
        <div className="relative z-10 text-xs text-zinc-500 leading-relaxed font-bold italic tracking-wide">
          "Your stack is balanced with a focus on <span className="text-black font-black not-italic border-b-2 border-black">Modern Standards</span> and <span className="text-black font-black not-italic border-b-2 border-black">System Scalability</span>."
        </div>
        <div className="industrial-grid absolute inset-0 opacity-10" />
      </div>
      
      <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
    </div>
  );
}

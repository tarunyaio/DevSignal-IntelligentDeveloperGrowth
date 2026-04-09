import { motion } from 'framer-motion';

interface LanguageData {
  name: string;
  percentage: number;
  color: string;
}

const LANGUAGES_DEMO: LanguageData[] = [
  { name: 'TypeScript', percentage: 45, color: '#3178c6' },
  { name: 'React', percentage: 25, color: '#61dafb' },
  { name: 'Node.js', percentage: 20, color: '#339933' },
  { name: 'Other', percentage: 10, color: '#a97bff' },
];

// Yeh component languages ka breakdown ek animated bar chart mein dikhayega
export function LanguageChart() {
  return (
    <div className="relative p-6 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl overflow-hidden h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-transparent" />
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight">Code <span className="italic font-serif font-bold text-purple-400">Atmosphere</span></h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Language Distribution</p>
        </div>
      </div>

      <div className="space-y-6">
        {LANGUAGES_DEMO.map((lang, index) => (
          <div key={lang.name} className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-slate-300">{lang.name}</span>
              <span className="text-xs font-mono text-slate-500">{lang.percentage}%</span>
            </div>
            
            {/* Animated Progress Bar - Iska glow aur animation "alive" feel deta hai */}
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.percentage}%` }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-full rounded-full relative"
                style={{ backgroundColor: lang.color }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative "Intelligence" Overlay */}
      <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 leading-relaxed italic">
        "Your stack is heavily leaning towards <span className="text-purple-400 font-bold">Type Safety</span> and <span className="text-blue-400 font-bold">Component Modularization</span>."
      </div>
    </div>
  );
}

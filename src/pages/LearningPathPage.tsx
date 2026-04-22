import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  ExternalLink, 
  Clock, 
  Trophy, 
  Play, 
  Book, 
  Code2, 
  Layout,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEARNING_PATHS } from '../data/learningPaths';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/layout/SEO';

const getIcon = (type: string) => {
  switch (type) {
    case 'video': return <Play size={18} strokeWidth={2.5} />;
    case 'docs': return <Book size={18} strokeWidth={2.5} />;
    case 'course': return <Layout size={18} strokeWidth={2.5} />;
    case 'project': return <Code2 size={18} strokeWidth={2.5} />;
    default: return <ExternalLink size={18} strokeWidth={2.5} />;
  }
};

export function LearningPathPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const path = LEARNING_PATHS.find(p => p.id === courseId);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  useEffect(() => {
    if (path) {
      const saved = localStorage.getItem(`progress_${path.id}`);
      if (saved) {
        try {
          setCompletedLevels(JSON.parse(saved));
        } catch {
          setCompletedLevels([]);
        }
      }
    }
  }, [path]);

  if (!path) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-8 bg-neo-bg">
        <div className="w-20 h-20 neo-icon text-slate-800">
           <Zap size={40} />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-black italic tracking-tighter text-slate-200 uppercase">Archive Not Found</h2>
          <p className="text-slate-500 font-bold text-xs tracking-widest uppercase mt-2">Error 404: Knowledge Sector Missing</p>
        </div>
        <button onClick={() => navigate('/resources')} className="neo-flat px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-neo-accent-blue hover:neo-pressed transition-all">
           Re-initialize Discovery
        </button>
      </div>
    );
  }

  const toggleLevel = (level: number) => {
    const newCompleted = completedLevels.includes(level)
      ? completedLevels.filter(l => l !== level)
      : [...completedLevels, level];
    
    setCompletedLevels(newCompleted);
    localStorage.setItem(`progress_${path.id}`, JSON.stringify(newCompleted));
    window.dispatchEvent(new Event('storage'));
  };

  const progress = (completedLevels.length / path.levels.length) * 100;
  const PathIcon = path.icon;

  return (
    <div className="min-h-screen bg-neo-bg text-slate-200 pb-32">
      <SEO title={`${path.title} Archive`} description={path.tagline} />

      {/* Header Overlay */}
      <div className="relative mb-16 px-4 md:px-0">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="neo-flat p-8 md:p-16 rounded-[3.5rem] md:rounded-[4.5rem] border border-white/[0.01]"
        >
          <button 
            onClick={() => navigate('/resources')}
            className="group mb-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-neo-accent-blue transition-colors"
          >
            <div className="w-10 h-10 neo-icon group-hover:neo-icon-pressed transition-all">
               <ArrowLeft size={16} />
            </div>
            Archive Directory
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center gap-5">
                 <div className="w-16 h-16 neo-icon" style={{ color: path.accentColor }}>
                    <PathIcon size={32} strokeWidth={2.5} />
                 </div>
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">{path.category} // Sector</span>
                    <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-slate-200">{path.title}</h1>
                 </div>
              </div>
              <p className="text-lg md:text-2xl font-medium italic text-slate-500 leading-relaxed opacity-80">
                {path.tagline}
              </p>
            </div>

            <div className="neo-flat p-10 rounded-[2.5rem] min-w-[280px] space-y-6">
               <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Synchronization</span>
                  <span className="text-3xl font-black italic text-slate-200">{Math.round(progress)}%</span>
               </div>
               <div className="h-2 w-full neo-pressed rounded-full overflow-hidden p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: path.accentColor, boxShadow: `0 0 20px ${path.accentColor}40` }}
                  />
               </div>
               <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                     <Clock size={14} className="text-slate-600" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{path.totalHours}H Est.</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Trophy size={14} className="text-slate-600" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{completedLevels.length}/10 Verified</span>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mastery Roadmap */}
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        <div className="space-y-12 relative pt-12">
          {/* Vertical Backbone */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] neo-pressed opacity-20 hidden md:block" />
          
          {path.levels.map((level, index) => {
            const isCompleted = completedLevels.includes(level.level);
            const isNext = completedLevels.length === index;

            return (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8 md:gap-20",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Visual Connector Node */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                   <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-4",
                      isCompleted ? "neo-flat bg-neo-bg border-neo-accent-emerald" : 
                      isNext ? "neo-pressed bg-neo-bg border-neo-accent-blue" : "neo-flat bg-neo-bg border-slate-800"
                    )}
                   >
                      <span className="text-[11px] font-black italic">{level.level}</span>
                   </motion.div>
                </div>

                <div className="w-full md:w-1/2">
                   <div className={cn(
                     "neo-flat p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] border border-white/[0.01] transition-all duration-500 group",
                     isCompleted && "bg-neo-accent-emerald/[0.02]",
                     isNext && "border-neo-accent-blue/20"
                   )}>
                      <div className="flex items-center justify-between mb-8">
                         <div className={cn("w-12 h-12 neo-icon", isCompleted ? "text-neo-accent-emerald" : "text-slate-700")}>
                            {getIcon(level.type)}
                         </div>
                         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 italic">Stage_{level.level.toString().padStart(2, '0')}</span>
                      </div>

                      <div className="space-y-4 mb-10">
                         <h3 className={cn(
                           "text-2xl font-black italic tracking-tighter leading-tight",
                           isCompleted ? "text-slate-400 line-through" : "text-slate-200"
                         )}>
                           {level.title}
                         </h3>
                         <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-loose italic opacity-70">
                           {level.description}
                         </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-6">
                         <a 
                           href={level.url} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="w-full sm:flex-1 py-4 rounded-2xl neo-flat flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hover:neo-pressed transition-all"
                         >
                           Access Module <ExternalLink size={14} />
                         </a>
                         <button 
                           onClick={() => toggleLevel(level.level)}
                           className={cn(
                             "w-full sm:w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500",
                             isCompleted ? "neo-pressed text-neo-accent-emerald" : "neo-flat text-slate-600 hover:text-neo-accent-blue"
                           )}
                         >
                            <CheckCircle size={24} strokeWidth={isCompleted ? 3 : 2} />
                         </button>
                      </div>
                   </div>
                </div>

                {/* Desktop Spacer for alternating layout */}
                <div className="w-1/2 hidden md:block" />
              </motion.div>
            );
          })}
        </div>

        {/* Completion Milestone */}
        <AnimatePresence>
          {completedLevels.length === path.levels.length && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-32 p-8 md:p-24 neo-flat rounded-[3rem] md:rounded-[4rem] text-center space-y-10 border border-neo-accent-emerald/20 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-neo-accent-emerald/5 opacity-50" />
              <div className="w-24 h-24 neo-icon text-neo-accent-emerald mx-auto relative z-10">
                 <Trophy size={48} />
              </div>
              <div className="space-y-4 relative z-10">
                 <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-slate-200 uppercase">Sector Mastered</h2>
                 <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-xs">All intelligence nodes synchronized</p>
              </div>
              <button onClick={() => navigate('/resources')} className="relative z-10 neo-flat px-12 py-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] text-neo-accent-blue hover:neo-pressed transition-all">
                 Initialize Next Sector Discovery
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

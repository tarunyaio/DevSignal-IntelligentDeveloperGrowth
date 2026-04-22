import { useParams, Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowLeft, 
  Activity, ExternalLink, GitCommit,
  GitPullRequest, AlertCircle,
  Users, Code2, Cpu
} from 'lucide-react';
import { useRepo } from '@/hooks/queries';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { ContributorGrid } from '@/components/dashboard/ContributorGrid';
import { LanguageStats } from '@/components/dashboard/LanguageStats';
import { ReadmePreview } from '@/components/dashboard/ReadmePreview';
import { cn } from '@/lib/utils';

function TiltMetric({ label, value, icon: Icon, color }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const colorClass = {
    blue: 'text-neo-accent-blue',
    purple: 'text-purple-400',
    orange: 'text-neo-accent-orange',
  }[color as 'blue' | 'purple' | 'orange'];

  return (
    <motion.div 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-1000"
    >
      <div className="neo-flat p-6 md:p-9 rounded-[2rem] md:rounded-[3rem] border border-white/[0.01] group transition-all" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center justify-between mb-8" style={{ transform: "translateZ(40px)" }}>
          <div className={cn("neo-icon w-14 h-14", colorClass)}>
            <Icon size={24} strokeWidth={2.5} />
          </div>
          <div className="w-12 h-[1px] neo-pressed opacity-40" />
        </div>
        <div className="space-y-2" style={{ transform: "translateZ(50px)" }}>
          <p className="text-2xl md:text-5xl font-black tracking-tighter text-slate-200">{value}</p>
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function RepoDetail() {
  const { id } = useParams();
  const { data: repo, isLoading, error } = useRepo(id || '');

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-10">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 neo-icon text-neo-accent-blue"
        >
          <Cpu size={48} strokeWidth={1} />
        </motion.div>
      </div>
    );
  }

  if (error || !repo) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8 text-slate-400">
        <div className="w-24 h-24 neo-icon text-neo-accent-orange">
          <AlertCircle size={40} />
        </div>
        <p className="font-black uppercase tracking-[0.3em] text-xs">Repository connection lost</p>
        <Link to="/dashboard" className="neo-flat px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-neo-accent-blue">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen space-y-20 pb-40">
      {/* Navigation aur Back Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 md:gap-0">
        <Link 
          to="/dashboard" 
          className="neo-flat px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 md:gap-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400 hover:text-white transition-all hover:neo-pressed border border-white/[0.01]"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <a 
          href={repo.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="neo-flat px-6 py-3 md:px-10 md:py-5 rounded-xl md:rounded-[2.5rem] flex items-center justify-center gap-3 md:gap-5 text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-neo-accent-blue hover:neo-pressed transition-all border border-white/[0.05]"
        >
          View on GitHub <ExternalLink size={18} />
        </a>
      </div>

      {/* Hero Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-end">
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center gap-5">
            <span className="neo-pressed px-5 py-2 rounded-full text-[11px] font-black uppercase text-neo-accent-blue tracking-widest border border-white/[0.01]">
              {repo.language || 'Multi-Stack'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-8xl font-black tracking-tighter text-slate-200 opacity-95 leading-[1.1] max-w-5xl break-words">
            {repo.name.includes('/') ? repo.name.split('/')[1] : repo.name}
          </h1>
          <p className="text-2xl text-slate-500 max-w-3xl font-medium leading-relaxed italic border-l-4 border-neo-accent-blue/20 pl-8">
            {repo.description || 'Comprehensive repository synchronized for architectural analysis and development tracking.'}
          </p>
        </div>

        {/* Stars Score Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-4 neo-flat p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] flex flex-col items-center text-center border border-white/[0.01] relative overflow-hidden group shadow-2xl"
        >
          <div className="relative w-40 h-40 md:w-52 md:h-52 flex items-center justify-center mb-8 md:mb-12">
            <div className="absolute inset-0 neo-pressed rounded-full" />
            <svg className="absolute inset-0 w-full h-full -rotate-90 scale-[1.05]">
              <circle cx="80" cy="80" r="75" fill="none" stroke="rgba(255,255,255,0.01)" strokeWidth="10" className="md:hidden" />
              <circle cx="104" cy="104" r="98" fill="none" stroke="rgba(255,255,255,0.01)" strokeWidth="12" className="hidden md:block" />
              <motion.circle 
                cx="80" cy="80" r="75" fill="none" stroke="currentColor" strokeWidth="10" 
                className="text-neo-accent-blue md:hidden"
                strokeDasharray="471"
                initial={{ strokeDashoffset: 471 }}
                animate={{ strokeDashoffset: 471 - (471 * Math.min(repo.stars, 100)) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              <motion.circle 
                cx="104" cy="104" r="98" fill="none" stroke="currentColor" strokeWidth="12" 
                className="text-neo-accent-blue hidden md:block"
                strokeDasharray="615"
                initial={{ strokeDashoffset: 615 }}
                animate={{ strokeDashoffset: 615 - (615 * Math.min(repo.stars, 100)) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div className="text-center relative z-10">
              <span className="text-5xl md:text-7xl font-black tracking-tighter text-slate-200">{repo.stars}</span>
            </div>
          </div>
          <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-slate-500">Total Stars</h4>
        </motion.div>
      </section>

      {/* Analytics aur Visuals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Activity Graph Section */}
        <div className="lg:col-span-8 space-y-12">
          <div className="neo-flat p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/[0.01]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 mb-8 md:mb-12">
              <h3 className="text-xl md:text-2xl font-black flex items-center gap-4 md:gap-5 text-slate-200 uppercase tracking-tighter italic">
                <div className="neo-icon w-10 h-10 md:w-12 md:h-12 text-neo-accent-blue"><Activity size={18} className="md:size-[22px]" /></div> Recent <span className="text-neo-accent-blue not-italic underline decoration-neo-accent-blue/30 underline-offset-8">Activity</span>
              </h3>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Last 12 Months Sync</span>
            </div>
            <ActivityChart data={repo.activity} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <TiltMetric label="Stars" value={repo.stars} icon={Activity} color="blue" />
            <TiltMetric label="Forks" value={repo.forks} icon={GitPullRequest} color="purple" />
            <TiltMetric label="Issues" value={repo.open_issues} icon={AlertCircle} color="orange" />
          </div>
        </div>

        {/* Sidebar Info Section */}
        <div className="lg:col-span-4 space-y-12">
          {/* Language Breakdown */}
          <div className="neo-flat p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/[0.01]">
            <h3 className="text-xl md:text-2xl font-black mb-8 md:mb-12 flex items-center gap-4 md:gap-5 text-slate-200 uppercase tracking-tighter italic">
              <div className="neo-icon w-10 h-10 md:w-12 md:h-12 text-neo-accent-orange"><Code2 size={18} className="md:size-[22px]" /></div> Languages
            </h3>
            <LanguageStats languages={repo.languages} />
          </div>

          {/* Repo Info */}
          <div className="neo-flat p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/[0.01]">
            <h3 className="text-xl md:text-2xl font-black mb-8 md:mb-12 flex items-center gap-4 md:gap-5 text-slate-200 uppercase tracking-tighter italic">
              <div className="neo-icon w-10 h-10 md:w-12 md:h-12 text-purple-400"><GitCommit size={18} className="md:size-[22px]" /></div> Repo Info
            </h3>
            <div className="space-y-10 text-xs font-black">
              <div className="flex justify-between items-center group">
                <span className="text-slate-600 uppercase tracking-[0.3em]">Default Branch</span>
                <span className="neo-pressed px-5 py-2.5 rounded-xl text-neo-accent-blue font-mono italic border border-white/[0.01]">{repo.default_branch}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 uppercase tracking-[0.3em]">Last Sync</span>
                <span className="text-slate-200 tracking-widest">
                  {repo.last_sync ? new Date(repo.last_sync).toLocaleDateString() : 'NEVER'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 uppercase tracking-[0.3em]">Updated At</span>
                <span className="text-slate-200 tracking-widest">
                  {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : 'UNKNOWN'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-12">
          <div className="neo-flat p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] border border-white/[0.01]">
            <h3 className="text-xl md:text-2xl font-black mb-8 md:mb-12 flex items-center gap-4 md:gap-5 text-slate-200 uppercase tracking-tighter italic">
              <div className="neo-icon w-12 h-12 md:w-14 md:h-14 text-neo-accent-emerald"><Users size={22} className="md:size-[26px]" /></div> Top Contributors
            </h3>
            <ContributorGrid contributors={repo.contributors} />
          </div>
        </div>
      </div>

      {/* Documentation Section */}
      <section>
        <ReadmePreview content={repo.readme} />
      </section>
    </div>
  );
}


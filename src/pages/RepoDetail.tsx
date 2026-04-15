import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ShieldCheck, 
  Activity, ExternalLink, GitCommit,
  GitPullRequest, AlertCircle,
  Users, Code, Cpu
} from 'lucide-react';
import { useRepo } from '@/hooks/queries';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { ContributorGrid } from '@/components/dashboard/ContributorGrid';
import { LanguageStats } from '@/components/dashboard/LanguageStats';
import { ReadmePreview } from '@/components/dashboard/ReadmePreview';
import { cn } from '@/lib/utils';

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
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6 text-slate-400">
        <div className="w-20 h-20 neo-icon text-neo-accent-orange">
          <AlertCircle size={32} />
        </div>
        <p className="font-bold uppercase tracking-widest text-xs">Node not found in local sector</p>
        <Link to="/dashboard" className="neo-flat px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-neo-accent-blue">Back to Terminal</Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen space-y-16 pb-32">
      {/* Navigation aur Back Button */}
      <div className="flex items-center justify-between">
        <Link 
          to="/dashboard" 
          className="neo-flat px-6 py-3 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all hover:neo-pressed"
        >
          <ArrowLeft size={16} />
          Back to Terminal
        </Link>

        <a 
          href={repo.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="neo-flat px-8 py-4 rounded-[2rem] flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-neo-accent-blue hover:neo-pressed transition-all border border-white/[0.01]"
        >
          Access Codebase <ExternalLink size={18} />
        </a>
      </div>

      {/* Hero Header */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-end">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-4">
            <span className="neo-pressed px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-neo-accent-blue tracking-widest border border-white/[0.01]">
              {repo.language || 'Hybrid_Node'}
            </span>
          </div>
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-slate-200">
            {repo.name.includes('/') ? repo.name.split('/')[1] : repo.name}
          </h1>
          <p className="text-2xl text-slate-500 max-w-3xl font-medium leading-[1.6]">
            {repo.description || 'Autonomous node operating within the synchronized developer grid. Analyzing growth vectors and architectural influence.'}
          </p>
        </div>

        {/* Stars Score Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-1 neo-flat p-12 rounded-[4rem] flex flex-col items-center text-center border border-white/[0.01] relative overflow-hidden group"
        >
          <div className="relative w-44 h-44 flex items-center justify-center mb-10">
            <div className="absolute inset-0 neo-pressed rounded-full" />
            <svg className="absolute inset-0 w-full h-full -rotate-90 scale-95">
              <circle cx="88" cy="88" r="82" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="8" />
              <motion.circle 
                cx="88" cy="88" r="82" fill="none" stroke="currentColor" strokeWidth="8" 
                className="text-neo-accent-blue"
                strokeDasharray="515"
                initial={{ strokeDashoffset: 515 }}
                animate={{ strokeDashoffset: 515 - (515 * Math.min(repo.stars, 100)) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div className="text-center">
              <span className="text-6xl font-black tracking-tighter text-slate-200">{repo.stars}</span>
            </div>
          </div>
          <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">Signal_Stars</h4>
        </motion.div>
      </section>

      {/* Analytics aur Visuals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Activity Graph Section */}
        <div className="lg:col-span-8 space-y-12">
          <div className="neo-flat p-10 rounded-[3rem] border border-white/[0.01]">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black flex items-center gap-4 text-slate-200 uppercase tracking-tight">
                <div className="neo-icon w-10 h-10 text-neo-accent-blue"><Activity size={18} /></div> Activity_Pulse
              </h3>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Sync [Last_12_Nodes]</span>
            </div>
            <ActivityChart data={repo.activity} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DetailMetric label="Pulse" value={repo.stars} icon={Activity} color="blue" />
            <DetailMetric label="Logical_Forks" value={repo.forks} icon={GitPullRequest} color="purple" />
            <DetailMetric label="Sector_Issues" value={repo.open_issues} icon={AlertCircle} color="orange" />
          </div>
        </div>

        {/* Sidebar Info Section */}
        <div className="lg:col-span-4 space-y-12">
          {/* Language Breakdown */}
          <div className="neo-flat p-10 rounded-[3rem] border border-white/[0.01]">
            <h3 className="text-xl font-black mb-10 flex items-center gap-4 text-slate-200 uppercase tracking-tight">
              <div className="neo-icon w-10 h-10 text-neo-accent-orange"><Code size={18} /></div> Architecture
            </h3>
            <LanguageStats languages={repo.languages} />
          </div>

          {/* Repo Info */}
          <div className="neo-flat p-10 rounded-[3rem] border border-white/[0.01]">
            <h3 className="text-xl font-black mb-10 flex items-center gap-4 text-slate-200 uppercase tracking-tight">
              <div className="neo-icon w-10 h-10 text-purple-400"><GitCommit size={18} /></div> Node_Log
            </h3>
            <div className="space-y-8 text-xs font-black">
              <div className="flex justify-between items-center group">
                <span className="text-slate-600 uppercase tracking-widest">Master Node</span>
                <span className="neo-pressed px-4 py-2 rounded-lg text-slate-300 font-mono italic">{repo.default_branch}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 uppercase tracking-widest">Last Sync</span>
                <span className="text-slate-200">
                  {repo.last_sync ? new Date(repo.last_sync).toLocaleDateString() : 'NEVER'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 uppercase tracking-widest">Grid Update</span>
                <span className="text-slate-200">
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
          <div className="neo-flat p-12 rounded-[4rem] border border-white/[0.01]">
            <h3 className="text-xl font-black mb-10 flex items-center gap-4 text-slate-200 uppercase tracking-tight">
              <div className="neo-icon w-12 h-12 text-emerald-400"><Users size={22} /></div> Neural_Contributors
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

interface DetailMetricProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: 'blue' | 'purple' | 'orange';
}

function DetailMetric({ label, value, icon: Icon, color }: DetailMetricProps) {
  const colorClass = {
    blue: 'text-neo-accent-blue',
    purple: 'text-purple-400',
    orange: 'text-neo-accent-orange',
  }[color];

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="neo-flat p-8 rounded-[3rem] border border-white/[0.01] group transition-all"
    >
      <div className="flex items-center justify-between mb-6">
        <div className={cn("neo-icon w-12 h-12", colorClass)}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        <div className="w-10 h-[1px] neo-pressed opacity-50" />
      </div>
      <div className="space-y-1">
        <p className="text-4xl font-black tracking-tighter text-slate-200">{value}</p>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{label}</p>
      </div>
    </motion.div>
  );
}


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ShieldCheck, 
  Activity, ExternalLink, GitCommit,
  GitPullRequest, AlertCircle,
  Users, Code
} from 'lucide-react';
import { useRepo } from '@/hooks/queries';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { ContributorGrid } from '@/components/dashboard/ContributorGrid';
import { LanguageStats } from '@/components/dashboard/LanguageStats';
import { ReadmePreview } from '@/components/dashboard/ReadmePreview';

export function RepoDetail() {
  const { id } = useParams();
  const { data: repo, isLoading, error } = useRepo(id || '');

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !repo) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4 text-slate-400">
        <AlertCircle size={48} className="text-red-400" />
        <p>Repository not found.</p>
        <Link to="/dashboard" className="text-purple-400 font-bold underline">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen space-y-12 pb-32">
      {/* Navigation aur Back Button */}
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider">Back to Dashboard</span>
        </Link>

        <a 
          href={repo.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/5 text-white hover:border-white/20 hover:scale-105 transition-all font-bold text-sm shadow-xl shadow-purple-500/5 backdrop-blur-xl"
        >
          View on GitHub <ExternalLink size={16} />
        </a>
      </div>

      {/* Hero Header */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end">
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase text-blue-400 tracking-widest">
              {repo.language || 'Unknown'}
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl font-black tracking-tighter"
          >
            {repo.name.includes('/') ? repo.name.split('/')[1] : repo.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-slate-400 max-w-3xl leading-relaxed"
          >
            {repo.description || 'No description available for this repository.'}
          </motion.p>
        </div>

        {/* Stars Score Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-1 p-10 rounded-[3rem] bg-gradient-to-br from-purple-500/30 to-blue-500/5 border border-white/10 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="80" cy="80" r="76" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/5" />
              <motion.circle 
                cx="80" cy="80" r="76" fill="none" stroke="currentColor" strokeWidth="6" 
                className="text-purple-400"
                strokeDasharray="478"
                initial={{ strokeDashoffset: 478 }}
                animate={{ strokeDashoffset: 478 - (478 * Math.min(repo.stars, 100)) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <span className="text-6xl font-black tracking-tighter">{repo.stars}</span>
          </div>
          <h4 className="text-sm font-black uppercase tracking-[0.3em] text-slate-300">Stars</h4>
        </motion.div>
      </section>

      {/* Analytics aur Visuals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Activity Graph Section (left, full or 2/3) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Activity className="text-purple-400" /> Pulse & Activity
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Last 12 Weeks</span>
            </div>
            <ActivityChart data={repo.activity} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailMetric label="Stars" value={repo.stars} icon={Activity} color="blue" />
            <DetailMetric label="Forks" value={repo.forks} icon={GitPullRequest} color="purple" />
            <DetailMetric label="Issues" value={repo.open_issues} icon={AlertCircle} color="red" />
          </div>
        </div>

        {/* Sidebar Info Section (right) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Language Breakdown */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl hover:border-white/10 transition-all">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <Code className="text-blue-400" /> Technologies
            </h3>
            <LanguageStats languages={repo.languages} />
          </div>

          {/* Repo Info */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <GitCommit className="text-purple-400" /> Source Stats
            </h3>
            <div className="space-y-6 text-sm">
              <div className="flex justify-between items-center group">
                <span className="text-slate-500 group-hover:text-slate-300 transition-colors">Main Branch</span>
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-300 font-mono text-xs">{repo.default_branch}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Last Synced</span>
                <span className="text-slate-300 font-bold">
                  {repo.last_sync ? new Date(repo.last_sync).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Updated GitHub</span>
                <span className="text-slate-300 font-bold">
                  {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <div className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl h-full">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <Users className="text-green-400" /> Community
            </h3>
            <ContributorGrid contributors={repo.contributors} />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-red-500/10 to-transparent border border-white/5 backdrop-blur-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <AlertCircle className="text-red-400" /> Health & Issues
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-slate-500 text-[10px]">Backlog Intensity</span>
                <span className="text-red-400">{repo.open_issues} active issues</span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex border border-white/5 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all duration-1000" 
                  style={{ width: `${Math.min((repo.open_issues / Math.max(repo.open_issues + 10, 1)) * 100, 100)}%` }} 
                />
                <div className="h-full bg-green-500/10 flex-1" />
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase py-2">System Status: {repo.open_issues > 10 ? 'ATTENTION REQUIRED' : 'STABLE'}</p>
            </div>
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
  color: 'blue' | 'purple' | 'green' | 'red';
}

function DetailMetric({ label, value, icon: Icon, color }: DetailMetricProps) {
  const colors = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-blue-500/5',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/5',
    green: 'text-green-400 bg-green-500/10 border-green-500/20 shadow-green-500/5',
    red: 'text-red-400 bg-red-500/10 border-red-500/20 shadow-red-500/5',
  };

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={`p-6 rounded-[2.5rem] border backdrop-blur-xl ${colors[color]} group hover:bg-white/5 transition-all shadow-2xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-xl bg-current/10`}>
          <Icon size={20} />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-30 shadow-[0_0_10px_currentColor]" />
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-black tracking-tighter text-white">{value}</p>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 text-slate-400">{label}</p>
      </div>
    </motion.div>
  );
}


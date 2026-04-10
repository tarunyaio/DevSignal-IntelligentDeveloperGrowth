import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ShieldCheck, 
  Activity, ExternalLink, GitCommit,
  GitPullRequest, AlertCircle
} from 'lucide-react';
import { useRepo } from '@/hooks/queries';

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
    <div className="relative min-h-screen space-y-10 pb-32">
      {/* Navigation aur Back Button */}
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider">Back to Dashboard</span>
        </Link>

        <a 
          href={repo.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all font-bold text-sm"
        >
          View on GitHub <ExternalLink size={16} />
        </a>
      </div>

      {/* Hero Header */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase text-blue-400 tracking-widest">
              {repo.language || 'Unknown'}
            </span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter uppercase">{repo.name}</h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            {repo.description || 'No description available.'}
          </p>
        </div>

        {/* Stats Score */}
        <div className="lg:col-span-1 p-8 rounded-[2.5rem] bg-gradient-to-br from-purple-500/20 to-blue-500/5 border border-purple-500/20 flex flex-col items-center text-center">
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
              <motion.circle 
                cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="8" 
                className="text-purple-500"
                strokeDasharray="377"
                initial={{ strokeDashoffset: 377 }}
                animate={{ strokeDashoffset: 377 - (377 * Math.min(repo.stars, 100)) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <span className="text-4xl font-black tracking-tighter">{repo.stars}</span>
          </div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Stars</h4>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Detailed Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailMetric label="Stars" value={repo.stars} icon={Activity} color="blue" />
            <DetailMetric label="Forks" value={repo.forks} icon={GitPullRequest} color="purple" />
            <DetailMetric label="Open Issues" value={repo.open_issues} icon={ShieldCheck} color="green" />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* Repo Info */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <GitCommit className="text-purple-400" /> Details
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Branch</span>
                <span className="text-slate-300 font-mono">{repo.default_branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Last Synced</span>
                <span className="text-slate-300">{repo.last_sync ? new Date(repo.last_sync).toLocaleDateString() : 'Never'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Updated</span>
                <span className="text-slate-300">{repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : 'Unknown'}</span>
              </div>
            </div>
          </div>

          {/* Issues */}
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-red-500/10 to-transparent border border-white/5 backdrop-blur-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <AlertCircle className="text-red-400" /> Issues
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-slate-500 text-[10px]">Open Issues</span>
                <span className="text-red-400">{repo.open_issues}</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                <div className="h-full bg-red-500" style={{ width: `${Math.min((repo.open_issues / Math.max(repo.open_issues + 10, 1)) * 100, 100)}%` }} />
                <div className="h-full bg-green-500/40 flex-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DetailMetricProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: 'blue' | 'purple' | 'green';
}

function DetailMetric({ label, value, icon: Icon, color }: DetailMetricProps) {
  const colors = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
  };

  return (
    <div className={`p-6 rounded-[2rem] border backdrop-blur-xl ${colors[color]} group hover:bg-white/5 transition-all`}>
      <Icon size={20} className="mb-4" />
      <div className="space-y-1">
        <p className="text-2xl font-black tracking-tighter">{value}</p>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{label}</p>
      </div>
    </div>
  );
}


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Star, GitFork, Clock, ShieldCheck, 
  Code2, Users, Activity, ExternalLink, GitCommit,
  GitPullRequest, AlertCircle, TrendingUp
} from 'lucide-react';
import { MOCK_REPOSITORIES } from '@/lib/mockData';

// Yeh page ek single repository ki "Everything Possible" details dikhayega
export function RepoDetail() {
  const { id } = useParams();
  const repo = MOCK_REPOSITORIES.find(r => r.id === id) || MOCK_REPOSITORIES[0];

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
          href={`https://github.com/${repo.name}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all font-bold text-sm"
        >
          View on GitHub <ExternalLink size={16} />
        </a>
      </div>

      {/* Hero Header - Repo Name aur Overall Health */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase text-blue-400 tracking-widest">
              {repo.language}
            </span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter uppercase">{repo.name}</h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            {repo.description}
          </p>
        </div>

        {/* Health Score Component - Yeh logic PR speed aur issue resolution par depend karti hai */}
        <div className="lg:col-span-1 p-8 rounded-[2.5rem] bg-gradient-to-br from-purple-500/20 to-blue-500/5 border border-purple-500/20 flex flex-col items-center text-center">
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
              <motion.circle 
                cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="8" 
                className="text-purple-500"
                strokeDasharray="377"
                initial={{ strokeDashoffset: 377 }}
                animate={{ strokeDashoffset: 377 - (377 * repo.stats.healthScore) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <span className="text-4xl font-black tracking-tighter">{repo.stats.healthScore}%</span>
          </div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Health Index</h4>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Commit Pulse aur Metrics */}
        <div className="lg:col-span-8 space-y-8">
          {/* Commit Pulse Chart */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <GitCommit className="text-purple-400" /> Commit <span className="italic font-serif">Pulse</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">Last 7 Days</span>
            </div>
            
            <div className="flex items-end justify-between h-48 gap-2">
              {repo.commitData.map((data, i) => (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-3 group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${data.count * 4}px` }}
                    className="w-full bg-gradient-to-t from-purple-600/20 to-purple-400 rounded-t-lg relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailMetric label="Weekly Commits" value={repo.stats.commits} icon={Activity} color="blue" />
            <DetailMetric label="Open PRs" value={repo.stats.prCount} icon={GitPullRequest} color="purple" />
            <DetailMetric label="Merged Today" value={Math.floor(repo.stats.prCount / 4)} icon={ShieldCheck} color="green" />
          </div>
        </div>

        {/* Right Column - Contributors aur Status */}
        <div className="lg:col-span-4 space-y-8">
          {/* Contributors List - Impact factor ke saath */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Users className="text-blue-400" /> Builders
            </h3>
            <div className="space-y-6">
              {repo.contributors.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                      {c.avatar ? <img src={c.avatar} alt={c.name} /> : <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{c.name}</p>
                      <p className="text-[10px] font-black uppercase text-slate-500">{c.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-blue-400">{c.impact}%</span>
                    <div className="w-12 h-1 bg-white/5 rounded-full mt-1">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${c.impact}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Issues Distribution - Professional breakdown */}
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-red-500/10 to-transparent border border-white/5 backdrop-blur-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <AlertCircle className="text-red-400" /> Stability
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-slate-500 text-[10px]">Open Issues</span>
                <span className="text-red-400">{repo.issues.open}</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                <div className="h-full bg-red-500" style={{ width: '15%' }} />
                <div className="h-full bg-green-500/40" style={{ width: '85%' }} />
              </div>
              <p className="text-[10px] text-slate-500 italic mt-2">
                "Technical debt is currently <span className="text-green-400 font-bold">Manageable</span>."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailMetric({ label, value, icon: Icon, color }: any) {
  const colors: any = {
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

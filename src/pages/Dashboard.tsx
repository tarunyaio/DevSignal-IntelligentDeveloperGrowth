import { motion } from 'framer-motion';
import { Layout, Star, GitFork, Zap, RefreshCcw, AlertCircle, Cpu } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RepoCard } from '@/components/dashboard/RepoCard';
import { LanguageChart } from '@/components/dashboard/LanguageChart';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { useRepos, useAnalytics, useSync } from '@/hooks/queries';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const { data: repos, isLoading: reposLoading, error: reposError } = useRepos();
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();
  const syncMutation = useSync();
  const { user } = useAuth();

  const isLoading = reposLoading || analyticsLoading;

  const handleSync = () => {
    const username = user?.user_metadata?.user_name;
    if (username) {
      syncMutation.mutate({ github_username: username });
    }
  };

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
        <div className="text-center space-y-2">
          <p className="text-xl font-black text-slate-200 uppercase tracking-[0.2em]">Synchronizing</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest italic">Neural link established...</p>
        </div>
      </div>
    );
  }

  if (reposError) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6 text-slate-400">
        <div className="w-20 h-20 neo-icon text-neo-accent-orange">
          <AlertCircle size={32} />
        </div>
        <p className="font-bold uppercase tracking-widest text-xs">Failed to load repositories</p>
        <button onClick={handleSync} className="neo-flat px-6 py-2 rounded-xl text-neo-accent-blue font-black text-[10px] uppercase tracking-widest">
          Retry Connection
        </button>
      </div>
    );
  }

  const repoList = repos || [];
  const stats = analytics || { total_repos: 0, total_stars: 0, total_forks: 0, total_issues: 0, languages: [] };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen space-y-12 pb-32"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <h2 className="text-5xl font-black tracking-tighter text-slate-200">Terminal</h2>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em]">
            Status: <span className="text-neo-accent-blue">Active</span> • Analyzing <span className="text-slate-300">{stats.total_repos} dynamic nodes</span>
          </p>
        </div>
        
        <button 
          onClick={handleSync}
          disabled={syncMutation.isPending}
          className="neo-flat flex items-center gap-4 px-8 py-4 rounded-[2rem] hover:neo-pressed transition-all group disabled:opacity-50 border border-white/[0.01]"
        >
          <div className={cn("w-10 h-10 neo-icon", syncMutation.isPending && "neo-icon-pressed")}>
            <RefreshCcw size={18} className={cn("text-neo-accent-blue", syncMutation.isPending ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700')} />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">
            {syncMutation.isPending ? 'Syncing' : 'Sync Neural Feed'}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <StatsCard title="Repositories" value={stats.total_repos} icon={Layout} color="blue" trend={{ value: 8, isPositive: true }} />
        <StatsCard title="Signal Stars" value={stats.total_stars} icon={Star} color="purple" trend={{ value: 12, isPositive: true }} />
        <StatsCard title="Total Forks" value={stats.total_forks} icon={GitFork} color="emerald" />
        <StatsCard title="Open Issues" value={stats.total_issues} icon={Zap} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <LanguageChart languages={analytics?.languages} />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-black tracking-tight text-slate-200 italic">Project <span className="text-neo-accent-blue not-italic underline decoration-neo-accent-blue/30 underline-offset-8">Pulse</span></h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Sync with Localized Signal Nodes</p>
          </div>
          <div className="h-[1px] flex-1 neo-pressed mx-12 hidden md:block" />
        </div>
        
        {repoList.length === 0 ? (
          <div className="py-24 neo-flat rounded-[3rem] flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 neo-icon text-slate-700">
              <RefreshCcw size={32} />
            </div>
            <p className="text-sm font-black text-slate-500 uppercase tracking-widest">No signals detected.</p>
            <button onClick={handleSync} className="text-neo-accent-blue font-black underline underline-offset-8 uppercase text-[10px] tracking-[0.2em]">
              Initialize Neural Sync
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {repoList.map((repo) => (
              <RepoCard 
                key={repo.id} 
                id={repo.id}
                name={repo.name}
                description={repo.description || ''}
                stars={repo.stars}
                forks={repo.forks}
                language={repo.language || 'Unknown'}
                lastUpdated={repo.last_sync ? new Date(repo.last_sync).toLocaleDateString() : 'Never'}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

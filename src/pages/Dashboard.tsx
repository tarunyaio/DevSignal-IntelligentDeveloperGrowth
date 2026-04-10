import { motion } from 'framer-motion';
import { Layout, Star, GitFork, Zap, RefreshCcw, AlertCircle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RepoCard } from '@/components/dashboard/RepoCard';
import { LanguageChart } from '@/components/dashboard/LanguageChart';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { useRepos, useAnalytics, useSync } from '@/hooks/queries';
import { useAuth } from '@/contexts/AuthContext';

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
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full"
        />
        <p className="text-xl font-medium text-slate-400 animate-pulse italic font-serif">
          Synchronizing your <span className="text-white">brain</span> with GitHub...
        </p>
      </div>
    );
  }

  if (reposError) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4 text-slate-400">
        <AlertCircle size={48} className="text-red-400" />
        <p>Failed to load repositories. Please try again.</p>
        <button onClick={handleSync} className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-sm">
          Retry Sync
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
      className="relative min-h-screen space-y-10 pb-32"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-slate-400 font-medium">
            Status: <span className="text-green-400">Connected</span> • Tracking <span className="italic font-serif text-white">{stats.total_repos} active projects</span>
          </p>
        </div>
        
        <button 
          onClick={handleSync}
          disabled={syncMutation.isPending}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all group relative overflow-hidden shadow-xl disabled:opacity-50"
        >
          <RefreshCcw size={18} className={`text-purple-400 ${syncMutation.isPending ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
          <span className="text-sm font-bold uppercase tracking-wider">
            {syncMutation.isPending ? 'Syncing...' : 'Manual Sync'}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Repos" value={stats.total_repos} icon={Layout} color="purple" trend={{ value: 8, isPositive: true }} />
        <StatsCard title="Total Stars" value={stats.total_stars} icon={Star} color="blue" trend={{ value: 12, isPositive: true }} />
        <StatsCard title="Total Forks" value={stats.total_forks} icon={GitFork} color="pink" />
        <StatsCard title="Open Issues" value={stats.total_issues} icon={Zap} color="cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <LanguageChart languages={analytics?.languages} />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">Project <span className="italic font-serif text-purple-400">Pulse</span></h3>
          <div className="h-px flex-1 bg-white/5 mx-8" />
        </div>
        
        {repoList.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
            <p className="text-xl text-slate-500 italic">No repositories synced yet.</p>
            <button onClick={handleSync} className="text-purple-400 font-bold underline underline-offset-8">
              Sync your GitHub repos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

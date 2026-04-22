import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Star, GitFork, Zap, RefreshCcw, AlertCircle, Cpu, ArrowUpRight, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RepoCard } from '@/components/dashboard/RepoCard';
import { LanguageChart } from '@/components/dashboard/LanguageChart';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { useRepos, useAnalytics, useSync } from '@/hooks/queries';
import { useAuth } from '@/contexts/AuthContext';
import { useSearch } from '@/contexts/SearchContext';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/layout/SEO';

export function Dashboard() {
  const { data: repos, isLoading: reposLoading, error: reposError } = useRepos();
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();
  const syncMutation = useSync();
  const { user } = useAuth();
  const [visibleRepos, setVisibleRepos] = useState(6);

  const isLoading = reposLoading || analyticsLoading;

  const handleSync = () => {
    const username = user?.user_metadata?.user_name;
    if (username) {
      syncMutation.mutate({ github_username: username });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-8 industrial-grid">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-8 border-black border-t-transparent flex items-center justify-center"
        >
          <RefreshCcw size={32} strokeWidth={3} />
        </motion.div>
        <div className="text-center space-y-4">
          <p className="text-2xl font-black uppercase tracking-tighter">Initializing Probe...</p>
          <div className="h-2 w-48 bg-zinc-100 border-2 border-black overflow-hidden mx-auto">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="h-full w-1/2 bg-black"
            />
          </div>
        </div>
      </div>
    );
  }

  const { searchQuery } = useSearch();

  const repoList = (repos || []).filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const stats = analytics || { total_repos: 0, total_stars: 0, total_forks: 0, total_issues: 0, languages: [] };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16 pb-32"
    >
      <SEO title="Dashboard" description="Surgical monitoring of repository signals." />
      
      {/* Header & Sync */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b-4 border-black pb-12">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em]">
            Sector: Alpha-1
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            Intelligence <br />
            <span className="text-accent-indigo">Feed.</span>
          </h2>
        </div>
        
        <button 
          onClick={handleSync}
          disabled={syncMutation.isPending}
          className="px-10 py-5 border-4 border-black font-black text-xs uppercase tracking-widest bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center gap-4 group"
        >
          <RefreshCcw size={20} className={cn("transition-transform", syncMutation.isPending && 'animate-spin')} strokeWidth={3} />
          {syncMutation.isPending ? 'Processing...' : 'Rescan Repositories'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatsCard title="Total_Repos" value={stats.total_repos} icon={Layout} color="blue" />
        <StatsCard title="Stars_Mapped" value={stats.total_stars} icon={Star} color="amber" />
        <StatsCard title="Forks_Detected" value={stats.total_forks} icon={GitFork} color="violet" />
        <StatsCard title="Active_Issues" value={stats.total_issues} icon={Zap} color="orange" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div className="flex items-center justify-between border-b-2 border-black pb-4">
            <h3 className="text-2xl font-black uppercase tracking-tighter">Signal Array</h3>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Total: {repoList.length}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {repoList.length > 0 ? (
              repoList.slice(0, visibleRepos).map((repo) => (
                <RepoCard 
                  key={repo.id} 
                  {...repo}
                />
              ))
            ) : (
              <div className="col-span-full py-20 border-4 border-dashed border-black/10 flex flex-col items-center justify-center text-center space-y-6">
                <AlertCircle size={48} className="text-zinc-400" />
                <div className="space-y-2">
                  <p className="text-xl font-black uppercase tracking-tighter text-zinc-600">Zero Results Detected</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Archive query returned null for "{searchQuery}"</p>
                </div>
              </div>
            )}
          </div>
          
          {visibleRepos < repoList.length && (
            <button 
              onClick={() => setVisibleRepos(prev => prev + 6)}
              className="w-full py-8 border-4 border-dashed border-black font-black text-xs uppercase tracking-widest hover:bg-zinc-50 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              Load Remaining Data Blocks
            </button>
          )}
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Metrics</h3>
            </div>
            <LanguageChart languages={analytics?.languages} />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Logs</h3>
            </div>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

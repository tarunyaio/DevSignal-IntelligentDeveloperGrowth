import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Star, GitFork, Zap, RefreshCcw, AlertCircle, Database } from 'lucide-react';
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
  const { data: repos, isLoading: reposLoading } = useRepos();
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();
  const syncMutation = useSync();
  const { user } = useAuth();
  const { searchQuery } = useSearch();
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
        />
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-text">Loading Intelligence Data...</p>
          <p className="text-sm text-text-muted">Syncing with source nodes</p>
        </div>
      </div>
    );
  }

  const repoList = (repos || []).filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const stats = analytics || { total_repos: 0, total_stars: 0, total_forks: 0, total_issues: 0, languages: [] };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-24"
    >
      <SEO title="Dashboard" description="Overview of your repository signals." />
      
      {/* Header & Sync */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-text-muted font-medium">
            <Database size={16} />
            <span>Workspace Overview</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-text">
            Intelligence <span className="text-primary">Feed</span>
          </h2>
        </div>
        
        <button 
          onClick={handleSync}
          disabled={syncMutation.isPending}
          className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium text-sm shadow-sm hover:bg-primary-hover hover:shadow-md transition-all flex items-center gap-2.5 disabled:opacity-50 disabled:pointer-events-none"
        >
          <RefreshCcw size={16} className={cn("transition-transform", syncMutation.isPending && 'animate-spin')} />
          {syncMutation.isPending ? 'Processing...' : 'Sync Repositories'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Repos" value={stats.total_repos} icon={Layout} />
        <StatsCard title="Stars Earned" value={stats.total_stars} icon={Star} />
        <StatsCard title="Forks Generated" value={stats.total_forks} icon={GitFork} />
        <StatsCard title="Active Issues" value={stats.total_issues} icon={Zap} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-lg font-semibold text-text">Repositories</h3>
            <span className="text-xs font-medium text-text-muted bg-surface px-2 py-1 rounded-full border border-border">Total: {repoList.length}</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {repoList.length > 0 ? (
              repoList.slice(0, visibleRepos).map((repo) => (
                <RepoCard 
                  key={repo.id} 
                  {...repo}
                />
              ))
            ) : (
              <div className="col-span-full py-16 bg-surface border border-border border-dashed rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
                <AlertCircle size={32} className="text-text-muted/50" />
                <div className="space-y-1">
                  <p className="text-base font-medium text-text">No repositories found</p>
                  <p className="text-sm text-text-muted">Could not find any matches for "{searchQuery}"</p>
                </div>
              </div>
            )}
          </div>
          
          {visibleRepos < repoList.length && (
            <button 
              onClick={() => setVisibleRepos(prev => prev + 6)}
              className="w-full py-3.5 bg-surface border border-border rounded-xl font-medium text-sm text-text hover:bg-surface-hover hover:text-text transition-colors shadow-sm"
            >
              Load more repositories
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-lg font-semibold text-text">Language Distribution</h3>
            </div>
            <LanguageChart languages={analytics?.languages} />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-lg font-semibold text-text">Recent Activity</h3>
            </div>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

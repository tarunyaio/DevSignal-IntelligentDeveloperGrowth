import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout, Star, GitFork, Zap, RefreshCcw } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RepoCard } from '@/components/dashboard/RepoCard';
import { LanguageChart } from '@/components/dashboard/LanguageChart';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { MOCK_REPOSITORIES, GLOBAL_STATS } from '@/lib/mockData';

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  // Yeh useEffect backend connectivity simulate karne ke liye hai
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen space-y-10 pb-32"
    >
      {/* Header Section - Dashboard ka Title aur Sync status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-slate-400 font-medium">
            Status: <span className="text-green-400">Connected</span> • Tracking <span className="italic font-serif text-white">{GLOBAL_STATS.totalRepos} active projects</span>
          </p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all group relative overflow-hidden shadow-xl">
          <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-700 text-purple-400" />
          <span className="text-sm font-bold uppercase tracking-wider">Manual Sync</span>
        </button>
      </div>

      {/* Stats Cards Row - Yeh numbers ab mockData se aa rahe hain */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Repos" value={GLOBAL_STATS.totalRepos} icon={Layout} color="purple" trend={{ value: 8, isPositive: true }} />
        <StatsCard title="Total Stars" value={GLOBAL_STATS.totalStars} icon={Star} color="blue" trend={{ value: 12, isPositive: true }} />
        <StatsCard title="Total Forks" value={GLOBAL_STATS.totalForks} icon={GitFork} color="pink" />
        <StatsCard title="Intelligence Score" value={GLOBAL_STATS.productivity} suffix="%" icon={Zap} color="cyan" trend={{ value: 15, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <LanguageChart />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>

      {/* Repository Explorer Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">Project <span className="italic font-serif text-purple-400">Pulse</span></h3>
          <div className="h-px flex-1 bg-white/5 mx-8" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_REPOSITORIES.map((repo) => (
            <RepoCard 
              key={repo.id} 
              id={repo.id}
              name={repo.name}
              description={repo.description}
              stars={repo.stats.stars}
              forks={repo.stats.forks}
              language={repo.language}
              lastUpdated={repo.stats.lastUpdated}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

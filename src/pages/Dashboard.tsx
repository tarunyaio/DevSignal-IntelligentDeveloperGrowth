import { motion } from 'framer-motion';
import { RefreshCcw, Layout, Star, GitFork, ArrowUpRight, Activity, Zap } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="relative min-h-[calc(100vh-160px)] space-y-8 pb-20">
      {/* Background Aura Blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none z-0"
      />

      <div className="relative z-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-slate-400 font-medium">
              Welcome back. Here's what's happening in your <span className="italic font-serif text-white">repositories</span>.
            </p>
          </div>
          
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group overflow-hidden relative">
            <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-sm font-semibold">Sync Data</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Repos', value: '12', icon: Layout, color: 'text-purple-400' },
            { label: 'Total Stars', value: '428', icon: Star, color: 'text-yellow-400' },
            { label: 'Total Forks', value: '86', icon: GitFork, color: 'text-blue-400' },
            { label: 'Productivity', value: '+12%', icon: Zap, color: 'text-green-400' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start justify-between relative z-10">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                </div>
                <div className={`p-2.5 rounded-2xl bg-slate-900/50 border border-white/5 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.4 }}
             className="lg:col-span-2 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 h-[400px] flex flex-col items-center justify-center text-center space-y-4 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 rounded-3xl bg-purple-500/10 flex items-center justify-center mb-2 animate-pulse">
              <Activity className="text-purple-400" size={32} />
            </div>
            <h3 className="text-xl font-bold">Activity Analytics</h3>
            <p className="text-slate-400 max-w-sm">
              We're currently <span className="italic font-serif text-white">analyzing</span> your recent commits and PRs. Full insights will appear here shortly.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 h-[400px] flex flex-col items-center justify-center text-center space-y-4 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-2 animate-pulse">
              <Star className="text-blue-400" size={32} />
            </div>
            <h3 className="text-xl font-bold">Recommended Resources</h3>
            <p className="text-slate-400 max-w-xs">
              Personalized learning paths based on your <span className="italic font-serif text-white">growth</span> signals.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

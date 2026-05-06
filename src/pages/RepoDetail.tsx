import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Activity, ExternalLink,
  GitPullRequest, AlertCircle,
  Users, Code2, Terminal, Star, BarChart3
} from 'lucide-react';
import { useRepo } from '@/hooks/queries';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/layout/SEO';
import { ContributorGrid } from '@/components/dashboard/ContributorGrid';
import { LanguageStats } from '@/components/dashboard/LanguageStats';

const COLOR_MAP: Record<string, string> = {
  blue: 'text-blue-500 bg-blue-500/10',
  amber: 'text-amber-500 bg-amber-500/10',
  violet: 'text-violet-500 bg-violet-500/10',
  orange: 'text-orange-500 bg-orange-500/10',
  rose: 'text-rose-500 bg-rose-500/10',
  emerald: 'text-emerald-500 bg-emerald-500/10',
  indigo: 'text-indigo-500 bg-indigo-500/10',
  purple: 'text-purple-500 bg-purple-500/10'
};

function IndustrialMetric({ label, value, icon: Icon, color }: { label: string, value: string | number, icon: React.ElementType, color: string }) {
  const iconStyle = color && COLOR_MAP[color] ? COLOR_MAP[color] : 'text-text bg-surface-hover';
  return (
    <div className="glass-panel p-6 flex flex-col justify-between h-full group hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
          iconStyle
        )}>
          <Icon size={18} strokeWidth={2} />
        </div>
        <div className="w-10 h-1 rounded-full bg-surface-hover" />
      </div>
      <div className="mt-5 space-y-1">
        <p className="text-3xl md:text-4xl font-semibold tracking-tight text-text leading-none">{value}</p>
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">{label}</p>
      </div>
    </div>
  );
}

export function RepoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: repo, isLoading, error } = useRepo(id || '');

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
        />
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-text">Parsing Repository Structure...</p>
          <p className="text-sm text-text-muted">Fetching intelligence data</p>
        </div>
      </div>
    );
  }

  if (error || !repo) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 text-text">
        <div className="w-20 h-20 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
          <AlertCircle size={40} strokeWidth={2} />
        </div>
        <div className="text-center space-y-2">
          <p className="font-semibold text-lg">Connection Terminated</p>
          <p className="text-text-muted text-sm">Error Code: RECON_LOST</p>
        </div>
        <Link to="/dashboard" className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition-all mt-4">
          Reboot Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen space-y-8 pb-32">
      <SEO title={`${repo.name} | Repository Intelligence`} description={repo.description || undefined} />
      
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="relative z-10 space-y-8">
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center group-hover:bg-surface-hover transition-all">
               <ArrowLeft size={16} />
            </div>
            Return to Array
          </button>

          <a 
            href={repo.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-surface border border-border text-text text-sm font-medium hover:bg-surface-hover transition-all flex items-center gap-2 shadow-sm"
          >
            View on GitHub <ExternalLink size={16} />
          </a>
        </div>

        {/* Hero Header */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 glass-panel p-8 md:p-10 rounded-3xl flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider self-start">
              <Terminal size={14} />
              STACK: {repo.language || 'MULTI_ARRAY'}
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-text leading-tight break-words">
              {repo.name.includes('/') ? repo.name.split('/')[1] : repo.name}
            </h1>
            <p className="text-base font-medium text-text-muted leading-relaxed max-w-3xl">
              {repo.description || 'Systemized repository synchronized for deep architectural analysis and contribution tracking.'}
            </p>
          </div>

          {/* Global Impact Card */}
          <div className="lg:col-span-4 glass-panel p-8 rounded-3xl flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-4 w-full">
               <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <Star size={28} strokeWidth={2} className="fill-amber-500/20" />
               </div>
               <div className="space-y-1">
                  <h4 className="text-4xl md:text-5xl font-semibold tracking-tight text-text">{repo.stars.toLocaleString()}</h4>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Global Star Array</p>
               </div>
               <div className="w-full h-2 bg-surface-hover rounded-full overflow-hidden mt-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((repo.stars / 100) * 100, 100)}%` }}
                    className="h-full bg-amber-500 rounded-full"
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
               </div>
            </div>
          </div>
        </section>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Activity Graph */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-panel p-6 md:p-8 rounded-3xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 border-b border-border pb-4">
                <h3 className="text-lg font-semibold flex items-center gap-3 text-text">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Activity size={18} />
                  </div> 
                  Signal Pulse
                </h3>
                <span className="text-xs font-medium uppercase tracking-wider text-text-muted bg-surface px-3 py-1 rounded-full border border-border">12 Month Logs</span>
              </div>
              <div className="relative z-10 min-h-[300px]">
                <ActivityChart data={repo.activity} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <IndustrialMetric label="STARS" value={repo.stars} icon={Star} color="amber" />
              <IndustrialMetric label="FORKS" value={repo.forks} icon={GitPullRequest} color="purple" />
              <IndustrialMetric label="ISSUES" value={repo.open_issues} icon={AlertCircle} color="rose" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Languages */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl">
              <h3 className="text-lg font-semibold mb-6 border-b border-border pb-4 flex items-center gap-3 text-text">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Code2 size={18} />
                </div> 
                Stack Density
              </h3>
              <LanguageStats languages={repo.languages} />
            </div>

            {/* Metadata */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[40px] rounded-full pointer-events-none" />
              <h3 className="text-lg font-semibold mb-6 border-b border-border pb-4 flex items-center gap-3 text-text">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500">
                  <BarChart3 size={18} />
                </div> 
                Metadata
              </h3>
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center p-3 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors">
                  <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Branch</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-hover font-mono text-xs font-semibold text-text">
                    {repo.default_branch}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors">
                  <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Synced</span>
                  <span className="text-sm font-semibold text-text">
                    {repo.last_sync ? new Date(repo.last_sync).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors">
                  <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Updated</span>
                  <span className="text-sm font-semibold text-text">
                    {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contributors */}
        <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
          <h3 className="text-lg font-semibold mb-8 border-b border-border pb-4 flex items-center gap-3 text-text relative z-10">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Users size={18} />
            </div> 
            Top Contributors
          </h3>
          <div className="relative z-10">
            <ContributorGrid contributors={repo.contributors} />
          </div>
        </div>
      </div>
    </div>
  );
}

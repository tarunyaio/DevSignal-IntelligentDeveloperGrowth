import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitMerge, AlertCircle, Terminal } from 'lucide-react';
import { useActivity } from '@/hooks/queries';
import { cn } from '@/lib/utils';

const iconMap: Record<string, { Icon: React.ElementType; color: string }> = {
  commit: { Icon: GitCommit, color: 'text-indigo-500 bg-indigo-500/10' },
  pr: { Icon: GitPullRequest, color: 'text-purple-500 bg-purple-500/10' },
  merge: { Icon: GitMerge, color: 'text-emerald-500 bg-emerald-500/10' },
  issue: { Icon: AlertCircle, color: 'text-orange-500 bg-orange-500/10' },
  other: { Icon: Terminal, color: 'text-zinc-500 bg-zinc-500/10' },
};

export function ActivityFeed() {
  const { data: activities, isLoading } = useActivity();

  return (
    <div className="glass-panel p-6 relative overflow-hidden group">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text leading-none">Recent Activity</h3>
        </div>
        <span className="px-2.5 py-1 rounded-full border border-border bg-surface text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Live
        </span>
      </div>

      <div className="relative space-y-6 before:absolute before:inset-0 before:left-[19px] before:w-px before:bg-border">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="relative pl-12 animate-pulse">
               <div className="absolute left-0 w-10 h-10 rounded-full border border-border bg-surface" />
               <div className="space-y-2 mt-1">
                 <div className="h-2 w-20 bg-surface-hover rounded" />
                 <div className="h-3 w-full bg-surface-hover rounded" />
                 <div className="h-2 w-3/4 bg-surface-hover rounded" />
               </div>
            </div>
          ))
        ) : activities && activities.length > 0 ? (
          activities.slice(0, 5).map((item, index) => {
            const config = iconMap[item.type] || iconMap.other;
            const { Icon, color } = config;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative pl-12 group/item"
              >
                {/* Timeline Indicator */}
                <div className={cn("absolute left-0 w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 z-10 bg-surface", color)}>
                  <Icon size={16} strokeWidth={2} />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap text-xs font-medium text-text-muted">
                    <span className="text-text-muted">
                      {item.time}
                    </span>
                    <span className="text-text bg-surface-hover px-2 py-0.5 rounded-full truncate max-w-[160px]">
                      {item.repo}
                    </span>
                    <span className="capitalize">
                      {item.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-text group-hover/item:text-primary transition-colors leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="py-12 text-center relative z-10 bg-surface/50 backdrop-blur-sm rounded-xl">
            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mx-auto mb-4 bg-surface text-text-muted">
              <Terminal size={20} />
            </div>
            <p className="text-sm font-medium text-text-muted">
              No recent activity detected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

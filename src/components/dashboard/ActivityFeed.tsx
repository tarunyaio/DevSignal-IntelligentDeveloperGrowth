import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitMerge, AlertCircle, Terminal } from 'lucide-react';
import { useActivity } from '@/hooks/queries';
import { cn } from '@/lib/utils';

const iconMap = {
  commit: { Icon: GitCommit, color: 'text-neo-accent-blue', bg: 'neo-icon' },
  pr: { Icon: GitPullRequest, color: 'text-purple-400', bg: 'neo-icon' },
  merge: { Icon: GitMerge, color: 'text-neo-accent-emerald', bg: 'neo-icon' },
  issue: { Icon: AlertCircle, color: 'text-neo-accent-orange', bg: 'neo-icon' },
  other: { Icon: Terminal, color: 'text-slate-400', bg: 'neo-icon' },
};

export function ActivityFeed() {
  const { data: activities, isLoading } = useActivity();

  return (
    <div className="neo-flat p-10 rounded-[3rem] h-full min-h-[480px] relative border border-white/[0.01]">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h3 className="text-2xl font-black tracking-tighter text-slate-200 uppercase">Recent <span className="italic font-serif text-neo-accent-blue underline decoration-neo-accent-blue/30 underline-offset-8">Activity</span></h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] font-black mt-3">Verified Project Telemetry</p>
        </div>
      </div>

      <div className="relative space-y-12 before:absolute before:inset-0 before:left-[17px] before:w-[2px] before:bg-gradient-to-b before:from-neo-accent-blue/40 before:via-white/5 before:to-transparent">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="relative pl-14 animate-pulse">
               <div className="absolute left-0 w-9 h-9 neo-icon bg-white/5 opacity-50" />
               <div className="space-y-4 mt-1">
                 <div className="h-2 w-20 bg-white/5 rounded-full" />
                 <div className="h-4 w-full bg-white/10 rounded-full" />
               </div>
            </div>
          ))
        ) : activities && activities.length > 0 ? (
          activities.map((item, index) => {
            const config = iconMap[item.type] || iconMap.other;
            const { Icon, color, bg } = config;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-14 group"
              >
                {/* Timeline Indicator */}
                <div className={cn("absolute left-0 w-9 h-9 transition-transform duration-300 group-hover:scale-110 z-10 border border-white/[0.01]", bg)}>
                  <Icon size={16} className={color} strokeWidth={2.5} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="neo-pressed px-2.5 py-1 rounded-md text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      {item.time}
                    </span>
                    <span className="neo-pressed px-2.5 py-1 rounded-md text-[9px] font-black text-neo-accent-blue uppercase tracking-widest border border-white/[0.01]">
                      {item.repo}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-200 group-hover:text-neo-accent-blue transition-colors leading-tight tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-400 font-medium italic opacity-70 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="py-24 text-center">
            <div className="w-20 h-20 neo-icon mx-auto mb-6 opacity-20">
              <Terminal size={36} />
            </div>
            <p className="text-xs font-black text-slate-600 uppercase tracking-[0.3em] leading-loose">
              No recent activity detected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

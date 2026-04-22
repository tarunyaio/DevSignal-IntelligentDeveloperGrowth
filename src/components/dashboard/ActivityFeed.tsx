import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitMerge, AlertCircle, Terminal } from 'lucide-react';
import { useActivity } from '@/hooks/queries';
import { cn } from '@/lib/utils';

const iconMap: Record<string, any> = {
  commit: { Icon: GitCommit, color: 'text-accent-indigo' },
  pr: { Icon: GitPullRequest, color: 'text-purple-500' },
  merge: { Icon: GitMerge, color: 'text-green-500' },
  issue: { Icon: AlertCircle, color: 'text-orange-500' },
  other: { Icon: Terminal, color: 'text-zinc-400' },
};

export function ActivityFeed() {
  const { data: activities, isLoading } = useActivity();

  return (
    <div className="surgical-card p-10 bg-white h-full min-h-[480px] relative overflow-hidden group">
      <div className="flex justify-between items-center mb-12 border-b-2 border-black pb-6">
        <div>
          <h3 className="text-3xl font-black tracking-tighter text-black uppercase leading-none">Recent <br /><span className="text-accent-indigo italic">Activity</span></h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-black mt-4">Verified_Telemetry_Pulse</p>
        </div>
      </div>

      <div className="relative space-y-12 before:absolute before:inset-0 before:left-[21px] before:w-[2px] before:bg-black/10">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="relative pl-16 animate-pulse">
               <div className="absolute left-0 w-12 h-12 border-2 border-black/5 bg-zinc-50" />
               <div className="space-y-4 mt-1">
                 <div className="h-2 w-20 bg-black/5" />
                 <div className="h-4 w-full bg-black/5" />
               </div>
            </div>
          ))
        ) : activities && activities.length > 0 ? (
          activities.map((item, index) => {
            const config = iconMap[item.type] || iconMap.other;
            const { Icon, color } = config;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-16 group/item"
              >
                {/* Timeline Indicator */}
                <div className="absolute left-0 w-12 h-12 border-2 border-black bg-white flex items-center justify-center transition-all duration-300 group-hover/item:bg-black group-hover/item:text-white z-10">
                  <Icon size={20} className={cn("transition-colors", color)} strokeWidth={3} />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 border border-black/10 bg-zinc-50 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                      {item.time}
                    </span>
                    <span className="px-3 py-1 border border-black/10 bg-zinc-50 text-[9px] font-black text-black uppercase tracking-widest truncate max-w-[150px]">
                      {item.repo}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-black group-hover/item:text-accent-indigo transition-colors leading-none tracking-tight uppercase">
                    {item.title}
                  </h4>
                  <p className="text-sm text-zinc-400 font-bold italic leading-relaxed border-l-4 border-black/5 pl-4">
                    "{item.description}"
                  </p>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="py-24 text-center">
            <div className="w-20 h-20 border-4 border-dashed border-black/20 flex items-center justify-center mx-auto mb-8">
              <Terminal size={36} className="text-black/10" />
            </div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] leading-loose">
              LOGS_NULL: No recent pulse detected.
            </p>
          </div>
        )}
      </div>
      <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
    </div>
  );
}

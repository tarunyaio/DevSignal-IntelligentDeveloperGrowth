import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitMerge, AlertCircle } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'commit' | 'pr' | 'merge' | 'issue';
  title: string;
  repo: string;
  time: string;
  description: string;
}

const DEMO_ACTIVITY: ActivityItem[] = [
  { id: '1', type: 'commit', title: 'feat: add global aura background', repo: 'DevSignal', time: '2h ago', description: 'Implemented framer-motion based background blobs.' },
  { id: '2', type: 'pr', title: 'chore: update license logic', repo: 'DevSignal', time: '5h ago', description: 'Switched to DevSignal Shared Source License.' },
  { id: '3', type: 'merge', title: 'merge: main into feature/analytics', repo: 'RepoPulse', time: 'Yesterday', description: 'Synchronized latest changes for analytics module.' },
  { id: '4', type: 'issue', title: 'bug: editor scroll issue on mobile', repo: 'DevSignal', time: 'Yesterday', description: 'Fixed z-index conflict with floating nav.' },
];

const iconMap = {
  commit: { Icon: GitCommit, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  pr: { Icon: GitPullRequest, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  merge: { Icon: GitMerge, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  issue: { Icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
};

// Yeh Feed component user ki latest activities ko ek vertical timeline mein dikhayega
export function ActivityFeed() {
  return (
    <div className="relative p-6 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl overflow-hidden h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold tracking-tight">Recent <span className="italic font-serif font-bold text-blue-400">Signals</span></h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Live Activity Stream</p>
        </div>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:left-[19px] before:w-[1px] before:bg-gradient-to-b before:from-purple-500/50 before:via-blue-500/50 before:to-transparent">
        {DEMO_ACTIVITY.map((item, index) => {
          const { Icon, color, bg } = iconMap[item.type];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-12 group"
            >
              {/* Timeline Indicator */}
              <div className={`absolute left-0 p-2 rounded-xl scale-90 group-hover:scale-100 transition-transform ${bg} border z-10`}>
                <Icon size={16} className={color} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500">{item.time}</span>
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-tighter bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                    {item.repo}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-1 italic">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

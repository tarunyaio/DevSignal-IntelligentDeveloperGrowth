import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Brain, Shield, Rocket, BarChart2 } from 'lucide-react';
import { useAnalytics } from '@/hooks/queries';
import { SEO } from '@/components/layout/SEO';
import { cn } from '@/lib/utils';

// Memoize random data outside the component
const HEATMAP_DATA = Array.from({ length: 168 }).map(() => ({
  opacity: Math.random() * 0.8 + 0.1,
  level: Math.floor(Math.random() * 10)
}));

export function Analytics() {
  const { data: analytics } = useAnalytics();
  const languages = analytics?.languages || [];

  return (
    <div className="relative min-h-screen space-y-16 pb-40 px-6 md:px-0">
      <SEO title="Signal Mapping" description="Global mapping of technical evolution and performance arrays." />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b-4 border-black pb-12">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em]">
            Module: Analytics_Beta
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            Technical <br />
            <span className="text-accent-indigo">Evolution.</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 border-4 border-black flex items-center justify-center bg-zinc-50">
            <BarChart2 size={32} strokeWidth={3} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 max-w-[200px] leading-relaxed">
            Real-time parsing of global activity blocks and contribution velocity patterns.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Skill Architecture */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 surgical-card p-10 bg-white relative overflow-hidden group"
        >
          <div className="absolute -top-12 -right-12 opacity-5 text-black">
            <Brain size={240} strokeWidth={4} />
          </div>
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-12 border-b-4 border-black pb-6 italic">
            Skill_Array
          </h3>
          <div className="space-y-10 relative z-10">
            {(languages.length > 0 ? languages : [
              { name: 'Frontend', percentage: 80 },
              { name: 'Backend', percentage: 65 },
              { name: 'Security', percentage: 57 },
              { name: 'DevOps', percentage: 73 },
              { name: 'AI/ML', percentage: 50 },
            ]).map((skill, index) => (
              <div key={skill.name} className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                  <span>{skill.name}</span>
                  <span className="text-black bg-yellow-400 px-2 border border-black">{skill.percentage}%</span>
                </div>
                <div className="h-5 bg-zinc-50 border-2 border-black p-[3px] overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "circOut" }}
                    className="h-full bg-black"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
        </motion.div>

        {/* Contribution Heatmap */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 surgical-card p-10 bg-white relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 border-b-4 border-black pb-10">
            <h3 className="text-3xl font-black uppercase tracking-tighter italic">Deep_Work_Heatmap</h3>
            <div className="flex items-center gap-4 px-6 py-3 border-4 border-black bg-zinc-50">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Scale:</span>
              <div className="flex gap-2">
                {[0.1, 0.4, 0.7, 1].map(op => (
                  <div key={op} className="w-4 h-4 border-2 border-black bg-black" style={{ opacity: String(op) }} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-12 sm:grid-cols-[repeat(24,minmax(0,1fr))] gap-2 relative z-10">
            {HEATMAP_DATA.map((data, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: data.opacity }}
                transition={{ delay: i * 0.001 }}
                className="aspect-square border-2 border-black/5 bg-black hover:bg-accent-indigo hover:opacity-100 transition-all cursor-crosshair hover:scale-125 hover:z-20"
                title={`Level: ${data.level}`}
              />
            ))}
          </div>
          <div className="mt-12 p-8 border-4 border-black bg-zinc-50 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 italic text-center relative z-10">
            "System pulse: Optimized for high-velocity contribution arrays."
          </div>
          <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
        </motion.div>
      </div>

      {/* Performance Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <MetricBox title="Total_Repos" value={String(analytics?.total_repos ?? 0)} suffix="SYNCED" icon={TrendingUp} color="indigo" />
        <MetricBox title="Stars_Earned" value={String(analytics?.total_stars ?? 0)} suffix="VERIFIED" icon={Shield} color="black" />
        <MetricBox title="Active_Issues" value={String(analytics?.total_issues ?? 0)} suffix="PENDING" icon={Rocket} color="indigo" />
      </div>
    </div>
  );
}

interface MetricBoxProps {
  title: string;
  value: string;
  suffix: string;
  icon: React.ElementType;
  color: 'indigo' | 'black';
}

function MetricBox({ title, value, suffix, icon: Icon, color }: MetricBoxProps) {
  return (
    <div className={cn(
      "surgical-card p-12 flex flex-col items-center text-center space-y-8 group transition-all",
      color === 'indigo' ? 'hover:bg-zinc-50' : 'hover:bg-zinc-100'
    )}>
      <div className="w-20 h-20 border-4 border-black flex items-center justify-center bg-white group-hover:bg-black group-hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-[3px] group-hover:translate-y-[3px]">
        <Icon size={40} strokeWidth={3} />
      </div>
      <div className="space-y-6">
        <h4 className="text-8xl font-black tracking-tighter leading-none">{value}</h4>
        <div className="space-y-2">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-black border-y-2 border-black py-3">{title}</p>
          <p className="text-[10px] font-bold text-zinc-500 mt-6 italic tracking-[0.3em] uppercase">{suffix}_STATUS</p>
        </div>
      </div>
    </div>
  );
}

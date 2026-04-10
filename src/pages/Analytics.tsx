import { motion } from 'framer-motion';
import { TrendingUp, Brain, Shield, Rocket } from 'lucide-react';
import { useAnalytics } from '@/hooks/queries';

// Memoize random data outside the component
const HEATMAP_DATA = Array.from({ length: 168 }).map(() => ({
  opacity: Math.random() * 0.8 + 0.1,
  level: Math.floor(Math.random() * 10)
}));

export function Analytics() {
  const { data: analytics } = useAnalytics();
  const languages = analytics?.languages || [];

  return (
    <div className="relative min-h-screen space-y-12 pb-32">
      <header className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight">Intelligence <span className="italic font-serif text-purple-400">Hub</span></h2>
        <p className="text-slate-400 font-medium">Global mapping of your technical evolution and performance.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Skill Radar - Custom CSS and SVG breakdown */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Brain size={120} />
          </div>
          <h3 className="text-xl font-bold mb-6">Skill <span className="text-blue-400">Architecture</span></h3>
          <div className="space-y-6">
            {(languages.length > 0 ? languages : [
              { name: 'Frontend', percentage: 80 },
              { name: 'Backend', percentage: 65 },
              { name: 'Security', percentage: 57 },
              { name: 'DevOps', percentage: 73 },
              { name: 'AI/ML', percentage: 50 },
            ]).map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span>{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contribution Heatmap Mockup - "Alive" grid design */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold italic font-serif">Deep Work <span className="text-purple-400">Heatmap</span></h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Less</span>
              {[0.1, 0.3, 0.6, 0.9].map(op => (
                <div key={op} className="w-3 h-3 rounded-sm bg-purple-500" style={{ opacity: op }} />
              ))}
              <span>More</span>
            </div>
          </div>
          
          <div className="grid grid-cols-24 gap-1.5">
            {/* Yeh loop ek vibrant heatmap grid create karta hai */}
            {HEATMAP_DATA.map((data, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.002 }}
                className="aspect-square rounded-[3px] bg-purple-500/40 hover:bg-purple-400 transition-colors cursor-help"
                style={{ opacity: data.opacity }}
                title={`Activity level: ${data.level} commits`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricBox title="Total Repos" value={String(analytics?.total_repos ?? 0)} suffix="synced" icon={TrendingUp} color="blue" />
        <MetricBox title="Total Stars" value={String(analytics?.total_stars ?? 0)} suffix="earned" icon={Shield} color="green" />
        <MetricBox title="Open Issues" value={String(analytics?.total_issues ?? 0)} suffix="active" icon={Rocket} color="purple" />
      </div>
    </div>
  );
}

interface MetricBoxProps {
  title: string;
  value: string;
  suffix: string;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'purple';
}

function MetricBox({ title, value, suffix, icon: Icon, color }: MetricBoxProps) {
  const colorMap = {
    blue: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
    green: 'text-green-400 border-green-500/20 bg-green-500/5',
    purple: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
  };

  return (
    <div className={`p-8 rounded-[2rem] border backdrop-blur-xl flex flex-col items-center text-center space-y-4 ${colorMap[color]}`}>
      <Icon size={32} strokeWidth={1.5} />
      <div>
        <h4 className="text-3xl font-bold tracking-tighter">{value}</h4>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">{title}</p>
        <p className="text-[10px] text-slate-600 mt-2 italic">{suffix}</p>
      </div>
    </div>
  );
}


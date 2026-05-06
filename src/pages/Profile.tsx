import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  ShieldCheck, 
  Clock, 
  Star, 
  GitFork, 
  Share2,
  ExternalLink,
  User,
  Terminal,
  Activity,
  LogOut
} from 'lucide-react';
import { SEO } from '@/components/layout/SEO';

interface ProfileData {
  stats: {
    totalStars: number;
    totalForks: number;
    totalProjects: number;
    languages: Record<string, number>;
  };
  persona: {
    title: string;
    level: number;
  };
  rhythm: {
    type: string;
    description: string;
  };
}

export function Profile() {
  const { user, logout } = useAuth();
  const [data, setData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/profile/summary`, {
          headers: { 'Authorization': `Bearer ${session.access_token}` }
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
        />
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-text">Loading Identity Profile...</p>
          <p className="text-sm text-text-muted">Fetching verified blocks</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen space-y-8 pb-32">
      <SEO title="User Profile" description="Verified technical identity and contribution metrics." />
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-text-muted font-medium">
            <User size={16} />
            <span>Identity Archive</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-text">
            User <span className="text-primary">Profile</span>
          </h2>
        </div>
        
        <button 
          onClick={logout}
          className="px-5 py-2.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl font-medium text-sm hover:bg-rose-500 hover:text-white transition-all flex items-center gap-2 shadow-sm"
        >
          <LogOut size={16} />
          Terminate Session
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="glass-panel p-8 md:p-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 md:gap-14">
          {/* Avatar Section */}
          <div className="relative shrink-0">
             <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl p-2 bg-surface shadow-xl shadow-black/5 group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <img 
                    src={user?.user_metadata.avatar_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 border border-border rounded-2xl pointer-events-none" />
                </div>
             </div>
             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-surface backdrop-blur-md text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold border border-border shadow-md flex items-center gap-2">
                <ShieldCheck size={14} />
                ID VERIFIED
             </div>
          </div>

          {/* Identity Details */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <p className="text-primary font-medium text-xs tracking-widest uppercase">Auth Token Ready</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-text">
                {user?.user_metadata.full_name || user?.user_metadata.user_name}
              </h2>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="px-5 py-3 rounded-2xl bg-surface border border-border shadow-sm flex flex-col items-center lg:items-start">
                 <p className="text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Persona Class</p>
                 <p className="text-lg font-semibold text-text">{data?.persona.title}</p>
              </div>
              <div className="px-5 py-3 rounded-2xl bg-surface border border-border shadow-sm flex flex-col items-center lg:items-start">
                 <p className="text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Integrity Level</p>
                 <p className="text-lg font-semibold text-text">{data?.persona.level ? data.persona.level * 10 : 0}%</p>
              </div>
            </div>
            
            <p className="text-base text-text-muted leading-relaxed max-w-2xl bg-surface-hover/50 p-4 rounded-xl border border-border/50">
              Systemized identity operating as <span className="text-primary font-semibold">{data?.persona.title}</span> with <span className="font-semibold text-text">{data?.stats.totalProjects}</span> validated project blocks.
            </p>
          </div>
        </div>
      </div>

      {/* Bento Grid Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Vertical Stack */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 flex flex-col justify-between h-[180px] group overflow-hidden relative">
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="flex justify-between items-center border-b border-border pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Star size={20} strokeWidth={2} />
              </div>
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Impact Array</span>
            </div>
            <div>
              <div className="text-4xl font-semibold tracking-tight text-text leading-none mb-2">{data?.stats.totalStars}</div>
              <p className="text-sm font-medium text-text-muted">Global Stars Received</p>
            </div>
          </div>

          <div className="glass-panel p-6 flex flex-col justify-between h-[180px] group overflow-hidden relative">
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="flex justify-between items-center border-b border-border pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <GitFork size={20} strokeWidth={2} />
              </div>
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Iteration Depth</span>
            </div>
            <div>
              <div className="text-4xl font-semibold tracking-tight text-text leading-none mb-2">{data?.stats.totalForks}</div>
              <p className="text-sm font-medium text-text-muted">Total Forks Parsed</p>
            </div>
          </div>
        </div>

        {/* Center: Language Stack */}
        <div className="lg:col-span-1 glass-panel p-6 relative">
          <h3 className="text-lg font-semibold text-text mb-5 border-b border-border pb-3 flex items-center justify-between">
            Stack Galaxy
            <Terminal size={18} className="text-text-muted" />
          </h3>
          <div className="space-y-3">
            {Object.entries(data?.stats.languages || {}).slice(0, 8).map(([lang, count], i) => (
              <div key={lang} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border hover:bg-surface-hover transition-colors group/lang">
                <div className="flex items-center gap-3">
                   <div className="w-7 h-7 rounded-lg bg-bg border border-border flex items-center justify-center text-xs font-medium text-text-muted group-hover/lang:text-primary transition-colors">
                     {i + 1}
                   </div>
                   <span className="font-semibold text-sm text-text">{lang}</span>
                </div>
                <span className="text-xs font-medium text-text-muted">{count} blocks</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Rhythm Node */}
        <div className="glass-panel p-6 flex flex-col justify-between h-full group overflow-hidden relative">
          <div className="absolute -top-6 -right-6 w-40 h-40 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
          <div className="flex justify-between items-center border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Clock size={20} strokeWidth={2} />
            </div>
            <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Temporal Sync</span>
          </div>

          <div className="text-center space-y-6 py-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-surface border border-border shadow-sm flex items-center justify-center text-4xl group-hover:shadow-md group-hover:scale-105 transition-all">
              {data?.rhythm.type === "Night Owl" ? "🌙" : "☀️"}
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-text">{data?.rhythm.type}</h3>
              <p className="text-sm text-text-muted leading-relaxed px-4">
                {data?.rhythm.description}
              </p>
            </div>
          </div>

          <div className="flex gap-1.5 h-2 rounded-full overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex-1 bg-surface-hover group-hover:bg-primary/60 transition-all duration-300" style={{ transitionDelay: `${i * 30}ms` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="glass-panel p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden bg-gradient-to-r from-surface to-surface-hover">
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="space-y-4 text-center lg:text-left relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium">
            <Share2 size={14} />
            Broadcast Enabled
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-text leading-tight">
            Identity Compilation Complete
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            Your professional footprint has been successfully parsed and verified across the global developer grid.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10">
          <button className="px-6 py-3 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 justify-center">
            <Activity size={18} />
            Sync Profile
          </button>
          <button className="px-6 py-3 bg-surface border border-border text-text rounded-xl font-medium text-sm hover:bg-surface-hover transition-all flex items-center gap-2 justify-center">
            <ExternalLink size={18} />
            Public Link
          </button>
        </div>
      </div>

    </div>
  );
}

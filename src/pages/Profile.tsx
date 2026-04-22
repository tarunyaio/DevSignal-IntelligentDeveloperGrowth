import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  ShieldCheck, 
  Clock, 
  Star, 
  GitFork, 
  Code2, 
  Share2,
  ExternalLink,
  Cpu,
  User,
  Terminal,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
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
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12 industrial-grid">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-8 border-black border-t-transparent flex items-center justify-center"
        >
          <Cpu size={32} strokeWidth={3} />
        </motion.div>
        <p className="text-xl font-black uppercase tracking-tighter">Parsing_Identity_Blocks...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen space-y-16 pb-40 px-6 md:px-0">
      <SEO title="User Profile" description="Verified technical identity and contribution metrics." />
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b-4 border-black pb-12">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em]">
            Identity_Archive
          </div>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center">
              <User size={32} strokeWidth={3} />
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              User <span className="text-accent-indigo">Profile.</span>
            </h2>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="px-8 py-4 border-2 border-black font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
        >
          Terminate_Session
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="surgical-card p-12 md:p-24 bg-white relative overflow-hidden group">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          
          {/* Avatar Section */}
          <div className="relative">
             <div className="w-64 h-64 md:w-96 md:h-96 border-4 border-black p-4 bg-zinc-50 group-hover:bg-zinc-100 transition-colors">
                <div className="w-full h-full border-4 border-black overflow-hidden relative">
                  <img 
                    src={user?.user_metadata.avatar_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 border-8 border-black/10 pointer-events-none" />
                </div>
             </div>
             <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-3 font-black text-[10px] uppercase tracking-[0.4em] border-2 border-black shadow-xl">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} strokeWidth={3} className="text-green-400" />
                  ID_VERIFIED
                </div>
             </div>
          </div>

          {/* Identity Details */}
          <div className="flex-1 space-y-12 text-center lg:text-left">
            <div className="space-y-6">
              <p className="text-accent-indigo font-black text-xs tracking-[0.5em] uppercase">// AUTH_TOKEN_READY</p>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                {user?.user_metadata.full_name || user?.user_metadata.user_name}
              </h2>
              <div className="h-2 w-32 bg-black mx-auto lg:ml-0" />
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <div className="px-10 py-6 border-2 border-black bg-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Persona_Class</p>
                 <p className="text-2xl font-black text-black uppercase tracking-tight">{data?.persona.title}</p>
              </div>
              <div className="px-10 py-6 border-2 border-black bg-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Integrity_Level</p>
                 <p className="text-2xl font-black text-black uppercase tracking-tight">{data?.persona.level ? data.persona.level * 10 : 0}%</p>
              </div>
            </div>
            
            <p className="text-xl md:text-3xl font-bold leading-relaxed italic border-l-8 border-black pl-8 max-w-3xl">
              "Systemized identity operating as <span className="text-accent-indigo not-italic uppercase font-black">{data?.persona.title}</span> with {data?.stats.totalProjects} validated project blocks."
            </p>
          </div>
        </div>

        <div className="industrial-grid absolute inset-0 opacity-10 pointer-events-none" />
      </div>

      {/* Bento Grid Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Vertical Stack */}
        <div className="flex flex-col gap-12">
          <div className="surgical-card p-12 flex flex-col justify-between h-[280px] bg-white group overflow-hidden">
            <div className="flex justify-between items-center border-b-2 border-black pb-6">
              <div className="w-16 h-16 border-4 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <Star size={28} strokeWidth={3} />
              </div>
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Impact_Array</span>
            </div>
            <div>
              <div className="text-7xl font-black tracking-tighter text-black leading-none mb-4">{data?.stats.totalStars}</div>
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Global Stars Recieved</p>
            </div>
          </div>

          <div className="surgical-card p-12 flex flex-col justify-between h-[280px] bg-white group overflow-hidden">
            <div className="flex justify-between items-center border-b-2 border-black pb-6">
              <div className="w-16 h-16 border-4 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <GitFork size={28} strokeWidth={3} />
              </div>
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Iteration_Depth</span>
            </div>
            <div>
              <div className="text-7xl font-black tracking-tighter text-black leading-none mb-4">{data?.stats.totalForks}</div>
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Total Forks Parsed</p>
            </div>
          </div>
        </div>

        {/* Center: Language Stack */}
        <div className="lg:col-span-1 surgical-card p-12 bg-white relative">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-10 border-b-2 border-black pb-4 flex items-center justify-between">
            Stack_Galaxy
            <Terminal size={24} strokeWidth={3} />
          </h3>
          <div className="space-y-6">
            {Object.entries(data?.stats.languages || {}).slice(0, 8).map(([lang, count], i) => (
              <div key={lang} className="flex items-center justify-between p-4 border-2 border-black bg-zinc-50 hover:bg-black hover:text-white transition-all group/lang">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 border border-black flex items-center justify-center font-black text-xs bg-white text-black group-hover/lang:border-white">
                     {i + 1}
                   </div>
                   <span className="font-black uppercase text-sm tracking-widest">{lang}</span>
                </div>
                <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{count} blocks</span>
              </div>
            ))}
          </div>
          <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
        </div>

        {/* Right: Rhythm Node */}
        <div className="surgical-card p-12 flex flex-col justify-between h-full bg-white group overflow-hidden">
          <div className="flex justify-between items-center border-b-2 border-black pb-8">
            <div className="w-16 h-16 border-4 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
              <Clock size={32} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Temporal_Sync</span>
          </div>

          <div className="text-center space-y-10 py-12">
            <div className="w-32 h-32 mx-auto border-4 border-black flex items-center justify-center text-6xl group-hover:bg-yellow-400 transition-colors">
              {data?.rhythm.type === "Night Owl" ? "🌙" : "☀️"}
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black tracking-tighter uppercase italic leading-none">{data?.rhythm.type}</h3>
              <p className="text-sm text-zinc-600 font-bold leading-relaxed border-y-2 border-black py-4 mx-6">
                "{data?.rhythm.description}"
              </p>
            </div>
          </div>

          <div className="flex gap-2 h-10 border-2 border-black p-1 bg-zinc-100">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex-1 bg-black/10 group-hover:bg-black/80 transition-all" />
            ))}
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="surgical-card p-16 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-16 bg-white overflow-hidden relative">
        <div className="space-y-8 text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-4 px-6 py-2 border-2 border-black bg-yellow-400 font-black text-[10px] uppercase tracking-widest">
            <Share2 size={16} strokeWidth={3} />
            BROADCAST_ENABLED
          </div>
          <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-tight">
            Identity_Compilation <br />
            <span className="text-accent-indigo">Complete.</span>
          </h3>
          <p className="text-xl font-bold text-zinc-500 italic max-w-2xl leading-relaxed border-l-8 border-black pl-8">
            "Your professional footprint has been successfully parsed and verified across the global developer grid."
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-8 w-full lg:w-auto relative z-10">
          <button className="px-12 py-8 bg-black text-white font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-4 justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
            <Activity size={24} strokeWidth={3} />
            SYNC_PROFILE
          </button>
          <button className="px-12 py-8 bg-white border-4 border-black font-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center gap-4 justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
            <ExternalLink size={24} strokeWidth={3} />
            PUBLIC_LINK
          </button>
        </div>
        <div className="industrial-grid absolute inset-0 opacity-10 pointer-events-none" />
      </div>

    </div>
  );
}

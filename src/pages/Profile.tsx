import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  ShieldCheck, 
  Map, 
  Clock, 
  Star, 
  GitFork, 
  Code2, 
  Share2,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
        const res = await fetch('http://localhost:3001/api/profile/summary', {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 pb-32">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">
              Developer Profile
            </h1>
            <p className="text-slate-500 text-sm">Your unique architectural signal.</p>
          </div>
          <button 
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all"
          >
            Logout
          </button>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-3 gap-4"
        >
          
          {/* Card 1: Persona Card (2x2) */}
          <motion.div 
            variants={item}
            className="md:col-span-2 md:row-span-2 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[100px] group-hover:bg-purple-500/20 transition-colors" />
            
            <div className="space-y-6 relative z-10">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <img 
                  src={user?.user_metadata.avatar_url} 
                  alt="Avatar" 
                  className="w-24 h-24 rounded-3xl border-2 border-white/10 relative z-10 object-cover"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                  <ShieldCheck size={14} className="text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tighter">
                  {user?.user_metadata.full_name || user?.user_metadata.user_name}
                </h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
                  {data?.persona.title}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-black">{data?.persona.level}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-black">Level</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-black">{data?.stats.totalProjects}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-black">Units</div>
                </div>
              </div>
              <a 
                href={`https://github.com/${user?.user_metadata.user_name}`} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ShieldCheck size={20} />
              </a>
            </div>
          </motion.div>

          {/* Card 2: Language Constellation (2x1) */}
          <motion.div 
            variants={item}
            className="md:col-span-2 md:row-span-1 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between group overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Map size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Tech Stack Galaxy</span>
              </div>
              <Code2 size={16} className="text-purple-400" />
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.entries(data?.stats.languages || {}).slice(0, 6).map(([lang, count], idx) => (
                <motion.div
                  key={lang}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className={cn(
                    "px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all hover:scale-105 cursor-default",
                    idx === 0 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                    idx === 1 ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
                    "bg-white/5 border-white/10 text-white/60"
                  )}
                >
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    idx === 0 ? "bg-emerald-400" : idx === 1 ? "bg-blue-400" : "bg-white/40"
                  )} />
                  {lang}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Impact Pulse (1x1) */}
          <motion.div 
            variants={item}
            className="md:col-span-1 md:row-span-1 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between group"
          >
             <div className="flex items-center gap-2 text-slate-400">
                <Star size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Stars</span>
            </div>
            <div>
              <div className="text-5xl font-black tracking-tighter group-hover:text-amber-400 transition-colors">
                {data?.stats.totalStars}
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Global Influence</p>
            </div>
          </motion.div>

          {/* Card 4: Forks (1x1) */}
          <motion.div 
            variants={item}
            className="md:col-span-1 md:row-span-1 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between group"
          >
             <div className="flex items-center gap-2 text-slate-400">
                <GitFork size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Forks</span>
            </div>
            <div>
              <div className="text-5xl font-black tracking-tighter group-hover:text-blue-400 transition-colors">
                {data?.stats.totalForks}
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Architecture Re-use</p>
            </div>
          </motion.div>

          {/* Card 5: Rhythm (1x2) */}
          <motion.div 
            variants={item}
            className="md:col-span-1 md:row-span-2 rounded-3xl bg-gradient-to-b from-purple-500/10 to-transparent backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 text-slate-400">
                <Clock size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Rhythm</span>
            </div>
            
            <div className="space-y-4 text-center py-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-3xl">
                🌙
              </div>
              <div>
                <h3 className="text-xl font-bold">{data?.rhythm.type}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {data?.rhythm.description}
                </p>
              </div>
            </div>

            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "70%" }}
                 className="h-full bg-purple-500" 
               />
            </div>
          </motion.div>

          {/* Card 6: Snapshot / Share (3x1) */}
          <motion.div 
            variants={item}
            className="md:col-span-3 md:row-span-1 border-t-4 border-emerald-500 rounded-3xl bg-slate-900 p-8 flex flex-col md:flex-row items-center justify-between gap-6 group"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight">Identity Snapshot</h3>
              <p className="text-slate-400 text-sm">Download your DevSignal ID to showcase your impact.</p>
            </div>
            
            <div className="flex items-center gap-3">
               <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-black text-sm hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <Share2 size={18} />
                  SHARE IDENTITY
               </button>
               <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors">
                  <ExternalLink size={20} />
               </button>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

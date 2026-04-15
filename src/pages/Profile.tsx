import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  Zap,
  Cpu
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

function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("transition-all duration-500", className)}
    >
      <div style={{ transform: "translateZ(40px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
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
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-10">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 neo-icon text-neo-accent-blue"
        >
          <Cpu size={48} strokeWidth={1} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen space-y-16 pb-32">
      
      {/* Navigation/Header Bar */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="neo-flat px-10 py-5 rounded-[2.5rem] flex justify-between items-center border border-white/[0.01]"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 neo-icon text-neo-accent-blue">
             <Zap size={22} strokeWidth={2.5} />
          </div>
          <div>
             <h1 className="text-xl font-black tracking-tighter uppercase italic text-slate-200">NeuralID_</h1>
             <p className="text-[9px] text-neo-accent-blue font-black tracking-widest uppercase opacity-70">Verified Archive // Sector 07</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="neo-flat px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-neo-accent-orange transition-all hover:neo-pressed"
        >
          Disconnect_
        </button>
      </motion.div>

      {/* Main Immersive Hero Card */}
      <TiltCard>
        <div className="neo-flat p-12 md:p-20 rounded-[4rem] relative overflow-hidden group border border-white/[0.01]">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
            
            {/* Avatar Section */}
            <div className="relative">
               <div className="w-56 h-56 md:w-72 md:h-72 neo-icon p-1 bg-gradient-to-tr from-neo-accent-blue/40 to-purple-500/40">
                  <div className="w-full h-full rounded-full p-2 bg-neo-bg">
                    <img 
                      src={user?.user_metadata.avatar_url} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover border-4 border-neo-bg group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
               </div>
               <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 neo-pressed px-6 py-2.5 rounded-2xl flex items-center gap-3 border border-white/[0.02] shadow-2xl">
                  <ShieldCheck size={18} className="text-neo-accent-blue" />
                  <span className="text-[10px] font-black tracking-[0.2em] text-slate-300 uppercase">Secure_Identity</span>
               </div>
            </div>

            {/* Identity Details */}
            <div className="flex-1 text-center md:text-left space-y-8">
              <div className="space-y-2">
                <p className="text-neo-accent-blue font-black text-xs tracking-[0.4em] uppercase opacity-70">// Architectural Vanguard</p>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-200">
                  {user?.user_metadata.full_name || user?.user_metadata.user_name}
                </h2>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <div className="neo-pressed px-8 py-4 rounded-[2rem] border border-white/[0.01]">
                   <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Persona_Class</p>
                   <p className="text-2xl font-black text-neo-accent-blue">{data?.persona.title}</p>
                </div>
                <div className="neo-pressed px-8 py-4 rounded-[2rem] border border-white/[0.01]">
                   <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Signal_Sync</p>
                   <p className="text-2xl font-black text-slate-200">{data?.persona.level * 10}%</p>
                </div>
              </div>
              
              <p className="text-slate-500 max-w-2xl text-xl font-medium leading-[1.6]">
                Decentralized intelligence synchronized for repository growth. Operating as a <span className="text-slate-300 font-black">{data?.persona.title}</span> with {data?.stats.totalProjects} optimized neural nodes in the current sector.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-neo-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
        </div>
      </TiltCard>

      {/* Bento Grid Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Vertical Stack */}
        <div className="flex flex-col gap-10">
          <div className="neo-flat rounded-[3rem] p-8 flex flex-col justify-between h-[200px] border border-white/[0.01] group">
            <div className="flex justify-between items-center">
              <div className="w-12 h-12 neo-icon text-purple-400 group-hover:text-neo-accent-blue transition-colors">
                <Star size={22} strokeWidth={2.5} />
              </div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Global_Influence</span>
            </div>
            <div>
              <div className="text-5xl font-black tracking-tighter text-slate-200 mb-1">{data?.stats.totalStars}</div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Aggregate Stars</p>
            </div>
          </div>

          <div className="neo-flat rounded-[3rem] p-8 flex flex-col justify-between h-[200px] border border-white/[0.01] group">
            <div className="flex justify-between items-center">
              <div className="w-12 h-12 neo-icon text-neo-accent-blue">
                <GitFork size={22} strokeWidth={2.5} />
              </div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Neural_Forks</span>
            </div>
            <div>
              <div className="text-5xl font-black tracking-tighter text-slate-200 mb-1">{data?.stats.totalForks}</div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logical Branches</p>
            </div>
          </div>
        </div>

        {/* Center: Tech Galaxy in a Crater */}
        <div className="md:col-span-1 neo-pressed rounded-[4rem] h-[440px] flex items-center justify-center overflow-hidden border border-white/[0.01] relative p-4 group">
          <div className="absolute inset-x-8 inset-y-8 bg-[radial-gradient(circle_at_center,_#00aced08_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative w-full h-full flex items-center justify-center">
            {Object.entries(data?.stats.languages || {}).slice(0, 10).map(([lang, count], i) => {
              const radius = 100 + (i % 3) * 35;
              const duration = 25 + i * 5;
              return (
                <motion.div
                  key={lang}
                  animate={{ rotate: 360 }}
                  transition={{ duration, repeat: Infinity, ease: "linear", delay: i * -4 }}
                  className="absolute flex items-center justify-center pointer-events-none"
                  style={{ width: radius * 2, height: radius * 2 }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.2, zIndex: 100 }}
                    animate={{ rotate: -360, opacity: [0.6, 1, 1, 0.4, 0.6] }}
                    transition={{ duration, repeat: Infinity, ease: "linear", delay: i * -4 }}
                    className={cn(
                      "absolute py-1.5 px-4 rounded-xl neo-flat border border-white/[0.02] text-[10px] font-black tracking-widest uppercase pointer-events-auto",
                      i % 3 === 0 ? "text-neo-accent-blue" : i % 3 === 1 ? "text-neo-accent-orange" : "text-purple-400"
                    )}
                    style={{ x: radius }}
                  >
                    {lang}
                  </motion.div>
                </motion.div>
              );
            })}
            
            <div className="text-center relative z-20 neo-flat w-36 h-36 rounded-full flex flex-col justify-center border border-white/[0.02]">
              <p className="text-[8px] font-black tracking-[0.2em] text-neo-accent-blue/40 uppercase mb-1">Core</p>
              <h3 className="text-sm font-black tracking-widest italic text-slate-200">STACK</h3>
            </div>
          </div>
        </div>

        {/* Right: Rhythm Node */}
        <div className="neo-flat rounded-[3rem] p-10 h-[440px] flex flex-col justify-between border border-white/[0.01] group relative">
          <div className="flex justify-between items-center">
            <div className="w-14 h-14 neo-icon text-neo-accent-orange">
              <Clock size={24} strokeWidth={2.5} />
            </div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Chronos_Sync</span>
          </div>

          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto neo-pressed flex items-center justify-center text-4xl rounded-[2.5rem] border border-white/[0.01]">
              {data?.rhythm.type === "Night Owl" ? "🌙" : "☀️"}
            </div>
            <div>
              <h3 className="text-3xl font-black tracking-tight text-slate-200 mb-2 uppercase italic">{data?.rhythm.type}</h3>
              <p className="text-[11px] text-slate-500 font-bold leading-relaxed px-4 opacity-70">
                {data?.rhythm.description}
              </p>
            </div>
          </div>

          <div className="flex gap-1 mt-6 h-4 px-2">
            {[...Array(14)].map((_, i) => (
              <div key={i} className="flex-1 neo-pressed rounded-sm opacity-30" />
            ))}
          </div>
        </div>
      </div>

      {/* Global Archive Action */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="neo-flat rounded-[4rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-white/[0.01]"
      >
        <div className="space-y-4 text-center md:text-left">
          <div className="neo-pressed inline-flex items-center gap-3 px-5 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase text-neo-accent-blue border border-white/[0.01]">
            <Share2 size={12} />
            Network Broadcast Ready
          </div>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-200">Neural Signature Compiled.</h3>
          <p className="text-slate-500 text-xl font-medium max-w-xl italic">Ready to broadcast your architectural footprint across the global developer grid.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
          <button className="neo-flat px-12 py-5 rounded-[2.5rem] bg-neo-accent-blue text-neo-bg font-black text-xs uppercase tracking-[0.4em] hover:neo-pressed transition-all flex items-center gap-4 justify-center">
            <Code2 size={24} strokeWidth={3} />
            Commit_Signature
          </button>
          <button className="neo-flat px-10 py-5 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all flex items-center gap-3 justify-center">
            <ExternalLink size={20} />
            Neural_Link
          </button>
        </div>
      </motion.div>

    </div>
  );
}

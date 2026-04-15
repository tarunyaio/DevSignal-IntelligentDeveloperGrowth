import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
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
  ExternalLink,
  Github,
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

// 3D Tilt Wrapper
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("relative transition-colors duration-500", className)}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

// Background Starfield Component
const Starfield = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 2000 - 1000, 
            y: Math.random() * 2000 - 1000,
            opacity: Math.random() * 0.5,
            scale: Math.random() * 2
          }}
          animate={{ 
            x: [null, Math.random() * 2000 - 1000],
            y: [null, Math.random() * 2000 - 1000],
            opacity: [null, Math.random() * 0.8, Math.random() * 0.2]
          }}
          transition={{ 
            duration: 20 + Math.random() * 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-slate-950 to-emerald-900/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-purple-500/5" />
    </div>
  );
};

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
        <div className="relative">
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-20 h-20 bg-emerald-500/20 rounded-full blur-xl"
          />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="absolute inset-0 w-20 h-20 border-2 border-emerald-500 border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 pb-32 overflow-x-hidden selection:bg-emerald-500/30">
      <Starfield />
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Navigation/Header Bar */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-[2rem]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
               <Zap size={20} className="text-slate-950" />
            </div>
            <div>
               <h1 className="text-lg font-black tracking-tighter uppercase italic">Dev_Signal_Identity</h1>
               <p className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Verified Node // 0xAF32</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="group relative px-6 py-2 overflow-hidden rounded-xl bg-white/5 border border-white/10 text-xs font-bold transition-all hover:bg-emerald-500 hover:text-slate-950"
          >
            <span className="relative z-10">DISCONNECT_</span>
            <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10" />
          </button>
        </motion.div>

        {/* Main Immersive Hero Card */}
        <TiltCard className="w-full">
          <div className="relative p-10 md:p-16 rounded-[3rem] bg-slate-950/40 backdrop-blur-3xl border border-white/10 overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.05)]">
            {/* Animated Nebula in Background */}
            <motion.div 
               animate={{ 
                 scale: [1, 1.2, 1],
                 x: [100, 150, 100],
                 y: [-50, 50, -50]
               }}
               transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
               className="absolute -top-20 -right-20 w-[40rem] h-[40rem] bg-emerald-500/5 rounded-full blur-[120px]"
            />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              {/* Avatar Section */}
              <div className="relative group/avatar">
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="absolute -inset-4 border-2 border-dashed border-emerald-500/20 rounded-full"
                 />
                 <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="absolute -inset-8 border border-dotted border-purple-500/20 rounded-full"
                 />
                 <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tr from-emerald-500 to-purple-500 shadow-2xl">
                    <img 
                      src={user?.user_metadata.avatar_url} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover border-4 border-slate-950 group-hover/avatar:scale-105 transition-transform duration-500"
                    />
                 </div>
                 <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-950 border border-white/10 px-6 py-2 rounded-2xl flex items-center gap-2 shadow-2xl">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <span className="text-xs font-mono font-bold">AUTH_ENCRYPTED</span>
                 </div>
              </div>

              {/* Identity Details */}
              <div className="flex-1 text-center md:text-left space-y-6">
                <div>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-emerald-400 font-mono text-sm tracking-[0.3em] font-bold mb-2 uppercase"
                  >
                    // Architectural Master
                  </motion.p>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter"
                  >
                    {user?.user_metadata.full_name || user?.user_metadata.user_name}
                  </motion.h2>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Persona_Class</p>
                     <p className="text-xl font-black text-emerald-400">{data?.persona.title}</p>
                  </div>
                  <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Signal_Strength</p>
                     <p className="text-xl font-black">{data?.persona.level * 10}%</p>
                  </div>
                </div>
                
                <p className="text-slate-400 max-w-xl text-lg font-light leading-relaxed">
                  Synthesizing repository data into actionable growth vectors. Currently operating as a <span className="text-white font-bold">{data?.persona.title}</span> with {data?.stats.totalProjects} optimized units under management.
                </p>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Floating Galaxy Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[40rem] md:h-[30rem] relative">
          
          {/* Constellation Background (Canvas simulation) */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <svg className="w-full h-full">
                <motion.line 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  x1="10%" y1="10%" x2="40%" y2="60%" stroke="emerald" strokeWidth="1" 
                />
                <motion.line 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  x1="80%" y1="20%" x2="60%" y2="80%" stroke="purple" strokeWidth="1" 
                />
             </svg>
          </div>

          {/* Left Stats Node */}
          <TiltCard className="flex flex-col gap-4">
             <div className="flex-1 rounded-[2.5rem] bg-white/5 border border-white/10 p-8 flex flex-col justify-between group">
                <div className="flex justify-between items-center">
                   <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                      <Star size={24} />
                   </div>
                   <div className="text-[10px] font-mono text-slate-500 uppercase">Impact_Factor</div>
                </div>
                <div>
                   <motion.div 
                     initial={{ scale: 0.5, opacity: 0 }}
                     whileInView={{ scale: 1, opacity: 1 }}
                     className="text-7xl font-black tracking-tighter group-hover:text-purple-400 transition-colors"
                   >
                     {data?.stats.totalStars}
                   </motion.div>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Global Stars Earned</p>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    className="h-full bg-purple-500" 
                   />
                </div>
             </div>
             
             <div className="flex-1 rounded-[2.5rem] bg-white/5 border border-white/10 p-8 flex flex-col justify-between group">
                <div className="flex justify-between items-center">
                   <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <GitFork size={24} />
                   </div>
                   <div className="text-[10px] font-mono text-slate-500 uppercase">Architecture_Duplication</div>
                </div>
                <div>
                   <motion.div 
                     initial={{ scale: 0.5, opacity: 0 }}
                     whileInView={{ scale: 1, opacity: 1 }}
                     className="text-7xl font-black tracking-tighter group-hover:text-emerald-400 transition-colors"
                   >
                     {data?.stats.totalForks}
                   </motion.div>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Repositories Forked</p>
                </div>
             </div>
          </TiltCard>

          {/* Center: The Flying Tech Constellation */}
          <div className="md:col-span-1 relative flex items-center justify-center overflow-visible">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-emerald-500/10" />
             
             {Object.entries(data?.stats.languages || {}).slice(0, 8).map(([lang, count], i) => (
                <motion.div
                  key={lang}
                  initial={{ 
                    x: Math.random() * 200 - 100, 
                    y: Math.random() * 200 - 100,
                    scale: 0 
                  }}
                  animate={{ 
                    x: [
                      Math.random() * 150 - 75,
                      Math.random() * 150 - 75,
                      Math.random() * 150 - 75
                    ],
                    y: [
                      Math.random() * 150 - 75,
                      Math.random() * 150 - 75,
                      Math.random() * 150 - 75
                    ],
                    scale: 1
                  }}
                  transition={{ 
                    duration: 10 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.2, zIndex: 50 }}
                  className={cn(
                    "absolute px-6 py-3 rounded-2xl backdrop-blur-md border font-black text-sm cursor-default shadow-2xl",
                    i === 0 ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" :
                    i === 1 ? "bg-purple-500/20 border-purple-500/40 text-purple-400" :
                    "bg-white/5 border-white/10 text-white"
                  )}
                >
                  {lang}
                </motion.div>
             ))}
             
             <div className="text-center relative z-10 pointer-events-none">
                <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Galaxy_Core</p>
                <h3 className="text-2xl font-black">TECH_STACK</h3>
             </div>
          </div>

          {/* Right: Rhythm Node */}
          <TiltCard className="rounded-[2.5rem] bg-white/5 border border-white/10 p-8 flex flex-col justify-between relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             
             <div className="flex justify-between items-center relative z-10">
                <div className="p-3 rounded-xl bg-slate-800 text-emerald-400">
                   <Clock size={24} />
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">Sync_Frequency</div>
             </div>

             <div className="space-y-6 relative z-10 py-12 text-center">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-24 h-24 mx-auto rounded-full bg-slate-800 border-2 border-emerald-500/30 flex items-center justify-center text-5xl shadow-[0_0_40px_rgba(16,185,129,0.1)]"
                >
                  {data?.rhythm.type === "Night Owl" ? "🌙" : "☀️"}
                </motion.div>
                <div>
                   <h3 className="text-3xl font-black tracking-tighter italic uppercase">{data?.rhythm.type}</h3>
                   <p className="text-sm text-slate-400 mt-2 font-mono leading-relaxed px-4">
                     {data?.rhythm.description}
                   </p>
                </div>
             </div>

             <div className="grid grid-cols-7 gap-1 relative z-10">
                {[...Array(21)].map((_, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0.1 }}
                     animate={{ opacity: [0.1, Math.random(), 0.1] }}
                     transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                     className="aspect-square rounded-sm bg-emerald-500/40"
                   />
                ))}
             </div>
          </TiltCard>

        </div>

        {/* Global Action Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="rounded-[3rem] p-[1px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 shadow-2xl shadow-emerald-500/20 group"
        >
           <div className="bg-slate-950 rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-20">
              <div className="space-y-4 text-center md:text-left">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                    <Share2 size={12} />
                    Ready for Broadcast
                 </div>
                 <h3 className="text-4xl md:text-5xl font-black tracking-tighter">Your Identity Snapshot is Compiled.</h3>
                 <p className="text-slate-400 text-lg max-w-xl">Download your architectural signature to showcase your influence across the developer network.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                 <button className="flex-1 px-10 py-5 rounded-[2rem] bg-emerald-500 text-slate-950 font-black text-lg hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl">
                    <Github size={24} />
                    SHARE_ON_GITHUB
                 </button>
                 <button className="px-10 py-5 rounded-[2rem] bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                    <ExternalLink size={24} />
                    GENERATE_URL
                 </button>
              </div>
           </div>
        </motion.div>

      </div>
    </div>
  );
}

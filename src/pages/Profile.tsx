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
  Cpu,
  User
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
      className={cn("transition-all duration-500 perspective-1000", className)}
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

  const [isMobile, setIsMobile] = useState(false);

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

    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  const scale = isMobile ? 0.6 : 1;

  return (
    <div className="relative min-h-screen space-y-16 pb-32 px-4 md:px-0">
      
      {/* Navigation/Header Bar */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="neo-flat px-6 md:px-12 py-6 rounded-[2.5rem] md:rounded-[3rem] flex justify-between items-center border border-white/[0.01]"
      >
        <div className="flex items-center gap-4 md:gap-5">
          <div className="w-10 h-10 md:w-14 md:h-14 neo-icon text-neo-accent-blue">
             <User size={20} md:size={24} strokeWidth={2.5} />
          </div>
          <div>
             <h1 className="text-xl md:text-3xl font-black tracking-tighter uppercase italic text-slate-200">Profile</h1>
             <p className="text-[8px] md:text-[10px] text-neo-accent-blue font-black tracking-[0.2em] md:tracking-[0.4em] uppercase opacity-70">Identity Archive // Sector 07</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="neo-flat px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400 hover:text-neo-accent-orange transition-all hover:neo-pressed border border-white/[0.01]"
        >
          Sign Out
        </button>
      </motion.div>

      {/* Main Immersive Hero Card */}
      <TiltCard>
        <div className="neo-flat p-10 md:p-24 rounded-[3.5rem] md:rounded-[4.5rem] relative overflow-hidden group border border-white/[0.01]" style={{ transformStyle: "preserve-3d" }}>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 md:gap-20 text-center lg:text-left">
            
            {/* Avatar Section */}
            <div className="relative" style={{ transform: "translateZ(60px)" }}>
               <div className="w-48 h-48 md:w-80 md:h-80 neo-icon p-1 bg-gradient-to-tr from-neo-accent-blue/40 to-purple-500/40">
                  <div className="w-full h-full rounded-full p-2 bg-neo-bg">
                    <img 
                      src={user?.user_metadata.avatar_url} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover border-4 border-neo-bg group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
               </div>
               <div className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 neo-pressed px-6 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 border border-white/[0.02] shadow-2xl">
                  <ShieldCheck size={16} md:size={20} className="text-neo-accent-blue" />
                  <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] text-slate-200 uppercase">Verified User</span>
               </div>
            </div>

            {/* Identity Details */}
            <div className="flex-1 space-y-8 md:space-y-10" style={{ transform: "translateZ(50px)" }}>
              <div className="space-y-4">
                <p className="text-neo-accent-blue font-black text-[9px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase opacity-70">// Professional Identity</p>
                <h2 className="text-4xl md:text-9xl font-black tracking-tighter text-slate-200 leading-tight md:leading-none break-words max-w-full">
                  {user?.user_metadata.full_name || user?.user_metadata.user_name}
                </h2>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8">
                <div className="neo-pressed px-6 md:px-10 py-4 md:py-5 rounded-[2rem] md:rounded-[2.5rem] border border-white/[0.01]">
                   <p className="text-[8px] md:text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 font-mono">Persona Title</p>
                   <p className="text-xl md:text-3xl font-black text-neo-accent-blue tracking-tight">{data?.persona.title}</p>
                </div>
                <div className="neo-pressed px-6 md:px-10 py-4 md:py-5 rounded-[2rem] md:rounded-[2.5rem] border border-white/[0.01]">
                   <p className="text-[8px] md:text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 font-mono">Impact Level</p>
                   <p className="text-xl md:text-3xl font-black text-slate-200 tracking-tight">{data?.persona.level * 10}%</p>
                </div>
              </div>
              
              <p className="text-slate-500 max-w-3xl text-lg md:text-2xl font-medium leading-relaxed italic opacity-80">
                Synchronized developer profile operating as a <span className="text-slate-200 font-black not-italic">{data?.persona.title}</span> with {data?.stats.totalProjects} active projects.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-20 -right-20 w-[40rem] h-[40rem] bg-neo-accent-blue/5 rounded-full blur-[140px] pointer-events-none" />
        </div>
      </TiltCard>

      {/* Bento Grid Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        
        {/* Left Vertical Stack */}
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="neo-flat rounded-[2.5rem] md:rounded-[3.5rem] p-10 flex flex-col justify-between h-[200px] md:h-[220px] border border-white/[0.01] group relative" style={{ transformStyle: "preserve-3d" }}>
            <div className="flex justify-between items-center" style={{ transform: "translateZ(30px)" }}>
              <div className="w-12 h-12 md:w-14 md:h-14 neo-icon text-purple-400 group-hover:text-neo-accent-blue transition-colors">
                <Star size={20} md:size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest">Aggregate Impact</span>
            </div>
            <div style={{ transform: "translateZ(40px)" }}>
              <div className="text-5xl md:text-6xl font-black tracking-tighter text-slate-200 mb-2">{data?.stats.totalStars}</div>
              <p className="text-[9px] md:text-[11px] font-black text-slate-500 uppercase tracking-widest">Total Stars Recieved</p>
            </div>
          </div>

          <div className="neo-flat rounded-[2.5rem] md:rounded-[3.5rem] p-10 flex flex-col justify-between h-[200px] md:h-[220px] border border-white/[0.01] group relative" style={{ transformStyle: "preserve-3d" }}>
            <div className="flex justify-between items-center" style={{ transform: "translateZ(30px)" }}>
              <div className="w-12 h-12 md:w-14 md:h-14 neo-icon text-neo-accent-blue">
                <GitFork size={20} md:size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest">Network Forks</span>
            </div>
            <div style={{ transform: "translateZ(40px)" }}>
              <div className="text-5xl md:text-6xl font-black tracking-tighter text-slate-200 mb-2">{data?.stats.totalForks}</div>
              <p className="text-[9px] md:text-[11px] font-black text-slate-500 uppercase tracking-widest">Codebase Iterations</p>
            </div>
          </div>
        </div>

        {/* Center: Tech Galaxy in a Deeper Crater */}
        <div className="lg:col-span-1 neo-pressed rounded-[3.5rem] md:rounded-[4.5rem] h-[380px] md:h-[480px] flex items-center justify-center overflow-hidden border border-white/[0.02] relative p-6 group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00aced10_0%,_transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative w-full h-full flex items-center justify-center scale-90 md:scale-100">
            {Object.entries(data?.stats.languages || {}).slice(0, 10).map(([lang, count], i, arr) => {
              const total = arr.length;
              const initialRotation = (i * (360 / total)) + (Math.random() * 20);
              const radius = (110 + (i % 3) * 40) * scale;
              const duration = 25 + (i * 8) % 30;
              
              return (
                <motion.div
                  key={lang}
                  initial={{ rotate: initialRotation }}
                  animate={{ rotate: initialRotation + 360 }}
                  transition={{ duration, repeat: Infinity, ease: "linear" }}
                  className="absolute flex items-center justify-center pointer-events-none"
                  style={{ width: radius * 2, height: radius * 2 }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.2, zIndex: 100 }}
                    animate={{ rotate: -(initialRotation + 360), opacity: [0.7, 1, 1, 0.5, 0.7] }}
                    transition={{ duration, repeat: Infinity, ease: "linear" }}
                    className={cn(
                      "absolute py-1.5 md:py-2 px-3 md:px-6 rounded-xl md:rounded-2xl neo-flat border border-white/[0.05] text-[8px] md:text-[10px] font-black tracking-widest uppercase pointer-events-auto shadow-2xl transition-all whitespace-nowrap",
                      i % 3 === 0 ? "text-neo-accent-blue" : i % 3 === 1 ? "text-neo-accent-orange" : "text-neo-accent-emerald"
                    )}
                    style={{ x: radius }}
                  >
                    {lang}
                  </motion.div>
                </motion.div>
              );
            })}
            
            <div className="text-center relative z-20 neo-flat w-32 h-32 md:w-44 md:h-44 rounded-full flex flex-col justify-center border border-white/[0.02] shadow-2xl scale-90 md:scale-100">
              <p className="text-[7px] md:text-[9px] font-black tracking-[0.2em] md:tracking-[0.3em] text-neo-accent-blue/50 uppercase mb-2">Tech</p>
              <h3 className="text-sm md:text-lg font-black tracking-widest italic text-slate-200">GALAXY</h3>
            </div>
          </div>
        </div>

        {/* Right: Rhythm Node */}
        <div className="neo-flat rounded-[2.5rem] md:rounded-[3.5rem] p-10 md:p-12 h-[410px] md:h-[480px] flex flex-col justify-between border border-white/[0.01] group relative overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
          <div className="flex justify-between items-center" style={{ transform: "translateZ(30px)" }}>
            <div className="w-14 h-14 md:w-16 md:h-16 neo-icon text-neo-accent-orange">
              <Clock size={24} md:size={28} strokeWidth={2.5} />
            </div>
            <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Daily Rhythm</span>
          </div>

          <div className="text-center space-y-6 md:space-y-8" style={{ transform: "translateZ(50px)" }}>
            <div className="w-24 h-24 md:w-28 md:h-28 mx-auto neo-pressed flex items-center justify-center text-4xl md:text-5xl rounded-[2.5rem] md:rounded-[3rem] border border-white/[0.01]">
              {data?.rhythm.type === "Night Owl" ? "🌙" : "☀️"}
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-200 mb-2 md:mb-3 uppercase italic leading-none">{data?.rhythm.type}</h3>
              <p className="text-[11px] md:text-xs text-slate-500 font-bold leading-relaxed px-4 md:px-6 opacity-70">
                {data?.rhythm.description}
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-8 md:mt-10 h-6 px-4" style={{ transform: "translateZ(20px)" }}>
            {[...Array(isMobile ? 12 : 16)].map((_, i) => (
              <div key={i} className="flex-1 neo-pressed rounded-md opacity-80 border border-white/[0.02]" />
            ))}
          </div>
        </div>
      </div>

      {/* Global Archive Action */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="neo-flat rounded-[3.5rem] md:rounded-[4.5rem] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16 border border-white/[0.01]"
      >
        <div className="space-y-4 md:space-y-6 text-center lg:text-left">
          <div className="neo-pressed inline-flex items-center gap-3 px-5 px-6 py-2 md:py-2.5 rounded-full text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.4em] uppercase text-neo-accent-blue border border-white/[0.01]">
            <Share2 size={12} md:size={14} />
            Profile Share Ready
          </div>
          <h3 className="text-3xl md:text-6xl font-black tracking-tighter text-slate-200 leading-tight">Identity Compiled Successfully.</h3>
          <p className="text-slate-500 text-lg md:text-2xl font-medium max-w-2xl italic leading-relaxed opacity-80">Ready to broadcast your professional footprint across the grid.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 w-full lg:w-auto">
          <button className="neo-flat px-8 md:px-14 py-5 md:py-7 rounded-[2.5rem] md:rounded-[3rem] !bg-neo-accent-blue !text-neo-bg font-black text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.4em] hover:neo-pressed active:scale-95 transition-all flex items-center gap-4 md:gap-5 justify-center border border-white/[0.1] shadow-2xl shadow-neo-accent-blue/20">
            <Code2 size={24} md:size={26} strokeWidth={3} />
            Update Profile
          </button>
          <button className="neo-flat px-8 md:px-12 py-5 md:py-7 rounded-[2.5rem] md:rounded-[3rem] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400 hover:text-white transition-all flex items-center gap-3 md:gap-4 justify-center border border-white/[0.01]">
            <ExternalLink size={20} md:size={24} />
            Public Link
          </button>
        </div>
      </motion.div>

    </div>
  );
}

 import React, { useEffect } from 'react';
 import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
 import { useAuth } from '../contexts/AuthContext';
 import { useNavigate, Link } from 'react-router-dom';
 import { footerLinks } from '../lib/footerLinks';
 import { Terminal, ArrowRight, ShieldCheck, Zap, BarChart3, Code2, BookOpen } from 'lucide-react';
 import { cn } from '@/lib/utils';
import { SEO } from '../components/layout/SEO';

function TiltWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("perspective-1000", className)}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export function LandingPage() {
  const { signInWithGitHub, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative min-h-screen bg-neo-bg text-slate-200 font-sans overflow-x-hidden selection:bg-neo-accent-blue/20">
      <SEO 
        description="DevSignal turns your GitHub activity into actionable growth signals. Experience premium developer intelligence."
      />
      <div className="relative z-10 px-6">
        
        {/* Navbar-ish Logo */}
        <header className="max-w-7xl mx-auto pt-8 md:pt-16 flex items-center justify-center lg:justify-start">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 neo-icon text-neo-accent-blue border border-white/[0.01]">
              <Terminal size={22} strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic text-slate-200">DevSignal</span>
              <p className="text-[8px] md:text-[10px] text-neo-accent-blue font-black tracking-[0.4em] uppercase opacity-70">Intelligence Engine // v1.0</p>
            </div>
          </motion.div>
        </header>

        {/* Hero Section */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center max-w-7xl w-full">
            
            {/* Hero Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-12">
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="neo-pressed inline-flex items-center gap-4 px-6 py-2.5 rounded-full text-[10px] font-black tracking-[0.4em] uppercase text-neo-accent-blue border border-white/[0.01]"
                >
                  <Zap size={14} className="fill-neo-accent-blue" />
                  Network Synchronized
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-5xl md:text-9xl font-black leading-tight md:leading-none tracking-tighter italic text-slate-200"
                >
                  Growth.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-accent-blue via-purple-500 to-indigo-600 non-italic underline decoration-neo-accent-blue/20 underline-offset-4 md:underline-offset-8">
                    Accelerated.
                  </span>
                </motion.h1>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg md:text-3xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium italic"
              >
                A GitHub-native developer intelligence layer that turns repository activity into <span className="text-slate-200 font-black not-italic">actionable</span> growth signals.
              </motion.p>
              
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-4 px-8 py-4 rounded-2xl neo-flat border border-white/[0.01] text-xs font-black text-slate-400 uppercase tracking-widest">
                  <ShieldCheck size={20} className="text-neo-accent-emerald" />
                  Private by Design
                </div>
                <div className="flex items-center gap-4 px-8 py-4 rounded-2xl neo-flat border border-white/[0.01] text-xs font-black text-slate-400 uppercase tracking-widest">
                  <Zap size={20} className="text-neo-accent-orange" />
                  Real-time Sync
                </div>
              </div>
            </div>

            {/* Login Form Card */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto">
              <TiltWrapper>
                <div className="neo-flat p-8 md:p-14 rounded-[3rem] md:rounded-[4.5rem] border border-white/[0.01] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-neo-accent-blue/10 blur-[80px] pointer-events-none" />
                  
                  <div className="relative z-10 space-y-12">
                    <div className="space-y-4">
                      <h2 className="text-4xl font-black italic tracking-tighter uppercase text-slate-200">
                        Get <span className="text-neo-accent-blue">Started</span>
                      </h2>
                      <p className="text-slate-500 text-sm font-bold leading-relaxed uppercase tracking-widest">
                        Sector Authentication Required
                      </p>
                    </div>

                    <p className="text-slate-400 text-base leading-relaxed font-medium italic">
                      Connect your GitHub account to unlock real-time intelligence arrays and architectural insights.
                    </p>

                    <button 
                      onClick={signInWithGitHub}
                      className="w-full neo-flat px-6 py-5 md:py-7 rounded-[1.5rem] md:rounded-[2rem] !bg-neo-accent-blue !text-neo-bg font-black text-xs md:text-sm uppercase tracking-[0.4em] hover:neo-pressed active:scale-95 transition-all flex items-center justify-center gap-4 md:gap-6 border border-white/[0.1] shadow-2xl shadow-neo-accent-blue/20"
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      Continue with GitHub
                      <ArrowRight size={20} strokeWidth={3} className="hidden sm:block" />
                    </button>
                    
                    <div className="flex justify-center">
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700 animate-pulse">Awaiting Signal</span>
                    </div>
                  </div>
                </div>
              </TiltWrapper>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-40 max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-24">
            <motion.h2 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase text-slate-200"
            >
              Excellence. <span className="text-neo-accent-blue not-italic">Engineered.</span>
            </motion.h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium leading-relaxed italic border-t border-white/[0.03] pt-6">
              Automated intelligence streams for the modern developer. Focus on the code; we'll handle the architectural signals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: BarChart3, title: 'Deep Analytics', desc: 'Real-time repository pulse and contributor workload visualization.', color: 'text-neo-accent-blue' },
              { icon: Code2, title: 'Growth Editor', desc: 'Secure environment to test snippets and document learning logic.', color: 'text-purple-400' },
              { icon: BookOpen, title: 'Resource Hub', desc: 'Smart organization for your technical archives and libraries.', color: 'text-neo-accent-orange' },
              { icon: ShieldCheck, title: 'Active Privacy', desc: 'Your data stays yours. Local-first architecture with crypt-sync.', color: 'text-neo-accent-emerald' }
            ].map((f, i) => (
              <TiltWrapper key={i}>
                <div className="h-full neo-flat p-10 rounded-[3rem] border border-white/[0.01] group hover:neo-pressed transition-all">
                  <div className={cn("w-16 h-16 neo-icon mb-10 transition-transform group-hover:scale-110", f.color)}>
                    <f.icon size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-black italic mb-4 uppercase tracking-tighter text-slate-200">{f.title}</h3>
                  <p className="text-slate-500 font-medium italic text-sm leading-relaxed">{f.desc}</p>
                </div>
              </TiltWrapper>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 max-w-7xl mx-auto border-t border-white/[0.03]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="flex flex-col items-center md:items-start gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 neo-icon text-neo-accent-blue">
                  <Terminal size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-xl font-black uppercase italic tracking-tighter">DevSignal</span>
                </div>
              </div>
              <p className="text-slate-600 text-xs font-black uppercase tracking-widest">Elevating the developer intelligence experience.</p>
            </div>

            <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
              {footerLinks.map((link) =>
                link.internal ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`hover:text-neo-accent-blue transition-colors${link.italic ? ' italic border-b border-neo-accent-blue/20 pb-1' : ''}`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-neo-accent-blue transition-colors${link.italic ? ' italic border-b border-neo-accent-blue/20 pb-1' : ''}`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">
              DEVSIGNAL © 2026 // GRID SECTOR 07
            </div>
          </div>
        </footer>
      </div>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-neo-accent-blue/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[160px] rounded-full" />
      </div>
    </div>
  );
}

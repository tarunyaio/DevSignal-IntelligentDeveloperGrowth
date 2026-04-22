import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Code2, ArrowRight, Layers, Terminal } from 'lucide-react';
import { SEO } from '../components/layout/SEO';

export function LandingPage() {
  const { signInWithGitHub, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative min-h-screen bg-white text-black overflow-x-hidden industrial-grid selection:bg-black selection:text-white">
      <SEO 
        description="DevSignal: Surgical Developer Intelligence. Track repository velocity and master technical stacks with industrial precision."
      />
      
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10 flex flex-col md:flex-row items-center justify-between border-b-2 border-black bg-white gap-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black flex items-center justify-center text-white">
              <Terminal size={20} className="md:size-6" strokeWidth={3} />
            </div>
            <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase">DevSignal <span className="text-[8px] md:text-[10px] bg-black text-white px-2 py-0.5 ml-1 md:ml-2">v2.0</span></span>
          </div>
          <div className="flex items-center gap-6 md:gap-8">
            <a href="#features" className="hidden sm:block text-[10px] md:text-xs font-black uppercase tracking-widest hover:underline decoration-4">Features</a>
            <button 
              onClick={signInWithGitHub}
              className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-2 md:py-3 bg-white border-2 border-black font-black text-[10px] md:text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              Auth / Login
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 md:space-y-10 lg:col-span-3"
          >
            <div className="inline-block px-4 py-1 border-2 border-black bg-yellow-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em]">
              Surgical Intelligence System
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black leading-[0.85] tracking-tighter uppercase">
              Engineered <br />
              <span className="text-accent-indigo">Growth.</span>
            </h1>

            <p className="text-lg md:text-2xl font-bold max-w-xl leading-relaxed border-l-8 border-black pl-6 md:pl-8 italic text-zinc-600">
              "Stop guessing your progress. We parse your repository data into surgical growth signals."
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-4 md:pt-6">
              <button 
                onClick={signInWithGitHub}
                className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 bg-black text-white font-black text-xs md:text-sm uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 md:gap-4"
              >
                Connect Github
                <ArrowRight size={18} className="md:size-5" />
              </button>
              <a 
                href="https://github.com/tarunyaio/DevSignal-IntelligentDeveloperGrowth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 bg-white border-2 border-black font-black text-xs md:text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] flex items-center justify-center"
              >
                Documentation
              </a>
            </div>
          </motion.div>

          <div className="relative mt-12 lg:mt-0 lg:col-span-2">
            <div className="surgical-card p-1 aspect-square bg-zinc-100 flex items-center justify-center overflow-hidden">
               <div className="w-full h-full border-2 border-black flex flex-col p-4 md:p-8 space-y-6 md:space-y-8 bg-white industrial-grid">
                  <div className="flex items-center justify-between border-b-2 border-black pb-4">
                    <div className="flex gap-1.5 md:gap-2">
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 border border-black" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-500 border border-black" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border border-black" />
                    </div>
                    <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Signal_Analyzer.sh</div>
                  </div>
                  <div className="space-y-3 md:space-y-4 font-mono text-xs md:text-sm">
                    <p className="text-zinc-400">$ devsignal analyze --all</p>
                    <p className="text-black font-black font-sans uppercase">Parsing repository velocity...</p>
                    <div className="h-3 md:h-4 bg-zinc-100 border border-black overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-full bg-black"
                      />
                    </div>
                    <p className="text-accent-indigo font-black uppercase">Sectors mapped: 20/20</p>
                    <p className="text-black">Architecture integrity: 98%</p>
                  </div>
               </div>
            </div>
            <div className="absolute -bottom-6 md:-bottom-10 -right-6 md:-right-10 w-32 md:w-48 h-32 md:h-48 bg-yellow-400 border-4 border-black -z-10" />
          </div>
        </section>

        {/* Features Grid */}
        <section className="border-y-4 border-black bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black">
            {[
              {
                icon: <BarChart3 />,
                title: "Deep Analytics",
                desc: "Surgical insights into commit patterns and repository velocity."
              },
              {
                icon: <Layers />,
                title: "Learning Vault",
                desc: "20+ curated paths for technical mastery."
              },
              {
                icon: <Code2 />,
                title: "Logic Editor",
                desc: "Distraction-free environment for architectural journey documentation."
              }
            ].map((feature, i) => (
              <div key={i} className="p-10 md:p-16 space-y-6 md:space-y-8 hover:bg-zinc-50 transition-colors group">
                <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                  {React.cloneElement(feature.icon as React.ReactElement<Record<string, unknown>>, { size: 32, strokeWidth: 3 })}
                </div>
                <h3 className="text-2xl md:text-3xl font-black">{feature.title}</h3>
                <p className="text-base md:text-lg font-bold text-zinc-500 italic leading-relaxed">"{feature.desc}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Large Quote */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-40 text-center">
          <h2 className="text-3xl md:text-7xl font-black uppercase leading-none tracking-tighter">
            Build with <span className="bg-black text-white px-2 md:px-6">precision.</span> <br className="hidden md:block" />
            Measure with <span className="border-2 md:border-4 border-black px-2 md:px-6">science.</span>
          </h2>
        </section>

        {/* Call to Action */}
        <section className="bg-black text-white py-20 md:py-32 overflow-hidden relative">
          <div className="industrial-grid absolute inset-0 opacity-10" />
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center space-y-10 md:space-y-12 relative z-10">
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-tight">
              Initialize your growth phase.
            </h2>
            <button 
              onClick={signInWithGitHub}
              className="px-10 md:px-16 py-6 md:py-8 bg-white text-black font-black text-lg md:text-xl uppercase tracking-widest hover:translate-x-[4px] hover:translate-y-[4px] shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none transition-all"
            >
              Get Started
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black flex items-center justify-center text-white">
              <Terminal size={20} strokeWidth={3} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">DevSignal</span>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 flex flex-col md:flex-row items-center gap-4">
            <span>© 2026 SURGICAL INTELLIGENCE UNIT.</span>
            <span className="hidden md:block w-1.5 h-1.5 bg-zinc-400 rotate-45" />
            <span>
              GOD OF THE SITE: <a href="https://github.com/tarunyaio" target="_blank" rel="noopener noreferrer" className="text-black hover:text-accent-indigo transition-colors underline decoration-2 underline-offset-4">@Tarunyaio</a>
            </span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="font-black text-[10px] uppercase tracking-widest hover:underline decoration-2">GitHub</a>
            <a href="#" className="font-black text-[10px] uppercase tracking-widest hover:underline decoration-2">Discord</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

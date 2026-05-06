import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Code2, ArrowRight, Layers, Terminal, Sparkles } from 'lucide-react';
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
    <div className="relative min-h-screen bg-bg text-text overflow-x-hidden">
      <SEO 
        description="DevSignal: Intelligent Developer Growth. Track repository velocity and master technical stacks with precision."
      />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-60 dark:opacity-20" />
      </div>
      
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <Terminal size={20} className="md:size-6" strokeWidth={2.5} />
            </div>
            <span className="text-2xl md:text-3xl font-semibold tracking-tight">DevSignal <span className="text-[10px] md:text-xs font-medium bg-surface text-text-muted px-2.5 py-1 rounded-md ml-2 border border-border">v2.1</span></span>
          </div>
          <div className="flex items-center gap-6 md:gap-8">
            <a href="#features" className="hidden sm:block text-sm font-medium text-text-muted hover:text-primary transition-colors">Features</a>
            <button 
              onClick={signInWithGitHub}
              className="flex items-center gap-2 px-6 py-2.5 bg-text text-bg rounded-xl font-medium text-sm hover:bg-text/90 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              Connect GitHub
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 lg:col-span-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium">
              <Sparkles size={14} />
              Intelligent Growth Engine
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.1] tracking-tight">
              Engineered <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">Growth.</span>
            </h1>

            <p className="text-lg md:text-xl font-medium max-w-xl leading-relaxed text-text-muted">
              Stop guessing your progress. We parse your repository data into actionable growth signals with precision analytics.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button 
                onClick={signInWithGitHub}
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-medium text-sm md:text-base hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
              >
                Connect Github
                <ArrowRight size={18} />
              </button>
              <a 
                href="https://github.com/TarunyaProgrammer/DevSignal-IntelligentDeveloperGrowth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-surface border border-border text-text rounded-xl font-medium text-sm md:text-base hover:bg-surface-hover transition-all flex items-center justify-center"
              >
                Documentation
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:col-span-2"
          >
            <div className="glass-panel p-6 aspect-square rounded-3xl overflow-hidden relative shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
               <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="text-xs font-mono text-text-muted">analyze.ts</div>
                  </div>
                  <div className="space-y-4 font-mono text-sm mt-6 flex-1">
                    <p className="text-primary">❯ devsignal analyze --all</p>
                    <p className="text-text-muted">Parsing repository velocity...</p>
                    <div className="h-2 w-full bg-surface-hover rounded-full overflow-hidden mt-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                    <div className="space-y-2 mt-6">
                      <p className="text-emerald-500 flex items-center gap-2">✓ Sectors mapped: 20/20</p>
                      <p className="text-text flex items-center gap-2">✓ Architecture integrity: 98%</p>
                    </div>
                  </div>
               </div>
            </div>
            
            {/* Decorative background element */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="py-20 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 />,
                title: "Deep Analytics",
                desc: "Precise insights into commit patterns and repository velocity."
              },
              {
                icon: <Layers />,
                title: "Learning Vault",
                desc: "Curated paths structured for accelerated technical mastery."
              },
              {
                icon: <Code2 />,
                title: "Logic Editor",
                desc: "Distraction-free environment for architectural documentation."
              }
            ].map((feature, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="glass-panel p-10 rounded-3xl hover:bg-surface-hover transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {React.cloneElement(feature.icon as React.ReactElement<Record<string, unknown>>, { size: 28, strokeWidth: 2 })}
                </div>
                <h3 className="text-2xl font-semibold text-text mb-4">{feature.title}</h3>
                <p className="text-base text-text-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Large Quote */}
        <section className="max-w-5xl mx-auto px-6 py-24 md:py-40 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight text-text">
            Build with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">precision.</span> <br className="hidden md:block" />
            Measure with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-700">science.</span>
          </h2>
        </section>

        {/* Call to Action */}
        <section className="max-w-5xl mx-auto px-6 pb-32">
          <div className="glass-panel relative overflow-hidden rounded-3xl p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-teal-500/10 pointer-events-none" />
            <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-text">
                Initialize your growth phase.
              </h2>
              <p className="text-lg text-text-muted">
                Join developers who use DevSignal to track their technical evolution.
              </p>
              <button 
                onClick={signInWithGitHub}
                className="px-10 py-4 bg-primary text-white rounded-xl font-medium text-lg hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5 transition-all inline-flex items-center gap-3"
              >
                Get Started Now
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
              <Terminal size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-semibold tracking-tight">DevSignal</span>
          </div>
          <div className="text-sm font-medium text-text-muted flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>© 2026 DevSignal Systems.</span>
            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-border" />
            <span>
              Maintained by <a href="https://github.com/TarunyaProgrammer" target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors">@TarunyaProgrammer</a>
            </span>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/TarunyaProgrammer/DevSignal-IntelligentDeveloperGrowth" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Documentation</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Terminal, ArrowRight, ShieldCheck, Zap, BarChart3, Code2, BookOpen, ChevronDown } from 'lucide-react';

export function LandingPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use admin / admin.');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
          style={{ backgroundImage: "url('/Users/tarunyakesh/.gemini/antigravity/brain/f57a6d80-098f-46ab-8ddb-69fa87a0ae9c/devsignal_modern_hero_bg_1774699319356.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950 to-slate-950" />
        
        {/* Animated Aura Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center px-6 pt-12 pb-32 md:pt-24">
          {/* Navbar/Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-20"
          >
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl shadow-purple-500/5">
              <Terminal size={24} className="text-purple-400" />
            </div>
            <span className="text-2xl font-bold tracking-tight">DevSignal</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl w-full">
            {/* Hero Content */}
            <div className="text-center lg:text-left space-y-8">
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-6xl md:text-8xl font-bold leading-[1.1] tracking-tighter"
              >
                Growth.<br />
                <span className="italic font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  Accelerated.
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-xl md:text-2xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                A GitHub-native developer intelligence layer that turns repository activity into <span className="italic font-serif text-white font-medium underline decoration-purple-500/50 underline-offset-4">actionable</span> growth signals.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
              >
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300 backdrop-blur-md">
                  <ShieldCheck size={18} className="text-green-400" />
                  <span>Private by Design</span>
                </div>
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300 backdrop-blur-md">
                  <Zap size={18} className="text-yellow-400" />
                  <span>Real-time Sync</span>
                </div>
              </motion.div>
            </div>

            {/* Login Form Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 60, damping: 15 }}
              className="w-full max-w-md mx-auto perspective-1000"
            >
              <div className="p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
                
                <h2 className="text-2xl font-bold mb-10 flex items-center justify-between">
                  Log in <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">admin/admin</span>
                </h2>

                <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Account ID</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all placeholder:text-slate-700 text-lg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Access Key</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all placeholder:text-slate-700 text-lg"
                      required
                    />
                  </div>

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm font-medium ml-1">
                      {error}
                    </motion.p>
                  )}

                  <button 
                    type="submit"
                    className="w-full bg-white text-slate-950 font-bold py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]"
                  >
                    Enter Dashboard
                    <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-auto pt-16"
          >
            <ChevronDown size={32} className="text-slate-600" />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <motion.h2 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold"
            >
              Engineered for <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Excellence</span>.
            </motion.h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We've replaced manual tracking with automated intelligence. Focus on the code; we'll handle the signals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, title: 'Deep Analytics', desc: 'Real-time repository pulse and contributor workload visualization.' },
              { icon: Code2, title: 'Growth Editor', desc: 'Secure environment to test snippets and document your learning flow.' },
              { icon: BookOpen, title: 'Resource Hub', desc: 'Smart organization for your technical bookmarks and documentation.' },
              { icon: ShieldCheck, title: 'Enterprise Privacy', desc: 'Your data stays yours. Local-first architecture with secure cloud-sync.' }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="text-purple-400" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Product Preview Section */}
        <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                The Interface of <br />
                <span className="italic font-serif text-pink-400">Developer Growth</span>.
              </h2>
              <div className="space-y-6">
                {[
                  'Unified dashboard for all repository signals.',
                  'Integrated editor for rapid prototyping.',
                  'Structured learning pathways for long-term growth.'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-300 text-lg justify-center lg:justify-start font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <motion.div 
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: 100, opacity: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden group shadow-purple-500/10"
            >
              <div className="absolute inset-x-0 top-0 h-10 bg-white/5 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="p-8 pt-16 space-y-6">
                <div className="h-6 w-1/3 bg-white/10 rounded-full" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-white/5 rounded-3xl border border-white/5" />
                  <div className="h-32 bg-white/5 rounded-3xl border border-white/5" />
                </div>
                <div className="h-40 bg-white/5 rounded-3xl border border-white/5" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent flex items-center justify-center">
                 <div className="px-6 py-3 rounded-full bg-white text-slate-950 font-bold shadow-2xl scale-0 group-hover:scale-100 transition-transform cursor-default">
                    Coming Soon — v1.0
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 border-t border-white/5 relative bg-slate-950">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-white/10 border border-white/10">
                  <Terminal size={18} className="text-purple-400" />
                </div>
                <span className="text-xl font-bold tracking-tight">DevSignal</span>
              </div>
              <p className="text-slate-500 text-sm">Elevating the developer intelligence experience.</p>
            </div>

            <div className="flex gap-12 text-sm text-slate-500 font-medium font-serif">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors italic">Contributing</a>
            </div>

            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-700">
              DevSignal © 2026 — All Rights Reserved
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

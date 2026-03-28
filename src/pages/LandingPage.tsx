import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Terminal, ArrowRight, ShieldCheck } from 'lucide-react';

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
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden font-sans">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/Users/tarunyakesh/.gemini/antigravity/brain/f57a6d80-098f-46ab-8ddb-69fa87a0ae9c/devsignal_modern_hero_bg_1774699319356.png')" }}
      >
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
      </div>

      {/* Floating Elements Animation */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] z-0"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24 md:pt-24 md:pb-32 flex flex-col items-center">
        {/* Header/Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-16"
        >
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            <Terminal size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">DevSignal</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold leading-tight tracking-tighter"
            >
              Growth.<br />
              <span className="italic font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Accelerated.
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              A GitHub-native developer intelligence layer that turns activity into <span className="italic font-serif text-white">actionable</span> growth signals.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-400 backdrop-blur-sm">
                <ShieldCheck size={16} className="text-green-400" />
                <span>Private & Secure</span>
              </div>
            </motion.div>
          </div>

          {/* Login Form Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                Welcome back <span className="text-sm font-normal text-slate-400">(admin/admin)</span>
              </h2>

              <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-600"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-600"
                    required
                  />
                </div>

                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm ml-1">
                    {error}
                  </motion.p>
                )}

                <button 
                  type="submit"
                  className="w-full bg-white text-slate-950 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-white/10"
                >
                  Enter Dashboard
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
            
            <p className="mt-8 text-center text-slate-500 text-sm font-medium">
              4K — <span className="text-slate-400">Layout Optimized</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

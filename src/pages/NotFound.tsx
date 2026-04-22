import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 industrial-grid">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-12 surgical-card p-24 bg-white max-w-2xl w-full"
      >
        <div className="w-24 h-24 bg-black text-white flex items-center justify-center mx-auto mb-12">
          <Terminal size={48} strokeWidth={3} />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-8xl font-black tracking-tighter text-black uppercase leading-none">404</h1>
          <p className="text-zinc-400 font-black uppercase tracking-[0.5em] text-[10px]">ROUTE_NOT_PARSED</p>
        </div>

        <p className="text-lg font-bold italic text-zinc-500 max-w-sm mx-auto">
          "The requested intelligence node does not exist in the current archive directory."
        </p>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-4 px-12 py-6 border-4 border-black bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <ArrowLeft size={16} strokeWidth={3} />
          REBOOT_DASHBOARD
        </Link>
      </motion.div>
    </div>
  );
}

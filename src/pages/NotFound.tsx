import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#050110] text-white flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-8xl font-black tracking-tighter text-purple-400">404</h1>
        <p className="text-xl text-slate-400">Page not found.</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-bold text-sm hover:bg-purple-500/20 transition-all"
        >
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}

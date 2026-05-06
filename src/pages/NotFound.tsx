import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-10 glass-panel p-16 md:p-24 rounded-[3rem] max-w-2xl w-full relative z-10 shadow-2xl"
      >
        <div className="w-24 h-24 rounded-3xl bg-surface border border-border flex items-center justify-center mx-auto mb-8 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent" />
          <Terminal size={40} className="text-text relative z-10" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-8xl font-semibold tracking-tight text-text leading-none">404</h1>
          <p className="text-primary font-medium uppercase tracking-widest text-sm">Route Not Parsed</p>
        </div>

        <p className="text-lg font-medium text-text-muted max-w-sm mx-auto leading-relaxed">
          The requested intelligence node does not exist in the current archive directory.
        </p>

        <div className="pt-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <ArrowLeft size={18} />
            Reboot Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

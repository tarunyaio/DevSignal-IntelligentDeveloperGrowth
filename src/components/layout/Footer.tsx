import { Terminal, Shield, Cpu, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footerLinks } from '@/lib/footerLinks';

export function Footer() {
  return (
    <footer className="relative mt-auto pt-16 md:pt-24 pb-32 overflow-hidden border-t border-border bg-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start mb-16 md:mb-24">
          {/* Identity */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-black flex items-center justify-center shadow-lg shadow-primary/20">
                <Terminal size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold tracking-tighter text-text">
                DEVSIGNAL <span className="text-primary font-serif italic text-sm ml-1">v2.1</span>
              </h2>
            </div>
            <p className="text-sm text-text-muted leading-relaxed font-medium max-w-xs">
              The high-fidelity intelligence layer for modern engineering teams. Decipher repository velocity with mathematical precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
             <p className="text-[10px] uppercase tracking-[0.2em] text-text font-bold mb-6">Explore</p>
             <nav className="flex flex-col gap-3">
                {footerLinks.slice(0, 4).map((link) => (
                  <Link 
                    key={link.label} 
                    to={link.href} 
                    className="text-xs font-medium text-text-muted hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
             </nav>
          </div>

          <div className="md:col-span-2 space-y-4">
             <p className="text-[10px] uppercase tracking-[0.2em] text-text font-bold mb-6">Support</p>
             <nav className="flex flex-col gap-3">
                <a href="mailto:tarunyak.10@gmail.com" className="text-xs font-medium text-text-muted hover:text-primary transition-colors">Help Center</a>
                <a href="#" className="text-xs font-medium text-text-muted hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="text-xs font-medium text-text-muted hover:text-primary transition-colors">Terms of Service</a>
             </nav>
          </div>

          {/* Status */}
          <div className="md:col-span-4 space-y-6 md:text-right flex flex-col md:items-end">
             <p className="text-[10px] uppercase tracking-[0.2em] text-text font-bold mb-2">Protocol Status</p>
             <div className="flex flex-wrap md:justify-end gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface shadow-sm">
                  <Shield size={14} className="text-primary" />
                  <span className="text-[10px] font-bold text-text-muted tracking-widest">SECURED</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface shadow-sm">
                  <Cpu size={14} className="text-primary" />
                  <span className="text-[10px] font-bold text-text-muted tracking-widest">OPTIMAL</span>
                </div>
             </div>
             <p className="text-[10px] font-medium text-text-muted tracking-widest uppercase mt-4">
               © 2026 DEVSIGNAL SYSTEMS
             </p>
          </div>
        </div>

        {/* Large Signature Text */}
        <div className="relative w-full h-[12vw] overflow-hidden flex items-center justify-center pointer-events-none mt-8 border-t border-border/10">
           <h1 className="text-[14vw] font-bold leading-none tracking-[-0.06em] text-primary/10 absolute -bottom-[1vw] select-none whitespace-nowrap">
              DEVSIGNAL
           </h1>
        </div>
      </div>
    </footer>
  );
}

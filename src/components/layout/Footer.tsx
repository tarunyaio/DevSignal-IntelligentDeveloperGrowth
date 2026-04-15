import React from 'react';
import { Shield, Lock, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="relative mt-auto pt-24 pb-12 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-neo-accent-blue/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-10">
        <div className="neo-flat rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between gap-12 border border-white/[0.01] relative z-10">
          
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-10 h-10 neo-icon text-neo-accent-blue">
                <Cpu size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-black tracking-tighter uppercase italic text-slate-200">
                DEVSIGNAL <span className="text-neo-accent-blue not-italic underline decoration-neo-accent-blue/20 underline-offset-4">ENGINE</span>
              </h2>
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.5em] pl-1">Intelligent Developer Growth Hub</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              <div className="flex items-center gap-2 hover:text-neo-accent-emerald transition-colors cursor-help group">
                <Shield size={12} className="text-neo-accent-emerald/50 group-hover:text-neo-accent-emerald opacity-50 group-hover:opacity-100 transition-all" />
                <span>Sector Secured</span>
              </div>
              <div className="flex items-center gap-2 hover:text-neo-accent-blue transition-colors cursor-help group">
                <Lock size={12} className="text-neo-accent-blue/50 group-hover:text-neo-accent-blue opacity-50 group-hover:opacity-100 transition-all" />
                <span>Encrypted</span>
              </div>
            </div>
            
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 border-t border-white/[0.05] pt-6 flex items-center gap-4">
              <span>© 2026 DEVSIGNAL</span>
              <span className="w-1 h-1 rounded-full bg-slate-800" />
              <span className="italic">SECTOR 07 // CORE SYSTEMS ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Glow Layer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-neo-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
}

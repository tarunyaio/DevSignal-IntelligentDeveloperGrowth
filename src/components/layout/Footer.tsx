import { Shield, Lock, Cpu, Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-auto pt-40 pb-20 overflow-hidden border-t-8 border-black bg-zinc-50">
      <div className="max-w-7xl mx-auto px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-20">
          
          <div className="space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-6">
              <div className="w-16 h-16 border-4 border-black bg-black text-white flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]">
                <Terminal size={32} strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                  DEVSIGNAL <span className="text-accent-indigo not-italic underline decoration-4 underline-offset-8">V2.0</span>
                </h2>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.5em] mt-4">Intelligent_Developer_Growth_Engine</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-10">
            <div className="flex flex-wrap justify-center lg:justify-end gap-8">
              <div className="flex items-center gap-3 px-4 py-2 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Shield size={16} strokeWidth={3} className="text-green-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Sector_Secured</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Lock size={16} strokeWidth={3} className="text-accent-indigo" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Logic_Encrypted</span>
              </div>
            </div>
            
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 border-t-2 border-black pt-8 flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <span>© 2026 DEVSIGNAL_SYSTEMS</span>
                <span className="w-2 h-2 bg-black rotate-45" />
                <span className="italic">CORE_ONLINE</span>
              </div>
              <div className="flex items-center gap-4 text-accent-indigo">
                <Cpu size={14} />
                <span>BUILD_ARRAY: FINAL_SURGICAL_Industrial_1.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
    </footer>
  );
}

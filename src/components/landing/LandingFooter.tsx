import { ArrowUpRight } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="bg-bg text-text pt-32 pb-0 px-6 md:px-12 lg:px-16 overflow-hidden border-t border-border/20">
      <div className="max-w-[1600px] mx-auto">
        {/* Top Row: Drop us a line + Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
          <div className="space-y-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary/60 font-medium">
              DROP US A LINE, AND WE'LL <br /> GET IN TOUCH!
            </p>
            <a 
              href="mailto:tarunyak.10@gmail.com" 
              className="text-xs uppercase tracking-[0.1em] hover:text-primary transition-colors block border-b border-primary/20 pb-1 w-fit font-bold"
            >
              INITIATE CONTACT
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-12 gap-y-6">
            {['Dribbble', 'Behance', 'LinkedIn', 'X (Twitter)', 'Instagram', 'Facebook', 'YouTube'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-[10px] uppercase tracking-[0.15em] text-primary/60 hover:text-primary transition-colors font-medium"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Big Email */}
        <div className="mb-32 group">
          <a 
            href="mailto:tarunyak.10@gmail.com"
            className="flex items-center gap-4 text-[8vw] md:text-[7.5vw] font-medium leading-none tracking-tighter hover:text-primary transition-all duration-700 ease-[0.16,1,0.3,1]"
          >
            tarunyak.10@gmail.com
            <ArrowUpRight strokeWidth={1} className="w-[6vw] h-[6vw] group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
          </a>
          <div className="w-full h-px bg-border/20 mt-12" />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4 space-y-6">
            <p className="text-[11px] uppercase tracking-[0.15em] text-primary/60 font-medium leading-relaxed">
              +91 99999 88888 <br />
              DEVSIGNAL HQ, 13 FREELAND <br />
              INNOVATION PARK, SAN FRANCISCO, <br />
              CA 94103
            </p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-text mb-8 font-bold">EXPLORE</p>
            {['Works', 'Expertise', 'About', 'Insights'].map((link) => (
              <a key={link} href="#" className="block text-[11px] uppercase tracking-[0.15em] text-primary/60 hover:text-primary transition-colors font-medium">{link}</a>
            ))}
          </div>

          <div className="md:col-span-2 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-text mb-8 font-bold">HELP</p>
            <a href="mailto:tarunyak.10@gmail.com" className="block text-[11px] uppercase tracking-[0.15em] text-primary/60 hover:text-primary transition-colors font-medium">Support</a>
            <a href="#" className="block text-[11px] uppercase tracking-[0.15em] text-primary/60 hover:text-primary transition-colors font-medium">Privacy</a>
            <a href="#" className="block text-[11px] uppercase tracking-[0.15em] text-primary/60 hover:text-primary transition-colors font-medium">Terms</a>
          </div>

          <div className="md:col-span-4 flex flex-col justify-end items-center md:items-end text-center md:text-right">
             <p className="text-[10px] uppercase tracking-[0.15em] text-primary/40 font-medium">© ALL RIGHTS RESERVED, DEVSIGNAL 2026</p>
             <p className="text-[10px] uppercase tracking-[0.15em] text-primary/40 mt-3 font-medium">LET'S MAKE YOUR IDEAS TO LIFE ❤️</p>
          </div>
        </div>
      </div>

      {/* Massive Brand Text - Half cut at the bottom */}
      <div className="relative w-screen -mx-6 md:-mx-12 lg:-mx-16 h-[22vw] overflow-hidden flex items-center justify-center bg-primary mt-12">
          <h1 className="text-[34vw] font-bold leading-none tracking-[-0.06em] text-black absolute -bottom-[4vw] select-none whitespace-nowrap">
              DEVSIGNAL
          </h1>
      </div>
    </footer>
  );
}

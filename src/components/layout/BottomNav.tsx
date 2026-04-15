import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  Code2,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { icon: LayoutDashboard, label: 'Home', href: '/dashboard' },
  { icon: BarChart3, label: 'Stats', href: '/analytics' },
  { icon: BookOpen, label: 'Docs', href: '/resources' },
  { icon: Code2, label: 'Code', href: '/editor' },
];

export function BottomNav() {
  return (
    <div className="fixed bottom-10 left-0 right-0 flex justify-center items-center px-6 z-50 pointer-events-none">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="neo-flat p-2.5 flex items-center gap-4 rounded-[3rem] pointer-events-auto border border-white/[0.02]"
      >
        <div className="flex items-center gap-3 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => cn(
                "relative group transition-all duration-300",
                "w-14 h-14"
              )}
            >
              {({ isActive }) => (
                <div className={cn(
                  "w-full h-full neo-icon transition-all duration-300",
                  isActive ? "neo-icon-pressed text-neo-accent-blue" : "text-slate-500 hover:text-slate-300"
                )}>
                  <item.icon size={22} className={cn("transition-transform", isActive ? "scale-90" : "group-hover:scale-110")} />
                  
                  {/* Tooltip */}
                  <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl border border-white/5 uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
        
        <div className="w-[1px] h-10 bg-white/[0.05] mx-1" />
        
        <NavLink 
          to="/profile"
          className="relative group w-14 h-14 flex items-center justify-center pr-2"
        >
          {({ isActive }) => (
            <div className={cn(
              "w-full h-full neo-icon overflow-hidden p-[3px] transition-all duration-300",
              isActive ? "neo-icon-pressed ring-2 ring-neo-accent-blue/30" : "hover:scale-105"
            )}>
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                 <User size={22} className={isActive ? "text-neo-accent-blue" : "text-slate-400"} />
              </div>
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl border border-white/5 uppercase tracking-widest">
                Identity
              </span>
            </div>
          )}
        </NavLink>
      </motion.nav>
    </div>
  );
}

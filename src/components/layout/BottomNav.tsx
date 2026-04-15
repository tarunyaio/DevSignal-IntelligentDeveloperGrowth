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
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: BookOpen, label: 'Resources', href: '/resources' },
  { icon: Code2, label: 'Editor', href: '/editor' },
];

export function BottomNav() {
  return (
    <div className="fixed bottom-12 left-0 right-0 flex justify-center items-center px-6 z-50 pointer-events-none">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="neo-flat p-3 flex items-center gap-6 rounded-[3.5rem] pointer-events-auto border border-white/[0.01] shadow-2xl shadow-black/50"
      >
        <div className="flex items-center gap-4 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => cn(
                "relative group transition-all duration-300",
                "w-16 h-16"
              )}
            >
              {({ isActive }) => (
                <div className={cn(
                  "w-full h-full neo-icon transition-all duration-300 border border-white/[0.01]",
                  isActive ? "neo-icon-pressed text-neo-accent-blue" : "text-slate-500 hover:text-slate-300"
                )}>
                  <item.icon size={22} className={cn("transition-transform", isActive ? "scale-90" : "group-hover:scale-110")} />
                  
                  {/* Tooltip */}
                  <span className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900/90 backdrop-blur-md text-white md:text-[10px] text-[8px] font-black rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl border border-white/5 uppercase tracking-[0.3em]">
                    {item.label}
                  </span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
        
        <div className="w-[1px] h-12 bg-white/[0.05] mx-2" />
        
        <NavLink 
          to="/profile"
          className="relative group w-16 h-16 flex items-center justify-center pr-3"
        >
          {({ isActive }) => (
            <div className={cn(
              "w-full h-full neo-icon overflow-hidden p-[4px] transition-all duration-300 border border-white/[0.01]",
              isActive ? "neo-icon-pressed ring-2 ring-neo-accent-blue/30" : "hover:scale-105"
            )}>
              <div className="w-full h-full rounded-full bg-slate-800/50 flex items-center justify-center">
                 <User size={22} className={isActive ? "text-neo-accent-blue" : "text-slate-400"} />
              </div>
              <span className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900/90 backdrop-blur-md text-white md:text-[10px] text-[8px] font-black rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl border border-white/5 uppercase tracking-[0.3em]">
                Profile
              </span>
            </div>
          )}
        </NavLink>
      </motion.nav>
    </div>
  );
}
